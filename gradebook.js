function fetchGradeData() {
  console.log("Fetching grade data...");
  let xhr = new XMLHttpRequest();
  let apiRoute = "/api/grades";
  xhr.onreadystatechange = function(){
    let results;
    if(xhr.readyState === xhr.DONE){
      if(xhr.status !== 200){
        console.error('Could not get grades. Status: ${xhr.status}');
      } else {
        populateGradebook(JSON.parse(xhr.responseText));
      }
    }
  }.bind(this);
  xhr.open("get", apiRoute, true);
  xhr.send();
}

function populateGradebook(data) {
  console.log("Populating gradebook with data", data);
  let tableEl = document.getElementById("gradebook");  // The table element in your HTML
  data.forEach(function(assignment) {
    let row = document.createElement("tr"); // Create new row
    
    let columns = {};
    // First column: name
    columns.name = document.createElement("td");
    columns.name.appendChild(
      document.createTextNode(assignment.last_name + ", " + assignment.first_name)
    );
    row.appendChild(columns.name);

    // Second column: grade
    columns.grade = document.createElement("td");
    columns.grade.appendChild(
      document.createTextNode(assignment.total_grade)
    );
    row.appendChild(columns.grade);

    // Add row to table
    tableEl.appendChild(row);
  });
}