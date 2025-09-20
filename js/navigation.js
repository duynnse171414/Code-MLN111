// Navigation functionality
let currentSection = 'intro';

function showSection(sectionId, button) {
    // Hide all sections
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Remove existing section if exists
    const existingSection = document.getElementById(sectionId);
    if (existingSection) {
        existingSection.remove();
    }
    
    // Create new section
    const contentContainer = document.getElementById('content-container');
    const newSection = document.createElement('section');
    newSection.id = sectionId;
    newSection.className = 'content-section active';
    
    // Load content based on section
    if (sectionId === 'quiz') {
        newSection.innerHTML = createQuizContent();
    } else if (sectionId === 'ai-usage') {
        newSection.innerHTML = createAIUsageContent();
    } else if (sectionId === 'aiFeatures') {
        newSection.innerHTML = `
            <h2>🤖 Tính năng AI tương tác</h2>
            ${contentData.aiFeatures.content}
        `;
    } else if (contentData[sectionId]) {
        newSection.innerHTML = `
            <h2>${contentData[sectionId].title}</h2>
            ${contentData[sectionId].content}
        `;
    }
    
    contentContainer.appendChild(newSection);
    
    // Update navigation
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    button.classList.add('active');
    
    currentSection = sectionId;
    updateProgressBar();
    
    // Add scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Add slide animation
    newSection.classList.add('slide-in-left');
    setTimeout(() => {
        newSection.classList.remove('slide-in-left');
    }, 600);
    
    // Initialize quiz if needed
    if (sectionId === 'quiz') {
        initializeQuiz();
    }
}

function updateProgressBar() {
    const sections = ['intro', 'theory', 'analysis', 'examples', 'conclusion', 'aiFeatures', 'quiz', 'ai-usage'];
    const currentIndex = sections.indexOf(currentSection);
    const progress = ((currentIndex + 1) / sections.length) * 100;
    
    const progressBar = document.getElementById('progressBar');
    progressBar.style.width = progress + '%';
    progressBar.style.setProperty('--target-width', progress + '%');
    progressBar.classList.add('animate');
    
    setTimeout(() => {
        progressBar.classList.remove('animate');
    }, 1000);
}

function createQuizContent() {
    // AI tạo bộ quiz ngẫu nhiên mới
    const randomQuiz = generateRandomQuiz();
    
    let quizHTML = `
        <h2>📝 Kiểm tra kiến thức</h2>
        <div style="background: linear-gradient(135deg, #172733ff, #5f7a91ff); padding: 20px; border-radius: 10px; margin-bottom: 20px; text-align: center;">
            <h3>🤖 Quiz được tạo bởi AI</h3>
            <p>Hệ thống AI đã tự động tạo ra <strong>10 câu hỏi ngẫu nhiên</strong> từ ngân hàng 15+ câu hỏi về LLCT và trào lưu "nằm yên".</p>
            <p><small>Mỗi lần làm bài sẽ có bộ câu hỏi khác nhau!</small></p>
            <button onclick="regenerateQuiz()" style="background: #2196F3; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; margin-top: 10px;">
                🔄 Tạo bộ câu hỏi mới
            </button>
        </div>
    `;
    
    randomQuiz.forEach((quiz, index) => {
        quizHTML += `
            <div class="quiz-container" data-question="${index}">
                <div class="quiz-question">
                    Câu ${index + 1}: ${quiz.question}
                </div>
        `;
        
        quiz.options.forEach((option, optionIndex) => {
            quizHTML += `
                <div class="quiz-option" onclick="selectAnswer(this, ${optionIndex === quiz.correct}, ${index})">
                    ${option}
                </div>
            `;
        });
        
        quizHTML += `
                <div class="quiz-explanation" style="display: none; margin-top: 10px; padding: 10px; background: #f8f9fa; border-radius: 5px; border-left: 3px solid #28a745;">
                    <strong>💡 Giải thích:</strong> ${quiz.explanation}
                </div>
            </div>
        `;
    });
    
    quizHTML += `
        <div id="quizResult" style="display: none; margin-top: 20px; padding: 20px; background: #e8f5e8; border-radius: 10px; text-align: center;">
            <h3>🎉 Kết quả kiểm tra</h3>
            <p id="scoreText"></p>
            <p><strong>Nhận xét:</strong> <span id="feedback"></span></p>
            <div id="detailedResults" style="margin-top: 15px;"></div>
            <button onclick="resetQuiz()" style="margin-top: 15px; padding: 10px 20px; background: #3498db; color: white; border: none; border-radius: 5px; cursor: pointer; margin-right: 10px;">
                Làm lại
            </button>
            <button onclick="regenerateQuiz()" style="margin-top: 15px; padding: 10px 20px; background: #e74c3c; color: white; border: none; border-radius: 5px; cursor: pointer;">
                Tạo bộ câu hỏi mới
            </button>
        </div>
    `;
    
    return quizHTML;
}

