import appState from '../../state.js';
import router from '../../router.js';

export function renderQuestion4_1(container) {
    const t = (key, params = {}) => appState.t(key, params);
    const systemData = appState.getAnswer('3-2') || {};
    const lubricationRegime = systemData.recommendedSystem;
    const contactData = appState.getAnswer('3-0') || {};
    const temperature = contactData.T_C || 25;
    const contaminants = appState.getAnswer('2-13') || [];
    const hasWater = contaminants.includes('3');
    const specialConditions = appState.getAnswer('3-1') || [];
    const isVacuum = specialConditions.includes(4);
    const isFireRisk = specialConditions.includes(1);
    const isHighTemp = temperature > 400;
    
    let lubricantName, lubricantCode, icon, reasons = [];
    const isEnglish = appState.language === 'en';

    const regimeNames = {
        1: t('step3.question3_2.systems.1.name'),
        2: t('step3.question3_2.systems.2.name'),
        3: t('step3.question3_2.systems.3.name'),
        4: t('step3.question3_2.systems.4.name'),
        5: t('step3.question3_2.systems.5.name'),
        6: t('step3.question3_2.systems.6.name'),
        7: t('step3.question3_2.systems.7.name'),
        8: t('step3.question3_2.systems.8.name'),
        9: t('step3.question3_2.systems.9.name'),
        10: t('step3.question3_2.systems.10.name')
    };

    const GAS_OPTIONS = {
        'air': { name: isEnglish ? 'Air' : 'هوا', icon: '💨', desc: isEnglish ? 'Default, low cost' : 'پیش‌فرض، کم‌هزینه' },
        'nitrogen': { name: isEnglish ? 'Nitrogen' : 'نیتروژن', icon: '🫧', desc: isEnglish ? 'Inert gas for explosive environments' : 'گاز بی‌اثر برای محیط‌های انفجاری' },
        'helium': { name: isEnglish ? 'Helium' : 'هلیوم', icon: '🎈', desc: isEnglish ? 'High heat dissipation' : 'دفع حرارت بالا' },
        'argon': { name: isEnglish ? 'Argon' : 'آرگون', icon: '🔵', desc: isEnglish ? 'For vacuum processes' : 'برای فرآیندهای خلأ' }
    };

    const isGasRegime = [7, 8].includes(lubricationRegime);

    if (isGasRegime) {
        let suggestedGas = 'air';
        if (isVacuum) suggestedGas = 'argon';
        else if (isFireRisk || contaminants.includes('4') || contaminants.includes('6')) suggestedGas = 'nitrogen';
        else if (temperature > 200) suggestedGas = 'helium';
        
        const gasData = GAS_OPTIONS[suggestedGas];
        lubricantCode = suggestedGas;
        lubricantName = gasData.name;
        icon = gasData.icon;
        reasons = [
            { text: isEnglish ? `Gas regime selected — ${gasData.name} is recommended` : `رژیم گازی انتخاب شده — ${gasData.name} توصیه می‌شود` },
            { text: isEnglish ? gasData.desc : gasData.desc },
            { text: isEnglish ? `Working temperature: ${temperature}°C` : `دمای کاری: ${temperature}°C` }
        ];

        if (isVacuum) {
            reasons.push({ text: isEnglish ? 'Vacuum environment detected' : 'محیط خلأ تشخیص داده شده' });
        }
        if (temperature > 200) {
            reasons.push({ text: isEnglish ? 'High temperature detected — Helium recommended for cooling' : 'دمای بالا تشخیص داده شده — هلیوم برای خنک‌کاری توصیه می‌شود' });
        }
    } else if ([1, 2, 3, 4, 6].includes(lubricationRegime) && temperature < 100 && !hasWater && !isFireRisk) {
        lubricantCode = 'mineral';
        lubricantName = isEnglish ? 'Mineral Oil' : 'روغن معدنی';
        icon = '🛢️';
        reasons = [
            { text: isEnglish ? `Working temperature (${temperature}°C) below 100°C — Mineral oil is suitable` : `دمای کاری (${temperature}°C) زیر ۱۰۰°C — روغن معدنی مناسب است` },
            { text: isEnglish ? 'Lubrication regime is compatible with mineral oil' : 'رژیم روانکاری با روغن معدنی سازگار است' }
        ];
    } else if ([1, 2, 3, 4, 6].includes(lubricationRegime) && temperature >= 100 && temperature <= 150 && !hasWater) {
        lubricantCode = 'pao';
        lubricantName = 'PAO';
        icon = '🧪';
        reasons = [
            { text: isEnglish ? `Working temperature (${temperature}°C) between 100-150°C — PAO recommended` : `دمای کاری (${temperature}°C) بین ۱۰۰-۱۵۰°C — PAO توصیه می‌شود` },
            { text: isEnglish ? 'Better oxidation stability than mineral oil' : 'پایداری اکسیداسیون بهتر نسبت به روغن معدنی' }
        ];
    } else if ([1, 2, 3, 4, 6].includes(lubricationRegime) && temperature > 150 && !hasWater) {
        lubricantCode = 'ester';
        lubricantName = isEnglish ? 'Ester' : 'استر';
        icon = '🧬';
        reasons = [
            { text: isEnglish ? `Working temperature (${temperature}°C) above 150°C — Ester recommended` : `دمای کاری (${temperature}°C) بالای ۱۵۰°C — استر توصیه می‌شود` },
            { text: isEnglish ? 'Excellent thermal stability at high temperatures' : 'پایداری حرارتی عالی در دماهای بالا' }
        ];
    } else if ([1, 2, 3, 4, 6].includes(lubricationRegime) && hasWater) {
        lubricantCode = 'pag';
        lubricantName = 'PAG';
        icon = '💧';
        reasons = [
            { text: isEnglish ? 'Water present in the system — PAG is water resistant' : 'حضور آب در سیستم — PAG مقاوم به آب است' },
            { text: isEnglish ? 'Excellent water separation properties' : 'خاصیت جدایش آب عالی' }
        ];
    } else if (lubricationRegime === 5 && isVacuum) {
        lubricantCode = 'mos2';
        lubricantName = 'MoS₂';
        icon = '💎';
        reasons = [
            { text: isEnglish ? 'Vacuum environment — MoS₂ has best performance' : 'محیط خلأ — MoS₂ بهترین عملکرد را دارد' },
            { text: isEnglish ? 'Very low friction coefficient in vacuum' : 'ضریب اصطکاک بسیار پایین در خلأ' }
        ];
    } else if (lubricationRegime === 5 && isHighTemp) {
        lubricantCode = 'graphite';
        lubricantName = isEnglish ? 'Graphite' : 'گرافیت';
        icon = '🖤';
        reasons = [
            { text: isEnglish ? `High temperature (${temperature}°C) — Graphite is suitable` : `دمای بالای ${temperature}°C — گرافیت مناسب است` },
            { text: isEnglish ? 'Stable up to 500°C in non-oxidizing atmosphere' : 'پایداری تا ۵۰۰°C در اتمسفر غیر اکسیدی' }
        ];
    } else if (lubricationRegime === 5) {
        lubricantCode = 'ptfe';
        lubricantName = isEnglish ? 'PTFE or Soft Metal Coating' : 'PTFE یا پوشش نرم فلزی';
        icon = '⬜';
        reasons = [
            { text: isEnglish ? 'High load — PTFE or soft metal coating recommended' : 'بار بالا — PTFE یا پوشش نرم فلزی توصیه می‌شود' },
            { text: isEnglish ? 'Very low friction coefficient' : 'ضریب اصطکاک بسیار پایین' }
        ];
    } else if (lubricationRegime === 9) {
        lubricantCode = 'lithium_grease';
        lubricantName = isEnglish ? 'Lithium Grease' : 'گریس لیتیم';
        icon = '🧴';
        reasons = [
            { text: isEnglish ? 'Grease regime — Lithium grease is most common' : 'رژیم گریس — گریس لیتیم پرکاربردترین است' },
            { text: isEnglish ? 'Good resistance to water and temperature' : 'مقاومت خوب در برابر آب و دما' }
        ];
    } else if (lubricationRegime === 10) {
        lubricantCode = 'emulsion_ow';
        lubricantName = isEnglish ? 'O/W Emulsion' : 'امولسیون O/W';
        icon = '💧';
        reasons = [
            { text: isEnglish ? 'Emulsion regime — O/W has excellent cooling' : 'رژیم امولسیون — O/W خنک‌کاری عالی دارد' }
        ];
    } else {
        lubricantCode = 'mineral';
        lubricantName = isEnglish ? 'Mineral Oil' : 'روغن معدنی';
        icon = '🛢️';
        reasons = [
            { text: isEnglish ? 'System default — Mineral oil' : 'پیش‌فرض سیستم — روغن معدنی' }
        ];
    }

    appState.setAnswer('4-1-lubricant-code', lubricantCode);
    appState.setAnswer('4-1-lubricant-name', lubricantName);

    const regimeName = regimeNames[lubricationRegime] || (isEnglish ? 'Unknown' : 'نامشخص');
    const hasSpecial = specialConditions.length > 0 && !specialConditions.includes(6);

    let gasInfo = '';
    if (isGasRegime) {
        gasInfo = `
            <div class="auto-detection-box highlight" style="margin: 16px 0;">
                <div class="auto-detection-icon">💡</div>
                <div class="auto-detection-text">
                    <strong>${isEnglish ? 'Gas Lubricant System Detected' : 'سیستم روانکار گازی تشخیص داده شد'}</strong>
                    <p style="font-size: 0.85rem; margin-top: 4px;">
                        ${isEnglish ? 
                            'Gas lubricants do not use traditional oils. The system will use gas as the working fluid.' :
                            'روانکارهای گازی از روغن‌های سنتی استفاده نمی‌کنند. سیستم از گاز به عنوان سیال کاری استفاده خواهد کرد.'}
                    </p>
                </div>
            </div>
        `;
    }

    container.innerHTML = `
        <div class="question-card">
            <div class="question-header">
                <span class="question-number">${isEnglish ? 'Question 4-1' : '۴-۱'}</span>
                <span class="question-tag tag-auto">${isEnglish ? 'Auto Suggestion' : 'پیشنهاد خودکار'}</span>
            </div>
            <h2 class="question-title">${isEnglish ? 'Select Base Lubricant Type' : 'انتخاب نوع روانکار پایه'}</h2>
            <p class="question-description">
                ${isEnglish ? 'Based on the analyzed operating conditions, the base lubricant type has been automatically suggested.' : 'بر اساس شرایط عملیاتی تحلیل‌شده، نوع روانکار پایه به صورت خودکار پیشنهاد شده است.'}
            </p>
            
            ${gasInfo}

            <div class="result-panel">
                <h3>📊 ${isEnglish ? 'Operating Conditions' : 'شرایط عملیاتی'}</h3>
                <div class="result-grid">
                    <div class="result-item">
                        <span class="label">${isEnglish ? 'Lubrication Regime' : 'رژیم روانکاری'}</span>
                        <span class="value">${regimeName}</span>
                    </div>
                    <div class="result-item">
                        <span class="label">${isEnglish ? 'Working Temperature' : 'دمای کاری'}</span>
                        <span class="value">T = ${temperature} °C</span>
                    </div>
                    <div class="result-item">
                        <span class="label">${isEnglish ? 'Contaminants' : 'آلاینده‌ها'}</span>
                        <span class="value">${hasWater ? (isEnglish ? '💧 Water present' : '💧 آب موجود است') : (isEnglish ? '✅ No water' : '✅ بدون آب')}</span>
                    </div>
                    <div class="result-item">
                        <span class="label">${isEnglish ? 'Special Conditions' : 'شرایط ویژه'}</span>
                        <span class="value">${hasSpecial ? specialConditions.length + ' ' + (isEnglish ? 'case(s)' : 'مورد') : (isEnglish ? 'None' : 'ندارد')}</span>
                    </div>
                </div>
            </div>

            <div class="result-panel" style="border: 2px solid var(--green-industrial); background: #f1f8e9;">
                <h3>✅ ${isEnglish ? 'Recommended Base Lubricant' : 'روانکار پایه پیشنهادی'}</h3>
                <div style="text-align: center; padding: 20px;">
                    <div style="font-size: 4rem; margin-bottom: 8px;">${icon}</div>
                    <h4 style="color: var(--green-industrial); font-size: 1.3rem; margin-bottom: 8px;">
                        ${lubricantName}
                    </h4>
                    ${isGasRegime ? `
                        <p style="color: var(--text-secondary); font-size: 0.9rem;">
                            ${isEnglish ? 'Gas lubricant — no viscosity grade required' : 'روانکار گازی — نیازی به گرید ویسکوزیته نیست'}
                        </p>
                    ` : ''}
                </div>
                <div class="formula-panel">
                    <h4>🧠 ${isEnglish ? 'Selection Reasons' : 'دلایل انتخاب'}</h4>
                    ${reasons.map((r, i) => `
                        <div class="formula-box" style="margin-bottom: 8px;">
                            <div class="formula-text">
                                <strong>${i + 1}.</strong> ${r.text}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>

            <div style="margin-top: 24px; padding: 16px; background: #fff; border: 1px solid var(--border-light); border-radius: var(--radius-md);">
                <p style="font-weight: 600; margin-bottom: 12px;">${isEnglish ? 'Do you confirm this lubricant?' : 'آیا این روانکار را تأیید می‌کنید؟'}</p>
                <div style="display: flex; gap: 12px;">
                    <button id="btn-confirm" class="btn btn-primary" style="flex: 1;">
                        ✅ ${isEnglish ? 'Yes, I confirm' : 'بله، تأیید می‌کنم'}
                    </button>
                    <button id="btn-change" class="btn btn-secondary" style="flex: 1;">
                        🔄 ${isEnglish ? 'No, I will change it' : 'خیر، تغییر می‌دهم'}
                    </button>
                </div>
            </div>

            <div class="action-bar">
                <button id="back-btn" class="btn btn-secondary">${isEnglish ? 'Back' : 'بازگشت'}</button>
            </div>
        </div>
    `;

    document.getElementById('back-btn').addEventListener('click', () => {
        window.dispatchEvent(new CustomEvent('navigate', { 
            detail: { question: '3-13' } 
        }));
    });

    document.getElementById('btn-confirm').addEventListener('click', () => {
        appState.setAnswer('4-1', lubricantCode);
        goToNext();
    });

    document.getElementById('btn-change').addEventListener('click', () => {
        showManualSelection(container, lubricationRegime);
    });

    function goToNext() {
        const nextQuestion = router.getNextQuestion('4-1', lubricantCode);
        window.dispatchEvent(new CustomEvent('navigate', { 
            detail: { question: nextQuestion || '4-2' } 
        }));
    }
}

function showManualSelection(container, regime) {
    const isEnglish = appState.language === 'en';
    let options = [];

    if ([1, 2, 3, 4, 6].includes(regime)) {
        options = [
            { code: 'mineral', icon: '🛢️', name: isEnglish ? 'Mineral Oil' : 'روغن معدنی', desc: isEnglish ? 'Petroleum-based, widely used' : 'پایه نفتی، پرکاربرد' },
            { code: 'pao', icon: '🧪', name: 'PAO', desc: isEnglish ? 'Good oxidation stability' : 'پایداری اکسیداسیون خوب' },
            { code: 'ester', icon: '🧬', name: isEnglish ? 'Ester' : 'استر', desc: isEnglish ? 'Excellent thermal stability' : 'پایداری حرارتی عالی' },
            { code: 'pag', icon: '💧', name: 'PAG', desc: isEnglish ? 'Water resistant' : 'مقاوم به آب' },
            { code: 'silicone', icon: '🔬', name: isEnglish ? 'Silicone' : 'سیلیکون', desc: isEnglish ? 'Wide temperature range' : 'محدوده دمایی وسیع' },
            { code: 'other', icon: '❓', name: isEnglish ? 'Other' : 'سایر', desc: isEnglish ? 'Other lubricant' : 'روانکار دیگر' }
        ];
    } else if (regime === 5) {
        options = [
            { code: 'mos2', icon: '💎', name: 'MoS₂', desc: isEnglish ? 'Suitable for vacuum' : 'مناسب خلأ' },
            { code: 'graphite', icon: '🖤', name: isEnglish ? 'Graphite' : 'گرافیت', desc: isEnglish ? 'Suitable for high temperature' : 'مناسب دمای بالا' },
            { code: 'ptfe', icon: '⬜', name: 'PTFE', desc: isEnglish ? 'Very low friction coefficient' : 'ضریب اصطکاک پایین' },
            { code: 'soft_metal', icon: '🥇', name: isEnglish ? 'Soft Metal Coating' : 'پوشش نرم فلزی', desc: isEnglish ? 'Suitable for high load' : 'مناسب بار بالا' },
            { code: 'other', icon: '❓', name: isEnglish ? 'Other' : 'سایر', desc: isEnglish ? 'Other solid lubricant' : 'روانکار جامد دیگر' }
        ];
    } else if ([7, 8].includes(regime)) {
        options = [
            { code: 'air', icon: '💨', name: isEnglish ? 'Air' : 'هوا', desc: isEnglish ? 'Default, low cost' : 'پیش‌فرض، کم‌هزینه' },
            { code: 'nitrogen', icon: '🫧', name: isEnglish ? 'Nitrogen' : 'نیتروژن', desc: isEnglish ? 'Inert gas for explosive environments' : 'گاز بی‌اثر برای محیط‌های انفجاری' },
            { code: 'helium', icon: '🎈', name: isEnglish ? 'Helium' : 'هلیوم', desc: isEnglish ? 'High heat dissipation' : 'دفع حرارت بالا' },
            { code: 'argon', icon: '🔵', name: isEnglish ? 'Argon' : 'آرگون', desc: isEnglish ? 'For vacuum processes' : 'برای فرآیندهای خلأ' },
            { code: 'other', icon: '❓', name: isEnglish ? 'Other' : 'سایر', desc: isEnglish ? 'Other gas' : 'گاز دیگر' }
        ];
    } else if (regime === 9) {
        options = [
            { code: 'lithium_grease', icon: '🧴', name: isEnglish ? 'Lithium Grease' : 'گریس لیتیم', desc: isEnglish ? 'Most common, good water resistance' : 'پرکاربرد، مقاوم به آب' },
            { code: 'lithium_complex', icon: '🧴', name: isEnglish ? 'Lithium Complex Grease' : 'گریس لیتیم کمپلکس', desc: isEnglish ? 'Higher temperature range' : 'محدوده دمایی بالاتر' },
            { code: 'calcium_grease', icon: '🧴', name: isEnglish ? 'Calcium Grease' : 'گریس کلسیم', desc: isEnglish ? 'Good water resistance' : 'مقاوم به آب' },
            { code: 'polyurea', icon: '🧴', name: isEnglish ? 'Polyurea Grease' : 'گریس پلی‌اوره', desc: isEnglish ? 'Long life' : 'عمر طولانی' },
            { code: 'other', icon: '❓', name: isEnglish ? 'Other' : 'سایر', desc: isEnglish ? 'Other grease' : 'گریس دیگر' }
        ];
    } else if (regime === 10) {
        options = [
            { code: 'emulsion_ow', icon: '💧', name: isEnglish ? 'O/W Emulsion' : 'امولسیون O/W', desc: isEnglish ? 'Excellent cooling' : 'خنک‌کاری عالی' },
            { code: 'emulsion_wo', icon: '🫧', name: isEnglish ? 'W/O Emulsion' : 'امولسیون W/O', desc: isEnglish ? 'Better lubrication' : 'روانکاری بهتر' },
            { code: 'other', icon: '❓', name: isEnglish ? 'Other' : 'سایر', desc: isEnglish ? 'Other emulsion' : 'امولسیون دیگر' }
        ];
    }

    container.innerHTML = `
        <div class="question-card">
            <div class="question-header">
                <span class="question-number">${isEnglish ? 'Question 4-1' : '۴-۱'}</span>
                <span class="question-tag tag-conditional">${isEnglish ? 'Manual Selection' : 'انتخاب دستی'}</span>
            </div>
            <h2 class="question-title">${isEnglish ? 'Select Base Lubricant Type' : 'نوع روانکار پایه را انتخاب کنید'}</h2>
            <div class="options-list">
                ${options.map(opt => `
                    <label class="option-card" data-value="${opt.code}">
                        <input type="radio" name="manual-lube" value="${opt.code}">
                        <div class="option-content">
                            <div class="option-icon">${opt.icon}</div>
                            <div class="option-text">
                                <strong>${opt.name}</strong>
                                <span>${opt.desc}</span>
                            </div>
                        </div>
                        <div class="option-radio"></div>
                    </label>
                `).join('')}
            </div>
            <div class="action-bar">
                <button id="btn-back-auto" class="btn btn-secondary">${isEnglish ? 'Back to Auto Suggestion' : 'بازگشت به پیشنهاد خودکار'}</button>
                <button id="btn-confirm-manual" class="btn btn-primary" disabled>${isEnglish ? 'Confirm' : 'تأیید'}</button>
            </div>
        </div>
    `;

    let selected = null;

    document.querySelectorAll('.option-card').forEach(card => {
        card.addEventListener('click', function() {
            document.querySelectorAll('.option-card').forEach(c => c.classList.remove('selected'));
            this.classList.add('selected');
            selected = this.dataset.value;
            document.getElementById('btn-confirm-manual').disabled = false;
        });
    });

    document.getElementById('btn-back-auto').addEventListener('click', () => {
        renderQuestion4_1(container);
    });

    document.getElementById('btn-confirm-manual').addEventListener('click', () => {
        if (!selected) return;

        if (selected === 'other') {
            window.dispatchEvent(new CustomEvent('navigate', { 
                detail: { question: '4-1a' } 
            }));
        } else {
            const selectedOption = options.find(opt => opt.code === selected);
            appState.setAnswer('4-1-lubricant-code', selected);
            appState.setAnswer('4-1-lubricant-name', selectedOption?.name || selected);
            appState.setAnswer('4-1-custom', false);
            
            if ([7, 8].includes(regime)) {
                appState.setAnswer('4-1-gas-code', selected);
                appState.setAnswer('4-1-gas-name', selectedOption?.name || selected);
            }
            
            window.dispatchEvent(new CustomEvent('navigate', { 
                detail: { question: '4-2' } 
            }));
        }
    });
}