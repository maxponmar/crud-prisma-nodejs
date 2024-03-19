import express from "express";
import categoriesRouter from "./routes/categories.routes.js";
import productsRouter from "./routes/products.routes.js";

const app = express();

app.use(express.json());

app.use("/api", productsRouter);
app.use("/api", categoriesRouter);

app.listen(3000);
