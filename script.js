import { toast } from 'https://cdn.jsdelivr.net/npm/mytoastfy/dist/index.js';

const registerBtn = document.querySelector(".btn");

registerBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const email = document.querySelector("#email").value.trim();
    const password = document.querySelector("#password").value.trim();
    const name = document.querySelector("#name").value.trim();

    if (!email || !password || !name) {
        toast({
            message: "All fields are required",
            type: "error"
        });
        return;
    }

    let users = JSON.parse(localStorage.getItem("email")) || [];

    let exists = users.some(user => user.email === email);

    if (exists) {
        toast({
            message: "User already exists",
            type: "error"
        });
        return;
    }

    let newUser = {
        name: name,
        email: email,
        password: password,
        profit: 0,
        own: 0
    };

    users.push(newUser);
    localStorage.setItem("email", JSON.stringify(users));

    localStorage.setItem("isLoggedin", true);
    localStorage.setItem("currentUser", JSON.stringify(newUser));

    toast({
        message: "Registration Successful",
        type: "success"
    });

    setTimeout(() => {
        window.location.href = "index.html?login=true";
    }, 500);
});
