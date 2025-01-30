document.addEventListener("DOMContentLoaded", function () {
    const calendarBody = document.getElementById("calendar-body");
    const today = new Date();
    let currentYear = today.getFullYear();
    let currentMonth = today.getMonth();

    function generateCalendar(year, month) {
        calendarBody.innerHTML = "";

        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        let day = 1;

        for (let i = 0; i < 6; i++) {
            let row = document.createElement("tr");

            for (let j = 0; j < 7; j++) {
                let cell = document.createElement("td");
                cell.classList.add("calendar-cell");

                if (i === 0 && j < firstDay) {
                    cell.innerHTML = "";
                } else if (day > daysInMonth) {
                    cell.innerHTML = "";
                } else {
                    cell.innerHTML = day;
                    cell.dataset.date = `${year}-${month + 1}-${day}`;
                    
                    if (year === today.getFullYear() && month === today.getMonth() && day === today.getDate()) {
                        cell.style.backgroundColor = "#ffdd57"; // Highlight today's date
                    }
                    
                    cell.addEventListener("click", function () {
                        document.querySelectorAll(".calendar-cell").forEach(cell => cell.style.backgroundColor = "");
                        this.style.backgroundColor = "#57a0ff"; // Change clicked day color
                    });
                    
                    day++;
                }
                row.appendChild(cell);
            }
            calendarBody.appendChild(row);
            if (day > daysInMonth) break;
        }
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

    generateCalendar(currentYear, currentMonth);
});
