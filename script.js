

console.log("done");
const loginbtn = document.querySelector(".btn");
loginbtn.addEventListener("click", (e) => {
    e.preventDefault();
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;
    const name = document.querySelector("#name").value;
    let obj = {
        name: name,
        password: password,
        email: email
    }
    let items = JSON.parse(localStorage.getItem("email"));

    if (items == null) {
        console.log("adding");
        let ar = [];
        ar.push(obj);
        localStorage.setItem("email", JSON.stringify(ar));
    }
    else if (items.filter((e) => e["email"] == email).length > 0) {
        console.log("already have");
    }
    else {
        items = [...items, obj];
        localStorage.setItem("email", JSON.stringify(items));
    }
})
