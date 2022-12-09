const apiRequest = "https://api.3cx.com/public/v1/order/expiringkeys";
const apiHeader = {
  method: "GET",
  headers: {
    'Authorization': 'Basic ' + btoa('h7JSaJbQOALydkQvtUbt:'),
    mode: 'no-cors' 
    }
};
async function licenseApiRequest() {
  try {
    let response = await fetch(apiRequest,apiHeader);
    let licenseData = await response.json();
    return licenseData;
  } catch (error) {
    return error;
  }
}
function findLicense(licenseData, user) {
  let data = licenseData.filter(item => {
    return item.LicenseKey == user;
  });
  return realData = data[0];
}
function addRow(userInfo) {

  let tableBody = document.querySelector(".table-body");
  let newTableRow = document.createElement("tr");

  /*for (const value of Object.values(userInfo)) {
    console.log(value);*/

  for (const value of Object.values(userInfo)) {
    console.log(value);
    const newTableColumn = document.createElement("td");
    newTableColumn.textContent = value;
    newTableRow.appendChild(newTableColumn);    
  }
  tableBody.appendChild(newTableRow);
}

function setInputError (inputElement, message) {
  inputElement.classList.add("search-bar-error", "search-bar-message-error");
  inputElement.parentElement.querySelector(".search-bar-error-message").textContent = message;
}

function clearInputError(inputElement) {
  inputElement.classList.remove("search-bar-error", "search-bar-message-error");
  inputElement.parentElement.querySelector(".search-bar-error-message").innerText = '';
}

document.addEventListener("DOMContentLoaded", () => {
  const searchBar = document.querySelector(".search-bar");  
  const licenseInput = searchBar.querySelector(".license-input");

  searchBar.addEventListener("submit", async e => {
    e.preventDefault();    
    const userlicense = licenseInput.value;    
    let licenseJson = await licenseApiRequest();
    let userData = findLicense(licenseJson, userlicense);
    addRow(userData);    
  });
  licenseInput.addEventListener("blur", e => {    
    searchBar.addEventListener("input", e => {
      clearInputError(licenseInput);
    });
  });
  
});

