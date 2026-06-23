import appState from '../../state.js';
import router from '../../router.js';

export function renderQuestion4_10(container) {
    const t = (key, params = {}) => appState.t(key, params);
    const isEnglish = appState.language === 'en';
    
    const regime = appState.getAnswer('3-2')?.recommendedSystem;
    const isGas = [7, 8].includes(regime);
    
    const lambda = appState.getAnswer('4-3-lambda');
    const flashData = appState.getAnswer('4-5-flash-data') || {};
    const T_contact = flashData.T_contact || 25;
    const T_max_lube = flashData.T_max_lube || 150;
    const lubricantCode = appState.getAnswer('4-1-lubricant-code') || 'mineral';
    let lubricantName = appState.getAnswer('4-1-lubricant-name') || (isEnglish ? 'Mineral Oil' : 'روغن معدنی');
    
    if (isEnglish) {
        const nameTranslations = {
            'هوا': 'Air',
            'نیتروژن': 'Nitrogen',
            'هلیوم': 'Helium',
            'روغن معدنی': 'Mineral Oil',
            'گریس لیتیم': 'Lithium Grease',
            'MoS₂ (مولیبدن دی‌سولفید)': 'MoS₂',
            'گرافیت (Graphite)': 'Graphite'
        };
        lubricantName = nameTranslations[lubricantName] || lubricantName;
    }
    
    if (isGas) {
        container.innerHTML = `
            <div class="question-card">
                <div class="question-header">
                    <span class="question-number">${isEnglish ? 'Question 4-10' : '۴-۱۰'}</span>
                    <span class="question-tag tag-auto">${isEnglish ? 'Gas Lubricant' : 'روانکار گازی'}</span>
                </div>
                <h2 class="question-title">${isEnglish ? 'Gas Lubricant Confirmation' : 'تأیید روانکار گازی'}</h2>
                
                <div class="result-panel">
                    <h3>📊 ${isEnglish ? 'Analysis Results' : 'نتایج تحلیل'}</h3>
                    <div class="result-grid">
                        <div class="result-item">
                            <span class="label">${isEnglish ? 'Lubricant Type' : 'نوع روانکار'}</span>
                            <span class="value">${lubricantName}</span>
                        </div>
                        <div class="result-item">
                            <span class="label">T<sub>contact</sub> — ${isEnglish ? 'Contact Temperature' : 'دمای تماس'}</span>
                            <span class="value">${T_contact.toFixed(1)} °C</span>
                        </div>
                        <div class="result-item">
                            <span class="label">T<sub>max</sub> ${isEnglish ? 'Lubricant' : 'روانکار'}</span>
                            <span class="value">${T_max_lube} °C</span>
                        </div>
                    </div>
                </div>

                <div class="result-panel" style="border: 2px solid var(--green-industrial); background: #f1f8e9;">
                    <h3>✅ ${isEnglish ? 'Compatibility Status' : 'وضعیت تطابق'}</h3>
                    <p>${isEnglish ? 
                        `Gas lubricant <strong>${lubricantName}</strong> is compatible with operating conditions.` :
                        `روانکار گازی <strong>${lubricantName}</strong> با شرایط کاری مطابقت دارد.`}
                    </p>
                    <p style="margin-top: 8px; color: var(--text-secondary);">
                        ℹ️ ${isEnglish ? 
                            'Gas lubricants do not require ISO VG grade selection.' :
                            'روانکارهای گازی نیازی به انتخاب گرید ISO VG ندارند.'}
                    </p>
                </div>

                <div style="margin-top: 20px; padding: 16px; background: #fff; border: 1px solid var(--border-light); border-radius: var(--radius-md);">
                    <p style="font-weight: 600; margin-bottom: 12px;">
                        ${isEnglish ? 'Do you confirm this gas selection?' : 'آیا این انتخاب گاز را تأیید می‌کنید؟'}
                    </p>
                    <div style="display: flex; gap: 12px;">
                        <button id="btn-confirm-gas" class="btn btn-primary" style="flex: 1;">
                            ✅ ${isEnglish ? 'Yes, I confirm' : 'بله، تأیید می‌کنم'}
                        </button>
                    </div>
                </div>

                <div class="action-bar">
                    <button id="back-btn" class="btn btn-secondary">${isEnglish ? 'Back' : 'بازگشت'}</button>
                </div>
            </div>
        `;
        
        document.getElementById('btn-confirm-gas')?.addEventListener('click', () => {
            appState.currentQuestion = '4-10';
            window.dispatchEvent(new CustomEvent('navigate', { detail: { question: '4-11' } }));
        });
        
        document.getElementById('back-btn')?.addEventListener('click', () => {
            window.dispatchEvent(new CustomEvent('navigate', { detail: { question: '4-9' } }));
        });
        
        return;
    }
    
    const isoGrade = appState.getAnswer('4-2-iso-grade') || estimateISOGrade(lambda, isEnglish);
    const isCompatible = T_contact <= T_max_lube;
    if (!isCompatible) appState.setFlag('LUBRICANT_TYPE_MISMATCH', true);
    const recommendedGrade = recommendISOGrade(lambda, T_contact, isEnglish);
    
    container.innerHTML = `
        <div class="question-card">
            <div class="question-header">
                <span class="question-number">${isEnglish ? 'Question 4-10' : '۴-۱۰'}</span>
                <span class="question-tag tag-auto">${isEnglish ? 'Final Confirmation' : 'تأیید نهایی'}</span>
            </div>
            <h2 class="question-title">${isEnglish ? 'Viscosity and Oil Type Selection' : 'انتخاب ویسکوزیته و نوع روغن'}</h2>
            <div class="result-panel">
                <h3>📊 ${isEnglish ? 'Analysis Results' : 'نتایج تحلیل'}</h3>
                <div class="result-grid">
                    <div class="result-item">
                        <span class="label">λ — ${isEnglish ? 'Film Ratio' : 'نسبت فیلم'}</span>
                        <span class="value">${lambda ? lambda.toFixed(2) : '—'}</span>
                    </div>
                    <div class="result-item">
                        <span class="label">T<sub>contact</sub> — ${isEnglish ? 'Contact Temperature' : 'دمای تماس'}</span>
                        <span class="value">${T_contact.toFixed(1)} °C</span>
                    </div>
                    <div class="result-item">
                        <span class="label">T<sub>max</sub> ${isEnglish ? 'Lubricant' : 'روانکار'}</span>
                        <span class="value">${T_max_lube} °C</span>
                    </div>
                </div>
            </div>
            ${isCompatible ? `
            <div class="result-panel" style="border: 2px solid var(--green-industrial); background: #f1f8e9;">
                <h3>✅ ${isEnglish ? 'Compatibility Status' : 'وضعیت تطابق'}</h3>
                <p>${isEnglish ? 'Selected lubricant (' : 'روانکار انتخاب‌شده ('}<strong>${lubricantName}</strong>${isEnglish ? ') matches operating conditions.' : ') با شرایط کاری مطابقت دارد.'}</p>
                <p style="margin-top: 8px;">${isEnglish ? 'Recommended grade:' : 'گرید پیشنهادی:'} <strong>ISO VG ${recommendedGrade}</strong></p>
            </div>
            ` : `
            <div class="result-panel" style="border: 2px solid var(--red-critical); background: #ffebee;">
                <h3>⚠️ ${isEnglish ? 'Mismatch' : 'عدم تطابق'}</h3>
                <p>${isEnglish ? 'Selected lubricant (' : 'روانکار انتخاب‌شده ('}<strong>${lubricantName}</strong>${isEnglish ? ') does NOT match operating conditions.' : ') با شرایط کاری مطابقت ندارد.'}</p>
                <p style="margin-top: 8px;">${isEnglish ? 'Reason: T_contact = ' : 'دلیل: T<sub>contact</sub> = '}${T_contact.toFixed(1)}°C ${isEnglish ? 'exceeds lubricant T_max (' : 'از T<sub>max</sub> روانکار ('}${T_max_lube}°C${isEnglish ? ')' : ') فراتر رفته است.'}</p>
                <p style="margin-top: 8px;">${isEnglish ? 'The system automatically recommends ' : 'سیستم به‌طور خودکار '}<strong>${getAlternativeLube(lubricantCode, isEnglish)}</strong> ${isEnglish ? 'with grade' : 'با گرید'} <strong>ISO VG ${recommendedGrade}</strong>${isEnglish ? '.' : ' را پیشنهاد می‌دهد.'}</p>
            </div>
            `}
            <div style="margin-top: 20px; padding: 16px; background: #fff; border: 1px solid var(--border-light); border-radius: var(--radius-md);">
                <p style="font-weight: 600; margin-bottom: 12px;">${isEnglish ? 'Recommended ISO VG Grade:' : 'گرید ISO VG پیشنهادی:'} <strong>VG ${recommendedGrade}</strong></p>
                <div style="display: flex; gap: 12px; flex-wrap: wrap;">
                    <button id="btn-confirm" class="btn btn-primary" style="flex: 1;">
                        ✅ ${isEnglish ? 'Yes, I confirm' : 'بله، تأیید می‌کنم'}
                    </button>
                    <button id="btn-change-grade" class="btn btn-secondary" style="flex: 1;">
                        🔄 ${isEnglish ? 'Change grade' : 'گرید را تغییر می‌دهم'}
                    </button>
                    ${!isCompatible ? `
                    <button id="btn-accept-risk" class="btn btn-secondary" style="flex: 1; color: var(--red-critical);">
                        ⚠️ ${isEnglish ? 'Keep previous lubricant' : 'روانکار قبلی را نگه می‌دارم'}
                    </button>
                    ` : ''}
                </div>
            </div>
            <div class="action-bar">
                <button id="back-btn" class="btn btn-secondary">${isEnglish ? 'Back' : 'بازگشت'}</button>
            </div>
        </div>
    `;
    
    document.getElementById('btn-confirm')?.addEventListener('click', () => {
        appState.setAnswer('4-10-grade', recommendedGrade);
        appState.currentQuestion = '4-10';
        window.dispatchEvent(new CustomEvent('navigate', { detail: { question: '4-11' } }));
    });
    
    document.getElementById('btn-change-grade')?.addEventListener('click', () => {
        showGradeSelector(container, recommendedGrade, isEnglish);
    });
    
    document.getElementById('btn-accept-risk')?.addEventListener('click', () => {
        appState.setFlag('LUBRICANT_TYPE_MISMATCH', true);
        appState.setAnswer('4-10-grade', isoGrade);
        appState.currentQuestion = '4-10';
        window.dispatchEvent(new CustomEvent('navigate', { detail: { question: '4-11' } }));
    });
    
    document.getElementById('back-btn')?.addEventListener('click', () => {
        window.dispatchEvent(new CustomEvent('navigate', { detail: { question: '4-9' } }));
    });
}

