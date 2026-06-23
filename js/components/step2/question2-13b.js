import appState from '../../state.js';
import router from '../../router.js';
export function renderQuestion2_13b(container) {
    const t = (key, params = {}) => appState.t(key, params);
    const motionType = appState.getAnswer('2-9');
    if (motionType !== '5' && motionType !== '6') {
        goToNext(container);
        return;
    }
    const title = t('step2.question2_13b.title');
    const btnContinue = t('common.btnContinue');
    const btnBack = t('common.btnBack');
    container.innerHTML = `
        <div class="question-card">
            <div class="question-header">
                <span class="question-number">2-13b</span>
                <span class="question-tag tag-conditional">${t('step2.question2_13b.tag')}</span>
            </div>
            <h2 class="question-title">${title}</h2>
            <p class="question-description">${t('step2.question2_13b.description')}</p>
            <div class="single-param-container">
                <div class="param-card featured">
                    <span class="param-icon">〰️</span>
                    <label for="frequency-2-13b">
                        <span class="param-label">${t('step2.question2_13b.frequency')}</span>
                    </label>
                    <div class="param-input-wrapper">
                        <input type="number" id="frequency-2-13b" class="numeric-input" 
                               placeholder="${t('step2.question2_13b.frequency')}" step="any" min="0">
                        <span class="param-unit">Hz</span>
                    </div>
                </div>
            </div>
            <div class="action-bar">
                <button id="back-btn-2-13b" class="btn btn-secondary">
                    <svg class="btn-arrow-back" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M9 18l6-6-6-6"/>
                    </svg>
                    ${btnBack}
                </button>
                <button id="next-btn-2-13b" class="btn btn-primary" disabled>
                    ${btnContinue}
                    <svg class="btn-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M9 18l6-6-6-6"/>
                    </svg>
                </button>
            </div>
        </div>
    `;
    const input = container.querySelector('#frequency-2-13b');
    const nextBtn = container.querySelector('#next-btn-2-13b');
    const backBtn = container.querySelector('#back-btn-2-13b');
    input.addEventListener('input', () => {
        nextBtn.disabled = input.value === '';
    });
    nextBtn.addEventListener('click', () => {
        appState.setAnswer('2-13b', parseFloat(input.value));
        goToNext(container);
    });
    backBtn.addEventListener('click', () => {
        goToPrevious(container);
    });
    const saved = appState.getAnswer('2-13b');
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
        const motionType = appState.getAnswer('2-9');
        let nextQ = '2-13c';
        if (motionType !== '5') {
            nextQ = '2-13d';
        }
        window.dispatchEvent(new CustomEvent('navigate', { 
            detail: { question: nextQ } 
        }));
    }
}
function goToPrevious(container) {
    const contaminants = appState.getAnswer('2-13') || [];
    const hasParticles = contaminants.includes('2') || contaminants.includes('5');
    const path = appState.getAnswer('1-1');
    if ((path === '2' || path === '3') && hasParticles) {
        window.dispatchEvent(new CustomEvent('navigate', { detail: { question: '2-13a' } }));
    } else {
        window.dispatchEvent(new CustomEvent('navigate', { detail: { question: '2-13' } }));
    }
}