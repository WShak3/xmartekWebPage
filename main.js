function setFormMessage (formElement, type, message) {
  const messageElement = formElement.querySelector('.form-message-error');
  messageElement.textContent = message;
  messageElement.classList.remove('form-message-error');
  messageElement.classList.add("form-message-"+ type);
}

function setInputError (inputElement, message) {
    inputElement.classList.add("input-form-error");
    inputElement.parentElement.querySelector(".form-error-message").textContent = message;
}

function clearInputError(inputElement) {
  inputElement.classList.remove("input-form-error");
  inputElement.parentElement.querySelector(".form-error-message").innerText = '';
}

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.querySelector(".login-container");
  const createAccForm = document.querySelector(".signup-container");

  document.querySelector("#link-create-account").addEventListener("click", e => {
    e.preventDefault();
    loginForm.classList.add("hiddenContainer");
    createAccForm.classList.remove("hiddenContainer");
  });

  document.querySelector("#linkLogin").addEventListener("click", e => {
    e.preventDefault();
    createAccForm.classList.add("hiddenContainer");
    loginForm.classList.remove("hiddenContainer");    
  });

  loginForm.addEventListener("submit", e => {
    e.preventDefault();
    //AJAX/Fetch login
    const user = [{
      email: 'wroldan@outlook.es',
      password: 'xmartek123'
    }]    
    const loginUser = loginForm.querySelector("#email").value;
    const loginPassword = loginForm.querySelector("#password").value;

    if (loginUser === 'wroldan@outlook.es' && loginPassword === 'xmartek123') {
      window.location.replace('/expiring_licence.html');
    } else {
      setFormMessage(loginForm, "error", "Invalid username or password");
    }    
  });

  document.querySelectorAll(".input-form-control").forEach(inputElement => {
    inputElement.addEventListener("blur", e => {
      if (e.target.id === "userName") {
        if (e.target.value.length > 0 && e.target.value.length < 10) {
          setInputError(inputElement,"Username must be at least 10 characters in lenght");
        }
      } else if (e.target.id === "email" || e.target.id === "createEmail") {
        if (e.target.value.length > 0 && e.target.value.length < 10) {
          setInputError(inputElement,"Invalid email address");
        }
      }
    });

    inputElement.addEventListener("input", e => {
      if (e.target.id === "password") {
        return;
      } else {
        clearInputError(inputElement);
      }      
    });
  });
});