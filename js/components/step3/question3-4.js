import appState from '../../state.js';
import router from '../../router.js';
export function renderQuestion3_4(container) {
    // تابع ساده ترجمه
    const translate = (text) => {
        if (appState.language !== 'en') return text;
        const translations = {
            // عنوان‌ها
            'سوال ۳-۴': 'Question 3-4',
            'عیب‌یابی': 'Troubleshooting',
            'آیا سیستم روانکاری فعلی ایراد دارد؟': 'Does the current lubrication system have any issues?',
            'سیستم روانکاری فعلی:': 'Current lubrication system:',
            'بله، سیستم ایراد دارد': 'Yes, the system has issues',
            'مشکل در عملکرد سیستم روانکاری مشاهده شده است': 'Problem observed in lubrication system performance',
            'خیر، سیستم سالم است': 'No, the system is healthy',
            'سیستم روانکاری بدون مشکل کار می‌کند': 'Lubrication system works without any issues',
            'بازگشت': 'Back',
            'ادامه': 'Continue'
        };
        return translations[text] || text;
    };
    const systemData = appState.getAnswer('3-2') || {};
    const systemName = systemData.systemName || 'نامشخص';
    container.innerHTML = `
        <div class="question-card">
            <div class="question-header">
                <span class="question-number">${translate('سوال ۳-۴')}</span>
                <span class="question-tag tag-important">${translate('عیب‌یابی')}</span>
            </div>
            <h2 class="question-title">${translate('آیا سیستم روانکاری فعلی ایراد دارد؟')}</h2>
            <p class="question-description">
                ${translate('سیستم روانکاری فعلی:')} <strong>${systemName}</strong>
            </p>
            <div class="options-list">
                <label class="option-card">
                    <input type="radio" name="q3-4" value="1">
                    <div class="option-content">
                        <div class="option-icon">⚠️</div>
                        <div class="option-text">
                            <strong>${translate('بله، سیستم ایراد دارد')}</strong>
                            <span>${translate('مشکل در عملکرد سیستم روانکاری مشاهده شده است')}</span>
                        </div>
                    </div>
                    <div class="option-radio"></div>
                </label>
                <label class="option-card">
                    <input type="radio" name="q3-4" value="2">
                    <div class="option-content">
                        <div class="option-icon">✅</div>
                        <div class="option-text">
                            <strong>${translate('خیر، سیستم سالم است')}</strong>
                            <span>${translate('سیستم روانکاری بدون مشکل کار می‌کند')}</span>
                        </div>
                    </div>
                    <div class="option-radio"></div>
                </label>
            </div>
            <div class="action-bar">
                <button id="back-btn-3-4" class="btn btn-secondary">${translate('بازگشت')}</button>
                <button id="next-btn-3-4" class="btn btn-primary" disabled>${translate('ادامه')}</button>
            </div>
        </div>
    `;
    let selectedValue = null;
    const nextBtn = document.getElementById('next-btn-3-4');
    const savedAnswer = appState.getAnswer('3-4');
    if (savedAnswer) {
        const savedRadio = document.querySelector(`input[value="${savedAnswer}"]`);
        if (savedRadio) {
            savedRadio.checked = true;
            selectedValue = savedAnswer;
            nextBtn.disabled = false;
        }
    }
    document.querySelectorAll('input[name="q3-4"]').forEach(radio => {
        radio.addEventListener('change', (e) => {
            selectedValue = e.target.value;
            nextBtn.disabled = false;
        });
    });
    document.getElementById('back-btn-3-4').addEventListener('click', () => {
        window.dispatchEvent(new CustomEvent('navigate', { detail: { question: '3-2' } }));
    });
    nextBtn.addEventListener('click', () => {
        appState.setAnswer('3-4', selectedValue);
        appState.currentQuestion = '3-4';
        const nextQuestion = selectedValue === '1' ? '3-5' : '3-13';
        window.dispatchEvent(new CustomEvent('navigate', { detail: { question: nextQuestion } }));
    });
}