// recent transactions chart
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

  var newRow = document.createElement("tr");
  var newCell1 = document.createElement("td");
  var newCell2 = document.createElement("td");
  var newCell3 = document.createElement("td");
  var newCell4 = document.createElement("td");
  var newCell5 = document.createElement("td");
 
  newCell1.innerHTML = newTransaction;
  newCell2.innerHTML = newExpenseType;
  newCell3.innerHTML = newAmount;
  
  if (newRepeat.checked) {
	  newCell4.innerHTML = "Yes";
  }
  else {
	  newCell4.innerHTML = "No";
  }
  newCell5.innerHTML = newNotes;
 
  newRow.append(newCell1);
  newRow.append(newCell2);
  newRow.append(newCell3);
  newRow.append(newCell4);
  newRow.append(newCell5);

  document.getElementById("rows").appendChild(newRow);

  // resetting the values back to default
  document.getElementById("transaction-type1").value = "Income";
  document.getElementById("expense-type").value = "Wants";
  document.getElementById("amount").value = '';
  document.getElementById("repeatCheckbox").checked = false;
  document.getElementById('repeated').style.display = 'none';
  document.getElementById("notes").value = '';
  
  setTimeout(() => {
    confirm("You have successfully entered a transaction!");
  }, 100);
}

// filtering function
function filterFunc() {
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("myTable");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
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
  } else {
	repeatedDiv.style.display = 'none';
  }
}


//nav-bar stuff start =============================
//navbar code for burger menu for mobile
document.addEventListener('DOMContentLoaded', () => {

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

//nav-bar stuff end =============================
