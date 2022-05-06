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
  /* document.querySelector(".body").appendChild(container);*/
}

export function makeMainColor() {
  let COLOR = document.createElement("div");
  COLOR.id = "mainColor";
  COLOR.dataset.rColor = 255;
  COLOR.dataset.gColor = 255;
  COLOR.dataset.bColor = 255;
  COLOR.dataset.hColor = 255;
  COLOR.dataset.sColor = 255;
  COLOR.dataset.lColor = 255;
  COLOR.style.background = "rgb(255,255,255)";
  COLOR.style.borderRadius = "0.5rem";
  document.querySelector(".body").appendChild(COLOR);
}
export function makeRGBInfluence() {
  document
    .querySelector(".body")
    .addEventListener("input", (event) =>
      changeMainColor(event.target.id, event.target.value)
    );

  function changeMainColor(data, value) {
    let COLOR = document.querySelector("#mainColor");
    COLOR.dataset[data] = value;
    if (data == "rColor" || data == "gColor" || data == "bColor") {
      COLOR.style.background = `rgb(${COLOR.dataset.rColor},${COLOR.dataset.gColor},${COLOR.dataset.bColor})`;
    }
    if (data == "hColor" || data == "sColor" || data == "lColor") {
      console.log("triggered");
      COLOR.style.background = `hsl(${COLOR.dataset.hColor},${COLOR.dataset.sColor}%,${COLOR.dataset.lColor}%)`;
    }
    console.log(
      RGBToHSL(COLOR.dataset.rColor, COLOR.dataset.gColor, COLOR.dataset.bColor)
    );
  }
}

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
  let value = toString(number);
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

export function rgbToHex(arr) {
  let first = arr[0];
  let second = arr[1];
  let third = arr[2];

  let newFirst = numtoHex((first - (first % 16)) / 16);
  let newFistAdd = numtoHex(first % 16);
}
