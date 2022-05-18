import PdfPrinter from "pdfmake";
import imageToBase64 from "image-to-base64";

export const getPDFReadableStream = (products) => {
  const fonts = {
    Roboto: {
      normal: "Helvetica",
      bold: "Helvetica-Bold",
    },
  };

  const printer = new PdfPrinter(fonts);

  const docDefinition = {
    content: [
      {
        text: "Name of the product:" + products.name,
        style: "header",
      },
      "Product description:" + products.description,
      {
        text: "The product Brand:" + products.brand,
        style: "subheader",
      },
      {
        text: "The product price is: " + products.price,
        style: "subheader",
      },
      {
        text: "This is the image URL: " + products.imageUrl,
        style: ["quote", "small"],
      },
      {
        text: "And here is a image " + products.imageUrl,
        style: ["quote", "small"],
      },
      /*  {
        image: "data:image/jpeg;base64,...encodedContent...",
        fit: [100, 100],
      }, */
    ],
    styles: {
      header: {
        fontSize: 18,
        bold: true,
      },
      subheader: {
        fontSize: 15,
        bold: true,
      },
      small: {
        fontSize: 8,
      },
      defaultStyle: {
        font: "Helvetica",
      },
    },
  };

  const pdfReadableStream = printer.createPdfKitDocument(docDefinition, {});
  // OLD SYNTAX FOR PIPING pdfReadableStream.pipe(fs.createWriteStream("document.pdf"))

  pdfReadableStream.end();

  return pdfReadableStream;
}; // returns a readable stream
