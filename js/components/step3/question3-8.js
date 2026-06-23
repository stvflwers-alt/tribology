import appState from '../../state.js';
import router from '../../router.js';
export function renderQuestion3_8(container) {
    const translate = (text) => {
        if (appState.language !== 'en') return text;
        const translations = {
            'سوال ۳-۸': 'Question 3-8',
            'پایش': 'Monitoring',
            'عیب‌یابی': 'Troubleshooting',
            'وضعیت شیارهای ورودی': 'Inlet Groove Condition',
            'شیارها و ورودی‌های جریان روانکار را بررسی کنید.': 'Check the grooves and lubricant flow inlets.',
            'شیارها و ورودی‌ها سالم و بدون مشکل هستند': 'Grooves and inlets are healthy and without problems',
            'شیارها و ورودی‌ها نیاز به تمیزکاری دارند': 'Grooves and inlets need cleaning',
            'بازگشت': 'Back',
            'ادامه': 'Continue'
        };
        return translations[text] || text;
    };
    const analysisMode = appState.getAnswer('1-1');
    const isMonitoring = analysisMode === '3';
    container.innerHTML = `
        <div class="question-card">
            <div class="question-header">
                <span class="question-number">${translate('سوال ۳-۸')}</span>
                <span class="question-tag ${isMonitoring ? 'tag-info' : 'tag-important'}">
                    ${isMonitoring ? translate('پایش') : translate('عیب‌یابی')}
                </span>
            </div>
            <h2 class="question-title">${translate('وضعیت شیارهای ورودی')}</h2>
            <p class="question-description">
                ${translate('شیارها و ورودی‌های جریان روانکار را بررسی کنید.')}
            </p>
            <div class="options-list">
                <label class="option-card" data-value="1">
                    <input type="radio" name="q3-8" value="1">
                    <div class="option-content">
                        <div class="option-icon">✅</div>
                        <div class="option-text">
                            <strong>${translate('شیارها و ورودی‌ها سالم و بدون مشکل هستند')}</strong>
                        </div>
                    </div>
                    <div class="option-radio"></div>
                </label>
                <label class="option-card" data-value="2">
                    <input type="radio" name="q3-8" value="2">
                    <div class="option-content">
                        <div class="option-icon">🧹</div>
                        <div class="option-text">
                            <strong>${translate('شیارها و ورودی‌ها نیاز به تمیزکاری دارند')}</strong>
                        </div>
                    </div>
                    <div class="option-radio"></div>
                </label>
            </div>
            <div class="action-bar">
                <button id="back-btn-3-8" class="btn btn-secondary">${translate('بازگشت')}</button>
                <button id="next-btn-3-8" class="btn btn-primary" disabled>${translate('ادامه')}</button>
            </div>
        </div>
    `;
    let selectedValue = null;
    const nextBtn = document.getElementById('next-btn-3-8');
    document.querySelectorAll('input[name="q3-8"]').forEach(radio => {
        radio.addEventListener('change', (e) => {
            selectedValue = e.target.value;
            nextBtn.disabled = false;
        });
    });
    document.getElementById('back-btn-3-8').addEventListener('click', () => {
        const systemCode = appState.getAnswer('3-2')?.recommendedSystem;
        if (systemCode === 9) {
            window.dispatchEvent(new CustomEvent('navigate', { detail: { question: '3-7a' } }));
        } else if (systemCode === 5) {
            window.dispatchEvent(new CustomEvent('navigate', { detail: { question: '3-7b' } }));
        } else {
            window.dispatchEvent(new CustomEvent('navigate', { detail: { question: '3-7' } }));
        }
    });
    nextBtn.addEventListener('click', () => {
        appState.setAnswer('3-8', selectedValue);
        appState.currentQuestion = '3-8';
        window.dispatchEvent(new CustomEvent('navigate', { detail: { question: '3-9' } }));
    });
    const savedAnswer = appState.getAnswer('3-8');
    if (savedAnswer) {
        const savedRadio = document.querySelector(`input[value="${savedAnswer}"]`);
        if (savedRadio) {
            savedRadio.checked = true;
            selectedValue = savedAnswer;
            nextBtn.disabled = false;
        }
    }
}