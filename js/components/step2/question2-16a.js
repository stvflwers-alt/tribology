import appState from '../../state.js';
import router from '../../router.js';
export function renderQuestion2_16a(container) {
    const t = (key, params = {}) => appState.t(key, params);
    const title = t('step2.question2_16a.title');
    const btnContinue = t('common.btnContinue');
    const btnBack = t('common.btnBack');
    const options = [
        { value: '1', icon: '🔬', titleKey: 'opt1', descKey: 'opt1_desc' },
        { value: '2', icon: '🧬', titleKey: 'opt2', descKey: 'opt2_desc' },
        { value: '3', icon: '🦠', titleKey: 'opt3', descKey: 'opt3_desc' },
        { value: '4', icon: '💥', titleKey: 'opt4', descKey: 'opt4_desc' },
        { value: '5', icon: '📊', titleKey: 'opt5', descKey: 'opt5_desc' },
        { value: '6', icon: '🔥', titleKey: 'opt6', descKey: 'opt6_desc' },
        { value: '7', icon: '📐', titleKey: 'opt7', descKey: 'opt7_desc' },
        { value: '8', icon: '⚠️', titleKey: 'opt8', descKey: 'opt8_desc' },
        { value: '9', icon: '💧', titleKey: 'opt9', descKey: 'opt9_desc' },
        { value: '10', icon: '🕳️', titleKey: 'opt10', descKey: 'opt10_desc' },
        { value: '11', icon: '🧪', titleKey: 'opt11', descKey: 'opt11_desc' },
        { value: '12', icon: '💪', titleKey: 'opt12', descKey: 'opt12_desc' },
        { value: '13', icon: '⬜', titleKey: 'opt13', descKey: 'opt13_desc' }
    ];
    container.innerHTML = `
        <div class="question-card">
            <div class="question-header">
                <span class="question-number">2-16a</span>
                <span class="question-tag tag-conditional">${t('step2.question2_16a.tag')}</span>
            </div>
            <h2 class="question-title">${title}</h2>
            <p class="question-description">${t('step2.question2_16a.description')}</p>
            <div class="options-list" id="options-list-2-16a">
                ${options.map(opt => `
                    <label class="option-card" data-value="${opt.value}">
                        <input type="radio" name="question-2-16a" value="${opt.value}">
                        <div class="option-content">
                            <div class="option-icon">${opt.icon}</div>
                            <div class="option-text">
                                <strong>${t(`step2.question2_16a.${opt.titleKey}`)}</strong>
                                <span>${t(`step2.question2_16a.${opt.descKey}`)}</span>
                            </div>
                        </div>
                        <div class="option-radio"></div>
                    </label>
                `).join('')}
            </div>
            <div class="action-bar">
                <button id="back-btn-2-16a" class="btn btn-secondary">
                    <svg class="btn-arrow-back" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M9 18l6-6-6-6"/>
                    </svg>
                    ${btnBack}
                </button>
                <button id="next-btn-2-16a" class="btn btn-primary" disabled>
                    ${btnContinue}
                    <svg class="btn-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M9 18l6-6-6-6"/>
                    </svg>
                </button>
            </div>
        </div>
    `;
    const optionCards = container.querySelectorAll('#options-list-2-16a .option-card');
    const nextBtn = container.querySelector('#next-btn-2-16a');
    const backBtn = container.querySelector('#back-btn-2-16a');
    let selectedValue = null;
    optionCards.forEach(card => {
        card.addEventListener('click', () => {
            optionCards.forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');
            selectedValue = card.dataset.value;
            nextBtn.disabled = false;
        });
    });
    nextBtn.addEventListener('click', () => {
        if (!selectedValue) return;
        appState.setAnswer('2-16a', selectedValue);
        appState.setFlag('MICROSTRUCTURE_DEFECT', true);
        const defectTypes = {
            '1': 'GROWTH_GRAIN', '2': 'UNDESIRABLE_PHASES', '3': 'INCLUSIONS',
            '4': 'MICRO_CRACKS', '5': 'HARDNESS_NONUNIFORMITY', '6': 'DECARBURIZATION',
            '7': 'ACICULAR_STRUCTURE', '8': 'SIGMA_PHASE', '9': 'HYDROGEN_EMBRITTLEMENT',
            '10': 'POROSITY', '11': 'INTERGRANULAR_CORROSION', '12': 'RESIDUAL_STRESS',
            '13': 'WHITE_LAYER'
        };
        appState.setFlag('DEFECT_TYPE', defectTypes[selectedValue]);
        window.dispatchEvent(new CustomEvent('navigate', { 
            detail: { question: '2-geometry' } 
        }));
    });
    backBtn.addEventListener('click', () => {
        window.dispatchEvent(new CustomEvent('navigate', { 
            detail: { question: '2-16' } 
        }));
    });
    const savedAnswer = appState.getAnswer('2-16a');
    if (savedAnswer) {
        const savedCard = container.querySelector(`.option-card[data-value="${savedAnswer}"]`);
        if (savedCard) {
            savedCard.classList.add('selected');
            savedCard.querySelector('input').checked = true;
            selectedValue = savedAnswer;
            nextBtn.disabled = false;
        }
    }
}