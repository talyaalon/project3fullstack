var user = localStorage.getItem("currentUserVar");
var currentUserVar = JSON.parse(user);
window.addEventListener("load", () => {
  //todos = JSON.parse(localStorage.getItem("todos")) || [];
  if (currentUserVar != null) {
    var currentUser = document.getElementById("currntUserName");
    currentUser.innerHTML = "What's up, " + currentUserVar.username;
    document.getElementById("signupbtn").style.display = "none";
    document.getElementById("loginbtn").style.display = "none";
  } else {
    document.getElementById("logoutbtn").style.display = "none";
  }
  user = JSON.parse(localStorage.getItem(currentUserVar.email));
  todos = user.todos;
  //const nameInput = document.querySelector("#name");
  const newTodoForm = document.querySelector("#new-todo-form");

  //const username = localStorage.getItem("username") || "";

  //nameInput.value = username;

  //   nameInput.addEventListener("change", (e) => {
  //     let fajax = new Fajax();
  //     fajax.open("POST", "username", e.target.value);
  //     fajax.send();
  //     //localStorage.setItem("username", e.target.value);
  //   });

  newTodoForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const todo = {
      content: e.target.elements.content.value,
      category: e.target.elements.category.value,
      done: false,
      createdAt: new Date().getTime(),
    };

    //todos.push(todo);

    //fajax.open(POST)
    //localStorage.setItem("todos", JSON.stringify(todos));
    user.todos.push(todo);
    localStorage.setItem(currentUserVar.email, JSON.stringify(user));

    // Reset the form
    e.target.reset();

    DisplayTodos();
  });

  DisplayTodos();
});

function DisplayTodos() {
  const todoList = document.querySelector("#todo-list");
  todoList.innerHTML = "";

  todos.forEach((todo) => {
    const todoItem = document.createElement("div");
    todoItem.classList.add("todo-item");

    const label = document.createElement("label");
    const input = document.createElement("input");
    const span = document.createElement("span");
    const content = document.createElement("div");
    const actions = document.createElement("div");
    const edit = document.createElement("button");
    const deleteButton = document.createElement("button");

    input.type = "checkbox";
    input.checked = todo.done;
    span.classList.add("bubble");
    if (todo.category == "personal") {
      span.classList.add("personal");
    } else {
      span.classList.add("business");
    }
    content.classList.add("todo-content");
    actions.classList.add("actions");
    edit.classList.add("edit");
    deleteButton.classList.add("delete");

    content.innerHTML = `<input type="text" value="${todo.content}" readonly>`;
    edit.innerHTML = "Edit";
    deleteButton.innerHTML = "Delete";

    label.appendChild(input);
    label.appendChild(span);
    actions.appendChild(edit);
    actions.appendChild(deleteButton);
    todoItem.appendChild(label);
    todoItem.appendChild(content);
    todoItem.appendChild(actions);

    todoList.appendChild(todoItem);

    if (todo.done) {
      todoItem.classList.add("done");
    }

    input.addEventListener("change", (e) => {
      todo.done = e.target.checked;
      //localStorage.setItem("todos", JSON.stringify(todos));
      user.todos = todos;
      localStorage.setItem(currentUserVar.email, JSON.stringify(user));
      if (todo.done) {
        todoItem.classList.add("done");
      } else {
        todoItem.classList.remove("done");
      }

      DisplayTodos();
    });

    edit.addEventListener("click", (e) => {
      const input = content.querySelector("input");
      input.removeAttribute("readonly");
      input.focus();
      input.addEventListener("blur", (e) => {
        input.setAttribute("readonly", true);
        todo.content = e.target.value;
        //localStorage.setItem("todos", JSON.stringify(todos));
        user.todos = todos;
        localStorage.setItem(currentUserVar.email, JSON.stringify(user));
        DisplayTodos();
      });
    });

    deleteButton.addEventListener("click", (e) => {
      todos = todos.filter((t) => t != todo);
      //localStorage.setItem("todos", JSON.stringify(todos));
      user.todos = todos;
      localStorage.setItem(currentUserVar.email, JSON.stringify(user));
      DisplayTodos();
    });
  });
}

