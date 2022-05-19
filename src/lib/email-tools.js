import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_KEY);

export const sendNewProductEmail = async (recipientAddress) => {
  const msg = {
    to: recipientAddress,
    from: process.env.SENDER_EMAIL,
    subject: "First email - EVER!",
    text: "Hi there",
    html: "<b>Hello</b>",
  };
  await sgMail.send(msg);
};
