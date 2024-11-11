// Изменение цвета при успешной отправке данных
export function changeColorSelect(id1) {
  document
    .querySelectorAll(`#${id1} > div`)
    .forEach((el) => (el.style.background = "#66c43a38"));
  document.querySelector(`#${id1} > article > button`).style.background =
    "#66c43a38";
  setTimeout(()=>{deleteColor(id1)},3200)
}
function deleteColor(id1) {
  document
    .querySelectorAll(`#${id1} > div`)
    .forEach((el) => (el.style.background = "none"));
  document.querySelector(`#${id1} > article > button`).style.background =
    "none";
}
// Изменение цвета при неуспешной отправке данных
export function changeErrorColorSelect(id1) {
  document
    .querySelectorAll(`#${id1} > div`)
    .forEach((el) => (el.style.background = "#ab4949af"));
  document.querySelector(`#${id1} > article > button`).style.background =
    "#ab4949af";
}