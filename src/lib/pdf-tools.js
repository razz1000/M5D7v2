import PdfPrinter from "pdfmake";
import imageToBase64 from "image-to-base64";
import striptags from "striptags";
import axios from "axios";

export const getPDFReadableStream = async (products) => {
  const fonts = {
    Roboto: {
      normal: "Helvetica",
      bold: "Helvetica-Bold",
      italics: "Helvetica-Oblique",
      bolditalics: "Helvetica-BoldOblique",
    },
  };

  const printer = new PdfPrinter(fonts);

  let imagePart = {};

  if (products.imageUrl) {
    const response = await axios.get(products.imageUrl, {
      responseType: "arraybuffer",
      /* 
    const response = await fetch(products.imageUrl, {
      responseType: "arraybuffer", */
    });

    const imageCoverURLParts = products.imageUrl.split("/");
    const fileName = imageCoverURLParts[imageCoverURLParts.length - 1];
    const [productId, extension] = fileName.split(".");
    const base64 = response.data.toString("base64");
    const base64Image = `data:image/${extension};base64,${base64}`;
    imagePart = { image: base64Image, width: 500, margin: [0, 0, 0, 40] };
  }

  const docDefinition = {
    content: [
      imagePart,
      { text: products.name, fontSize: 20, bold: true, margin: [0, 0, 0, 40] },
      { text: striptags(products.name), lineHeight: 2 },
    ],
  };

  const pdfReadableStream = printer.createPdfKitDocument(docDefinition);
  pdfReadableStream.end();

  return pdfReadableStream;
};
