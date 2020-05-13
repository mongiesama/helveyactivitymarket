const loadActivities = async () => {
  const response = await fetch(
    "https://j2e5ml6a36.execute-api.us-west-1.amazonaws.com/live/activities"
  );
  // todo: create matching ledger
  // todo: hide behind api.helveyactivitymarket.com (add cors filter?)
  // todo: allow re-sort by points?
  // todo: changing over time
  let activities = await response.json();
  activities.sort(function(a,b){return a.order - b.order});
  let tableDom = document.getElementById("activityTable");
  activities.forEach(function(element, i) {
    console.log("adding activity " + element.name);
    let bonus = "";
    if (element.bonus) {
      bonus = element.bonus;
    }
    let row = tableDom.insertRow(i+1);
    row.className = (i % 2 === 1) ? 'odd' : 'even';
    let codeCell = row.insertCell(0);
    codeCell.innerHTML = element.code;
    let nameCell = row.insertCell(1);
    nameCell.innerHTML = element.name;
    if (element.note) {
      nameCell.innerHTML = "<div class='tooltip'>" + element.name
          + "<span class='tooltiptext wider'>" + element.note + "</span></div>";
    }
    let pointsCell = row.insertCell(2);
    pointsCell.innerHTML = element.points;
    pointsCell.className = 'pointsEntry';
    let bonusCell = row.insertCell(3);
    bonusCell.innerHTML = bonus;
  });
};

// noinspection JSIgnoredPromiseFromCall
loadActivities();
