export default function makeSlider(labelLetter, id, colorValue, max) {
  function changeValue(event, id2) {
    let element = event.target;
    let value = document.querySelector(`#${id2}`);
    value.innerHTML = element.value;
    document.querySelector(`#mainColor`);
  }

  let container = document.createElement("div");
  container.className = "sliderContainer";
  let label1 = document.createElement("label");
  label1.innerHTML = labelLetter;
  label1.className = "labelLetter";
  let element = document.createElement("input");
  element.type = "range";
  element.min = 0;
  element.max = max;
  element.id = id;
  element.value = max;
  let label2 = document.createElement("label");
  label2.for = "rColor";
  label2.id = colorValue;
  label2.innerText = max;
  container.appendChild(label1);
  container.appendChild(element);
  container.appendChild(label2);
  element.addEventListener("input", (event) => changeValue(event, colorValue));
  return container;
  /* document.querySelector(".panel").appendChild(container);*/
}
//Create the element that will display the main color value
export function makeMainColor() {
  let COLOR = document.createElement("div");
  let hexText = document.createElement("div");
  hexText.className = "hex";
  hexText.innerHTML = "#FFFFFF";
  COLOR.appendChild(hexText);
  COLOR.id = "mainColor";
  COLOR.dataset.rColor = 255;
  COLOR.dataset.gColor = 255;
  COLOR.dataset.bColor = 255;
  COLOR.dataset.hColor = 360;
  COLOR.dataset.sColor = 100;
  COLOR.dataset.lColor = 100;
  COLOR.style.background = "rgb(255,255,255)";
  document.querySelector("#colors").appendChild(COLOR);
}
//Create the element that will display the complementary color value
export function makeComplementaryColor() {
  let COLOR = document.querySelector("#mainColor");
  let initH = parseFloat(COLOR.dataset.hColor);
  let h = initH + 180 > 360 ? initH + 180 - 360 : initH + 180;
  let hsl = [h, COLOR.dataset.sColor, COLOR.dataset.lColor];
  let COLOR2 = document.createElement("div");
  COLOR2.id = "compColor";
  COLOR2.style.background = `hsl(${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%)`;
  // COLOR2.style.background = `hsl(${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%)`;
  document.querySelector("#colors").appendChild(COLOR2);
}
//event handler for changing the complamentary color when main color changes
function modCompColor() {
  let COLOR = document.querySelector("#mainColor");
  let initH = parseFloat(COLOR.dataset.hColor);
  let h = initH + 180 > 360 ? initH + 180 - 360 : initH + 180;
  let hsl = [h, COLOR.dataset.sColor, COLOR.dataset.lColor];
  let COLOR2 = document.querySelector("#compColor");
  COLOR2.style.background = `hsl(${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%)`;
}

