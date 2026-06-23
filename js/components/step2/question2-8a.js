import appState from '../../state.js';
import router from '../../router.js';
export function renderQuestion2_8a(container) {
    const t = (key, params = {}) => appState.t(key, params);
    const title = t('step2.question2_8a.title');
    const btnContinue = t('common.btnContinue');
    const btnBack = t('common.btnBack');
    const options = [
        { value: '1', icon: '✅', text: t('step2.question2_8a.opt1') },
        { value: '2', icon: '🔥', text: t('step2.question2_8a.opt2') },
        { value: '3', icon: '🎨', text: t('step2.question2_8a.opt3') },
        { value: '4', icon: '🔬', text: t('step2.question2_8a.opt4') },
        { value: '5', icon: '🧪', text: t('step2.question2_8a.opt5') }
    ];
    container.innerHTML = `
        <div class="question-card">
            <div class="question-header">
                <span class="question-number">2-8a</span>
                <span class="question-tag tag-conditional">${t('step2.question2_8a.tag')}</span>
            </div>
            <h2 class="question-title">${title}</h2>
            <div class="options-list" id="options-2-8a">
                ${options.map(opt => `
                    <label class="option-card" data-value="${opt.value}">
                        <input type="radio" name="q-2-8a" value="${opt.value}">
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
                <button id="back-btn-2-8a" class="btn btn-secondary">
                    <svg class="btn-arrow-back" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M9 18l6-6-6-6"/>
                    </svg>
                    ${btnBack}
                </button>
                <button id="next-btn-2-8a" class="btn btn-primary" disabled>
                    ${btnContinue}
                    <svg class="btn-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M9 18l6-6-6-6"/>
                    </svg>
                </button>
            </div>
        </div>
    `;
    const cards = container.querySelectorAll('#options-2-8a .option-card');
    const nextBtn = container.querySelector('#next-btn-2-8a');
    const backBtn = container.querySelector('#back-btn-2-8a');
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
        appState.setAnswer('2-8a', selectedValue);
        if (selectedValue === '2' || selectedValue === '3') {
            appState.setFlag('THERMAL_DAMAGE', true);
        }
        if (selectedValue === '4') {
            appState.setFlag('DIFFUSION_WEAR', true);
        }
        if (selectedValue === '5') {
            appState.setFlag('OXIDATIVE_WEAR', true);
        }
        window.dispatchEvent(new CustomEvent('navigate', { 
            detail: { question: '2-8b' } 
        }));
    });
    backBtn.addEventListener('click', () => {
        window.dispatchEvent(new CustomEvent('navigate', { 
            detail: { question: '2-8' } 
        }));
    });
}