/////////------------
function allStorage() {
  var values = [],
    keys = Object.keys(localStorage),
    i = keys.length;
  console.log(keys);
  //keys.removeItem("currentUserVar");
  const idxObj = keys.findIndex((object) => {
    return object == "currentUserVar";
  });

  keys.splice(idxObj, 1);
  console.log(keys);
  while (i--) {
    var data = JSON.parse(localStorage.getItem(keys[i]));
    if (data != null) values.push(data);
  }

  return values;
}
function signup(e) {
  event.preventDefault();
  if (currentUserVar != null) {
    document.getElementById("result1").innerHTML = "Please Log Out first";
    return;
  }
  var username = document.getElementById("username1").value;
  var email1 = document.getElementById("email1").value;
  var pass = document.getElementById("password1").value;
  var result1 = document.getElementById("result1");
  var currentUser = document.getElementById("currntUserName");

  var user = {
    email: email1,
    username: username,
    password: pass,
    wrongAttempts: 0,
    todos: [],
  };

  console.log(allStorage());
  allstorage = allStorage();
  const accountExist = allstorage.some((user1) => user1.email == email1);
  if (accountExist) {
    result1.innerHTML =
      "There is already an account associated with this email address";
    return;
  }

  var json = JSON.stringify(user);
  localStorage.setItem(email1, json);
  console.log("user added");
  result1.innerHTML = "User successfully added";
  currentUser.innerHTML = "What's up, " + user.username;
  currentUserVar = user;
  localStorage.setItem("currentUserVar", json);
  //reloadTable();
  document.getElementById("username1").value = "";
  document.getElementById("password1").value = "";
  document.getElementById("email1").value = "";
  document.getElementById("signupbtn").style.display = "none";
  document.getElementById("loginbtn").style.display = "none";
  document.getElementById("logoutbtn").style.display = "block";
}

function login(e) {
  event.preventDefault();

  var pass = document.getElementById("password2").value;
  var email = document.getElementById("email2").value;
  var result2 = document.getElementById("result2");
  //var currentUser = document.getElementById("currentUser");
  var currentUser = document.getElementById("currntUserName");

  var user = localStorage.getItem(email);
  var data = JSON.parse(user);
  console.log(data);

  if (user == null) {
    result2.innerHTML = "The email address is not registered on the website";
  } else if (email == data.email && pass == data.password) {
    result2.innerHTML = "logged in";
    currentUser.innerHTML = "What's up, " + data.username;

    //data.lastEntry = currentDate;
    data.wrongAttempts = 0;
    localStorage.setItem(data.email, JSON.stringify(data));
    localStorage.setItem("currentUserVar", JSON.stringify(data));
    currentUserVar = data;
    document.getElementById("signupbtn").style.display = "none";
    document.getElementById("loginbtn").style.display = "none";
    document.getElementById("logoutbtn").style.display = "block";

    closeLogin();
  } else {
    if (data.wrongAttempts < 3) {
      result2.innerHTML = "wrong password";
      data.wrongAttempts += 1;
      localStorage.setItem(data.email, JSON.stringify(data));
    } else {
      localStorage.removeItem(data.email);
      reloadTable();
      result2.innerHTML =
        "You made a mistake 4 times, so the user is blocked and deleted. You can register again.";
    }
  }
}

function showContent(nameItem) {
  var temp = document.getElementById(nameItem);
  var clon = temp.content.cloneNode(true);
  document.body.appendChild(clon);
}
function closeSignup() {
  document.getElementById("signup").style.display = "none";
  const element = document.getElementById("templeteSignup");
  element.remove();
  document.getElementById("username1").value = "";
  document.getElementById("password1").value = "";
  document.getElementById("email1").value = "";
  document.getElementById("result1").innerHTML =
    "Welcome! please create account";

  location.reload();
}
function closeLogin() {
  document.getElementById("login").style.display = "none";
  const element = document.getElementById("templeteLogin");
  element.remove();
  document.getElementById("email2").value = "";
  document.getElementById("password2").value = "";
  document.getElementById("result2").innerHTML = "Welcome! login";
  location.reload();
}
function logout() {
  //localStorage.setItem(currentUserVar.email, JSON.stringify(currentUserVar));
  //currentUser.innerHTML = "";
  currentUserVar = null;
  localStorage.setItem("currentUserVar", null);
  document.getElementById("signupbtn").style.display = "inline";
  document.getElementById("loginbtn").style.display = "inline";
  document.getElementById("logoutbtn").style.display = "none";
  location.reload();
}
