// Quiz functionality với AI tạo câu hỏi ngẫu nhiên
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
        // Fix: sử dụng currentQuizData thống nhất
        const isThisCorrect = index === currentQuizData[questionIndex].correct;
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
    
    // Show explanation
    const explanation = container.querySelector('.quiz-explanation');
    if (explanation) {
        explanation.style.display = 'block';
        explanation.classList.add('scale-in');
    }
    
    if (isCorrect) {
        quizScore++;
        // Add celebration effect
        createCelebrationEffect(element);
    }
    
    // Show result when all questions answered
    if (quizAnswered === 10) {
        setTimeout(showQuizResult, 1500);
    }
    
    // Auto scroll to next question
    if (quizAnswered < 10) {
        const nextContainer = document.querySelector(`[data-question="${questionIndex + 1}"]`);
        if (nextContainer) {
            setTimeout(() => {
                nextContainer.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'center' 
                });
            }, 1000);
        }
    }
}

function showQuizResult() {
    const percentage = (quizScore / 10) * 100;
    let feedback = '';
    let emoji = '';
    let level = '';
    
    if (percentage >= 90) {
        feedback = 'Xuất sắc! Bạn đã nắm vững rất tốt lý thuyết LLCT và ứng dụng vào phân tích thực tiễn.';
        emoji = '🏆';
        level = 'XUẤT SẮC';
    } else if (percentage >= 80) {
        feedback = 'Rất tốt! Bạn đã hiểu khá rõ về LLCT, cần củng cố thêm một số kiến thức.';
        emoji = '🎉';
        level = 'GIỎI';
    } else if (percentage >= 70) {
        feedback = 'Khá! Bạn cần ôn lại một số kiến thức về lý thuyết LLCT.';
        emoji = '👍';
        level = 'KHÁ';
    } else if (percentage >= 60) {
        feedback = 'Trung bình khá! Bạn nên đọc lại nội dung lý thuyết và ví dụ thực tiễn.';
        emoji = '📚';
        level = 'TRUNG BÌNH KHÁ';
    } else if (percentage >= 50) {
        feedback = 'Trung bình! Bạn cần học kỹ lại các nguyên lý cơ bản của LLCT.';
        emoji = '💪';
        level = 'TRUNG BÌNH';
    } else {
        feedback = 'Cần cố gắng nhiều hơn! Hãy đọc kỹ lại toàn bộ nội dung và làm lại quiz.';
        emoji = '📖';
        level = 'CẦN CỐ GẮNG';
    }
    
    document.getElementById('scoreText').innerHTML = `
        ${emoji} <strong>Điểm: ${quizScore}/10 (${percentage}%)</strong><br>
        <span style="color: #007bff; font-size: 1.2em;">${level}</span>
    `;
    document.getElementById('feedback').textContent = feedback;
    
    const quizResult = document.getElementById('quizResult');
    quizResult.style.display = 'block';
    quizResult.classList.add('scale-in');
    
    // Save quiz results
    saveQuizResults();
    
    // Show detailed analysis
    showDetailedAnalysis();
    
    // Scroll to results
    setTimeout(() => {
        quizResult.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
        });
    }, 500);
}

function resetQuiz() {
    // Reset all quiz containers
    document.querySelectorAll('.quiz-container').forEach(container => {
        container.classList.remove('answered');
        
        container.querySelectorAll('.quiz-option').forEach(option => {
            option.classList.remove('correct', 'incorrect', 'bounce', 'shake');
            option.style.pointerEvents = 'auto';
        });
        
        // Hide explanations
        const explanation = container.querySelector('.quiz-explanation');
        if (explanation) {
            explanation.style.display = 'none';
            explanation.classList.remove('scale-in');
        }
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
    
    showNotification('🔄 Quiz đã được reset!', 'info');
}

function showDetailedAnalysis() {
    let analysisHTML = '<div style="margin-top: 20px; padding: 15px; background: #f8f9fa; border-radius: 8px;">';
    analysisHTML += '<h4>📊 Phân tích chi tiết:</h4>';
    
    let correctCount = 0;
    let incorrectQuestions = [];
    
    currentQuizData.forEach((quiz, index) => {
        const userCorrect = userAnswers[index];
        const status = userCorrect ? '✅' : '❌';
        
        if (userCorrect) {
            correctCount++;
        } else {
            incorrectQuestions.push(index + 1);
        }
        
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
    
    // Add performance summary
    analysisHTML += `
        <div style="margin-top: 15px; padding: 10px; background: white; border-radius: 5px; border: 1px solid #dee2e6;">
            <h5>📈 Tổng kết:</h5>
            <p>• Số câu đúng: <strong style="color: #28a745;">${correctCount}/10</strong></p>
            <p>• Số câu sai: <strong style="color: #dc3545;">${10 - correctCount}/10</strong></p>
            <p>• Tỷ lệ chính xác: <strong>${((correctCount/10)*100).toFixed(1)}%</strong></p>
        </div>
    `;
    
    if (incorrectQuestions.length > 0) {
        analysisHTML += `
            <div style="margin-top: 10px; padding: 10px; background: #fff3cd; border-radius: 5px; border: 1px solid #ffeaa7;">
                <h6>💡 Gợi ý cải thiện:</h6>
                <p>Bạn nên xem lại các câu: <strong>${incorrectQuestions.join(', ')}</strong></p>
            </div>
        `;
    }
    
    analysisHTML += '</div>';
    
    document.getElementById('quizResult').innerHTML += analysisHTML;
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

function saveQuizResults() {
    const results = {
        score: quizScore,
        total: 10,
        percentage: (quizScore / 10) * 100,
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
                const isThisCorrect = optionIndex === currentQuizData[index].correct;
                if (isThisCorrect) {
                    option.classList.add('correct');
                }
                option.style.pointerEvents = 'none';
            });
        }
    });
    
    if (quizAnswered === 10) {
        showQuizResult();
    }
}

// Utility function to show notifications
function showNotification(message, type = 'info') {
    // Create notification element if it doesn't exist
    let notification = document.getElementById('notification');
    if (!notification) {
        notification = document.createElement('div');
        notification.id = 'notification';
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 8px;
            color: white;
            font-weight: 500;
            z-index: 10000;
            transform: translateX(400px);
            transition: transform 0.3s ease;
        `;
        document.body.appendChild(notification);
    }
    
    // Set notification style based on type
    const colors = {
        info: '#007bff',
        success: '#28a745',
        warning: '#ffc107',
        error: '#dc3545'
    };
    
    notification.style.background = colors[type] || colors.info;
    notification.textContent = message;
    
    // Show notification
    notification.style.transform = 'translateX(0)';
    
    // Hide after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
    }, 3000);
}