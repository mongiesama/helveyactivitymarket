let cachedActivities = {};
let sort = "order";

function sortByCode(a, b) {
  return (a.code < b.code) ? -1 : (a.code > b.code) ? 1 : 0;
}

function sortByPoints(a, b) {
  return b.points - a.points;
}

function sortByDefault(a, b) {
  return a.order - b.order;
}

function clearTable() {
  let tableDom = document.getElementById("activityTable");
  let rowCount = tableDom.rows.length;
  for (let i = rowCount - 1; i > 0; i--) {
    tableDom.deleteRow(i);
  }
}

function sortTableByPoints() {
  console.log("sorting by points");
  if (sort !== "points") {
    sort = "points";
    cachedActivities.sort(sortByPoints);
    clearTable();
    renderTable();
  } else {
    sortTableByOrder()
  }
}

function sortTableByCode() {
  console.log("sorting by code");
  if (sort !== "code") {
    sort = "code";
    cachedActivities.sort(sortByCode);
    clearTable();
    renderTable();
  } else {
    sortTableByOrder()
  }
}

function sortTableByOrder() {
  console.log("sorting by order");
  if (sort !== "order") {
    sort = "order";
    cachedActivities.sort(sortByDefault);
    clearTable();
    renderTable();
  }
}

function renderTable() {
  let tableDom = document.getElementById("activityTable");
  cachedActivities.forEach(function(element, i) {
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
}

const loadActivities = async () => {
  const response = await fetch(
      "https://j2e5ml6a36.execute-api.us-west-1.amazonaws.com/live/activities"
  );
  // todo: create matching ledger
  // todo: hide behind api.helveyactivitymarket.com (add cors filter?)
  // todo: changing over time
  let activities = await response.json();
  activities.sort(sortByDefault);
  cachedActivities = activities;
  renderTable();
};

loadActivities().then(function() {
  console.log("finished loading: " + JSON.stringify(cachedActivities) + " 2");
  document.getElementById("pointsHead").onclick = sortTableByPoints;
  document.getElementById("codeHead").onclick = sortTableByCode;
});

