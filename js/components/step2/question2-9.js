import appState from '../../state.js';
import router from '../../router.js';
export function renderQuestion2_9(container) {
    const t = (key, params = {}) => appState.t(key, params);
    const path = appState.getAnswer('1-1');
    if (path !== '2') {
        const nextQ = path === '3' ? '2-13' : '2-14';
        window.dispatchEvent(new CustomEvent('navigate', { 
            detail: { question: nextQ } 
        }));
        return;
    }
    const title = t('step2.question2_9.title');
    const description = t('step2.question2_9.description');
    const btnContinue = t('common.btnContinue');
    const btnBack = t('common.btnBack');
    const options = [
        { value: '1', icon: '→', title: t('step2.question2_9.opt1'), desc: t('step2.question2_9.opt1_desc') },
        { value: '2', icon: '↔️', title: t('step2.question2_9.opt2'), desc: t('step2.question2_9.opt2_desc') },
        { value: '3', icon: '🔄', title: t('step2.question2_9.opt3'), desc: t('step2.question2_9.opt3_desc') },
        { value: '4', icon: '🔀', title: t('step2.question2_9.opt4'), desc: t('step2.question2_9.opt4_desc') },
        { value: '5', icon: '〰️', title: t('step2.question2_9.opt5'), desc: t('step2.question2_9.opt5_desc') },
        { value: '6', icon: '💥', title: t('step2.question2_9.opt6'), desc: t('step2.question2_9.opt6_desc') },
        { value: '7', icon: '⏸️', title: t('step2.question2_9.opt7'), desc: t('step2.question2_9.opt7_desc') },
        { value: '8', icon: '🌊', title: t('step2.question2_9.opt8'), desc: t('step2.question2_9.opt8_desc') }
    ];
    container.innerHTML = `
        <div class="question-card">
            <div class="question-header">
                <span class="question-number">2-9</span>
                <span class="question-tag tag-path">${t('step2.question2_9.tag')}</span>
            </div>
            <h2 class="question-title">${title}</h2>
            <p class="question-description">${description}</p>
            <div class="options-list" id="options-list-2-9">
                ${options.map(opt => `
                    <label class="option-card" data-value="${opt.value}">
                        <input type="radio" name="question-2-9" value="${opt.value}">
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
                <button id="back-btn-2-9" class="btn btn-secondary">
                    <svg class="btn-arrow-back" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M9 18l6-6-6-6"/>
                    </svg>
                    ${btnBack}
                </button>
                <button id="next-btn-2-9" class="btn btn-primary" disabled>
                    ${btnContinue}
                    <svg class="btn-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M9 18l6-6-6-6"/>
                    </svg>
                </button>
            </div>
        </div>
    `;
    const optionCards = container.querySelectorAll('#options-list-2-9 .option-card');
    const nextBtn = container.querySelector('#next-btn-2-9');
    const backBtn = container.querySelector('#back-btn-2-9');
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
        appState.setAnswer('2-9', selectedValue);
        if (selectedValue === '5') appState.setFlag('OSCILLATING_MOTION', true);
        if (selectedValue === '6') appState.setFlag('IMPACT_MOTION', true);
        window.dispatchEvent(new CustomEvent('navigate', { 
            detail: { question: '2-13' } 
        }));
    });
    backBtn.addEventListener('click', () => {
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
    });
    const savedAnswer = appState.getAnswer('2-9');
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