//handler that changed the main hex value depending on slider cahnges
function affectHex() {
  let hex = document.querySelector(".hex");
  let COLOR = document.querySelector("#mainColor");
  hex.innerHTML = rgbToHex([
    COLOR.dataset.rColor,
    COLOR.dataset.gColor,
    COLOR.dataset.bColor,
  ]);
}
//used to change main color when one of the RGB inputs is changed
export function makeRGBInfluence() {
  document.querySelector("#instruments").addEventListener("input", (event) => {
    changeMainColor(event.target.id, event.target.value);
  });

  function changeMainColor(data, value) {
    let COLOR = document.querySelector("#mainColor");
    affectHex();
    COLOR.dataset[data] = value;
    if (data == "rColor" || data == "gColor" || data == "bColor") {
      COLOR.style.background = `rgb(${COLOR.dataset.rColor},${COLOR.dataset.gColor},${COLOR.dataset.bColor})`;
      COLOR.dataset.hColor = RGBToHSL(
        COLOR.dataset.rColor,
        COLOR.dataset.gColor,
        COLOR.dataset.bColor
      )[0];
      document.querySelector("#hColor").value = COLOR.dataset.hColor;
      COLOR.dataset.sColor = RGBToHSL(
        COLOR.dataset.rColor,
        COLOR.dataset.gColor,
        COLOR.dataset.bColor
      )[1];
      document.querySelector("#sColor").value = COLOR.dataset.sColor;
      COLOR.dataset.lColor = RGBToHSL(
        COLOR.dataset.rColor,
        COLOR.dataset.gColor,
        COLOR.dataset.bColor
      )[2];
      document.querySelector("#lColor").value = COLOR.dataset.lColor;
      modCompColor();
    }
    if (data == "hColor" || data == "sColor" || data == "lColor") {
      modCompColor();
      COLOR.style.background = `hsl(${COLOR.dataset.hColor},${COLOR.dataset.sColor}%,${COLOR.dataset.lColor}%)`;
    }
    console.log(
      RGBToHSL(COLOR.dataset.rColor, COLOR.dataset.gColor, COLOR.dataset.bColor)
    );
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
  let result = [
    60 * h < 0 ? 60 * h + 360 : 60 * h,
    100 * (s ? (l <= 0.5 ? s / (2 * l - s) : s / (2 - (2 * l - s))) : 0),
    (100 * (2 * l - s)) / 2,
  ];
  return [Math.floor(result[0]), Math.floor(result[1]), Math.floor(result[2])];
}
export function numtoHex(number) {
  let value = number.toString();

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
  let first = arr[0];
  let second = arr[1];
  let third = arr[2];

  function createTouple(number) {
    let newFirst = numtoHex((number - (number % 16)) / 16);
    let newSecond = numtoHex(number % 16);
    console.log((number - (number % 16)) / 16, number % 16);
    return newFirst.toString() + newSecond.toString();
  }

  let hex =
    "#" + createTouple(first) + createTouple(second) + createTouple(third);
  return hex;
}
export function switchTheme() {
  let colorState = getComputedStyle(document.documentElement).getPropertyValue(
    "--cp-White"
  );

  if (colorState.trim() === "white") {
    darkMode();
  } else {
    lightMode();
  }
  function lightMode() {
    console.log("switched to light");
    document.documentElement.style.setProperty("--cp-White", "white");
    document.documentElement.style.setProperty("--cp-Black", "rgb(25, 25, 25)");
  }
  function darkMode() {
    console.log("switched to dark");
    document.documentElement.style.setProperty("--cp-White", "rgb(25, 25, 25)");
    document.documentElement.style.setProperty("--cp-Black", "white");
  }
}

export function createHueWheel(offset) {
  let parent = document.querySelector(".hueCircleBase");
  parent.style.height = `${offset}rem`;
  parent.style.width = `${offset}rem`;
  parent.style.background = `var(--cp-Black)`;
  parent.style.outlineStyle = `solid`;
  parent.style.outlineWidth = `${offset / 10 + offset / 50}rem`; //
  parent.style.outlineColor = `var(--cp-Black)`;
  parent.style.margin = `${offset / 10 + offset / 50}rem`;
  let element;
  for (let i = 0; i < 360; i = i + 3) {
    element = document.createElement("div");
    element.className = "hue";
    element.style.background = `hsl(${i},${50}%,${50}%)`;
    element.style.transform = `rotate(${i}deg)`;
    element.style.position = `absolute`;
    element.style.width = `${offset / 10}rem`;
    //(x, y) = (r * cos(θ), r * sin(θ))
    let x = (offset / 2) * Math.cos((i * Math.PI) / 180);
    let y = (offset / 2) * Math.sin((i * Math.PI) / 180);
    x = Math.round((x + Number.EPSILON) * 100) / 100;
    y = Math.round((y + Number.EPSILON) * 100) / 100;

    //since cos 0 is 1, offset back by 1
    element.style.left = `${x + offset / 2}rem`;
    element.style.top = `${y + offset / 2}rem`;

    parent.appendChild(element);
  }
}
