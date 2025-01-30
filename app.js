document.addEventListener("DOMContentLoaded", function () {
    // 🔥 Firebase Configuration (Replace with your actual keys)
    const firebaseConfig = {
        apiKey: "AIzaSyB0CHIZBpFI4RzE5XlFH3VS0vffgfyaJwU",
        authDomain: "two5calendar.firebaseapp.com",
        projectId: "two5calendar",
        storageBucket: "two5calendar.appspot.com",
        messagingSenderId: "148397724051",
        appId: "1:148397724051:web:4102962402993044a89866"
    };

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    const auth = firebase.auth();
    const provider = new firebase.auth.GoogleAuthProvider();

    // Add Google Sign-In Scopes
    provider.addScope("email");
    provider.addScope("profile");

    // Select elements
    const loginBtn = document.getElementById("login-btn");
    const logoutBtn = document.getElementById("logout-btn");
    const authContainer = document.getElementById("auth-container");
    let calendarContainer = document.getElementById("calendar-container");

    if (!calendarContainer) {
        calendarContainer = document.createElement("div");
        calendarContainer.id = "calendar-container";
        calendarContainer.style.display = "none"; // Initially hidden until login
        calendarContainer.style.overflowY = "auto";
        calendarContainer.style.height = "100vh";
        calendarContainer.style.width = "100vw";
        document.body.appendChild(calendarContainer);
    }

    // Google Sign-In Function (Using Redirect to Avoid Popup Blocks)
    loginBtn.addEventListener("click", () => {
        firebase.auth().signInWithRedirect(provider);
    });

    // Handle Redirect Result (Login Callback)
    firebase.auth().getRedirectResult().then(result => {
        if (result.user) {
            console.log("User logged in with Google:", result.user);
        }
    }).catch(error => {
        console.error("Google Sign-In error:", error.message);
    });

    // Logout Function
    logoutBtn.addEventListener("click", () => {
        auth.signOut().then(() => {
            console.log("User logged out");
        });
    });

    // Detect login state changes
    auth.onAuthStateChanged(user => {
        if (user) {
            console.log("User logged in:", user.email);
            authContainer.style.display = "none";
            calendarContainer.style.display = "block";
            logoutBtn.style.display = "block";
            generateCalendar(currentYear, currentMonth);
        } else {
            console.log("No user logged in.");
            authContainer.style.display = "block";
            calendarContainer.style.display = "none";
            logoutBtn.style.display = "none";
        }
    });

    const today = new Date();
    let currentYear = today.getFullYear();
    let currentMonth = today.getMonth();

    function generateCalendar(year, month) {
        calendarContainer.innerHTML = "";

        const calendarWrapper = document.createElement("div");
        calendarWrapper.classList.add("calendar-wrapper");
        calendarWrapper.style.width = "100vw";
        calendarWrapper.style.height = "100vh";
        calendarWrapper.style.display = "flex";
        calendarWrapper.style.flexDirection = "column";
        calendarWrapper.style.alignItems = "center";
        
        const monthDisplay = document.createElement("h2");
        monthDisplay.innerText = `${monthNames[month]} ${year}`;
        calendarWrapper.appendChild(monthDisplay);

        const table = document.createElement("table");
        table.classList.add("calendar");
        table.style.width = "100%";
        table.style.height = "100%";

        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        let day = 1;

        for (let i = 0; i < 6; i++) {
            let row = document.createElement("tr");

            for (let j = 0; j < 7; j++) {
                let cell = document.createElement("td");
                cell.classList.add("calendar-cell");
                cell.style.padding = "10px";
                cell.style.border = "1px solid #ddd";
                cell.style.textAlign = "left";
                cell.style.width = "14%";
                cell.style.height = "14%";
                cell.style.position = "relative";
                
                const cellContent = document.createElement("div");
                cellContent.style.fontSize = "12px";
                cellContent.style.position = "absolute";
                cellContent.style.top = "5px";
                cellContent.style.left = "5px";
                
                if (i === 0 && j < firstDay) {
                    cell.innerHTML = "";
                } else if (day > daysInMonth) {
                    cell.innerHTML = "";
                } else {
                    cellContent.innerHTML = `${weekDays[j]} ${day}`;
                    cell.appendChild(cellContent);
                    cell.dataset.date = `${year}-${month + 1}-${day}`;
                    day++;
                }
                row.appendChild(cell);
            }
            table.appendChild(row);
        }

        calendarWrapper.appendChild(table);
        calendarContainer.appendChild(calendarWrapper);
    }

    function changeMonth(offset) {
        currentMonth += offset;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        } else if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        generateCalendar(currentYear, currentMonth);
    }

    document.addEventListener("wheel", function (event) {
        if (event.deltaY > 0) {
            changeMonth(1);
        } else if (event.deltaY < 0) {
            changeMonth(-1);
        }
    });
});
