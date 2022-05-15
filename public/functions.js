export default function makeSlider(labelLetter, id, colorValue, max) {
  function changeValue(event, id2) {
    const element = event.target;
    const value = document.querySelector(`#${id2}`);
    value.innerHTML = element.value;
    document.querySelector(`#mainColor`);
  }

  const container = document.createElement("div");
  container.className = "sliderContainer";
  const label1 = document.createElement("label");
  label1.innerHTML = labelLetter;
  label1.className = "labelLetter";
  const element = document.createElement("input");
  element.type = "range";
  element.min = 0;
  element.max = max;
  element.id = id;
  element.value = max;
  const label2 = document.createElement("label");
  label2.for = "rColor";
  label2.id = colorValue;
  label2.innerText = max;
  label2.addEventListener("click", (event) => copyToClip(event.target));
  container.appendChild(label1);
  container.appendChild(element);
  container.appendChild(label2);

  element.addEventListener("input", (event) => changeValue(event, colorValue));

  return container;
  /* document.querySelector(".panel").appendChild(container);*/
}

export function makeCopyBtn(container, id1, id2, id3) {
  const button = document.createElement("button");
  button.className = "copyButton";
  button.innerText = "copy";
  const parent = document.querySelector(`#${container}`);
  function getData() {
    let value1 = document.querySelector(`#${id1}`).innerText;
    let value2 = document.querySelector(`#${id2}`).innerText;
    let value3 = document.querySelector(`#${id3}`).innerText;
    let text = `(${value1},${value2},${value3})`;
    return text;
  }

  button.addEventListener("click", (event) => copyToClip2(getData()));

  parent.appendChild(button);
}
//Create the element that will display the main color value
export function makeMainColor() {
  const COLOR = document.createElement("div");
  const hexText = document.createElement("div");
  hexText.addEventListener("click", (event) => copyToClip(event.target));
  hexText.className = "hex";
  hexText.innerHTML = "#b4b47d";
  COLOR.appendChild(hexText);
  COLOR.id = "mainColor";
  COLOR.dataset.rColor = 180;
  COLOR.dataset.gColor = 180;
  COLOR.dataset.bColor = 125;
  COLOR.dataset.hColor = 60;
  COLOR.dataset.sColor = 26;
  COLOR.dataset.lColor = 59;
  COLOR.style.background = "rgb(180,180,125)";
  document.querySelector("#colors").appendChild(COLOR);
}
//Create the element that will display the complementary color value
export function makeComplementaryColor() {
  const COLOR = document.querySelector("#mainColor");
  const initH = parseFloat(COLOR.dataset.hColor);
  const h = initH + 180 > 360 ? initH + 180 - 360 : initH + 180;
  const hsl = [h, COLOR.dataset.sColor, COLOR.dataset.lColor];
  const COLOR2 = document.createElement("div");
  COLOR2.id = "compColor";
  COLOR2.style.background = `hsl(${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%)`;
  //comp color HEX
  const hexText = document.createElement("div");
  hexText.addEventListener("click", (event) => copyToClip(event.target));
  hexText.className = "hexComp";
  hexText.innerHTML = "#7B7BB1";
  COLOR2.appendChild(hexText);
  // COLOR2.style.background = `hsl(${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%)`;
  document.querySelector("#colors").appendChild(COLOR2);
}
//Create palette setup
export function makePaletteSetup() {
  const COLOR2 = "secondP";
  const COLOR3 = "thirdP";
  const COLOR4 = "fourthP";

  function setUpPalette(id, hex) {
    const color = document.querySelector(`.${id}`);
    const hexText = document.createElement("div");
    hexText.className = `hex${id} pHex`;
    hexText.innerHTML = hex;
    hexText.addEventListener("click", (event) => copyToClip(event.target));
    color.appendChild(hexText);
  }
  setUpPalette(COLOR2, "#c1d590");
  setUpPalette(COLOR3, "#c6e8ba");
  setUpPalette(COLOR4, "#9bd9d0");
}

//event handler for changing the complamentary color when main color changes
function modCompColor() {
  const COLOR = document.querySelector("#mainColor");
  const initH = parseFloat(COLOR.dataset.hColor);
  const h = initH + 180 > 360 ? initH + 180 - 360 : initH + 180;
  const hsl = [h, COLOR.dataset.sColor, COLOR.dataset.lColor];
  const COLOR2 = document.querySelector("#compColor");
  COLOR2.style.background = `hsl(${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%)`;
  const color2RGB = HSLToRGB(hsl[0], hsl[1], hsl[2]);
  COLOR2.dataset.rColor = color2RGB[0];
  COLOR2.dataset.gColor = color2RGB[1];
  COLOR2.dataset.bColor = color2RGB[2];
}

