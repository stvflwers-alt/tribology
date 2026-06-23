import appState from '../../state.js';
import router from '../../router.js';
export function renderQuestion3_5(container) {
    // تابع ساده ترجمه
    const translate = (text) => {
        if (appState.language !== 'en') return text;
        const translations = {
            // عنوان‌ها
            'سوال ۳-۵': 'Question 3-5',
            'تشخیص مشکل': 'Problem Diagnosis',
            'مشکل اصلی در کدام بخش است؟': 'Where is the main problem located?',
            'لطفاً مشکل اصلی سیستم روانکاری را بر اساس مشاهده خود انتخاب کنید. می‌توانید چند گزینه را انتخاب کنید.': 'Please select the main problem of the lubrication system based on your observation. You can select multiple options.',
            'بازگشت': 'Back',
            'ادامه': 'Continue',
            // مشکلات (عنوان‌ها)
            'مکانیزم اشتباه': 'Wrong mechanism',
            'فشار یا دبی ناکافی': 'Insufficient pressure or flow rate',
            'ورودی سیال نامناسب': 'Inappropriate fluid input',
            'فیلترها گرفته شده': 'Filters are clogged',
            'نشتی': 'Leakage',
            'کف/هوا (Foaming)': 'Foam/Air (Foaming)',
            'دمای سیال بالا': 'High fluid temperature',
            'خوردگی یا رسوب‌گذاری': 'Corrosion or fouling',
            'ویسکوزیته اشتباه': 'Wrong viscosity',
            'حباب گاز محلول (Aeration)': 'Dissolved gas bubbles (Aeration)',
            'پمپ خراب یا فرسوده': 'Pump damaged or worn',
            'گرفتگی لوله‌ها یا شیلنگ‌ها': 'Pipes or hoses are clogged',
            'مخزن روغن نامناسب': 'Inappropriate oil reservoir',
            'آب‌بندی نامناسب': 'Improper sealing',
            'روغن‌کاری ناقص (Starvation)': 'Insufficient lubrication (Starvation)',
            'Hot oil carry over': 'Hot oil carry over',
            'واکنش شیمیایی با آب‌بندها': 'Chemical reaction with seals',
            'پلیمریزاسیون': 'Polymerization',
            'تبخیر روانکار': 'Lubricant evaporation',
            // علائم مشکلات
            'گریس به جای روغن، یا برعکس': 'Grease instead of oil, or vice versa',
            'فشار پایین روی گیج، روغن به قطعه نمی‌رسد': 'Low pressure on gauge, oil does not reach the part',
            'روانکار کثیف، مخلوط با آب، تغییر رنگ': 'Contaminated lubricant, mixed with water, color change',
            'اختلاف فشار روی فیلتر، ذرات در روغن': 'Pressure difference across filter, particles in oil',
            'روغن روی زمین، لکه‌های روغن': 'Oil on the floor, oil stains',
            'کف روی سطح روغن، حباب‌های درشت': 'Foam on oil surface, large bubbles',
            'لوله‌ها داغ، بخار از مخزن': 'Pipes hot, steam from reservoir',
            'رسوبات روی فیلتر، زنگ‌زدگی داخل لوله‌ها': 'Deposits on filter, rust inside pipes',
            'روغن خیلی رقیق یا خیلی غلیظ': 'Oil too thin or too thick',
            'روغن شیری رنگ، حباب‌های ریز پایدار': 'Milky oil, stable fine bubbles',
            'صدای غیرعادی، نوسان فشار': 'Unusual noise, pressure fluctuation',
            'روغن به همه نقاط نمی‌رسد': 'Oil does not reach all points',
            'روغن زود داغ می‌شود یا کف می‌کند': 'Oil heats up quickly or foams',
            'ورود گرد و غبار یا آب به سیستم': 'Dust or water entering the system',
            'روغن کافی به تماس نمی‌رسد': 'Sufficient oil does not reach the contact',
            'روغن داغ از پد قبلی وارد پد بعدی می‌شود': 'Hot oil from previous pad enters the next pad',
            'آب‌بندها باد کرده، ترک خورده': 'Seals swollen, cracked',
            'لایه پلیمری قهوه‌ای روی سطوح': 'Brown polymer layer on surfaces',
            'کاهش مداوم سطح روغن بدون نشتی': 'Continuous decrease in oil level without leakage'
        };
        return translations[text] || text;
    };
    const problems = [
        { code: 1, icon: '⚙️', text: translate('مکانیزم اشتباه'), symptom: translate('گریس به جای روغن، یا برعکس') },
        { code: 2, icon: '📉', text: translate('فشار یا دبی ناکافی'), symptom: translate('فشار پایین روی گیج، روغن به قطعه نمی‌رسد') },
        { code: 3, icon: '🏭', text: translate('ورودی سیال نامناسب'), symptom: translate('روانکار کثیف، مخلوط با آب، تغییر رنگ') },
        { code: 4, icon: '🔍', text: translate('فیلترها گرفته شده'), symptom: translate('اختلاف فشار روی فیلتر، ذرات در روغن') },
        { code: 5, icon: '💧', text: translate('نشتی'), symptom: translate('روغن روی زمین، لکه‌های روغن') },
        { code: 6, icon: '🫧', text: translate('کف/هوا (Foaming)'), symptom: translate('کف روی سطح روغن، حباب‌های درشت') },
        { code: 7, icon: '🌡️', text: translate('دمای سیال بالا'), symptom: translate('لوله‌ها داغ، بخار از مخزن') },
        { code: 8, icon: '🧪', text: translate('خوردگی یا رسوب‌گذاری'), symptom: translate('رسوبات روی فیلتر، زنگ‌زدگی داخل لوله‌ها') },
        { code: 9, icon: '🧴', text: translate('ویسکوزیته اشتباه'), symptom: translate('روغن خیلی رقیق یا خیلی غلیظ') },
        { code: 10, icon: '🫧', text: translate('حباب گاز محلول (Aeration)'), symptom: translate('روغن شیری رنگ، حباب‌های ریز پایدار') },
        { code: 11, icon: '🔧', text: translate('پمپ خراب یا فرسوده'), symptom: translate('صدای غیرعادی، نوسان فشار') },
        { code: 12, icon: '🚰', text: translate('گرفتگی لوله‌ها یا شیلنگ‌ها'), symptom: translate('روغن به همه نقاط نمی‌رسد') },
        { code: 13, icon: '🛢️', text: translate('مخزن روغن نامناسب'), symptom: translate('روغن زود داغ می‌شود یا کف می‌کند') },
        { code: 14, icon: '🔒', text: translate('آب‌بندی نامناسب'), symptom: translate('ورود گرد و غبار یا آب به سیستم') },
        { code: 15, icon: '⚠️', text: translate('روغن‌کاری ناقص (Starvation)'), symptom: translate('روغن کافی به تماس نمی‌رسد') },
        { code: 16, icon: '🔥', text: translate('Hot oil carry over'), symptom: translate('روغن داغ از پد قبلی وارد پد بعدی می‌شود') },
        { code: 17, icon: '🧪', text: translate('واکنش شیمیایی با آب‌بندها'), symptom: translate('آب‌بندها باد کرده، ترک خورده') },
        { code: 18, icon: '🟤', text: translate('پلیمریزاسیون'), symptom: translate('لایه پلیمری قهوه‌ای روی سطوح') },
        { code: 19, icon: '💨', text: translate('تبخیر روانکار'), symptom: translate('کاهش مداوم سطح روغن بدون نشتی') }
    ];
    const savedAnswer = appState.getAnswer('3-5') || [];
    container.innerHTML = `
        <div class="question-card">
            <div class="question-header">
                <span class="question-number">${translate('سوال ۳-۵')}</span>
                <span class="question-tag tag-important">${translate('تشخیص مشکل')}</span>
            </div>
            <h2 class="question-title">${translate('مشکل اصلی در کدام بخش است؟')}</h2>
            <p class="question-description">
                ${translate('لطفاً مشکل اصلی سیستم روانکاری را بر اساس مشاهده خود انتخاب کنید. می‌توانید چند گزینه را انتخاب کنید.')}
            </p>
            <div class="problem-grid" id="problem-grid">
                ${problems.map(prob => `
                    <div class="problem-card ${savedAnswer.includes(prob.code) ? 'selected' : ''}" 
                         data-code="${prob.code}">
                        <div class="problem-number">${prob.code}</div>
                        <div class="problem-content">
                            <strong>${prob.icon} ${prob.text}</strong>
                            <small>${prob.symptom}</small>
                        </div>
                    </div>
                `).join('')}
            </div>
            <div class="action-bar">
                <button id="back-btn-3-5" class="btn btn-secondary">${translate('بازگشت')}</button>
                <button id="next-btn-3-5" class="btn btn-primary" ${savedAnswer.length === 0 ? 'disabled' : ''}>${translate('ادامه')}</button>
            </div>
        </div>
    `;
    let selectedProblems = [...savedAnswer];
    const nextBtn = document.getElementById('next-btn-3-5');
    document.getElementById('problem-grid').addEventListener('click', (e) => {
        const card = e.target.closest('.problem-card');
        if (!card) return;
        const code = parseInt(card.dataset.code);
        const index = selectedProblems.indexOf(code);
        if (index === -1) {
            selectedProblems.push(code);
            card.classList.add('selected');
        } else {
            selectedProblems.splice(index, 1);
            card.classList.remove('selected');
        }
        nextBtn.disabled = selectedProblems.length === 0;
    });
    document.getElementById('back-btn-3-5').addEventListener('click', () => {
        window.dispatchEvent(new CustomEvent('navigate', { detail: { question: '3-4' } }));
    });
    nextBtn.addEventListener('click', () => {
        appState.setAnswer('3-5', selectedProblems);
        appState.currentQuestion = '3-5';
        window.dispatchEvent(new CustomEvent('navigate', { detail: { question: '3-6' } }));
    });
}