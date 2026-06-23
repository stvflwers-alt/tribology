import appState from '../../state.js';
export function renderQuestion1_3_1b(container) {
    const t = (key, params = {}) => appState.t(key, params);
    const partAnswer = appState.getAnswer('1-3-1');
    const partNames = {
        '8': t('step1.question1_3_1.options.7.title'),
        '9': t('step1.question1_3_1.options.8.title'),
        '11': t('step1.question1_3_1.options.10.title')
    };
    const title = t('step1.question1_2_1b.title');
    const description = t('step1.question1_2_1b.description', { contactType: partNames[partAnswer] || '' });
    const tag = t('step1.question1_2_1b.tag');
    const btnContinue = t('common.btnContinue');
    const btnBack = t('common.btnBack');
    const tempLabel = t('step1.question1_2_1b.temperature.label');
    const tempPlaceholder = t('step1.question1_2_1b.temperature.placeholder');
    const speedLabel = t('step1.question1_2_1b.speed.label');
    const speedPlaceholder = t('step1.question1_2_1b.speed.placeholder');
    const lubLabel = t('step1.question1_2_1b.lubrication.label');
    const lubPlaceholder = t('step1.question1_2_1b.lubrication.placeholder');
    const validationMsg = t('step1.question1_2_1b.validationMessage');
    container.innerHTML = `
        <div class="question-card">
            <div class="question-header">
                <span class="question-number">1-3-1-b</span>
                <span class="question-tag tag-path">${tag}</span>
            </div>
            <h2 class="question-title">${title}</h2>
            <p class="question-description">${description}</p>
            <div class="conditional-form">
                <div class="form-group">
                    <label class="form-label" for="process-temp-ts">${tempLabel}</label>
                    <input type="number" id="process-temp-ts" class="form-input" placeholder="${tempPlaceholder}" step="0.1">
                </div>
                <div class="form-group">
                    <label class="form-label" for="relative-speed-ts">${speedLabel}</label>
                    <input type="number" id="relative-speed-ts" class="form-input" placeholder="${speedPlaceholder}" step="0.01">
                </div>
                <div class="form-group">
                    <label class="form-label" for="lubrication-type-tsb">${lubLabel}</label>
                    <select id="lubrication-type-tsb" class="form-select">
                        <option value="">${lubPlaceholder}</option>
                        <option value="1">${t('step1.question1_2_1b.lubrication.options.0')}</option>
                        <option value="2">${t('step1.question1_2_1b.lubrication.options.1')}</option>
                        <option value="3">${t('step1.question1_2_1b.lubrication.options.2')}</option>
                        <option value="4">${t('step1.question1_2_1b.lubrication.options.3')}</option>
                    </select>
                </div>
            </div>
            <div class="feedback-message success" id="validation-message-1-3-1b" style="display: none;">${validationMsg}</div>
            <div class="action-bar">
                <button id="back-btn-1-3-1b" class="btn btn-secondary">
                    <svg class="btn-arrow-back" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M9 18l6-6-6-6"/>
                    </svg>
                    ${btnBack}
                </button>
                <button id="next-btn-1-3-1b" class="btn btn-primary" disabled>
                    ${btnContinue}
                    <svg class="btn-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M9 18l6-6-6-6"/>
                    </svg>
                </button>
            </div>
        </div>
    `;
    const tempInput = container.querySelector('#process-temp-ts');
    const speedInput = container.querySelector('#relative-speed-ts');
    const lubricationSelect = container.querySelector('#lubrication-type-tsb');
    const nextBtn = container.querySelector('#next-btn-1-3-1b');
    const backBtn = container.querySelector('#back-btn-1-3-1b');
    const validationMsgEl = container.querySelector('#validation-message-1-3-1b');
    function validateInputs() {
        const temp = parseFloat(tempInput.value);
        const speed = parseFloat(speedInput.value);
        const lubrication = lubricationSelect.value;
        const allValid = !isNaN(temp) && temp > -273 && !isNaN(speed) && speed >= 0 && lubrication;
        nextBtn.disabled = !allValid;
        if (tempInput.value && speedInput.value && lubrication) {
            validationMsgEl.style.display = allValid ? 'block' : 'none';
        }
    }
    tempInput.addEventListener('input', validateInputs);
    speedInput.addEventListener('input', validateInputs);
    lubricationSelect.addEventListener('change', validateInputs);
    nextBtn.addEventListener('click', () => {
        appState.setAnswer('1-3-1b', {
            temperature: parseFloat(tempInput.value),
            speed: parseFloat(speedInput.value),
            lubrication: lubricationSelect.value
        });
        window.dispatchEvent(new CustomEvent('navigate', { detail: { question: '1-3-2a' } }));
    });
    backBtn.addEventListener('click', () => {
        window.dispatchEvent(new CustomEvent('navigate', { detail: { question: '1-3-1' } }));
    });
}