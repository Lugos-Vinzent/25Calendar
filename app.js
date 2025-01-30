document.addEventListener("DOMContentLoaded", function () {
    function generateCalendar(year, month) {
        const calendarBody = document.getElementById("calendar-body");
        calendarBody.innerHTML = "";

        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        let day = 1;

        for (let i = 0; i < 6; i++) {
            let row = document.createElement("tr");

            for (let j = 0; j < 7; j++) {
                let cell = document.createElement("td");

                if (i === 0 && j < firstDay) {
                    cell.innerHTML = "";
                } else if (day > daysInMonth) {
                    cell.innerHTML = "";
                } else {
                    cell.innerHTML = day;
                    day++;
                }
                row.appendChild(cell);
            }
            calendarBody.appendChild(row);
            if (day > daysInMonth) break;
        }
    }

    const today = new Date();
    generateCalendar(today.getFullYear(), today.getMonth());
});
