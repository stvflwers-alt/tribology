import appState from '../../state.js';
export function renderQuestion1_3_1a(container) {
    const t = (key, params = {}) => appState.t(key, params);
    const title = t('step1.question1_2_1a.title');
    const description = t('step1.question1_2_1a.description');
    const tag = t('step1.question1_2_1a.tag');
    const btnContinue = t('common.btnContinue');
    const btnBack = t('common.btnBack');
    const geometryLabel = t('step1.question1_2_1a.geometry.label');
    const geometryPlaceholder = t('step1.question1_2_1a.geometry.placeholder');
    const motionLabel = t('step1.question1_2_1a.motion.label');
    const motionPlaceholder = t('step1.question1_2_1a.motion.placeholder');
    const lubricationLabel = t('step1.question1_2_1a.lubrication.label');
    const lubricationPlaceholder = t('step1.question1_2_1a.lubrication.placeholder');
    container.innerHTML = `
        <div class="question-card">
            <div class="question-header">
                <span class="question-number">1-3-1-a</span>
                <span class="question-tag tag-path">${tag}</span>
            </div>
            <h2 class="question-title">${title}</h2>
            <p class="question-description">${description}</p>
            <div class="conditional-form">
                <div class="form-group">
                    <label class="form-label">${geometryLabel}</label>
                    <select id="geometry-type-ts" class="form-select">
                        <option value="">${geometryPlaceholder}</option>
                        <option value="1">${t('step1.question1_2_1a.geometry.options.0')}</option>
                        <option value="2">${t('step1.question1_2_1a.geometry.options.1')}</option>
                        <option value="3">${t('step1.question1_2_1a.geometry.options.2')}</option>
                    </select>
                </div>
                <div class="form-group">
                    <label class="form-label">${motionLabel}</label>
                    <select id="motion-type-ts" class="form-select">
                        <option value="">${motionPlaceholder}</option>
                        <option value="1">${t('step1.question1_2_1a.motion.options.0')}</option>
                        <option value="2">${t('step1.question1_2_1a.motion.options.1')}</option>
                        <option value="3">${t('step1.question1_2_1a.motion.options.2')}</option>
                        <option value="4">${t('step1.question1_2_1a.motion.options.3')}</option>
                        <option value="5">${t('step1.question1_2_1a.motion.options.4')}</option>
                        <option value="6">${t('step1.question1_2_1a.motion.options.5')}</option>
                        <option value="7">${t('step1.question1_2_1a.motion.options.6')}</option>
                    </select>
                </div>
                <div class="form-group">
                    <label class="form-label">${lubricationLabel}</label>
                    <select id="lubrication-type-ts" class="form-select">
                        <option value="">${lubricationPlaceholder}</option>
                        <option value="1">${t('step1.question1_2_1a.lubrication.options.0')}</option>
                        <option value="2">${t('step1.question1_2_1a.lubrication.options.1')}</option>
                        <option value="3">${t('step1.question1_2_1a.lubrication.options.2')}</option>
                        <option value="4">${t('step1.question1_2_1a.lubrication.options.3')}</option>
                    </select>
                </div>
            </div>
            <div class="action-bar">
                <button id="back-btn-1-3-1a" class="btn btn-secondary">
                    <svg class="btn-arrow-back" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M9 18l6-6-6-6"/>
                    </svg>
                    ${btnBack}
                </button>
                <button id="next-btn-1-3-1a" class="btn btn-primary" disabled>
                    ${btnContinue}
                    <svg class="btn-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M9 18l6-6-6-6"/>
                    </svg>
                </button>
            </div>
        </div>
    `;
    const geometrySelect = container.querySelector('#geometry-type-ts');
    const motionSelect = container.querySelector('#motion-type-ts');
    const lubricationSelect = container.querySelector('#lubrication-type-ts');
    const nextBtn = container.querySelector('#next-btn-1-3-1a');
    const backBtn = container.querySelector('#back-btn-1-3-1a');
    function checkAllSelected() {
        nextBtn.disabled = !(geometrySelect.value && motionSelect.value && lubricationSelect.value);
    }
    geometrySelect.addEventListener('change', checkAllSelected);
    motionSelect.addEventListener('change', checkAllSelected);
    lubricationSelect.addEventListener('change', checkAllSelected);
    nextBtn.addEventListener('click', () => {
        appState.setAnswer('1-3-1a', {
            geometry: geometrySelect.value,
            motion: motionSelect.value,
            lubrication: lubricationSelect.value
        });
        window.dispatchEvent(new CustomEvent('navigate', { detail: { question: '1-3-2a' } }));
    });
    backBtn.addEventListener('click', () => {
        window.dispatchEvent(new CustomEvent('navigate', { detail: { question: '1-3-1' } }));
    });
}