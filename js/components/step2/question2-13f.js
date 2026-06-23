import appState from '../../state.js';
import router from '../../router.js';
export function renderQuestion2_13f(container) {
    const t = (key, params = {}) => appState.t(key, params);
    const contaminants = appState.getAnswer('2-13') || [];
    const hasParticles = contaminants.includes('2') || contaminants.includes('5');
    if (!hasParticles) {
        goToNext(container);
        return;
    }
    const title = t('step2.question2_13f.title');
    const btnContinue = t('common.btnContinue');
    const btnBack = t('common.btnBack');
    container.innerHTML = `
        <div class="question-card">
            <div class="question-header">
                <span class="question-number">2-13f</span>
                <span class="question-tag tag-conditional">${t('step2.question2_13f.tag')}</span>
            </div>
            <h2 class="question-title">${title}</h2>
            <div class="single-param-container">
                <div class="param-card featured">
                    <span class="param-icon">📐</span>
                    <label for="impact-angle-2-13f">
                        <span class="param-label">${t('step2.question2_13f.angle')}</span>
                    </label>
                    <div class="param-input-wrapper">
                        <input type="number" id="impact-angle-2-13f" class="numeric-input" 
                               placeholder="${t('step2.question2_13f.angle')}" step="any" min="0" max="90">
                        <span class="param-unit">°</span>
                    </div>
                </div>
            </div>
            <div class="action-bar">
                <button id="back-btn-2-13f" class="btn btn-secondary">
                    <svg class="btn-arrow-back" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M9 18l6-6-6-6"/>
                    </svg>
                    ${btnBack}
                </button>
                <button id="next-btn-2-13f" class="btn btn-primary" disabled>
                    ${btnContinue}
                    <svg class="btn-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M9 18l6-6-6-6"/>
                    </svg>
                </button>
            </div>
        </div>
    `;
    const input = container.querySelector('#impact-angle-2-13f');
    const nextBtn = container.querySelector('#next-btn-2-13f');
    const backBtn = container.querySelector('#back-btn-2-13f');
    input.addEventListener('input', () => {
        nextBtn.disabled = input.value === '';
    });
    nextBtn.addEventListener('click', () => {
        appState.setAnswer('2-13f', parseFloat(input.value));
        goToNext(container);
    });
    backBtn.addEventListener('click', () => {
        const path = appState.getAnswer('1-1');
        if (path === '1') {
            window.dispatchEvent(new CustomEvent('navigate', { detail: { question: '2-13e' } }));
        } else {
            const part1 = appState.getAnswer('2-1') || appState.getAnswer('1-2-1');
            if (['13', '14'].includes(part1)) {
                window.dispatchEvent(new CustomEvent('navigate', { detail: { question: '2-13d' } }));
            } else {
                window.dispatchEvent(new CustomEvent('navigate', { detail: { question: '2-13c' } }));
            }
        }
    });
    const saved = appState.getAnswer('2-13f');
    if (saved) {
        input.value = saved;
        nextBtn.disabled = false;
    }
}
function goToNext(container) {
    window.dispatchEvent(new CustomEvent('navigate', { 
        detail: { question: '2-13g' } 
    }));
}