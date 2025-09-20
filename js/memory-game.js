// Memory Game - File riêng để tránh lỗi syntax
window.startMemoryGame = function() {
    const gameContainer = document.getElementById('memory-game');
    if (!gameContainer) {
        alert('Vui lòng vào trang AI Games trước');
        return;
    }
    
    // Show game container
    gameContainer.style.display = 'block';
    const board = document.getElementById('memory-board');
    const stats = document.getElementById('memory-stats');
    const explanationsDiv = document.getElementById('memory-explanations');
    const explanationsContent = document.getElementById('explanations-content');
    
    // Memory cards with explanations
    const memoryCards = [
        { 
            id: 1, 
            text: "Nhận thức", 
            pair: "Phản ánh",
            explanation: "Nhận thức và Phản ánh là cặp khái niệm cốt lõi trong LLCT. Nhận thức là quá trình phản ánh thế giới khách quan vào đầu óc con người."
        },
        { 
            id: 2, 
            text: "Phản ánh", 
            pair: "Nhận thức",
            explanation: "Phản ánh là bản chất của nhận thức - mọi nhận thức đều là sự phản ánh của thế giới khách quan."
        },
        { 
            id: 3, 
            text: "Cảm tính", 
            pair: "Lý tính",
            explanation: "Cảm tính và Lý tính là hai cấp độ phát triển của nhận thức. Cảm tính là bước đầu, sau đó phát triển lên Lý tính."
        },
        { 
            id: 4, 
            text: "Lý tính", 
            pair: "Cảm tính",
            explanation: "Lý tính vượt lên trên cảm tính để đạt được hiểu biết sâu sắc về bản chất sự vật."
        },
        { 
            id: 5, 
            text: "Thực tiễn", 
            pair: "Kiểm nghiệm",
            explanation: "Thực tiễn là tiêu chuẩn duy nhất để kiểm nghiệm chân lý. Mọi lý thuyết đều phải được kiểm nghiệm qua thực tiễn."
        },
        { 
            id: 6, 
            text: "Kiểm nghiệm", 
            pair: "Thực tiễn",
            explanation: "Chỉ có thực tiễn mới có thể kiểm nghiệm được tính đúng sai của nhận thức."
        },
        { 
            id: 7, 
            text: "Biện chứng", 
            pair: "Mâu thuẫn",
            explanation: "Tư duy biện chứng nhìn nhận mâu thuẫn như động lực của sự phát triển."
        },
        { 
            id: 8, 
            text: "Mâu thuẫn", 
            pair: "Biện chứng",
            explanation: "Mâu thuẫn là nguồn gốc của sự vận động, phát triển. Tư duy biện chứng giúp ta nhận thức đúng về mâu thuẫn."
        }
    ];
    
    // Game state
    let gameState = {
        flipped: [],
        matched: [],
        moves: 0,
        startTime: Date.now(),
        explanations: []
    };
    
    // Update stats function
    function updateStats() {
        const elapsed = Math.floor((Date.now() - gameState.startTime) / 1000);
        stats.innerHTML = 'Thời gian: ' + elapsed + 's | Lượt chơi: ' + gameState.moves + ' | Đã ghép: ' + (gameState.matched.length / 2) + '/4 cặp';
    }
    
    // Add explanation function
    function addExplanation(card1, card2) {
        const cardData = memoryCards.find(c => c.id === parseInt(card1.dataset.cardId));
        if (!cardData) return;
        
        gameState.explanations.push({
            pair: card1.dataset.cardText + ' - ' + card2.dataset.cardText,
            explanation: cardData.explanation
        });
        
        // Update explanations display
        let explanationsHTML = '';
        gameState.explanations.forEach(function(exp, index) {
            explanationsHTML += '<div style="margin: 15px 0; padding: 12px; background: white; border-radius: 8px; border-left: 4px solid #27ae60;">';
            explanationsHTML += '<h5 style="color: #27ae60; margin-bottom: 8px;">🔗 ' + exp.pair + '</h5>';
            explanationsHTML += '<p style="line-height: 1.5; color: #2c3e50; font-size: 14px;">' + exp.explanation + '</p>';
            explanationsHTML += '</div>';
        });
        
        explanationsContent.innerHTML = explanationsHTML;
        explanationsDiv.style.display = 'block';
        
        // Scroll to explanation
        setTimeout(function() {
            explanationsDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 300);
    }
    
    // Shuffle cards
    const shuffledCards = memoryCards.slice().sort(function() { return Math.random() - 0.5; });
    
    // Create board
    board.innerHTML = '';
    board.style.cssText = 'display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; max-width: 400px; margin: 0 auto;';
    
    shuffledCards.forEach(function(card, index) {
        const cardElement = document.createElement('div');
        cardElement.style.cssText = 'background: linear-gradient(135deg, #3498db, #2980b9); border-radius: 8px; padding: 15px; text-align: center; cursor: pointer; transition: all 0.3s ease; user-select: none; min-height: 80px; display: flex; align-items: center; justify-content: center; font-weight: bold; color: white; font-size: 14px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);';
        
        cardElement.innerHTML = '<div>?</div>';
        cardElement.dataset.cardId = card.id;
        cardElement.dataset.cardText = card.text;
        cardElement.dataset.cardPair = card.pair;
        
        cardElement.addEventListener('click', function() {
            // Prevent multiple clicks
            if (gameState.flipped.length >= 2 || 
                gameState.flipped.indexOf(this) !== -1 ||
                gameState.matched.indexOf(card.id) !== -1 ||
                this.classList.contains('flipped')) {
                return;
            }
            
            // Flip card
            this.style.background = 'linear-gradient(135deg, #e74c3c, #c0392b)';
            this.innerHTML = '<div>' + card.text + '</div>';
            this.classList.add('flipped');
            this.style.transform = 'scale(1.05)';
            
            gameState.flipped.push(this);
            gameState.moves++;
            
            // Check for match when 2 cards are flipped
            if (gameState.flipped.length === 2) {
                setTimeout(function() {
                    const card1 = gameState.flipped[0];
                    const card2 = gameState.flipped[1];
                    const card1Text = card1.dataset.cardText;
                    const card1Pair = card1.dataset.cardPair;
                    const card2Text = card2.dataset.cardText;
                    
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
                        
                        // Show explanation
                        addExplanation(card1, card2);
                        
                        // Check if game complete
                        if (gameState.matched.length === memoryCards.length) {
                            setTimeout(function() {
                                const elapsed = Math.floor((Date.now() - gameState.startTime) / 1000);
                                let performance = elapsed < 45 && gameState.moves < 15 ? '🏆 Xuất sắc!' : 
                                                elapsed < 90 && gameState.moves < 25 ? '🎉 Rất tốt!' : '👍 Tốt lắm!';
                                
                                const resultDiv = document.getElementById('memory-result');
                                if (resultDiv) {
                                    resultDiv.innerHTML = '<div style="background: #d4edda; padding: 20px; border-radius: 12px; border: 2px solid #28a745; text-align: center; box-shadow: 0 5px 15px rgba(40, 167, 69, 0.3);"><h4 style="color: #155724; margin-bottom: 10px;">' + performance + '</h4><p style="color: #155724; margin-bottom: 15px;"><strong>Hoàn thành trong ' + elapsed + ' giây với ' + gameState.moves + ' lượt chơi!</strong></p><p style="color: #155724; margin-bottom: 15px; font-size: 14px;">🎓 Bạn đã học được ' + gameState.explanations.length + ' mối liên hệ quan trọng trong LLCT!</p><button onclick="window.startMemoryGame()" style="background: #28a745; color: white; border: none; padding: 12px 25px; border-radius: 8px; cursor: pointer; margin-top: 10px; font-weight: bold; box-shadow: 0 4px 8px rgba(40, 167, 69, 0.3);">🔄 Chơi lại để ôn tập</button></div>';
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
    });
    
    // Reset game
    explanationsDiv.style.display = 'none';
    explanationsContent.innerHTML = '';
    gameState.explanations = [];
    
    // Initial stats
    updateStats();
    
    // Update stats timer
    const statsInterval = setInterval(function() {
        if (gameState.matched.length === memoryCards.length) {
            clearInterval(statsInterval);
        } else {
            updateStats();
        }
    }, 1000);
    
    // Hide result
    const resultDiv = document.getElementById('memory-result');
    if (resultDiv) {
        resultDiv.style.display = 'none';
    }
};