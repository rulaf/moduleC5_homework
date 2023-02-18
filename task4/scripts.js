const btn = document.querySelector(".fetch-request");
//const divResultNode = document.querySelector(".result");

const useRequest = (urlAttrib) => {
  return fetch(urlAttrib)
    .then(() => {
      photoHtmlString = `
      <div>
        <img
          src="${urlAttrib}"
        />
      </div>
    `;
      const divResultNode = document.querySelector(".result");
      divResultNode.innerHTML = photoHtmlString;
    })
    .catch(() => {
      console.log("error");
    });
};

function clearDisplayResult() {
  const divResultNode = document.querySelector(".result");
  divResultNode.innerHTML = "";
  divResultNode.textContent = "Ответ от сервера...";
}

btn.addEventListener("click", async () => {
  let errorNumbersNode = document.querySelector("#errorNumbers");
  if (errorNumbersNode) {
    errorNumbersNode.remove();
  }
  const widthOfPhoto = Number(document.querySelector("#width").value);
  const heightOfPhoto = Number(document.querySelector("#height").value);
  if (
    isNaN(widthOfPhoto) ||
    isNaN(heightOfPhoto) ||
    widthOfPhoto < 100 ||
    widthOfPhoto > 300 ||
    heightOfPhoto < 100 ||
    heightOfPhoto > 300
  ) {
    const lastButtonNode = document.querySelector("#height");
    lastButtonNode.insertAdjacentHTML(
      "afterend",
      '<div id = "errorNumbers">Одно из чисел вне диапазона от 100 до 300.</div>'
    );
    clearDisplayResult();
  } else {
    urlParam = `https://picsum.photos/${widthOfPhoto}/${heightOfPhoto}`;
    await useRequest(urlParam);
    //const requestResult = await useRequest(urlParam); // проверка асинхронности
    //console.log("requestResult", requestResult); // проверка асинхронности
  }
});
