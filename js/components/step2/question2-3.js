import appState from '../../state.js';
import router from '../../router.js';
export function renderQuestion2_3(container) {
    const t = (key, params = {}) => appState.t(key, params);
    const title = t('step2.question2_3.title');
    const description = t('step2.question2_3.description');
    const tag = t('step2.question2_3.tag');
    const btnContinue = t('common.btnContinue');
    const btnBack = t('common.btnBack');
    const part1Code = appState.getAnswer('2-1') || appState.getAnswer('1-2-1');
    const part2Code = appState.getAnswer('2-2') || appState.getAnswer('1-2-2');
    const part1Name = t(`step2.question2_3.part1_name_${part1Code}`) || t('step2.question2_3.part1_default');
    const part2Name = t(`step2.question2_3.part2_name_${part2Code}`) || t('step2.question2_3.part2_default');
    const fields = [
        { key: 'E', labelKey: 'E', unit: 'GPa' },
        { key: 'nu', labelKey: 'nu', unit: '' },
        { key: 'sigma_y', labelKey: 'sigma_y', unit: 'MPa' },
        { key: 'H', labelKey: 'H', unit: 'HB' },
        { key: 'KIC', labelKey: 'KIC', unit: 'MPa√m' },
        { key: 'k', labelKey: 'k', unit: 'W/m·K' },
        { key: 'rho', labelKey: 'rho', unit: 'kg/m³' },
        { key: 'c', labelKey: 'c', unit: 'J/kg·K' },
        { key: 'T_melt', labelKey: 'T_melt', unit: '°C' },
        { key: 't', labelKey: 't', unit: 'mm' }
    ];
    const generateFieldHTML = (part, index) => {
        return fields.map((field, i) => `
            <div class="material-field">
                <label for="${part}_${field.key}">
                    <span class="field-label">${t(`step2.question2_3.labels.${field.labelKey}`)} (${part === 'part1' ? part1Name : part2Name})</span>
                    <span class="field-hint">${t(`step2.question2_3.hints.${field.labelKey}`)} ${field.unit ? `[${field.unit}]` : ''}</span>
                </label>
                <input 
                    type="number" 
                    id="${part}_${field.key}" 
                    class="material-input" 
                    placeholder="${t(`step2.question2_3.labels.${field.labelKey}`)}"
                    step="any"
                    min="0"
                    data-part="${part}"
                    data-field="${field.key}"
                >
            </div>
        `).join('');
    };
    container.innerHTML = `
        <div class="question-card">
            <div class="question-header">
                <span class="question-number">2-3</span>
                <span class="question-tag tag-standard">${tag}</span>
            </div>
            <h2 class="question-title">${title}</h2>
            <p class="question-description">${description}</p>
            <div class="materials-container">
                <div class="material-section">
                    <h3 class="material-section-title">🟦 ${t('step2.question2_3.part1_title', { name: part1Name })}</h3>
                    <div class="material-fields-grid" id="part1-fields">
                        ${generateFieldHTML('part1', 0)}
                    </div>
                </div>
                <div class="material-divider"></div>
                <div class="material-section">
                    <h3 class="material-section-title">🟧 ${t('step2.question2_3.part2_title', { name: part2Name })}</h3>
                    <div class="material-fields-grid" id="part2-fields">
                        ${generateFieldHTML('part2', 1)}
                    </div>
                </div>
            </div>
            <div class="validation-message" id="validation-2-3" style="display: none;">
                ⚠️ ${t('step2.question2_3.fill_all')}
            </div>
            <div class="action-bar">
                <button id="back-btn-2-3" class="btn btn-secondary">
                    <svg class="btn-arrow-back" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M9 18l6-6-6-6"/>
                    </svg>
                    ${btnBack}
                </button>
                <button id="next-btn-2-3" class="btn btn-primary">
                    ${btnContinue}
                    <svg class="btn-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M9 18l6-6-6-6"/>
                    </svg>
                </button>
            </div>
        </div>
    `;
    const allInputs = container.querySelectorAll('.material-input');
    const nextBtn = container.querySelector('#next-btn-2-3');
    const backBtn = container.querySelector('#back-btn-2-3');
    const validationMsg = container.querySelector('#validation-2-3');
    const savedData = appState.getAnswer('2-3');
    if (savedData) {
        allInputs.forEach(input => {
            const part = input.dataset.part;
            const field = input.dataset.field;
            if (savedData[part] && savedData[part][field] !== undefined) {
                input.value = savedData[part][field];
            }
        });
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
            const emptyCount = Array.from(allInputs).filter(inp => !inp.value).length;
            validationMsg.innerHTML = `⚠️ ${t('step2.question2_3.remaining_fields', { count: emptyCount })}`;
            validationMsg.style.display = 'block';
            nextBtn.disabled = true;
        }
    }
    allInputs.forEach(input => {
        input.addEventListener('input', checkAllFilled);
        input.addEventListener('change', checkAllFilled);
    });
    nextBtn.addEventListener('click', () => {
        const data = { part1: {}, part2: {} };
        allInputs.forEach(input => {
            const part = input.dataset.part;
            const field = input.dataset.field;
            const value = parseFloat(input.value);
            data[part][field] = isNaN(value) ? null : value;
        });
        appState.setAnswer('2-3', data);
        Object.entries(data.part1).forEach(([key, value]) => {
            appState.setAnswer(`2-3-part1-${key}`, value);
        });
        Object.entries(data.part2).forEach(([key, value]) => {
            appState.setAnswer(`2-3-part2-${key}`, value);
        });
        if (data.part1.E && data.part1.nu && data.part2.E && data.part2.nu) {
            const lambda = (1 - Math.pow(data.part1.nu, 2)) / data.part1.E + (1 - Math.pow(data.part2.nu, 2)) / data.part2.E;
            appState.setAnswer('2-3-lambda', lambda);
        }
        const nextQuestion = router.getNextQuestion('2-3');
        window.dispatchEvent(new CustomEvent('navigate', { 
            detail: { question: nextQuestion || '2-5' } 
        }));
    });
    backBtn.addEventListener('click', () => {
        window.dispatchEvent(new CustomEvent('navigate', { 
            detail: { question: '2-2' } 
        }));
    });
    checkAllFilled();
}