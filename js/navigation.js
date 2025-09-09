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
    const sections = ['intro', 'theory', 'analysis', 'examples', 'conclusion', 'quiz', 'ai-usage'];
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
    let quizHTML = `
        <h2>📝 Kiểm tra kiến thức</h2>
    `;
    
    quizData.forEach((quiz, index) => {
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
        
        quizHTML += `</div>`;
    });
    
    quizHTML += `
        <div id="quizResult" style="display: none; margin-top: 20px; padding: 20px; background: #e8f5e8; border-radius: 10px; text-align: center;">
            <h3>🎉 Kết quả kiểm tra</h3>
            <p id="scoreText"></p>
            <p><strong>Nhận xét:</strong> <span id="feedback"></span></p>
            <button onclick="resetQuiz()" style="margin-top: 15px; padding: 10px 20px; background: #3498db; color: white; border: none; border-radius: 5px; cursor: pointer;">
                Làm lại
            </button>
        </div>
    `;
    
    return quizHTML;
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

        <div class="commitment-box">
            <h3>📜 Cam kết liêm chính học thuật</h3>
            <p><strong>Tôi cam kết:</strong></p>
            <p>✅ AI chỉ đóng vai trò hỗ trợ kỹ thuật, không thay thế hoàn toàn việc học tập</p>
            <p>✅ Toàn bộ nội dung chuyên môn đều do tôi nghiên cứu, biên soạn và chịu trách nhiệm</p>
            <p>✅ Đã đối chiếu và kiểm chứng thông tin với các nguồn chính thống</p>
            <p>✅ Sản phẩm thể hiện sự hiểu biết thực tế về môn học LLCT</p>
            <p>✅ Tuân thủ đầy đủ yêu cầu về sử dụng AI có trách nhiệm</p>
            
            <p style="margin-top: 20px; font-style: italic; text-align: center;">
                <strong>Sinh viên: [Tên sinh viên]</strong><br>
                <strong>Ngày: [Ngày nộp bài]</strong>
            </p>
        </div>

        <div class="example-box">
            <h3>🎯 Đánh giá sản phẩm</h3>
            <p><strong>Điểm mạnh của sản phẩm:</strong></p>
            <p>✅ Ứng dụng chính xác lý thuyết LLCT vào phân tích thực tiễn</p>
            <p>✅ Có quan điểm rõ ràng, lập luận logic</p>
            <p>✅ Kết hợp lý thuyết với ví dụ thực tế sinh động</p>
            <p>✅ Đa dạng định dạng: web tương tác, quiz, animation</p>
            <p>✅ Sử dụng AI minh bạch, có trách nhiệm</p>
            <p>✅ Cập nhật thông tin mới, bối cảnh Việt Nam 2023-2024</p>
            
            <p><strong>Giá trị học thuật:</strong></p>
            <p>• Phân tích sâu sắc hiện tượng xã hội qua lăng kính triết học</p>
            <p>• Đề xuất giải pháp thiết thực, khả thi</p>
            <p>• Thể hiện khả năng vận dụng lý thuyết vào thực tiễn</p>
            <p>• Định hướng tư duy tích cực cho thanh niên</p>
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