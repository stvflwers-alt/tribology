import appState from '../../state.js';
export function renderQuestion1_3_2a(container) {
    const t = (key, params = {}) => appState.t(key, params);
    const title = t('step1.question1_3_2a.title');
    const description = t('step1.question1_3_2a.description');
    const tag = t('step1.question1_3_2a.tag');
    const btnContinue = t('common.btnContinue');
    const btnBack = t('common.btnBack');
    const options = [
        { value: '1', icon: '⚠️', title: t('step1.question1_3_2a.options.0.title'), desc: t('step1.question1_3_2a.options.0.desc') },
        { value: '2', icon: '✅', title: t('step1.question1_3_2a.options.1.title'), desc: t('step1.question1_3_2a.options.1.desc') },
        { value: '3', icon: '❓', title: t('step1.question1_3_2a.options.2.title'), desc: t('step1.question1_3_2a.options.2.desc') }
    ];
    container.innerHTML = `
        <div class="question-card">
            <div class="question-header">
                <span class="question-number">1-3-2-a</span>
                <span class="question-tag tag-path">${tag}</span>
            </div>
            <h2 class="question-title">${title}</h2>
            <p class="question-description">${description}</p>
            <div class="options-list" id="options-list-1-3-2a">
                ${options.map(opt => `
                    <label class="option-card" data-value="${opt.value}">
                        <input type="radio" name="question-1-3-2a" value="${opt.value}">
                        <div class="option-content">
                            <div class="option-icon">${opt.icon}</div>
                            <div class="option-text">
                                <strong>${opt.title}</strong>
                                <span>${opt.desc}</span>
                            </div>
                        </div>
                        <div class="option-radio"></div>
                    </label>
                `).join('')}
            </div>
            <div class="action-bar">
                <button id="back-btn-1-3-2a" class="btn btn-secondary">
                    <svg class="btn-arrow-back" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M9 18l6-6-6-6"/>
                    </svg>
                    ${btnBack}
                </button>
                <button id="next-btn-1-3-2a" class="btn btn-primary" disabled>
                    ${btnContinue}
                    <svg class="btn-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M9 18l6-6-6-6"/>
                    </svg>
                </button>
            </div>
        </div>
    `;
    const optionCards = container.querySelectorAll('#options-list-1-3-2a .option-card');
    const nextBtn = container.querySelector('#next-btn-1-3-2a');
    const backBtn = container.querySelector('#back-btn-1-3-2a');
    let selectedValue = null;
    optionCards.forEach(card => {
        card.addEventListener('click', () => {
            selectedValue = card.dataset.value;
            nextBtn.disabled = false;
        });
    });
    nextBtn.addEventListener('click', () => {
        if (!selectedValue) return;
        appState.setAnswer('1-3-2a', selectedValue);
        window.dispatchEvent(new CustomEvent('navigate', { detail: { question: '1-3-2b' } }));
    });
    backBtn.addEventListener('click', () => {
        const partAnswer = appState.getAnswer('1-3-1');
        if (partAnswer === '14') {
            window.dispatchEvent(new CustomEvent('navigate', { detail: { question: '1-3-1a' } }));
        } else if (['8', '9', '11'].includes(partAnswer)) {
            window.dispatchEvent(new CustomEvent('navigate', { detail: { question: '1-3-1b' } }));
        } else {
            window.dispatchEvent(new CustomEvent('navigate', { detail: { question: '1-3-1' } }));
        }
    });
}