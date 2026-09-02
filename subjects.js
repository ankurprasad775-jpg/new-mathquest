/* Subjects section script - FIX: supports SPA re-injection */
function initSubjects() {
    // FIX: prevent duplicate listeners on SPA re-injection - clone nodes
    const oldTrig = document.getElementById('trig-card');
    if (oldTrig) {
        const newTrig = oldTrig.cloneNode(true);
        oldTrig.parentNode.replaceChild(newTrig, oldTrig);
    }
    document.querySelectorAll('.topic-item').forEach(function(item){
        const newItem = item.cloneNode(true);
        item.parentNode.replaceChild(newItem, item);
    });
    const trigCard = document.getElementById('trig-card');
    
    if (trigCard) {
        trigCard.addEventListener('click', function(e) {
            if (!e.target.closest('.topic-item') && !e.target.closest('.subject-btn')) {
                this.classList.toggle('expanded');
            }
        });
    }

    document.querySelectorAll('.topic-item').forEach(item => {
        item.addEventListener('click', function(e) {
            e.stopPropagation();
            const topicName = this.textContent.trim();
            console.log('Selected topic:', topicName);
        });
    });

    // Practice Questions: green for correct, red for wrong
    const correctAnswers = [0, 0]; // Q1: A (0.5), Q2: A (sin²+cos²=1)
    document.querySelectorAll('.question-card').forEach((card, qIndex) => {
        const options = card.querySelectorAll('.option-btn');
        options.forEach((btn, oIndex) => {
            // FIX: clone to remove old listeners from cached DOM
            const newBtn = btn.cloneNode(true);
            btn.parentNode.replaceChild(newBtn, btn);
        });
    });
    // re-query after clone
    document.querySelectorAll('.question-card').forEach((card, qIndex) => {
        const options = card.querySelectorAll('.option-btn');
        options.forEach((btn, oIndex) => {
            btn.addEventListener('click', function(e) {
                e.stopPropagation();
                // reset this question
                options.forEach(o => o.classList.remove('correct', 'incorrect', 'selected'));
                if (oIndex === correctAnswers[qIndex]) {
                    this.classList.add('correct');
                } else {
                    this.classList.add('incorrect');
                    // also highlight correct one in green
                    options[correctAnswers[qIndex]].classList.add('correct');
                }
            });
        });
    });
}
window.initSubjects = initSubjects;
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSubjects);
} else {
    initSubjects();
}
