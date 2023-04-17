// arrays storing in user data
const date = [];
// const dateWants = [];
const transaction = [];
const amount = [];
// just for completeness
const repeated = [];
const note = [];

var runningWantsIncome = [];
var runningWantsSpending = [];

var runningNeedsIncome = [];
var runningNeedsSpending = [];

var bool = 0
function someFunc() {
  console.log("Hello World!");
  addData();
  if(bool == 1){
    showNotification();
  }
}

function rmFunc() {
  var button = document.getElementById("rm-" + (date.length - 1));

  button.addEventListener('click', function() {
    //remove from arrays first
    var result = confirm("Are you sure you want to delete this transaction?");
    if (result) {
      var tempIndex = this.id;
      const regex = /rm-(\d+)/;
      const match = tempIndex.match(regex);
      if (match) {
        const idx = parseInt(match[1],10);
        date.splice(idx, 1);
        transaction.splice(idx, 1);
        amount.splice(idx, 1);
        repeated.splice(idx, 1);
        note.splice(idx, 1);
      }
    
      //getting the row we are del
      const row = this.parentNode.parentNode;
  
      //telling table to del row
      row.parentNode.removeChild(row);
    }
    updateValues();
  });
}

function makeGraphs() {
  // var myPlot = document.getElementById('myDiv'),

  trace1 = {x:date, y:runningNeedsIncome, type:'line'};
  trace2 = {x:date, y:runningNeedsSpending, type:'line'};

  trace3 = {x:date, y:runningWantsIncome, type:'line'};
  trace4 = {x:date, y:runningWantsSpending, type:'line'};

  var data = [trace1, trace2];
  var data2 = [trace3, trace4];

  Plotly.newPlot("needsGraph", data);
  Plotly.newPlot("wantsGraph", data2);

  console.log(runningNeedsIncome);
  console.log(runningNeedsSpending);
  // Plotly.plot('myDiv', data1);

  // myPlot.on('plotly_afterplot', function(){
  //   console.log('done plotting');
  // });

}

function updateValues() {
  runningWantsIncome = [];
  runningWantsSpending = [];

  runningNeedsIncome = [];
  runningNeedsSpending = [];

  for (let i = 0; i < date.length; i++) {
    // income section
    if (transaction[i] == "Income") {
      if (i >= 1) {
        runningWantsIncome.push(parseFloat(runningWantsIncome[i - 1]) + parseFloat(amount[i]* 0.3));
        runningNeedsIncome.push(parseFloat(runningNeedsIncome[i - 1]) + parseFloat(amount[i]* 0.5));
        runningWantsSpending.push(parseFloat(runningWantsSpending[i - 1]));
        runningNeedsSpending.push(parseFloat(runningNeedsSpending[i - 1]));
      }
      else {
        runningWantsIncome.push(parseFloat(amount[i]* 0.3));
        runningNeedsIncome.push(parseFloat(amount[i]* 0.5));
        runningWantsSpending.push(parseFloat(0));
        runningNeedsSpending.push(parseFloat(0));
      }
    }
    // spending section
    else {
      if (transaction[i] == "Wants") {
        if (i >= 1) {
          runningWantsSpending.push(parseFloat(runningWantsSpending[i - 1]) + parseFloat(amount[i]));
          runningWantsIncome.push(parseFloat(runningWantsIncome[i - 1]));
        }
        else {
          runningWantsSpending.push(parseFloat(amount[i]));
          runningWantsIncome.push(parseFloat(0));
        }
      }
      else {
        if (i >= 1) {
          runningNeedsSpending.push(parseFloat(runningNeedsSpending[i - 1]) + parseFloat(amount[i]));
          runningNeedsIncome.push(parseFloat(runningNeedsIncome[i - 1]));
        }
        else {
          runningNeedsSpending.push(parseFloat(amount[i]));
          runningNeedsIncome.push(parseFloat(0));
        }
      }
    }
  }
  makeGraphs();

}

