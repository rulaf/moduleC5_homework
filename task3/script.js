function useRequest(urlForRequest, callback_func) {
  var xhr_request = new XMLHttpRequest();
  xhr_request.open("GET", urlForRequest, true);

  xhr_request.onload = function () {
    if (xhr_request.status != 200) {
      console.log("Статус ответа: ", xhr_request.status);
    } else {
      const resultOfRequest = JSON.parse(xhr_request.response);
      if (callback_func) {
        callback_func(resultOfRequest);
      }
    }
  };

  xhr_request.onerror = function () {
    console.log("Ошибка: ", xhr_request.status);
  };

  xhr_request.send();
}

const divResultNode = document.querySelector(".xhr-result");
const buttonNode = document.querySelector(".xhr-request");

function displayResult(jsonResponseData) {
  let photos = "";
  jsonResponseData.forEach((item) => {
    const photosHtmlString = `
      <div class="card">
        <img
          src="${item.download_url}"
          class="card-image"
        />
        <p>${item.author}</p>
      </div>
    `;
    photos += photosHtmlString;
  });
  divResultNode.innerHTML = photos;
}

buttonNode.addEventListener("click", () => {
  const numberOfPhotos = Number(document.querySelector("input").value);
  let errorNumberNode = document.querySelector("#errorNumber");
  if (errorNumberNode) {
    errorNumberNode.remove();
  }
  if (numberOfPhotos < 1 || numberOfPhotos > 10) {
    buttonNode.insertAdjacentHTML(
      "afterend",
      `<div id = "errorNumber">Число вне диапазона от 1 до 10.</div>`
    );
  } else {
    useRequest(
      `https://picsum.photos/v2/list?limit=${numberOfPhotos}`,
      displayResult
    );
  }
});
