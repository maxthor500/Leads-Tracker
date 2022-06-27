const inputBtn = document.getElementById("input-btn");
const deleteBtn = document.getElementById("delete-btn");
const inputEl = document.getElementById("input-el");
const ulEl = document.getElementById("ul-el");
let myLeads = [];
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));
const tabBtn = document.getElementById("tab-btn");

if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage;
}

// helper functions
const removeChildren = (parent) => {
    while (parent.lastChild) {
        parent.removeChild(parent.lastChild);
    }
};

const createPlusAppendLi = () => {
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    removeChildren(ulEl);
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

tabBtn.addEventListener("click", () => {
    chrome.tabs.query(
        {active: true, currentWindow: true}, 
        (tabs) => {
            myLeads.push(tabs[0].url);
            createPlusAppendLi();
    })
})

inputBtn.addEventListener("click", () => {
    if (inputEl.value) {
        myLeads.push(inputEl.value);
        inputEl.value = "";
    }
    createPlusAppendLi();
})

deleteBtn.addEventListener("dblclick", () => {
    localStorage.clear();
    myLeads = [];
    removeChildren(ulEl);
})

deleteBtn.addEventListener("click", () => {
    const listContainer = document.getElementById("list-container");
    const alert = document.createElement("p");
    alert.textContent = "Please, double click to delete all!";
    listContainer.appendChild(alert);

    const alertTimeout = setTimeout(() => {
        listContainer.removeChild(alert);
    }, 1000)
}, {once : true})

