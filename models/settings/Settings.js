const mongooose = require("mongoose");

const settingSchema = new mongooose.Schema(
  {
    about: {
      type: String,
      default: "Your about info here",
    },
    privacy: {
      type: String,
      default: "Your privacy info here",
    },
    contact: {
      type: String,
      default: "Your contact info here",
    },
    disclaimer: {
      type: String,
      default: "Your disclaimer info here",
    },
    gameErr: {
      type: String,
      default: "How to fix game errors",
    },
    facebook: {
      type: String,
      default: "https://web.facebook.com/",
    },
    twitter: {
      type: String,
      default: "https://twitter.com/",
    },
    instagram: {
      type: String,
      default: "https://www.instagram.com/",
    },
    logo: {
      type: String,
      default:
        "https://res.cloudinary.com/dstj5eqcd/image/upload/v1672582172/logo_itimks.png",
    },
    request: {
      type: String,
      default: "Your request info here",
    },
    copyRight: {
      type: String,
      default: "https://www.copyrighted.com/",
    },
    dmca: {
      type: String,
      default: "https://www.dmca.com/",
    },
    downLoadPage: {
      type: String,
      default: "Your dowmload page info here",
    },
    downLoadPageInfo: {
      type: String,
      default: "Your dowmload page info here",
    },
    disqus: {
      type: String,
      default: "Your disqus shortname here",
    },
    background: {
      type: String,
      default:
        "https://res.cloudinary.com/dstj5eqcd/image/upload/v1672751981/banner_biet3l.jpg",
    },
  },
  { timestamps: true }
);

const Settings = mongooose.model("Settings", settingSchema);
module.exports = Settings;
