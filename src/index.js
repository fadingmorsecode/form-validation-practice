import "./main.css";
import country from "country-list-js";

const countryNames = country.names().sort();
const countrySelector = document.querySelector("#country");

const defaultOption = document.createElement("option");
defaultOption.value = "";
defaultOption.textContent = "Select your country";
countrySelector.appendChild(defaultOption);

countryNames.forEach((country) => {
  const option = document.createElement("option");
  option.value = `${country}`;
  option.textContent = `${country}`;
  countrySelector.appendChild(option);
});

const form = document.querySelector("form");
const email = document.querySelector("#email");
const zip = document.querySelector("#zip");
const password = document.querySelector("#pass");
const confirmpass = document.querySelector("#confirm-pass");
const countryError = document.querySelector("#country + span.error");
const emailError = document.querySelector("#email + span.error");
const zipError = document.querySelector("#zip + span.error");
const passError = document.querySelector("#pass + span.error");
const confirmPassError = document.querySelector("#confirm-pass + span.error");

function showEmailError() {
  if (email.validity.valueMissing) {
    emailError.textContent = "Please enter an email address";
  } else if (email.validity.typeMismatch) {
    emailError.textContent = "Entered value must be an email address";
  } else if (email.validity.tooShort) {
    emailError.textContent = `Please enter at least ${email.minLength} characters, you entered ${email.value.length}`;
  }
}

function showCountryError() {
  if (countrySelector.value === "") {
    countryError.textContent = "Please select your country";
  }
}

function showZipError() {
  if (zip.validity.valueMissing) {
    zipError.textContent = "Please enter a zip code";
  }
}

function showPassError() {
  if (password.validity.valueMissing) {
    passError.textContent = "Please enter a password";
  } else if (password.validity.tooShort) {
    passError.textContent = `Password must be at least ${password.minLength}, you entered ${password.value.length}`;
  }
}

function showConfirmPassError() {
  if (confirmpass.validity.valueMissing) {
    confirmPassError.textContent = "Please confirm your password";
  } else if (confirmpass.value !== password.value) {
    confirmPassError.textContent = "Passwords do not match";
    console.log(confirmpass.validity.valid);
  }
}

function validateEmail() {
  if (email.validity.valid) {
    emailError.textContent = "";
  } else {
    showEmailError();
  }
}

email.addEventListener("input", validateEmail);

function validateCountry() {
  if (countrySelector.value === "") {
    countrySelector.setCustomValidity("Invalid");
    showCountryError();
    console.log(countrySelector.validity.valid);
  } else {
    countryError.textContent = "";
    countrySelector.setCustomValidity("");
    console.log(countrySelector.validity.valid);
  }
}

countrySelector.addEventListener("change", validateCountry);

function validateZip() {
  if (zip.validity.valid) {
    zipError.textContent = "";
  } else {
    showZipError();
  }
}

zip.addEventListener("input", validateZip);

function validatePassword() {
  if (password.validity.valid) {
    passError.textContent = "";
  } else {
    showPassError();
  }
}

password.addEventListener("input", validatePassword);

function validateConfirmPass() {
  if (
    !confirmpass.validity.valueMissing &&
    confirmpass.value === password.value
  ) {
    confirmPassError.textContent = "";
    confirmpass.setCustomValidity("");
    console.log(confirmpass.validity.valid);
  } else {
    confirmpass.setCustomValidity("Invalid");
    showConfirmPassError();
  }
}

confirmpass.addEventListener("input", validateConfirmPass);

function formValidate(event) {
  if (
    !email.validity.valid ||
    !countrySelector.validity.valid ||
    !zip.validity.valid ||
    !password.validity.valid ||
    !confirmpass.validity.valid
  ) {
    showEmailError();
    showCountryError();
    showZipError();
    showPassError();
    showConfirmPassError();
    event.preventDefault();
  }
}

form.addEventListener("submit", formValidate);
