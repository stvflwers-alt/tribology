import appState from '../../state.js';
import router from '../../router.js';
export function renderQuestion2_5(container) {
    const t = (key, params = {}) => appState.t(key, params);
    const title = t('step2.question2_5.title');
    const btnContinue = t('common.btnContinue');
    const btnBack = t('common.btnBack');
    const part1 = appState.getAnswer('2-1') || appState.getAnswer('1-2-1');
    const part2 = appState.getAnswer('2-2') || appState.getAnswer('1-2-2');
    const geometryMapping = {
        '1-1': { code: '4', nameKey: 'geo4' },
        '2-2': { code: '1', nameKey: 'geo1' },
        '3-3': { code: '3', nameKey: 'geo3' },
        '3-3-alt': { code: '4', nameKey: 'geo4' },
        '4-4': { code: '4', nameKey: 'geo4' },
        '5-5': { code: '2', nameKey: 'geo2' },
        '6-10': { code: '1', nameKey: 'geo1' },
        '7-5': { code: '1', nameKey: 'geo1' },
        '8-6': { code: '2', nameKey: 'geo2' },
        '9-7': { code: '3', nameKey: 'geo3' },
        '10-8': { code: '2', nameKey: 'geo2' },
        '11-9': { code: '1', nameKey: 'geo1' },
        '12-10': { code: '4', nameKey: 'geo4' },
        '13-14': { code: '3', nameKey: 'geo3' }
    };
    const key = `${part1}-${part2}`;
    let detectedGeometryCode = '7';
    let detectedGeometryNameKey = 'geo7';
    if (geometryMapping[key]) {
        detectedGeometryCode = geometryMapping[key].code;
        detectedGeometryNameKey = geometryMapping[key].nameKey;
    }
    if (part1 === '3' && geometryMapping[key]) {
        const part1Detail = appState.getAnswer('1-2-1-subtype');
        if (part1Detail === 'roller') {
            detectedGeometryCode = '4';
            detectedGeometryNameKey = 'geo4';
        }
    }
    const detectedGeometryName = t(`step2.question2_5.${detectedGeometryNameKey}`);
    const geometryOptions = [
        { value: '1', nameKey: 'geo1', descKey: 'geo1_desc' },
        { value: '2', nameKey: 'geo2', descKey: 'geo2_desc' },
        { value: '3', nameKey: 'geo3', descKey: 'geo3_desc' },
        { value: '4', nameKey: 'geo4', descKey: 'geo4_desc' },
        { value: '5', nameKey: 'geo5', descKey: 'geo5_desc' },
        { value: '6', nameKey: 'geo6', descKey: 'geo6_desc' },
        { value: '7', nameKey: 'geo7', descKey: 'geo7_desc' }
    ];
    container.innerHTML = `
        <div class="question-card">
            <div class="question-header">
                <span class="question-number">2-5</span>
                <span class="question-tag tag-auto">${t('step2.question2_5.tag')}</span>
            </div>
            <h2 class="question-title">${title}</h2>
            <div class="auto-detection-box">
                <div class="auto-detection-icon">🔍</div>
                <div class="auto-detection-text">
                    <strong>${t('step2.question2_5.auto_detected')}</strong>
                    <p>${t('step2.question2_5.detected_as', { geometry: detectedGeometryName })}</p>
                </div>
            </div>
            <p class="question-description">${t('step2.question2_5.confirm_message')}</p>
            <div class="options-list" id="options-list-2-5">
                ${geometryOptions.map(opt => {
                    const optName = t(`step2.question2_5.${opt.nameKey}`);
                    const optDesc = t(`step2.question2_5.${opt.descKey}`);
                    const isRecommended = opt.value === detectedGeometryCode;
                    return `
                        <label class="option-card ${isRecommended ? 'option-recommended' : ''}" 
                               data-value="${opt.value}">
                            <input type="radio" name="question-2-5" value="${opt.value}" 
                                   ${isRecommended ? 'checked' : ''}>
                            <div class="option-content">
                                <div class="option-text">
                                    <strong>${optName}</strong>
                                    <span>${optDesc}</span>
                                </div>
                                ${isRecommended ? 
                                    `<span class="recommended-badge">${t('common.recommended')}</span>` : ''}
                            </div>
                            <div class="option-radio"></div>
                        </label>
                    `;
                }).join('')}
            </div>
            <div class="action-bar">
                <button id="back-btn-2-5" class="btn btn-secondary">
                    <svg class="btn-arrow-back" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M9 18l6-6-6-6"/>
                    </svg>
                    ${btnBack}
                </button>
                <button id="next-btn-2-5" class="btn btn-primary">
                    ${btnContinue}
                    <svg class="btn-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M9 18l6-6-6-6"/>
                    </svg>
                </button>
            </div>
        </div>
    `;
    const optionCards = container.querySelectorAll('#options-list-2-5 .option-card');
    const nextBtn = container.querySelector('#next-btn-2-5');
    const backBtn = container.querySelector('#back-btn-2-5');
    let selectedValue = detectedGeometryCode;
    optionCards.forEach(card => {
        card.addEventListener('click', () => {
            optionCards.forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');
            selectedValue = card.dataset.value;
        });
    });
    const recommendedCard = container.querySelector(`.option-card[data-value="${detectedGeometryCode}"]`);
    if (recommendedCard) {
        recommendedCard.classList.add('selected');
    }
    nextBtn.addEventListener('click', () => {
        appState.setAnswer('2-5', selectedValue);
        const condition = router.checkCondition('2-5');
        let nextQuestion;
        if (condition && condition.needQuestion) {
            nextQuestion = condition.needQuestion;
        } else {
            nextQuestion = '2-6';
        }
        window.dispatchEvent(new CustomEvent('navigate', { 
            detail: { question: nextQuestion } 
        }));
    });
    backBtn.addEventListener('click', () => {
        window.dispatchEvent(new CustomEvent('navigate', { 
            detail: { question: '2-3' } 
        }));
    });
}