//handler that changed the main hex value depending on slider cahnges
function affectHex() {
  const hex = document.querySelector(".hex");
  const COLOR = document.querySelector("#mainColor");
  hex.innerHTML = rgbToHex([
    COLOR.dataset.rColor,
    COLOR.dataset.gColor,
    COLOR.dataset.bColor,
  ]);
  const hex2 = document.querySelector(".hexComp");
  const COLOR2 = document.querySelector("#compColor");
  hex2.innerHTML = rgbToHex([
    COLOR2.dataset.rColor,
    COLOR2.dataset.gColor,
    COLOR2.dataset.bColor,
  ]);
}
//used to change main color when one of the RGB inputs is changed
export function makeRGBInfluence() {
  document.querySelector("#panel").addEventListener("input", (event) => {
    changeMainColor(event.target.id, event.target.value);
  });

  function changeMainColor(data, value) {
    const COLOR = document.querySelector("#mainColor");

    COLOR.dataset[data] = value;
    if (data == "rColor" || data == "gColor" || data == "bColor") {
      //change the main color
      const r = COLOR.dataset.rColor;
      const g = COLOR.dataset.gColor;
      const b = COLOR.dataset.bColor;
      const hsl = RGBToHSL(r, g, b);
      COLOR.style.background = `rgb(${r},${g},${b})`;
      //assign the new values to main colors datasets
      COLOR.dataset.hColor = hsl[0];
      COLOR.dataset.sColor = hsl[1];
      COLOR.dataset.lColor = hsl[2];
      //assign the new values to the hsl sliders as well
      document.querySelector("#hColor").value = hsl[0];
      document.querySelector("#sColor").value = hsl[1];
      document.querySelector("#lColor").value = hsl[2];
      document.querySelector("#hColorLabel").innerText = hsl[0];
      document.querySelector("#sColorLabel").innerText = hsl[1];
      document.querySelector("#lColorLabel").innerText = hsl[2];
      //modify the complementary color
      modCompColor();
    }
    if (data == "hColor" || data == "sColor" || data == "lColor") {
      const h = COLOR.dataset.hColor;
      const s = COLOR.dataset.sColor;
      const l = COLOR.dataset.lColor;
      const rgb = HSLToRGB(h, s, l);
      COLOR.style.background = `hsl(${h},${s}%,${l}%)`;
      //assign the new values to main colors datasets
      COLOR.dataset.rColor = rgb[0];
      COLOR.dataset.gColor = rgb[1];
      COLOR.dataset.bColor = rgb[2];
      //assign the new values to the rgb sliders as well
      document.querySelector("#rColor").value = rgb[0];
      document.querySelector("#gColor").value = rgb[1];
      document.querySelector("#bColor").value = rgb[2];
      document.querySelector("#rColorLabel").innerText = rgb[0];
      document.querySelector("#gColorLabel").innerText = rgb[1];
      document.querySelector("#bColorLabel").innerText = rgb[2];
      //modify the complementary color
      modCompColor();
    }
    affectCircle(COLOR.dataset.hColor);
    affectHex();
    document.querySelector(
      ".mainP"
    ).style.background = `rgb(${COLOR.dataset.rColor},${COLOR.dataset.gColor},${COLOR.dataset.bColor})`;
  }
}
//convert RGB values to HSL values
export function RGBToHSL(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;
  const l = Math.max(r, g, b);
  const s = l - Math.min(r, g, b);
  const h = s
    ? l === r
      ? (g - b) / s
      : l === g
      ? 2 + (b - r) / s
      : 4 + (r - g) / s
    : 0;
  const result = [
    60 * h < 0 ? 60 * h + 360 : 60 * h,
    100 * (s ? (l <= 0.5 ? s / (2 * l - s) : s / (2 - (2 * l - s))) : 0),
    (100 * (2 * l - s)) / 2,
  ];
  return [Math.floor(result[0]), Math.floor(result[1]), Math.floor(result[2])];
}
//convert RGB values to HSL values
export function HSLToRGB(h, s, l) {
  s /= 100;
  l /= 100;
  const k = (n) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n) =>
    l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return [
    Math.floor(255 * f(0)),
    Math.floor(255 * f(8)),
    Math.floor(255 * f(4)),
  ];
}
//hex values from decimal
export function numtoHex(number) {
  const value = number.toString();

  switch (value) {
    case "0":
      return "0";
    case "1":
      return "1";
    case "2":
      return "2";
    case "3":
      return "3";
    case "4":
      return "4";
    case "5":
      return "5";
    case "6":
      return "6";
    case "7":
      return "7";
    case "8":
      return "8";
    case "9":
      return "9";
    case "10":
      return "A";
    case "11":
      return "B";
    case "12":
      return "C";
    case "13":
      return "D";
    case "14":
      return "E";
    case "15":
      return "F";
  }
}
//converts rgb color to hex value
export function rgbToHex(arr) {
  const first = arr[0];
  const second = arr[1];
  const third = arr[2];
  function createTouple(number) {
    const newFirst = numtoHex(Math.round((number - (number % 16)) / 16));
    const newSecond = Math.round(number % 16);
    //fix for when Math.round round up to 16 out of possivle 15...
    const updatedNewSecond =
      newSecond == 16 ? numtoHex(15) : numtoHex(newSecond);
    return newFirst + updatedNewSecond;
  }

  const hex =
    "#" + createTouple(first) + createTouple(second) + createTouple(third);
  return hex;
}

