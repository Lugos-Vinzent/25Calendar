const root = ReactDOM.createRoot(document.getElementById("root"));

function CalendarApp() {
  return (
    <div className="container">
      <h1>My Calendar</h1>
      <div id="calendar"></div>
    </div>
  );
}

root.render(<CalendarApp />);
