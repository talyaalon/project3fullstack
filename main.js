let fajax = new Fajax();
fajax.open("GET", "https/ourProject/get/" + "currentUserVar", "currentUserVar");
console.log(1);
var user, currentUserVar, todos;
console.log(todos);
fajax.onload = () => {
  if (fajax.statusCode == "200") {
    user = fajax.responseText;
    currentUserVar = JSON.parse(user);
  }
};

fajax.send();
console.log(2);

window.addEventListener("load", () => {
  if (currentUserVar != null) {
    var currentUser = document.getElementById("currntUserName");
    currentUser.innerHTML = "What's up, " + currentUserVar.username;
    document.getElementById("signupbtn").style.display = "none";
    document.getElementById("loginbtn").style.display = "none";
    let fajax1 = new Fajax();
    fajax1.open(
      "GET",
      "https/ourProject/get/" + currentUserVar.email,
      currentUserVar.email
    );
    fajax1.onload = () => {
      if (fajax1.statusCode == "200") {
        user = JSON.parse(fajax1.responseText);
        todos = user.todos;
        console.log("line 36: todos: " + todos);
        const newTodoForm = document.querySelector("#new-todo-form");
        newTodoForm.addEventListener("submit", (e) => {
          e.preventDefault();

          const todo = {
            content: e.target.elements.content.value,
            category: e.target.elements.category.value,
            done: false,
            createdAt: new Date().getTime(),
            isInSearch: true,
          };

          user.todos.push(todo);
          json = JSON.stringify(user);
          let fajax1 = new Fajax();
          fajax1.open(
            "PUT",
            "https/ourProject/put",
            currentUserVar.email,
            json
          );
          fajax1.send();

          // Reset the form
          e.target.reset();

          DisplayTodos();
          location.reload();
        });
        console.log(todos);
        DisplayTodos();
      }
    };
    fajax1.send();
    console.log(user);
  } else {
    document.getElementById("logoutbtn").style.display = "none";
    const newTodoForm = document.querySelector("#new-todo-form");
    newTodoForm.addEventListener("submit", (e) => {
      alert("please log in or sign up first.");
    });
  }
});

function DisplayTodos() {
  const todoList = document.querySelector("#todo-list");
  todoList.innerHTML = "";
  console.log(todos);
  todos = todos.filter((t) => t.isInSearch == true);
  console.log(todos);
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
    const showButton = document.createElement("button");

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
    showButton.classList.add("show");

    content.innerHTML = `<input type="text" value="${todo.content}" readonly>`;
    edit.innerHTML = "Edit";
    deleteButton.innerHTML = "Delete";
    showButton.innerHTML = "Show";

    label.appendChild(input);
    label.appendChild(span);
    actions.appendChild(edit);
    actions.appendChild(deleteButton);
    actions.appendChild(showButton);
    todoItem.appendChild(label);
    todoItem.appendChild(content);
    todoItem.appendChild(actions);

    todoList.appendChild(todoItem);

    if (todo.done) {
      todoItem.classList.add("done");
    }

    input.addEventListener("change", (e) => {
      todo.done = e.target.checked;
      user.todos = todos;
      json = JSON.stringify(user);
      let fajax1 = new Fajax();
      fajax1.open("PUT", "https/ourProject/put", currentUserVar.email, json);
      fajax1.send();
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
        user.todos = todos;
        json = JSON.stringify(user);
        let fajax1 = new Fajax();
        fajax1.open("PUT", "https/ourProject/put", currentUserVar.email, json);
        fajax1.send();
        DisplayTodos();
      });
    });

    deleteButton.addEventListener("click", (e) => {
      todos = todos.filter((t) => t != todo);
      user.todos = todos;
      json = JSON.stringify(user);
      let fajax1 = new Fajax();
      fajax1.open("PUT", currentUserVar.email, json);
      fajax1.send();
      DisplayTodos();
    });
    showButton.addEventListener("click", (e) => {
      DisplayTodos();
      console.log(todo.content);
      showContent("showTodoTemplate");

      const divButton = document.querySelector("#divButton");
      divButton.innerHTML = "";
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

      divButton.appendChild(todoItem);

      if (todo.done) {
        todoItem.classList.add("done");
      }
      input.addEventListener("change", (e) => {
        todo.done = e.target.checked;
        user.todos = todos;
        json = JSON.stringify(user);
        let fajax1 = new Fajax();
        fajax1.open("PUT", "https/ourProject/put", currentUserVar.email, json);
        fajax1.send();
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
          user.todos = todos;
          json = JSON.stringify(user);
          let fajax1 = new Fajax();
          fajax1.open(
            "PUT",
            "https/ourProject/put",
            currentUserVar.email,
            json
          );
          fajax1.send();
          DisplayTodos();
        });
      });

      deleteButton.addEventListener("click", (e) => {
        todos = todos.filter((t) => t != todo);
        user.todos = todos;
        json = JSON.stringify(user);
        let fajax1 = new Fajax();
        fajax1.open("PUT", "https/ourProject/put", currentUserVar.email, json);
        fajax1.send();
        closeShowTodo();
        DisplayTodos();
      });
    });
  });
}

