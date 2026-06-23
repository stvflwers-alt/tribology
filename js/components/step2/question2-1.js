import appState from '../../state.js';
import router from '../../router.js';
export function renderQuestion2_1(container) {
    const t = (key, params = {}) => appState.t(key, params);
    const path = appState.getAnswer('1-1');
    const getPartName = (code) => {
        const index = parseInt(code) - 1;
        if (index >= 0 && index < 14) {
            return t(`step2.question2_1.options.${index}.title`);
        }
        return t('common.unknown');
    };
    if (path === '1' || path === '2') {
        let part1Answer;
        if (path === '1') {
            part1Answer = appState.getAnswer('1-2-1');
        } else {
            part1Answer = appState.getAnswer('1-3-1');
        }
        appState.setAnswer('2-1', part1Answer);
        const partName = getPartName(part1Answer);
        container.innerHTML = `
            <div class="question-card">
                <div class="auto-detection-message">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--blue-standard)" stroke-width="2">
                        <circle cx="12" cy="12" r="10"/>
                        <path d="M12 6v6l4 2"/>
                    </svg>
                    <h2>${t('step2.question2_1.auto_detected')}</h2>
                    <p>${t('step2.question2_1.auto_message', { part: partName })}</p>
                    <div class="auto-detected-item">
                        <span class="auto-label">${t('step2.question2_1.detected_part')}:</span>
                        <span class="auto-value">${partName}</span>
                    </div>
                </div>
            </div>
        `;
        setTimeout(() => {
            const condition = router.checkCondition('2-1');
            let nextQuestion;
            if (condition && condition.needQuestion) {
                nextQuestion = condition.needQuestion;
            } else {
                nextQuestion = '2-2';
            }
            window.dispatchEvent(new CustomEvent('navigate', { 
                detail: { question: nextQuestion } 
            }));
        }, 1500);
        return;
    }
    if (path === '3') {
        const title = t('step2.question2_1.title');
        const description = t('step2.question2_1.description');
        const tag = t('step2.question2_1.tag');
        const btnContinue = t('common.btnContinue');
        const btnBack = t('common.btnBack');
        const icons = ['⚙️', '🔩', '🔴', '🔧', '📌', '🔐', '💨', '🛑', '🚂', '💧', '🏗️', '⛓️', '🌀', '❓'];
        const options = [];
        for (let i = 0; i < 14; i++) {
            const optTitle = t(`step2.question2_1.options.${i}.title`);
            const optDesc = t(`step2.question2_1.options.${i}.desc`);
            if (optTitle !== `step2.question2_1.options.${i}.title`) {
                options.push({ 
                    value: String(i + 1), 
                    icon: icons[i], 
                    title: optTitle, 
                    desc: optDesc 
                });
            }
        }
        container.innerHTML = `
            <div class="question-card">
                <div class="question-header">
                    <span class="question-number">2-1</span>
                    <span class="question-tag tag-path">${tag}</span>
                </div>
                <h2 class="question-title">${title}</h2>
                <p class="question-description">${description}</p>
                <div class="options-list" id="options-list-2-1">
                    ${options.map(opt => `
                        <label class="option-card" data-value="${opt.value}">
                            <input type="radio" name="question-2-1" value="${opt.value}">
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
                    <button id="back-btn-2-1" class="btn btn-secondary">
                        <svg class="btn-arrow-back" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M9 18l6-6-6-6"/>
                        </svg>
                        ${btnBack}
                    </button>
                    <button id="next-btn-2-1" class="btn btn-primary" disabled>
                        ${btnContinue}
                        <svg class="btn-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M9 18l6-6-6-6"/>
                        </svg>
                    </button>
                </div>
            </div>
        `;
        const optionCards = container.querySelectorAll('#options-list-2-1 .option-card');
        const nextBtn = container.querySelector('#next-btn-2-1');
        const backBtn = container.querySelector('#back-btn-2-1');
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
            appState.setAnswer('2-1', selectedValue);
            const condition = router.checkCondition('2-1');
            let nextQuestion;
            if (condition && condition.needQuestion) {
                nextQuestion = condition.needQuestion;
            } else {
                nextQuestion = '2-2';
            }
            window.dispatchEvent(new CustomEvent('navigate', { 
                detail: { question: nextQuestion } 
            }));
        });
        backBtn.addEventListener('click', () => {
            window.dispatchEvent(new CustomEvent('navigate', { 
                detail: { question: '1-4-3' } 
            }));
        });
        const savedAnswer = appState.getAnswer('2-1');
        if (savedAnswer) {
            const savedCard = container.querySelector(`.option-card[data-value="${savedAnswer}"]`);
            if (savedCard) {
                savedCard.classList.add('selected');
                const savedRadio = savedCard.querySelector('input');
                if (savedRadio) savedRadio.checked = true;
                selectedValue = savedAnswer;
                nextBtn.disabled = false;
            }
        }
    }
}