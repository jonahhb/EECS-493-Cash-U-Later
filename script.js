function someFunc() {
  addData();
  showNotification();
}

function addData() {
  var newTransaction = document.getElementById("transaction-type1").value;
  var newExpenseType = '';
  if (newTransaction == "Spending") {
    newExpenseType = document.getElementById("expense-type").value;
  }

  var newAmount = document.getElementById("amount").value;
  var newRepeat = document.getElementById("repeatCheckbox");
  var newNotes = document.getElementById("notes").value

  if (!(newAmount > 0)) {
    alert("Please enter a valid transaction amount!");
    return;
  }

  // if(newTransaction == "Choose...") {
  // alert("Please choose a valid transaction type!");
  // }

  var newRow = document.createElement("tr");
  var newCell0 = document.createElement("td");
  var newCell1 = document.createElement("td");
  var newCell2 = document.createElement("td");
  var newCell3 = document.createElement("td");
  var newCell4 = document.createElement("td");
  var newCell5 = document.createElement("td");

  const today = new Date();
  const dateString = today.toLocaleDateString();

  const currentMonth = today.getMonth(); // Get the current month index
  var x = document.getElementById("graph-types").options;
  document.getElementById("graph-types").value = x[currentMonth].text;


  newCell0.innerHTML = dateString;
  console.log(dateString)
  newCell1.innerHTML = newTransaction;
  if (newTransaction == "Spending") {
    newCell2.innerHTML = newExpenseType;
  } else {
    newCell2.innerHTML = "N/A"
  }
  newCell3.innerHTML = newAmount;

  if (newRepeat.checked) {
    newCell4.innerHTML = document.getElementById("addSelect").value;
  }
  else {
    newCell4.innerHTML = "No";
  }
  newCell5.innerHTML = newNotes;

  newRow.append(newCell0);
  newRow.append(newCell1);
  newRow.append(newCell2);
  newRow.append(newCell3);
  newRow.append(newCell4);
  newRow.append(newCell5);

  document.getElementById("rows").appendChild(newRow);

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
  }, 1000);
}

// filtering function
function filterFunc() {
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
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