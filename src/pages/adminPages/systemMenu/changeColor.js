  // Изменение цвета при успешной отправке данных
  export function changeColorSelect(id1) {
    document
      .querySelectorAll(`#${id1} > div`)
      .forEach((el) => (el.style.background = "#66c43a38"));
    document.querySelector(`#${id1} > article > button`).style.background =
      "#66c43a38";
  }
  // Изменение цвета при неуспешной отправке данных
  export function changeErrorColorSelect(id1) {
    document
      .querySelectorAll(`#${id1} > div`)
      .forEach((el) => (el.style.background = "#ab4949af"));
    document.querySelector(`#${id1} > article > button`).style.background =
      "#ab4949af";
  }