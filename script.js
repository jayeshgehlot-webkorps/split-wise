
import { toast } from './node_modules/mytoastfy/dist/index.js';

const loginbtn = document.querySelector(".btn");
loginbtn.addEventListener("click", (e) => {
    e.preventDefault();
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;
    const name = document.querySelector("#name").value;

    if (email.trim() == '' || name.trim() == '' || password.trim() == '') {
        toast({
            message: "fields are empty",
            type: "error"

        })
        return;
    }

    let obj = {
        name: name,
        password: password,
        email: email,
        profit: 0,
        own: 0
    }
    let items = JSON.parse(localStorage.getItem("email"));

    if (items == null) {
        let ar = [];
        ar.push(obj);
        localStorage.setItem("email", JSON.stringify(ar));
        localStorage.setItem("isLoggedin", true);
        window.location.href = "index.html"
    }
    else if (items.filter((e) => e["email"] == email).length > 0) {
      

        toast({
            message: "User Already present"
        })

    }
    else {
        items = [...items, obj];
        localStorage.setItem("email", JSON.stringify(items));
        localStorage.setItem("isLoggedin", true);
        window.location.href = "index.html"
    }
})
