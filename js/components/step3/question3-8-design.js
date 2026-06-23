import appState from '../../state.js';
import router from '../../router.js';
export function renderQuestion3_8_design(container) {
    const translate = (text) => {
        if (appState.language !== 'en') return text;
        const translations = {
            'سوال ۳-۸ (طراحی)': 'Question 3-8 (Design)',
            'طراحی شیار ورودی': 'Inlet Groove Design',
            'توصیه‌های طراحی شیار ورودی': 'Inlet Groove Design Recommendations',
            'پارامترهای طراحی شیار': 'Groove Design Parameters',
            'نوع شیار': 'Groove Type',
            'زاویه کوتاه': 'Short angle',
            'موقعیت': 'Position',
            'نسبت به خط بار': 'relative to load line',
            'طول شیار': 'Groove Length',
            'لب‌ها': 'Lips / Edges',
            'توپر (Recessed)': 'Recessed',
            'بازگشت': 'Back',
            'ادامه': 'Continue'
        };
        return translations[text] || text;
    };
    container.innerHTML = `
        <div class="question-card">
            <div class="question-header">
                <span class="question-number">${translate('سوال ۳-۸ (طراحی)')}</span>
                <span class="question-tag tag-standard">${translate('طراحی شیار ورودی')}</span>
            </div>
            <h2 class="question-title">${translate('توصیه‌های طراحی شیار ورودی')}</h2>
            <div class="result-panel">
                <h3>📐 ${translate('پارامترهای طراحی شیار')}</h3>
                <div class="result-grid">
                    <div class="result-item">
                        <span class="label">${translate('نوع شیار')}</span>
                        <span class="value">${translate('زاویه کوتاه')}</span>
                    </div>
                    <div class="result-item">
                        <span class="label">${translate('موقعیت')}</span>
                        <span class="value">90° ${translate('نسبت به خط بار')}</span>
                    </div>
                    <div class="result-item">
                        <span class="label">${translate('طول شیار')}</span>
                        <span class="value">≈ L/2</span>
                    </div>
                    <div class="result-item">
                        <span class="label">${translate('لب‌ها')}</span>
                        <span class="value">${translate('توپر (Recessed)')}</span>
                    </div>
                </div>
            </div>
            <div class="action-bar">
                <button id="back-btn-3-8-design" class="btn btn-secondary">${translate('بازگشت')}</button>
                <button id="next-btn-3-8-design" class="btn btn-primary">${translate('ادامه')}</button>
            </div>
        </div>
    `;
    document.getElementById('back-btn-3-8-design').addEventListener('click', () => {
        const systemCode = appState.getAnswer('3-2')?.recommendedSystem;
        if (systemCode === 9) {
            window.dispatchEvent(new CustomEvent('navigate', { detail: { question: '3-7a' } }));
        } else if (systemCode === 5) {
            window.dispatchEvent(new CustomEvent('navigate', { detail: { question: '3-7b' } }));
        } else {
            window.dispatchEvent(new CustomEvent('navigate', { detail: { question: '3-7' } }));
        }
    });
    document.getElementById('next-btn-3-8-design').addEventListener('click', () => {
        appState.currentQuestion = '3-8-design';
        window.dispatchEvent(new CustomEvent('navigate', { detail: { question: '3-13' } }));
    });
}