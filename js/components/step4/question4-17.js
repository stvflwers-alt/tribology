import appState from '../../state.js';

export function renderQuestion4_17(container) {
    const t = (key, params = {}) => appState.t(key, params);
    const isEnglish = appState.language === 'en';
    const regime = appState.getAnswer('3-2')?.recommendedSystem;
    const isGas = [7, 8].includes(regime);
    const lubricantCode = appState.getAnswer('4-1-lubricant-code') || 'mineral';
    let lubricantName = appState.getAnswer('4-1-lubricant-name') || (isEnglish ? 'Unknown' : 'نامشخص');

    if (isGas) {
        let displayName = lubricantName;
        if (isEnglish) {
            const nameMap = {
                'هوا (Air)': 'Air',
                'هوا': 'Air',
                'نیتروژن (N₂)': 'Nitrogen',
                'نیتروژن': 'Nitrogen',
                'هلیوم (He)': 'Helium',
                'هلیوم': 'Helium',
                'آرگون (Ar)': 'Argon',
                'آرگون': 'Argon'
            };
            displayName = nameMap[lubricantName] || lubricantName;
        }

        container.innerHTML = `
            <div class="question-card">
                <div class="question-header">
                    <span class="question-number">${isEnglish ? 'Question 4-17' : '۴-۱۷'}</span>
                    <span class="question-tag tag-info">${isEnglish ? 'Gas Compatible' : 'سازگار با گاز'}</span>
                </div>
                <h2 class="question-title">${isEnglish ? 'Seal Compatibility' : 'سازگاری با آب‌بندها'}</h2>
                <div class="alert alert-success" style="margin: 16px 0;">
                    ✅ ${isEnglish ? 
                        `Gas lubricant <strong>${displayName}</strong> is compatible with all standard seal materials.` :
                        `روانکار گازی <strong>${displayName}</strong> با تمام مواد استاندارد آب‌بند سازگار است.`}
                </div>
                <div class="result-panel" style="border: 2px solid var(--green-industrial); background: #f1f8e9;">
                    <h3>✅ ${isEnglish ? 'Compatibility Summary' : 'خلاصه سازگاری'}</h3>
                    <table class="report-table">
                        <thead>
                            <tr>
                                <th>${isEnglish ? 'Seal Material' : 'جنس آب‌بند'}</th>
                                <th>${isEnglish ? 'Compatibility' : 'سازگاری'}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr><td>NBR (Nitrile)</td><td>✅ ${isEnglish ? 'Compatible' : 'سازگار'}</td></tr>
                            <tr><td>FKM (Viton)</td><td>✅ ${isEnglish ? 'Compatible' : 'سازگار'}</td></tr>
                            <tr><td>EPDM</td><td>✅ ${isEnglish ? 'Compatible' : 'سازگار'}</td></tr>
                            <tr><td>PTFE</td><td>✅ ${isEnglish ? 'Compatible' : 'سازگار'}</td></tr>
                        </tbody>
                    </table>
                    <p style="margin-top: 12px; color: var(--text-secondary); font-size: 0.9rem;">
                        ℹ️ ${isEnglish ? 
                            'Gas lubricants are inert and do not cause swelling, shrinkage, or degradation of seal materials.' :
                            'روانکارهای گازی بی‌اثر هستند و باعث تورم، انقباض یا تخریب مواد آب‌بند نمی‌شوند.'}
                    </p>
                </div>
                <div class="action-bar">
                    <button id="back-btn" class="btn btn-secondary">${isEnglish ? 'Back' : 'بازگشت'}</button>
                    <button id="next-btn" class="btn btn-primary">${isEnglish ? 'Continue' : 'ادامه'}</button>
                </div>
            </div>
        `;

        document.getElementById('back-btn')?.addEventListener('click', () => {
            window.dispatchEvent(new CustomEvent('navigate', { detail: { question: '4-16' } }));
        });

        document.getElementById('next-btn')?.addEventListener('click', () => {
            appState.currentQuestion = '4-17';
            window.dispatchEvent(new CustomEvent('navigate', { detail: { question: '4-18' } }));
        });

        return;
    }

    const compatibility = {
        'NBR': { 
            compatible: ['mineral'], 
            incompatible: ['pao', 'ester'], 
            issue: isEnglish ? 'Seal swelling or shrinkage' : 'تورم یا انقباط آب‌بند',
            description: isEnglish ? 'Nitrile rubber, good oil resistance' : 'لاستیک نیتریل، مقاوم به روغن'
        },
        'FKM': { 
            compatible: ['mineral', 'pao'], 
            incompatible: ['ester'], 
            issue: isEnglish ? 'Degradation above 200°C' : 'تخریب در دمای بالای 200 درجه',
            description: isEnglish ? 'Fluoroelastomer, high temperature resistance' : 'الاستومر فلوئورو، مقاوم به دمای بالا'
        },
        'EPDM': { 
            compatible: ['pag'], 
            incompatible: ['mineral', 'pao'], 
            issue: isEnglish ? 'Severe seal swelling' : 'تورم شدید آب‌بند',
            description: isEnglish ? 'Ethylene propylene rubber, good for brake fluids' : 'لاستیک اتیلن پروپیلن، مناسب برای سیال ترمز'
        },
        'PTFE': { 
            compatible: ['mineral', 'pao', 'ester', 'pag', 'silicone'], 
            incompatible: [], 
            issue: isEnglish ? 'Compatible with all lubricants' : 'سازگار با همه روانکارها',
            description: isEnglish ? 'Polytetrafluoroethylene, universal compatibility' : 'پلی‌تترافلوئورواتیلن، سازگاری جهانی'
        }
    };

    const getCompatibilityStatus = (sealType) => {
        const data = compatibility[sealType];
        if (!data) return { status: 'unknown', text: isEnglish ? 'Unknown' : 'نامشخص', color: '#EF6C00' };
        if (data.incompatible.includes(lubricantCode)) {
            return { status: 'incompatible', text: isEnglish ? 'Incompatible' : 'ناسازگار', color: '#C62828' };
        } else if (data.compatible.includes(lubricantCode)) {
            return { status: 'compatible', text: isEnglish ? 'Compatible' : 'سازگار', color: '#2E7D32' };
        } else {
            return { status: 'caution', text: isEnglish ? 'Use with Caution' : 'با احتیاط', color: '#EF6C00' };
        }
    };

    container.innerHTML = `
        <div class="question-card">
            <div class="question-header">
                <span class="question-number">${isEnglish ? 'Question 4-17' : '۴-۱۷'}</span>
                <span class="question-tag tag-standard">${isEnglish ? 'Seals' : 'آب‌بندها'}</span>
            </div>
            <h2 class="question-title">${isEnglish ? 'Lubricant Compatibility with Seals' : 'سازگاری روانکار با آب‌بندها'}</h2>
            <p class="question-description">
                ${isEnglish ? 'Please select the seal material of the system. Compatibility with the current lubricant is shown for each option.' : 'لطفاً جنس آب‌بندهای سیستم را انتخاب کنید. سازگاری روانکار فعلی با هر گزینه نمایش داده می‌شود.'}
            </p>
            <div class="options-list">
                ${Object.entries(compatibility).map(([name, data]) => {
                    const compatStatus = getCompatibilityStatus(name);
                    return `
                        <label class="option-card" data-value="${name}">
                            <input type="radio" name="seal" value="${name}">
                            <div class="option-content">
                                <div class="option-icon">🔐</div>
                                <div class="option-text">
                                    <strong>${name}</strong>
                                    <small style="color: var(--text-secondary); display: block;">${data.description}</small>
                                    <span style="color: ${compatStatus.color};">
                                        ${compatStatus.text} | ${data.issue}
                                    </span>
                                </div>
                            </div>
                            <div class="option-radio"></div>
                        </label>
                    `;
                }).join('')}
                <label class="option-card" data-value="unknown">
                    <input type="radio" name="seal" value="unknown">
                    <div class="option-content">
                        <div class="option-icon">❓</div>
                        <div class="option-text">
                            <strong>${isEnglish ? 'I don\'t know / Other' : 'نمی‌دانم / سایر'}</strong>
                            <span>${isEnglish ? 'Seal material not specified — Compatibility not confirmed' : 'جنس آب‌بند مشخص نیست — سازگاری تأیید نشد'}</span>
                        </div>
                    </div>
                    <div class="option-radio"></div>
                </label>
            </div>
            <div id="seal-warning" style="margin-top: 16px;"></div>
            <div class="action-bar">
                <button id="back-btn" class="btn btn-secondary">${isEnglish ? 'Back' : 'بازگشت'}</button>
                <button id="next-btn" class="btn btn-primary" disabled>${isEnglish ? 'Continue' : 'ادامه'}</button>
            </div>
        </div>
    `;

    let selected = null;
    const warningDiv = document.getElementById('seal-warning');

    document.querySelectorAll('.option-card').forEach(card => {
        card.addEventListener('click', function() {
            document.querySelectorAll('.option-card').forEach(c => c.classList.remove('selected'));
            this.classList.add('selected');
            selected = this.dataset.value;
            document.getElementById('next-btn').disabled = false;

            if (selected === 'unknown') {
                warningDiv.innerHTML = `
                    <div class="alert alert-warning">
                        ⚠️ ${isEnglish ? 'Seal material not specified. It is recommended to check the seal material and select a compatible lubricant if necessary.' : 'جنس آب‌بند مشخص نشده است. توصیه می‌شود جنس آب‌بند را بررسی و در صورت نیاز، روانکار سازگار انتخاب شود.'}
                    </div>
                `;
            } else {
                const compatStatus = getCompatibilityStatus(selected);
                if (compatStatus.status === 'incompatible') {
                    const sealData = compatibility[selected];
                    warningDiv.innerHTML = `
                        <div class="alert alert-danger">
                            ⚠️ ${isEnglish ? `Seal ${selected} is incompatible with the selected lubricant.` : `آب‌بند ${selected} با روانکار انتخابی ناسازگار است.`}
                            ${isEnglish ? `Risk of ${sealData.issue}.` : `خطر ${sealData.issue} وجود دارد.`}
                            ${isEnglish ? 'It is recommended to change the seal to FKM or PTFE, or modify the lubricant.' : 'توصیه می‌شود آب‌بند را به FKM یا PTFE تغییر دهید یا روانکار را اصلاح کنید.'}
                        </div>
                    `;
                } else if (compatStatus.status === 'caution') {
                    warningDiv.innerHTML = `
                        <div class="alert alert-warning">
                            ⚠️ ${isEnglish ? `Seal ${selected} is not fully compatible with the selected lubricant.` : `آب‌بند ${selected} با روانکار انتخابی کاملاً سازگار نیست.`}
                            ${isEnglish ? 'It is recommended to check the seal condition at shorter intervals.' : 'توصیه می‌شود در فواصل کوتاه‌تر وضعیت آب‌بند بررسی شود.'}
                        </div>
                    `;
                } else {
                    warningDiv.innerHTML = '';
                }
            }
        });
    });

    document.getElementById('back-btn').addEventListener('click', () => {
        window.dispatchEvent(new CustomEvent('navigate', {
            detail: { question: '4-16' }
        }));
    });

    document.getElementById('next-btn').addEventListener('click', () => {
        appState.setAnswer('4-17-seal', selected);
        appState.currentQuestion = '4-17';
        const compatStatus = getCompatibilityStatus(selected);
        appState.setAnswer('4-17-seal-status', compatStatus.text);
        appState.setAnswer('4-17-seal-compatible', compatStatus.status === 'compatible');
        window.dispatchEvent(new CustomEvent('navigate', {
            detail: { question: '4-18' }
        }));
    });
}