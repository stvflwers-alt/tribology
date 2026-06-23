import appState from '../../state.js';
export function renderQuestion1_2_1b(container) {
    const t = (key, params = {}) => appState.t(key, params);
    const contactAnswer = appState.getAnswer('1-2-1');
    const contactNames = {
        '8': t('step1.question1_2_1.options.7.title'),
        '9': t('step1.question1_2_1.options.8.title'),
        '11': t('step1.question1_2_1.options.10.title')
    };
    const title = t('step1.question1_2_1b.title');
    const description = t('step1.question1_2_1b.description', { contactType: contactNames[contactAnswer] || '' });
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
    const lubOptions = [];
    for (let i = 0; i < 4; i++) {
        lubOptions.push(t(`step1.question1_2_1b.lubrication.options.${i}`));
    }
    container.innerHTML = `
        <div class="question-card">
            <div class="question-header">
                <span class="question-number">1-2-1-b</span>
                <span class="question-tag tag-path">${tag}</span>
            </div>
            <h2 class="question-title">${title}</h2>
            <p class="question-description">${description}</p>
            <div class="conditional-form">
                <div class="form-group">
                    <label class="form-label" for="process-temp">${tempLabel}</label>
                    <input type="number" id="process-temp" class="form-input" placeholder="${tempPlaceholder}" step="0.1">
                </div>
                <div class="form-group">
                    <label class="form-label" for="relative-speed">${speedLabel}</label>
                    <input type="number" id="relative-speed" class="form-input" placeholder="${speedPlaceholder}" step="0.01">
                </div>
                <div class="form-group">
                    <label class="form-label" for="lubrication-type-b">${lubLabel}</label>
                    <select id="lubrication-type-b" class="form-select">
                        <option value="">${lubPlaceholder}</option>
                        ${lubOptions.map((opt, i) => `<option value="${i + 1}">${opt}</option>`).join('')}
                    </select>
                </div>
            </div>
            <div class="feedback-message success" id="validation-message-1-2-1b" style="display: none;">${validationMsg}</div>
            <div class="action-bar">
                <button id="back-btn-1-2-1b" class="btn btn-secondary">
                    <svg class="btn-arrow-back" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M9 18l6-6-6-6"/>
                    </svg>
                    ${btnBack}
                </button>
                <button id="next-btn-1-2-1b" class="btn btn-primary" disabled>
                    ${btnContinue}
                    <svg class="btn-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M9 18l6-6-6-6"/>
                    </svg>
                </button>
            </div>
        </div>
    `;
    const tempInput = container.querySelector('#process-temp');
    const speedInput = container.querySelector('#relative-speed');
    const lubricationSelect = container.querySelector('#lubrication-type-b');
    const nextBtn = container.querySelector('#next-btn-1-2-1b');
    const backBtn = container.querySelector('#back-btn-1-2-1b');
    const validationMsgEl = container.querySelector('#validation-message-1-2-1b');
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
        appState.setAnswer('1-2-1b', {
            temperature: parseFloat(tempInput.value),
            speed: parseFloat(speedInput.value),
            lubrication: lubricationSelect.value
        });
        window.dispatchEvent(new CustomEvent('navigate', { detail: { question: '1-2-2' } }));
    });
    backBtn.addEventListener('click', () => {
        window.dispatchEvent(new CustomEvent('navigate', { detail: { question: '1-2-1' } }));
    });
    const savedParams = appState.getAnswer('1-2-1b');
    if (savedParams) {
        if (savedParams.temperature) tempInput.value = savedParams.temperature;
        if (savedParams.speed) speedInput.value = savedParams.speed;
        if (savedParams.lubrication) lubricationSelect.value = savedParams.lubrication;
        validateInputs();
    }
}