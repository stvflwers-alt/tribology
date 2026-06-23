import appState from '../../state.js';
import router from '../../router.js';
export function renderQuestion2_16(container) {
    const t = (key, params = {}) => appState.t(key, params);
    const path = appState.getAnswer('1-1');
    if (path === '1') {
        window.dispatchEvent(new CustomEvent('navigate', { 
            detail: { question: '2-geometry' } 
        }));
        return;
    }
    const title = t('step2.question2_16.title');
    const description = t('step2.question2_16.description');
    const btnContinue = t('common.btnContinue');
    const btnBack = t('common.btnBack');
    const options = [
        { value: '1', icon: '✅', title: t('step2.question2_16.opt1'), desc: t('step2.question2_16.opt1_desc') },
        { value: '2', icon: '⚠️', title: t('step2.question2_16.opt2'), desc: t('step2.question2_16.opt2_desc') },
        { value: '3', icon: '❓', title: t('step2.question2_16.opt3'), desc: t('step2.question2_16.opt3_desc') }
    ];
    container.innerHTML = `
        <div class="question-card">
            <div class="question-header">
                <span class="question-number">2-16</span>
                <span class="question-tag tag-conditional">${t('step2.question2_16.tag')}</span>
            </div>
            <h2 class="question-title">${title}</h2>
            <p class="question-description">${description}</p>
            <div class="options-list" id="options-list-2-16">
                ${options.map(opt => `
                    <label class="option-card" data-value="${opt.value}">
                        <input type="radio" name="question-2-16" value="${opt.value}">
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
                <button id="back-btn-2-16" class="btn btn-secondary">
                    <svg class="btn-arrow-back" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M9 18l6-6-6-6"/>
                    </svg>
                    ${btnBack}
                </button>
                <button id="next-btn-2-16" class="btn btn-primary" disabled>
                    ${btnContinue}
                    <svg class="btn-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M9 18l6-6-6-6"/>
                    </svg>
                </button>
            </div>
        </div>
    `;
    const optionCards = container.querySelectorAll('#options-list-2-16 .option-card');
    const nextBtn = container.querySelector('#next-btn-2-16');
    const backBtn = container.querySelector('#back-btn-2-16');
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
        appState.setAnswer('2-16', selectedValue);
        if (selectedValue === '2') {
            window.dispatchEvent(new CustomEvent('navigate', { 
                detail: { question: '2-16a' } 
            }));
        } else {
            window.dispatchEvent(new CustomEvent('navigate', { 
                detail: { question: '2-geometry' } 
            }));
        }
    });
    backBtn.addEventListener('click', () => {
        window.dispatchEvent(new CustomEvent('navigate', { 
            detail: { question: '2-15' } 
        }));
    });
    const savedAnswer = appState.getAnswer('2-16');
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