import appState from '../../state.js';
import router from '../../router.js';
export function renderQuestion2_13h(container) {
    const t = (key, params = {}) => appState.t(key, params);
    const part1 = appState.getAnswer('2-1') || appState.getAnswer('1-2-1');
    if (part1 !== '2') {
        goToNext(container);
        return;
    }
    const title = t('step2.question2_13h.title') || 'جرم ارتعاشی شفت';
    const btnContinue = t('common.btnContinue');
    const btnBack = t('common.btnBack');
    container.innerHTML = `
        <div class="question-card">
            <div class="question-header">
                <span class="question-number">2-13h</span>
                <span class="question-tag tag-conditional">${t('step2.question2_13h.tag') || 'پارامتر شفت'}</span>
            </div>
            <h2 class="question-title">${title}</h2>
            <p class="question-description">
                ${t('step2.question2_13h.description') || 'جرم ارتعاشی مؤثر شفت را وارد کنید. این پارامتر برای تحلیل دینامیکی و ارتعاشات مورد نیاز است.'}
            </p>
            <div class="single-param-container">
                <div class="param-card featured">
                    <div class="param-header">
                        <span class="param-icon">⚖️</span>
                        <span class="param-symbol">m_shaft</span>
                        <span class="param-name">${t('step2.question2_13h.mass') || 'جرم ارتعاشی شفت'}</span>
                    </div>
                    <div class="param-input-wrapper">
                        <input 
                            type="number" 
                            id="shaft-mass-2-13h" 
                            class="numeric-input" 
                            placeholder="${t('step2.question2_13h.placeholder') || 'جرم شفت'}"
                            step="any"
                            min="0"
                        >
                        <span class="param-unit">kg</span>
                    </div>
                </div>
            </div>
            <div class="action-bar">
                <button id="back-btn-2-13h" class="btn btn-secondary">
                    <svg class="btn-arrow-back" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M9 18l6-6-6-6"/>
                    </svg>
                    ${btnBack}
                </button>
                <button id="next-btn-2-13h" class="btn btn-primary" disabled>
                    ${btnContinue}
                    <svg class="btn-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M9 18l6-6-6-6"/>
                    </svg>
                </button>
            </div>
        </div>
    `;
    const input = container.querySelector('#shaft-mass-2-13h');
    const nextBtn = container.querySelector('#next-btn-2-13h');
    const backBtn = container.querySelector('#back-btn-2-13h');
    input.addEventListener('input', () => {
        nextBtn.disabled = input.value === '' || parseFloat(input.value) < 0;
    });
    nextBtn.addEventListener('click', () => {
        const massValue = parseFloat(input.value);
        appState.setAnswer('2-13h', massValue);
        appState.setAnswer('shaft_mass', massValue);
        goToNext(container);
    });
    backBtn.addEventListener('click', () => {
        goBack(container);
    });
    const saved = appState.getAnswer('2-13h');
    if (saved !== null && saved !== undefined) {
        input.value = saved;
        nextBtn.disabled = false;
    }
}
function goToNext(container) {
    window.dispatchEvent(new CustomEvent('navigate', { 
        detail: { question: '2-13i' } 
    }));
}
function goBack(container) {
    const contaminants = appState.getAnswer('2-13') || [];
    const hasParticles = contaminants.includes('2') || contaminants.includes('5');
    if (hasParticles) {
        window.dispatchEvent(new CustomEvent('navigate', { 
            detail: { question: '2-13g' } 
        }));
    } else {
        const path = appState.getAnswer('1-1');
        if (path === '1') {
            window.dispatchEvent(new CustomEvent('navigate', { 
                detail: { question: '2-13e' } 
            }));
        } else {
            const part1 = appState.getAnswer('2-1') || appState.getAnswer('1-2-1');
            if (['13', '14'].includes(part1)) {
                window.dispatchEvent(new CustomEvent('navigate', { 
                    detail: { question: '2-13d' } 
                }));
            } else {
                const motionType = appState.getAnswer('2-9');
                if (motionType === '5') {
                    window.dispatchEvent(new CustomEvent('navigate', { 
                        detail: { question: '2-13c' } 
                    }));
                } else if (motionType === '6') {
                    window.dispatchEvent(new CustomEvent('navigate', { 
                        detail: { question: '2-13b' } 
                    }));
                } else {
                    window.dispatchEvent(new CustomEvent('navigate', { 
                        detail: { question: '2-13' } 
                    }));
                }
            }
        }
    }
}