//switch the theme
export function switchTheme() {
  const colorState = getComputedStyle(
    document.documentElement
  ).getPropertyValue("--cp-White");

  if (colorState.trim() === "white") {
    darkMode();
  } else {
    lightMode();
  }
  function lightMode() {
    document.documentElement.style.setProperty("--cp-White", "white");
    document.documentElement.style.setProperty("--cp-Black", "rgb(25, 25, 25)");
    document.documentElement.style.setProperty(
      "--cp-Black60",
      "rgb(25, 25, 25, 0.6)"
    );
    document.documentElement.style.setProperty(
      "--cp-GreyLight",
      "rgb(63, 63, 63)"
    );
    document.documentElement.style.setProperty(
      "--cp-GreyLighter",
      "rgb(80, 80, 80)"
    );
  }
  function darkMode() {
    document.documentElement.style.setProperty("--cp-White", "rgb(25, 25, 25)");
    document.documentElement.style.setProperty("--cp-Black", "white");
    document.documentElement.style.setProperty(
      "--cp-Black60",
      "rgb(250, 250, 250,0.6)"
    );
    document.documentElement.style.setProperty(
      "--cp-GreyLight",
      "rgb(213, 213, 213)"
    );
    document.documentElement.style.setProperty(
      "--cp-GreyLighter",
      "rgb(227, 227, 227)"
    );
  }
}

export function createHueWheel(offset) {
  const parent = document.querySelector(".hueCircleBase");
  const outlineOuterCoef = 25;
  parent.style.height = `${offset}rem`;
  parent.style.width = `${offset}rem`;
  parent.style.outlineStyle = `solid`;
  parent.style.outlineWidth = `${offset / 10 + offset / outlineOuterCoef}rem`; //
  parent.style.outlineColor = `var(--cp-Black60)`;
  parent.style.margin = `${offset / 10 + offset / 50}rem`;
  let element;
  for (let i = 0; i < 360; i = i + 4) {
    element = document.createElement("div");
    element.className = "hue";
    element.id = `hue${i}`;
    element.style.background = `hsl(${i},${50}%,${50}%)`;
    element.style.transform = `rotate(${i}deg)`;
    element.style.position = `absolute`;

    //(x, y) = (r * cos(θ), r * sin(θ))
    const borderEdgeOffset = 0.2; //rem

    const x = (offset / 2 + borderEdgeOffset) * Math.cos((i * Math.PI) / 180);
    const y = (offset / 2 + borderEdgeOffset) * Math.sin((i * Math.PI) / 180);
    const roundedX = Math.round((x + Number.EPSILON) * 100) / 100;
    const roundedY = Math.round((y + Number.EPSILON) * 100) / 100;

    //since cos 0 is 1, offset back by 1
    element.style.left = `${roundedX + offset / 2}rem`;
    element.style.top = `${roundedY + offset / 2}rem`;

    parent.appendChild(element);
  }
}

