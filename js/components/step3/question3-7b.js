import appState from '../../state.js';
import router from '../../router.js';
export function renderQuestion3_7b(container) {
    const translate = (text) => {
        if (appState.language !== 'en') return text;
        const translations = {
            'سوال ۳-۷ (ب)': 'Question 3-7b',
            'شرطی': 'Conditional',
            'روش اعمال روانکار جامد': 'Solid Lubricant Application Method',
            'اسپری (Spraying)': 'Spraying',
            'ساده، کم‌هزینه، فیلم ۳-۱۰ µm': 'Simple, low cost, film 3-10 µm',
            'براش (Brushing)': 'Brushing',
            'تعمیرات موضعی، کنترل دستی': 'Local repairs, manual control',
            'غوطه‌وری (Dip coating)': 'Dip coating',
            'قطعات کوچک و ساده': 'Small and simple parts',
            'مالش (Burnishing)': 'Burnishing',
            'موقتی، چسبندگی ضعیف': 'Temporary, weak adhesion',
            'اسپاتری‌نگ (Sputtering)': 'Sputtering',
            'دقت بالا، نیاز به خلأ': 'High precision, requires vacuum',
            'یون-پلیتینگ (Ion-plating)': 'Ion-plating',
            'چسبندگی عالی، هوافضا': 'Excellent adhesion, aerospace',
            'سنتی': 'Traditional',
            'پیشرفته': 'Advanced',
            'بازگشت': 'Back',
            'ادامه': 'Continue'
        };
        return translations[text] || text;
    };
    const methods = [
        { code: 1, icon: '🎨', name: translate('اسپری (Spraying)'), desc: translate('ساده، کم‌هزینه، فیلم ۳-۱۰ µm'), type: translate('سنتی') },
        { code: 2, icon: '🖌️', name: translate('براش (Brushing)'), desc: translate('تعمیرات موضعی، کنترل دستی'), type: translate('سنتی') },
        { code: 3, icon: '🛢️', name: translate('غوطه‌وری (Dip coating)'), desc: translate('قطعات کوچک و ساده'), type: translate('سنتی') },
        { code: 4, icon: '💪', name: translate('مالش (Burnishing)'), desc: translate('موقتی، چسبندگی ضعیف'), type: translate('سنتی') },
        { code: 5, icon: '⚡', name: translate('اسپاتری‌نگ (Sputtering)'), desc: translate('دقت بالا، نیاز به خلأ'), type: translate('پیشرفته') },
        { code: 6, icon: '🚀', name: translate('یون-پلیتینگ (Ion-plating)'), desc: translate('چسبندگی عالی، هوافضا'), type: translate('پیشرفته') }
    ];
    container.innerHTML = `
        <div class="question-card">
            <div class="question-header">
                <span class="question-number">${translate('سوال ۳-۷ (ب)')}</span>
                <span class="question-tag tag-conditional">${translate('شرطی')}</span>
            </div>
            <h2 class="question-title">${translate('روش اعمال روانکار جامد')}</h2>
            <div class="options-list">
                ${methods.map(method => `
                    <label class="option-card" data-value="${method.code}">
                        <input type="radio" name="q3-7b" value="${method.code}">
                        <div class="option-content">
                            <div class="option-icon">${method.icon}</div>
                            <div class="option-text">
                                <strong>${method.name}</strong>
                                <span>${method.desc} | ${method.type}</span>
                            </div>
                        </div>
                        <div class="option-radio"></div>
                    </label>
                `).join('')}
            </div>
            <div class="action-bar">
                <button id="back-btn-3-7b" class="btn btn-secondary">${translate('بازگشت')}</button>
                <button id="next-btn-3-7b" class="btn btn-primary" disabled>${translate('ادامه')}</button>
            </div>
        </div>
    `;
    let selectedValue = null;
    const nextBtn = document.getElementById('next-btn-3-7b');
    document.querySelectorAll('input[name="q3-7b"]').forEach(radio => {
        radio.addEventListener('change', (e) => {
            selectedValue = e.target.value;
            nextBtn.disabled = false;
        });
    });
    document.getElementById('back-btn-3-7b').addEventListener('click', () => {
        window.dispatchEvent(new CustomEvent('navigate', { detail: { question: '3-7' } }));
    });
    nextBtn.addEventListener('click', () => {
        appState.setAnswer('3-7b', selectedValue);
        appState.currentQuestion = '3-7b';
        const nextQuestion = router.getNextQuestion('3-7b', null);
        if (nextQuestion) {
            window.dispatchEvent(new CustomEvent('navigate', { detail: { question: nextQuestion } }));
        }
    });
    const savedAnswer = appState.getAnswer('3-7b');
    if (savedAnswer) {
        const savedRadio = document.querySelector(`input[value="${savedAnswer}"]`);
        if (savedRadio) {
            savedRadio.checked = true;
            selectedValue = savedAnswer;
            nextBtn.disabled = false;
        }
    }
}