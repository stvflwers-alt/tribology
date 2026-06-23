import appState from '../../state.js';
import router from '../../router.js';
export function renderQuestion2_15(container) {
    const t = (key, params = {}) => appState.t(key, params);
    const title = t('step2.question2_15.title');
    const description = t('step2.question2_15.description');
    const btnContinue = t('common.btnContinue');
    const btnBack = t('common.btnBack');
    const part2Code = appState.getAnswer('2-2') || appState.getAnswer('1-2-2');
    const part2Name = t(`step2.question2_15.part_name_${part2Code}`) || t('step2.question2_15.part_default');
    const options = [
        { value: '1', icon: '⬜', titleKey: 'opt1', descKey: 'opt1_desc' },
        { value: '2', icon: '🔧', titleKey: 'opt2', descKey: 'opt2_desc' },
        { value: '3', icon: '🔥', titleKey: 'opt3', descKey: 'opt3_desc' },
        { value: '4', icon: '💎', titleKey: 'opt4', descKey: 'opt4_desc' },
        { value: '5', icon: '✨', titleKey: 'opt5', descKey: 'opt5_desc' },
        { value: '6', icon: '🎨', titleKey: 'opt6', descKey: 'opt6_desc' },
        { value: '7', icon: '🛢️', titleKey: 'opt7', descKey: 'opt7_desc' }
    ];
    container.innerHTML = `
        <div class="question-card">
            <div class="question-header">
                <span class="question-number">2-15</span>
                <span class="question-tag tag-standard">${t('step2.question2_15.tag')}</span>
            </div>
            <h2 class="question-title">${title.replace('{part}', part2Name)}</h2>
            <p class="question-description">${description}</p>
            <div class="options-list" id="options-list-2-15">
                ${options.map(opt => `
                    <label class="option-card" data-value="${opt.value}">
                        <input type="radio" name="question-2-15" value="${opt.value}">
                        <div class="option-content">
                            <div class="option-icon">${opt.icon}</div>
                            <div class="option-text">
                                <strong>${t(`step2.question2_15.${opt.titleKey}`)}</strong>
                                <span>${t(`step2.question2_15.${opt.descKey}`)}</span>
                            </div>
                        </div>
                        <div class="option-radio"></div>
                    </label>
                `).join('')}
            </div>
            <div class="action-bar">
                <button id="back-btn-2-15" class="btn btn-secondary">
                    <svg class="btn-arrow-back" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M9 18l6-6-6-6"/>
                    </svg>
                    ${btnBack}
                </button>
                <button id="next-btn-2-15" class="btn btn-primary" disabled>
                    ${btnContinue}
                    <svg class="btn-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M9 18l6-6-6-6"/>
                    </svg>
                </button>
            </div>
        </div>
    `;
    const optionCards = container.querySelectorAll('#options-list-2-15 .option-card');
    const nextBtn = container.querySelector('#next-btn-2-15');
    const backBtn = container.querySelector('#back-btn-2-15');
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
        appState.setAnswer('2-15', selectedValue);
        const path = appState.getAnswer('1-1');
        let nextQuestion;
        if (path === '1') {
            nextQuestion = '2-geometry';
        } else {
            nextQuestion = '2-16';
        }
        window.dispatchEvent(new CustomEvent('navigate', { 
            detail: { question: nextQuestion } 
        }));
    });
    backBtn.addEventListener('click', () => {
        window.dispatchEvent(new CustomEvent('navigate', { 
            detail: { question: '2-14' } 
        }));
    });
    const savedAnswer = appState.getAnswer('2-15');
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