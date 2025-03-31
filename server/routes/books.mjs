import { Router } from "express";
import connectionPool from "../utils/db.mjs";
import { validateBookData } from "../middlewares/book.validation.mjs";
import { protect } from "../middlewares/protect.mjs";

const bookRouter = Router();

bookRouter.use(protect);

/**
 * @swagger
 * components:
 *   schemas:
 *     Book:
 *       type: object
 *       required:
 *         - title
 *         - author
 *         - category
 *       properties:
 *         book_id:
 *           type: integer
 *           description: The auto-generated id of the book
 *         title:
 *           type: string
 *           description: The title of your book
 *         author:
 *           type: string
 *           description: The book author
 *         category:
 *           type: string
 *           description: The category of your book
 *         user_id:
 *           type: integer
 *           description: The id of user who posted the book
 *         created_at:
 *           type: string
 *           format: date
 *           description: The date the book was added
 *         updated_at:
 *           type: string
 *           format: date
 *           description: The date the book was updated
 *         published_at:
 *           type: string
 *           format: date
 *           description: The date the book was published
 *       example:
 *         id: 24
 *         title: To Kill a Mockingbird
 *         author: Harper Lee
 *         category: Fiction, Classic
 *         user_id: 4
 *         created_at: 2025-03-28 11:37:28.822
 *         updated_at:  2025-03-28 11:37:28.822
 *         published_at:    2025-03-28 11:37:28.822
 
 *     reqBodyBook:
 *       type: object
 *       required:
 *         - title
 *         - author
 *         - category
 *       properties:
 *         title:
 *           type: string
 *           description: The title of your book
 *         author:
 *           type: string
 *           description: The book author
 *         category:
 *           type: string
 *           description: The category of your book
 *       example:
 *         title: To Kill a Mockingbird
 *         author: Harper Lee
 *         category: Fiction, Classic
 */

/**
 * @swagger
 * tags:
 *   name: Books
 *   description: The books managing API
 * /books:
 *   post:
 *     summary: Add a new book
 *     tags: [Books]
 *     parameters:
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/reqBodyBook'
 *     responses:
 *       200:
 *         description: Added book successfully
 *       500:
 *         description: Server could not add book due to a database issue.
 *   get:
 *     summary: Lists all user's books
 *     tags: [Books]
 *     parameters:
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 *     responses:
 *       200:
 *         description: Books retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  $ref: '#/components/schemas/Book'
 *       500:
 *         description: Server could not get books due to a database issue.
 * 
 * /books/{bookId}:
 *   get:
 *     summary: Get the book by id
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: bookId
 *         schema:
 *           type: string
 *         required: true
 *         description: The book id
 *     responses:
 *       200:
 *         description: Books retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  $ref: '#/components/schemas/Book'
 *       500:
 *         description: Server could not get book due to a database issue.
 *   put:
 *    summary: Update the book by the id
 *    tags: [Books]
 *    parameters:
 *      - in: path
 *        name: bookId
 *        schema:
 *          type: string
 *        required: true
 *        description: The book id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/reqBodyBook'
 *    responses:
 *      200:
 *        description: Updated book successfully.
 *      404:
 *        description: Server could not find a requested book to update.
 *      500:
 *        description: Server could not update book due to a database issue.
 *   delete:
 *     summary: Delete the book by the id
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: bookId
 *         schema:
 *           type: string
 *         required: true
 *         description: The book id
 *     responses:
 *       200:
 *         description: Deleted book successfully.
 *       404:
 *         description: Server could not find a requested book to delete
 *       500:
 *         description: Server could not delete book due to a database issue.
 */
bookRouter.post("/", [validateBookData], async (req, res) => {
    const userId = req.query.userId;
    const newBook = {
        ...req.body,
        created_at: new Date(),
        updated_at: new Date(),
        published_at: new Date(),
    };
    try {
        await connectionPool.query(
            `insert into books (user_id, title, author, category, created_at, updated_at, published_at)
            values ($1, $2, $3, $4, $5, $6, $7)`,
            [
                userId,
                newBook.title,
                newBook.author,
                newBook.category,
                newBook.created_at,
                newBook.updated_at,
                newBook.published_at,
            ]
        );

        return res.status(200).json({
            message: "Added book successfully"
        });
        
    } catch (error) {
        console.error("Error adding book to database:", error)
        return res.status(500).json({
            message: "Server could not add book due to a database issue.",
            error: error.message,
        });
    };
});

bookRouter.get("/", async (req, res) => {
    let results;
    const userId = req.query.userId;
    const page = parseInt(req.query.page, 10) || 1;

    const PAGE_SIZE = 5;
    const skip = PAGE_SIZE * (page - 1);
    try {
        results = await connectionPool
        .query(`select * from books where user_id = $1 offset $2 limit $3 ;`, [userId, skip, PAGE_SIZE]);

        const countResult = await connectionPool.query(
            `select count(*) from books where user_id = $1;`,
            [userId]
        );
        const count = parseInt(countResult.rows[0].count, 10);
        const totalPages = Math.ceil(count / PAGE_SIZE);
        
        return res.status(200).json({
            message: "Books retrieved successfully.",
            data: results.rows,
            total_pages: totalPages,
        });

    } catch (error) {
        console.error("Error getting book from database:", error)
        return res.status(500).json({
            message: "Server could not get books due to a database issue.",
            error: error.message,
        });
    };
});

bookRouter.get("/:bookId", async (req, res) => {
    let results;
    const bookId = req.params.bookId;

    try {
        results = await connectionPool.query(`select * from books where book_id = $1;`, [bookId]);

        return res.status(200).json({
            message: "Books retrieved successfully.",
            data: results.rows
        });

    } catch (error) {
        console.error("Error getting book from database:", error)
        return res.status(500).json({
            message: "Server could not get book due to a database issue.",
            error: error.message,
        });
    };
});

bookRouter.put("/:bookId", [validateBookData], async (req, res) => {
    const bookIdFromClient = req.params.bookId;
    const updatedBook = { ...req.body, updated_at: new Date()};

    const result = await connectionPool.query(`select * from books where book_id = $1`, [bookIdFromClient]);
    if (!result.rows[0]) {
        return res.status(404).json({
            message: "Server could not find a requested book to update."
        });
    }

    try {
        await connectionPool.query(
            `
            update books
            set title = $2,
                author = $3,
                category = $4
            where book_id = $1
            `,
            [
                bookIdFromClient,
                updatedBook.title,
                updatedBook.author,
                updatedBook.category,
            ]
        );

        return res.status(200).json({
            message: "Updated book successfully.",
        });

    } catch (error) {
        console.error("Error updating book from database:", error)
        return res.status(500).json({
            message: "Server could not update book due to a database issue.",
            error: error.message,
        });
    };
});

bookRouter.delete("/:bookId", async (req, res) => {
    const bookIdFromClient = req.params.bookId;

    const result = await connectionPool.query(`select * from books where book_id = $1`, [bookIdFromClient]);
    if (!result.rows[0]) {
        return res.status(404).json({
            message: "Server could not find a requested book to delete"
        })
    }

    try {
        await connectionPool.query(`delete from books where book_id = $1`, [bookIdFromClient]);

        return res.status(200).json({
            message: "Deleted book successfully.",
        });

    } catch (error) {
        console.error("Error deleting book from database:", error)
        return res.status(500).json({
            message: "Server could not delete book due to a database issue.",
            error: error.message,
        });
    };
});

export default bookRouter;