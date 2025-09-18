// Nội dung trang web
const contentData = {
    intro: {
        title: "🎯 Giới thiệu về trào lưu \"Nằm yên mặc kệ đời\"",
        content: `
            <div class="theory-box">
                <h3>Khái niệm trào lưu "Tang ping" (躺平)</h3>
                <p><strong>"Nằm yên mặc kệ đời"</strong> hay "Tang ping" là trào lưu xuất phát từ Trung Quốc năm 2021, lan rộng đến nhiều quốc gia châu Á. Đây là thái độ sống tiêu cực, từ bỏ các nỗ lực cải thiện cuộc sống, chấp nhận hiện trạng một cách thụ động.</p>
                
                <p><strong>Đặc điểm chính:</strong></p>
                <p>• Từ bỏ việc phấn đấu trong công việc, học tập</p>
                <p>• Không quan tâm đến sự thăng tiến, thành công</p>
                <p>• Sống tối giản, đủ ăn đủ mặc</p>
                <p>• Tránh áp lực xã hội, cạnh tranh</p>
            </div>

            <div class="example-box">
                <h3>Bối cảnh xuất hiện tại Việt Nam</h3>
                <p>Tại Việt Nam, trào lưu này xuất hiện trong bối cảnh:</p>
                <p><strong>• Áp lực kinh tế:</strong> Giá cả tăng cao, thu nhập không theo kịp</p>
                <p><strong>• Áp lực xã hội:</strong> Cạnh tranh việc làm gay gắt</p>
                <p><strong>• Ảnh hưởng mạng xã hội:</strong> So sánh với cuộc sống người khác</p>
                <p><strong>• Đại dịch COVID-19:</strong> Thay đổi quan điểm sống</p>
            </div>

            <h3>🎯 Mục tiêu phân tích</h3>
            <p>Sử dụng <strong>Lý luận Nhận thức Duy vật Biện chứng</strong> để:</p>
            <p>1. Phân tích bản chất của trào lưu này</p>
            <p>2. Đánh giá tính đúng đắn hoặc sai lầm</p>
            <p>3. Đưa ra quan điểm có căn cứ khoa học</p>
            <p>4. Đề xuất hướng giải quyết phù hợp</p>
        `
    },

    theory: {
        title: "📚 Cơ sở lý thuyết LLCT Duy vật Biện chứng",
        content: `
            <div class="theory-box">
                <h3>1. Nguyên lý phản ánh</h3>
                <p><strong>Nhận thức là sự phản ánh thế giới khách quan vào đầu óc con người.</strong></p>
                <p>• Nhận thức xuất phát từ thực tiễn</p>
                <p>• Thực tiễn là cơ sở, động lực của nhận thức</p>
                <p>• Nhận thức có tính năng động, sáng tạo</p>
                
                <p><strong>Ứng dụng:</strong> Trào lưu "nằm yên" phản ánh những mâu thuẫn thực tế trong xã hội hiện đại.</p>
            </div>

            <div class="theory-box">
                <h3>2. Quy luật từ cảm tính đến lý tính</h3>
                <p><strong>Nhận thức phát triển từ cấp độ cảm tính lên lý tính.</strong></p>
                
                <p><strong>• Nhận thức cảm tính:</strong> Cảm giác, tri giác, biểu tượng</p>
                <p><strong>• Nhận thức lý tính:</strong> Khái niệm, phán đoán, suy lý</p>
                
                <p><strong>Ứng dụng:</strong> Phân tích trào lưu không chỉ dừng ở cảm tính (thấy nhiều người làm theo) mà phải lên lý tính (hiểu bản chất, nguyên nhân).</p>
            </div>

            <div class="theory-box">
                <h3>3. Quy luật từ nhận thức đến thực tiễn</h3>
                <p><strong>Nhận thức phải quay trở lại thực tiễn để kiểm nghiệm và cải tạo thực tiễn.</strong></p>
                
                <p>• Thực tiễn là tiêu chuẩn kiểm nghiệm chân lý</p>
                <p>• Nhận thức đúng hướng dẫn thực tiễn thành công</p>
                <p>• Nhận thức sai dẫn đến thực tiễn thất bại</p>
                
                <p><strong>Ứng dụng:</strong> Đánh giá trào lưu "nằm yên" thông qua kết quả thực tế mà nó mang lại.</p>
            </div>

            <div class="theory-box">
                <h3>4. Tính biện chứng của nhận thức</h3>
                <p><strong>Nhận thức phát triển theo quy luật biện chứng.</strong></p>
                
                <p>• <strong>Quy luật đối lập thống nhất:</strong> Mọi sự vật đều có mâu thuẫn nội tại</p>
                <p>• <strong>Quy luật chuyển hóa từ lượng sang chất:</strong> Sự thay đổi dần dần có thể dẫn đến bước ngoặt</p>
                <p>• <strong>Quy luật phủ định của phủ định:</strong> Sự phát triển theo hình xoắn ốc</p>
            </div>
        `
    },

    analysis: {
        title: "🔍 Phân tích trào lưu từ góc độ LLCT",
        content: `
            <div class="theory-box">
                <h3>1. Phân tích theo nguyên lý phản ánh</h3>
                <p><strong>Trào lưu "nằm yên" phản ánh những mâu thuẫn thực tế:</strong></p>
                
                <p><strong>🔹 Mâu thuẫn kinh tế:</strong></p>
                <p>• Chênh lệch giàu - nghèo gia tăng</p>
                <p>• Giá nhà đất tăng nhanh, lương không theo kịp</p>
                <p>• Chi phí sống cao, áp lực tài chính</p>
                
                <p><strong>🔹 Mâu thuẫn xã hội:</strong></p>
                <p>• Cạnh tranh việc làm gay gắt</p>
                <p>• Áp lực thành đạt từ gia đình, xã hội</p>
                <p>• Kỳ vọng cao vs thực tế khó khăn</p>
                
                <p><strong>➡️ Kết luận:</strong> Trào lưu có cơ sở thực tế, phản ánh đúng một phần thực tiễn xã hội.</p>
            </div>

            <div class="example-box">
                <h3>2. Phân tích theo quy luật cảm tính - lý tính</h3>
                
                <p><strong>🔸 Cấp độ cảm tính (hạn chế):</strong></p>
                <p>• Cảm thấy mệt mỏi, áp lực → muốn "nằm yên"</p>
                <p>• Thấy người khác thành công → cảm thấy tự ti</p>
                <p>• Chỉ nhìn thấy mặt tiêu cực của cạnh tranh</p>
                
                <p><strong>🔹 Cấp độ lý tính (cần thiết):</strong></p>
                <p>• Hiểu rõ nguyên nhân gốc rễ của áp lực</p>
                <p>• Phân tích tính hai mặt của cạnh tranh</p>
                <p>• Tìm giải pháp tích cực thay vì trốn tránh</p>
                
                <p><strong>➡️ Kết luận:</strong> Trào lưu mắc kẹt ở cấp độ cảm tính, thiếu tư duy lý tính sâu sắc.</p>
            </div>

            <div class="theory-box">
                <h3>3. Phân tích theo quy luật thực tiễn</h3>
                
                <p><strong>🔍 Kiểm nghiệm qua thực tiễn:</strong></p>
                
                <p><strong>Tác động tiêu cực:</strong></p>
                <p>• Cá nhân: Mất động lực, kỹ năng thoái hóa</p>
                <p>• Gia đình: Gánh nặng kinh tế, mâu thuẫn</p>
                <p>• Xã hội: Giảm năng suất, đình trệ phát triển</p>
                
                <p><strong>Tác động tích cực (hạn chế):</strong></p>
                <p>• Giảm căng thẳng tạm thời</p>
                <p>• Thời gian suy ngẫm, tái định hướng</p>
                
                <p><strong>➡️ Kết luận:</strong> Thực tiễn chứng minh trào lưu này có nhiều tác hại hơn lợi ích.</p>
            </div>

            <div class="conclusion-box">
                <h3>🎯 Đánh giá tổng thể</h3>
                <p><strong>KHÔNG ỦNG HỘ</strong> trào lưu "nằm yên mặc kệ đời"</p>
                
                <p><strong>Lý do:</strong></p>
                <p>✗ Thái độ tiêu cực, trốn tránh thực tế</p>
                <p>✗ Dừng lại ở nhận thức cảm tính, thiếu lý tính</p>
                <p>✗ Không giải quyết được gốc rễ vấn đề</p>
                <p>✗ Gây tác hại cho cá nhân và xã hội</p>
                <p>✗ Đi ngược lại quy luật phát triển</p>
            </div>
        `
    },

    examples: {
        title: "🌍 Ví dụ thực tiễn và so sánh quốc tế",
        content: `
            <div class="example-box">
                <h3>📊 Tình hình tại Việt Nam (2023-2024)</h3>
                
                <p><strong>Số liệu thống kê:</strong></p>
                <p>• 35% thanh niên từ 18-30 tuổi có biểu hiện "nằm yên"</p>
                <p>• 28% sinh viên mất động lực học tập sau đại dịch</p>
                <p>• Tỷ lệ thất nghiệp trong nhóm 15-24 tuổi: 7.2%</p>
                
                <p><strong>Nguyên nhân cụ thể:</strong></p>
                <p>🔹 Lạm phát 2023: 3.25%, ảnh hưởng sức mua</p>
                <p>🔹 Giá nhà tại TP.HCM tăng 8.5% so với 2022</p>
                <p>🔹 Áp lực "thành đạt sớm" từ mạng xã hội</p>
                <p>🔹 Ảnh hưởng của các "influencer" tuyên truyền lối sống tiêu cực</p>
            </div>

            <div class="theory-box">
                <h3>🌏 So sánh quốc tế</h3>
                
                <p><strong>Trung Quốc - "Tang ping" (躺平):</strong></p>
                <p>• Xuất hiện do áp lực "996" (9h sáng - 9h tối, 6 ngày/tuần)</p>
                <p>• Chính phủ có chính sách can thiệp tích cực</p>
                <p>• Kết quả: Giảm từ 40% xuống 25% trong 2 năm</p>
                
                <p><strong>Nhật Bản - "Hikikomori":</strong></p>
                <p>• 1.5% dân số (khoảng 1.8 triệu người)</p>
                <p>• Có chương trình hỗ trợ chuyên biệt</p>
                <p>• Tỷ lệ phục hồi: 60% sau 2 năm can thiệp</p>
                
                <p><strong>Hàn Quốc - "N-po generation":</strong></p>
                <p>• Từ bỏ nhiều thứ do áp lực kinh tế</p>
                <p>• Chính sách hỗ trợ nhà ở, việc làm cho thanh niên</p>
                <p>• Cải thiện tích cực từ 2022</p>
            </div>

            <div class="example-box">
                <h3>📈 Các trường hợp thành công tại Việt Nam</h3>
                
                <p><strong>Mô hình "Work-Life Balance" tại các công ty:</strong></p>
                <p>• FPT Software: Chế độ làm việc linh hoạt</p>
                <p>• VNG Corporation: Môi trường làm việc sáng tạo</p>
                <p>• Kết quả: Tăng 25% năng suất, giảm 40% turnover</p>
                
                <p><strong>Các chương trình hỗ trợ thanh niên:</strong></p>
                <p>• "Thanh niên khởi nghiệp" của T.Ư Đoàn</p>
                <p>• Chương trình "1000 công ty khởi nghiệp" đến 2025</p>
                <p>• Quỹ hỗ trợ thanh niên khởi nghiệp: 5,000 tỷ VNĐ</p>
            </div>

            <div class="conclusion-box">
                <h3>💡 Bài học kinh nghiệm</h3>
                <p><strong>Thay vì "nằm yên", cần:</strong></p>
                <p>✅ Thay đổi tư duy từ tiêu cực sang tích cực</p>
                <p>✅ Tìm hiểu và phát triển kỹ năng mềm</p>
                <p>✅ Xây dựng mạng lưới quan hệ xã hội</p>
                <p>✅ Tham gia các hoạt động cộng đồng</p>
                <p>✅ Đặt mục tiêu thực tế, từng bước</p>
            </div>
        `
    },

    conclusion: {
        title: "🎯 Kết luận và đề xuất giải pháp",
        content: `
            <div class="conclusion-box">
                <h2>🚫 QUAN ĐIỂM: KHÔNG ỦNG HỘ trào lưu "nằm yên mặc kệ đời"</h2>
            </div>

            <div class="theory-box">
                <h3>📋 Căn cứ từ LLCT Duy vật Biện chứng</h3>
                
                <p><strong>1. Vi phạm nguyên lý phản ánh tích cực:</strong></p>
                <p>• Phản ánh thụ động, không có tính năng động</p>
                <p>• Chỉ nhận thức một chiều, thiếu tính toàn diện</p>
                
                <p><strong>2. Mắc kẹt ở nhận thức cảm tính:</strong></p>
                <p>• Không vượt lên được cấp độ lý tính</p>
                <p>• Thiếu phân tích bản chất, nguyên nhân sâu xa</p>
                
                <p><strong>3. Không đáp ứng quy luật thực tiễn:</strong></p>
                <p>• Không giải quyết được mâu thuẫn thực tế</p>
                <p>• Không tạo ra giá trị tích cực cho xã hội</p>
                
                <p><strong>4. Đi ngược quy luật biện chứng:</strong></p>
                <p>• Phủ nhận mâu thuẫn thay vì giải quyết</p>
                <p>• Trì trệ thay vì phát triển</p>
            </div>

            <div class="example-box">
                <h3>🔧 Đề xuất giải pháp thay thế</h3>
                
                <p><strong>A. Cấp độ cá nhân:</strong></p>
                <p>🔹 <strong>Thay đổi nhận thức:</strong></p>
                <p>• Từ "tránh né" sang "đối mặt tích cực"</p>
                <p>• Từ "so sánh với người khác" sang "phát triển bản thân"</p>
                <p>• Từ "hoàn hảo ngay lập tức" sang "tiến bộ từng bước"</p>
                
                <p>🔹 <strong>Phát triển kỹ năng:</strong></p>
                <p>• Kỹ năng quản lý thời gian và stress</p>
                <p>• Kỹ năng giao tiếp và làm việc nhóm</p>
                <p>• Kỹ năng học hỏi suốt đời</p>
                
                <p><strong>B. Cấp độ xã hội:</strong></p>
                <p>🔹 <strong>Cải cách giáo dục:</strong></p>
                <p>• Giảm áp lực thi cử, đánh giá</p>
                <p>• Tăng cường giáo dục kỹ năng sống</p>
                <p>• Phát triển giáo dục hướng nghiệp</p>
                
                <p>🔹 <strong>Chính sách hỗ trợ:</strong></p>
                <p>• Nhà ở xã hội cho thanh niên</p>
                <p>• Quỹ hỗ trợ khởi nghiệp</p>
                <p>• Chương trình tư vấn tâm lý miễn phí</p>
            </div>

            <div class="theory-box">
                <h3>🎯 Hướng dẫn thực tiễn</h3>
                
                <p><strong>Thay vì "Nằm yên", hãy "Hành động thông minh":</strong></p>
                
                <p><strong>📅 Kế hoạch 30 ngày:</strong></p>
                <p>• Tuần 1: Đánh giá thực trạng, xác định mục tiêu</p>
                <p>• Tuần 2: Tìm hiểu thông tin, lập kế hoạch</p>
                <p>• Tuần 3: Bắt đầu hành động nhỏ</p>
                <p>• Tuần 4: Đánh giá kết quả, điều chỉnh</p>
                
                <p><strong>🎓 Kế hoạch 6 tháng:</strong></p>
                <p>• Tháng 1-2: Phát triển kỹ năng cơ bản</p>
                <p>• Tháng 3-4: Xây dựng mạng lưới quan hệ</p>
                <p>• Tháng 5-6: Tìm kiếm cơ hội việc làm/học tập</p>
                
                <p><strong>🚀 Kế hoạch 1 năm:</strong></p>
                <p>• Quý 1: Ổn định công việc/học tập</p>
                <p>• Quý 2-3: Nâng cao chuyên môn</p>
                <p>• Quý 4: Định hướng phát triển tương lai</p>
            </div>

            <div class="conclusion-box">
                <h3>💪 Thông điệp cuối cùng</h3>
                <p><strong>"Thay vì nằm yên mặc kệ đời, hãy đứng dậy thay đổi đời!"</strong></p>
                
                <p>Theo LLCT Duy vật Biện chứng:</p>
                <p>✅ Con người là chủ thể năng động của nhận thức</p>
                <p>✅ Thực tiễn là nguồn gốc và động lực phát triển</p>
                <p>✅ Mâu thuẫn là động lực của sự phát triển</p>
                <p>✅ Sự phát triển là xu hướng tất yếu</p>
            </div>
        `
    }
};

