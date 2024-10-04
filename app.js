const input = document.querySelector("input");
const addBtn = document.querySelector(".btn-add");
const ul = document.querySelector("ul");
const empty = document.querySelector(".empty");

addBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const text = input.value;

  if (text !== "") {
    const li = document.createElement("li");
    const p = document.createElement("p");
    p.textContent = text;

    li.appendChild(addCheckBtn(p));
    li.appendChild(p);
    li.appendChild(addDeleteBtn());
    ul.appendChild(li);

    input.value = "";
    empty.style.display = "none";
  }
  else{
    alert("Ingrese una tarea para agregar!")
  }
});

function addCheckBtn(p) {
    const checkBtn = document.createElement("button");
  
    checkBtn.className = "btn-check";
  
    checkBtn.addEventListener("click", (e) => {
        p.classList.toggle("checked");
        checkBtn.classList.toggle("clicked");
    });
  
    return checkBtn;
}

function addDeleteBtn() {
  const deleteBtn = document.createElement("button");

  deleteBtn.textContent = "X";
  deleteBtn.className = "btn-delete";

  deleteBtn.addEventListener("click", (e) => {
    const item = e.target.parentElement;
    ul.removeChild(item);

    const items = document.querySelectorAll("li");

    if (items.length === 0) {
      empty.style.display = "flex";
    }
  });

  return deleteBtn;
}