function addData() {
  const today = new Date();
  const dateString = today.toLocaleDateString();
  date.push(dateString + " " + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds());

  var newTransaction = document.getElementById("transaction-type1").value;
  var newExpenseType = '';

  var newAmount = document.getElementById("amount").value;
  amount.push(newAmount);

  if (newTransaction == "Income") {
    transaction.push(newTransaction);
  }

  else {
    newExpenseType = document.getElementById("expense-type").value;
    transaction.push(newExpenseType);
  }
  
  var newRepeat = document.getElementById("repeatCheckbox");
  var newNotes = document.getElementById("notes").value;
  note.push(newNotes);

  if (!(newAmount > 0)) {
    alert("Please enter a valid transaction amount!");
    bool = 0;
    return;
  }
  else {
    bool = 1;
  }

  var newRow = document.createElement("tr");
  var newCell0 = document.createElement("td");
  var newCell1 = document.createElement("td");
  var newCell2 = document.createElement("td");
  var newCell3 = document.createElement("td");
  var newCell4 = document.createElement("td");
  var newCell5 = document.createElement("td");
  var newCell6 = document.createElement("td");

  const currentMonth = today.getMonth(); // Get the current month index
  var x = document.getElementById("graph-types").options;
  document.getElementById("graph-types").value = x[currentMonth].text;

  var frequency = document.getElementById("addSelect").value;
  if (newRepeat.checked) {
    if (frequency == "Daily") {
      repeated.push(1);
    }
    if (frequency == "Weekly") {
      repeated.push(7);
    }
    if (frequency == "BiWeekly") {
      repeated.push(14);
    }
    if (frequency == "Month") {
      repeated.push(30);
    }
  }
  else {
    repeated.push(0);
  }

  newCell0.textContent = date[date.length - 1];
  if (transaction[date.length - 1] == "Income") {
    newCell1.textContent = transaction[date.length - 1];
    newCell2.textContent = "N/A";
  }
  else if (transaction[date.length - 1] == "Wants" || transaction[date.length - 1] == "Needs") {
    newCell1.textContent = "Spending";
    newCell2.textContent = transaction[date.length - 1];
  }
  newCell3.textContent = amount[date.length - 1];
  if (repeated[date.length - 1] == 0) {
    newCell4.textContent = "No";
  }
  else if (repeated[date.length - 1] == 1) {
    newCell4.textContent = "Daily";
  }
  else if (repeated[date.length - 1] == 7) {
    newCell4.textContent = "Weekly";
  }
  else if (repeated[date.length - 1] == 14) {
    newCell4.textContent = "BiWeekly";
  }
  else {
    newCell4.textContent = "Monthly";
  }
  newCell5.textContent = note[date.length - 1];
  console.log(`<button class='deleteBtn' id=rm-${date.length - 1}>Delete</button>`);
  newCell6.innerHTML = `<button class='deleteBtn' id=rm-${date.length - 1}><img class="deleteButton1" src="images/Logos/delete_FILL0_wght400_GRAD0_opsz48.png"/></button>`;

  var table = document.getElementById("myTable");
  newRow.append(newCell0);
  newRow.append(newCell1);
  newRow.append(newCell2);
  newRow.append(newCell3);
  newRow.append(newCell4);
  newRow.append(newCell5);
  newRow.append(newCell6);
  document.getElementById("rows").appendChild(newRow);

  rmFunc();
  updateValues();

  // resetting the values back to default
  if (document.getElementById("transaction-type1").value == "Income") {
    //show the thing below
    var spendingLabel = document.getElementById("spendingLabel");
    var newExpense = document.getElementById("expenseType");
    spendingLabel.style.display = 'block';
    newExpense.style.display = 'block';
    newExpense.classList.add('is-arrowless');
  }
  document.getElementById("transaction-type1").value = "Spending";
  document.getElementById("expense-type").value = "Wants";
  document.getElementById("amount").value = '';
  document.getElementById("repeatCheckbox").checked = false;
  document.getElementById('repeated').style.display = 'none';
  document.getElementById("notes").value = '';
}

function showNotification() {
  var notificationEl = document.querySelector(".notification-message");

  notificationEl.classList.add("show");
  setTimeout(function() {
    notificationEl.classList.remove("show");
  }, 3000);
}

// filtering function
function filterFunc() {
  var select, filter, table, tr, td, i, txtValue;
  select = document.getElementById("myDropDown");
  filter = select.value.toUpperCase();
  table = document.getElementById("myTable");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[1];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}

// filtering function
function filterFunc() {
  var select, filter, table, tr, td, i, txtValue;
  select = document.getElementById("mySelect");
  filter = select.value.toUpperCase();
  table = document.getElementById("myTable");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[1];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}


function openTab(evt, tabName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tab-content");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByTagName("li");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].classList.remove("is-active");
  }
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.classList.add("is-active");
}

//makes the recurring dropdown appear when the checkbox is checked
function toggleSelect() {
  const repeatCheckbox = document.getElementById('repeatCheckbox');
  const repeatedDiv = document.getElementById('repeated');

  if (repeatCheckbox.checked) {
    repeatedDiv.style.display = 'block';
    repeatedDiv.classList.add('is-arrowless');
  } else {
    repeatedDiv.style.display = 'none';
    repeatedDiv.classList.remove('is-arrowless');
  }
}

//makes spending type disappear when income is selected
function toggleSelect2() {
  const Label = document.getElementById('repeatCheckbox');
  const dropDown = document.getElementById('repeatCheckbox');
  const transactionTypeDropDown = document.getElementById('repeated');

  if (transactionTypeDropDown.value == "Income") {
    Label.style.display = 'none';
    dropDown.style.display = 'none';
    dropDown.classList.remove('is-arrowless');
  } else {
    Label.style.display = 'block';
    dropDown.style.display = 'block';
    dropDown.classList.add('is-arrowless');
  }
}

function changeExpenseType() {
  var newTransaction = document.getElementById("transaction-type1").value;
  var spendingLabel = document.getElementById("spendingLabel");
  var newExpense = document.getElementById("expenseType");

  if (newTransaction == "Spending") {
    spendingLabel.style.display = 'block';
    newExpense.style.display = 'block';
    newExpense.classList.add('is-arrowless');
  }
  else {
    spendingLabel.style.display = 'none';
    newExpense.style.display = 'none';
    newExpense.classList.add('is-arrowless');
  }
}

//navbar burger
//navbar code for burger menu for mobile
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById("submitBut").onclick = function() {someFunc()};

  // Get all "navbar-burger" elements
  const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

  // Add a click event on each of them
  $navbarBurgers.forEach( el => {
    el.addEventListener('click', () => {

      // Get the target from the "data-target" attribute
      const target = el.dataset.target;
      const $target = document.getElementById(target);

      // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
      el.classList.toggle('is-active');
      $target.classList.toggle('is-active');

    });
  });

  // get all a elements in #navbarBasicExample
  const $navbarLinks = Array.prototype.slice.call(document.querySelectorAll('#navbarBasicExample a'), 0);

  const $navbarMenu = document.getElementById('navbarBasicExample');

  // add click event to each link
  $navbarLinks.forEach( el => {
    el.addEventListener('click', () => {

      // remove is-active class from all navbar-burger elements
      $navbarBurgers.forEach( el => {
        el.classList.remove('is-active');
      });

      // remove is-active class from navbar-menu
      $navbarMenu.classList.remove('is-active');

    }
  )});

});