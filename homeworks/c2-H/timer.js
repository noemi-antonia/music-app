class Cronometru {
    constructor() {
        this.init();

        this.startBtn = document.getElementById("start");
        this.pauseBtn = document.getElementById("pause");
        this.resetBtn = document.getElementById("reset");

        this.millisecEl = document.getElementById("millisecond");
        this.secEl = document.getElementById("second");
        this.minEl = document.getElementById("minute");
        this.hrEl = document.getElementById("hour");

        this.addEventListeners();

        this.isRunning = false;
        this.interval = null;
    }

    addEventListeners() {

        this.startBtn.addEventListener('click', () => {
            if (this.isRunning) return;
            this.start();
        });

        this.pauseBtn.addEventListener('click', () => {
            this.pause();
        });
        this.resetBtn.addEventListener('click', () => {
            this.reset();
        });
    }

    init() {
        this.milliseconds = 0;
        this.seconds = 0;
        this.minutes = 0;
        this.hours = 0;

        document.getElementById("hour").innerHTML = "00";
        document.getElementById("minute").innerHTML = "00";
        document.getElementById("second").innerHTML = "00";
        document.getElementById("millisecond").innerHTML = "000";
    }

    start() {
        this.isRunning = true;
        this.startBtn.disabled = true;
        this.interval = setInterval(() => {
            this.calculateTimeSpend();
        }, 10);
    }

    pause() {
        this.isRunning = false;
        this.startBtn.disabled = false;
        clearInterval(this.interval);
        this.interval = null;
    }

    reset() {
        this.pause();
        this.init();
    }

    incrementTime() {
        this.milliseconds += 10;
    }

    calculateTimeSpend() {
        this.incrementTime();
        if (this.milliseconds == 1000) {
            this.milliseconds = 0;
            ++this.seconds;
        }
        if (this.seconds == 60) {
            this.seconds = 0;
            ++this.minutes;
        }
        if (this.minutes == 60) {
            this.minutes = 0;
            ++this.hours;
        }
        this.print();
    }

    print() {
        this.millisecEl.innerHTML = this.returnData(this.milliseconds);
        this.secEl.innerHTML = this.returnData(this.seconds);
        this.minEl.innerHTML = this.returnData(this.minutes);
        this.hrEl = this.returnData(this.hours);
    }

    returnData(input) {
        return input >= 10 ? input : `0${input}`
    }
}

const cronomentru = new Cronometru();