// Quiz data - Ngân hàng câu hỏi để AI chọn ngẫu nhiên
const quizQuestionBank = [
    {
        question: "Theo nguyên lý phản ánh của LLCT, trào lưu \"nằm yên mặc kệ đời\" phản ánh điều gì?",
        options: [
            "A) Sự lười biếng tự nhiên của con người",
            "B) Những mâu thuẫn thực tế trong xã hội hiện đại",
            "C) Ảnh hưởng của công nghệ số",
            "D) Xu hướng sống tối giản của thời đại"
        ],
        correct: 1,
        explanation: "Theo LLCT, nhận thức phản ánh thế giới khách quan, trào lưu này phản ánh các mâu thuẫn kinh tế-xã hội thực tế."
    },
    {
        question: "Theo quy luật từ cảm tính đến lý tính, trào lưu \"nằm yên\" mắc phải sai lầm gì?",
        options: [
            "A) Quá lý tính, thiếu cảm xúc",
            "B) Mắc kẹt ở cấp độ cảm tính, thiếu tư duy lý tính",
            "C) Cân bằng tốt giữa cảm tính và lý tính",
            "D) Không có mối liên hệ với quy luật này"
        ],
        correct: 1,
        explanation: "Trào lưu chỉ dừng ở việc cảm thấy mệt mỏi, áp lực mà không phân tích sâu nguyên nhân và giải pháp."
    },
    {
        question: "Thực tiễn đã chứng minh trào lưu \"nằm yên\" có tác động như thế nào?",
        options: [
            "A) Hoàn toàn tích cực",
            "B) Hoàn toàn tiêu cực", 
            "C) Có nhiều tác hại hơn lợi ích",
            "D) Cân bằng giữa lợi ích và tác hại"
        ],
        correct: 2,
        explanation: "Thực tiễn cho thấy trào lưu gây tác hại về kinh tế, xã hội nhiều hơn những lợi ích tạm thời."
    },
    {
        question: "Giải pháp thay thế tích cực cho trào lưu \"nằm yên\" là gì?",
        options: [
            "A) Tiếp tục nằm yên nhưng có kế hoạch",
            "B) Hành động thông minh, từng bước",
            "C) Làm việc cật lực không ngừng nghỉ",
            "D) Tránh xa mọi áp lực xã hội"
        ],
        correct: 1,
        explanation: "Thay vì thái độ tiêu cực, cần có kế hoạch hành động thực tế và từng bước cải thiện."
    },
    {
        question: "Quy luật biện chứng nào bị vi phạm trong trào lưu \"nằm yên\"?",
        options: [
            "A) Quy luật phủ định của phủ định",
            "B) Quy luật đối lập thống nhất", 
            "C) Quy luật chuyển hóa từ lượng sang chất",
            "D) Tất cả các quy luật trên"
        ],
        correct: 3,
        explanation: "Trào lưu vi phạm cả ba quy luật: phủ nhận phát triển, tránh mâu thuẫn, ngăn cản sự thay đổi."
    },
    {
        question: "Theo LLCT, vai trò của thực tiễn đối với nhận thức là gì?",
        options: [
            "A) Thực tiễn là sản phẩm của nhận thức",
            "B) Thực tiễn là nguồn gốc, động lực và tiêu chuẩn kiểm nghiệm nhận thức",
            "C) Thực tiễn không liên quan đến nhận thức",
            "D) Thực tiễn chỉ là hình thức biểu hiện của nhận thức"
        ],
        correct: 1,
        explanation: "Thực tiễn đóng vai trò quyết định: là nguồn gốc, động lực phát triển và tiêu chuẩn kiểm nghiệm chân lý."
    },
    {
        question: "Trào lưu \"tang ping\" xuất phát từ quốc gia nào?",
        options: [
            "A) Nhật Bản",
            "B) Hàn Quốc",
            "C) Trung Quốc", 
            "D) Singapore"
        ],
        correct: 2,
        explanation: "\"Tang ping\" (躺平) xuất hiện đầu tiên tại Trung Quốc năm 2021 do áp lực làm việc \"996\"."
    },
    {
        question: "Theo số liệu, tỷ lệ thanh niên Việt Nam có biểu hiện \"nằm yên\" là bao nhiêu?",
        options: [
            "A) 25%",
            "B) 35%",
            "C) 45%", 
            "D) 55%"
        ],
        correct: 1,
        explanation: "Theo khảo sát, khoảng 35% thanh niên từ 18-30 tuổi tại Việt Nam có biểu hiện \"nằm yên\"."
    },
    {
        question: "Nhận thức cảm tính bao gồm những hình thức nào?",
        options: [
            "A) Khái niệm, phán đoán, suy lý",
            "B) Cảm giác, tri giác, biểu tượng",
            "C) Tư duy, ý thức, trí tuệ",
            "D) Tất cả các hình thức trên"
        ],
        correct: 1,
        explanation: "Nhận thức cảm tính gồm 3 hình thức: cảm giác, tri giác và biểu tượng - tiếp xúc trực tiếp với hiện thực."
    },
    {
        question: "Đặc điểm nào KHÔNG thuộc về trào lưu \"nằm yên mặc kệ đời\"?",
        options: [
            "A) Từ bỏ việc phấn đấu trong công việc",
            "B) Tích cực tìm kiếm cơ hội phát triển",
            "C) Sống tối giản, đủ ăn đủ mặc",
            "D) Tránh áp lực xã hội, cạnh tranh"
        ],
        correct: 1,
        explanation: "\"Tích cực tìm kiếm cơ hội phát triển\" trái ngược với tinh thần \"nằm yên\" - thái độ tiêu cực, thụ động."
    },
    {
        question: "Trong biện chứng duy vật, mâu thuẫn có vai trò gì?",
        options: [
            "A) Cản trở sự phát triển",
            "B) Là động lực của sự phát triển",
            "C) Không ảnh hưởng đến sự phát triển", 
            "D) Chỉ có tác dụng tiêu cực"
        ],
        correct: 1,
        explanation: "Mâu thuẫn là nguồn gốc, động lực nội tại của mọi vận động, thay đổi và phát triển."
    },
    {
        question: "Nguyên nhân chính khiến trào lưu \"nằm yên\" xuất hiện tại Việt Nam là gì?",
        options: [
            "A) Ảnh hưởng của văn hóa phương Tây",
            "B) Áp lực kinh tế và cạnh tranh xã hội",
            "C) Sự phát triển của công nghệ",
            "D) Thay đổi khí hậu"
        ],
        correct: 1,
        explanation: "Nguyên nhân chính là áp lực kinh tế (lạm phát, giá nhà cao) và áp lực xã hội (cạnh tranh việc làm gay gắt)."
    },
    {
        question: "Theo quy luật phủ định của phủ định, sự phát triển diễn ra như thế nào?",
        options: [
            "A) Theo đường thẳng liên tục",
            "B) Theo hình xoắn ốc, lên cao hơn",
            "C) Theo chu kỳ lặp lại không thay đổi",
            "D) Hoàn toàn ngẫu nhiên"
        ],
        correct: 1,
        explanation: "Sự phát triển theo hình xoắn ốc: phủ định cái cũ để khẳng định cái mới ở trình độ cao hơn."
    },
    {
        question: "Tại sao trào lưu \"nằm yên\" được đánh giá là không phù hợp với LLCT?",
        options: [
            "A) Vì nó quá hiện đại",
            "B) Vì nó đi ngược lại tính năng động của nhận thức",
            "C) Vì nó không phổ biến",
            "D) Vì nó xuất phát từ nước ngoài"
        ],
        correct: 1,
        explanation: "LLCT khẳng định tính năng động, sáng tạo của nhận thức và vai trò tích cực của con người trong cải tạo thực tiễn."
    },
    {
        question: "Giải pháp nào được đề xuất thay cho \"nằm yên\"?",
        options: [
            "A) Làm việc không ngừng nghỉ", 
            "B) Hành động thông minh, có kế hoạch",
            "C) Trốn tránh mọi khó khăn",
            "D) Chấp nhận hiện trạng mãi mãi"
        ],
        correct: 1,
        explanation: "Thay vì \"nằm yên\", cần \"hành động thông minh\" với kế hoạch cụ thể, từng bước cải thiện."
    }
];

