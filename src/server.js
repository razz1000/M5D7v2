import express from "express";
import listEndpoints from "express-list-endpoints";
import productsRouter from "./apis/products/index.js";
import cors from "cors";
import { join } from "path";

const publicFolderPath = join(process.cwd(), "./public");

const server = express();

const port = process.env.PORT || 5001;

const whitelist = [process.env.FE_DEV_URL, process.env.FE_PROD_URL];

const corsOptions = {
  origin: (origin, next) => {
    console.log("CURRENT ORIGIN: ", origin);

    if (!origin || whitelist.indexOf(origin) !== -1) {
      // origin is in the whitelist --> move next with no errors
      next(null, true);
    } else {
      // origin is NOT in the whitelist --> trigger an error
      next(
        createError(
          400,
          `Cors Error! your origin ${origin} is not in the list!`
        )
      );
    }
  },
};

server.use(cors(corsOptions));

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
