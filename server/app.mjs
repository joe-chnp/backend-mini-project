import express from "express";
import bookRouter from "./routes/books.mjs";
import authRouter from "./routes/auth.mjs";
import dotenv from "dotenv";

async function init() {
    dotenv.config();
    
    const app = express();
    const port = 4000;

    app.use(express.json());
    app.use("/books", bookRouter);
    app.use("/auth", authRouter);

    app.get("/test", (req, res) => {
        return res.json({ message: "Server API is working"});
    });

    app.listen(port, () => {
        console.log(`Server is running at ${port}`);
    });
};

init();
