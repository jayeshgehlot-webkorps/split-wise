import { toast } from "./node_modules/mytoastfy/dist/index.js";

window.addEventListener('DOMContentLoaded', () => {
    console.log("done")
    const url = new URLSearchParams(window.location.search);
    if (url.get("login") == "true") {
        toast({
            message: "login Successfully",
            type: "success"
        })
        window.history.replaceState({}, document.title, window.location.pathname);
    }
})


if (!localStorage.getItem("isLoggedin")) {
    console.log("you can't access");
    window.location.href = "Login.html";
}
else {
    let logout = document.querySelector(".logout");
    logout.addEventListener("click", () => {
        localStorage.removeItem("isLoggedin");
        localStorage.removeItem("currentUser");

        window.location.href = "Login.html?logout=true";
    })
}

document.querySelector(".modal").classList.add("hidden");
document.querySelector(".hidden").style.display = "none";
let currentUser = JSON.parse(localStorage.getItem("currentUser"));
document.querySelector(".name p").innerText += " "+currentUser.name;
console.log(currentUser)
let users = JSON.parse(localStorage.getItem("email"));


localStorage.setItem("currentUser", JSON.stringify(users.find((e) => e.name == currentUser.name)));
currentUser = JSON.parse(localStorage.getItem("currentUser"));
document.querySelector(".card1 h2").innerText = currentUser.profit;
document.querySelector(".card2 h2").innerText = currentUser.own;





let hidden = document.querySelector(".hidden");
let create = document.querySelector(".create");
let crosses = document.querySelectorAll(".modal svg");
let createBtn = document.querySelector(".create");
let modal = document.querySelector(".modal");
let closeModal = document.querySelector(".closeModal");
let addGroup = document.querySelector(".addGroup");
let groupsContainer = document.querySelector(".groups");


let createContent = document.querySelector(".modal-content");
let editContent = document.querySelector(".modal-content-edit");

let gnamelocal = localStorage.getItem("groupName");
let seeContent = document.querySelector(".modal-content-see");




function displaygroups() {
    let groupData = localStorage.getItem("groupName");
    groupsContainer.innerHTML = "";
    if (groupData && groupData !== "null") {
        let arr = JSON.parse(groupData);
        arr.forEach(element => {
            if (element.memebers.includes(currentUser.name)) {
                let div = document.createElement("div");
                let indiv = document.createElement("div");
                let p = document.createElement("p");
                p.innerText = `${element.groupName} (${element.memebers.join(", ")}) - Amount: ${element.amount}`;
                div.appendChild(p);
                div.classList.add("group");
                if (element.createBy === currentUser.name) {
                    indiv.innerHTML = edit() + del();
                }
                else {
                    indiv.innerHTML = see();
                }
                div.appendChild(indiv);
                groupsContainer.appendChild(div);
            }
        });
    }
}

displaygroups();
createBtn.addEventListener("click", () => {
    const members = document.querySelector(".members");
    members.innerHTML = "";

    modal.classList.remove("hidden");
    hidden.style.display = "flex";

    createContent.style.display = "flex";
    editContent.style.display = "none";
    seeContent.style.display = "none";

    let users = JSON.parse(localStorage.getItem("email"));

    users.forEach((e) => {
        if (e.name !== currentUser.name) {
            let label = document.createElement("label");
            let input = document.createElement("input");
            input.type = "checkbox";
            input.value = e.name;

            label.append(input);
            label.append(" " + e.name);
            members.append(label);
        }
    });
});

closeModal.addEventListener("click", () => {
    modal.classList.add("hidden");
    hidden.style.display = "none";
});


crosses.forEach(cross => {
    cross.addEventListener("click", () => {
        modal.classList.add("hidden");
        hidden.style.display = "none";
    });
})

