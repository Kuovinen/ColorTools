import makeSlider, {
  makeMainColor,
  makeRGBInfluence,
  RGBToHSL,
} from "./functions.js";
console.log("Script!");
makeMainColor();
let body = document.querySelector(".body");
let rgb = document.createElement("section");
rgb.appendChild(makeSlider("R", "rColor", "rColorLabel", 255));
rgb.appendChild(makeSlider("G", "gColor", "gColorLabel", 255));
rgb.appendChild(makeSlider("B", "bColor", "bColorLabel", 255));

let hsl = document.createElement("section");
hsl.appendChild(makeSlider("H", "hColor", "hColorLabel", 360));
hsl.appendChild(makeSlider("S", "sColor", "sColorLabel", 100));
hsl.appendChild(makeSlider("L", "lColor", "lColorLabel", 100));
body.appendChild(rgb);
body.appendChild(hsl);
makeRGBInfluence();
