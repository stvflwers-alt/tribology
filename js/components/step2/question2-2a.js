import appState from '../../state.js';
import router from '../../router.js';
export function renderQuestion2_2a(container) {
    const t = (key, params = {}) => appState.t(key, params);
    const title = t('step2.question2_2a.title');
    const description = t('step2.question2_2a.description');
    const btnContinue = t('common.btnContinue');
    const btnBack = t('common.btnBack');
    container.innerHTML = `
        <div class="question-card">
            <div class="question-header">
                <span class="question-number">2-2a</span>
                <span class="question-tag tag-conditional">${t('step2.question2_2a.tag')}</span>
            </div>
            <h2 class="question-title">${title}</h2>
            <p class="question-description">${description}</p>
            <div class="conditional-sections">
                <!-- نقش قطعه -->
                <div class="cond-section">
                    <h4>${t('step2.question2_2a.role_title')}</h4>
                    <div class="options-list" id="role-options">
                        <label class="option-card" data-value="1">
                            <input type="radio" name="role" value="1">
                            <div class="option-content">
                                <span>${t('step2.question2_2a.role_stationary')}</span>
                            </div>
                            <div class="option-radio"></div>
                        </label>
                        <label class="option-card" data-value="2">
                            <input type="radio" name="role" value="2">
                            <div class="option-content">
                                <span>${t('step2.question2_2a.role_moving')}</span>
                            </div>
                            <div class="option-radio"></div>
                        </label>
                        <label class="option-card" data-value="3">
                            <input type="radio" name="role" value="3">
                            <div class="option-content">
                                <span>${t('step2.question2_2a.role_both')}</span>
                            </div>
                            <div class="option-radio"></div>
                        </label>
                    </div>
                </div>
                <!-- هندسه سطح -->
                <div class="cond-section">
                    <h4>${t('step2.question2_2a.geometry_title')}</h4>
                    <div class="options-list" id="surface-options">
                        <label class="option-card" data-value="1">
                            <input type="radio" name="surface" value="1">
                            <div class="option-content">
                                <span>${t('step2.question2_2a.surface_cylindrical')}</span>
                            </div>
                            <div class="option-radio"></div>
                        </label>
                        <label class="option-card" data-value="2">
                            <input type="radio" name="surface" value="2">
                            <div class="option-content">
                                <span>${t('step2.question2_2a.surface_flat')}</span>
                            </div>
                            <div class="option-radio"></div>
                        </label>
                        <label class="option-card" data-value="3">
                            <input type="radio" name="surface" value="3">
                            <div class="option-content">
                                <span>${t('step2.question2_2a.surface_spherical')}</span>
                            </div>
                            <div class="option-radio"></div>
                        </label>
                        <label class="option-card" data-value="4">
                            <input type="radio" name="surface" value="4">
                            <div class="option-content">
                                <span>${t('step2.question2_2a.surface_complex')}</span>
                            </div>
                            <div class="option-radio"></div>
                        </label>
                    </div>
                </div>
            </div>
            <div class="action-bar">
                <button id="back-btn-2-2a" class="btn btn-secondary">
                    <svg class="btn-arrow-back" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M9 18l6-6-6-6"/>
                    </svg>
                    ${btnBack}
                </button>
                <button id="next-btn-2-2a" class="btn btn-primary" disabled>
                    ${btnContinue}
                    <svg class="btn-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M9 18l6-6-6-6"/>
                    </svg>
                </button>
            </div>
        </div>
    `;
    const selections = { role: null, surface: null };
    const nextBtn = container.querySelector('#next-btn-2-2a');
    const backBtn = container.querySelector('#back-btn-2-2a');
    function setupRadioGroup(groupName, key) {
        const cards = container.querySelectorAll(`#${groupName} .option-card`);
        cards.forEach(card => {
            card.addEventListener('click', () => {
                cards.forEach(c => c.classList.remove('selected'));
                card.classList.add('selected');
                selections[key] = card.dataset.value;
                checkAllSelected();
            });
        });
    }
    setupRadioGroup('role-options', 'role');
    setupRadioGroup('surface-options', 'surface');
    function checkAllSelected() {
        if (selections.role && selections.surface) {
            nextBtn.disabled = false;
        }
    }
    nextBtn.addEventListener('click', () => {
        appState.setAnswer('2-2a', selections);
        window.dispatchEvent(new CustomEvent('navigate', { 
            detail: { question: '2-3' } 
        }));
    });
    backBtn.addEventListener('click', () => {
        window.dispatchEvent(new CustomEvent('navigate', { 
            detail: { question: '2-2' } 
        }));
    });
    const saved = appState.getAnswer('2-2a');
    if (saved) {
        ['role', 'surface'].forEach(key => {
            if (saved[key]) {
                const card = container.querySelector(`#${key === 'role' ? 'role' : 'surface'}-options .option-card[data-value="${saved[key]}"]`);
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