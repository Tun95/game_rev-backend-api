const mongooose = require("mongoose");

const adSchema = new mongooose.Schema(
  {
    ppcOne: {
      type: String,
    },
    ppcTwo: {
      type: String,
    },
    bannerOne: {
      type: String,
      default:
        "https://res.cloudinary.com/dstj5eqcd/image/upload/v1672933390/ad_loui2x.jpg",
    },
    bannerLinkOne: {
      type: String,
      default:
        "https://ads.advertise.com/dstj5eqcd/image/upload/v1672751981/banner_biet3l.jpg",
    },
    bannerTwo: {
      type: String,
      default:
        "https://res.cloudinary.com/dstj5eqcd/image/upload/v1672933390/ad_loui2x.jpg",
    },
    bannerLinkTwo: {
      type: String,
      default:
        "https://ads.advertise.com/dstj5eqcd/image/upload/v1672751981/banner_biet3l.jpg",
    },
    bannerThree: {
      type: String,
      default:
        "https://res.cloudinary.com/dstj5eqcd/image/upload/v1672933390/ad_loui2x.jpg",
    },
    bannerLinkThree: {
      type: String,
      default:
        "https://ads.advertise.com/dstj5eqcd/image/upload/v1672751981/banner_biet3l.jpg",
    },
    bannerFour: {
      type: String,
      default:
        "https://res.cloudinary.com/dstj5eqcd/image/upload/v1672933390/ad_loui2x.jpg",
    },
    bannerLinkFour: {
      type: String,
      default:
        "https://ads.advertise.com/dstj5eqcd/image/upload/v1672751981/banner_biet3l.jpg",
    },
    bannerFive: {
      type: String,
      default:
        "https://res.cloudinary.com/dstj5eqcd/image/upload/v1672933390/ad_loui2x.jpg",
    },
    bannerLinkFive: {
      type: String,
      default:
        "https://ads.advertise.com/dstj5eqcd/image/upload/v1672751981/banner_biet3l.jpg",
    },
  },
  {
    timestamps: true,
  }
);

const Ads = mongooose.model("Ads", adSchema);
module.exports = Ads;
