// --- DOM Elements ---
const body = document.body;
const timerDisplay = document.getElementById('timer-display');
const pomodoroBtn = document.getElementById('pomodoro-btn');
const shortBreakBtn = document.getElementById('short-break-btn');
const longBreakBtn = document.getElementById('long-break-btn');
const startPauseBtn = document.getElementById('start-pause-btn');
const skipBtn = document.getElementById('skip-btn');
const alarmSound = document.getElementById('alarm-sound');

// --- Configuration (Times and Colors) ---
const MODES = {
    'pomodoro': { time: 25 * 60, color: '#ba4949', text_color: '#ba4949' }, 
    'short-break': { time: 5 * 60, color: '#38858a', text_color: '#38858a' },   
    'long-break': { time: 15 * 60, color: '#397097', text_color: '#397097' }    
};

// --- State Variables ---
let currentMode = 'pomodoro';
let timeLeft = MODES[currentMode].time; // Time remaining in seconds
let timerInterval = null; 
let isRunning = false;

// --- Helper Functions ---

/**
 * Updates the timer display with the format MM:SS.
 * @param {number} seconds The time remaining in seconds.
 */
function updateDisplay(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    
    // Format minutes and seconds with leading zeros (e.g., 05:00)
    const formattedTime = 
        `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
    
    timerDisplay.textContent = formattedTime;
    document.title = `${formattedTime} | AI Pomodoro Timer`;
}

/**
 * Changes the mode (Pomodoro, Short Break, Long Break).
 * @param {string} mode The new mode ('pomodoro', 'short-break', 'long-break').
 */
function changeMode(mode) {
    // 1. Stop the timer if running
    pauseTimer(); 

    // 2. Update state
    currentMode = mode;
    timeLeft = MODES[mode].time;

    // 3. Update UI (Background color, Button text color, Active button)
    body.style.backgroundColor = MODES[mode].color;
    startPauseBtn.style.color = MODES[mode].text_color;
    // Set a variable for the button's shadow color to match the design
    startPauseBtn.style.setProperty('--shadow-color', MODES[mode].color + 'dd'); 
    
    updateDisplay(timeLeft);
    
    // Update active button style
    document.querySelectorAll('.mode-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById(`${mode}-btn`).classList.add('active');

    // 4. Reset start/pause button text and hide skip button
    startPauseBtn.textContent = 'START';
    skipBtn.classList.add('hidden');
}

/**
 * Starts the countdown timer.
 */
function startTimer() {
    if (isRunning) return; 

    isRunning = true;
    startPauseBtn.textContent = 'PAUSE';
    skipBtn.classList.remove('hidden'); // Show skip button when running

    timerInterval = setInterval(() => {
        timeLeft--;
        updateDisplay(timeLeft);

        if (timeLeft <= 0) {
            // Timer finished
            clearInterval(timerInterval);
            isRunning = false;
            startPauseBtn.textContent = 'START';
            skipBtn.classList.add('hidden'); 
            
            playAlarm();
        }
    }, 1000); // 1000ms = 1 second
}

/**
 * Pauses the countdown timer.
 */
function pauseTimer() {
    if (!isRunning) return;

    clearInterval(timerInterval);
    isRunning = false;
    startPauseBtn.textContent = 'START';
    skipBtn.classList.add('hidden'); // Hide skip button when paused
}

/**
 * Toggles between START and PAUSE.
 */
function toggleTimer() {
    if (isRunning) {
        pauseTimer();
    } else {
        startTimer();
    }
}

/**
 * Resets the timer to the initial time of the current mode.
 */
function skipTimer() {
    pauseTimer(); // Stop the timer
    timeLeft = MODES[currentMode].time; // Reset time
    updateDisplay(timeLeft); // Update display
    // The timer is now paused and ready to be started again
}

/**
 * Plays an alarm sound for 2 seconds.
 * **Security Policy Compliance:** Browsers often block `audio.play()` unless it's triggered 
 * by a direct user action. While this is triggered by the timer hitting zero, it may still 
 * be blocked. The best practice is implemented here, but users may need to explicitly 
 * enable media auto-play for the site if the alarm is silent.
 */
function playAlarm() {
    alarmSound.currentTime = 0; // Rewind to the start
    alarmSound.play()
        .catch(error => {
            console.warn("Audio playback might be blocked by the browser's autoplay policies.", error);
        });

    // Stop after 2 seconds
    setTimeout(() => {
        alarmSound.pause();
        alarmSound.currentTime = 0;
    }, 2000);
}

// --- Event Listeners ---
pomodoroBtn.addEventListener('click', () => changeMode('pomodoro'));
shortBreakBtn.addEventListener('click', () => changeMode('short-break'));
longBreakBtn.addEventListener('click', () => changeMode('long-break'));

startPauseBtn.addEventListener('click', toggleTimer);
skipBtn.addEventListener('click', skipTimer);

// --- Initialization ---
// Set initial state on page load (Pomodoro: 25:00, #ba4949)
changeMode(currentMode);