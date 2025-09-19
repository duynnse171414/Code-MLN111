// AI Games and Interactive Features

// Ensure functions are available globally
if (typeof window !== 'undefined') {
    
// AI Chatbot functionality
const chatResponses = {
    "llct": [
        "LLCT (Lý luận Nhận thức) nghiên cứu về quá trình nhận thức thế giới của con người. Bạn muốn tìm hiểu khía cạnh nào cụ thể?",
        "LLCT bao gồm: nguyên lý phản ánh, quy luật cảm tính-lý tính, vai trò thực tiễn, và tính biện chứng của nhận thức."
    ],
    "nằm yên": [
        "Trào lưu 'nằm yên mặc kệ đời' xuất phát từ áp lực xã hội và kinh tế. Theo LLCT, đây là phản ánh tiêu cực cần được khắc phục.",
        "Thay vì 'nằm yên', bạn nên 'hành động thông minh' - có kế hoạch và từng bước cải thiện cuộc sống."
    ],
    "nhận thức": [
        "Nhận thức là quá trình phản ánh thế giới khách quan vào đầu óc con người. Có 2 cấp độ: cảm tính và lý tính.",
        "Nhận thức phát triển từ thực tiễn, qua thực tiễn và để phục vụ thực tiễn."
    ],
    "thực tiễn": [
        "Thực tiễn là hoạt động vật chất có mục đích của con người để cải tạo thế giới. Đây là cơ sở và động lực của nhận thức.",
        "Thực tiễn vừa là nguồn gốc, vừa là động lực và tiêu chuẩn kiểm nghiệm chân lý."
    ],
    "biện chứng": [
        "Phương pháp biện chứng xem xét sự vật trong mối liên hệ, vận động, phát triển và mâu thuẫn.",
        "Ba quy luật biện chứng: đối lập thống nhất, lượng-chất, phủ định của phủ định."
    ]
};

function sendMessage() {
    const input = document.getElementById('chat-input');
    const message = input.value.trim();
    if (!message) return;

    const chatMessages = document.getElementById('chat-messages');
    
    // Add user message
    addChatMessage(chatMessages, message, 'user');
    
    // Generate AI response
    setTimeout(() => {
        const response = generateChatResponse(message);
        addChatMessage(chatMessages, response, 'ai');
    }, 500);
    
    input.value = '';
    input.focus();
}

function addChatMessage(container, message, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.style.cssText = `
        margin: 10px 0;
        padding: 10px 15px;
        border-radius: 10px;
        max-width: 80%;
        word-wrap: break-word;
        animation: fadeInUp 0.3s ease;
        ${sender === 'user' 
            ? 'background: #3498db; color: white; margin-left: auto; text-align: right;' 
            : 'background: #f1f3f4; color: #333; margin-right: auto;'
        }
    `;
    
    if (sender === 'ai') {
        messageDiv.innerHTML = `<strong>🤖 AI Tutor:</strong> ${message}`;
    } else {
        messageDiv.innerHTML = `<strong>Bạn:</strong> ${message}`;
    }
    
    container.appendChild(messageDiv);
    container.scrollTop = container.scrollHeight;
}

function generateChatResponse(message) {
    const lowerMessage = message.toLowerCase();
    
    for (const [key, responses] of Object.entries(chatResponses)) {
        if (lowerMessage.includes(key)) {
            return responses[Math.floor(Math.random() * responses.length)];
        }
    }
    
    // Default responses
    const defaultResponses = [
        "Câu hỏi thú vị! Theo LLCT, mọi vấn đề đều cần được nhìn nhận một cách biện chứng và toàn diện.",
        "Hãy cùng phân tích vấn đề này qua góc độ nhận thức duy vật. Bạn có thể chia sẻ thêm chi tiết không?",
        "Đây là chủ đề rất hay! LLCT giúp chúng ta hiểu sâu hơn về bản chất của vấn đề này.",
        "Tôi khuyến khích bạn áp dụng quy luật từ cảm tính lên lý tính để phân tích vấn đề này sâu hơn."
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
}

// Memory Game
const memoryCards = [
    { id: 1, text: "Nhận thức", pair: "Phản ánh" },
    { id: 2, text: "Phản ánh", pair: "Nhận thức" },
    { id: 3, text: "Cảm tính", pair: "Lý tính" },
    { id: 4, text: "Lý tính", pair: "Cảm tính" },
    { id: 5, text: "Thực tiễn", pair: "Kiểm nghiệm" },
    { id: 6, text: "Kiểm nghiệm", pair: "Thực tiễn" },
    { id: 7, text: "Biện chứng", pair: "Mâu thuẫn" },
    { id: 8, text: "Mâu thuẫn", pair: "Biện chứng" }
];

let memoryGameState = {
    flipped: [],
    matched: [],
    moves: 0,
    startTime: null
};

function startMemoryGame() {
    const gameContainer = document.getElementById('memory-game');
    const board = document.getElementById('memory-board');
    const stats = document.getElementById('memory-stats');
    
    // Reset game state
    memoryGameState = { flipped: [], matched: [], moves: 0, startTime: Date.now() };
    
    // Shuffle cards
    const shuffledCards = [...memoryCards].sort(() => Math.random() - 0.5);
    
    // Create board
    board.innerHTML = '';
    shuffledCards.forEach((card, index) => {
        const cardElement = document.createElement('div');
        cardElement.style.cssText = `
            background: linear-gradient(135deg, #3498db, #2980b9);
            border-radius: 8px;
            padding: 15px;
            text-align: center;
            cursor: pointer;
            transition: all 0.3s ease;
            user-select: none;
            min-height: 80px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            color: white;
        `;
        
        cardElement.innerHTML = '<div style="transform: rotateY(180deg);">?</div>';
        cardElement.dataset.cardId = card.id;
        cardElement.dataset.cardIndex = index;
        cardElement.addEventListener('click', () => flipCard(cardElement, card));
        
        board.appendChild(cardElement);
    });
    
    gameContainer.style.display = 'block';
    updateMemoryStats();
}

function flipCard(element, card) {
    if (memoryGameState.flipped.length >= 2 || 
        memoryGameState.flipped.includes(element) ||
        memoryGameState.matched.includes(card.id)) {
        return;
    }
    
    // Flip animation
    element.style.transform = 'rotateY(180deg)';
    setTimeout(() => {
        element.innerHTML = `<div>${card.text}</div>`;
        element.style.background = 'linear-gradient(135deg, #e74c3c, #c0392b)';
        element.style.transform = 'rotateY(0deg)';
    }, 150);
    
    memoryGameState.flipped.push(element);
    memoryGameState.moves++;
    
    if (memoryGameState.flipped.length === 2) {
        setTimeout(checkMemoryMatch, 800);
    }
    
    updateMemoryStats();
}

function checkMemoryMatch() {
    const [card1, card2] = memoryGameState.flipped;
    const card1Data = memoryCards.find(c => c.id == card1.dataset.cardId);
    const card2Data = memoryCards.find(c => c.id == card2.dataset.cardId);
    
    if (card1Data.pair === card2Data.text) {
        // Match found
        card1.style.background = 'linear-gradient(135deg, #27ae60, #229954)';
        card2.style.background = 'linear-gradient(135deg, #27ae60, #229954)';
        card1.style.pointerEvents = 'none';
        card2.style.pointerEvents = 'none';
        
        memoryGameState.matched.push(card1Data.id, card2Data.id);
        
        // Check if game complete
        if (memoryGameState.matched.length === memoryCards.length) {
            setTimeout(endMemoryGame, 500);
        }
    } else {
        // No match - flip back
        setTimeout(() => {
            [card1, card2].forEach(card => {
                card.style.transform = 'rotateY(180deg)';
                setTimeout(() => {
                    card.innerHTML = '<div style="transform: rotateY(180deg);">?</div>';
                    card.style.background = 'linear-gradient(135deg, #3498db, #2980b9)';
                    card.style.transform = 'rotateY(0deg)';
                }, 150);
            });
        }, 300);
    }
    
    memoryGameState.flipped = [];
}

function updateMemoryStats() {
    const stats = document.getElementById('memory-stats');
    const elapsed = memoryGameState.startTime ? 
        Math.floor((Date.now() - memoryGameState.startTime) / 1000) : 0;
    
    stats.innerHTML = `
        ⏱️ Thời gian: ${elapsed}s | 
        🎯 Lượt chơi: ${memoryGameState.moves} | 
        ✅ Đã ghép: ${memoryGameState.matched.length / 2}/4 cặp
    `;
}

function endMemoryGame() {
    const resultDiv = document.getElementById('memory-result');
    const elapsed = Math.floor((Date.now() - memoryGameState.startTime) / 1000);
    
    let performance = '';
    if (elapsed < 30 && memoryGameState.moves < 12) {
        performance = '🏆 Xuất sắc!';
    } else if (elapsed < 60 && memoryGameState.moves < 20) {
        performance = '🎉 Rất tốt!';
    } else {
        performance = '👍 Tốt lắm!';
    }
    
    resultDiv.innerHTML = `
        <div style="background: #d4edda; padding: 15px; border-radius: 8px; border: 1px solid #c3e6cb;">
            <h4>${performance}</h4>
            <p>Hoàn thành trong ${elapsed} giây với ${memoryGameState.moves} lượt chơi!</p>
            <button onclick="startMemoryGame()" style="background: #28a745; color: white; border: none; padding: 8px 15px; border-radius: 5px; cursor: pointer; margin-top: 10px;">
                🔄 Chơi lại
            </button>
        </div>
    `;
    resultDiv.style.display = 'block';
}

// Word Cloud Generator
const llctKeywords = [
    { word: "Nhận thức", weight: 10, color: "#3498db" },
    { word: "Phản ánh", weight: 9, color: "#e74c3c" },
    { word: "Thực tiễn", weight: 8, color: "#27ae60" },
    { word: "Biện chứng", weight: 8, color: "#9b59b6" },
    { word: "Cảm tính", weight: 7, color: "#f39c12" },
    { word: "Lý tính", weight: 7, color: "#e67e22" },
    { word: "Mâu thuẫn", weight: 6, color: "#34495e" },
    { word: "Phát triển", weight: 6, color: "#16a085" },
    { word: "Khách quan", weight: 5, color: "#2980b9" },
    { word: "Chủ quan", weight: 4, color: "#8e44ad" },
    { word: "Chân lý", weight: 5, color: "#d35400" },
    { word: "Kiểm nghiệm", weight: 4, color: "#c0392b" },
    { word: "Nằm yên", weight: 6, color: "#7f8c8d" },
    { word: "Tích cực", weight: 5, color: "#27ae60" },
    { word: "Tiêu cực", weight: 4, color: "#e74c3c" }
];

function generateWordCloud() {
    const container = document.getElementById('wordcloud-container');
    container.innerHTML = '<div style="color: #3498db; font-size: 18px;">🤖 AI đang tạo Word Cloud...</div>';
    
    setTimeout(() => {
        container.innerHTML = '';
        
        // Shuffle and animate words
        const shuffled = [...llctKeywords].sort(() => Math.random() - 0.5);
        
        shuffled.forEach((item, index) => {
            setTimeout(() => {
                const wordElement = document.createElement('span');
                const fontSize = Math.max(12, item.weight * 2);
                
                wordElement.style.cssText = `
                    font-size: ${fontSize}px;
                    color: ${item.color};
                    font-weight: bold;
                    margin: 5px 10px;
                    display: inline-block;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    animation: bounceIn 0.6s ease;
                    opacity: 0;
                `;
                
                wordElement.textContent = item.word;
                wordElement.title = `Độ quan trọng: ${item.weight}/10`;
                
                wordElement.addEventListener('mouseenter', () => {
                    wordElement.style.transform = 'scale(1.2)';
                    wordElement.style.textShadow = '2px 2px 4px rgba(0,0,0,0.3)';
                });
                
                wordElement.addEventListener('mouseleave', () => {
                    wordElement.style.transform = 'scale(1)';
                    wordElement.style.textShadow = 'none';
                });
                
                container.appendChild(wordElement);
                
                // Animate in
                setTimeout(() => {
                    wordElement.style.opacity = '1';
                }, 50);
                
            }, index * 200);
        });
        
        // Add CSS animation
        if (!document.getElementById('wordcloud-styles')) {
            const style = document.createElement('style');
            style.id = 'wordcloud-styles';
            style.textContent = `
                @keyframes bounceIn {
                    0% { transform: scale(0.3); opacity: 0; }
                    50% { transform: scale(1.05); opacity: 0.8; }
                    70% { transform: scale(0.9); opacity: 0.9; }
                    100% { transform: scale(1); opacity: 1; }
                }
            `;
            document.head.appendChild(style);
        }
        
    }, 1500);
}

// Story Generator
const storyTemplates = {
    "nhan-thuc": [
        "Một sinh viên tên An đang học về {topic}. Ban đầu, An chỉ {initial_state}, nhưng qua quá trình {process}, An dần {result}. Đây chính là minh chứng cho {principle}.",
        "Trong một buổi thảo luận nhóm, các bạn sinh viên tranh luận về {topic}. Mỗi người có {different_views}, nhưng cuối cùng họ nhận ra rằng {conclusion}."
    ],
    "cam-tinh-ly-tinh": [
        "Khi lần đầu tiếp xúc với trào lưu 'nằm yên', Bình {emotional_reaction}. Tuy nhiên, sau khi {rational_analysis}, Bình hiểu ra rằng {deeper_understanding}.",
        "Câu chuyện về hai anh em: anh Cường {emotional_approach} trong khi em Dũng {rational_approach}. Kết quả cho thấy {lesson}."
    ],
    "thuc-tien": [
        "Công ty X quyết định thử nghiệm cho nhân viên {practice_action}. Kết quả thực tế cho thấy {outcome}, chứng minh rằng {theoretical_point}.",
        "Một nhóm nghiên cứu tiến hành {experiment} để kiểm chứng lý thuyết về {theory}. Sau {time_period}, họ phát hiện {findings}."
    ],
    "bien-chung": [
        "Trong xã hội hiện đại, {phenomenon} tạo ra {contradiction}. Mâu thuẫn này {development_process} và dẫn đến {resolution}.",
        "Trào lưu 'nằm yên' ban đầu {initial_stage}, sau đó {transformation}, và cuối cùng {final_outcome}. Đây là ví dụ điển hình của {dialectical_law}."
    ]
};

const storyElements = {
    "nhan-thuc": {
        topic: "nhận thức phản ánh",
        initial_state: "hiểu một cách mơ hồ",
        process: "học tập và thực hành",
        result: "hiểu sâu sắc bản chất vấn đề",
        principle: "quy luật phát triển của nhận thức"
    },
    "cam-tinh-ly-tinh": {
        emotional_reaction: "cảm thấy thoải mái và muốn làm theo",
        rational_analysis: "tìm hiểu kỹ các nghiên cứu khoa học",
        deeper_understanding: "đây chỉ là giải pháp tạm thời, không bền vững"
    },
    "thuc-tien": {
        practice_action: "áp dụng mô hình 'work-life balance'",
        outcome: "năng suất tăng 25% và nhân viên hạnh phúc hơn",
        theoretical_point: "thực tiễn là tiêu chuẩn kiểm nghiệm chân lý"
    },
    "bien-chung": {
        phenomenon: "áp lực cạnh tranh gay gắt",
        contradiction: "mâu thuẫn giữa khát vọng thành công và khả năng thực tế",
        development_process: "thúc đẩy mọi người tìm kiếm giải pháp mới",
        resolution: "sự cân bằng giữa nỗ lực và nghỉ ngơi hợp lý"
    }
};

function generateStory() {
    const topic = document.getElementById('story-topic').value;
    const container = document.getElementById('story-container');
    
    container.style.display = 'block';
    container.innerHTML = '<div style="text-align: center; color: #f39c12;">🤖 AI đang sáng tác câu chuyện...</div>';
    
    setTimeout(() => {
        const templates = storyTemplates[topic];
        const elements = storyElements[topic];
        
        let selectedTemplate = templates[Math.floor(Math.random() * templates.length)];
        
        // Replace placeholders with actual content
        for (const [key, value] of Object.entries(elements)) {
            selectedTemplate = selectedTemplate.replace(`{${key}}`, value);
        }
        
        // Add some random elements
        const characters = ['An', 'Bình', 'Cường', 'Dũng', 'Linh', 'Mai'];
        const randomChar = characters[Math.floor(Math.random() * characters.length)];
        selectedTemplate = selectedTemplate.replace(/An|Bình|Cường|Dũng/g, randomChar);
        
        // Add topic-specific insights
        const insights = {
            "nhan-thuc": "💡 Bài học: Nhận thức phát triển từ thực tiễn và cần được kiểm nghiệm bằng thực tiễn.",
            "cam-tinh-ly-tinh": "💡 Bài học: Cần vượt lên từ cảm tính để đạt được nhận thức lý tính sâu sắc.",
            "thuc-tien": "💡 Bài học: Thực tiễn là tiêu chuẩn duy nhất để kiểm nghiệm chân lý.",
            "bien-chung": "💡 Bài học: Mâu thuẫn là động lực của sự phát triển, không nên tránh né."
        };
        
        container.innerHTML = `
            <div class="story-content">
                <h4>📖 Câu chuyện minh họa</h4>
                <div class="story-text">${selectedTemplate}</div>
                <div class="story-insight">${insights[topic]}</div>
                <div class="story-actions">
                    <button onclick="generateStory()" style="background: #27ae60; color: white; border: none; padding: 8px 15px; border-radius: 5px; cursor: pointer; margin-right: 10px;">
                        🔄 Tạo câu chuyện khác
                    </button>
                    <button onclick="shareStory()" style="background: #8e44ad; color: white; border: none; padding: 8px 15px; border-radius: 5px; cursor: pointer;">
                        📤 Chia sẻ
                    </button>
                </div>
            </div>
        `;
        
        // Add CSS for story
        if (!document.getElementById('story-styles')) {
            const style = document.createElement('style');
            style.id = 'story-styles';
            style.textContent = `
                .story-text {
                    font-size: 16px;
                    line-height: 1.6;
                    margin: 15px 0;
                    text-align: justify;
                }
                .story-insight {
                    background: #e8f5e8;
                    padding: 10px;
                    border-radius: 5px;
                    margin: 15px 0;
                    border-left: 4px solid #27ae60;
                    font-weight: bold;
                }
                .story-actions {
                    margin-top: 15px;
                    text-align: center;
                }
            `;
            document.head.appendChild(style);
        }
        
    }, 2000);
}

function shareStory() {
    const storyText = document.querySelector('.story-text').textContent;
    const insight = document.querySelector('.story-insight').textContent;
    
    const shareContent = `📚 Câu chuyện LLCT:\n\n${storyText}\n\n${insight}\n\n🌐 Website: Phân tích trào lưu "Nằm yên mặc kệ đời"`;
    
    if (navigator.share) {
        navigator.share({
            title: 'Câu chuyện LLCT',
            text: shareContent
        });
    } else {
        // Fallback - copy to clipboard
        navigator.clipboard.writeText(shareContent).then(() => {
            showNotification('📋 Đã copy câu chuyện vào clipboard!', 'success');
        });
    }
}

// Personality Test
const personalityQuestions = [
    {
        question: "Khi gặp vấn đề khó khăn, bạn thường:",
        options: [
            "Cảm thấy lo lắng và muốn tránh né",
            "Phân tích cẩn thận trước khi hành động", 
            "Hành động ngay lập tức dựa trên kinh nghiệm",
            "Tìm hiểu ý kiến của nhiều người khác"
        ],
        traits: ["emotional", "analytical", "practical", "social"]
    },
    {
        question: "Cách bạn học tập hiệu quả nhất là:",
        options: [
            "Đọc sách và ghi chú chi tiết",
            "Thảo luận và tranh luận với bạn bè",
            "Thực hành và áp dụng ngay",
            "Nghe giảng và quan sát"
        ],
        traits: ["theoretical", "social", "practical", "observational"]
    },
    {
        question: "Với trào lưu 'nằm yên', bạn nghĩ:",
        options: [
            "Đó là cách để giảm stress tạm thời",
            "Cần phân tích nguyên nhân sâu xa",
            "Nên tìm giải pháp thực tế thay thế",
            "Mỗi người có cách sống riêng"
        ],
        traits: ["emotional", "analytical", "practical", "accepting"]
    },
    {
        question: "Khi đưa ra quyết định quan trọng, bạn dựa vào:",
        options: [
            "Cảm xúc và trực giác",
            "Logic và lý luận",
            "Kinh nghiệm thực tế",
            "Ý kiến của người khác"
        ],
        traits: ["intuitive", "logical", "experiential", "social"]
    },
    {
        question: "Bạn tin rằng kiến thức đúng đắn được kiểm chứng bởi:",
        options: [
            "Cảm nhận cá nhân",
            "Lý thuyết khoa học",
            "Kết quả thực tiễn",
            "Sự đồng thuận xã hội"
        ],
        traits: ["subjective", "theoretical", "practical", "social"]
    }
];

let personalityAnswers = [];
let currentPersonalityQuestion = 0;

function startPersonalityTest() {
    personalityAnswers = [];
    currentPersonalityQuestion = 0;
    
    const container = document.getElementById('personality-test');
    container.style.display = 'block';
    
    showPersonalityQuestion();
}

function showPersonalityQuestion() {
    const container = document.getElementById('personality-test');
    const question = personalityQuestions[currentPersonalityQuestion];
    
    container.innerHTML = `
        <div class="personality-question">
            <div class="question-progress">
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${(currentPersonalityQuestion / personalityQuestions.length) * 100}%"></div>
                </div>
                <p>Câu ${currentPersonalityQuestion + 1}/${personalityQuestions.length}</p>
            </div>
            
            <h4>${question.question}</h4>
            
            <div class="personality-options">
                ${question.options.map((option, index) => `
                    <button class="personality-option" onclick="selectPersonalityAnswer(${index})">
                        ${String.fromCharCode(65 + index)}) ${option}
                    </button>
                `).join('')}
            </div>
        </div>
    `;
    
    // Add CSS for personality test
    if (!document.getElementById('personality-styles')) {
        const style = document.createElement('style');
        style.id = 'personality-styles';
        style.textContent = `
            .question-progress {
                margin-bottom: 20px;
            }
            .progress-bar {
                width: 100%;
                height: 6px;
                background: #ecf0f1;
                border-radius: 3px;
                overflow: hidden;
                margin-bottom: 10px;
            }
            .progress-fill {
                height: 100%;
                background: linear-gradient(90deg, #16a085, #27ae60);
                transition: width 0.5s ease;
            }
            .personality-options {
                display: flex;
                flex-direction: column;
                gap: 10px;
                margin-top: 20px;
            }
            .personality-option {
                background: white;
                border: 2px solid #bdc3c7;
                border-radius: 8px;
                padding: 15px;
                text-align: left;
                cursor: pointer;
                transition: all 0.3s ease;
                font-size: 14px;
            }
            .personality-option:hover {
                border-color: #16a085;
                background: #e8f8f5;
                transform: translateX(5px);
            }
        `;
        document.head.appendChild(style);
    }
}

function selectPersonalityAnswer(answerIndex) {
    const question = personalityQuestions[currentPersonalityQuestion];
    personalityAnswers.push({
        questionIndex: currentPersonalityQuestion,
        answerIndex: answerIndex,
        trait: question.traits[answerIndex]
    });
    
    currentPersonalityQuestion++;
    
    if (currentPersonalityQuestion < personalityQuestions.length) {
        setTimeout(() => {
            showPersonalityQuestion();
        }, 300);
    } else {
        setTimeout(() => {
            showPersonalityResult();
        }, 500);
    }
}

function showPersonalityResult() {
    // Analyze personality traits
    const traitCounts = {};
    personalityAnswers.forEach(answer => {
        traitCounts[answer.trait] = (traitCounts[answer.trait] || 0) + 1;
    });
    
    // Determine primary learning style
    const dominantTrait = Object.keys(traitCounts).reduce((a, b) => 
        traitCounts[a] > traitCounts[b] ? a : b
    );
    
    const personalityTypes = {
        analytical: {
            title: "🧠 Nhà Phân Tích",
            description: "Bạn có xu hướng tiếp cận vấn đề một cách logic và có hệ thống. Phù hợp với nhận thức lý tính trong LLCT.",
            strengths: "Tư duy logic mạnh mẽ, khả năng phân tích sâu sắc",
            advice: "Hãy cân bằng giữa lý thuyết và thực tiễn, đừng quá máy móc trong tư duy.",
            llctConnection: "Bạn dễ dàng nắm bắt quy luật từ cảm tính lên lý tính trong LLCT."
        },
        practical: {
            title: "🔨 Nhà Thực Tiễn",
            description: "Bạn tin vào kinh nghiệm thực tế và thích áp dụng kiến thức vào cuộc sống. Phù hợp với vai trò của thực tiễn trong LLCT.",
            strengths: "Khả năng ứng dụng cao, gắn liền với thực tế",
            advice: "Đừng bỏ qua lý thuyết, nó sẽ giúp bạn hiểu sâu hơn về thực tiễn.",
            llctConnection: "Bạn hiểu rõ vai trò của thực tiễn là tiêu chuẩn kiểm nghiệm chân lý."
        },
        social: {
            title: "👥 Nhà Xã Hội Học",
            description: "Bạn học tập tốt qua tương tác xã hội và coi trọng ý kiến cộng đồng. Phù hợp với tính xã hội của nhận thức.",
            strengths: "Kỹ năng giao tiếp tốt, hiểu biết đa chiều",
            advice: "Hãy phát triển tư duy độc lập, đừng phụ thuộc quá nhiều vào ý kiến người khác.",
            llctConnection: "Bạn hiểu rõ tính xã hội và lịch sử của nhận thức trong LLCT."
        },
        emotional: {
            title: "❤️ Nhà Cảm Thụ",
            description: "Bạn học tập tốt qua cảm xúc và trải nghiệm cá nhân. Gần với nhận thức cảm tính trong LLCT.",
            strengths: "Trực giác tốt, khả năng cảm nhận tinh tế",
            advice: "Cần phát triển thêm tư duy lý tính để bổ sung cho cảm tính.",
            llctConnection: "Bạn cần chú ý phát triển từ cảm tính lên lý tính theo LLCT."
        },
        theoretical: {
            title: "📚 Nhà Lý Thuyết",
            description: "Bạn thích tìm hiểu kiến thức sâu rộng và xây dựng hệ thống tư duy hoàn chỉnh.",
            strengths: "Kiến thức rộng, khả năng tổng hợp tốt",
            advice: "Hãy kết hợp lý thuyết với thực tiễn để kiểm chứng kiến thức.",
            llctConnection: "Bạn phù hợp với việc nghiên cứu sâu về các nguyên lý LLCT."
        }
    };
    
    const result = personalityTypes[dominantTrait] || personalityTypes.analytical;
    
    const container = document.getElementById('personality-test');
    container.innerHTML = `
        <div class="personality-result">
            <div class="result-header">
                <h3>🎯 Kết quả trắc nghiệm</h3>
                <div class="personality-type">
                    <h2>${result.title}</h2>
                </div>
            </div>
            
            <div class="result-content">
                <div class="description">
                    <h4>📋 Mô tả:</h4>
                    <p>${result.description}</p>
                </div>
                
                <div class="strengths">
                    <h4>💪 Điểm mạnh:</h4>
                    <p>${result.strengths}</p>
                </div>
                
                <div class="advice">
                    <h4>💡 Lời khuyên:</h4>
                    <p>${result.advice}</p>
                </div>
                
                <div class="llct-connection">
                    <h4>🔗 Liên hệ với LLCT:</h4>
                    <p>${result.llctConnection}</p>
                </div>
            </div>
            
            <div class="trait-chart">
                <h4>📊 Phân tích chi tiết:</h4>
                ${Object.entries(traitCounts).map(([trait, count]) => `
                    <div class="trait-bar">
                        <span class="trait-name">${trait}</span>
                        <div class="bar-container">
                            <div class="bar-fill" style="width: ${(count / personalityQuestions.length) * 100}%"></div>
                        </div>
                        <span class="trait-count">${count}/${personalityQuestions.length}</span>
                    </div>
                `).join('')}
            </div>
            
            <div class="result-actions">
                <button onclick="startPersonalityTest()" style="background: #3498db; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; margin-right: 10px;">
                    🔄 Làm lại test
                </button>
                <button onclick="savePersonalityResult()" style="background: #27ae60; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer;">
                    💾 Lưu kết quả
                </button>
            </div>
        </div>
    `;
    
    // Add CSS for result
    if (!document.getElementById('result-styles')) {
        const style = document.createElement('style');
        style.id = 'result-styles';
        style.textContent = `
            .personality-result {
                background: white;
                border-radius: 10px;
                padding: 20px;
                box-shadow: 0 5px 15px rgba(0,0,0,0.1);
            }
            .result-header {
                text-align: center;
                margin-bottom: 20px;
            }
            .personality-type h2 {
                color: #16a085;
                font-size: 1.5em;
                margin: 10px 0;
            }
            .result-content > div {
                margin: 15px 0;
                padding: 10px;
                border-left: 4px solid #16a085;
                background: #f8f9fa;
                border-radius: 0 5px 5px 0;
            }
            .trait-chart {
                margin: 20px 0;
            }
            .trait-bar {
                display: flex;
                align-items: center;
                margin: 8px 0;
                font-size: 14px;
            }
            .trait-name {
                width: 80px;
                font-weight: bold;
                text-transform: capitalize;
            }
            .bar-container {
                flex: 1;
                height: 20px;
                background: #ecf0f1;
                border-radius: 10px;
                margin: 0 10px;
                overflow: hidden;
            }
            .bar-fill {
                height: 100%;
                background: linear-gradient(90deg, #16a085, #27ae60);
                border-radius: 10px;
                transition: width 1s ease;
            }
            .trait-count {
                width: 40px;
                text-align: center;
                font-weight: bold;
            }
            .result-actions {
                text-align: center;
                margin-top: 20px;
            }
        `;
        document.head.appendChild(style);
    }
}

function savePersonalityResult() {
    const result = {
        type: document.querySelector('.personality-type h2').textContent,
        answers: personalityAnswers,
        timestamp: new Date().toISOString()
    };
    
    window.personalityResults = window.personalityResults || [];
    window.personalityResults.push(result);
    
    showNotification('💾 Đã lưu kết quả trắc nghiệm!', 'success');
}

// Initialize chat when content loads
document.addEventListener('DOMContentLoaded', () => {
    // Setup enter key for chat input
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && e.target.id === 'chat-input') {
            e.preventDefault();
            sendMessage();
        }
    });
    
    // Initialize memory game stats update
    setInterval(() => {
        if (memoryGameState.startTime && document.getElementById('memory-stats')) {
            updateMemoryStats();
        }
    }, 1000);
});

// Add some philosophical quotes for the chatbot
const philosophyQuotes = [
    "Thực tiễn là tiêu chuẩn duy nhất của chân lý - V.I.Lenin",
    "Không có gì tồn tại mãi mãi, mọi thứ đều trong vận động - Heraclitus", 
    "Nhận thức bắt đầu từ thực tiễn và quay trở lại thực tiễn - Mao Trạch Đông",
    "Triết học không chỉ giải thích thế giới mà còn thay đổi nó - Karl Marx"
];

function getRandomQuote() {
    return philosophyQuotes[Math.floor(Math.random() * philosophyQuotes.length)];
}

// Export functions to global scope
if (typeof window !== 'undefined') {
    window.sendMessage = sendMessage;
    window.startMemoryGame = startMemoryGame;
    window.generateWordCloud = generateWordCloud;
    window.generateStory = generateStory;
    window.shareStory = shareStory;
    window.startPersonalityTest = startPersonalityTest;
    window.selectPersonalityAnswer = selectPersonalityAnswer;
    window.savePersonalityResult = savePersonalityResult;
    window.regenerateQuiz = regenerateQuiz;
    window.showNotification = showNotification;
}

} // End of window check