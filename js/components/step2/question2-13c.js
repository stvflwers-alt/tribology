import appState from '../../state.js';
import router from '../../router.js';
export function renderQuestion2_13c(container) {
    const t = (key, params = {}) => appState.t(key, params);
    const motionType = appState.getAnswer('2-9');
    if (motionType !== '5') {
        goToNext(container);
        return;
    }
    const title = t('step2.question2_13c.title');
    const btnContinue = t('common.btnContinue');
    const btnBack = t('common.btnBack');
    container.innerHTML = `
        <div class="question-card">
            <div class="question-header">
                <span class="question-number">2-13c</span>
                <span class="question-tag tag-conditional">${t('step2.question2_13c.tag')}</span>
            </div>
            <h2 class="question-title">${title}</h2>
            <div class="single-param-container">
                <div class="param-card featured">
                    <span class="param-icon">↔️</span>
                    <label for="amplitude-2-13c">
                        <span class="param-label">${t('step2.question2_13c.amplitude')}</span>
                    </label>
                    <div class="param-input-wrapper">
                        <input type="number" id="amplitude-2-13c" class="numeric-input" 
                               placeholder="${t('step2.question2_13c.amplitude')}" step="any" min="0">
                        <span class="param-unit">mm</span>
                    </div>
                </div>
            </div>
            <div class="action-bar">
                <button id="back-btn-2-13c" class="btn btn-secondary">
                    <svg class="btn-arrow-back" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M9 18l6-6-6-6"/>
                    </svg>
                    ${btnBack}
                </button>
                <button id="next-btn-2-13c" class="btn btn-primary" disabled>
                    ${btnContinue}
                    <svg class="btn-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M9 18l6-6-6-6"/>
                    </svg>
                </button>
            </div>
        </div>
    `;
    const input = container.querySelector('#amplitude-2-13c');
    const nextBtn = container.querySelector('#next-btn-2-13c');
    const backBtn = container.querySelector('#back-btn-2-13c');
    input.addEventListener('input', () => {
        nextBtn.disabled = input.value === '';
    });
    nextBtn.addEventListener('click', () => {
        appState.setAnswer('2-13c', parseFloat(input.value));
        goToNext(container);
    });
    backBtn.addEventListener('click', () => {
        window.dispatchEvent(new CustomEvent('navigate', { 
            detail: { question: '2-13b' } 
        }));
    });
    const saved = appState.getAnswer('2-13c');
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
        window.dispatchEvent(new CustomEvent('navigate', { 
            detail: { question: '2-13d' } 
        }));
    }
}