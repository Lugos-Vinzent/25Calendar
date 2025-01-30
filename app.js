document.addEventListener("DOMContentLoaded", function () {
    const calendarContainer = document.createElement("div");
    calendarContainer.id = "calendar-container";
    calendarContainer.style.display = "block";
    calendarContainer.style.overflowY = "auto";
    calendarContainer.style.height = "600px";
    calendarContainer.style.whiteSpace = "nowrap";
    document.body.appendChild(calendarContainer);

    const today = new Date();
    let currentYear = today.getFullYear();
    let currentMonth = today.getMonth();
    let currentWeekStart = new Date(today.setDate(today.getDate() - today.getDay()));

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    
    function generateCalendarWeek(startDate) {
        const calendarWrapper = document.createElement("div");
        calendarWrapper.classList.add("calendar-wrapper");
        calendarWrapper.style.display = "inline-block";
        calendarWrapper.style.marginRight = "10px";
        calendarWrapper.style.verticalAlign = "top";
        calendarWrapper.style.minWidth = "350px";
        
        const monthDisplay = document.createElement("h2");
        monthDisplay.innerText = `${monthNames[startDate.getMonth()]} ${startDate.getFullYear()}`;
        monthDisplay.style.writingMode = "vertical-rl";
        monthDisplay.style.textAlign = "center";
        monthDisplay.style.margin = "10px";
        calendarWrapper.appendChild(monthDisplay);

        const table = document.createElement("table");
        table.classList.add("calendar");
        let row = document.createElement("tr");

        for (let i = 0; i < 7; i++) {
            let cell = document.createElement("td");
            cell.classList.add("calendar-cell");
            cell.style.padding = "10px";
            cell.style.border = "1px solid #ddd";
            cell.style.textAlign = "center";
            cell.style.width = "50px";
            cell.style.height = "50px";
            
            let date = new Date(startDate);
            date.setDate(startDate.getDate() + i);
            cell.innerHTML = date.getDate();
            cell.dataset.date = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
            
            if (date.toDateString() === new Date().toDateString()) {
                cell.classList.add("today");
                cell.style.backgroundColor = "#ffdd57";
            }
            
            cell.addEventListener("click", function () {
                document.querySelectorAll(".calendar-cell").forEach(cell => {
                    if (!cell.classList.contains("today")) {
                        cell.style.backgroundColor = "";
                    } else {
                        cell.style.backgroundColor = "#ffdd57";
                    }
                });
                if (this.classList.contains("today")) {
                    this.style.backgroundColor = "#ffa500";
                } else {
                    this.style.backgroundColor = "#57a0ff";
                }
            });

            row.appendChild(cell);
        }
        table.appendChild(row);
        calendarWrapper.appendChild(table);
        calendarContainer.appendChild(calendarWrapper);
    }

    function generateContinuousWeeks() {
        calendarContainer.innerHTML = "";
        let startDate = new Date(currentWeekStart);
        for (let i = -2; i <= 2; i++) {
            let weekStart = new Date(startDate);
            weekStart.setDate(startDate.getDate() + i * 7);
            generateCalendarWeek(weekStart);
        }
    }

    document.addEventListener("wheel", function (event) {
        event.preventDefault();
        if (event.deltaY > 0) {
            currentWeekStart.setDate(currentWeekStart.getDate() + 7);
        } else if (event.deltaY < 0) {
            currentWeekStart.setDate(currentWeekStart.getDate() - 7);
        }
        generateContinuousWeeks();
    }, { passive: false });
    
    document.addEventListener("click", function (event) {
        if (!event.target.classList.contains("calendar-cell")) {
            document.querySelectorAll(".calendar-cell").forEach(cell => {
                if (!cell.classList.contains("today")) {
                    cell.style.backgroundColor = "";
                } else {
                    cell.style.backgroundColor = "#ffdd57";
                }
            });
        }
    });

    generateContinuousWeeks();
});
