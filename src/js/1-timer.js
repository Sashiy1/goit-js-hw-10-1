// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';

// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';


const timer = document.querySelector('.timer');
const input = document.querySelector('#datetime-picker');
const button = document.querySelector('button');
const values = document.querySelectorAll('.value');

button.disabled = true;



let userSelectedDate = '';
let intervalId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];

    const selectedDate = userSelectedDate.getTime();
    const dateNow = Date.now();

    if (selectedDate <= dateNow) {
      button.disabled = true;
      // window.alert();
      iziToast.warning({
        title: 'Error',
        message: 'Illegal operation',
        position: 'topRight',
        backgroundColor: '#EF4040',
        progressBarColor: '#FFBEBE',
        titleColor: '#FFFFFF',
        titleSize: '16px',
        messageColor: '#FAFAFB',
      
        
    });
    
    } else {
      button.disabled = false;
      // const diff = selectedDate - dateNow;
      // setClockface(convertMs(diff));
    
    }
  },
};

input.addEventListener('focus', flatpickr(input, options));
button.addEventListener('click', startTimer);






function startTimer () {
  input.disabled = true;

    intervalId = setInterval(() => {
        const timeDiff = userSelectedDate.getTime() - Date.now()
        setClockface(convertMs(timeDiff));
        if (timeDiff <= 1000) {
          clearInterval(intervalId)
        }
      }, 1000);
      // console.log(userSelectedDate.getTime() > Date.now())
    button.disabled = true;

}











function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function setClockface({ days, hours, minutes, seconds }) {
  values[0].firstChild.data = pad(`${days}`);
  values[1].firstChild.data = pad(`${hours}`);
  values[2].firstChild.data = pad(`${minutes}`);
  values[3].firstChild.data = pad(`${seconds}`);
}

function pad(value) {
  return String(value).padStart(2, '0');
}

