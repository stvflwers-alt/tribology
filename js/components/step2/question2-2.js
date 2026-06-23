import appState from '../../state.js';
import router from '../../router.js';

export function renderQuestion2_2(container) {
    const t = (key, params = {}) => appState.t(key, params);
    const path = appState.getAnswer('1-1');
    
    const part2Mapping = {
        '1': '1',
        '2': '2',
        '3': '3',
        '4': '4',
        '5': '5',
        '6': '10',
        '7': '5',
        '8': '6',
        '9': '7',
        '10': '8',
        '11': '9',
        '12': '17',
        '13': '18',
        '14': '16'
    };
    
    if (path === '1' || path === '2') {
        let part1Answer;
        
        if (path === '1') {
            part1Answer = appState.getAnswer('1-2-1');
        } else {
            part1Answer = appState.getAnswer('2-1');
        }
        
        let part2Code = part2Mapping[part1Answer] || '16';
        
        if (part1Answer === '14') {
            appState.setAnswer('2-2', null);
            setTimeout(() => {
                window.dispatchEvent(new CustomEvent('navigate', { 
                    detail: { question: '2-2a' } 
                }));
            }, 100);
            return;
        }
        
        appState.setAnswer('2-2', part2Code);
        
        const partNames = {
            '1': t('step2.question2_2.opt1_title'),
            '2': t('step2.question2_2.opt2_title'),
            '3': t('step2.question2_2.opt3_title'),
            '4': t('step2.question2_2.opt4_title'),
            '5': t('step2.question2_2.opt5_title'),
            '6': t('step2.question2_2.opt6_title'),
            '7': t('step2.question2_2.opt7_title'),
            '8': t('step2.question2_2.opt8_title'),
            '9': t('step2.question2_2.opt9_title'),
            '10': t('step2.question2_2.opt10_title'),
            '11': t('step2.question2_2.opt11_title'),
            '12': t('step2.question2_2.opt12_title'),
            '13': t('step2.question2_2.opt13_title'),
            '14': t('step2.question2_2.opt14_title'),
            '15': t('step2.question2_2.opt15_title'),
            '16': t('step2.question2_2.opt16_title'),
            '17': t('step2.question2_2.opt17_title'),
            '18': t('step2.question2_2.opt18_title')
        };
        
        const partName = partNames[part2Code] || t('common.unknown');
        
        container.innerHTML = `
            <div class="question-card">
                <div class="auto-detection-message">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--green-standard)" stroke-width="2">
                        <circle cx="12" cy="12" r="10"/>
                        <path d="M9 12l2 2 4-4"/>
                    </svg>
                    <h2>${t('step2.question2_2.auto_detected')}</h2>
                    <p>${t('step2.question2_2.auto_message', { part: partName })}</p>
                    <div class="auto-detected-item">
                        <span class="auto-label">${t('step2.question2_2.detected_part')}:</span>
                        <span class="auto-value">${partName}</span>
                    </div>
                </div>
            </div>
        `;
        
        setTimeout(() => {
            const condition = router.checkCondition('2-2');
            let nextQuestion;
            if (condition && condition.needQuestion) {
                nextQuestion = condition.needQuestion;
            } else {
                nextQuestion = '2-3';
            }
            window.dispatchEvent(new CustomEvent('navigate', { 
                detail: { question: nextQuestion } 
            }));
        }, 1500);
        return;
    }
    
    if (path === '3') {
        const title = t('step2.question2_2.title');
        const description = t('step2.question2_2.description');
        const tag = t('step2.question2_2.tag');
        const btnContinue = t('common.btnContinue');
        const btnBack = t('common.btnBack');
        
        const options = [
            { value: '1', icon: '⚙️', title: t('step2.question2_2.opt1_title'), desc: t('step2.question2_2.opt1_desc') },
            { value: '2', icon: '🔧', title: t('step2.question2_2.opt2_title'), desc: t('step2.question2_2.opt2_desc') },
            { value: '3', icon: '🔴', title: t('step2.question2_2.opt3_title'), desc: t('step2.question2_2.opt3_desc') },
            { value: '4', icon: '🔩', title: t('step2.question2_2.opt4_title'), desc: t('step2.question2_2.opt4_desc') },
            { value: '5', icon: '🏗️', title: t('step2.question2_2.opt5_title'), desc: t('step2.question2_2.opt5_desc') },
            { value: '6', icon: '🛑', title: t('step2.question2_2.opt6_title'), desc: t('step2.question2_2.opt6_desc') },
            { value: '7', icon: '🚂', title: t('step2.question2_2.opt7_title'), desc: t('step2.question2_2.opt7_desc') },
            { value: '8', icon: '💧', title: t('step2.question2_2.opt8_title'), desc: t('step2.question2_2.opt8_desc') },
            { value: '9', icon: '🏗️', title: t('step2.question2_2.opt9_title'), desc: t('step2.question2_2.opt9_desc') },
            { value: '10', icon: '🔄', title: t('step2.question2_2.opt10_title'), desc: t('step2.question2_2.opt10_desc') },
            { value: '11', icon: '🛑', title: t('step2.question2_2.opt11_title'), desc: t('step2.question2_2.opt11_desc') },
            { value: '12', icon: '📌', title: t('step2.question2_2.opt12_title'), desc: t('step2.question2_2.opt12_desc') },
            { value: '13', icon: '💨', title: t('step2.question2_2.opt13_title'), desc: t('step2.question2_2.opt13_desc') },
            { value: '14', icon: '🌀', title: t('step2.question2_2.opt14_title'), desc: t('step2.question2_2.opt14_desc') },
            { value: '15', icon: '🔴', title: t('step2.question2_2.opt15_title'), desc: t('step2.question2_2.opt15_desc') },
            { value: '16', icon: '❓', title: t('step2.question2_2.opt16_title'), desc: t('step2.question2_2.opt16_desc') },
            { value: '17', icon: '⭕', title: t('step2.question2_2.opt17_title'), desc: t('step2.question2_2.opt17_desc') },
            { value: '18', icon: '🏭', title: t('step2.question2_2.opt18_title'), desc: t('step2.question2_2.opt18_desc') }
        ];
        
        container.innerHTML = `
            <div class="question-card">
                <div class="question-header">
                    <span class="question-number">2-2</span>
                    <span class="question-tag tag-path">${tag}</span>
                </div>
                <h2 class="question-title">${title}</h2>
                <p class="question-description">${description}</p>
                <div class="options-list" id="options-list-2-2">
                    ${options.map(opt => `
                        <label class="option-card" data-value="${opt.value}">
                            <input type="radio" name="question-2-2" value="${opt.value}">
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
                    <button id="back-btn-2-2" class="btn btn-secondary">
                        <svg class="btn-arrow-back" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M9 18l6-6-6-6"/>
                        </svg>
                        ${btnBack}
                    </button>
                    <button id="next-btn-2-2" class="btn btn-primary" disabled>
                        ${btnContinue}
                        <svg class="btn-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M9 18l6-6-6-6"/>
                        </svg>
                    </button>
                </div>
            </div>
        `;
        
        const optionCards = container.querySelectorAll('#options-list-2-2 .option-card');
        const nextBtn = container.querySelector('#next-btn-2-2');
        const backBtn = container.querySelector('#back-btn-2-2');
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
            appState.setAnswer('2-2', selectedValue);
            
            if (selectedValue === '16') {
                window.dispatchEvent(new CustomEvent('navigate', { 
                    detail: { question: '2-2a' } 
                }));
            } else {
                window.dispatchEvent(new CustomEvent('navigate', { 
                    detail: { question: '2-3' } 
                }));
            }
        });
        
        backBtn.addEventListener('click', () => {
            window.dispatchEvent(new CustomEvent('navigate', { 
                detail: { question: '2-1' } 
            }));
        });
        
        const savedAnswer = appState.getAnswer('2-2');
        if (savedAnswer) {
            const savedCard = container.querySelector(`.option-card[data-value="${savedAnswer}"]`);
            if (savedCard) {
                savedCard.classList.add('selected');
                const savedRadio = savedCard.querySelector('input');
                if (savedRadio) savedRadio.checked = true;
                selectedValue = savedAnswer;
                nextBtn.disabled = false;
            }
        }
    }
}