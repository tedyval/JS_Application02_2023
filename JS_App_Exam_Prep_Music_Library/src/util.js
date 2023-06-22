

export function setDataUser(data) {
    localStorage.setItem("user", JSON.stringify(data));
}

export function getDataUser() {
    return JSON.parse(localStorage.getItem("user"));
}

export function clearDataUser() {
    localStorage.removeItem("user");
}