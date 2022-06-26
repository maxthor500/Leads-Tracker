const inputBtn = document.getElementById("input-btn");

let myLeads = [];
const inputEl = document.getElementById("input-el");
const ulEl = document.getElementById("ul-el");

inputBtn.addEventListener("click", () => {
    if (inputEl.value) {
        myLeads.push(inputEl.value);
        inputEl.value = "";
    }

    removeChildren(ulEl);
    createPlusAppendLi(); 
})

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