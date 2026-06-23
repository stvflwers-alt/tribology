import appState from '../../state.js';
import router from '../../router.js';
export function renderQuestion2_14(container) {
    const t = (key, params = {}) => appState.t(key, params);
    const title = t('step2.question2_14.title');
    const description = t('step2.question2_14.description');
    const btnContinue = t('common.btnContinue');
    const btnBack = t('common.btnBack');
    const part1Code = appState.getAnswer('2-1') || appState.getAnswer('1-2-1');
    const part1Name = t(`step2.question2_14.part_name_${part1Code}`) || t('step2.question2_14.part_default');
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
                <span class="question-number">2-14</span>
                <span class="question-tag tag-standard">${t('step2.question2_14.tag')}</span>
            </div>
            <h2 class="question-title">${title.replace('{part}', part1Name)}</h2>
            <p class="question-description">${description}</p>
            <div class="options-list" id="options-list-2-14">
                ${options.map(opt => `
                    <label class="option-card" data-value="${opt.value}">
                        <input type="radio" name="question-2-14" value="${opt.value}">
                        <div class="option-content">
                            <div class="option-icon">${opt.icon}</div>
                            <div class="option-text">
                                <strong>${t(`step2.question2_14.${opt.titleKey}`)}</strong>
                                <span>${t(`step2.question2_14.${opt.descKey}`)}</span>
                            </div>
                        </div>
                        <div class="option-radio"></div>
                    </label>
                `).join('')}
            </div>
            <div id="coating-detail-2-14" class="coating-detail-box" style="display: none;"></div>
            <div class="action-bar">
                <button id="back-btn-2-14" class="btn btn-secondary">
                    <svg class="btn-arrow-back" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M9 18l6-6-6-6"/>
                    </svg>
                    ${btnBack}
                </button>
                <button id="next-btn-2-14" class="btn btn-primary" disabled>
                    ${btnContinue}
                    <svg class="btn-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M9 18l6-6-6-6"/>
                    </svg>
                </button>
            </div>
        </div>
    `;
    const optionCards = container.querySelectorAll('#options-list-2-14 .option-card');
    const nextBtn = container.querySelector('#next-btn-2-14');
    const backBtn = container.querySelector('#back-btn-2-14');
    const coatingDetail = container.querySelector('#coating-detail-2-14');
    let selectedValue = null;
    const coatingInfo = {
        '2': t('step2.question2_14.info_plating'),
        '3': t('step2.question2_14.info_nitriding'),
        '4': t('step2.question2_14.info_carburizing'),
        '5': t('step2.question2_14.info_hard_coating'),
        '6': t('step2.question2_14.info_polymer'),
        '7': t('step2.question2_14.info_solid_lubricant')
    };
    optionCards.forEach(card => {
        card.addEventListener('click', () => {
            optionCards.forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');
            selectedValue = card.dataset.value;
            nextBtn.disabled = false;
            if (selectedValue !== '1' && coatingInfo[selectedValue]) {
                coatingDetail.innerHTML = `
                    <div class="info-box">
                        <span class="info-icon">ℹ️</span>
                        <p>${coatingInfo[selectedValue]}</p>
                    </div>
                `;
                coatingDetail.style.display = 'block';
            } else {
                coatingDetail.style.display = 'none';
            }
        });
    });
    nextBtn.addEventListener('click', () => {
        if (!selectedValue) return;
        appState.setAnswer('2-14', selectedValue);
        window.dispatchEvent(new CustomEvent('navigate', { 
            detail: { question: '2-15' } 
        }));
    });
    backBtn.addEventListener('click', () => {
        const path = appState.getAnswer('1-1');
        const contaminants = appState.getAnswer('2-13') || [];
        const motionType = appState.getAnswer('2-9');
        const part1 = appState.getAnswer('2-1') || appState.getAnswer('1-2-1');
        const hasConditionalParams = (motionType === '5' || motionType === '6') ||
               ['13', '14'].includes(part1) || path === '1' ||
               contaminants.includes('2') || contaminants.includes('5') || part1 === '2';
        if (hasConditionalParams) {
            window.dispatchEvent(new CustomEvent('navigate', { 
                detail: { question: '2-13b' } 
            }));
        } else if ((path === '2' || path === '3') && (contaminants.includes('2') || contaminants.includes('5'))) {
            window.dispatchEvent(new CustomEvent('navigate', { 
                detail: { question: '2-13a' } 
            }));
        } else {
            window.dispatchEvent(new CustomEvent('navigate', { 
                detail: { question: '2-13' } 
            }));
        }
    });
    const savedAnswer = appState.getAnswer('2-14');
    if (savedAnswer) {
        const savedCard = container.querySelector(`.option-card[data-value="${savedAnswer}"]`);
        if (savedCard) {
            savedCard.classList.add('selected');
            savedCard.querySelector('input').checked = true;
            selectedValue = savedAnswer;
            nextBtn.disabled = false;
            if (savedAnswer !== '1' && coatingInfo[savedAnswer]) {
                coatingDetail.innerHTML = `
                    <div class="info-box">
                        <span class="info-icon">ℹ️</span>
                        <p>${coatingInfo[savedAnswer]}</p>
                    </div>
                `;
                coatingDetail.style.display = 'block';
            }
        }
    }
}