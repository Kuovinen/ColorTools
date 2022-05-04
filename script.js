import makeSlider, {
  makeMainColor,
  makeRGBInfluence,
  RGBToHSL,
} from "./functions.js";
console.log("Script!");
makeMainColor();
makeSlider("R", "rColor", "rColorLabel");
makeSlider("G", "gColor", "gColorLabel");
makeSlider("B", "bColor", "bColorLabel");

makeRGBInfluence();
