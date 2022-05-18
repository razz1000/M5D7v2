import express from "express";
import {
  getProducts,
  writeProducts,
  getReviews,
  writeReviews,
  getProductsReadableStream,
} from "../../lib/fs-tools.js";

import uniqid from "uniqid";
import createError from "http-errors";
import multer from "multer";
import { saveProductsPicture } from "../../lib/fs-tools.js";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

import { getPDFReadableStream } from "../../lib/pdf-tools.js";
import { pipeline } from "stream";
import { createGzip } from "zlib";

const pdfRouter = express.Router();

pdfRouter.get("/pdf", async (req, res, next) => {
  try {
    res.setHeader("Content-Disposition", "attachment; filename=example.pdf");

    const products = await getProducts();

    console.log("products: ", products);
    const source = getPDFReadableStream(products[0]);
    const destination = res;

    pipeline(source, destination, (err) => {
      if (err) console.log(err);
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

export default pdfRouter;
