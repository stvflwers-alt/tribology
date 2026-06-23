import appState from '../../state.js';
import router from '../../router.js';
export function renderQuestion2_13g(container) {
    const t = (key, params = {}) => appState.t(key, params);
    const contaminants = appState.getAnswer('2-13') || [];
    const hasParticles = contaminants.includes('2') || contaminants.includes('5');
    if (!hasParticles) {
        goToNext(container);
        return;
    }
    const title = t('step2.question2_13g.title');
    const btnContinue = t('common.btnContinue');
    const btnBack = t('common.btnBack');
    container.innerHTML = `
        <div class="question-card">
            <div class="question-header">
                <span class="question-number">2-13g</span>
                <span class="question-tag tag-conditional">${t('step2.question2_13g.tag')}</span>
            </div>
            <h2 class="question-title">${title}</h2>
            <div class="single-param-container">
                <div class="param-card featured">
                    <span class="param-icon">🌊</span>
                    <label for="particle-flux-2-13g">
                        <span class="param-label">${t('step2.question2_13g.flux')}</span>
                    </label>
                    <div class="param-input-wrapper">
                        <input type="number" id="particle-flux-2-13g" class="numeric-input" 
                               placeholder="${t('step2.question2_13g.flux')}" step="any" min="0">
                        <span class="param-unit">kg/m²·s</span>
                    </div>
                </div>
            </div>
            <div class="action-bar">
                <button id="back-btn-2-13g" class="btn btn-secondary">
                    <svg class="btn-arrow-back" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M9 18l6-6-6-6"/>
                    </svg>
                    ${btnBack}
                </button>
                <button id="next-btn-2-13g" class="btn btn-primary" disabled>
                    ${btnContinue}
                    <svg class="btn-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M9 18l6-6-6-6"/>
                    </svg>
                </button>
            </div>
        </div>
    `;
    const input = container.querySelector('#particle-flux-2-13g');
    const nextBtn = container.querySelector('#next-btn-2-13g');
    const backBtn = container.querySelector('#back-btn-2-13g');
    input.addEventListener('input', () => {
        nextBtn.disabled = input.value === '';
    });
    nextBtn.addEventListener('click', () => {
        appState.setAnswer('2-13g', parseFloat(input.value));
        goToNext(container);
    });
    backBtn.addEventListener('click', () => {
        window.dispatchEvent(new CustomEvent('navigate', { 
            detail: { question: '2-13f' } 
        }));
    });
    const saved = appState.getAnswer('2-13g');
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
            detail: { question: '2-14' } 
        }));
    }
}