import { Router } from "express";
import connectionPool from "../utils/db.mjs";
import { validateBookData } from "../middlewares/book.validation.mjs";
import { protect } from "../middlewares/protect.mjs";

const bookRouter = Router();

bookRouter.use(protect);

bookRouter.post("/", [validateBookData], async (req, res) => {
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
                2,
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

    try {
        results = await connectionPool.query(`select * from books where user_id = $1;`, [userId]);

        return res.status(200).json({
            message: "Books retrieved successfully.",
            data: results.rows
        });

    } catch (error) {
        console.error("Error getting book from database:", error)
        return res.status(500).json({
            message: "Server could not get books due to a database issue.",
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