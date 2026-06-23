import appState from '../../state.js';
import router from '../../router.js';
export function renderQuestion2_1a(container) {
    const t = (key, params = {}) => appState.t(key, params);
    const title = t('step2.question2_1a.title');
    const btnContinue = t('common.btnContinue');
    const btnBack = t('common.btnBack');
    const geometryOptions = [
        { value: '1', label: t('step2.question2_1a.geometry_point') },
        { value: '2', label: t('step2.question2_1a.geometry_line') },
        { value: '3', label: t('step2.question2_1a.geometry_surface') }
    ];
    const motionOptions = [
        { value: '1', label: t('step2.question2_1a.motion_rolling') },
        { value: '2', label: t('step2.question2_1a.motion_sliding') },
        { value: '3', label: t('step2.question2_1a.motion_roll_slide') },
        { value: '4', label: t('step2.question2_1a.motion_stationary') },
        { value: '5', label: t('step2.question2_1a.motion_impact') },
        { value: '6', label: t('step2.question2_1a.motion_oscillating') },
        { value: '7', label: t('step2.question2_1a.motion_particles') }
    ];
    const lubricantOptions = [
        { value: '1', label: t('step2.question2_1a.lubricant_fluid') },
        { value: '2', label: t('step2.question2_1a.lubricant_grease') },
        { value: '3', label: t('step2.question2_1a.lubricant_solid') },
        { value: '4', label: t('step2.question2_1a.lubricant_dry') }
    ];
    container.innerHTML = `
        <div class="question-card">
            <div class="question-header">
                <span class="question-number">2-1a</span>
                <span class="question-tag tag-conditional">${t('step2.question2_1a.tag')}</span>
            </div>
            <h2 class="question-title">${title}</h2>
            <div class="conditional-sections">
                <div class="cond-section">
                    <h4>${t('step2.question2_1a.geometry_title')}</h4>
                    <div class="options-list" id="geometry-options">
                        ${geometryOptions.map(opt => `
                            <label class="option-card" data-value="${opt.value}">
                                <input type="radio" name="geometry" value="${opt.value}">
                                <div class="option-content">
                                    <span>${opt.label}</span>
                                </div>
                                <div class="option-radio"></div>
                            </label>
                        `).join('')}
                    </div>
                </div>
                <div class="cond-section">
                    <h4>${t('step2.question2_1a.motion_title')}</h4>
                    <div class="options-list" id="motion-options">
                        ${motionOptions.map(opt => `
                            <label class="option-card" data-value="${opt.value}">
                                <input type="radio" name="motion" value="${opt.value}">
                                <div class="option-content">
                                    <span>${opt.label}</span>
                                </div>
                                <div class="option-radio"></div>
                            </label>
                        `).join('')}
                    </div>
                </div>
                <div class="cond-section">
                    <h4>${t('step2.question2_1a.lubricant_title')}</h4>
                    <div class="options-list" id="lubricant-options">
                        ${lubricantOptions.map(opt => `
                            <label class="option-card" data-value="${opt.value}">
                                <input type="radio" name="lubricant" value="${opt.value}">
                                <div class="option-content">
                                    <span>${opt.label}</span>
                                </div>
                                <div class="option-radio"></div>
                            </label>
                        `).join('')}
                    </div>
                </div>
            </div>
            <div class="action-bar">
                <button id="back-btn-2-1a" class="btn btn-secondary">
                    <svg class="btn-arrow-back" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M9 18l6-6-6-6"/>
                    </svg>
                    ${btnBack}
                </button>
                <button id="next-btn-2-1a" class="btn btn-primary" disabled>
                    ${btnContinue}
                    <svg class="btn-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M9 18l6-6-6-6"/>
                    </svg>
                </button>
            </div>
        </div>
    `;
    const selections = { geometry: null, motion: null, lubricant: null };
    const nextBtn = container.querySelector('#next-btn-2-1a');
    const backBtn = container.querySelector('#back-btn-2-1a');
    function setupOptions(groupId, key) {
        const cards = container.querySelectorAll(`#${groupId} .option-card`);
        cards.forEach(card => {
            card.addEventListener('click', () => {
                cards.forEach(c => c.classList.remove('selected'));
                card.classList.add('selected');
                selections[key] = card.dataset.value;
                checkAllSelected();
            });
        });
    }
    setupOptions('geometry-options', 'geometry');
    setupOptions('motion-options', 'motion');
    setupOptions('lubricant-options', 'lubricant');
    function checkAllSelected() {
        if (selections.geometry && selections.motion && selections.lubricant) {
            nextBtn.disabled = false;
        }
    }
    nextBtn.addEventListener('click', () => {
        appState.setAnswer('2-1a', selections);
        window.dispatchEvent(new CustomEvent('navigate', { 
            detail: { question: '2-2' } 
        }));
    });
    backBtn.addEventListener('click', () => {
        window.dispatchEvent(new CustomEvent('navigate', { 
            detail: { question: '2-1' } 
        }));
    });
    const saved = appState.getAnswer('2-1a');
    if (saved) {
        ['geometry', 'motion', 'lubricant'].forEach(key => {
            if (saved[key]) {
                const card = container.querySelector(`#${key}-options .option-card[data-value="${saved[key]}"]`);
                if (card) {
                    card.classList.add('selected');
                    card.querySelector('input').checked = true;
                    selections[key] = saved[key];
                }
            }
        });
        checkAllSelected();
    }
}