/////////------------
function allStorageFunc() {
  let fajax1 = new Fajax();
  fajax1.open("GETALL", "https/ourProject/getall");
  fajax1.onload = () => {
    if (fajax1.statusCode == "200") {
      allStorage = fajax1.responseText;
    }
  };
  fajax1.send();
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

  let allStorage;
  let fajax0 = new Fajax();
  fajax0.open("GETALL", "https/ourProject/getall");
  fajax0.onload = () => {
    if (fajax0.statusCode == "200") {
      allStorage = fajax0.responseText;
      console.log(email1);
      console.log(allStorage);
      const accountExist = allStorage.some((user1) => user1.email == email1);
      if (accountExist) {
        result1.innerHTML =
          "There is already an account associated with this email address";
        return;
      }
      var json = JSON.stringify(user);
      let fajax1 = new Fajax();
      fajax1.open("POST", "https/ourProject/post", email1, json);
      fajax1.send();

      console.log("user added");
      result1.innerHTML = "User successfully added";
      currentUser.innerHTML = "What's up, " + user.username;
      currentUserVar = user;
      let fajax2 = new Fajax();
      fajax2.open("POST", "https/ourProject/post", "currentUserVar", json);
      fajax2.send();
      document.getElementById("username1").value = "";
      document.getElementById("password1").value = "";
      document.getElementById("email1").value = "";
      document.getElementById("signupbtn").style.display = "none";
      document.getElementById("loginbtn").style.display = "none";
      document.getElementById("logoutbtn").style.display = "block";
    }
  };
  fajax0.send();
}

function login(e) {
  event.preventDefault();

  var pass = document.getElementById("password2").value;
  var email = document.getElementById("email2").value;
  var result2 = document.getElementById("result2");
  var currentUser = document.getElementById("currntUserName");

  var user, data, json;
  let fajax0 = new Fajax();
  fajax0.open("GET", "https/ourProject/get/" + email, email);
  fajax0.onload = () => {
    if (fajax0.statusCode == "200") {
      user = fajax0.responseText;
      if (user != null) {
        data = JSON.parse(user);
      }

      console.log(data);
      if (user == null) {
        result2.innerHTML =
          "The email address is not registered on the website";
      } else if (email == data.email && pass == data.password) {
        result2.innerHTML = "logged in";
        currentUser.innerHTML = "What's up, " + data.username;

        data.wrongAttempts = 0;
        json = JSON.stringify(data);
        let fajax1 = new Fajax();
        fajax1.open("PUT", "https/ourProject/put", data.email, json);
        fajax1.send();
        let fajax2 = new Fajax();
        fajax2.open("PUT", "https/ourProject/put", "currentUserVar", json);
        fajax2.send();
        currentUserVar = data;
        document.getElementById("signupbtn").style.display = "none";
        document.getElementById("loginbtn").style.display = "none";
        document.getElementById("logoutbtn").style.display = "block";

        closeLogin();
      } else {
        if (data.wrongAttempts < 3) {
          result2.innerHTML = "wrong password";
          data.wrongAttempts += 1;
          json = JSON.stringify(data);
          let fajax3 = new Fajax();
          fajax3.open("PUT", "https/ourProject/put", data.email, json);
          fajax3.send();
        } else {
          let fajax4 = new Fajax();
          fajax4.open(
            "DELETE",
            "https/ourProject/delete/" + data.email,
            data.email
          );
          fajax4.send();
          result2.innerHTML =
            "You made a mistake 4 times, so the user is blocked and deleted. You can register again.";
        }
      }
    }
  };
  fajax0.send();
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
function closeShowTodo() {
  document.getElementById("showTodoDiv").style.display = "none";
  const element = document.getElementById("showTodoTemplate");
  element.remove();

  location.reload();
}
function logout() {
  currentUserVar = null;
  let fajax1 = new Fajax();
  fajax1.open("PUT", "https/ourProject/put", "currentUserVar", null);
  fajax1.send();
  document.getElementById("signupbtn").style.display = "inline";
  document.getElementById("loginbtn").style.display = "inline";
  document.getElementById("logoutbtn").style.display = "none";
  location.reload();
}

function submitSearch() {
  if (currentUserVar != null) {
    var searchvalue = document.getElementById("searchContent").value;
    console.log(searchvalue);
    let user;
    let fajax0 = new Fajax();
    fajax0.open(
      "GET",
      "https/ourProject/get/" + currentUserVar.email,
      currentUserVar.email
    );
    fajax0.onload = () => {
      if (fajax0.statusCode == "200") {
        user = JSON.parse(fajax0.responseText);
        todos = user.todos;
        todos.forEach((todo) => {
          if (!todo.content.includes(searchvalue)) {
            todo.isInSearch = false;
          }
        });
        user.todos = todos;
        console.log(user.todos);
        let fajax1 = new Fajax();
        fajax1.open(
          "PUT",
          "https/ourProject/put",
          currentUserVar.email,
          JSON.stringify(user)
        );
        fajax1.send();

        DisplayTodos();
      }
    };
    fajax0.send();
  } else {
    alert("please log in or sign up first.");
  }
}

function cleanSearch() {
  if (currentUserVar != null) {
    let fajax0 = new Fajax();
    fajax0.open(
      "GET",
      "https/ourProject/get/" + currentUserVar.email,
      currentUserVar.email
    );
    fajax0.onload = () => {
      if (fajax0.statusCode == "200") {
        user = JSON.parse(fajax0.responseText);
        todos = user.todos;
        todos.forEach((todo) => {
          todo.isInSearch = true;
        });
        user.todos = todos;
        console.log(user.todos);
        let fajax1 = new Fajax();
        fajax1.open(
          "PUT",
          "https/ourProject/put",
          currentUserVar.email,
          JSON.stringify(user)
        );
        fajax1.send();

        DisplayTodos();
      }
    };
    fajax0.send();
  } else {
    alert("please log in or sign up first.");
  }
}
