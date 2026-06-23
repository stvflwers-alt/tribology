import appState from '../../state.js';
import router from '../../router.js';
export function renderQuestion2_13a(container) {
    const t = (key, params = {}) => appState.t(key, params);
    const title = t('step2.question2_13a.title');
    const btnContinue = t('common.btnContinue');
    const btnBack = t('common.btnBack');
    container.innerHTML = `
        <div class="question-card">
            <div class="question-header">
                <span class="question-number">2-13a</span>
                <span class="question-tag tag-warning">${t('step2.question2_13a.tag')}</span>
            </div>
            <h2 class="question-title">${title}</h2>
            <div class="info-box warning-box">
                <div class="info-icon">⚠️</div>
                <div class="info-content">
                    <strong>${t('step2.question2_13a.warning_title')}</strong>
                    <p>${t('step2.question2_13a.warning_text')}</p>
                </div>
            </div>
            <p class="question-description">${t('step2.question2_13a.question')}</p>
            <div class="options-list" id="options-2-13a">
                ${[
                    { value: '1', text: t('step2.question2_13a.opt1') },
                    { value: '2', text: t('step2.question2_13a.opt2') },
                    { value: '3', text: t('step2.question2_13a.opt3') },
                    { value: '4', text: t('step2.question2_13a.opt4') },
                    { value: '5', text: t('step2.question2_13a.opt5') }
                ].map(opt => `
                    <label class="option-card" data-value="${opt.value}">
                        <input type="radio" name="q-2-13a" value="${opt.value}">
                        <div class="option-content">
                            <div class="option-text">
                                <span>${opt.text}</span>
                            </div>
                        </div>
                        <div class="option-radio"></div>
                    </label>
                `).join('')}
            </div>
            <div class="action-bar">
                <button id="back-btn-2-13a" class="btn btn-secondary">
                    <svg class="btn-arrow-back" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M9 18l6-6-6-6"/>
                    </svg>
                    ${btnBack}
                </button>
                <button id="next-btn-2-13a" class="btn btn-primary" disabled>
                    ${btnContinue}
                    <svg class="btn-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M9 18l6-6-6-6"/>
                    </svg>
                </button>
            </div>
        </div>
    `;
    const cards = container.querySelectorAll('#options-2-13a .option-card');
    const nextBtn = container.querySelector('#next-btn-2-13a');
    const backBtn = container.querySelector('#back-btn-2-13a');
    let selectedValue = null;
    cards.forEach(card => {
        card.addEventListener('click', () => {
            cards.forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');
            selectedValue = card.dataset.value;
            nextBtn.disabled = false;
        });
    });
    nextBtn.addEventListener('click', () => {
        appState.setAnswer('2-13a', selectedValue);
        if (['1', '2', '3'].includes(selectedValue)) {
            appState.setFlag('WEAR_SYNERGISM_DETECTED', true);
        } else if (selectedValue === '4') {
            appState.setFlag('WEAR_SYNERGISM_DETECTED', false);
        } else if (selectedValue === '5') {
            appState.setFlag('WEAR_SYNERGISM_UNKNOWN', true);
        }
        window.dispatchEvent(new CustomEvent('navigate', { 
            detail: { question: '2-13b' } 
        }));
    });
    backBtn.addEventListener('click', () => {
        window.dispatchEvent(new CustomEvent('navigate', { 
            detail: { question: '2-13' } 
        }));
    });
}