import express from "express";
import listEndpoints from "express-list-endpoints";
import productsRouter from "./apis/products/index.js";
import cors from "cors";
import { join } from "path";

const publicFolderPath = join(process.cwd(), "./public");

const server = express();

const port = process.env.PORT || 5001;

const whitelist = [process.env.BE_DEV_URL, process.env.BE_PROD_URL];
const corsOptions = {
  origin: "http://frontendapp.com",
};

server.use(cors());

server.use(express.static(publicFolderPath));
server.use(express.json());

server.use("/products", productsRouter);

server.use(express.static(publicFolderPath));

server.listen(port, () => {
  console.table(listEndpoints(server));
  console.log(`Server is listening on port ${port}`);
});
server.on("error", (error) => {
  console.log("new error", error);
});
