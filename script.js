const targetDate = new Date("February 10, 2025 05:30:00").getTime();

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

const audio = new Audio('Mangalyam.mp3');
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
    const locationOverlay = document.getElementById('location');
    const invitationOverlay = document.getElementById('invitation');
    const viewInvitationButton = document.getElementById('viewInvitationButton');
    const closeInvitationButton = document.getElementById('closeInvitationButton');

    // Show the popup when the page loads
    popup.style.display = 'block';

    // Close the popup when the close button is clicked
    closeButton.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent default action
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

    // Redirect to Google Maps with directions when the show map button is clicked
    showMapButton.addEventListener('click', () => {
        const destination = 'X682+4C5';
        window.location.href = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destination)}`;
    });

    // Close the map when the close map button is clicked
    closeMapButton.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent default action
        event.stopPropagation(); // Stop event propagation
        locationOverlay.style.display = 'none';
    });

    // Show the invitation overlay when the view invitation button is clicked
    viewInvitationButton.addEventListener('click', () => {
        invitationOverlay.style.display = 'block';
    });

    // Close the invitation overlay when the close button is clicked
    closeInvitationButton.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent default action
        event.stopPropagation(); // Stop event propagation
        invitationOverlay.style.display = 'none';
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

    const translateButton = document.getElementById('translateButton');
    const inviteText = document.getElementById('invite-text');
    const weddingText = document.getElementById('wedding-text');
    const dateText = document.getElementById('date-text');
    const venueText = document.getElementById('venue-text');
    const venueText2 = document.getElementById('venue-text-2');
    const brideText = document.getElementById('bride-text');
    const brideText2 = document.getElementById('bride-text-2');
    const detailsText = document.getElementById('details-text');
    const venueLocation = document.getElementById('venue-location');
    const dateLocation = document.getElementById('date-location');
    const timeLocation = document.getElementById('time-location');
    const presenceText = document.getElementById('presence-text');
    const requestText = document.getElementById('request-text');

    translateButton.addEventListener('click', () => {
        if (translateButton.textContent === 'Translate to English') {
            inviteText.textContent = '🕊️ A Beautiful Day Where Two Hearts Unite! 🕊️';
            weddingText.textContent = 'A new chapter begins in the journey of life...';
            dateText.textContent = 'We warmly invite you to bless the occasion with your love and presence.';
            venueText.textContent = '🎩 Groom: Sathish';
            venueText2.textContent = '(A National-Level Gymnastics Coach – An Energetic Achiever!)';
            brideText.textContent = '👰 Bride: Rajeshwari';
            brideText2.textContent = '(Our Family’s Beloved Daughter, Full of Grace and Affection!)';
            detailsText.textContent = '🎯 Wedding Details:';
            venueLocation.textContent = 'Venue: Thirukoilur';
            dateLocation.textContent = 'Date: 10-02-2025';
            timeLocation.textContent = 'Time: 4:30 am to 6:00 am';
            presenceText.textContent = '🙏 Your Presence Will Make the Event Truly Special!';
            requestText.textContent = 'We kindly request you to join us and bless the couple with your love and support.';
            translateButton.textContent = 'Translate to Tamil';
        } else {
            inviteText.textContent = '🕊️ இரு இதயங்கள் இணையும் இனிய நாள்! 🕊️';
            weddingText.textContent = 'வாழ்க்கை பயணத்தில் ஒரு புதிய அத்தியாயம் தொடங்க…';
            dateText.textContent = 'அன்பும் ஆசீர்வாதமும் நிறைந்த உங்கள் வருகைக்கு ஆதரவாக அழைக்கிறோம்.';
            venueText.textContent = '🎩 மணமகன்: சதீஷ்';
            venueText2.textContent = '(தேசிய அளவிலான ஜிம்னாஸ்டிக் பயிற்சியாளர் – சுறுசுறுப்பான சாதனையாளர்!)';
            brideText.textContent = '👰 மணமகள்: ராஜேஸ்வரி';
            brideText2.textContent = '(அழகிய சிரிப்பும் பாசமும் நிறைந்த நமது குடும்பத்தின் மகள்!)';
            detailsText.textContent = '🎯 திருமண நிகழ்ச்சி விவரங்கள்:';
            venueLocation.textContent = 'இடம்: திருக்கோவிலூர்';
            dateLocation.textContent = 'தேதி: 10-02-2025';
            timeLocation.textContent = 'நேரம்: [நேரம்]';
            presenceText.textContent = '🙏 உங்கள் வருகையால் மட்டுமே நிகழ்ச்சி சிறப்படையும்!';
            requestText.textContent = 'உங்களின் பாசத்துடன் நிகழ்ச்சிக்கு வந்து நமக்கு ஆசீர்வதிக்குமாறு அன்புடன் அழைக்கிறோம்.';
            translateButton.textContent = 'Translate to English';
        }
    });
});
