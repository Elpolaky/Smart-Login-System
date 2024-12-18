"use strict";
let userInput = document.querySelectorAll(".userInput");
let welcomeMessage = document.querySelector("section h2");
let signUpBtn = document.querySelector("#signUpBtn");
let signInBtn = document.querySelector("#signInBtn");
let signInLink = document.querySelector("#signInLink");
let signUpLink = document.querySelector("#signUpLink");
let logOut = document.querySelector("#logOut");
let nav = document.querySelector("nav");
let succesfulMessage = document.querySelector("#succesfulMessage");

let usersInfoList = ["intiate", "intiate"];
const signUp = 1;
const signIn = 2;
const home = 3;
let pageStatus = signIn;
const displayNone = "d-none";
const userKey = "users";

(function () {
  if (localStorage.length) {
    usersInfoList = [];
    usersInfoList = JSON.parse(localStorage.getItem(userKey));
  }
  for (const input of userInput) {
    input.addEventListener("input", (e) =>
      pageStatus == signUp ? signUpValidation(e.target) : pageStatus
    );
  }
  updateCureentPage();
})();

signUpBtn.addEventListener("click", () => {
  let validateReuslt = 1;
  for (const input of userInput) {
    validateReuslt &= signUpValidation(input);
  }
  if (validateReuslt) {
    addUser();
    succesfulMessageDislay("Sign Up");
    pageStatus = signIn;
    updateCureentPage();
    // window.alert("Sign Up is sucssesfully done");
  } else {
  }
});
signInBtn.addEventListener("click", () => {
  if (signInValidation()) {
    succesfulMessageDislay("Sign In");
    pageStatus = home;
    updateCureentPage();
    // window.alert("sign in is done successfuly");
  } else {
  }
});

signInLink.addEventListener("click", () => {
  pageStatus = signIn;
  updateCureentPage();
});
signUpLink.addEventListener("click", () => {
  pageStatus = signUp;
  updateCureentPage();
});

logOut.addEventListener("click", () => {
  succesfulMessageDislay("log Out");
  pageStatus = signIn;
  updateCureentPage();
});

function addUser() {
  let userInfo = {
    name: userInput[0].value,
    email: userInput[1].value,
    password: userInput[2].value,
  };

  usersInfoList.push(userInfo);
  localStorage.setItem(userKey, JSON.stringify(usersInfoList));
  clearForm();
}

function clearForm() {
  for (const input of userInput) {
    input.value = "";
    input.classList.remove("is-valid");
    input.classList.remove("is-invalid");
    input.nextElementSibling.classList.replace(
      "invalidInfoShow",
      "invalidInfoHide"
    );
  }
}

function signUpValidation(info) {
  let savedusers;
  try {
    savedusers = [...usersInfoList] || [];
  } catch (error) {
    console.log(error);
  }
  let message = "";
  let result = false;

  let regex = {
    userName: /^[a-z]{2,10}[0-9]{0,5}$/,
    userEmail: /^[a-zA-Z0-9]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    userPassword: /^[a-zA-Z\d@$!%*?&]{8,}$/,
  };
  let duplicated = {
    userName: savedusers.map((names) => names.name),
    userEmail: savedusers.map((emails) => emails.email),
  };

  let ValidFormat = regex[info.id].test(info.value);

  let duplicatedInfo =
    info.id != "userPassword"
      ? duplicated[info.id].some((savedInfo) => info.value == savedInfo)
      : "";

  if (!ValidFormat) {
    if (info.id == "userName") {
      result = false;
      message =
        "Please enter a valid name that starts with a letter and can include numbers, but no special symbols. (max is 10 charcters)";
    } else if (info.id == "userEmail") {
      result = false;
      message =
        " Please enter a valid email address in the format example@domain.com.";
    } else if (info.id == "userPassword") {
      result = false;
      message = " Please enter a valid password with at least 8 characters";
    }
  }
  if (duplicatedInfo && info.id != "userPassword") {
    result = false;
    message = `Oops! It looks like this ${info.id} is already in use. Please try a different ${info.id}`;
  }
  if (ValidFormat && !duplicatedInfo) {
    result = true;
  }

  validationMessage(info, result, message);
  return result;
}

