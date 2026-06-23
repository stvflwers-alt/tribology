import appState from '../../state.js';
import router from '../../router.js';
export function renderQuestion2_13d(container) {
    const t = (key, params = {}) => appState.t(key, params);
    const part1 = appState.getAnswer('2-1') || appState.getAnswer('1-2-1');
    if (!['13', '14'].includes(part1)) {
        goToNext(container);
        return;
    }
    const title = t('step2.question2_13d.title');
    const btnContinue = t('common.btnContinue');
    const btnBack = t('common.btnBack');
    container.innerHTML = `
        <div class="question-card">
            <div class="question-header">
                <span class="question-number">2-13d</span>
                <span class="question-tag tag-conditional">${t('step2.question2_13d.tag')}</span>
            </div>
            <h2 class="question-title">${title}</h2>
            <div class="single-param-container">
                <div class="param-card featured">
                    <span class="param-icon">💨</span>
                    <label for="pressure-2-13d">
                        <span class="param-label">${t('step2.question2_13d.pressure')}</span>
                    </label>
                    <div class="param-input-wrapper">
                        <input type="number" id="pressure-2-13d" class="numeric-input" 
                               placeholder="${t('step2.question2_13d.pressure')}" step="any">
                        <span class="param-unit">bar</span>
                    </div>
                </div>
            </div>
            <div class="action-bar">
                <button id="back-btn-2-13d" class="btn btn-secondary">
                    <svg class="btn-arrow-back" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M9 18l6-6-6-6"/>
                    </svg>
                    ${btnBack}
                </button>
                <button id="next-btn-2-13d" class="btn btn-primary" disabled>
                    ${btnContinue}
                    <svg class="btn-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M9 18l6-6-6-6"/>
                    </svg>
                </button>
            </div>
        </div>
    `;
    const input = container.querySelector('#pressure-2-13d');
    const nextBtn = container.querySelector('#next-btn-2-13d');
    const backBtn = container.querySelector('#back-btn-2-13d');
    input.addEventListener('input', () => {
        nextBtn.disabled = input.value === '';
    });
    nextBtn.addEventListener('click', () => {
        appState.setAnswer('2-13d', parseFloat(input.value));
        goToNext(container);
    });
    backBtn.addEventListener('click', () => {
        const motionType = appState.getAnswer('2-9');
        if (motionType === '5') {
            window.dispatchEvent(new CustomEvent('navigate', { detail: { question: '2-13c' } }));
        } else if (motionType === '6') {
            window.dispatchEvent(new CustomEvent('navigate', { detail: { question: '2-13b' } }));
        } else {
            window.dispatchEvent(new CustomEvent('navigate', { detail: { question: '2-13' } }));
        }
    });
    const saved = appState.getAnswer('2-13d');
    if (saved) {
        input.value = saved;
        nextBtn.disabled = false;
    }
}
function goToNext(container) {
    const part1 = appState.getAnswer('2-1') || appState.getAnswer('1-2-1');
    if (part1 === '2') {
        window.dispatchEvent(new CustomEvent('navigate', { 
            detail: { question: '2-13h' } 
        }));
    } else {
        const path = appState.getAnswer('1-1');
        let nextQ = path === '1' ? '2-13e' : '2-13f';
        window.dispatchEvent(new CustomEvent('navigate', { 
            detail: { question: nextQ } 
        }));
    }
}