addGroup.addEventListener("click", () => {
    let groupName = document.getElementById("groupName").value;
    let selectedMembers = [];

    let amount = document.querySelector(".amount").value;
    console.log(groupName);

    selectedMembers.push(currentUser.name);
    document.querySelectorAll(".members input:checked").forEach((el) => {
        selectedMembers.push(el.value);
    });

    let users = JSON.parse(localStorage.getItem("email"));

    let totalPeople = selectedMembers.length;
    let share = amount / totalPeople;
    console.log(amount, selectedMembers, share);
    if (users != null) {
        users.forEach((user) => {
            if (user.name === currentUser.name) {
                user.profit += Math.round(share * (selectedMembers.length - 1));
                console.log(user.profit);
            }
            else if (selectedMembers.includes(user.name)) {
                user.own += Math.round(share);
                console.log(user.name, user.own);
            }
        });
        localStorage.setItem("email", JSON.stringify(users));

        localStorage.setItem("currentUser", JSON.stringify(users.find((e) => e.name == currentUser.name)));
        let fobj = users.find((e) => e.name == currentUser.name)

        document.querySelector(".card1 h2").innerText = fobj.profit;
        document.querySelector(".card2 h2").innerText = fobj.own;
    }
    let obj = {
        groupName: groupName,
        memebers: selectedMembers,
        amount: amount,
        createBy: currentUser.name
    }
    if (gnamelocal == null) {
        localStorage.setItem("groupName", JSON.stringify([obj]));
    }

    else {
        let arr = JSON.parse(localStorage.getItem("groupName"));
        arr.push(obj);
        localStorage.setItem("groupName", JSON.stringify(arr));
    }

    console.log(JSON.parse(localStorage.getItem("groupName")));


    if (groupName === "") {
        alert("Enter group name");
        return;
    }
    let groupDiv = document.createElement("div");
    groupDiv.classList.add("group");

    groupDiv.innerText = `${groupName} (${selectedMembers.join(", ")})`;

    groupsContainer.appendChild(groupDiv);

    document.getElementById("groupName").value = "";
    document.querySelector(".amount").value = "";
    document.querySelectorAll(".members input").forEach(el => el.checked = false);

    modal.classList.add("hidden");

    hidden.style.display = "none"
    window.location.reload();
    displaygroups();
});



function edit() {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="edit">
        <path
            d="M12.8995 6.85453L17.1421 11.0972L7.24264 20.9967H3V16.754L12.8995 6.85453ZM14.3137 5.44032L16.435 3.319C16.8256 2.92848 17.4587 2.92848 17.8492 3.319L20.6777 6.14743C21.0682 6.53795 21.0682 7.17112 20.6777 7.56164L18.5563 9.68296L14.3137 5.44032Z">
        </path>
    </svg>`
}
function del() {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="delete">
        <path
            d="M17 6H22V8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8H2V6H7V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V6ZM18 8H6V20H18V8ZM9 11H11V17H9V11ZM13 11H15V17H13V11ZM9 4V6H15V4H9Z">
        </path>
    </svg>`
}

