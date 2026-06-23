import appState from '../../state.js';
export function renderQuestion1_2_1a(container) {
    const t = (key, params = {}) => appState.t(key, params);
    const title = t('step1.question1_2_1a.title');
    const description = t('step1.question1_2_1a.description');
    const tag = t('step1.question1_2_1a.tag');
    const btnContinue = t('common.btnContinue');
    const btnBack = t('common.btnBack');
    const geometryLabel = t('step1.question1_2_1a.geometry.label');
    const geometryPlaceholder = t('step1.question1_2_1a.geometry.placeholder');
    const geometryOptions = [
        t('step1.question1_2_1a.geometry.options.0'),
        t('step1.question1_2_1a.geometry.options.1'),
        t('step1.question1_2_1a.geometry.options.2')
    ];
    const motionLabel = t('step1.question1_2_1a.motion.label');
    const motionPlaceholder = t('step1.question1_2_1a.motion.placeholder');
    const motionOptions = [];
    for (let i = 0; i < 7; i++) {
        motionOptions.push(t(`step1.question1_2_1a.motion.options.${i}`));
    }
    const lubricationLabel = t('step1.question1_2_1a.lubrication.label');
    const lubricationPlaceholder = t('step1.question1_2_1a.lubrication.placeholder');
    const lubricationOptions = [];
    for (let i = 0; i < 4; i++) {
        lubricationOptions.push(t(`step1.question1_2_1a.lubrication.options.${i}`));
    }
    container.innerHTML = `
        <div class="question-card">
            <div class="question-header">
                <span class="question-number">1-2-1-a</span>
                <span class="question-tag tag-path">${tag}</span>
            </div>
            <h2 class="question-title">${title}</h2>
            <p class="question-description">${description}</p>
            <div class="conditional-form">
                <div class="form-group">
                    <label class="form-label">${geometryLabel}</label>
                    <select id="geometry-type" class="form-select">
                        <option value="">${geometryPlaceholder}</option>
                        ${geometryOptions.map((opt, i) => `<option value="${i + 1}">${opt}</option>`).join('')}
                    </select>
                </div>
                <div class="form-group">
                    <label class="form-label">${motionLabel}</label>
                    <select id="motion-type" class="form-select">
                        <option value="">${motionPlaceholder}</option>
                        ${motionOptions.map((opt, i) => `<option value="${i + 1}">${opt}</option>`).join('')}
                    </select>
                </div>
                <div class="form-group">
                    <label class="form-label">${lubricationLabel}</label>
                    <select id="lubrication-type" class="form-select">
                        <option value="">${lubricationPlaceholder}</option>
                        ${lubricationOptions.map((opt, i) => `<option value="${i + 1}">${opt}</option>`).join('')}
                    </select>
                </div>
            </div>
            <div class="action-bar">
                <button id="back-btn-1-2-1a" class="btn btn-secondary">
                    <svg class="btn-arrow-back" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M9 18l6-6-6-6"/>
                    </svg>
                    ${btnBack}
                </button>
                <button id="next-btn-1-2-1a" class="btn btn-primary" disabled>
                    ${btnContinue}
                    <svg class="btn-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M9 18l6-6-6-6"/>
                    </svg>
                </button>
            </div>
        </div>
    `;
    const geometrySelect = container.querySelector('#geometry-type');
    const motionSelect = container.querySelector('#motion-type');
    const lubricationSelect = container.querySelector('#lubrication-type');
    const nextBtn = container.querySelector('#next-btn-1-2-1a');
    const backBtn = container.querySelector('#back-btn-1-2-1a');
    function checkAllSelected() {
        nextBtn.disabled = !(geometrySelect.value && motionSelect.value && lubricationSelect.value);
    }
    geometrySelect.addEventListener('change', checkAllSelected);
    motionSelect.addEventListener('change', checkAllSelected);
    lubricationSelect.addEventListener('change', checkAllSelected);
    nextBtn.addEventListener('click', () => {
        appState.setAnswer('1-2-1a', {
            geometry: geometrySelect.value,
            motion: motionSelect.value,
            lubrication: lubricationSelect.value
        });
        window.dispatchEvent(new CustomEvent('navigate', { detail: { question: '1-2-2' } }));
    });
    backBtn.addEventListener('click', () => {
        window.dispatchEvent(new CustomEvent('navigate', { detail: { question: '1-2-1' } }));
    });
    const savedData = appState.getAnswer('1-2-1a');
    if (savedData) {
        if (savedData.geometry) geometrySelect.value = savedData.geometry;
        if (savedData.motion) motionSelect.value = savedData.motion;
        if (savedData.lubrication) lubricationSelect.value = savedData.lubrication;
        checkAllSelected();
    }
}