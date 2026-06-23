import appState from '../../state.js';
import router from '../../router.js';
export function renderQuestion2_13(container) {
    const t = (key, params = {}) => appState.t(key, params);
    const title = t('step2.question2_13.title');
    const description = t('step2.question2_13.description');
    const btnContinue = t('common.btnContinue');
    const btnBack = t('common.btnBack');
    const options = [
        { value: '1', icon: '✅', title: t('step2.question2_13.opt1'), desc: t('step2.question2_13.opt1_desc') },
        { value: '2', icon: '🏜️', title: t('step2.question2_13.opt2'), desc: t('step2.question2_13.opt2_desc') },
        { value: '3', icon: '💧', title: t('step2.question2_13.opt3'), desc: t('step2.question2_13.opt3_desc') },
        { value: '4', icon: '🧪', title: t('step2.question2_13.opt4'), desc: t('step2.question2_13.opt4_desc') },
        { value: '5', icon: '⚙️', title: t('step2.question2_13.opt5'), desc: t('step2.question2_13.opt5_desc') },
        { value: '6', icon: '💨', title: t('step2.question2_13.opt6'), desc: t('step2.question2_13.opt6_desc') }
    ];
    container.innerHTML = `
        <div class="question-card">
            <div class="question-header">
                <span class="question-number">2-13</span>
                <span class="question-tag tag-standard">${t('step2.question2_13.tag')}</span>
            </div>
            <h2 class="question-title">${title}</h2>
            <p class="question-description">${description}</p>
            <div class="multi-select-notice">
                <span>🔹 ${t('step2.question2_13.multi_select')}</span>
            </div>
            <div class="options-list" id="options-list-2-13">
                ${options.map(opt => `
                    <label class="option-card option-multi" data-value="${opt.value}">
                        <input type="checkbox" name="contaminant" value="${opt.value}">
                        <div class="option-content">
                            <div class="option-icon">${opt.icon}</div>
                            <div class="option-text">
                                <strong>${opt.title}</strong>
                                <span>${opt.desc}</span>
                            </div>
                        </div>
                        <div class="option-checkbox"></div>
                    </label>
                `).join('')}
            </div>
            <div class="action-bar">
                <button id="back-btn-2-13" class="btn btn-secondary">
                    <svg class="btn-arrow-back" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M9 18l6-6-6-6"/>
                    </svg>
                    ${btnBack}
                </button>
                <button id="next-btn-2-13" class="btn btn-primary" disabled>
                    ${btnContinue}
                    <svg class="btn-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M9 18l6-6-6-6"/>
                    </svg>
                </button>
            </div>
        </div>
    `;
    const optionCards = container.querySelectorAll('#options-list-2-13 .option-card');
    const checkboxes = container.querySelectorAll('input[name="contaminant"]');
    const nextBtn = container.querySelector('#next-btn-2-13');
    const backBtn = container.querySelector('#back-btn-2-13');
    let selectedValues = new Set();
    optionCards.forEach(card => {
        card.addEventListener('click', (e) => {
            const checkbox = card.querySelector('input[type="checkbox"]');
            const value = card.dataset.value;
            if (value === '1') {
                if (!checkbox.checked) {
                    checkboxes.forEach(cb => {
                        if (cb.value !== '1') {
                            cb.checked = false;
                            cb.closest('.option-card').classList.remove('selected');
                        }
                    });
                    selectedValues.clear();
                    selectedValues.add('1');
                }
            } else {
                if (!checkbox.checked) {
                    const cleanCheckbox = container.querySelector('input[value="1"]');
                    if (cleanCheckbox) {
                        cleanCheckbox.checked = false;
                        cleanCheckbox.closest('.option-card').classList.remove('selected');
                    }
                    selectedValues.delete('1');
                }
            }
            checkbox.checked = !checkbox.checked;
            card.classList.toggle('selected');
            if (checkbox.checked) {
                selectedValues.add(value);
            } else {
                selectedValues.delete(value);
            }
            nextBtn.disabled = selectedValues.size === 0;
        });
    });
    nextBtn.addEventListener('click', () => {
        const values = Array.from(selectedValues);
        appState.setAnswer('2-13', values);
        if (values.includes('2') || values.includes('5')) {
            appState.setFlag('PARTICLE_CONTAMINATION', true);
        }
        if (values.includes('3')) {
            appState.setFlag('MOISTURE_PRESENT', true);
        }
        if (values.includes('4') || values.includes('6')) {
            appState.setFlag('CORROSIVE_ENVIRONMENT', true);
        }
        const path = appState.getAnswer('1-1');
        const hasParticles = values.includes('2') || values.includes('5');
        if ((path === '2' || path === '3') && hasParticles) {
            window.dispatchEvent(new CustomEvent('navigate', { 
                detail: { question: '2-13a' } 
            }));
        } else {
            goToConditionalParams();
        }
    });
    backBtn.addEventListener('click', () => {
        const path = appState.getAnswer('1-1');
        if (path === '2') {
            window.dispatchEvent(new CustomEvent('navigate', { 
                detail: { question: '2-9' } 
            }));
        } else {
            const mechanisms = appState.getAnswer('2-8-mechanisms') || [];
            if (mechanisms.includes('4')) {
                window.dispatchEvent(new CustomEvent('navigate', { 
                    detail: { question: '2-8c' } 
                }));
            } else {
                window.dispatchEvent(new CustomEvent('navigate', { 
                    detail: { question: '2-8b' } 
                }));
            }
        }
    });
    function goToConditionalParams() {
    const motionType = appState.getAnswer('2-9');
    const part1 = appState.getAnswer('2-1') || appState.getAnswer('1-2-1');
    const contaminants = appState.getAnswer('2-13') || [];
    const path = appState.getAnswer('1-1');
    const needsConditionalParams = 
        (motionType === '5' || motionType === '6') ||
        (['13', '14'].includes(part1)) ||
        (path === '1') ||
        (contaminants.includes('2') || contaminants.includes('5')) ||
        (part1 === '2');
    if (needsConditionalParams) {
        if (part1 === '2' && motionType !== '5' && motionType !== '6' && 
            !['13', '14'].includes(part1) && path !== '1' && 
            !contaminants.includes('2') && !contaminants.includes('5')) {
            window.dispatchEvent(new CustomEvent('navigate', { 
                detail: { question: '2-13h' } 
            }));
        } else {
            window.dispatchEvent(new CustomEvent('navigate', { 
                detail: { question: '2-13b' } 
            }));
        }
    } else {
        window.dispatchEvent(new CustomEvent('navigate', { 
            detail: { question: '2-14' } 
        }));
    }
}
    const saved = appState.getAnswer('2-13');
    if (saved && Array.isArray(saved)) {
        saved.forEach(value => {
            const card = container.querySelector(`.option-card[data-value="${value}"]`);
            if (card) {
                card.classList.add('selected');
                const cb = card.querySelector('input');
                if (cb) cb.checked = true;
                selectedValues.add(value);
            }
        });
        nextBtn.disabled = selectedValues.size === 0;
    }
}