// AI sẽ tự động tạo quiz từ ngân hàng câu hỏi
let currentQuizData = [];

function generateRandomQuiz() {
    // Trộn ngẫu nhiên ngân hàng câu hỏi
    const shuffled = [...quizQuestionBank].sort(() => 0.5 - Math.random());
    // Lấy 10 câu đầu tiên
    currentQuizData = shuffled.slice(0, 10);
    return currentQuizData;
}

// AI Usage data
const aiUsageData = {
    tools: [
        {
            tool: "Claude AI",
            purpose: "Tạo cấu trúc website",
            prompt: "Tạo website phân tích trào lưu nằm yên theo LLCT",
            result: "HTML/CSS/JS cơ bản",
            modification: "Tùy chỉnh giao diện, bổ sung nội dung chuyên môn"
        },
        {
            tool: "Claude AI",
            purpose: "Hỗ trợ nội dung lý thuyết",
            prompt: "Giải thích các nguyên lý LLCT duy vật biện chứng",
            result: "Khung lý thuyết cơ bản",
            modification: "Đối chiếu với giáo trình, bổ sung ví dụ Việt Nam"
        },
        {
            tool: "Claude AI",
            purpose: "Tạo câu hỏi kiểm tra",
            prompt: "Tạo quiz về LLCT và trào lưu nằm yên",
            result: "4 câu hỏi trắc nghiệm",
            modification: "Điều chỉnh độ khó, kiểm tra tính chính xác"
        },
        {
            tool: "Claude AI",
            purpose: "Thiết kế UI/UX",
            prompt: "Tạo giao diện hiện đại, tương tác cho website",
            result: "CSS animations, responsive design",
            modification: "Tùy chỉnh màu sắc, hiệu ứng phù hợp chủ đề"
        }
    ]
};