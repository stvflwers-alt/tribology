import appState from '../../state.js';
import router from '../../router.js';
export function renderQuestion3_9(container) {
    const translate = (text) => {
        if (appState.language !== 'en') return text;
        const translations = {
            'سوال ۳-۹': 'Question 3-9',
            'فیلترها': 'Filters',
            'آیا فیلترها سالم و بای‌پس بسته است؟': 'Are filters healthy and bypass closed?',
            'وضعیت فیلترها و بای‌پس را بررسی کنید.': 'Check the condition of filters and bypass.',
            'فیلترها سالم و بای‌پس بسته است': 'Filters are healthy and bypass is closed',
            'اختلاف فشار نرمال، روغن تمیز': 'Normal pressure drop, clean oil',
            'فیلترها گرفته شده': 'Filters are clogged',
            'اختلاف فشار بالا، بای‌پس باز': 'High pressure drop, bypass open',
            'سیستم فیلتر ندارد': 'No filter system',
            'بازگشت': 'Back',
            'ادامه': 'Continue'
        };
        return translations[text] || text;
    };
    container.innerHTML = `
        <div class="question-card">
            <div class="question-header">
                <span class="question-number">${translate('سوال ۳-۹')}</span>
                <span class="question-tag tag-important">${translate('فیلترها')}</span>
            </div>
            <h2 class="question-title">${translate('آیا فیلترها سالم و بای‌پس بسته است؟')}</h2>
            <p class="question-description">
                ${translate('وضعیت فیلترها و بای‌پس را بررسی کنید.')}
            </p>
            <div class="options-list">
                <label class="option-card" data-value="1">
                    <input type="radio" name="q3-9" value="1">
                    <div class="option-content">
                        <div class="option-icon">✅</div>
                        <div class="option-text">
                            <strong>${translate('فیلترها سالم و بای‌پس بسته است')}</strong>
                            <span>${translate('اختلاف فشار نرمال، روغن تمیز')}</span>
                        </div>
                    </div>
                    <div class="option-radio"></div>
                </label>
                <label class="option-card" data-value="2">
                    <input type="radio" name="q3-9" value="2">
                    <div class="option-content">
                        <div class="option-icon">⚠️</div>
                        <div class="option-text">
                            <strong>${translate('فیلترها گرفته شده')}</strong>
                            <span>${translate('اختلاف فشار بالا، بای‌پس باز')}</span>
                        </div>
                    </div>
                    <div class="option-radio"></div>
                </label>
                <label class="option-card" data-value="3">
                    <input type="radio" name="q3-9" value="3">
                    <div class="option-content">
                        <div class="option-icon">❌</div>
                        <div class="option-text">
                            <strong>${translate('سیستم فیلتر ندارد')}</strong>
                        </div>
                    </div>
                    <div class="option-radio"></div>
                </label>
            </div>
            <div class="action-bar">
                <button id="back-btn-3-9" class="btn btn-secondary">${translate('بازگشت')}</button>
                <button id="next-btn-3-9" class="btn btn-primary" disabled>${translate('ادامه')}</button>
            </div>
        </div>
    `;
    let selectedValue = null;
    const nextBtn = document.getElementById('next-btn-3-9');
    document.querySelectorAll('input[name="q3-9"]').forEach(radio => {
        radio.addEventListener('change', (e) => {
            selectedValue = e.target.value;
            nextBtn.disabled = false;
        });
    });
    document.getElementById('back-btn-3-9').addEventListener('click', () => {
        window.dispatchEvent(new CustomEvent('navigate', { detail: { question: '3-8' } }));
    });
    nextBtn.addEventListener('click', () => {
        appState.setAnswer('3-9', selectedValue);
        appState.currentQuestion = '3-9';
        window.dispatchEvent(new CustomEvent('navigate', { detail: { question: '3-10' } }));
    });
    const savedAnswer = appState.getAnswer('3-9');
    if (savedAnswer) {
        const savedRadio = document.querySelector(`input[value="${savedAnswer}"]`);
        if (savedRadio) {
            savedRadio.checked = true;
            selectedValue = savedAnswer;
            nextBtn.disabled = false;
        }
    }
}