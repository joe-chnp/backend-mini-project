import express from "express";
import bookRouter from "./routes/books.mjs";
import authRouter from "./routes/auth.mjs";
import dotenv from "dotenv";
import cors from "cors";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

async function init() {
    
    dotenv.config();
    
    const app = express();
    const port = 4000;

    app.use(cors());
    app.use(express.json());
    app.use("/books", bookRouter);
    app.use("/auth", authRouter);

    app.get("/test", (req, res) => {
        return res.json({ message: "Server API is working"});
    });

    //Swagger definition
    const swaggerOptions = {
        definition: {
            openapi: '3.0.0',
            info: {
                title: 'API Documentation',
                version: '1.0.0',
                description: 'An API documentation',
            },
            servers: [
                {
                    url: 'http//:localhost:4000',
                },
            ],
        },
        apis: ['./routes/*.mjs'],
    };
    const swaggerSpec = swaggerJsdoc(swaggerOptions);
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    app.listen(port, () => {
        console.log(`Server is running at ${port}`);
    });
};

init();
