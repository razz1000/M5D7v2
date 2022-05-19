import sgMail from "@sendgrid/mail";
import fs from "fs";
import { join } from "path";
import { promisify } from "util";
import { publicFolderPath } from "../../src/server.js";
import { getPDFReadableStream } from "../lib/pdf-tools.js";
import streamToArray from "stream-to-array";
import { Readable } from "stream";
sgMail.setApiKey(process.env.SENDGRID_KEY);

function base64_encode(file) {
  let bitmap = fs.readFileSync(file);
  return Buffer.from(bitmap).toString("base64");
}

const streamToBuffer = (stream) => {
  return new Promise((resolve, reject) => {
    const data = [];

    stream.on("data", (chunk) => {
      data.push(chunk);
    });

    stream.on("end", () => {
      resolve(Buffer.concat(data));
    });

    stream.on("error", (err) => {
      reject(err);
    });
  });
};
export const sendNewProductEmail = async (recipientAddress, pdf) => {
  const buffer = await streamToBuffer(pdf);
  const attachment = buffer.toString("base64");

  const msg = {
    to: recipientAddress,
    from: process.env.SENDER_EMAIL,
    subject: "First email - EVER!",
    text: "Hi there",
    html: "<b>Hello</b>",
    attachments: [
      {
        content: attachment,
        filename: "exmaple2.pdf",
        type: "application/pdf",
        disposition: "attachment",
      },
    ],
  };
  await sgMail.send(msg);
};
