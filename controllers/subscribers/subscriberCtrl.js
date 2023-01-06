const expressAsyncHandler = require("express-async-handler");
const Subscriber = require("../../models/subscriber/Subscriber");
const nodemailer = require("nodemailer");

//============
// SUBSCRIBE
//============
const createSubscriber = expressAsyncHandler(async (req, res) => {
  const existEmail = await Subscriber.findOne({ email: req.body.email });
  if (existEmail) {
    return res.status(400).json({ message: "Email already exist" });
  }
  const subscribe = await Subscriber.create({
    email: req.body.email,
  });
  res.json(subscribe);
});

//============
// FETCH ALL SUBSCRIBERS
//============
const fetchALLCtrl = expressAsyncHandler(async (req, res) => {
  try {
    const subscribers = await Subscriber.find({});
    res.json(subscribers);
  } catch {
    res.json({ message: "Fetch fail" });
  }
});

//============
// DELETE SUBSCRIBER
//============
const deleteSubscriber = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const subscriber = await Subscriber.findByIdAndDelete(id);
    res.json(subscriber);
  } catch {
    res.json({ message: "Delete Fail" });
  }
});

//===============
//Send News Letter email
//================
const sendEmailCtrl = expressAsyncHandler(async (req, res) => {
  const { message, subject } = req.body;

  Subscriber.find({}, function (err, allUsers) {
    if (err) {
      console.log(err);
    }
    const mailList = [];
    allUsers.forEach(function (users) {
      mailList.push(users.email);
      return mailList;
    });
    const smtpTransport = nodemailer.createTransport({
      service: process.env.MAIL_SERVICE,
      auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.GMAIL_PASS,
      },
    });
    const mailOptions = {
      to: [],
      bcc: mailList,
      from: `${process.env.WEBSITE_NAME} ${process.env.EMAIL_ADDRESS}`,
      subject,
      html: message,
    };
    smtpTransport.sendMail(mailOptions, function (err) {
      if (err) {
        console.log(err);
        req.flash(
          "error",
          "We seem to be experiencing issues. Please try again later."
        );
        res.redirect("/");
      }
      res.send("mail sent to " + mailList);
      console.log("mail sent to " + mailList);
    });
  });
});

module.exports = {
  createSubscriber,
  fetchALLCtrl,
  sendEmailCtrl,
  deleteSubscriber,
};