function validationMessage(userCurrentInput, validationResult, message) {
  if (validationResult) {
    userCurrentInput.classList.remove("is-invalid");
    userCurrentInput.classList.add("is-valid");
    userCurrentInput.nextElementSibling.classList.replace(
      "invalidInfoShow",
      "invalidInfoHide"
    );
  } else {
    userCurrentInput.classList.remove("is-valid");
    userCurrentInput.classList.add("is-invalid");
    userCurrentInput.nextElementSibling.classList.replace(
      "invalidInfoHide",
      "invalidInfoShow"
    );
    userCurrentInput.nextElementSibling.innerHTML = message;
  }
}

function updateCureentPage() {
  setTimeout(function () {
    clearForm();
    if (pageStatus == signUp) {
      userInput[0].classList.remove(displayNone); //username input show
      signUpBtn.classList.remove(displayNone);
      signInBtn.classList.add(displayNone);
      signInLink.classList.remove(displayNone);
      signUpLink.classList.add(displayNone);
      welcomeMessage.classList.add(displayNone);
      succesfulMessage.classList.replace("d-block", "d-none");

      nav.classList.add(displayNone);
    } else if (pageStatus == signIn) {
      userInput[1].classList.remove(displayNone); //useremail input hide
      userInput[2].classList.remove(displayNone); //userpassword input hide
      userInput[0].classList.add(displayNone); //username input hide
      signUpBtn.classList.add(displayNone);
      signInBtn.classList.remove(displayNone);
      signInLink.classList.add(displayNone);
      signUpLink.classList.remove(displayNone);
      welcomeMessage.classList.add(displayNone);
      nav.classList.add(displayNone);
      succesfulMessage.classList.replace("d-block", "d-none");
    } else if (pageStatus == home) {
      userInput[0].classList.add(displayNone); //username input hide
      signUpBtn.classList.add(displayNone);
      signInLink.classList.add(displayNone);
      userInput[1].classList.add(displayNone); //useremail input hide
      userInput[2].classList.add(displayNone); //userpassword input hide
      signInBtn.classList.add(displayNone);
      signUpLink.classList.add(displayNone);
      welcomeMessage.classList.remove(displayNone);
      nav.classList.remove(displayNone);
      succesfulMessage.classList.replace("d-block", "d-none");
    }
  }, 800);
}

function signInValidation() {
  if (!usersInfoList) {
    usersInfoList = []; // Ensure it's an array
  }
  let savedusers = [...usersInfoList];

  let userIndex = savedusers.findIndex(
    (userinfo) => userinfo.email == userInput[1].value
  );
  let message;
  let result;

  if (userIndex == -1) {
    result = 0;
    message = `Email not found , please check your entry and try again.`;
    validationMessage(userInput[1], result, message);
  } else {
    result = 1;
    validationMessage(userInput[1], result);

    if (savedusers[userIndex].password == userInput[2].value) {
      result = 1;
      validationMessage(userInput[2], result);
    } else {
      result = 0;
      message = `Incorrect password , please check your entry and try again.`;
      validationMessage(userInput[2], result, message);
    }
  }
  if (result) {
    homePage(savedusers[userIndex].name);
  }
  return result;
}

function homePage(currentUserName) {
  welcomeMessage.innerHTML = `Welcome ${currentUserName} <i class="fa-solid fa-bomb fa-shake"></i>`;
}

function succesfulMessageDislay(processType) {
  succesfulMessage.classList.replace("d-none", "d-block");
  if (processType == "log Out") {
    succesfulMessage.classList.replace("text-success", "text-white");
    succesfulMessage.innerHTML = `Good Bye <i class="fa-solid fa-hand-holding-heart"></i>`;
  } else {
    succesfulMessage.classList.replace("text-white", "text-success");
    succesfulMessage.innerHTML = `Succsessful ${processType} <i class="fa-regular fa-hand-peace"></i>`;
  }
}
