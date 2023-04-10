

// import { initializeApp } from "firebase/app";
// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyBaKzvmF2qJ8J65hUmVUE5P8lWOZ3yel8M",
//   authDomain: "cashulater-7f0d7.firebaseapp.com",
//   projectId: "cashulater-7f0d7",
//   storageBucket: "cashulater-7f0d7.appspot.com",
//   messagingSenderId: "449041159177",
//   appId: "1:449041159177:web:6afb9ddb1ffc67cf8a14d8"
// };
// // Initialize Firebase
// const app = initializeApp(firebaseConfig);


function signup_pop(event) {
  // prevent default <a> behavior
  event.preventDefault();

  // Show the modal
  const signupModal = document.getElementById('signupModal');
  signupModal.classList.add('is-active');

  // Add the email and password input fields
  const inputFieldsContainer = document.getElementById('inputFieldsContainer');

  // Clear the inputFieldsContainer before appending new input fields
  inputFieldsContainer.innerHTML = '';

  const emailInput = document.createElement('input');
  emailInput.type = 'email';
  emailInput.id = 'emailInput';
  emailInput.placeholder = 'Email';
  emailInput.className = 'input';

  const passwordInput = document.createElement('input');
  passwordInput.type = 'password';
  passwordInput.id = 'passwordInput';
  passwordInput.placeholder = 'Password';
  passwordInput.className = 'input';

  inputFieldsContainer.appendChild(emailInput);
  inputFieldsContainer.appendChild(passwordInput);
}


document.addEventListener('DOMContentLoaded', () => {
  const signupButton = document.getElementById('signupButton');
  const closeModal = document.getElementById('closeModal');
  const submitButton = document.getElementById('submitSignup');
  const deleteButton = document.getElementById('cancelSignup');

  // Show the modal
  signupButton.addEventListener('click', signup_pop);

  // Close the modal when the "Cancel" or "X" button is clicked
  closeModal.addEventListener('click', closeSignupModal);
  deleteButton.addEventListener('click', closeSignupModal);

  // Sign up when the "Submit" button is clicked
  submitButton.addEventListener('click', submitSignupHandler);
});

// Close the sign-up modal and clear input fields
function closeSignupModal() {
  const signupModal = document.getElementById('signupModal');
  signupModal.classList.remove('is-active');
}

function submitSignupHandler() {
  const email = document.getElementById('emailInput').value;
  const password = document.getElementById('passwordInput').value;

  console.log(email)
  console.log(password)

  // Sign up with Firebase Authentication
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed up successfully
      const user = userCredential.user;
      console.log('User signed up:', user);

      // Close the modal
      closeSignupModal();
    })
    .catch((error) => {
      // Error occurred during sign up
      console.error('Error signing up:', error);
    });
}


