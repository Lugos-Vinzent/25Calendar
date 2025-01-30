const root = ReactDOM.createRoot(document.getElementById("root"));

function CalendarApp() {
  React.useEffect(() => {
    const calendarEl = document.getElementById("calendar");

    const calendar = new FullCalendar.Calendar(calendarEl, {
      plugins: [FullCalendar.DayGrid],
      initialView: "dayGridMonth",
    });

    calendar.render();
  }, []);

  return (
    <div className="container">
      <h1>My Calendar</h1>
      <div id="calendar"></div>
    </div>
  );
}

root.render(<CalendarApp />);
