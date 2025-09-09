// Quiz functionality
let quizScore = 0;
let quizAnswered = 0;
let userAnswers = [];

function initializeQuiz() {
    quizScore = 0;
    quizAnswered = 0;
    userAnswers = [];
    
    // Reset quiz result display
    const quizResult = document.getElementById('quizResult');
    if (quizResult) {
        quizResult.style.display = 'none';
    }
}

function selectAnswer(element, isCorrect, questionIndex) {
    // Prevent multiple selections for same question
    const container = element.parentNode;
    if (container.classList.contains('answered')) return;
    
    container.classList.add('answered');
    quizAnswered++;
    userAnswers[questionIndex] = isCorrect;
    
    // Show correct/incorrect styling with animation
    const options = container.querySelectorAll('.quiz-option');
    options.forEach((option, index) => {
        const isThisCorrect = index === quizData[questionIndex].correct;
        if (isThisCorrect) {
            option.classList.add('correct');
            option.classList.add('bounce');
        }
        if (option === element && !isCorrect) {
            option.classList.add('incorrect');
            option.classList.add('shake');
        }
        
        // Disable further clicking
        option.style.pointerEvents = 'none';
    });
    
    if (isCorrect) {
        quizScore++;
        // Add celebration effect
        createCelebrationEffect(element);
    }
    
    // Show result when all questions answered
    if (quizAnswered === 4) {
        setTimeout(showQuizResult, 1000);
    }
}

function showQuizResult() {
    const percentage = (quizScore / 4) * 100;
    let feedback = '';
    let emoji = '';
    
    if (percentage >= 80) {
        feedback = 'Xuất sắc! Bạn đã hiểu rất rõ về LLCT và ứng dụng vào phân tích thực tiễn.';
        emoji = '🎉';
    } else if (percentage >= 60) {
        feedback = 'Khá tốt! Bạn cần ôn lại một số kiến thức về lý thuyết LLCT.';
        emoji = '👍';
    } else if (percentage >= 40) {
        feedback = 'Trung bình! Bạn nên đọc lại nội dung lý thuyết và ví dụ thực tiễn.';
        emoji = '📚';
    } else {
        feedback = 'Cần cố gắng hơn! Hãy học kỹ lại các nguyên lý cơ bản của LLCT.';
        emoji = '💪';
    }
    
    document.getElementById('scoreText').textContent = `Điểm: ${quizScore}/4 (${percentage}%)`;
    document.getElementById('feedback').textContent = feedback;
    
    const quizResult = document.getElementById('quizResult');
    quizResult.style.display = 'block';
    quizResult.classList.add('scale-in');
    
    // Add emoji animation
    const emojiElement = document.createElement('span');
    emojiElement.textContent = emoji;
    emojiElement.style.fontSize = '2em';
    emojiElement.style.marginRight = '10px';
    emojiElement.classList.add('pulse');
    
    const scoreText = document.getElementById('scoreText');
    scoreText.insertBefore(emojiElement, scoreText.firstChild);
    
    // Save quiz results
    saveQuizResults();
    
    // Show detailed analysis
    showDetailedAnalysis();
}

function resetQuiz() {
    // Reset all quiz containers
    document.querySelectorAll('.quiz-container').forEach(container => {
        container.classList.remove('answered');
        
        container.querySelectorAll('.quiz-option').forEach(option => {
            option.classList.remove('correct', 'incorrect', 'bounce', 'shake');
            option.style.pointerEvents = 'auto';
        });
    });
    
    // Hide result
    const quizResult = document.getElementById('quizResult');
    quizResult.style.display = 'none';
    quizResult.classList.remove('scale-in');
    
    // Reset variables
    initializeQuiz();
    
    // Scroll to first question
    document.querySelector('.quiz-container').scrollIntoView({ 
        behavior: 'smooth' 
    });
}

