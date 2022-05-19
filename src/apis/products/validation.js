import { checkSchema, validationResult } from "express-validator";
import createError from "http-errors";

const productsSchema = {
  email: {
    in: ["body"],
    isString: {
      errorMessage: "Email is required as a string in the body",
    },
  },
  name: {
    in: ["body"],
    isString: {
      errorMessage: "Name is required as a string",
    },
  },
  description: {
    in: ["body"],
    isString: {
      errorMessage: "Description is requireda as a string",
    },
  },
  brand: {
    in: ["body"],
    isString: {
      errorMessage: "Brand is requireda as a string",
    },
  },
  imageUrl: {
    in: ["body"],
    isString: {
      errorMessage: "Url is required as a string",
    },
  },
  price: {
    in: ["body"],
    isInt: {
      errorMessage: "Price is required as a number",
    },
  },
  category: {
    in: ["body"],
    isString: {
      errorMessage: "Category is requireda as a string",
    },
  },
};
const reviewsSchema = {
  comment: {
    in: ["body"],
    isString: {
      errorMessage: "Comment is required as a String",
    },
  },
  rate: {
    in: ["body"],
    isInt: {
      errorMessage: "Rating is required as a number between 1-5",
    },
  },
};

export const checkProductsSchema = checkSchema(productsSchema);
export const checkReviewsSchema = checkSchema(reviewsSchema);

export const productsValidationResult = (req, res, next) => {
  const errors = validationResult(req);
  console.log(errors);
  if (!errors.isEmpty()) {
    next(createError(400, "validation errors", { errorList: errors.array() }));
  } else {
    next();
  }
};
export const reviewsValidationResult = (req, res, next) => {
  const errors = validationResult(req);
  console.log(errors);
  if (!errors.isEmpty()) {
    next(createError(400, "validation errors", { errorList: errors.array() }));
  } else {
    next();
  }
};
