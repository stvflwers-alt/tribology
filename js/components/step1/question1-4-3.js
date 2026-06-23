import appState from '../../state.js';
import Calculations from '../../calculations.js';

export function renderQuestion1_4_3(container) {
    const t = (key, params = {}) => appState.t(key, params);
    const title = t('step1.question1_4_3.title');
    const description = t('step1.question1_4_3.description');
    const tag = t('step1.question1_4_3.tag');
    const btnContinue = t('common.btnContinue');
    const btnBack = t('common.btnBack');
    const directionIncrease = t('step1.question1_4_3.directionIncrease');
    const directionDecrease = t('step1.question1_4_3.directionDecrease');
    const validationWarning = t('step1.question1_4_3.validationWarning');
    const noChangeMessage = t('step1.question1_4_3.noChangeMessage');
    const changeDetectedMessage = t('step1.question1_4_3.changeDetectedMessage');
    
    const options = [
        { value: '1', icon: '⚖️', title: t('step1.question1_4_3.options.0.title'), desc: t('step1.question1_4_3.options.0.desc'), hasDirection: true, dirLabel: t('step1.question1_4_3.options.0.directionLabel') },
        { value: '2', icon: '🏃', title: t('step1.question1_4_3.options.1.title'), desc: t('step1.question1_4_3.options.1.desc'), hasDirection: true, dirLabel: t('step1.question1_4_3.options.1.directionLabel') },
        { value: '3', icon: '🌡️', title: t('step1.question1_4_3.options.2.title'), desc: t('step1.question1_4_3.options.2.desc'), hasDirection: true, dirLabel: t('step1.question1_4_3.options.2.directionLabel') },
        { value: '4', icon: '💨', title: t('step1.question1_4_3.options.3.title'), desc: t('step1.question1_4_3.options.3.desc'), hasDirection: true, dirLabel: t('step1.question1_4_3.options.3.directionLabel') },
        { value: '5', icon: '👤', title: t('step1.question1_4_3.options.4.title'), desc: t('step1.question1_4_3.options.4.desc'), hasDirection: false },
        { value: '6', icon: '🔧', title: t('step1.question1_4_3.options.5.title'), desc: t('step1.question1_4_3.options.5.desc'), hasDirection: false },
        { value: '7', icon: '🏭', title: t('step1.question1_4_3.options.6.title'), desc: t('step1.question1_4_3.options.6.desc'), hasDirection: false },
        { value: '8', icon: '🛢️', title: t('step1.question1_4_3.options.7.title'), desc: t('step1.question1_4_3.options.7.desc'), hasDirection: false },
        { value: '9', icon: '✅', title: t('step1.question1_4_3.options.8.title'), desc: t('step1.question1_4_3.options.8.desc'), hasDirection: false, isNone: true }
    ];
    
    const savedData = appState.getAnswer('1-4-3');
    const savedChanges = savedData && savedData.selectedChanges ? savedData.selectedChanges : [];
    const savedDirections = savedData && savedData.changesData ? savedData.changesData : [];
    
    let selectedChanges = new Set(savedChanges);
    let directionSelections = {};
    
    savedDirections.forEach(d => {
        if (d.direction) {
            directionSelections[d.code] = d.direction;
        }
    });
    
    function render() {
        container.innerHTML = `
            <div class="question-card">
                <div class="question-header">
                    <span class="question-number">1-4-3</span>
                    <span class="question-tag tag-path">${tag}</span>
                </div>
                <h2 class="question-title">${title}</h2>
                <p class="question-description">${description}</p>
                <div class="options-list" id="changes-list">
                    ${options.map(opt => `
                        <div class="change-option" data-value="${opt.value}" data-is-none="${opt.isNone || false}">
                            <label class="option-card ${selectedChanges.has(opt.value) ? 'selected' : ''}" style="margin-bottom: ${opt.hasDirection ? '0' : '12px'};">
                                <input type="checkbox" value="${opt.value}" class="change-checkbox" ${selectedChanges.has(opt.value) ? 'checked' : ''}>
                                <div class="option-content">
                                    <div class="option-icon">${opt.icon}</div>
                                    <div class="option-text">
                                        <strong>${opt.title}</strong>
                                        <span>${opt.desc}</span>
                                    </div>
                                </div>
                                <div class="option-checkbox"></div>
                            </label>
                            ${opt.hasDirection ? `
                                <div class="direction-selector" style="margin-right: 48px; margin-top: 8px; margin-bottom: 12px; display: ${selectedChanges.has(opt.value) ? 'block' : 'none'};">
                                    <div class="form-group">
                                        <label class="form-label">${opt.dirLabel}:</label>
                                        <div style="display: flex; gap: 12px;">
                                            <label class="option-card direction-option ${directionSelections[opt.value] === 'increase' ? 'selected' : ''}" data-value="${opt.value}" data-direction="increase" style="flex: 1;">
                                                <input type="radio" name="dir-${opt.value}" value="increase" ${directionSelections[opt.value] === 'increase' ? 'checked' : ''}>
                                                <div class="option-content">
                                                    <div class="option-icon">📈</div>
                                                    <div class="option-text"><strong>${directionIncrease}</strong></div>
                                                </div>
                                                <div class="option-radio"></div>
                                            </label>
                                            <label class="option-card direction-option ${directionSelections[opt.value] === 'decrease' ? 'selected' : ''}" data-value="${opt.value}" data-direction="decrease" style="flex: 1;">
                                                <input type="radio" name="dir-${opt.value}" value="decrease" ${directionSelections[opt.value] === 'decrease' ? 'checked' : ''}>
                                                <div class="option-content">
                                                    <div class="option-icon">📉</div>
                                                    <div class="option-text"><strong>${directionDecrease}</strong></div>
                                                </div>
                                                <div class="option-radio"></div>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            ` : ''}
                        </div>
                    `).join('')}
                </div>
                <div id="changes-message-container"></div>
                <div class="action-bar">
                    <button id="back-btn-1-4-3" class="btn btn-secondary">
                        <svg class="btn-arrow-back" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M9 18l6-6-6-6"/>
                        </svg>
                        ${btnBack}
                    </button>
                    <button id="next-btn-1-4-3" class="btn btn-primary">
                        ${btnContinue}
                        <svg class="btn-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M9 18l6-6-6-6"/>
                        </svg>
                    </button>
                </div>
            </div>
        `;
        
        attachEvents();
        updateUIState();
    }
    
    function attachEvents() {
        document.querySelectorAll('.change-option .option-card').forEach(card => {
            const checkbox = card.querySelector('.change-checkbox');
            const changeValue = card.closest('.change-option')?.dataset.value;
            
            card.addEventListener('click', (e) => {
                if (e.target.tagName === 'INPUT' || e.target.closest('.direction-selector')) return;
                e.preventDefault();
                e.stopPropagation();
                
                if (changeValue === '9') {
                    const isChecked = !checkbox.checked;
                    checkbox.checked = isChecked;
                    
                    if (isChecked) {
                        selectedChanges.clear();
                        directionSelections = {};
                        document.querySelectorAll('.change-checkbox').forEach(cb => {
                            if (cb.value !== '9') cb.checked = false;
                        });
                        selectedChanges.add('9');
                    } else {
                        selectedChanges.delete('9');
                    }
                } else {
                    if (selectedChanges.has('9')) {
                        selectedChanges.delete('9');
                        const noneCheckbox = document.querySelector('.change-option[data-value="9"] .change-checkbox');
                        if (noneCheckbox) noneCheckbox.checked = false;
                    }
                    
                    checkbox.checked = !checkbox.checked;
                    if (checkbox.checked) {
                        selectedChanges.add(changeValue);
                    } else {
                        selectedChanges.delete(changeValue);
                        delete directionSelections[changeValue];
                        
                        const radios = document.querySelectorAll(`input[name="dir-${changeValue}"]`);
                        radios.forEach(r => r.checked = false);
                    }
                }
                
                updateUIState();
            });
        });
        
        document.querySelectorAll('.direction-option').forEach(option => {
            option.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                const radio = option.querySelector('input[type="radio"]');
                if (radio && !radio.checked) {
                    radio.checked = true;
                    const changeValue = option.dataset.value;
                    const direction = option.dataset.direction;
                    
                    document.querySelectorAll(`.direction-option[data-value="${changeValue}"]`).forEach(opt => {
                        opt.classList.remove('selected');
                    });
                    option.classList.add('selected');
                    
                    directionSelections[changeValue] = direction;
                    updateUIState();
                }
            });
        });
        
        document.getElementById('next-btn-1-4-3')?.addEventListener('click', () => {
            if (selectedChanges.size === 0) return;
            
            if (selectedChanges.has('9')) {
                const changesData = [];
                appState.setAnswer('1-4-3', {
                    selectedChanges: Array.from(selectedChanges),
                    changesData: changesData
                });
                Calculations.analyzeChanges(Array.from(selectedChanges));
                window.dispatchEvent(new CustomEvent('navigate', { detail: { question: 'end-step1' } }));
                return;
            }
            
            let hasMissingDirection = false;
            for (const change of selectedChanges) {
                if (['1', '2', '3', '4'].includes(change) && !directionSelections[change]) {
                    hasMissingDirection = true;
                    break;
                }
            }
            
            if (hasMissingDirection) {
                const msgContainer = document.getElementById('changes-message-container');
                if (msgContainer) {
                    msgContainer.innerHTML = `<div class="report-warning"><p>${validationWarning}</p></div>`;
                }
                return;
            }
            
            const changesData = [];
            for (const change of selectedChanges) {
                changesData.push({
                    code: change,
                    direction: directionSelections[change] || null
                });
            }
            
            appState.setAnswer('1-4-3', {
                selectedChanges: Array.from(selectedChanges),
                changesData: changesData
            });
            Calculations.analyzeChanges(Array.from(selectedChanges));
            window.dispatchEvent(new CustomEvent('navigate', { detail: { question: 'end-step1' } }));
        });
        
        document.getElementById('back-btn-1-4-3')?.addEventListener('click', () => {
            window.dispatchEvent(new CustomEvent('navigate', { detail: { question: '1-4-2' } }));
        });
    }
    
    function updateUIState() {
        const noneSelected = selectedChanges.has('9');
        
        document.querySelectorAll('.change-option').forEach(option => {
            const value = option.dataset.value;
            const isNone = option.dataset.isNone === 'true';
            const card = option.querySelector('.option-card');
            const checkbox = option.querySelector('.change-checkbox');
            const directionDiv = option.querySelector('.direction-selector');
            
            if (!isNone && noneSelected) {
                if (checkbox) checkbox.disabled = true;
                if (card) card.style.opacity = '0.5';
                if (card) card.style.pointerEvents = 'none';
            } else {
                if (checkbox) checkbox.disabled = false;
                if (card) card.style.opacity = '1';
                if (card) card.style.pointerEvents = 'auto';
            }
            
            if (checkbox && checkbox.checked) {
                if (card) card.classList.add('selected');
            } else {
                if (card) card.classList.remove('selected');
            }
            
            if (directionDiv) {
                directionDiv.style.display = (checkbox && checkbox.checked && !noneSelected) ? 'block' : 'none';
            }
        });
        
        let isValid = false;
        let message = '';
        
        if (selectedChanges.has('9')) {
            isValid = true;
            message = `<div class="report-info"><p>${noChangeMessage}</p></div>`;
        } else if (selectedChanges.size > 0) {
            let hasMissingDirection = false;
            for (const change of selectedChanges) {
                if (['1', '2', '3', '4'].includes(change) && !directionSelections[change]) {
                    hasMissingDirection = true;
                    break;
                }
            }
            if (hasMissingDirection) {
                isValid = false;
                message = `<div class="report-warning"><p>${validationWarning}</p></div>`;
            } else {
                isValid = true;
                message = `<div class="report-warning"><p>${changeDetectedMessage}</p></div>`;
            }
        }
        
        const msgContainer = document.getElementById('changes-message-container');
        if (msgContainer) {
            msgContainer.innerHTML = message;
        }
        
        const nextBtn = document.getElementById('next-btn-1-4-3');
        if (nextBtn) {
            nextBtn.disabled = !isValid;
        }
    }
    
    render();
}