function createCelebrationEffect(element) {
    // Create floating particles for correct answers
    for (let i = 0; i < 5; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = '8px';
        particle.style.height = '8px';
        particle.style.background = '#28a745';
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '1000';
        
        const rect = element.getBoundingClientRect();
        particle.style.left = (rect.left + rect.width / 2) + 'px';
        particle.style.top = (rect.top + rect.height / 2) + 'px';
        
        document.body.appendChild(particle);
        
        // Animate particle
        const angle = (i / 5) * 360;
        const distance = 50;
        const x = Math.cos(angle * Math.PI / 180) * distance;
        const y = Math.sin(angle * Math.PI / 180) * distance;
        
        particle.animate([
            { transform: 'translate(0, 0) scale(1)', opacity: 1 },
            { transform: `translate(${x}px, ${y}px) scale(0)`, opacity: 0 }
        ], {
            duration: 800,
            easing: 'ease-out'
        }).onfinish = () => {
            document.body.removeChild(particle);
        };
    }
}

function showDetailedAnalysis() {
    let analysisHTML = '<div style="margin-top: 20px; padding: 15px; background: #f8f9fa; border-radius: 8px;">';
    analysisHTML += '<h4>📊 Phân tích chi tiết:</h4>';
    
    quizData.forEach((quiz, index) => {
        const userCorrect = userAnswers[index];
        const status = userCorrect ? '✅' : '❌';
        const statusClass = userCorrect ? 'correct' : 'incorrect';
        
        analysisHTML += `
            <div style="margin: 10px 0; padding: 8px; border-left: 3px solid ${userCorrect ? '#28a745' : '#dc3545'};">
                <strong>${status} Câu ${index + 1}:</strong> 
                <span style="color: ${userCorrect ? '#28a745' : '#dc3545'}">${userCorrect ? 'Đúng' : 'Sai'}</span>
        `;
        
        if (!userCorrect) {
            analysisHTML += `<br><small style="color: #666;">Đáp án đúng: ${quiz.options[quiz.correct]}</small>`;
        }
        
        analysisHTML += '</div>';
    });
    
    analysisHTML += '</div>';
    
    document.getElementById('quizResult').innerHTML += analysisHTML;
}

function saveQuizResults() {
    const results = {
        score: quizScore,
        total: 4,
        percentage: (quizScore / 4) * 100,
        answers: userAnswers,
        timestamp: new Date().toISOString()
    };
    
    // Note: Using memory storage instead of localStorage for Claude.ai compatibility
    window.quizResults = window.quizResults || [];
    window.quizResults.push(results);
}

function getQuizStatistics() {
    const results = window.quizResults || [];
    if (results.length === 0) return null;
    
    const totalAttempts = results.length;
    const bestScore = Math.max(...results.map(r => r.percentage));
    const averageScore = results.reduce((sum, r) => sum + r.percentage, 0) / totalAttempts;
    const latestScore = results[results.length - 1].percentage;
    
    return {
        totalAttempts,
        bestScore: bestScore.toFixed(1),
        averageScore: averageScore.toFixed(1),
        latestScore: latestScore.toFixed(1),
        improvement: totalAttempts > 1 ? (latestScore - results[results.length - 2].percentage).toFixed(1) : 0
    };
}

// Auto-save quiz progress
function saveQuizProgress() {
    const progress = {
        quizScore,
        quizAnswered,
        userAnswers: [...userAnswers],
        timestamp: new Date().toISOString()
    };
    
    // Note: Using memory storage instead of sessionStorage for Claude.ai compatibility
    window.quizProgress = progress;
}

function loadQuizProgress() {
    const progress = window.quizProgress;
    if (progress && currentSection === 'quiz') {
        quizScore = progress.quizScore;
        quizAnswered = progress.quizAnswered;
        userAnswers = [...progress.userAnswers];
        
        // Restore quiz state visually
        restoreQuizState();
    }
}

function restoreQuizState() {
    document.querySelectorAll('.quiz-container').forEach((container, index) => {
        if (index < userAnswers.length && userAnswers[index] !== undefined) {
            container.classList.add('answered');
            
            const options = container.querySelectorAll('.quiz-option');
            options.forEach((option, optionIndex) => {
                const isThisCorrect = optionIndex === quizData[index].correct;
                if (isThisCorrect) {
                    option.classList.add('correct');
                }
                option.style.pointerEvents = 'none';
            });
        }
    });
    
    if (quizAnswered === 4) {
        showQuizResult();
    }
}