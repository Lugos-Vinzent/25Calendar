const root = ReactDOM.createRoot(document.getElementById("root"));

function CalendarApp() {
  React.useEffect(() => {
    const calendarEl = document.createElement("div");
    calendarEl.id = "calendar";
    document.getElementById("root").appendChild(calendarEl);

    const calendar = new FullCalendar.Calendar(calendarEl, {
      initialView: "dayGridMonth"
    });

    calendar.render();
  }, []);

  return (
    <div>
      <h1>My Calendar</h1>
    </div>
  );
}

root.render(<CalendarApp />);
