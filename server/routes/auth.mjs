import { Router } from "express";
import connectionPool from "../utils/db.mjs";
import bcrypt from "bcrypt";
import { validateUserData } from "../middlewares/user.validation.mjs";
import jwt from "jsonwebtoken";

const authRouter = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Auth:
 *       type: object
 *       required:
 *         - username
 *         - password
 *         - firstname
 *         - lastname
 *       properties:
 *         username:
 *           type: string
 *           description: username
 *         password:
 *           type: string
 *           description: password
 *         firstname:
 *           type: string
 *           description: first name
 *         lastname:
 *           type: string
 *           description: last name
 *       example:
 *         username: admin01
 *         password: admin01
 *         firstname: admin01's first name
 *         lastname: admin01's last name
 
 *     reqBodyAuth:
 *       type: object
 *       required:
 *         - username
 *         - password
 *       properties:
 *         username:
 *           type: string
 *           description: username
 *         password:
 *           type: string
 *           description: password
 *       example:
 *         username: admin01
 *         password: admin01
 */

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: The Authentication API
 * /auth/register:
 *   post:
 *     summary: Registration
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Auth'
 *     responses:
 *       200:
 *         description: Registration successful
 *       400:
 *         description: Username already exists. Please choose a different one.
 *       500:
 *         description: Server could not register due to a database issue.
 * 
 * /auth/login:
 *   post:
 *     summary: log in
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/reqBodyAuth'
 *     responses:
 *       200:
 *         description: Login successfully
 *       401:
 *         description: Password is incorrect
 *       404:
 *         description: User not found
 */

authRouter.post("/register", [validateUserData], async (req, res) => {
    const user = {
        ...req.body,
        created_at: new Date(),
        updated_at: new Date(),
        last_logged_in: new Date(),
    };

    try {
        const existingUser = await connectionPool.query(`select * from users where username = $1`, [user.username]);
        if (existingUser.rows[0]) {
            return res.status(400).json({
                message: "Username already exists. Please choose a different one."
            })
        }

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);

        await connectionPool.query(
            `insert into users (username, password, firstname, lastname, created_at, updated_at, last_logged_in)
            values ($1, $2, $3, $4, $5, $6, $7)`,
            [
                user.username,
                user.password,
                user.firstname,
                user.lastname,
                user.created_at,
                user.updated_at,
                user.last_logged_in,
            ]
        );

        return res.status(201).json({
            message: "Registration successful"
        });

    } catch (error) {
        console.error("Error registering user:", error)
        return res.status(500).json({
            message: "Server could not register due to a database issue.",
            error: error.message,
        });
    };
});

authRouter.post("/login", async (req, res) => {
    const userResult = await connectionPool.query(`select * from users where username = $1`, [req.body.username]);
    if(!userResult.rows[0]) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    const user = userResult.rows[0];
    const isValidPassword = await bcrypt.compare(req.body.password, user.password);
    if (!isValidPassword) {
        return res.status(401).json({
            message: "Password is incorrect"
        });
    }

    const token = jwt.sign(
        {
            userId: user.user_id,
            firstname: user.firstname,
            lastname: user.lastname,
        },
        process.env.SECRET_KEY,
        {
            expiresIn: "900000"
        }
    );

    return res.status(200).json({
        message: "Login successfully",
        token
    });
});

export default authRouter;



