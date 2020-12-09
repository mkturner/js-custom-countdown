const inputContainer = document.getElementById('input-container');
const countdownForm = document.getElementById('countdownForm');
const datePicker = document.getElementById('date-picker');

// create references to Countdown elements in DOM
const countdownContainer = document.getElementById('countdown');
const countdownContainerTitle = document.getElementById('countdown-title');
const countdownBtn = document.getElementById('countdown-button');

const completeContainer = document.getElementById('complete');
const completeInfo = document.getElementById('complete-info');
const completeBtn = document.getElementById('complete-button');

// return all the time fields in an array
const timeElements = document.querySelectorAll('span');

let countdownTitle = '';
let countdownDate = '';
let countdownValue = Date;
let activeCountdown;
let savedCountdown = {};

// time references
// second == 1000ms
const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;

// Set Date input [min] attibute to today's date (Future values only)
const today = new Date().toISOString().split('T')[0];
// use today programmatically
datePicker.setAttribute('min', today);

function updateDOM() {
    function calculateTime() {
        const now = new Date().getTime();
        // countdownValue is future date, now is smaller
        const timeToEvent = countdownValue - now;
        console.log('until event:', timeToEvent);

        //  hide input, show countdown
        inputContainer.hidden = true;

        let showComplete = () => {
            countdownContainer.hidden = true;
            clearInterval(activeCountdown);
            completeInfo.textContent = `${countdownTitle} finished on ${countdownDate}`;
            completeContainer.hidden =false;
        }
      
        let showRemaining = () => {
            // calculate days, hours mins, secs
            const days = Math.floor(timeToEvent / DAY);
            const hours = Math.floor((timeToEvent % DAY) / HOUR);
            const mins = Math.floor((timeToEvent % HOUR) / MINUTE);
            const secs = Math.floor((timeToEvent % MINUTE) / SECOND);
        
            const calculatedTime = [days, hours, mins, secs];
        
            // Populate Countdown
            countdownContainerTitle.textContent = `${countdownTitle}`;
            for (const i in calculatedTime) {
            timeElements[i].textContent = `${calculatedTime[i]}`;
            }
            completeContainer.hidden = true;
            countdownContainer.hidden = false;
        }

        // if countdown ended, show complete
        (timeToEvent <= 0) ? showComplete() : showRemaining();

      
    }

    // Calculate time and Update DOM every second.
    // SECOND already set to 1000ms
    activeCountdown = setInterval(calculateTime, SECOND);
}

// capture values from form input
function updateCountdown(e) {
  e.preventDefault();
  //  grab title from input
  countdownTitle = e.srcElement[0].value;
  // grab date from date picker
  countdownDate = e.srcElement[1].value;
  savedCountdown = {
      countdownTitle,
      countdownDate,
  }
  console.log(countdownTitle, countdownDate, savedCountdown);
  localStorage.setItem('countdown', JSON.stringify(savedCountdown));

    let update = () => {
        // calculate date to update DOM
        countdownValue = new Date(countdownDate).getTime();
        console.log('countdown value:', countdownValue);
        updateDOM();
    }

    //  validate date
    countdownDate === '' ? 
    alert('Please enter/select a valid date for Countdown' ) : 
    update();
}

// reset form, cancel interval
function reset() {
    // hide countdown, show input
    countdownContainer.hidden = true;
    completeContainer.hidden = true;
    inputContainer.hidden = false;
    // stop countdown
    clearInterval(activeCountdown);
    // Reset Values
    countdownTitle = '';
    countdownDate = '';
    localStorage.removeItem('countdown');
}

// check localStorage for previous countdown data
function restorePreviousCountdown() {

    if (localStorage.getItem('countdown')) {
        inputContainer.hidden = true;
        // reference to localStorage data
        savedCountdown = JSON.parse(localStorage.getItem('countdown'));
        // load data into memory
        countdownTitle = savedCountdown.countdownTitle;
        countdownDate = savedCountdown.countdownDate;
        // get countdownValue, so we can compute timeToEvent
        countdownValue = new Date(countdownDate).getTime();
        updateDOM();
    }
    
}


// Event Listener on form submit
countdownForm.addEventListener('submit', updateCountdown);
countdownBtn.addEventListener('click', reset);
completeBtn.addEventListener('click', reset);

// check localStorage on load
restorePreviousCountdown();