export const validateBookData = (req, res, next) => {
    const { title, author, category } = req.body;
    if (!title || !author || !category) {
        return res.status(400).json({
            message: "Please provide all required fields: title, author, and category."
        });
    }

    if (title.length > 100) {
        return res.status(400).json({
            message: "Title cannot be longer than 100 characters."
        })
    }

    if (author.length > 20) {
        return res.status(400).json({
            message: "Author cannot be longer than 20 characters."
        })
    }

    if (category.length > 50) {
        return res.status(400).json({
            message: "Category cannot be longer than 50 characters."
        })
    }

    next();
};