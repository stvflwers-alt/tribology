import appState from '../../state.js';
import router from '../../router.js';
export function renderQuestion2_13i(container) {
    const t = (key, params = {}) => appState.t(key, params);
    const part1 = appState.getAnswer('2-1') || appState.getAnswer('1-2-1');
    if (part1 !== '2') {
        goToNext(container);
        return;
    }
    const title = t('step2.question2_13i.title') || 'سفتی تکیه‌گاه شفت';
    const btnContinue = t('common.btnContinue');
    const btnBack = t('common.btnBack');
    container.innerHTML = `
        <div class="question-card">
            <div class="question-header">
                <span class="question-number">2-13i</span>
                <span class="question-tag tag-conditional">${t('step2.question2_13i.tag') || 'پارامتر شفت'}</span>
            </div>
            <h2 class="question-title">${title}</h2>
            <p class="question-description">
                ${t('step2.question2_13i.description') || 'سفتی تکیه‌گاه شفت را وارد کنید.'}
            </p>
            <div class="single-param-container">
                <div class="param-card featured">
                    <div class="param-header">
                        <span class="param-icon">🔩</span>
                        <span class="param-symbol">k</span>
                        <span class="param-name">${t('step2.question2_13i.stiffness') || 'سفتی تکیه‌گاه'}</span>
                    </div>
                    <div class="param-input-wrapper">
                        <input 
                            type="number" 
                            id="shaft-stiffness-2-13i" 
                            class="numeric-input" 
                            placeholder="${t('step2.question2_13i.placeholder') || 'سفتی تکیه‌گاه'}"
                            step="any"
                            min="0"
                        >
                        <span class="param-unit">N/m</span>
                    </div>
                </div>
            </div>
            <div class="action-bar">
                <button id="back-btn-2-13i" class="btn btn-secondary">
                    <svg class="btn-arrow-back" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M9 18l6-6-6-6"/>
                    </svg>
                    ${btnBack}
                </button>
                <button id="next-btn-2-13i" class="btn btn-primary" disabled>
                    ${btnContinue}
                    <svg class="btn-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M9 18l6-6-6-6"/>
                    </svg>
                </button>
            </div>
        </div>
    `;
    const input = container.querySelector('#shaft-stiffness-2-13i');
    const nextBtn = container.querySelector('#next-btn-2-13i');
    const backBtn = container.querySelector('#back-btn-2-13i');
    input.addEventListener('input', () => {
        nextBtn.disabled = input.value === '' || parseFloat(input.value) < 0;
    });
    nextBtn.addEventListener('click', () => {
        const stiffnessValue = parseFloat(input.value);
        appState.setAnswer('2-13i', stiffnessValue);
        appState.setAnswer('shaft_support_stiffness', stiffnessValue);
        goToNext(container);
    });
    backBtn.addEventListener('click', () => {
        window.dispatchEvent(new CustomEvent('navigate', { 
            detail: { question: '2-13h' } 
        }));
    });
    const saved = appState.getAnswer('2-13i');
    if (saved !== null && saved !== undefined) {
        input.value = saved;
        nextBtn.disabled = false;
    }
}
function goToNext(container) {
    window.dispatchEvent(new CustomEvent('navigate', { 
        detail: { question: '2-14' } 
    }));
}