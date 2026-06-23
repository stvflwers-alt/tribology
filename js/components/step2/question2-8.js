import appState from '../../state.js';
import router from '../../router.js';
export function renderQuestion2_8(container) {
    const t = (key, params = {}) => appState.t(key, params);
    const savedFamily = appState.getAnswer('2-8-family');
    if (!savedFamily) {
        renderFamilySelection(container, t);
    } else {
        renderPatternSelection(container, t, savedFamily);
    }
}
function renderFamilySelection(container, t) {
    const title = t('step2.question2_8.title');
    const description = t('step2.question2_8.description');
    const btnContinue = t('common.btnContinue');
    const btnBack = t('common.btnBack');
    const families = [
        { value: '1', icon: '✅', name: t('step2.question2_8.family1'), desc: t('step2.question2_8.family1_desc') },
        { value: '2', icon: '🔪', name: t('step2.question2_8.family2'), desc: t('step2.question2_8.family2_desc') },
        { value: '3', icon: '🔥', name: t('step2.question2_8.family3'), desc: t('step2.question2_8.family3_desc') },
        { value: '4', icon: '💥', name: t('step2.question2_8.family4'), desc: t('step2.question2_8.family4_desc') },
        { value: '5', icon: '🧪', name: t('step2.question2_8.family5'), desc: t('step2.question2_8.family5_desc') },
        { value: '6', icon: '🕳️', name: t('step2.question2_8.family6'), desc: t('step2.question2_8.family6_desc') },
        { value: '7', icon: '💨', name: t('step2.question2_8.family7'), desc: t('step2.question2_8.family7_desc') },
        { value: '8', icon: '🟤', name: t('step2.question2_8.family8'), desc: t('step2.question2_8.family8_desc') },
        { value: '9', icon: '❓', name: t('step2.question2_8.family9'), desc: t('step2.question2_8.family9_desc') }
    ];
    container.innerHTML = `
        <div class="question-card">
            <div class="question-header">
                <span class="question-number">2-8</span>
                <span class="question-tag tag-important">${t('step2.question2_8.tag')}</span>
            </div>
            <h2 class="question-title">${title}</h2>
            <p class="question-description">${description}</p>
            <div class="step-indicator-container">
                <span class="step-badge active">${t('step2.question2_8.step1')}</span>
                <span class="step-arrow">→</span>
                <span class="step-badge">${t('step2.question2_8.step2')}</span>
            </div>
            <div class="options-list" id="family-options">
                ${families.map(fam => `
                    <label class="option-card" data-value="${fam.value}">
                        <input type="radio" name="family" value="${fam.value}">
                        <div class="option-content">
                            <div class="option-icon">${fam.icon}</div>
                            <div class="option-text">
                                <strong>${fam.name}</strong>
                                <span>${fam.desc}</span>
                            </div>
                        </div>
                        <div class="option-radio"></div>
                    </label>
                `).join('')}
            </div>
            <div class="action-bar">
                <button id="back-btn-2-8" class="btn btn-secondary">
                    <svg class="btn-arrow-back" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M9 18l6-6-6-6"/>
                    </svg>
                    ${btnBack}
                </button>
                <button id="next-btn-2-8" class="btn btn-primary" disabled>
                    ${btnContinue}
                    <svg class="btn-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M9 18l6-6-6-6"/>
                    </svg>
                </button>
            </div>
        </div>
    `;
    const cards = container.querySelectorAll('#family-options .option-card');
    const nextBtn = container.querySelector('#next-btn-2-8');
    const backBtn = container.querySelector('#back-btn-2-8');
    let selectedFamily = null;
    cards.forEach(card => {
        card.addEventListener('click', () => {
            cards.forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');
            selectedFamily = card.dataset.value;
            nextBtn.disabled = false;
        });
    });
    nextBtn.addEventListener('click', () => {
        appState.setAnswer('2-8-family', selectedFamily);
        if (selectedFamily === '1') {
            appState.setAnswer('2-8-pattern', '1');
            appState.setAnswer('2-8-mechanism', '0');
            const path = appState.getAnswer('1-1');
            const nextQ = path === '1' ? '2-14' : '2-9';
            window.dispatchEvent(new CustomEvent('navigate', { detail: { question: nextQ } }));
        } else {
            renderQuestion2_8(container);
        }
    });
    backBtn.addEventListener('click', () => {
        window.dispatchEvent(new CustomEvent('navigate', { 
            detail: { question: '2-6' } 
        }));
    });
}
function renderPatternSelection(container, t, family) {
    const title = t('step2.question2_8.pattern_title');
    const btnContinue = t('common.btnContinue');
    const btnBack = t('common.btnBack');
    const patternsByFamily = {
        '2': [
            { value: '1', name: t('step2.question2_8.pattern2_1'), desc: t('step2.question2_8.pattern2_1_desc') },
            { value: '2', name: t('step2.question2_8.pattern2_2'), desc: t('step2.question2_8.pattern2_2_desc') },
            { value: '3', name: t('step2.question2_8.pattern2_3'), desc: t('step2.question2_8.pattern2_3_desc') },
            { value: '4', name: t('step2.question2_8.pattern2_4'), desc: t('step2.question2_8.pattern2_4_desc') },
            { value: '5', name: t('step2.question2_8.pattern2_5'), desc: t('step2.question2_8.pattern2_5_desc') }
        ],
        '3': [
            { value: '1', name: t('step2.question2_8.pattern3_1'), desc: t('step2.question2_8.pattern3_1_desc') },
            { value: '2', name: t('step2.question2_8.pattern3_2'), desc: t('step2.question2_8.pattern3_2_desc') },
            { value: '3', name: t('step2.question2_8.pattern3_3'), desc: t('step2.question2_8.pattern3_3_desc') },
            { value: '4', name: t('step2.question2_8.pattern3_4'), desc: t('step2.question2_8.pattern3_4_desc') },
            { value: '5', name: t('step2.question2_8.pattern3_5'), desc: t('step2.question2_8.pattern3_5_desc') }
        ],
        '4': [
            { value: '1', name: t('step2.question2_8.pattern4_1'), desc: t('step2.question2_8.pattern4_1_desc') },
            { value: '2', name: t('step2.question2_8.pattern4_2'), desc: t('step2.question2_8.pattern4_2_desc') },
            { value: '3', name: t('step2.question2_8.pattern4_3'), desc: t('step2.question2_8.pattern4_3_desc') },
            { value: '4', name: t('step2.question2_8.pattern4_4'), desc: t('step2.question2_8.pattern4_4_desc') },
            { value: '5', name: t('step2.question2_8.pattern4_5'), desc: t('step2.question2_8.pattern4_5_desc') },
            { value: '6', name: t('step2.question2_8.pattern4_6'), desc: t('step2.question2_8.pattern4_6_desc') }
        ],
        '5': [
            { value: '1', name: t('step2.question2_8.pattern5_1'), desc: t('step2.question2_8.pattern5_1_desc') },
            { value: '2', name: t('step2.question2_8.pattern5_2'), desc: t('step2.question2_8.pattern5_2_desc') },
            { value: '3', name: t('step2.question2_8.pattern5_3'), desc: t('step2.question2_8.pattern5_3_desc') },
            { value: '4', name: t('step2.question2_8.pattern5_4'), desc: t('step2.question2_8.pattern5_4_desc') },
            { value: '5', name: t('step2.question2_8.pattern5_5'), desc: t('step2.question2_8.pattern5_5_desc') }
        ],
        '6': [
            { value: '1', name: t('step2.question2_8.pattern6_1'), desc: t('step2.question2_8.pattern6_1_desc') },
            { value: '2', name: t('step2.question2_8.pattern6_2'), desc: t('step2.question2_8.pattern6_2_desc') },
            { value: '3', name: t('step2.question2_8.pattern6_3'), desc: t('step2.question2_8.pattern6_3_desc') }
        ],
        '7': [
            { value: '1', name: t('step2.question2_8.pattern7_1'), desc: t('step2.question2_8.pattern7_1_desc') },
            { value: '2', name: t('step2.question2_8.pattern7_2'), desc: t('step2.question2_8.pattern7_2_desc') },
            { value: '3', name: t('step2.question2_8.pattern7_3'), desc: t('step2.question2_8.pattern7_3_desc') },
            { value: '4', name: t('step2.question2_8.pattern7_4'), desc: t('step2.question2_8.pattern7_4_desc') }
        ],
        '8': [
            { value: '1', name: t('step2.question2_8.pattern8_1'), desc: t('step2.question2_8.pattern8_1_desc') },
            { value: '2', name: t('step2.question2_8.pattern8_2'), desc: t('step2.question2_8.pattern8_2_desc') },
            { value: '3', name: t('step2.question2_8.pattern8_3'), desc: t('step2.question2_8.pattern8_3_desc') },
            { value: '4', name: t('step2.question2_8.pattern8_4'), desc: t('step2.question2_8.pattern8_4_desc') }
        ],
        '9': [
            { value: '1', name: t('step2.question2_8.pattern9_1'), desc: t('step2.question2_8.pattern9_1_desc') },
            { value: '2', name: t('step2.question2_8.pattern9_2'), desc: t('step2.question2_8.pattern9_2_desc') },
            { value: '3', name: t('step2.question2_8.pattern9_3'), desc: t('step2.question2_8.pattern9_3_desc') },
            { value: '4', name: t('step2.question2_8.pattern9_4'), desc: t('step2.question2_8.pattern9_4_desc') },
            { value: '5', name: t('step2.question2_8.pattern9_5'), desc: t('step2.question2_8.pattern9_5_desc') }
        ]
    };
    const familyNames = {
        '2': t('step2.question2_8.family2'),
        '3': t('step2.question2_8.family3'),
        '4': t('step2.question2_8.family4'),
        '5': t('step2.question2_8.family5'),
        '6': t('step2.question2_8.family6'),
        '7': t('step2.question2_8.family7'),
        '8': t('step2.question2_8.family8'),
        '9': t('step2.question2_8.family9')
    };
    const patterns = patternsByFamily[family] || [];
    container.innerHTML = `
        <div class="question-card">
            <div class="question-header">
                <span class="question-number">2-8</span>
                <span class="question-tag tag-important">${t('step2.question2_8.tag')}</span>
            </div>
            <h2 class="question-title">${title}</h2>
            <div class="step-indicator-container">
                <span class="step-badge completed">✓ ${familyNames[family]}</span>
                <span class="step-arrow">→</span>
                <span class="step-badge active">${t('step2.question2_8.step2')}</span>
            </div>
            <p class="question-description">${t('step2.question2_8.pattern_description')}</p>
            <div class="options-list" id="pattern-options">
                ${patterns.map(p => `
                    <label class="option-card" data-value="${p.value}">
                        <input type="radio" name="pattern" value="${p.value}">
                        <div class="option-content">
                            <div class="option-text">
                                <strong>${p.name}</strong>
                                <span>${p.desc}</span>
                            </div>
                        </div>
                        <div class="option-radio"></div>
                    </label>
                `).join('')}
            </div>
            <div class="action-bar">
                <button id="back-pattern-btn-2-8" class="btn btn-secondary">
                    <svg class="btn-arrow-back" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M9 18l6-6-6-6"/>
                    </svg>
                    ${t('common.btnBackToFamily')}
                </button>
                <button id="next-btn-2-8" class="btn btn-primary" disabled>
                    ${btnContinue}
                    <svg class="btn-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M9 18l6-6-6-6"/>
                    </svg>
                </button>
            </div>
        </div>
    `;
    const cards = container.querySelectorAll('#pattern-options .option-card');
    const nextBtn = container.querySelector('#next-btn-2-8');
    const backBtn = container.querySelector('#back-pattern-btn-2-8');
    let selectedPattern = null;
    cards.forEach(card => {
        card.addEventListener('click', () => {
            cards.forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');
            selectedPattern = card.dataset.value;
            nextBtn.disabled = false;
        });
    });
    nextBtn.addEventListener('click', () => {
        appState.setAnswer('2-8-pattern', selectedPattern);
        const mechanism = autoDetectMechanism(family, selectedPattern);
        appState.setAnswer('2-8-mechanism-auto', mechanism);
        const damageData = {
            family: family,
            pattern: selectedPattern,
            autoMechanism: mechanism
        };
        appState.setAnswer('2-8', damageData);
        const condition = router.checkCondition('2-8');
        let nextQuestion;
        if (condition && condition.needQuestion) {
            nextQuestion = condition.needQuestion;
        } else {
            nextQuestion = '2-8b';
        }
        window.dispatchEvent(new CustomEvent('navigate', { 
            detail: { question: nextQuestion } 
        }));
    });
    backBtn.addEventListener('click', () => {
        appState.setAnswer('2-8-family', null);
        renderQuestion2_8(container);
    });
}
function autoDetectMechanism(family, pattern) {
    const mapping = {
        '2': { '1': '1', '2': '2', '3': '1', '4': '1', '5': '2' },
        '3': { '1': '3', '2': '3', '3': '3', '4': '3', '5': '3' },
        '4': { '1': '4', '2': '4', '3': '4', '4': '4', '5': '4', '6': '4' },
        '5': { '1': '6', '2': '6', '3': '6', '4': '6', '5': '6' },
        '6': { '1': '8', '2': '8', '3': '8' },
        '7': { '1': '5', '2': '5', '3': '5', '4': '5' },
        '8': { '1': '7', '2': '7', '3': '7', '4': '7' },
        '9': { '1': '11', '2': '9', '3': '12', '4': '10', '5': '13' }
    };
    return mapping[family]?.[pattern] || null;
}