  const daysRef = document.querySelector('[data-value="days"]');
  const hoursRef = document.querySelector('[data-value="hours"]');
  const minsRef = document.querySelector('[data-value="mins"]');
  const secsRef = document.querySelector('[data-value="secs"]');
  const titleRef = document.querySelector('#title');

  class CountdownTimer {
    constructor({ onTick, selector, targetDate }) {
      this.intervalId = null;
      this.onTick = onTick;
      this.selector = selector;
      this.targetDate = targetDate;
    }
    start() {
      this.intervalId = setInterval(() => {
        const currentDate = Date.now();
        const deltaTime = this.targetDate - currentDate;
        if (deltaTime < 0) {
          return this.stop();
        }
        const time = this.getTimeComponents(deltaTime);
        this.onTick(time);
      }, 1000);
    }
    stop() {
      clearInterval(this.intervalId);
      const time = this.getTimeComponents(0);
      this.onTick(time);
    }
  
    getTimeComponents(time) {
      const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
      const hours = this.pad(
        Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      );
      const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
      const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));
  
      return { days, hours, mins, secs };
    }
    pad(value) {
      return String(value).padStart(2, "0");
    }
  }
  
  const countdownTimer = new CountdownTimer({
    onTick: updateTimer,
    selector: "#timer-1",
    targetDate: new Date("Jul 31, 2036"),
  });
  
  countdownTimer.start();

function updateTimer({ days, hours, mins, secs }) {
daysRef.textContent = `${days}`;
hoursRef.textContent = `${hours}`;
minsRef.textContent = `${mins}`;
secsRef.textContent = `${secs}`;
}