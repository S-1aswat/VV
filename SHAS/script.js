document.addEventListener('DOMContentLoaded', () => {
    let selections = {
        location: '',
        food: '',
        love: 0
    };

    const steps = document.querySelectorAll('.content');
    let currentStep = 0;
    
    // Initialize steps
    steps.forEach((step, index) => {
        if(index !== 0) step.classList.remove('active-step');
    });

    // Event Listeners
    document.getElementById('yesButton').addEventListener('click', nextStep);
    document.getElementById('noBtn').addEventListener('mouseover', moveButton);
    document.getElementById('finalButton').addEventListener('click', showFinalPage);
    document.getElementById('restartButton').addEventListener('click', () => location.reload());
    document.getElementById('loveSlider').addEventListener('input', updateLoveMeter);

    document.querySelectorAll('.option-card').forEach(card => {
        card.addEventListener('click', function() {
            const type = this.dataset.type;
            const value = this.dataset.value;
            selections[type] = value;
            
            // Visual feedback
            document.querySelectorAll(`.option-card`).forEach(el => el.classList.remove('selected'));
            this.classList.add('selected');
            
            // Auto-proceed after 1 second
            setTimeout(nextStep, 1000);
        });
    });

    function nextStep() {
        // Hide current step
        steps[currentStep].classList.remove('active-step');
        
        // Show next step
        currentStep++;
        if(currentStep < steps.length) {
            steps[currentStep].classList.add('active-step');
            updateProgress();
        }
    }

    function moveButton() {
        const button = document.getElementById('noBtn');
        const x = Math.random() * 80 - 40;
        const y = Math.random() * 80 - 40;
        button.style.transform = `translate(${x}px, ${y}px)`;
        button.innerHTML = ['No 😢', 'Maybe?', 'Try again!', 'Sure? 😥'][Math.floor(Math.random()*4)];
    }

    function updateLoveMeter(e) {
        const value = e.target.value;
        selections.love = value;
        document.getElementById('meterFill').style.width = value + '%';
        document.getElementById('lovePercentage').innerHTML = 
            `${value}% ${value > 50 ? '💖' : '💔'}`;
    }

    function showFinalPage() {
        document.getElementById('finalLocation').textContent = selections.location;
        document.getElementById('finalFood').textContent = selections.food;
        document.getElementById('finalLove').textContent = `${selections.love}% 💘`;
        nextStep();
        createHearts();
    }

    function updateProgress() {
        const progress = (currentStep / (steps.length - 1)) * 100;
        document.querySelector('.progress-bar').style.width = `${progress}%`;
    }

    function createHearts() {
        const container = document.getElementById('heartContainer');
        for(let i = 0; i < 50; i++) {
            const heart = document.createElement('div');
            heart.className = 'heart';
            heart.style.left = Math.random() * 100 + '%';
            heart.style.animationDelay = Math.random() * 2 + 's';
            heart.innerHTML = '💖';
            container.appendChild(heart);
        }
    }

    function nextStep() {
        // Hide all steps first
        steps.forEach(step => step.classList.remove('active-step'));
        
        // Show next step
        if(currentStep < steps.length) {
          steps[currentStep].classList.add('active-step');
          updateProgress();
          currentStep++; // Increment after showing
        }
      }
      
    // Initialize
    updateProgress();
});