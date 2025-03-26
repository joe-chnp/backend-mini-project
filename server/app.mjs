import express from "express";
import bookRouter from "./routes/books.mjs";

const app = express();
const port = 4000;

app.use(express.json());
app._router.use("/books", bookRouter);

app.get("/test", (req, res) => {
    return res.json({ message: "Server API is working"});
});

app.listen(port, () => {
    console.log(`Server is running at ${port}`);
});