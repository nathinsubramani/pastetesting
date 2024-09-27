// Local storage for users and specified values
let users = JSON.parse(localStorage.getItem("users")) || [];
let specifiedValues = JSON.parse(localStorage.getItem("specifiedValues")) || [100, 100, 100, 100];

// Signup function
function signup() {
    const username = document.getElementById("newUsername").value;
    const password = document.getElementById("newPassword").value;
    const role = document.getElementById("role").value;

    users.push({ username, password, role });
    localStorage.setItem("users", JSON.stringify(users));
    alert("Signup successful! Please login.");
    window.location.href = "index.html";
}

// Login function
function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        localStorage.setItem("loggedInUser", JSON.stringify(user));
        window.location.href = "dashboard.html";
    } else {
        alert("Invalid credentials");
    }
}

// Load dashboard
window.onload = function() {
    if (window.location.pathname.includes("dashboard.html")) {
        const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
        if (!loggedInUser) {
            window.location.href = "index.html";
        }

        document.getElementById("role").textContent = loggedInUser.role;

        if (loggedInUser.role === "admin") {
            document.getElementById("admin-section").style.display = "block";
        }
    }
}

// Logout function
function logout() {
    localStorage.removeItem("loggedInUser");
    window.location.href = "index.html";
}

// Calculate percentage differences and efficiency
function calculate() {
    const input1 = Number(document.getElementById("input1").value);
    const input2 = Number(document.getElementById("input2").value);
    const input3 = Number(document.getElementById("input3").value);
    const input4 = Number(document.getElementById("input4").value);

    const differences = [
        Math.abs((input1 - specifiedValues[0]) / specifiedValues[0]) * 100,
        Math.abs((input2 - specifiedValues[1]) / specifiedValues[1]) * 100,
        Math.abs((input3 - specifiedValues[2]) / specifiedValues[2]) * 100,
        Math.abs((input4 - specifiedValues[3]) / specifiedValues[3]) * 100,
    ];

    const overallEfficiency = 100 - (differences.reduce((a, b) => a + b, 0) / differences.length);

    document.getElementById("results").innerHTML = `
        <p>Difference 1: ${differences[0].toFixed(2)}%</p>
        <p>Difference 2: ${differences[1].toFixed(2)}%</p>
        <p>Difference 3: ${differences[2].toFixed(2)}%</p>
        <p>Difference 4: ${differences[3].toFixed(2)}%</p>
        <h3>Overall Efficiency: ${overallEfficiency.toFixed(2)}%</h3>
    `;
}

// Admin can update specified values
function updateSpecifiedValues() {
    const specifiedValue1 = Number(document.getElementById("specifiedValue1").value);
    const specifiedValue2 = Number(document.getElementById("specifiedValue2").value);
    const specifiedValue3 = Number(document.getElementById("specifiedValue3").value);
    const specifiedValue4 = Number(document.getElementById("specifiedValue4").value);

    specifiedValues = [specifiedValue1, specifiedValue2, specifiedValue3, specifiedValue4];
    localStorage.setItem("specifiedValues", JSON.stringify(specifiedValues));

    alert("Specified values updated!");
}
