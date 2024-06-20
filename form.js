document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById("form");
  const firstName = document.getElementById("firstName");
  const lastName = document.getElementById("lastName");
  const email = document.getElementById("email");
  const password = document.getElementById("password");

  const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector(".error");

    errorDisplay.innerText = message;
    inputControl.classList.add("error");
    inputControl.classList.remove("success");
  };

  const setSuccess = (element) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector(".error");

    errorDisplay.innerText = "";
    inputControl.classList.add("success");
    inputControl.classList.remove("error");
  };

  const isValidEmail = (email) => {
    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return pattern.test(String(email).toLowerCase());
  };

  const isValidPassword = (password) => {
    const pattern = /(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    return pattern.test(String(password));
  };

  const isValidName = (name) => {
    const pattern = /^[a-zA-Zà-ÿÀ-ÿ]+(?:[-'\s][a-zA-Zà-ÿÀ-ÿ]+)*$/;
    return pattern.test(String(name));
  };

  const signup = (e) => {
    e.preventDefault();
    validateInputs();

    if (form.querySelectorAll(".success").length === 4) {
      const firstNameValue = firstName.value;
      const lastNameValue = lastName.value;
      const emailValue = email.value;
      const passwordValue = password.value;

      const newValues = {
        firstName: firstNameValue,
        lastName: lastNameValue,
        email: emailValue,
        password: passwordValue
      };

      let values = JSON.parse(localStorage.getItem("subscribers")) || [];
      
      values.push(newValues);
      
      localStorage.setItem("subscribers", JSON.stringify(values));
      console.log(values);
    }
  };

  const validateInputs = () => {
    const firstNameValue = firstName.value.trim();
    const lastNameValue = lastName.value.trim();
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();

    if (firstNameValue === "") {
      setError(firstName, "First name is required");
    } else if (!isValidName(firstNameValue)) {
      setError(firstName, "Provide a valid name");
    } else {
      setSuccess(firstName);
    }

    if (lastNameValue === "") {
      setError(lastName, "Last name is required");
    } else if (!isValidName(lastNameValue)) {
      setError(lastName, "Provide a valid name");
    } else {
      setSuccess(lastName);
    }

    if (emailValue === "") {
      setError(email, "Email is required");
    } else if (!isValidEmail(emailValue)) {
      setError(email, "Provide a valid email address");
    } else {
      setSuccess(email);
    }

    if (passwordValue === "") {
      setError(password, "Password is required");
    } else if (!isValidPassword(passwordValue)) {
      setError(password, "Minimum 8 characters, at least one uppercase letter, one lowercase letter, one of these special characters (!@#$%^&*) and one number");
    } else {
      setSuccess(password);
    }
  };

  form.addEventListener("submit", signup);
});