// Hàm tạo lại quiz với bộ câu hỏi mới
function regenerateQuiz() {
    // Reset quiz state
    quizScore = 0;
    quizAnswered = 0;
    userAnswers = [];
    
    // Tạo nội dung quiz mới
    const quizSection = document.getElementById('quiz');
    if (quizSection) {
        quizSection.innerHTML = createQuizContent();
        
        // Scroll to top of quiz
        quizSection.scrollIntoView({ behavior: 'smooth' });
        
        // Show notification
        showNotification('🎲 Đã tạo bộ câu hỏi mới!', 'success');
    }
}

// Hàm hiển thị notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        color: white;
        font-weight: bold;
        z-index: 10000;
        transition: all 0.3s ease;
        transform: translateX(100%);
    `;
    
    // Set color based on type
    switch(type) {
        case 'success':
            notification.style.background = '#28a745';
            break;
        case 'error':
            notification.style.background = '#dc3545';
            break;
        case 'warning':
            notification.style.background = '#ffc107';
            notification.style.color = '#212529';
            break;
        default:
            notification.style.background = '#17a2b8';
    }
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Slide in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 10);
    
    // Slide out and remove
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 3000);
}

function createAIUsageContent() {
    return `
        <h2>🤖 AI Usage Report</h2>
        
        <div class="ai-usage">
            <h3>📊 Báo cáo sử dụng AI có trách nhiệm</h3>
            
            <table class="ai-table">
                <thead>
                    <tr>
                        <th>Công cụ AI</th>
                        <th>Mục đích sử dụng</th>
                        <th>Prompt chính</th>
                        <th>Kết quả</th>
                        <th>Chỉnh sửa/Biên soạn</th>
                    </tr>
                </thead>
                <tbody>
                    ${aiUsageData.tools.map(tool => `
                        <tr>
                            <td data-label="Công cụ AI">${tool.tool}</td>
                            <td data-label="Mục đích sử dụng">${tool.purpose}</td>
                            <td data-label="Prompt chính">${tool.prompt}</td>
                            <td data-label="Kết quả">${tool.result}</td>
                            <td data-label="Chỉnh sửa/Biên soạn">${tool.modification}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>

            <h3>✅ Kiểm chứng thông tin</h3>
            <p><strong>Nguồn tham khảo chính thống:</strong></p>
            <p>• Giáo trình "Những nguyên lý cơ bản của Chủ nghĩa Mác - Lênin" - NXB Chính trị Quốc gia Sự thật</p>
            <p>• "Lý luận nhận thức Mác-Lênin" - PGS.TS. Nguyễn Văn Dũng</p>
            <p>• Nghị quyết Đại hội XIII của Đảng về phát triển con người Việt Nam</p>
            <p>• Số liệu thống kê từ Tổng cục Thống kê Việt Nam (2023-2024)</p>

            <h3>🔍 Phân định rõ ràng</h3>
            <p><strong>Phần do AI tạo ra:</strong></p>
            <p>• Cấu trúc HTML/CSS/JavaScript cơ bản</p>
            <p>• Khung sườn nội dung và bố cục</p>
            <p>• Hiệu ứng visual và animations</p>
            
            <p><strong>Phần sinh viên chỉnh sửa/biên soạn:</strong></p>
            <p>• Toàn bộ nội dung chuyên môn về LLCT</p>
            <p>• Phân tích cụ thể về trào lưu "nằm yên"</p>
            <p>• Ví dụ thực tiễn và số liệu Việt Nam</p>
            <p>• Kết luận và đề xuất giải pháp</p>
            <p>• Câu hỏi kiểm tra và đáp án</p>
        </div>

    `;
}

// Keyboard navigation
function initKeyboardNavigation() {
    document.addEventListener('keydown', function(e) {
        const sections = ['intro', 'theory', 'analysis', 'examples', 'conclusion', 'quiz', 'ai-usage'];
        const currentIndex = sections.indexOf(currentSection);
        
        if (e.key === 'ArrowLeft' && currentIndex > 0) {
            e.preventDefault();
            const prevBtn = document.querySelectorAll('.nav-btn')[currentIndex - 1];
            showSection(sections[currentIndex - 1], prevBtn);
        } else if (e.key === 'ArrowRight' && currentIndex < sections.length - 1) {
            e.preventDefault();
            const nextBtn = document.querySelectorAll('.nav-btn')[currentIndex + 1];
            showSection(sections[currentIndex + 1], nextBtn);
        }
    });
}

// Auto-save progress to sessionStorage
function saveProgress() {
    const progress = {
        currentSection: currentSection,
        timestamp: new Date().toISOString()
    };
    // Note: Using memory storage instead of sessionStorage for Claude.ai compatibility
    window.appProgress = progress;
}

function loadProgress() {
    // Note: Using memory storage instead of sessionStorage for Claude.ai compatibility
    const progress = window.appProgress;
    if (progress) {
        const savedSection = progress.currentSection;
        if (savedSection && savedSection !== 'intro') {
            const button = Array.from(document.querySelectorAll('.nav-btn'))
                .find(btn => btn.onclick.toString().includes(`'${savedSection}'`));
            if (button) {
                showSection(savedSection, button);
            }
        }
    }
}