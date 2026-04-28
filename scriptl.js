const loginbtn = document.querySelector(".btn");
loginbtn.addEventListener("click", (e) => {
    e.preventDefault();
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;
    let data = JSON.parse(localStorage.getItem("email"));
    if (data) {
        // console.log(data.foreach((e) => e["email"] == email && e["password"] == password));
        console.log(data.forEach(element => {
            console.log(element["email"] == email && element["password"])
        }));
    }

})