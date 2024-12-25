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

document.addEventListener('DOMContentLoaded', (event) => {
    const popup = document.getElementById('popup');
    const closeButton = document.querySelector('.close-button');
    const popupButton = document.getElementById('popupButton');
    const showMapButton = document.getElementById('showMapButton');
    const closeMapButton = document.getElementById('closeMapButton');
    const map = document.getElementById('map');
    const surpriseAudio = new Audio('crock_blast.mp3');

    // Show the popup when the page loads
    popup.style.display = 'block';

    // Close the popup when the close button is clicked
    closeButton.addEventListener('click', () => {
        popup.style.display = 'none';
    });

    // Close the popup when clicking outside of the popup content
    window.addEventListener('click', (event) => {
        if (event.target == popup) {
            popup.style.display = 'none';
        }
    });

    // Play sound, play song, trigger confetti, and close popup when the popup button is clicked
    popupButton.addEventListener('click', () => {
        surpriseAudio.play();
        audio.play().then(() => {
            console.log('Audio is playing');
            document.getElementById('playButton').textContent = '🔊';
        }).catch(error => {
            console.log('Autoplay was prevented:', error);
        });
        triggerConfetti();
        setTimeout(() => {
            popup.style.display = 'none';
        }, 500); // Close the popup after 500 milliseconds
    });

    // Show the map when the show map button is clicked
    showMapButton.addEventListener('click', () => {
        map.style.display = 'block';
    });

    // Close the map when the close map button is clicked
    closeMapButton.addEventListener('click', () => {
        map.style.display = 'none';
    });

    // Confetti effect
    const confettiCanvas = document.getElementById('confettiCanvas');
    const confettiCtx = confettiCanvas.getContext('2d');
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;

    const confettiColors = ['#FFC107', '#FF5722', '#4CAF50', '#2196F3', '#9C27B0'];
    const confettiCount = 300;
    const confetti = [];

    function createConfetti() {
        for (let i = 0; i < confettiCount; i++) {
            confetti.push({
                x: Math.random() * confettiCanvas.width,
                y: Math.random() * confettiCanvas.height - confettiCanvas.height,
                r: Math.random() * 6 + 2,
                d: Math.random() * confettiCount,
                color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
                tilt: Math.random() * 10 - 10,
                tiltAngleIncremental: Math.random() * 0.07 + 0.05,
                tiltAngle: 0
            });
        }
    }

    function drawConfetti() {
        confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
        confetti.forEach((confettiPiece, index) => {
            confettiCtx.beginPath();
            confettiCtx.lineWidth = confettiPiece.r / 2;
            confettiCtx.strokeStyle = confettiPiece.color;
            confettiCtx.moveTo(confettiPiece.x + confettiPiece.tilt + confettiPiece.r / 4, confettiPiece.y);
            confettiCtx.lineTo(confettiPiece.x + confettiPiece.tilt, confettiPiece.y + confettiPiece.tilt + confettiPiece.r / 4);
            confettiCtx.stroke();
        });

        updateConfetti();
    }

    function updateConfetti() {
        confetti.forEach((confettiPiece, index) => {
            confettiPiece.tiltAngle += confettiPiece.tiltAngleIncremental;
            confettiPiece.y += (Math.cos(confettiPiece.d) + 3 + confettiPiece.r / 2) / 2;
            confettiPiece.tilt = Math.sin(confettiPiece.tiltAngle - index / 3) * 15;

            if (confettiPiece.y > confettiCanvas.height) {
                confettiPiece.x = Math.random() * confettiCanvas.width;
                confettiPiece.y = -10;
                confettiPiece.tilt = Math.random() * 10 - 10;
            }
        });
    }

    function animateConfetti() {
        drawConfetti();
        requestAnimationFrame(animateConfetti);
    }

    function triggerConfetti() {
        createConfetti();
        animateConfetti();
    }
});
