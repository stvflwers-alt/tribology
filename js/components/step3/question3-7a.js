import appState from '../../state.js';
import router from '../../router.js';
export function renderQuestion3_7a(container) {
    const translate = (text) => {
        if (appState.language !== 'en') return text;
        const translations = {
            'سوال ۳-۷ (الف)': 'Question 3-7a',
            'شرطی': 'Conditional',
            'نوع سیستم گریس‌کاری': 'Grease System Type',
            'گریس‌کاری دستی (Grease nipple)': 'Manual Greasing (Grease nipple)',
            'تزریق دستی با گریس‌پمپ در فواصل منظم': 'Manual injection with grease gun at regular intervals',
            'گریس‌کاری متمرکز (Centralized)': 'Centralized Greasing',
            'سیستم اتوماتیک با پمپ مرکزی و توزیع‌کننده‌های پیشرونده': 'Automatic system with central pump and progressive distributors',
            'بازگشت': 'Back',
            'ادامه': 'Continue'
        };
        return translations[text] || text;
    };
    container.innerHTML = `
        <div class="question-card">
            <div class="question-header">
                <span class="question-number">${translate('سوال ۳-۷ (الف)')}</span>
                <span class="question-tag tag-conditional">${translate('شرطی')}</span>
            </div>
            <h2 class="question-title">${translate('نوع سیستم گریس‌کاری')}</h2>
            <div class="options-list">
                <label class="option-card" data-value="1">
                    <input type="radio" name="q3-7a" value="1">
                    <div class="option-content">
                        <div class="option-icon">🔧</div>
                        <div class="option-text">
                            <strong>${translate('گریس‌کاری دستی (Grease nipple)')}</strong>
                            <span>${translate('تزریق دستی با گریس‌پمپ در فواصل منظم')}</span>
                        </div>
                    </div>
                    <div class="option-radio"></div>
                </label>
                <label class="option-card" data-value="2">
                    <input type="radio" name="q3-7a" value="2">
                    <div class="option-content">
                        <div class="option-icon">⚙️</div>
                        <div class="option-text">
                            <strong>${translate('گریس‌کاری متمرکز (Centralized)')}</strong>
                            <span>${translate('سیستم اتوماتیک با پمپ مرکزی و توزیع‌کننده‌های پیشرونده')}</span>
                        </div>
                    </div>
                    <div class="option-radio"></div>
                </label>
            </div>
            <div class="action-bar">
                <button id="back-btn-3-7a" class="btn btn-secondary">${translate('بازگشت')}</button>
                <button id="next-btn-3-7a" class="btn btn-primary" disabled>${translate('ادامه')}</button>
            </div>
        </div>
    `;
    let selectedValue = null;
    const nextBtn = document.getElementById('next-btn-3-7a');
    document.querySelectorAll('input[name="q3-7a"]').forEach(radio => {
        radio.addEventListener('change', (e) => {
            selectedValue = e.target.value;
            nextBtn.disabled = false;
        });
    });
    document.getElementById('back-btn-3-7a').addEventListener('click', () => {
        window.dispatchEvent(new CustomEvent('navigate', { detail: { question: '3-7' } }));
    });
    nextBtn.addEventListener('click', () => {
        appState.setAnswer('3-7a', selectedValue);
        appState.currentQuestion = '3-7a';
        const nextQuestion = router.getNextQuestion('3-7a', null);
        if (nextQuestion) {
            window.dispatchEvent(new CustomEvent('navigate', { detail: { question: nextQuestion } }));
        }
    });
    const savedAnswer = appState.getAnswer('3-7a');
    if (savedAnswer) {
        const savedRadio = document.querySelector(`input[value="${savedAnswer}"]`);
        if (savedRadio) {
            savedRadio.checked = true;
            selectedValue = savedAnswer;
            nextBtn.disabled = false;
        }
    }
}