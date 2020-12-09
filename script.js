const inputContainer = document.getElementById('input-container');
const countdownForm = document.getElementById('countdownForm');
const datePicker = document.getElementById('date-picker');

// create references to Countdown elements in DOM
const countdownContainer = document.getElementById('countdown');
const countdownContainerTitle = document.getElementById('countdown-title');
const countdownBtn = document.getElementById('countdown-btn');

// return all the time fields in an array
const timeElements = document.querySelectorAll('span');

let countdownTitle = '';
let countdownDate = '';
let countdownValue = Date;

// Set Date input [min] attibute to today's date (Future values only)
const today = new Date().toISOString().split('T')[0];
// use today programmatically
datePicker.setAttribute('min', today);

function updateDOM() {
  const now = new Date().getTime();
  // countdownValue is future date, now is smaller
  const timeToEvent = countdownValue - now;
  console.log('until event:', timeToEvent);
}

// capture values from form input
function updateCountdown(e) {
  e.preventDefault();
  //  grab title from input
  countdownTitle = e.srcElement[0].value;
  // grab date from date picker
  countdownDate = e.srcElement[1].value;
  console.log(countdownTitle, countdownDate);

  // calculate date to update DOM
  countdownValue = new Date(countdownDate).getTime();
  console.log('countdown value:', countdownValue);
  updateDOM();
}

// Event Listener on form submit
countdownForm.addEventListener('submit', updateCountdown);