//tooltip
export function tooltip(message) {
  document.querySelector("#tooltip").innerText = message;
}
export function copyToClip(target) {
  navigator.clipboard.writeText(target.innerText);
  tooltip(`Copied ${target.innerText} to clipboard.`);
}
export function copyToClip2(value) {
  navigator.clipboard.writeText(value);
  tooltip(`Copied ${value} to clipboard.`);
}

//generate the color paletter
export function generatePalette() {
  const COLOR = document.querySelector("#mainColor");
  const txtH = COLOR.dataset.hColor;
  const txtS = COLOR.dataset.sColor;
  const txtL = COLOR.dataset.lColor;
  const h = parseInt(txtH, 10);
  const s = parseInt(txtS, 10);
  const l = parseInt(txtL, 10);
  const hsl2 = `hsl(${assingNumber(h, 30, 360)},${assingNumber(
    s,
    20,
    100
  )}%,${assingNumber(l, 20, 100)}%)`;
  const hsl3 = `hsl(${assingNumber(h, 60, 360)},${assingNumber(
    s,
    20,
    100
  )}%,${assingNumber(l, 20, 100)}%)`;
  const hsl4 = `hsl(${assingNumber(h, 150, 360)},${assingNumber(
    s,
    20,
    100
  )}%,${assingNumber(l, 20, 100)}%)`;
  const COLOR2 = document.querySelector(".secondP");
  COLOR2.style.background = hsl2;
  const COLOR3 = document.querySelector(".thirdP");
  COLOR3.style.background = hsl3;
  const COLOR4 = document.querySelector(".fourthP");
  COLOR4.style.background = hsl4;

  function updateHex(id) {
    function styleToHex(string) {
      const pureString = string.slice(4, -1).split(", ");
      const intString = pureString.map((element) => parseInt(element, 10));
      const hexString = rgbToHex(intString);
      return hexString;
    }

    const hex = styleToHex(document.querySelector(`.${id}`).style.background);
    //converts CSS data to Hex
    document.querySelector(`.hex${id}`).innerText = hex;
  }
  updateHex("thirdP");
  updateHex("secondP");
  updateHex("fourthP");
  updateComposition();
  function updateComposition() {
    document.querySelector(".composition").style.background =
      document.querySelector(".hex").innerText;
    document.querySelector(".comp1").style.background =
      document.querySelector(".fourthP").innerText;
    document.querySelector(".comp2").style.background =
      document.querySelector(".fourthP").innerText;
    document.querySelector(".comp3").style.background =
      document.querySelector(".secondP").innerText;
    document.querySelector(".comp4").style.background =
      document.querySelector(".thirdP").innerText;
    document.querySelector(".comp5").style.background =
      document.querySelector(".thirdP").innerText;
  }
}

function assingNumber(initial, increment, limit) {
  let returnValue;
  increment = Math.floor(Math.random() * increment + increment / 3);
  increment = initial + increment > limit ? -increment : increment;
  returnValue = initial + increment;
  return returnValue;
}

export function switchPalType(target) {
  target.innerText =
    target.innerText == "Type:60-30-10" ? "Type:4-Color" : "Type:60-30-10";
  const targetColor = document.querySelector(".secondP");
  if (targetColor.style.display == "none") {
    targetColor.style.display = "flex";
    document.querySelector(".mainP").style.flex = 1;
    document.querySelector(".thirdP").style.flex = 1;
    document.querySelector(".fourthP").style.flex = 1;
    document.querySelector(".comp3").style.display = "block";
  } else {
    targetColor.style.display = "none";
    document.querySelector(".mainP").style.flex = 6;
    document.querySelector(".thirdP").style.flex = 1;
    document.querySelector(".fourthP").style.flex = 3;
    document.querySelector(".comp3").style.display = "none";
  }
}

function affectCircle(value) {
  let arr = [];
  value = parseInt(value, 10);
  for (let i = 0; i < 360; i = i + 4) {
    arr.push(i);
  }
  if (arr.indexOf(value) > 0) {
    if (document.querySelector("#circleContainer").dataset.lastSelected) {
      const last =
        document.querySelector("#circleContainer").dataset.lastSelected;
      document.querySelector(last).style.outline = "none";
    }
    const idTargetNum = arr.indexOf(value);
    const idTarget = `#hue${arr[idTargetNum]}`;
    document.querySelector(idTarget).style.outline =
      "0.2rem solid var(--cp-White)";
    document.querySelector("#circleContainer").dataset.lastSelected = idTarget;
  }
}
