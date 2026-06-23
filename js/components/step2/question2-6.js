import appState from '../../state.js';
import router from '../../router.js';
export function renderQuestion2_6(container) {
    const t = (key, params = {}) => appState.t(key, params);
    const title = t('step2.question2_6.title');
    const description = t('step2.question2_6.description');
    const btnContinue = t('common.btnContinue');
    const btnBack = t('common.btnBack');
    const fields = [
        { group: 'part1', id: 'Ra1', labelKey: 'Ra1', unit: 'µm' },
        { group: 'part1', id: 'Rz1', labelKey: 'Rz1', unit: 'µm' },
        { group: 'part1', id: 'Rq1', labelKey: 'Rq1', unit: 'µm' },
        { group: 'part1', id: 'Rsk1', labelKey: 'Rsk1', unit: '' },
        { group: 'part1', id: 'Rku1', labelKey: 'Rku1', unit: '' },
        { group: 'part2', id: 'Ra2', labelKey: 'Ra2', unit: 'µm' },
        { group: 'part2', id: 'Rz2', labelKey: 'Rz2', unit: 'µm' },
        { group: 'part2', id: 'Rq2', labelKey: 'Rq2', unit: 'µm' },
        { group: 'part2', id: 'Rsk2', labelKey: 'Rsk2', unit: '' },
        { group: 'part2', id: 'Rku2', labelKey: 'Rku2', unit: '' },
        { group: 'general', id: 'F', labelKey: 'F', unit: 'N' },
        { group: 'general', id: 'U', labelKey: 'U', unit: 'm/s' },
        { group: 'general', id: 'T', labelKey: 'T', unit: '°C' }
    ];
    const part1Name = t('step2.question2_6.part1');
    const part2Name = t('step2.question2_6.part2');
    container.innerHTML = `
        <div class="question-card">
            <div class="question-header">
                <span class="question-number">2-6</span>
                <span class="question-tag tag-standard">${t('step2.question2_6.tag')}</span>
            </div>
            <h2 class="question-title">${title}</h2>
            <p class="question-description">${description}</p>
            <div class="surface-params-container">
                <div class="param-group">
                    <h4 class="param-group-title">🔵 ${part1Name}</h4>
                    <div class="param-grid">
                        ${fields.filter(f => f.group === 'part1').map(f => `
                            <div class="param-field">
                                <label for="field-${f.id}">
                                    <span class="field-label">${t(`step2.question2_6.labels.${f.labelKey}`)}</span>
                                    <span class="field-desc">${t(`step2.question2_6.desc.${f.labelKey}`)}</span>
                                </label>
                                <div class="field-input-wrapper">
                                    <input type="number" id="field-${f.id}" class="numeric-input" 
                                           placeholder="${t(`step2.question2_6.labels.${f.labelKey}`)}" step="any" min="0">
                                    ${f.unit ? `<span class="field-unit">${f.unit}</span>` : ''}
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
                <div class="param-group">
                    <h4 class="param-group-title">🟠 ${part2Name}</h4>
                    <div class="param-grid">
                        ${fields.filter(f => f.group === 'part2').map(f => `
                            <div class="param-field">
                                <label for="field-${f.id}">
                                    <span class="field-label">${t(`step2.question2_6.labels.${f.labelKey}`)}</span>
                                    <span class="field-desc">${t(`step2.question2_6.desc.${f.labelKey}`)}</span>
                                </label>
                                <div class="field-input-wrapper">
                                    <input type="number" id="field-${f.id}" class="numeric-input" 
                                           placeholder="${t(`step2.question2_6.labels.${f.labelKey}`)}" step="any" min="0">
                                    ${f.unit ? `<span class="field-unit">${f.unit}</span>` : ''}
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
                <div class="param-group">
                    <h4 class="param-group-title">⚙️ ${t('step2.question2_6.general_params')}</h4>
                    <div class="param-grid">
                        ${fields.filter(f => f.group === 'general').map(f => `
                            <div class="param-field">
                                <label for="field-${f.id}">
                                    <span class="field-label">${t(`step2.question2_6.labels.${f.labelKey}`)}</span>
                                    <span class="field-desc">${t(`step2.question2_6.desc.${f.labelKey}`)}</span>
                                </label>
                                <div class="field-input-wrapper">
                                    <input type="number" id="field-${f.id}" class="numeric-input" 
                                           placeholder="${t(`step2.question2_6.labels.${f.labelKey}`)}" step="any" min="0">
                                    ${f.unit ? `<span class="field-unit">${f.unit}</span>` : ''}
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
            <div class="auto-calculation-box" id="sigma-calc" style="display: none;">
                <span>📊 ${t('step2.question2_6.sigma_calculated')}: <strong id="sigma-value">-</strong> µm</span>
                <br>
                <small style="color: var(--text-secondary);">σ = √(Rq₁² + Rq₂²)</small>
            </div>
            <div class="validation-message" id="validation-2-6" style="display: none;">
                ⚠️ ${t('step2.question2_6.fill_all')}
            </div>
            <div class="action-bar">
                <button id="back-btn-2-6" class="btn btn-secondary">
                    <svg class="btn-arrow-back" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M9 18l6-6-6-6"/>
                    </svg>
                    ${btnBack}
                </button>
                <button id="next-btn-2-6" class="btn btn-primary" disabled>
                    ${btnContinue}
                    <svg class="btn-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M9 18l6-6-6-6"/>
                    </svg>
                </button>
            </div>
        </div>
    `;
    const allInputs = container.querySelectorAll('.numeric-input');
    const nextBtn = container.querySelector('#next-btn-2-6');
    const backBtn = container.querySelector('#back-btn-2-6');
    const validationMsg = container.querySelector('#validation-2-6');
    const sigmaCalc = container.querySelector('#sigma-calc');
    const sigmaValue = container.querySelector('#sigma-value');
    function calculateSigma() {
        const Rq1 = parseFloat(container.querySelector('#field-Rq1')?.value) || 0;
        const Rq2 = parseFloat(container.querySelector('#field-Rq2')?.value) || 0;
        if (Rq1 > 0 && Rq2 > 0) {
            const sigma = Math.sqrt(Rq1 ** 2 + Rq2 ** 2);
            sigmaValue.textContent = sigma.toFixed(3);
            sigmaCalc.style.display = 'block';
        } else if (Rq1 > 0 || Rq2 > 0) {
            const sigma = Math.sqrt(Rq1 ** 2 + Rq2 ** 2);
            sigmaValue.textContent = sigma.toFixed(3);
            sigmaCalc.style.display = 'block';
        } else {
            sigmaCalc.style.display = 'none';
        }
    }
    function checkAllFilled() {
        let allFilled = true;
        allInputs.forEach(input => {
            if (input.value === '' || input.value === null) {
                allFilled = false;
            }
        });
        if (allFilled) {
            nextBtn.disabled = false;
            validationMsg.style.display = 'none';
        } else {
            nextBtn.disabled = true;
            const emptyCount = Array.from(allInputs).filter(inp => !inp.value).length;
            validationMsg.innerHTML = `⚠️ ${t('step2.question2_6.remaining_fields', { count: emptyCount })}`;
            validationMsg.style.display = 'block';
        }
    }
    allInputs.forEach(input => {
        input.addEventListener('input', () => {
            checkAllFilled();
            calculateSigma();
        });
    });
    nextBtn.addEventListener('click', () => {
        const data = {};
        fields.forEach(field => {
            const input = container.querySelector(`#field-${field.id}`);
            data[field.id] = input.value ? parseFloat(input.value) : null;
        });
        if (data.Rq1 && data.Rq2) {
            data.sigma = Math.sqrt(data.Rq1 ** 2 + data.Rq2 ** 2);
            appState.setAnswer('2-6-sigma', data.sigma);
        }
        appState.setAnswer('2-6', data);
        appState.setAnswer('2-6-Rq1', data.Rq1);
        appState.setAnswer('2-6-Rq2', data.Rq2);
        appState.setAnswer('2-6-F', data.F);
        appState.setAnswer('2-6-U', data.U);
        appState.setAnswer('2-6-T', data.T);
        const path = appState.getAnswer('1-1');
        let nextQuestion;
        if (path === '1') {
            nextQuestion = '2-14';
        } else {
            nextQuestion = '2-8';
        }
        window.dispatchEvent(new CustomEvent('navigate', { 
            detail: { question: nextQuestion } 
        }));
    });
    backBtn.addEventListener('click', () => {
        const prevAnswer = appState.getAnswer('2-5');
        if (prevAnswer === '7') {
            window.dispatchEvent(new CustomEvent('navigate', { 
                detail: { question: '2-5a' } 
            }));
        } else {
            window.dispatchEvent(new CustomEvent('navigate', { 
                detail: { question: '2-5' } 
            }));
        }
    });
    const saved = appState.getAnswer('2-6');
    if (saved) {
        fields.forEach(field => {
            if (saved[field.id] !== undefined && saved[field.id] !== null) {
                const input = container.querySelector(`#field-${field.id}`);
                if (input) input.value = saved[field.id];
            }
        });
        checkAllFilled();
        calculateSigma();
    }
}