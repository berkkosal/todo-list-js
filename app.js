//Tüm Elementleri Seçmek

const form = document.querySelector("#todoAddForm");
const addInput = document.querySelector("#todoName");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const clearButton = document.querySelector("#clearButton");
const filterInput = document.querySelector("#todoSearch");
const todo = document.querySelectorAll(".list-group-item d-flex justify-content-between");
var location;
let todos = [];

runEvents();

function runEvents() {
    form.addEventListener("submit", addTodo);
    clearButton.addEventListener("click", removeTodosFromEverywhere);
    document.addEventListener("DOMContentLoaded", pageLoaded);
    secondCardBody.addEventListener("click", deleteSelectedTodo);
    filterInput.addEventListener("keypress", filterSearch);

}


//! Yalnızca seçili todoyu silme.
function deleteSelectedTodo(e) {
    deleteSelectedTodoFromUI(e);

}

//! Seçili todoyu UI'dan silme.
function deleteSelectedTodoFromUI(e) {
    if (e.target.className === "fa fa-remove") {
        let listItemTodo = e.target.parentNode.parentNode;
        todoList.removeChild(listItemTodo);
        deleteSelectedTodoFromStorage(listItemTodo);
    } else null;
}


//! Seçili todoyu Storagedan silme.
function deleteSelectedTodoFromStorage(listItemTodo) {

    getTodosFromStorage();
    todos.forEach(function (todo, index) {
        if (listItemTodo.textContent === todo) {
            todos.splice(index, 1);
        }
    }
    );

    localStorage.setItem("todos", JSON.stringify(todos));

    //? ilk yazılan
    // for(let i = 0; i<todos.length;i++){
    //     if(todos[i]==listItemTodo.textContent){
    //         localStorage.removeItem(todos[i]);
    //     } else("başarısız");
    // }



    console.log(listItemTodo.textContent);
}


//!Üzerinde bir takım denemeler yapılmış alert metodum
function showAlert(type, text, location) {

    if (location == 0) {

        const alertDivElement = document.createElement("div");
        alertDivElement.className = "alert alert-" + type;
        alertDivElement.textContent = text;
        firstCardBody.appendChild(alertDivElement);
        setTimeout(function () { alertDivElement.remove(); }, 2500);

    } else if (location == 1) {

        const alertDivElement = document.createElement("div");
        alertDivElement.className = "alert alert-" + type;
        alertDivElement.textContent = text;
        secondCardBody.appendChild(alertDivElement);
        setTimeout(function () { alertDivElement.remove(); }, 2500);

    } else "Hata!";


}


//! Todo ekleme.
function addTodo(e) {
    const inputText = addInput.value.trim();
    if (inputText == null || inputText == "") {
        // alert("Lütfen bir değer giriniz")
        showAlert("warning", "Todo eklenemedi.", 0)
    } else {
        addTodoToUI(inputText);
        addTodoToStorage(inputText);
        showAlert("success", "Todo başarıyla eklendi.", 0);
    }



    e.preventDefault();

}



//! Sayfa yüklendiğinde çalışacak metot.
function pageLoaded() {
    getTodosFromStorage();
    todos.forEach(function (todo) {
        addTodoToUI(todo);
    });
}

//!Storage'a Todo ekleme.
function addTodoToStorage(newTodo) {
    getTodosFromStorage();
    todos.push(newTodo);
    localStorage.setItem("todos", JSON.stringify(todos));

}

//!Storageda key kontrolü yapan metot.
function getTodosFromStorage() {
    if (localStorage.getItem("todos") === null) {
        todos;
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
}

function filterSearch() {

    const filterValue = filterInput.value.toLowerCase().trim();
    const todoListesi = document.querySelectorAll(".list-group-item");

    if (todoListesi.length > 0) {
        todoListesi.forEach(function (todo) {
            if (todo.textContent.toLowerCase().trim().includes(filterValue)) {
                todo.setAttribute("style", "display : block");
            } else {
                todo.setAttribute("style", "display : none !important ");
            }
        })
    } else {
        showAlert("warning", "Filtreleme yapmak için todo bulunması gerekiyor.", 1);
    }


}

// //!Storagedaki todoları getiren metot.
// function getTodosFromStorage() {
//     localStorage.getItem(todo)
// }


//! Arayüze Todo ekleme.
function addTodoToUI(newTodo) {
    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between";
    li.textContent = newTodo;

    const a = document.createElement("a");
    a.href = "#";
    a.className = "delete-item";

    const i = document.createElement("i");
    i.className = "fa fa-remove";
    a.appendChild(i);
    li.appendChild(a);
    todoList.appendChild(li);
    addInput.value = "";

}


//! Tüm Todoları Silme.
function removeTodosFromEverywhere() {
    removeAllTodoFromUI();
    removeAllTodoFromStorage();
}

//! Arayüzden Tüm Todoları silme.
function removeAllTodoFromUI() {
    if (todoList.childElementCount != 0) {

        do (todoList.removeChild(todoList.firstChild))
        while (todoList.childElementCount != 0);

        //for döngüsündeki sorun ne?
        // for(let i = todoList.childElementCount; i> 0; i--){
        //     todoList.removeChild(todoList.firstChild);
        // } 
        showAlert("success", "tüm todolar başarılı bir şekilde temizlendi.", 1);

    } else showAlert("danger", "Silinecek bir todo bulunamadı.", 1)

    removeAllTodoFromStorage();

}

//! Storagedan Tüm Todoları Silme.
function removeAllTodoFromStorage() {
    todos = [];
    localStorage.setItem("todos", JSON.stringify(todos));

    // Geçici olarak bunu yaptım. Aslında olması gereken yukarda. localStorage.clear();
}





