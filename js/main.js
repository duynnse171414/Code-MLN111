// Main application - Clean version
class LyingFlatAnalysisApp {
    constructor() {
        this.isInitialized = false;
        this.init();
    }
    
    init() {
        console.log('App initializing...');
        this.isInitialized = true;
    }
}

// Memory Game - Clean implementation
window.startMemoryGame = function() {
    var gameContainer = document.getElementById('memory-game');
    if (!gameContainer) {
        alert('Vui lòng vào trang AI Games trước');
        return;
    }
    
    gameContainer.style.display = 'block';
    var board = document.getElementById('memory-board');
    var stats = document.getElementById('memory-stats');
    var explanationsDiv = document.getElementById('memory-explanations');
    var explanationsContent = document.getElementById('explanations-content');
    
    var memoryCards = [
        { id: 1, text: 'Nhận thức', pair: 'Phản ánh', explanation: 'Nhận thức và Phản ánh là cặp khái niệm cốt lõi trong LLCT. Nhận thức là quá trình phản ánh thế giới khách quan vào đầu óc con người.' },
        { id: 2, text: 'Phản ánh', pair: 'Nhận thức', explanation: 'Phản ánh là bản chất của nhận thức - mọi nhận thức đều là sự phản ánh của thế giới khách quan.' },
        { id: 3, text: 'Cảm tính', pair: 'Lý tính', explanation: 'Cảm tính và Lý tính là hai cấp độ phát triển của nhận thức. Cảm tính là bước đầu, sau đó phát triển lên Lý tính.' },
        { id: 4, text: 'Lý tính', pair: 'Cảm tính', explanation: 'Lý tính vượt lên trên cảm tính để đạt được hiểu biết sâu sắc về bản chất sự vật.' },
        { id: 5, text: 'Thực tiễn', pair: 'Kiểm nghiệm', explanation: 'Thực tiễn là tiêu chuẩn duy nhất để kiểm nghiệm chân lý. Mọi lý thuyết đều phải được kiểm nghiệm qua thực tiễn.' },
        { id: 6, text: 'Kiểm nghiệm', pair: 'Thực tiễn', explanation: 'Chỉ có thực tiễn mới có thể kiểm nghiệm được tính đúng sai của nhận thức.' },
        { id: 7, text: 'Biện chứng', pair: 'Mâu thuẫn', explanation: 'Tư duy biện chứng nhìn nhận mâu thuẫn như động lực của sự phát triển.' },
        { id: 8, text: 'Mâu thuẫn', pair: 'Biện chứng', explanation: 'Mâu thuẫn là nguồn gốc của sự vận động, phát triển. Tư duy biện chứng giúp ta nhận thức đúng về mâu thuẫn.' }
    ];
    
    var gameState = { 
        flipped: [], 
        matched: [], 
        moves: 0, 
        startTime: Date.now(), 
        explanations: [] 
    };
    
    function updateStats() {
        var elapsed = Math.floor((Date.now() - gameState.startTime) / 1000);
        stats.innerHTML = 'Thời gian: ' + elapsed + 's | Lượt chơi: ' + gameState.moves + ' | Đã ghép: ' + (gameState.matched.length / 2) + '/4 cặp';
    }
    
    function addExplanation(card1, card2) {
        var cardData = null;
        for (var i = 0; i < memoryCards.length; i++) {
            if (memoryCards[i].id === parseInt(card1.dataset.cardId)) {
                cardData = memoryCards[i];
                break;
            }
        }
        if (!cardData) return;
        
        gameState.explanations.push({
            pair: card1.dataset.cardText + ' - ' + card2.dataset.cardText,
            explanation: cardData.explanation
        });
        
        var explanationsHTML = '';
        for (var j = 0; j < gameState.explanations.length; j++) {
            var exp = gameState.explanations[j];
            explanationsHTML += '<div style="margin: 15px 0; padding: 12px; background: white; border-radius: 8px; border-left: 4px solid #27ae60;">';
            explanationsHTML += '<h5 style="color: #27ae60; margin-bottom: 8px;">🔗 ' + exp.pair + '</h5>';
            explanationsHTML += '<p style="line-height: 1.5; color: #2c3e50; font-size: 14px;">' + exp.explanation + '</p>';
            explanationsHTML += '</div>';
        }
        
        explanationsContent.innerHTML = explanationsHTML;
        explanationsDiv.style.display = 'block';
        
        setTimeout(function() {
            explanationsDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 300);
    }
    
    var shuffledCards = memoryCards.slice().sort(function() { return Math.random() - 0.5; });
    
    board.innerHTML = '';
    board.style.cssText = 'display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; max-width: 400px; margin: 0 auto;';
    
    for (var k = 0; k < shuffledCards.length; k++) {
        var card = shuffledCards[k];
        var cardElement = document.createElement('div');
        cardElement.style.cssText = 'background: linear-gradient(135deg, #3498db, #2980b9); border-radius: 8px; padding: 15px; text-align: center; cursor: pointer; transition: all 0.3s ease; user-select: none; min-height: 80px; display: flex; align-items: center; justify-content: center; font-weight: bold; color: white; font-size: 14px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);';
        
        cardElement.innerHTML = '<div>?</div>';
        cardElement.dataset.cardId = card.id;
        cardElement.dataset.cardText = card.text;
        cardElement.dataset.cardPair = card.pair;
        
        cardElement.addEventListener('click', function() {
            if (gameState.flipped.length >= 2 || gameState.flipped.indexOf(this) !== -1 || 
                gameState.matched.indexOf(parseInt(this.dataset.cardId)) !== -1 || this.classList.contains('flipped')) {
                return;
            }
            
            this.style.background = 'linear-gradient(135deg, #e74c3c, #c0392b)';
            this.innerHTML = '<div>' + this.dataset.cardText + '</div>';
            this.classList.add('flipped');
            this.style.transform = 'scale(1.05)';
            
            gameState.flipped.push(this);
            gameState.moves++;
            
            if (gameState.flipped.length === 2) {
                setTimeout(function() {
                    var card1 = gameState.flipped[0];
                    var card2 = gameState.flipped[1];
                    var card1Text = card1.dataset.cardText;
                    var card1Pair = card1.dataset.cardPair;
                    var card2Text = card2.dataset.cardText;
                    
                    if (card1Pair === card2Text || card2.dataset.cardPair === card1Text) {
                        // Match found
                        card1.style.background = 'linear-gradient(135deg, #27ae60, #229954)';
                        card2.style.background = 'linear-gradient(135deg, #27ae60, #229954)';
                        card1.style.pointerEvents = 'none';
                        card2.style.pointerEvents = 'none';
                        card1.style.transform = 'scale(1)';
                        card2.style.transform = 'scale(1)';
                        card1.style.boxShadow = '0 0 20px #27ae60';
                        card2.style.boxShadow = '0 0 20px #27ae60';
                        
                        gameState.matched.push(parseInt(card1.dataset.cardId), parseInt(card2.dataset.cardId));
                        
                        addExplanation(card1, card2);
                        
                        // Check if game complete
                        if (gameState.matched.length === memoryCards.length) {
                            setTimeout(function() {
                                var elapsed = Math.floor((Date.now() - gameState.startTime) / 1000);
                                var performance = elapsed < 45 && gameState.moves < 15 ? 'Xuất sắc!' : 
                                                elapsed < 90 && gameState.moves < 25 ? 'Rất tốt!' : 'Tốt lắm!';
                                
                                var resultDiv = document.getElementById('memory-result');
                                if (resultDiv) {
                                    var resultHTML = '<div style="background: #d4edda; padding: 20px; border-radius: 12px; border: 2px solid #28a745; text-align: center;">';
                                    resultHTML += '<h4 style="color: #155724;">' + performance + '</h4>';
                                    resultHTML += '<p style="color: #155724;"><strong>Hoàn thành trong ' + elapsed + ' giây với ' + gameState.moves + ' lượt chơi!</strong></p>';
                                    resultHTML += '<p style="color: #155724; font-size: 14px;">Bạn đã học được ' + gameState.explanations.length + ' mối liên hệ quan trọng trong LLCT!</p>';
                                    resultHTML += '<button onclick="window.startMemoryGame()" style="background: #28a745; color: white; border: none; padding: 12px 25px; border-radius: 8px; cursor: pointer; margin-top: 10px; font-weight: bold;">Chơi lại để ôn tập</button>';
                                    resultHTML += '</div>';
                                    
                                    resultDiv.innerHTML = resultHTML;
                                    resultDiv.style.display = 'block';
                                    
                                    setTimeout(function() {
                                        resultDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                    }, 500);
                                }
                            }, 1000);
                        }
                    } else {
                        // No match - flip back
                        setTimeout(function() {
                            card1.style.background = 'linear-gradient(135deg, #3498db, #2980b9)';
                            card2.style.background = 'linear-gradient(135deg, #3498db, #2980b9)';
                            card1.innerHTML = '<div>?</div>';
                            card2.innerHTML = '<div>?</div>';
                            card1.classList.remove('flipped');
                            card2.classList.remove('flipped');
                            card1.style.transform = 'scale(1)';
                            card2.style.transform = 'scale(1)';
                        }, 1000);
                    }
                    
                    gameState.flipped = [];
                    updateStats();
                }, 1200);
            }
            
            updateStats();
        });
        
        board.appendChild(cardElement);
    }
    
    // Reset explanations
    explanationsDiv.style.display = 'none';
    explanationsContent.innerHTML = '';
    gameState.explanations = [];
    
    updateStats();
    
    var statsInterval = setInterval(function() {
        if (gameState.matched.length === memoryCards.length) {
            clearInterval(statsInterval);
        } else {
            updateStats();
        }
    }, 1000);
    
    var resultDiv = document.getElementById('memory-result');
    if (resultDiv) {
        resultDiv.style.display = 'none';
    }
};

// Personality Test
window.startPersonalityTest = function() {
    var container = document.getElementById('personality-test');
    if (!container) {
        alert('Vui lòng vào trang AI Games trước');
        return;
    }
    
    container.style.display = 'block';
    var testHTML = '<div style="text-align: center; padding: 20px; background: #f8f9fa; border-radius: 10px;">';
    testHTML += '<h4>Trắc nghiệm tính cách học tập</h4>';
    testHTML += '<p>Khi gặp vấn đề khó khăn, bạn thường:</p>';
    testHTML += '<div style="margin: 15px 0;">';
    testHTML += '<button onclick="window.showPersonalityResult(\'analytical\')" style="display: block; width: 100%; padding: 10px; margin: 5px 0; background: white; border: 1px solid #ddd; border-radius: 5px; cursor: pointer;">Phân tích cẩn thận trước khi hành động</button>';
    testHTML += '<button onclick="window.showPersonalityResult(\'practical\')" style="display: block; width: 100%; padding: 10px; margin: 5px 0; background: white; border: 1px solid #ddd; border-radius: 5px; cursor: pointer;">Hành động ngay lập tức dựa trên kinh nghiệm</button>';
    testHTML += '<button onclick="window.showPersonalityResult(\'emotional\')" style="display: block; width: 100%; padding: 10px; margin: 5px 0; background: white; border: 1px solid #ddd; border-radius: 5px; cursor: pointer;">Cảm thấy lo lắng và muốn tránh né</button>';
    testHTML += '</div></div>';
    
    container.innerHTML = testHTML;
};

window.showPersonalityResult = function(type) {
    var results = {
        analytical: { 
            title: 'Nhà Phân Tích', 
            desc: 'Bạn có xu hướng tiếp cận vấn đề một cách logic và có hệ thống. Phù hợp với nhận thức lý tính trong LLCT.',
            advice: 'Hãy cân bằng giữa lý thuyết và thực tiễn, đừng quá máy móc trong tư duy.',
            llct: 'Bạn dễ dàng nắm bắt quy luật từ cảm tính lên lý tính trong LLCT.'
        },
        practical: { 
            title: 'Nhà Thực Tiễn', 
            desc: 'Bạn tin vào kinh nghiệm thực tế và thích áp dụng kiến thức vào cuộc sống. Phù hợp với vai trò của thực tiễn trong LLCT.',
            advice: 'Đừng bỏ qua lý thuyết, nó sẽ giúp bạn hiểu sâu hơn về thực tiễn.',
            llct: 'Bạn hiểu rõ vai trò của thực tiễn là tiêu chuẩn kiểm nghiệm chân lý.'
        },
        emotional: { 
            title: 'Nhà Cảm Thụ', 
            desc: 'Bạn học tập tốt qua cảm xúc và trải nghiệm cá nhân. Gần với nhận thức cảm tính trong LLCT.',
            advice: 'Cần phát triển thêm tư duy lý tính để bổ sung cho cảm tính.',
            llct: 'Bạn cần chú ý phát triển từ cảm tính lên lý tính theo LLCT.'
        }
    };
    
    var result = results[type] || results.analytical;
    var container = document.getElementById('personality-test');
    
    var resultHTML = '<div style="text-align: center; padding: 25px; background: #e8f5e8; border-radius: 12px; border: 2px solid #27ae60; box-shadow: 0 5px 15px rgba(39, 174, 96, 0.2);">';
    resultHTML += '<h3 style="color: #155724; margin-bottom: 15px;">' + result.title + '</h3>';
    resultHTML += '<div style="text-align: left; margin: 20px 0;">';
    resultHTML += '<div style="background: white; padding: 12px; border-radius: 8px; margin: 10px 0; border-left: 4px solid #27ae60;"><strong>Mô tả:</strong> ' + result.desc + '</div>';
    resultHTML += '<div style="background: white; padding: 12px; border-radius: 8px; margin: 10px 0; border-left: 4px solid #f39c12;"><strong>Lời khuyên:</strong> ' + result.advice + '</div>';
    resultHTML += '<div style="background: white; padding: 12px; border-radius: 8px; margin: 10px 0; border-left: 4px solid #3498db;"><strong>Liên hệ với LLCT:</strong> ' + result.llct + '</div>';
    resultHTML += '</div>';
    resultHTML += '<button onclick="window.startPersonalityTest()" style="margin-top: 15px; padding: 12px 25px; background: #27ae60; color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: bold; box-shadow: 0 4px 8px rgba(39, 174, 96, 0.3);">Làm lại test</button>';
    resultHTML += '</div>';
    
    container.innerHTML = resultHTML;
};

// Global function to access AI Games  
window.goToAIGames = function() {
    var aiGamesBtn = null;
    var buttons = document.querySelectorAll('.nav-btn');
    for (var i = 0; i < buttons.length; i++) {
        if (buttons[i].textContent.indexOf('AI Games') !== -1) {
            aiGamesBtn = buttons[i];
            break;
        }
    }
    
    if (aiGamesBtn) {
        showSection('aiFeatures', aiGamesBtn);
    } else {
        showSection('aiFeatures', document.querySelector('.nav-btn'));
    }
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

// Initialize application when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    window.app = new LyingFlatAnalysisApp();
});

// Expose global functions for backward compatibility
window.showSection = showSection;
window.selectAnswer = selectAnswer;
window.resetQuiz = resetQuiz;