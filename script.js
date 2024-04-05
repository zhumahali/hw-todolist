const image = document.querySelector(".image");
const input = document.querySelector(".title");
const output = document.querySelector(".output");

// data state
let todos = [];

const addToLocalStorage = () => {
  if (todos.length > 0) {
    localStorage.setItem("todos", JSON.stringify(todos));
  } else {
    localStorage.removeItem("todos");
  }
};

const getFromLocalStorage = () => {
  const data = localStorage.getItem("todos");
  if (data) {
    todos = JSON.parse(data);
    renderTodos();
  }
};

const createTodo = () => {
  const task = {
    id: new Date().toISOString(),
    title: input.value,
    status: false,
    date: new Date(),
  };
  // todos.push(task)
  input.value = "";
  todos = [...todos, task];
  console.log(todos);
  addToLocalStorage();
  renderTodos();
};

image.addEventListener("click", () => {
  createTodo();
});

const renderTodos = () => {
  output.innerHTML = "";
  todos.forEach((el, index) => {
    const wrap = document.createElement("div");
    const title = document.createElement("p");
    const text = document.createElement("p");
    const dateText = document.createElement("p");
    const editImg = document.createElement("img");
    const delImg = document.createElement("img");
    const doneImg = document.createElement("img");
    title.textContent = `${index + 1})${el.title}`;
    editImg.src = "./img/icons8-edit.svg";
    delImg.src = "./img/icons8-delete.svg"
    doneImg.src = "./img/icons8-done.svg"
    wrap.className = "wrap"

    wrap.style.background = el.status ? "lightgreen" : "pink";
    text.textContent = el.status ? "Todo is completed" : "Processing";
    dateText.textContent = generateDate(el.date);

    wrap.append(title, editImg, delImg, doneImg, text, dateText);
    output.append(wrap);

    editImg.addEventListener("click", () => {
      editTodo(el.id);
    });
    delImg.addEventListener("click", () => {
      deleteTodo(el.id);
    });
    doneImg.addEventListener("click", () => {
      doneTodo(el.id);
    });
  });
  generateCountInterface();
  const clear = document.querySelector(".clear");
  clear.style.display = todos.length > 0 ? "block" : "none";
};
const editTodo = (id) => {
  const editedMessage = prompt("Edit title");
  todos = todos.map((el) => {
    if (el.id === id) {
      return { ...el, title: editedMessage };
    }
    return el;
  });
  addToLocalStorage();
  renderTodos();
};

const deleteTodo = (id) => {
  todos = todos.filter((el) => el.id !== id);
  addToLocalStorage();
  renderTodos();
};

const doneTodo = (id) => {
  todos = todos.map((el) => {
    if (el.id === id) {
      return { ...el, status: !el.status };
    }
    return el;
  });
  addToLocalStorage();
  renderTodos();
};

const generateCountInterface = () => {
  const allLength = todos.length;
  const doneLength = todos.filter((el) => el.status).length;
  const undoneLength = todos.filter((el) => !el.status).length;
  const result = `All: ${allLength}/ Processing: ${undoneLength}/ Done: ${doneLength}`;
  document.querySelector(".countWrapper").innerHTML =
    allLength > 0 ? result : "";
};

const composeClearButton = () => {
  const clear = document.querySelector(".clear");
  clear.style.display = "none";
  clear.addEventListener("click", () => {
    todos = [];
    addToLocalStorage();
    renderTodos();
    document.querySelector(".countWrapper").innerHTML = "";
  });
};
composeClearButton();
const generateDate = (dateParams) => {
  const date =
    typeof dateParams === "string"
      ? new Date(dateParams)
      : typeof dateParams === "object"
      ? dateParams
      : null;

  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  const generateNewTime = (time) => {
    return time < 10 ? "0" + time : time;
  };
  //   const newMinutes = generateNewTime(minutes);
  //   const newSeconds = generateNewTime(seconds);
  //   const newDay = generateNewTime(day);
  //   const newMonth = generateNewTime(month);
  const [newMinutes, newSeconds, newDay, newMonth] = [
    minutes,
    seconds,
    day,
    month,
  ].map((el) => generateNewTime(el));

  const currentDate = `Date now: ${newDay} - ${newMonth} - ${year} ${hours}:${newMinutes}:${newSeconds}`;
  return currentDate;
};

getFromLocalStorage();