function estimateISOGrade(lambda, isEnglish) {
    if (!lambda || lambda < 1) return 220;
    if (lambda < 2) return 100;
    if (lambda < 3) return 46;
    return 32;
}

function recommendISOGrade(lambda, T_contact, isEnglish) {
    if (!lambda || lambda < 1) return T_contact > 100 ? 320 : 220;
    if (lambda < 2) return T_contact > 100 ? 150 : 100;
    if (lambda < 3) return T_contact > 100 ? 68 : 46;
    return T_contact > 100 ? 46 : 32;
}

function getAlternativeLube(code, isEnglish) {
    if (isEnglish) {
        const alternatives = {
            'mineral': 'PAO (Polyalphaolefin)',
            'lithium_grease': 'Lithium Complex Grease',
            'ptfe': 'Graphite',
            'air': 'Nitrogen'
        };
        return alternatives[code] || 'Lubricant with higher temperature rating';
    }
    const alternatives = {
        'mineral': 'PAO (پلی‌آلفااولفین)',
        'lithium_grease': 'گریس لیتیم کمپلکس',
        'ptfe': 'گرافیت',
        'air': 'نیتروژن'
    };
    return alternatives[code] || 'روانکار با دمای مجاز بالاتر';
}

function showGradeSelector(container, currentGrade, isEnglish) {
    const grades = [2, 5, 7, 10, 15, 22, 32, 46, 68, 100, 150, 220, 320, 460, 680];
    
    container.innerHTML = `
        <div class="question-card">
            <div class="question-header">
                <span class="question-number">${isEnglish ? 'Question 4-10' : '۴-۱۰'}</span>
                <span class="question-tag tag-conditional">${isEnglish ? 'Grade Selection' : 'انتخاب گرید'}</span>
            </div>
            <h2 class="question-title">${isEnglish ? 'Select ISO VG Grade' : 'انتخاب گرید ISO VG'}</h2>
            <div class="options-list" style="max-height: 400px; overflow-y: auto;">
                ${grades.map(g => `
                    <label class="option-card ${g === currentGrade ? 'option-recommended' : ''}" data-value="${g}">
                        <input type="radio" name="grade" value="${g}">
                        <div class="option-content">
                            <div class="option-text"><strong>ISO VG ${g}</strong></div>
                        </div>
                        <div class="option-radio"></div>
                    </label>
                `).join('')}
            </div>
            <div class="action-bar">
                <button id="cancel-grade" class="btn btn-secondary">${isEnglish ? 'Cancel' : 'انصراف'}</button>
                <button id="confirm-grade" class="btn btn-primary" disabled>${isEnglish ? 'Confirm' : 'تأیید'}</button>
            </div>
        </div>
    `;
    
    let selected = null;
    
    document.querySelectorAll('.option-card').forEach(card => {
        card.addEventListener('click', function() {
            document.querySelectorAll('.option-card').forEach(c => c.classList.remove('selected'));
            this.classList.add('selected');
            selected = parseInt(this.dataset.value);
            document.getElementById('confirm-grade').disabled = false;
        });
    });
    
    document.getElementById('cancel-grade').addEventListener('click', () => {
        renderQuestion4_10(container);
    });
    
    document.getElementById('confirm-grade').addEventListener('click', () => {
        appState.setAnswer('4-10-grade', selected);
        appState.currentQuestion = '4-10';
        window.dispatchEvent(new CustomEvent('navigate', { detail: { question: '4-11' } }));
    });
}