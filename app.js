document.addEventListener("DOMContentLoaded", function () {
    const calendarContainer = document.createElement("div");
    calendarContainer.id = "calendar-container";
    calendarContainer.style.display = "block";
    calendarContainer.style.overflowY = "auto";
    calendarContainer.style.height = "100vh";
    calendarContainer.style.width = "100vw";
    document.body.appendChild(calendarContainer);

    const today = new Date();
    let currentYear = today.getFullYear();
    let currentMonth = today.getMonth();

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    
    function generateCalendar(year, month) {
        calendarContainer.innerHTML = "";

        const calendarWrapper = document.createElement("div");
        calendarWrapper.classList.add("calendar-wrapper");
        calendarWrapper.style.width = "90vw";
        calendarWrapper.style.height = "90vh";
        calendarWrapper.style.display = "flex";
        calendarWrapper.style.flexDirection = "column";
        calendarWrapper.style.alignItems = "center";
        
        const monthDisplay = document.createElement("h2");
        monthDisplay.innerText = `${monthNames[month]} ${year}`;
        calendarWrapper.appendChild(monthDisplay);

        const table = document.createElement("table");
        table.classList.add("calendar");
        table.style.width = "90%";
        table.style.height = "90%";

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
                    
                    if (year === today.getFullYear() && month === today.getMonth() && day === today.getDate()) {
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

    generateCalendar(currentYear, currentMonth);
});
