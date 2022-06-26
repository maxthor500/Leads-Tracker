const inputBtn = document.getElementById("input-btn");
const deleteBtn = document.getElementById("delete-btn");
const inputEl = document.getElementById("input-el");
const ulEl = document.getElementById("ul-el");
let myLeads = [];
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));

// helper functions
const removeChildren = (parent) => {
    while (parent.lastChild) {
        parent.removeChild(parent.lastChild);
    }
};

const createPlusAppendLi = () => {
    for (let i = 0; i < myLeads.length; i++) {
        const li = document.createElement("li");
        const anchor = document.createElement("a");
        anchor.target = "_blank";
        anchor.href = myLeads[i];
        anchor.textContent = myLeads[i];
        ulEl.appendChild(li);
        li.appendChild(anchor);
    }
}

if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage;
    createPlusAppendLi();
}

inputBtn.addEventListener("click", () => {
    if (inputEl.value) {
        myLeads.push(inputEl.value);
        inputEl.value = "";
    }
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    removeChildren(ulEl);
    createPlusAppendLi();
})

deleteBtn.addEventListener("dblclick", () => {
    localStorage.clear();
    myLeads = [];
    removeChildren(ulEl);
})