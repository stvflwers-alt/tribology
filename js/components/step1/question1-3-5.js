import appState from '../../state.js';
export function renderQuestion1_3_5(container) {
    const t = (key, params = {}) => appState.t(key, params);
    const title = t('step1.question1_3_5.title');
    const tag = t('step1.question1_3_5.tag');
    const btnContinue = t('common.btnContinue');
    const btnBack = t('common.btnBack');
    const options = [
        { value: '1', icon: '🔄', title: t('step1.question1_3_5.options.0.title') },
        { value: '2', icon: '❌', title: t('step1.question1_3_5.options.1.title') },
        { value: '3', icon: '❓', title: t('step1.question1_3_5.options.2.title') },
        { value: '4', icon: '⚠️', title: t('step1.question1_3_5.options.3.title') }
    ];
    container.innerHTML = `
        <div class="question-card">
            <div class="question-header">
                <span class="question-number">1-3-5</span>
                <span class="question-tag tag-path">${tag}</span>
            </div>
            <h2 class="question-title">${title}</h2>
            <div class="options-list" id="options-list-1-3-5">
                ${options.map(opt => `
                    <label class="option-card" data-value="${opt.value}">
                        <input type="radio" name="question-1-3-5" value="${opt.value}">
                        <div class="option-content">
                            <div class="option-icon">${opt.icon}</div>
                            <div class="option-text"><strong>${opt.title}</strong></div>
                        </div>
                        <div class="option-radio"></div>
                    </label>
                `).join('')}
            </div>
            <div class="action-bar">
                <button id="back-btn-1-3-5" class="btn btn-secondary">
                    <svg class="btn-arrow-back" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M9 18l6-6-6-6"/>
                    </svg>
                    ${btnBack}
                </button>
                <button id="next-btn-1-3-5" class="btn btn-primary" disabled>
                    ${btnContinue}
                    <svg class="btn-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M9 18l6-6-6-6"/>
                    </svg>
                </button>
            </div>
        </div>
    `;
    const optionCards = container.querySelectorAll('#options-list-1-3-5 .option-card');
    const nextBtn = container.querySelector('#next-btn-1-3-5');
    const backBtn = container.querySelector('#back-btn-1-3-5');
    let selectedValue = null;
    optionCards.forEach(card => {
        card.addEventListener('click', () => {
            selectedValue = card.dataset.value;
            nextBtn.disabled = false;
        });
    });
    nextBtn.addEventListener('click', () => {
        if (!selectedValue) return;
        appState.setAnswer('1-3-5', selectedValue);
        window.dispatchEvent(new CustomEvent('navigate', { detail: { question: 'end-step1' } }));
    });
    backBtn.addEventListener('click', () => {
        window.dispatchEvent(new CustomEvent('navigate', { detail: { question: '1-3-4' } }));
    });
}