import PdfPrinter from "pdfmake";
import imageToBase64 from "image-to-base64";
import striptags from "striptags";
import axios from "axios";

export const downloadImageAsArrayBuffer = async (url) => {
  try {
    const response = await axios.get(url, {
      responseType: "arraybuffer",
    });
    return response.data;
  } catch (error) {
    console.log("error", error);
    throw error;
  }
};

export const getPDFReadableStream = async (products) => {
  try {
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
      const arrayBuffer = await downloadImageAsArrayBuffer(products.imageUrl);
      const imageCoverURLParts = products.imageUrl.split("/");
      const fileName = imageCoverURLParts[imageCoverURLParts.length - 1];
      const [productId, extension] = fileName.split(".");
      const base64 = arrayBuffer.toString("base64");

      const base64Image = `data:image/${extension};base64,${base64}`;
      imagePart = { image: base64Image, width: 500, margin: [0, 0, 0, 40] };
    }

    const docDefinition = {
      content: [
        imagePart,
        {
          text: products.name,
          fontSize: 20,
          bold: true,
          margin: [0, 0, 0, 40],
        },
        { text: striptags(products.name), lineHeight: 2 },
      ],
    };

    const pdfReadableStream = printer.createPdfKitDocument(docDefinition);
    pdfReadableStream.end();

    return pdfReadableStream;
  } catch (error) {
    console.log(error);
  }
};
