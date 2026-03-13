const input = document.querySelector(".login__input");
const button = document.querySelector(".login__button");
const form = document.querySelector(".login-form");

input.addEventListener("input", () => {
    if (input.value.length > 2) {
        button.disabled = false;
    } else {
        button.disabled = true;
    }
});

form.addEventListener("submit", (event) => {
    event.preventDefault();

    localStorage.setItem("player", input.value);

    window.location = "./game.html";
});
