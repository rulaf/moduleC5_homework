const myJSON = localStorage.getItem("responseJSON");
if (myJSON) {
  document.addEventListener(
    "DOMContentLoaded",
    displayResult(JSON.parse(myJSON))
  );
}

const btn = document.querySelector(".fetch-request");

const useRequest = (urlAttrib) => {
  return fetch(urlAttrib)
    .then((response) => {
      return response.json();
    })
    .then((jsonResponseData) => {
      localStorage.setItem("responseJSON", JSON.stringify(jsonResponseData));
      displayResult(jsonResponseData);
    })
    .catch(() => {
      console.log("fetch error");
    });
};

function displayResult(jsonReceivedData) {
  let photos = "";
  jsonReceivedData.forEach((item) => {
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
  const divResultNode = document.querySelector(".result");
  divResultNode.innerHTML = photos;
}

function removeDisplayResult() {
  const divResultNode = document.querySelector(".result");
  divResultNode.innerHTML = "";
  divResultNode.textContent = "";
}

const inputNodes = document.querySelectorAll("input"); //для подсчёта кол-ва неправильных input
const inputNodesLength = inputNodes.length; //для подсчёта кол-ва неправильных input

// подсчёт кол-ва неправильных input=ов:
function inputCheck() {
  const inputErrorsArray = [];
  for (const inputNode of inputNodes) {
    const inputNumber = Number(inputNode.value);
    if (isNaN(inputNumber) || inputNumber < 1 || inputNumber > 10) {
      inputErrorsArray.push(inputNode.id);
    }
  }
  return inputErrorsArray;
}

btn.addEventListener("click", async () => {
  let errNodes = document.querySelectorAll(".error");
  if (errNodes.length !== 0) {
    errNodes.forEach(function (item, index, array) {
      item.remove();
    });
    array = [];
  }
  let errorNodesIds = inputCheck();
  // варианты неправильных inputs:
  let inputValidation =
    errorNodesIds.length == 0
      ? "valid_inputs"
      : errorNodesIds.length < inputNodesLength
      ? "invalid_some_inputs"
      : "invalid_all_inputs";

  switch (inputValidation) {
    case "valid_inputs":
      const pageNumber = Number(document.querySelector("#pageNum").value);
      const limitNumber = Number(document.querySelector("#limit").value);
      urlParam = `https://picsum.photos/v2/list?page=${pageNumber}&limit=${limitNumber}`;
      await useRequest(urlParam);
      break;
    case "invalid_some_inputs":
      // формируем сообщение для пользователя:
      for (const errorNodeId of errorNodesIds) {
        const errorNode = document.querySelector(`#${errorNodeId}`);
        errorNode.insertAdjacentHTML(
          "afterend",
          `<div class = "error">${errorNode.labels[0].textContent.slice(
            0,
            -1
          )} вне диапазона от 1 до 10.</div>`
        );
      }
      removeDisplayResult();
      break;
    case "invalid_all_inputs":
      const errorNames = [];
      // формируем сообщение для пользователя:
      for (const errorNode of inputNodes) {
        errorNames.push(errorNode.labels[0].textContent.slice(0, -1));
      }
      btn.insertAdjacentHTML(
        "beforebegin",
        `<div class = "error">${
          errorNames[0]
        } и ${errorNames[1].toLowerCase()} вне диапазона от 1 до 10.</div>`
      );
      removeDisplayResult();
      break;
    default:
      console.log(`Sorry`);
  }
});
