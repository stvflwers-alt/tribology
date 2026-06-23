import appState from '../../state.js';
import router from '../../router.js';
export function renderQuestion2_8b(container) {
    const t = (key, params = {}) => appState.t(key, params);
    const title = t('step2.question2_8b.title');
    const btnContinue = t('common.btnContinue');
    const btnBack = t('common.btnBack');
    const autoMechanism = appState.getAnswer('2-8-mechanism-auto');
    const mechanismNames = {
        '0': t('step2.question2_8b.mechanism_0'),
        '1': t('step2.question2_8b.mechanism_1'),
        '2': t('step2.question2_8b.mechanism_2'),
        '3': t('step2.question2_8b.mechanism_3'),
        '4': t('step2.question2_8b.mechanism_4'),
        '5': t('step2.question2_8b.mechanism_5'),
        '6': t('step2.question2_8b.mechanism_6'),
        '7': t('step2.question2_8b.mechanism_7'),
        '8': t('step2.question2_8b.mechanism_8'),
        '9': t('step2.question2_8b.mechanism_9'),
        '10': t('step2.question2_8b.mechanism_10'),
        '11': t('step2.question2_8b.mechanism_11'),
        '12': t('step2.question2_8b.mechanism_12'),
        '13': t('step2.question2_8b.mechanism_13')
    };
    const autoName = mechanismNames[autoMechanism] || t('step2.question2_8b.unknown');
    container.innerHTML = `
        <div class="question-card">
            <div class="question-header">
                <span class="question-number">2-8b</span>
                <span class="question-tag tag-auto">${t('step2.question2_8b.tag')}</span>
            </div>
            <h2 class="question-title">${title}</h2>
            <div class="auto-detection-box highlight">
                <div class="auto-detection-icon">🤖</div>
                <div class="auto-detection-text">
                    <strong>${t('step2.question2_8b.auto_detected')}</strong>
                    <p>${t('step2.question2_8b.mechanism_is', { mechanism: autoName })}</p>
                </div>
            </div>
            <div class="options-list" id="confirm-options">
                <label class="option-card option-recommended" data-value="1">
                    <input type="radio" name="confirm" value="1" checked>
                    <div class="option-content">
                        <div class="option-text">
                            <strong>✅ ${t('step2.question2_8b.confirm_yes')}</strong>
                        </div>
                    </div>
                    <div class="option-radio"></div>
                </label>
                <label class="option-card" data-value="2">
                    <input type="radio" name="confirm" value="2">
                    <div class="option-content">
                        <div class="option-text">
                            <strong>❌ ${t('step2.question2_8b.confirm_no')}</strong>
                        </div>
                    </div>
                    <div class="option-radio"></div>
                </label>
                <label class="option-card" data-value="3">
                    <input type="radio" name="confirm" value="3">
                    <div class="option-content">
                        <div class="option-text">
                            <strong>➕ ${t('step2.question2_8b.confirm_additional')}</strong>
                        </div>
                    </div>
                    <div class="option-radio"></div>
                </label>
            </div>
            <div id="mechanism-list-container" style="display: none;"></div>
            <div class="action-bar">
                <button id="back-btn-2-8b" class="btn btn-secondary">
                    <svg class="btn-arrow-back" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M9 18l6-6-6-6"/>
                    </svg>
                    ${btnBack}
                </button>
                <button id="next-btn-2-8b" class="btn btn-primary">
                    ${btnContinue}
                    <svg class="btn-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M9 18l6-6-6-6"/>
                    </svg>
                </button>
            </div>
        </div>
    `;
    const confirmCards = container.querySelectorAll('#confirm-options .option-card');
    const nextBtn = container.querySelector('#next-btn-2-8b');
    const backBtn = container.querySelector('#back-btn-2-8b');
    const mechanismContainer = container.querySelector('#mechanism-list-container');
    let selectedConfirm = '1';
    let selectedMechanisms = [autoMechanism];
    confirmCards.forEach(card => {
        card.addEventListener('click', () => {
            confirmCards.forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');
            selectedConfirm = card.dataset.value;
            if (selectedConfirm === '2' || selectedConfirm === '3') {
                showMechanismList();
            } else {
                mechanismContainer.style.display = 'none';
            }
        });
    });
    function showMechanismList() {
        const allMechanisms = [];
        for (let i = 1; i <= 13; i++) {
            if (i !== parseInt(autoMechanism)) {
                allMechanisms.push({ value: String(i), name: mechanismNames[String(i)] });
            }
        }
        const isMultiple = selectedConfirm === '3';
        mechanismContainer.innerHTML = `
            <div class="mechanism-selection">
                <h4>${t('step2.question2_8b.select_mechanisms')}</h4>
                <p>${isMultiple ? t('step2.question2_8b.multiple_hint') : t('step2.question2_8b.single_hint')}</p>
                <div class="options-list" id="mechanism-options">
                    ${allMechanisms.map(m => `
                        <label class="option-card" data-value="${m.value}">
                            <input type="${isMultiple ? 'checkbox' : 'radio'}" name="mechanism" value="${m.value}">
                            <div class="option-content">
                                <div class="option-text">
                                    <span>${m.name}</span>
                                </div>
                            </div>
                            <div class="option-radio"></div>
                        </label>
                    `).join('')}
                </div>
            </div>
        `;
        mechanismContainer.style.display = 'block';
        const mechCards = mechanismContainer.querySelectorAll('#mechanism-options .option-card');
        mechCards.forEach(card => {
            card.addEventListener('click', () => {
                if (isMultiple) {
                    card.classList.toggle('selected');
                    const checkbox = card.querySelector('input[type="checkbox"]');
                    checkbox.checked = !checkbox.checked;
                } else {
                    mechCards.forEach(c => c.classList.remove('selected'));
                    card.classList.add('selected');
                }
                updateSelectedMechanisms();
            });
        });
    }
    function updateSelectedMechanisms() {
        selectedMechanisms = [];
        if (selectedConfirm === '3') {
            selectedMechanisms.push(autoMechanism);
        }
        const checkedInputs = mechanismContainer.querySelectorAll('input:checked');
        checkedInputs.forEach(input => {
            if (!selectedMechanisms.includes(input.value)) {
                selectedMechanisms.push(input.value);
            }
        });
    }
    nextBtn.addEventListener('click', () => {
        updateSelectedMechanisms();
        appState.setAnswer('2-8b', {
            confirm: selectedConfirm,
            mechanisms: selectedMechanisms
        });
        appState.setAnswer('2-8-mechanisms', selectedMechanisms);
        if (selectedMechanisms.length > 1) {
            appState.setFlag('COMBINED_MECHANISMS', true);
        }
        const hasFatigue = selectedMechanisms.includes('4');
        let nextQuestion;
        if (hasFatigue) {
            nextQuestion = '2-8c';
        } else {
            nextQuestion = getNextAfterMechanism();
        }
        window.dispatchEvent(new CustomEvent('navigate', { 
            detail: { question: nextQuestion } 
        }));
    });
    backBtn.addEventListener('click', () => {
        const damageData = appState.getAnswer('2-8');
        if (damageData && (damageData.family === '5' || damageData.family === '9')) {
            window.dispatchEvent(new CustomEvent('navigate', { 
                detail: { question: '2-8a' } 
            }));
        } else {
            window.dispatchEvent(new CustomEvent('navigate', { 
                detail: { question: '2-8' } 
            }));
        }
    });
    const defaultCard = container.querySelector('.option-card[data-value="1"]');
    if (defaultCard) defaultCard.classList.add('selected');
}
function getNextAfterMechanism() {
    const path = appState.getAnswer('1-1');
    if (path === '2') {
        return '2-9'; // عیب‌یابی: برو به نوع حرکت
    } else if (path === '3') {
        return '2-13'; // پایش: برو به آلاینده‌ها
    }
    return '2-14'; // طراحی: پوشش‌ها
}