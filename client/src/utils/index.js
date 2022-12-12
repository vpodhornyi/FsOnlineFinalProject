import Moment from "moment";

export * from "./CatchError";
export * from "./tokens";
export * from "./passwordValidator";
export const getRandomKey = () => Math.random().toString(36).slice(2);


Moment.updateLocale('en', {
  relativeTime: {
    s: '%ds',
    ss: '%ds',
    m: "1m",
    mm: "%dm",
    h: "1h",
    hh: "%dh",
    d: "1d",
    dd: "%dd",
    w: "1w",
    ww: "%dw",
    M: "1 month",
    MM: "%d months",
    y: "1y",
    yy: "%dy"
  }
})
export const moment = Moment;
