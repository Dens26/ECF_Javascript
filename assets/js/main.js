import { createKeyButton, createInput, addKeyEventListener, checkUser } from "./function.js"

// DOM
const mainForm = document.querySelector(".signin-form");

// sign-in form
const formContainer = document.createElement("form");
formContainer.className = "form-container";
formContainer.action = "#";

// user div
const userDiv = document.createElement("div");
userDiv.className = "signin-group";

// user label
const userLabel = document.createElement("label");
userLabel.htmlFor = "user";
userLabel.textContent = "Identifiant";

// user input
userDiv.appendChild(userLabel);
userDiv.appendChild(createInput("text", "input", "user", "user", "Identifiant", "", "Saisissez votre identifiant", false));

// password div
const passwordDiv = document.createElement("div");
passwordDiv.className = "signin-group";

// password label
const passwordLabel = document.createElement("label");
passwordLabel.htmlFor = "password";
passwordLabel.textContent = "Mot de passe";

// password input
passwordDiv.appendChild(passwordLabel);
passwordDiv.appendChild(createInput("password", "input", "password", "password", "Mot de passe", "", "Composez votre mot de passe", true));

// numpadkey 
let numpadKey = document.createElement("div");
numpadKey.className = "numpad-key";

// Create a key array and mix the value
const keyTab = [];
for (let i = 0; i < 16; i++)
    keyTab.push(i);

const keyTabMixed = [...keyTab];
for (let i = keyTabMixed.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [keyTabMixed[i], keyTabMixed[j]] = [keyTabMixed[j], keyTabMixed[i]];
}

for (const key of keyTabMixed)
    numpadKey.appendChild(createKeyButton(key));

// form button
const numpadButton = document.createElement("div");
numpadButton.className = "numpad-button";
numpadButton.appendChild(createInput("submit", "button", "submit", "submit", "Touche Valider", "Valider", "", false));
numpadButton.appendChild(createInput("button", "button", "clear", "clear", "Touche Effacer", "Effacer", "", false));


// Add all elements
formContainer.appendChild(userDiv);
formContainer.appendChild(passwordDiv);
formContainer.appendChild(numpadKey);
formContainer.appendChild(numpadButton);
mainForm.appendChild(formContainer);

// DOM references
const keys = document.querySelectorAll(".numpad-key");
let password = document.querySelector("#password");
const user = document.querySelector("#user");
const form = document.querySelector(".form-container");
const errorDiv = document.querySelector(".error");
const errorMsg = document.querySelector(".error-msg");

// keys listener
password = addKeyEventListener(keys, password);

// Submit button form listener
form.addEventListener("submit", async evt => {
    evt.preventDefault();
    errorMsg.textContent = "";
    errorMsg.textContent = await checkUser(user, password);
    errorDiv.style.display = "inherit";
})

// Clear button form listener
form.addEventListener("click", (evt) => {
    if (evt.target.id == "clear") {
        numpadKey.textContent = "";
        password.value = "";
        errorDiv.style.display = "none";
        errorMsg.textContent = "";

        const keyTabMixed = [...keyTab];
        for (let i = keyTabMixed.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [keyTabMixed[i], keyTabMixed[j]] = [keyTabMixed[j], keyTabMixed[i]];
        }

        for (const key of keyTabMixed)
            numpadKey.appendChild(createKeyButton(key));
        password = addKeyEventListener(keys, password);
    }
})