// Seleccionar los elementos del DOM con los que vamos a trabajar
const input = document.querySelector("input");
const addBtn = document.querySelector(".btn-add");
const ul = document.querySelector("ul");
const empty = document.querySelector(".empty");

// Cargar las tareas guardadas en el Local Storage al inicio
document.addEventListener("DOMContentLoaded", loadTasks);

// Añadir evento para el botón de agregar tarea
addBtn.addEventListener("click", (e) => {
    // Evita que el formulario se envíe
    e.preventDefault();

  const text = input.value; // Obtener el texto del input


  if (text !== "") {
    addTask(text); // Añadimos la tarea
    saveTaskToLocalStorage(text); // Guardamos la tarea en localStorage
    
    input.value = ""; // Limpiar el input

    empty.style.display = "none"; // Ocultar el mensaje de lista vacía
  } else {
    // Mostrar mensaje de alerta si no se ingresó texto
    alert("Ingrese una tarea para agregar!");
  }
});

// Función para añadir una tarea al DOM
function addTask(text, isChecked = false) {
  const li = document.createElement("li");
  const p = document.createElement("p");
  let isClicked = false;
  p.textContent = text;
  
  // Revisar si la tarea estaba marcada para aplicarle el estilo al texto
  if (isChecked) {
    p.classList.add("checked");
    isClicked = true
  }

  // Añadir los elementos a la tarea
  li.appendChild(addCheckBtn(p, isClicked));
  li.appendChild(p);
  li.appendChild(addDeleteBtn());

  // Añadir la tarea a la lista
  ul.appendChild(li);
}

// Función para añadir el botón de check
function addCheckBtn(p, isClicked) {
  const checkBtn = document.createElement("button");
  checkBtn.className = "btn-check";

  // Revisar si la tarea estaba marcada para aplicarle el estilo al botón
  if (isClicked) {
    checkBtn.classList.add("clicked");
  }

  // Evento para marcar/desmarcar la tarea al presionar el botón
  checkBtn.addEventListener("click", (e) => {
    p.classList.toggle("checked"); // Alterna el estado 'checked' del párrafo
    checkBtn.classList.toggle("clicked");  // Alterna el estado 'checked' del párrafo
    updateTaskInLocalStorage(); // Actualizamos localStorage si se marca o desmarca
  });

  return checkBtn;
}

// Función para añadir el botón de eliminar
function addDeleteBtn() {
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "X";
  deleteBtn.className = "btn-delete";

 // Evento para eliminar la tarea
  deleteBtn.addEventListener("click", (e) => {
    const item = e.target.parentElement; // Seleccionar el elemento <li> padre
    ul.removeChild(item); // Eliminar el elemento de la lista
    updateTaskInLocalStorage(); // Actualizamos localStorage al eliminar la tarea

    // Mostrar el mensaje de lista vacía si no quedan tareas
    const items = document.querySelectorAll("li");
    if (items.length === 0) {
      empty.style.display = "flex";
    }
  });

  return deleteBtn;
}

// Guardar una tarea en localStorage
function saveTaskToLocalStorage(text) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || []; // Obtener las tareas guardadas o un array vacío
  tasks.push({ text, checked: false }); // Añadir la nueva tarea
  localStorage.setItem("tasks", JSON.stringify(tasks)); // Guardar tareas actualizadas en localStorage
}

// Cargar las tareas al recargar la página
function loadTasks() {
  // Obtener tareas de localStorage
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  // Mostrar el mensaje de lista vacía si no hay tareas
  if (tasks.length === 0) {
    empty.style.display = "flex";
  } else {
    empty.style.display = "none";
     // Añadir cada tarea al DOM
    tasks.forEach(task => addTask(task.text, task.checked));
  }
}

// Actualizar localStorage cuando se modifica una tarea (marcar o eliminar)
function updateTaskInLocalStorage() {
  const tasks = [];
  const items = document.querySelectorAll("li");
 
  // Recorremos todas las tareas actuales
  items.forEach(item => {
    const text = item.querySelector("p").textContent;
    const isChecked = item.querySelector("p").classList.contains("checked");
    // Añadir cada tarea con su estado al array
    tasks.push({ text, checked: isChecked });
  });

  // Guardar las tareas actualizadas en localStorage
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
