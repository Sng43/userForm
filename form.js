document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById("form");
  const firstName = document.getElementById("firstName");
  const lastName = document.getElementById("lastName");
  const email = document.getElementById("email");
  const password = document.getElementById("password");
  const checks = document.querySelectorAll('[type="checkbox"]');

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
    if (validateInputs() && validateChecks()) {
      const firstNameValue = firstName.value;
      const lastNameValue = lastName.value;
      const emailValue = email.value;
      const passwordValue = password.value;

      const newValues = {
        firstName: firstNameValue,
        lastName: lastNameValue,
        email: emailValue,
        password: passwordValue,
        preferences: getSelectedCheckboxes()
      };

      let subscribers = JSON.parse(localStorage.getItem("subscribers")) || [];
      subscribers.push(newValues);
      localStorage.setItem("subscribers", JSON.stringify(subscribers));

      console.log("New user added:", newValues);

      // Clear form after successful submission (optional)
      form.reset();
    } else {
      console.log("Form validation failed.");
    }
  };

  const validateInputs = () => {
    let isValid = true;

    const firstNameValue = firstName.value.trim();
    const lastNameValue = lastName.value.trim();
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();

    if (firstNameValue === "") {
      setError(firstName, "First name is required");
      isValid = false;
    } else if (!isValidName(firstNameValue)) {
      setError(firstName, "Provide a valid name");
      isValid = false;
    } else {
      setSuccess(firstName);
    }

    if (lastNameValue === "") {
      setError(lastName, "Last name is required");
      isValid = false;
    } else if (!isValidName(lastNameValue)) {
      setError(lastName, "Provide a valid name");
      isValid = false;
    } else {
      setSuccess(lastName);
    }

    if (emailValue === "") {
      setError(email, "Email is required");
      isValid = false;
    } else if (!isValidEmail(emailValue)) {
      setError(email, "Provide a valid email address");
      isValid = false;
    } else {
      setSuccess(email);
    }

    if (passwordValue === "") {
      setError(password, "Password is required");
      isValid = false;
    } else if (!isValidPassword(passwordValue)) {
      setError(password, "Minimum 8 characters, at least one uppercase letter, one lowercase letter, one of these special characters (!@#$%^&*) and one number");
      isValid = false;
    } else {
      setSuccess(password);
    }

    return isValid;
  };

  const validateChecks = () => {
    const checked = Array.from(checks).some(cb => cb.checked);
    const subscriptionError = document.querySelector('.subs .error');

    if (!checked) {
      subscriptionError.innerText = "Please select at least one subscription preference";
      document.querySelector('.subs .inputs').classList.add("error");
      return false;
    } else {
      subscriptionError.innerText = "";
      document.querySelector('.subs .inputs').classList.remove("error");
      return true;
    }
  };

  const getSelectedCheckboxes = () => {
    const selectedCheckboxes = Array.from(checks)
      .filter(cb => cb.checked)
      .map(cb => cb.value);
    return selectedCheckboxes;
  };

  form.addEventListener("submit", signup);
});
