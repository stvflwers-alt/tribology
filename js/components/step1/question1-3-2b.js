import appState from '../../state.js';
import Calculations from '../../calculations.js';
export function renderQuestion1_3_2b(container) {
    const t = (key, params = {}) => appState.t(key, params);
    const title = t('step1.question1_3_2b.title');
    const tag = t('step1.question1_3_2b.tag');
    const btnContinue = t('common.btnContinue');
    const btnBack = t('common.btnBack');
    const options = [
        { value: '1', title: t('step1.question1_3_2b.options.0.title'), desc: t('step1.question1_3_2b.options.0.desc'), msgClass: 'report-warning critical', msgKey: 'critical' },
        { value: '2', title: t('step1.question1_3_2b.options.1.title'), desc: t('step1.question1_3_2b.options.1.desc'), msgClass: 'report-warning urgent', msgKey: 'urgent' },
        { value: '3', title: t('step1.question1_3_2b.options.2.title'), desc: t('step1.question1_3_2b.options.2.desc'), msgClass: 'report-warning high', msgKey: 'high' },
        { value: '4', title: t('step1.question1_3_2b.options.3.title'), desc: t('step1.question1_3_2b.options.3.desc'), msgClass: 'report-info', msgKey: 'standard' },
        { value: '5', title: t('step1.question1_3_2b.options.4.title'), desc: t('step1.question1_3_2b.options.4.desc'), msgClass: 'report-warning', msgKey: 'unknown' }
    ];
    container.innerHTML = `
        <div class="question-card">
            <div class="question-header">
                <span class="question-number">1-3-2-b</span>
                <span class="question-tag tag-path">${tag}</span>
            </div>
            <h2 class="question-title">${title}</h2>
            <div class="options-list" id="options-list-1-3-2b">
                ${options.map(opt => `
                    <label class="option-card" data-value="${opt.value}">
                        <input type="radio" name="question-1-3-2b" value="${opt.value}">
                        <div class="option-content">
                            <div class="option-text">
                                <strong>${opt.title}</strong>
                                <span>${opt.desc}</span>
                            </div>
                        </div>
                        <div class="option-radio"></div>
                    </label>
                `).join('')}
            </div>
            <div id="priority-message-container"></div>
            <div class="action-bar">
                <button id="back-btn-1-3-2b" class="btn btn-secondary">
                    <svg class="btn-arrow-back" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M9 18l6-6-6-6"/>
                    </svg>
                    ${btnBack}
                </button>
                <button id="next-btn-1-3-2b" class="btn btn-primary" disabled>
                    ${btnContinue}
                    <svg class="btn-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M9 18l6-6-6-6"/>
                    </svg>
                </button>
            </div>
        </div>
    `;
    const optionCards = container.querySelectorAll('#options-list-1-3-2b .option-card');
    const nextBtn = container.querySelector('#next-btn-1-3-2b');
    const backBtn = container.querySelector('#back-btn-1-3-2b');
    const msgContainer = container.querySelector('#priority-message-container');
    let selectedValue = null;
    optionCards.forEach(card => {
        card.addEventListener('click', () => {
            selectedValue = card.dataset.value;
            nextBtn.disabled = false;
            const opt = options.find(o => o.value === selectedValue);
            if (opt) {
                const msgText = t(`step1.question1_3_2b.messages.${opt.msgKey}`);
                msgContainer.innerHTML = `
                    <div class="${opt.msgClass}">
                        <strong>${opt.title}</strong>
                        <p>${msgText}</p>
                    </div>
                `;
            }
        });
    });
    nextBtn.addEventListener('click', () => {
        if (!selectedValue) return;
        appState.setAnswer('1-3-2b', selectedValue);
        const safetyAnswer = appState.getAnswer('1-3-2a');
        Calculations.calculatePriority(safetyAnswer, selectedValue);
        window.dispatchEvent(new CustomEvent('navigate', { detail: { question: '1-3-3' } }));
    });
    backBtn.addEventListener('click', () => {
        window.dispatchEvent(new CustomEvent('navigate', { detail: { question: '1-3-2a' } }));
    });
}