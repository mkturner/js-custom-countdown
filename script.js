const inputContainer = document.getElementById('input-container');
const countdownForm = document.getElementById('countdownForm');
const datePicker = document.getElementById('date-picker');

// Set Date input [min] attibute to today's date (Future values only)
const today = new Date().toISOString().split('T')[0];
// use today programmatically
datePicker.setAttribute('min', today);
