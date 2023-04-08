// *** Copied from firebase initialization page
// Import firebase
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBaKzvmF2qJ8J65hUmVUE5P8lWOZ3yel8M",
  authDomain: "cashulater-7f0d7.firebaseapp.com",
  projectId: "cashulater-7f0d7",
  storageBucket: "cashulater-7f0d7.appspot.com",
  messagingSenderId: "449041159177",
  appId: "1:449041159177:web:6afb9ddb1ffc67cf8a14d8"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
// ***

// function signupHandle() {
//   // reference button element
//   const signupButton = document.getElementById('signupButton');
//   // make a container for all the input fields
//   const inputFieldsContainer = document.getElementById('inputFieldsContainer');
 
//   signupButton.addEventListener('click', () => {
// 	// add simple input field for email
// 	const emailInput = document.createElement('input');
// 	emailInput.type = 'email';
// 	emailInput.id = 'emailInput';
// 	emailInput.placeholder = 'Email';
    
// 	// password
// 	const passwordInput = document.createElement('input');
// 	passwordInput.type = 'password';
// 	passwordInput.id = 'passwordInput';
// 	passwordInput.placeholder = 'Password';
 
// 	// add simple submit button
// 	const submitButton = document.createElement('button');
// 	submitButton.id = 'submitButton';
// 	submitButton.textContent = 'Submit';
 
// 	// Append input fields and submit button to the container
// 	inputFieldsContainer.appendChild(emailInput);
// 	inputFieldsContainer.appendChild(passwordInput);
// 	inputFieldsContainer.appendChild(submitButton);
 
//   	// Add a click event listener to the submit button
// 	submitButton.addEventListener('click', () => {
//   	// Get the user's email and password from input fields
//   	const email = emailInput.value;
//   	const password = passwordInput.value;
 
//   	// Sign up with Firebase Authentication
//   	firebase.auth().createUserWithEmailAndPassword(email, password)
//     	.then((userCredential) => {
//       	// Signed up successfully
//       	const user = userCredential.user;
//       	console.log('User signed up:', user);
//     	})
//     	.catch((error) => {
//       	// Error occurred during sign up
//       	console.error('Error signing up:', error);
//     	});
// 	});
//   });
// }

// // Ensure the DOM has been loaded before attaching event listeners
// document.addEventListener('DOMContentLoaded', () => {
//   const signupButton = document.getElementById('signupButton');

//   signupButton.addEventListener('click', signupHandle);
// });
                           	 
                           	 
                           	 
             	 


// recent transactions chart
function addData() {
  var newTransaction = document.getElementById("transaction-type1").value;
  var newAmount = document.getElementById("amount").value;
  // there might be an issue with repeat
  var newRepeat = document.getElementById("checkRepeat").value;
  var newNotes = document.getElementById("notes").value
 
  var newRow = document.createElement("tr");
  var newCell1 = document.createElement("td");
  var newCell2 = document.createElement("td");
  var newCell3 = document.createElement("td");
  var newCell4 = document.createElement("td");
 
  newCell1.innerHTML = newTransaction;
  newCell2.innerHTML = newAmount;
  if (newRepeat) {
	newCell3.innerHTML = "Yes";
  }
  else {
	newCell3.innerHTML = "No";
  }
  newCell4.innerHTML = newNotes;
 
  newRow.append(newCell1);
  newRow.append(newCell2);
  newRow.append(newCell3);
  newRow.append(newCell4);

  document.getElementById("rows").appendChild(newRow);
  document.getElementById("transaction-type1").value = '';
  document.getElementById("amount").value = '';
  document.getElementById("checkRepeat").value = false;
  document.getElementById("notes").value = '';
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
