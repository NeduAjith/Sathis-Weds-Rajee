const targetDate = new Date("February 10, 2025 00:00:00").getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").textContent = days;
    document.getElementById("hours").textContent = hours;
    document.getElementById("minutes").textContent = minutes;
    document.getElementById("seconds").textContent = seconds;

    if (distance < 0) {
        clearInterval(interval);
        document.getElementById("countdown").textContent = "The big day is here!";
    }
}

const interval = setInterval(updateCountdown, 1000);

const audio = new Audio('Manasae_Thanthi_(Tum_Tum) (mp3cut.net).mp3');
audio.loop = true;

document.getElementById('playButton').addEventListener('click', function() {
    if (audio.paused) {
        audio.play().then(() => {
            console.log('Audio is playing');
            this.textContent = '🔊';
        }).catch(error => {
            console.log('Autoplay was prevented:', error);
        });
    } else {
        audio.pause();
        this.textContent = '🔇';
    }
});
