let registerForm = document.querySelector(".register");
let inputUsername = document.getElementById("username");
let inputEmail = document.getElementById("email");
let inputPassword = document.getElementById("password");
let inputRePassword = document.getElementById("repassword");

registerForm.onsubmit = async (event) => {
  // event.preventDefault();
  // Check username Input
  if (inputUsername.value.length < 5 || inputUsername.value.length > 15) {
    event.preventDefault();
    return alert("Please Enter name > 15 char");
  }

  if (!Number.isNaN(Math.round(inputUsername.value[0]))) {
    event.preventDefault();
    return alert("Please Enter Valid name ");
  }

  if (containsSpecialChars(inputUsername.value)) {
    event.preventDefault();
    return alert("Please don't Enter SpecialChars");
  }
  // Check email Input
  if (!inputEmail.value.includes("@")) {
    event.preventDefault();
    return alert("Please Enter Valid Email");
  }
  // Check Password
  if (inputPassword.value.length < 8) {
    event.preventDefault();
    return alert("Password must be at least 8 characters");
  }

  if (inputPassword.value !== inputRePassword.value) {
    event.preventDefault();
    return alert("Re-Password must be Same Password");
  }

  const user = {
    username: inputUsername.value,
    email: inputEmail.value,
    password: inputPassword.value,
    password_confirmation: inputRePassword.value,
  };

  try {
    const response = await fetch(
      "https://goldblv.com/api/hiring/tasks/register",
      {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response);
    localStorage.setItem("email", user.email);
  } catch (error) {
    console.log(error);
  }
};

function containsSpecialChars(str) {
  const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  return specialChars.test(str);
}
