import appState from '../../state.js';
import router from '../../router.js';
export function renderQuestion2_8c(container) {
    const t = (key, params = {}) => appState.t(key, params);
    const title = t('step2.question2_8c.title');
    const btnContinue = t('common.btnContinue');
    const btnBack = t('common.btnBack');
    const options = [
        { value: '1', icon: '✅', text: t('step2.question2_8c.opt1') },
        { value: '2', icon: '❌', text: t('step2.question2_8c.opt2') },
        { value: '3', icon: '❓', text: t('step2.question2_8c.opt3') }
    ];
    container.innerHTML = `
        <div class="question-card">
            <div class="question-header">
                <span class="question-number">2-8c</span>
                <span class="question-tag tag-conditional">${t('step2.question2_8c.tag')}</span>
            </div>
            <h2 class="question-title">${title}</h2>
            <div class="options-list" id="options-2-8c">
                ${options.map(opt => `
                    <label class="option-card" data-value="${opt.value}">
                        <input type="radio" name="q-2-8c" value="${opt.value}">
                        <div class="option-content">
                            <div class="option-icon">${opt.icon}</div>
                            <div class="option-text">
                                <span>${opt.text}</span>
                            </div>
                        </div>
                        <div class="option-radio"></div>
                    </label>
                `).join('')}
            </div>
            <div class="action-bar">
                <button id="back-btn-2-8c" class="btn btn-secondary">
                    <svg class="btn-arrow-back" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M9 18l6-6-6-6"/>
                    </svg>
                    ${btnBack}
                </button>
                <button id="next-btn-2-8c" class="btn btn-primary" disabled>
                    ${btnContinue}
                    <svg class="btn-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M9 18l6-6-6-6"/>
                    </svg>
                </button>
            </div>
        </div>
    `;
    const cards = container.querySelectorAll('#options-2-8c .option-card');
    const nextBtn = container.querySelector('#next-btn-2-8c');
    const backBtn = container.querySelector('#back-btn-2-8c');
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
        appState.setAnswer('2-8c', selectedValue);
        if (selectedValue === '1') {
            appState.setFlag('SUBSURFACE_CRACK', true);
        } else if (selectedValue === '3') {
            appState.setFlag('SUBSURFACE_UNKNOWN', true);
        }
        window.dispatchEvent(new CustomEvent('navigate', { 
            detail: { question: getNextAfterMechanism() } 
        }));
    });
    backBtn.addEventListener('click', () => {
        window.dispatchEvent(new CustomEvent('navigate', { 
            detail: { question: '2-8b' } 
        }));
    });
    const saved = appState.getAnswer('2-8c');
    if (saved) {
        const savedCard = container.querySelector(`.option-card[data-value="${saved}"]`);
        if (savedCard) {
            savedCard.classList.add('selected');
            savedCard.querySelector('input').checked = true;
            selectedValue = saved;
            nextBtn.disabled = false;
        }
    }
}
function getNextAfterMechanism() {
    const path = appState.getAnswer('1-1');
    if (path === '2') return '2-9';
    if (path === '3') return '2-13';
    return '2-14';
}