function see() {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="see"><path d="M12.0003 3C17.3924 3 21.8784 6.87976 22.8189 12C21.8784 17.1202 17.3924 21 12.0003 21C6.60812 21 2.12215 17.1202 1.18164 12C2.12215 6.87976 6.60812 3 12.0003 3ZM12.0003 19C16.2359 19 19.8603 16.052 20.7777 12C19.8603 7.94803 16.2359 5 12.0003 5C7.7646 5 4.14022 7.94803 3.22278 12C4.14022 16.052 7.7646 19 12.0003 19ZM12.0003 16.5C9.51498 16.5 7.50026 14.4853 7.50026 12C7.50026 9.51472 9.51498 7.5 12.0003 7.5C14.4855 7.5 16.5003 9.51472 16.5003 12C16.5003 14.4853 14.4855 16.5 12.0003 16.5ZM12.0003 14.5C13.381 14.5 14.5003 13.3807 14.5003 12C14.5003 10.6193 13.381 9.5 12.0003 9.5C10.6196 9.5 9.50026 10.6193 9.50026 12C9.50026 13.3807 10.6196 14.5 12.0003 14.5Z"></path></svg>`
}



let editIndex = -1;
groupsContainer.addEventListener("click", (e) => {

    if (e.target.closest(".delete")) {

        let allGroups = JSON.parse(localStorage.getItem("groupName"));
        let groupDiv = e.target.closest(".group");
        let allDivs = [...document.querySelectorAll(".group")];
        let index = allDivs.indexOf(groupDiv);

        let group = allGroups[index];

        let shareAmount = group.amount / group.memebers.length;

        let users = JSON.parse(localStorage.getItem("email"));

        users.forEach((user) => {
            if (user.name === group.createBy) {
                user.profit -= Math.round(shareAmount * (group.memebers.length - 1));
            }

            else if (group.memebers.includes(user.name)) {
                user.own -= Math.round(shareAmount);
            }

        });
        localStorage.setItem("email", JSON.stringify(users));

        let currentUser = JSON.parse(localStorage.getItem("currentUser"));
        let updatedUser = users.find(u => u.name === currentUser.name);
        localStorage.setItem("currentUser", JSON.stringify(updatedUser));

        allGroups.splice(index, 1);
        localStorage.setItem("groupName", JSON.stringify(allGroups));
      window.location.reload();
        displaygroups();
    }
    if (e.target.closest(".edit")) {

        let groupDiv = e.target.closest(".group");
        let allDivs = [...document.querySelectorAll(".group")];
        let index = allDivs.indexOf(groupDiv);
        editIndex = index;

        let allGroups = JSON.parse(localStorage.getItem("groupName"));
        let group = allGroups[index];

        let users = JSON.parse(localStorage.getItem("email"));

        modal.classList.remove("hidden");
        hidden.style.display = "flex";

        createContent.style.display = "none";
        editContent.style.display = "flex";
        seeContent.style.display = "none";

        document.getElementById("editGroupName").value = group.groupName;
        document.getElementById("editAmount").value = group.amount;

        let editMembersDiv = document.querySelector(".editMembers");
        editMembersDiv.innerHTML = "";

        users.forEach(user => {
            let label = document.createElement("label");
            let input = document.createElement("input");

            input.type = "checkbox";
            input.value = user.name;

            if (group.memebers.includes(user.name)) {
                input.checked = true;
            }

            label.append(input, user.name);
            editMembersDiv.append(label);
        });
    }

    if (e.target.closest(".see")) {


        let groupDiv = e.target.closest(".group");
        let allDivs = [...document.querySelectorAll(".group")];
        let index = allDivs.indexOf(groupDiv);

        let allGroups = JSON.parse(localStorage.getItem("groupName"));
        let group = allGroups[index];

        // modal.classList.remove("hidden");
        modal.style.display = "flex";

        createContent.style.display = "none";
        editContent.style.display = "none";
        seeContent.style.display = "flex";

        document.getElementById("seeName").innerText = group.groupName;
        document.getElementById("seeAmount").innerText = group.amount;

        document.querySelector("#createBy").innerText = group.createBy;
        let seeMembersDiv = document.querySelector(".seeMembers");
        seeMembersDiv.innerHTML = "";

        group.memebers.forEach(name => {
            let p = document.createElement("p");
            p.innerText = name;
            seeMembersDiv.appendChild(p);
        });
    }

});

document.querySelector(".updateGroup").addEventListener("click", () => {

    let allGroups = JSON.parse(localStorage.getItem("groupName"));
    let users = JSON.parse(localStorage.getItem("email"));

    let group = allGroups[editIndex];

    let newName = document.getElementById("editGroupName").value;
    let newAmount = Number(document.getElementById("editAmount").value);

    let newMembers = [];

    document.querySelectorAll(".editMembers input:checked").forEach(el => {
        newMembers.push(el.value);
    });

    if (!newMembers.includes(group.createBy)) {
        newMembers.push(group.createBy);
    }


    let oldShare = group.amount / group.memebers.length;

    users.forEach(user => {
        if (user.name === group.createBy) {
            user.profit -= Math.round(oldShare * (group.memebers.length - 1));
        }
        else if (group.memebers.includes(user.name)) {
            user.own -= Math.round(oldShare);
        }
    });

    let newShare = newAmount / newMembers.length;

    users.forEach(user => {
        if (user.name === group.createBy) {
            user.profit += Math.round(newShare * (newMembers.length - 1));
        }
        else if (newMembers.includes(user.name)) {
            user.own += Math.round(newShare);
        }
    });
    group.groupName = newName;
    group.amount = newAmount;
    group.memebers = newMembers;

    localStorage.setItem("email", JSON.stringify(users));
    localStorage.setItem("groupName", JSON.stringify(allGroups));

    let currentUser = JSON.parse(localStorage.getItem("currentUser"));
    let updatedUser = users.find(u => u.name === currentUser.name);
    localStorage.setItem("currentUser", JSON.stringify(updatedUser));


    displaygroups();

    modal.classList.add("hidden");
    hidden.style.display = "none";

});


