export const validateBookData = (req, res, next) => {
    if (!req.body.title) {
        return res.status(400).json({
            message: "Title is required."
        });
    };

    if (!req.body.author) {
        return res.status(400).json({
            message: "Author is required."
        })
    }

    if(!req.body.category) {
        return res.status(400).json({
            message: "Category is required."
        })
    }

    if (req.body.title.length > 100) {
        return res.status(400).json({
            message: "Title cannot be longer than 100 characters."
        })
    }

    if (req.body.author.length > 20) {
        return res.status(400).json({
            message: "Author cannot be longer than 20 characters."
        })
    }

    if (req.body.category.length > 20) {
        return res.status(400).json({
            message: "Category cannot be longer than 20 characters."
        })
    }

    next();
};