const loadActivities = async () => {
  const response = await fetch(
    "https://j2e5ml6a36.execute-api.us-west-1.amazonaws.com/live/activities"
  );
  // todo: add "code", create matching ledger
  // todo: hide behind api.helveyactivitymarket.com (add cors filter?)
  // todo: sort by order field
  // todo: allow re-sort by points?
  // todo: changing over time
  let activities = await response.json();
  let tableDom = document.getElementById("activityTable");
  activities.forEach(function(element, i) {
    console.log("adding activity " + element.name);
    let bonus = "";
    if (element.bonus) {
      bonus = element.bonus;
    }
    let row = tableDom.insertRow(i+1);
    let nameCell = row.insertCell(0);
    nameCell.innerHTML = element.name;
    let pointsCell = row.insertCell(1);
    pointsCell.innerHTML = element.points;
    pointsCell.className = 'pointsEntry';
    let bonusCell = row.insertCell(2);
    bonusCell.innerHTML = bonus;
  });
};

// noinspection JSIgnoredPromiseFromCall
loadActivities();
