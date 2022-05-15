import makeSlider, {
  makeMainColor,
  makeRGBInfluence,
  switchTheme,
  makeComplementaryColor,
  createHueWheel,
  generatePalette,
  makeCopyBtn,
  switchPalType,
  makePaletteSetup,
} from "./functions.js";
makeMainColor();
makeComplementaryColor();
const body = document.querySelector("#instruments");
const rgb = document.createElement("section");
rgb.id = "rgbSection";
rgb.appendChild(makeSlider("R", "rColor", "rColorLabel", 255));
rgb.appendChild(makeSlider("G", "gColor", "gColorLabel", 255));
rgb.appendChild(makeSlider("B", "bColor", "bColorLabel", 255));

const hsl = document.createElement("section");
hsl.id = "hslSection";
hsl.appendChild(makeSlider("H", "hColor", "hColorLabel", 360));
hsl.appendChild(makeSlider("S", "sColor", "sColorLabel", 100));
hsl.appendChild(makeSlider("L", "lColor", "lColorLabel", 100));

body.appendChild(rgb);
body.appendChild(hsl);
makeCopyBtn("rgbSection", "rColorLabel", "gColorLabel", "bColorLabel");
makeCopyBtn("hslSection", "hColorLabel", "sColorLabel", "lColorLabel");
makeRGBInfluence();
document.querySelector("#theme").addEventListener("click", switchTheme);
document
  .querySelector("#genPalette")
  .addEventListener("click", generatePalette);
createHueWheel(8);
document
  .querySelector("#paletteType")
  .addEventListener("click", (event) => switchPalType(event.target));
makePaletteSetup();
