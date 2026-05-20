const API_URL = "http://127.0.0.1:8000";

let token = localStorage.getItem("token");


// CHECK LOGIN
if (token) {
    showDashboard();
    fetchTasks();
}


// REGISTER USER
async function registerUser() {

    const username = document.getElementById("username").value;

    const email = document.getElementById("email").value;

    const password = document.getElementById("password").value;

    const role = document.getElementById("role").value;     

    const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            username,
            email,
            password,
            role
        })
    });

    const data = await response.json();

    alert(data.message || data.detail);
}


// LOGIN USER
async function loginUser() {

    const email = document.getElementById("loginEmail").value;

    const password = document.getElementById("loginPassword").value;

    const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            email,
            password
        })
    });

    const data = await response.json();

    if (data.access_token) {

        token = data.access_token;

        localStorage.setItem("token", token);

        alert("Login Successful");

        showDashboard();

        fetchTasks();

    } else {

        alert(data.detail);
    }
}


// SHOW DASHBOARD
function showDashboard() {

    document.getElementById("auth-section").style.display = "none";

    document.getElementById("dashboard").style.display = "block";

    const payload = JSON.parse(atob(token.split(".")[1]));

    document.getElementById("role-text").innerText =
        `Logged in as: ${payload.role.toUpperCase()}`;
}


// CREATE TASK
async function createTask() {

    const title = document.getElementById("title").value;

    const description = document.getElementById("description").value;

    const response = await fetch(`${API_URL}/tasks/`, {
        method: "POST",

        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },

        body: JSON.stringify({
            title,
            description
        })
    });

    const data = await response.json();

    alert(data.message || data.detail);

    fetchTasks();
}


// FETCH TASKS
async function fetchTasks() {

    const response = await fetch(`${API_URL}/tasks/`, {

        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    const tasks = await response.json();

    const container = document.getElementById("tasks-container");

    container.innerHTML = "";

    tasks.forEach(task => {

        container.innerHTML += `

            <div class="task">

                <h3>${task.title}</h3>

                <p>${task.description}</p>

                <button onclick="deleteTask(${task.id})">
                    Delete
                </button>

            </div>
        `;
    });
}


// DELETE TASK
async function deleteTask(id) {

    const response = await fetch(`${API_URL}/tasks/${id}`, {

        method: "DELETE",

        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    const data = await response.json();

    alert(data.message || data.detail);

    fetchTasks();
}


function logoutUser() {

    localStorage.removeItem("token");

    location.reload();
}