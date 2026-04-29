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
        console.log(data.forEach(element => {
            localStorage.setItem("isLoggedin", true);
            console.log(localStorage.getItem("isLoggedin"));
            window.location.href = "index.html";
        }));
    }

})