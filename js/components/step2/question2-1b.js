import appState from '../../state.js';
import router from '../../router.js';
export function renderQuestion2_1b(container) {
    const t = (key, params = {}) => appState.t(key, params);
    const title = t('step2.question2_1b.title');
    const btnContinue = t('common.btnContinue');
    const btnBack = t('common.btnBack');
    container.innerHTML = `
        <div class="question-card">
            <div class="question-header">
                <span class="question-number">2-1b</span>
                <span class="question-tag tag-conditional">${t('step2.question2_1b.tag')}</span>
            </div>
            <h2 class="question-title">${title}</h2>
            <div class="numeric-inputs-container">
                <div class="input-group">
                    <label for="temp-2-1b">
                        <span class="input-label">${t('step2.question2_1b.temperature')}</span>
                        <span class="input-unit">°C</span>
                    </label>
                    <input type="number" id="temp-2-1b" class="numeric-input" placeholder="دمای فرآیند" step="any">
                </div>
                <div class="input-group">
                    <label for="speed-2-1b">
                        <span class="input-label">${t('step2.question2_1b.speed')}</span>
                        <span class="input-unit">m/s</span>
                    </label>
                    <input type="number" id="speed-2-1b" class="numeric-input" placeholder="سرعت نسبی" step="any" min="0">
                </div>
            </div>
            <div class="action-bar">
                <button id="back-btn-2-1b" class="btn btn-secondary">
                    <svg class="btn-arrow-back" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M9 18l6-6-6-6"/>
                    </svg>
                    ${btnBack}
                </button>
                <button id="next-btn-2-1b" class="btn btn-primary" disabled>
                    ${btnContinue}
                    <svg class="btn-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M9 18l6-6-6-6"/>
                    </svg>
                </button>
            </div>
        </div>
    `;
    const tempInput = container.querySelector('#temp-2-1b');
    const speedInput = container.querySelector('#speed-2-1b');
    const nextBtn = container.querySelector('#next-btn-2-1b');
    const backBtn = container.querySelector('#back-btn-2-1b');
    function checkInputs() {
        if (tempInput.value !== '' && speedInput.value !== '') {
            nextBtn.disabled = false;
        } else {
            nextBtn.disabled = true;
        }
    }
    tempInput.addEventListener('input', checkInputs);
    speedInput.addEventListener('input', checkInputs);
    nextBtn.addEventListener('click', () => {
        const data = {
            temperature: parseFloat(tempInput.value),
            speed: parseFloat(speedInput.value)
        };
        appState.setAnswer('2-1b', data);
        window.dispatchEvent(new CustomEvent('navigate', { 
            detail: { question: '2-2' } 
        }));
    });
    backBtn.addEventListener('click', () => {
        window.dispatchEvent(new CustomEvent('navigate', { 
            detail: { question: '2-1' } 
        }));
    });
    const saved = appState.getAnswer('2-1b');
    if (saved) {
        if (saved.temperature) tempInput.value = saved.temperature;
        if (saved.speed) speedInput.value = saved.speed;
        checkInputs();
    }
}