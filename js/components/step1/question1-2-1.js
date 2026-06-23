import appState from '../../state.js';
import router from '../../router.js';
export function renderQuestion1_2_1(container) {
    const t = (key, params = {}) => appState.t(key, params);
    const title = t('step1.question1_2_1.title');
    const description = t('step1.question1_2_1.description');
    const tag = t('step1.question1_2_1.tag');
    const btnContinue = t('common.btnContinue');
    const btnBack = t('common.btnBack');
    const icons = ['⚙️', '🔩', '🔴', '🔧', '📌', '🔐', '💨', '🛑', '🚂', '💧', '🏗️', '⛓️', '🌀', '❓'];
    const options = [];
    for (let i = 0; i < 14; i++) {
        const optTitle = t(`step1.question1_2_1.options.${i}.title`);
        const optDesc = t(`step1.question1_2_1.options.${i}.desc`);
        if (optTitle !== `step1.question1_2_1.options.${i}.title`) {
            options.push({ value: String(i + 1), icon: icons[i], title: optTitle, desc: optDesc });
        }
    }
    container.innerHTML = `
        <div class="question-card">
            <div class="question-header">
                <span class="question-number">1-2-1</span>
                <span class="question-tag tag-path">${tag}</span>
            </div>
            <h2 class="question-title">${title}</h2>
            <p class="question-description">${description}</p>
            <div class="options-list" id="options-list-1-2-1">
                ${options.map(opt => `
                    <label class="option-card" data-value="${opt.value}">
                        <input type="radio" name="question-1-2-1" value="${opt.value}">
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
                <button id="back-btn-1-2-1" class="btn btn-secondary">
                    <svg class="btn-arrow-back" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M9 18l6-6-6-6"/>
                    </svg>
                    ${btnBack}
                </button>
                <button id="next-btn-1-2-1" class="btn btn-primary" disabled>
                    ${btnContinue}
                    <svg class="btn-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M9 18l6-6-6-6"/>
                    </svg>
                </button>
            </div>
        </div>
    `;
    const optionCards = container.querySelectorAll('#options-list-1-2-1 .option-card');
    const nextBtn = container.querySelector('#next-btn-1-2-1');
    const backBtn = container.querySelector('#back-btn-1-2-1');
    let selectedValue = null;
    optionCards.forEach(card => {
        card.addEventListener('click', () => {
            selectedValue = card.dataset.value;
            nextBtn.disabled = false;
        });
    });
    nextBtn.addEventListener('click', () => {
        if (!selectedValue) return;
        appState.setAnswer('1-2-1', selectedValue);
        const condition = router.checkCondition('1-2-1');
        let nextQuestion;
        if (condition && condition.needQuestion) {
            nextQuestion = condition.needQuestion;
        } else {
            nextQuestion = '1-2-2';
        }
        window.dispatchEvent(new CustomEvent('navigate', { detail: { question: nextQuestion } }));
    });
    backBtn.addEventListener('click', () => {
        window.dispatchEvent(new CustomEvent('navigate', { detail: { question: '1-1' } }));
    });
    const savedAnswer = appState.getAnswer('1-2-1');
    if (savedAnswer) {
        const savedRadio = container.querySelector(`input[value="${savedAnswer}"]`);
        if (savedRadio) {
            savedRadio.checked = true;
            selectedValue = savedAnswer;
            nextBtn.disabled = false;
        }
    }
}