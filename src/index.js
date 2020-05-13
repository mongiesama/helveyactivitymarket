import "./styles.css";

const loadActivities = async () => {
  const response = await fetch(
    "https://j2e5ml6a36.execute-api.us-west-1.amazonaws.com/live/activities"
  );
  let activities = await response.json();
  console.log("read all activities: " + activities);
  let tableHtml = "<table><tr><th>Activity</th><th>Points per 15 minutes</th><th>Bonus Opportunity</th></tr>";
  activities.forEach(element => {
    console.log("adding activity " + element.name);
    var bonus = "";
    if (element.bonus) {
      bonus = element.bonus;
    }
    tableHtml =
      tableHtml +
      "<tr><td>" +
      element.name +
      "</td><td>" +
      element.points +
      "</td><td>" +
      bonus +
      "</td></tr>";
    console.log(tableHtml);
  });
  tableHtml = tableHtml + "</table>";
  document.getElementById("app").innerHTML = tableHtml;
}

loadActivities();
