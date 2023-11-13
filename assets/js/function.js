
/**
 * Create key button
 */
export function createKeyButton(value) {
    const key = document.createElement("input");
    key.type = "button";
    key.className = "key";
    key.id = `key_${value}`;
    key.name = `key_${value}`;
    key.title = value < 10 ? `Touche ${value}` : "Touche vierge";
    key.value = value < 10 ? value : "";
    key.style.background = value < 10 ? "rgb(200, 200, 200)": "";
    return key;
}

/**
 * Create input 
 */
export function createInput(type, className, id, name, title, value, placeholder, disabled) {
    const input = document.createElement("input");
    input.type = type;
    input.className = className;
    input.id = id;
    input.name = name;
    input.title = title;
    input.value = value;
    input.placeholder = placeholder;
    input.disabled = disabled;

    return input;
}

/**
 * Configure the keys event listener
 */
export function addKeyEventListener(keys, password) {
    for (let i = 0; i < keys[0].children.length; i++) {
        const key = keys[0].children[i];
        key.addEventListener("click", () => {
            if (key.value != "") {
                if (password.value.length < 6) {
                    password.value += key.value;
                }
            }
        })
    }
    return password;
}

/**
 * Try to log to the API
 */
export async function checkUser(user, password) {
    try {
        const data = new FormData();
        data.append("login", user.value);
        data.append("password", password.value);

        const response = await fetch(`https://www.ericfree.net/formation/api/check_user.php`, {
            method : "POST",
            body : data
        });
        if (!response.ok) {
            throw new Error(`Erreur ${response.status}`);
        }
        const result = await response.json();

        return result.message;
    }
    catch (error) {
        return error;
    }
}