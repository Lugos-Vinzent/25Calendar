document.addEventListener("DOMContentLoaded", function () {
    const calendarContainer = document.createElement("div");
    calendarContainer.id = "calendar-container";
    calendarContainer.style.display = "flex";
    calendarContainer.style.overflowX = "auto";
    calendarContainer.style.whiteSpace = "nowrap";
    document.body.appendChild(calendarContainer);

    const today = new Date();
    let currentYear = today.getFullYear();
    let currentMonth = today.getMonth();

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    
    function generateCalendar(year, month) {
        const calendarWrapper = document.createElement("div");
        calendarWrapper.classList.add("calendar-wrapper");
        calendarWrapper.style.display = "inline-block";
        calendarWrapper.style.marginRight = "20px";
        calendarWrapper.style.verticalAlign = "top";
        calendarWrapper.style.minWidth = "300px";

        const monthDisplay = document.createElement("h2");
        monthDisplay.innerText = `${monthNames[month]} ${year}`;
        calendarWrapper.appendChild(monthDisplay);

        const table = document.createElement("table");
        table.classList.add("calendar");

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
                cell.style.textAlign = "center";
                cell.style.width = "40px";
                cell.style.height = "40px";

                if (i === 0 && j < firstDay) {
                    cell.innerHTML = "";
                } else if (day > daysInMonth) {
                    cell.innerHTML = "";
                } else {
                    cell.innerHTML = day;
                    cell.dataset.date = `${year}-${month + 1}-${day}`;
                    
                    if (year === today.getFullYear() && month === today.getMonth() && day === today.getDate()) {
                        cell.classList.add("today");
                        cell.style.backgroundColor = "#ffdd57"; // Highlight today's date
                    }
                    
                    cell.addEventListener("click", function () {
                        document.querySelectorAll(".calendar-cell").forEach(cell => {
                            if (!cell.classList.contains("today")) {
                                cell.style.backgroundColor = "";
                            } else {
                                cell.style.backgroundColor = "#ffdd57"; // Keep today yellow
                            }
                        });
                        if (this.classList.contains("today")) {
                            this.style.backgroundColor = "#ffa500"; // Orange when today is clicked
                        } else {
                            this.style.backgroundColor = "#57a0ff"; // Change clicked day color
                        }
                    });
                    
                    day++;
                }
                row.appendChild(cell);
            }
            table.appendChild(row);
            if (day > daysInMonth) break;
        }

        calendarWrapper.appendChild(table);
        calendarContainer.appendChild(calendarWrapper);
    }

    function generateMultipleMonths() {
        calendarContainer.innerHTML = "";
        for (let i = -2; i <= 2; i++) {
            let newMonth = currentMonth + i;
            let newYear = currentYear;
            if (newMonth < 0) {
                newMonth += 12;
                newYear--;
            } else if (newMonth > 11) {
                newMonth -= 12;
                newYear++;
            }
            generateCalendar(newYear, newMonth);
        }
    }

    document.addEventListener("wheel", function (event) {
        if (event.deltaX > 0) {
            currentMonth++;
        } else if (event.deltaX < 0) {
            currentMonth--;
        }
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        } else if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        generateMultipleMonths();
    });
    
    document.addEventListener("click", function (event) {
        if (!event.target.classList.contains("calendar-cell")) {
            document.querySelectorAll(".calendar-cell").forEach(cell => {
                if (!cell.classList.contains("today")) {
                    cell.style.backgroundColor = "";
                } else {
                    cell.style.backgroundColor = "#ffdd57"; // Reset today to yellow
                }
            });
        }
    });

    generateMultipleMonths();
});
