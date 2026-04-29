import { toast } from "./node_modules/mytoastfy/dist/index.js";
window.addEventListener('DOMContentLoaded', () => {
    console.log("done")
    const url = new URLSearchParams(window.location.search);
    if (url.get("logout") == "true") {
        toast({
            message: "logout",
            type: "error"
        })
        window.history.replaceState({}, document.title, "Login.html");
    }
})

const loginbtn = document.querySelector(".btn");
loginbtn.addEventListener("click", (e) => {
    e.preventDefault();

    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;

    let data = JSON.parse(localStorage.getItem("email"));

    if (data) {
        let user = data.find(
            (element) => element.email === email && element.password === password
        );
        if (user) {
            localStorage.setItem("isLoggedin", true);
            localStorage.setItem("currentUser", JSON.stringify(user));
            
            window.location.href = "index.html";
        } else {
            alert("Invalid email or password");
        }

    } else {
        alert("No users found, please register first");
    }
});