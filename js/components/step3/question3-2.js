import appState from '../../state.js';
import router from '../../router.js';
export function renderQuestion3_2(container) {
    const isEnglish = appState.language === 'en';
    const step3Data = appState.getAnswer('3-0') || {};
    const specialConditions = appState.getAnswer('3-1') || [];
    const analysisMode = appState.getAnswer('1-1');
    const U = step3Data.U_ms || 1;
    const F = step3Data.F_N || 1000;
    const T = step3Data.T_C || 25;
    const p_max = step3Data.p_max_MPa || 100;
    const isConformal = step3Data.isConformal || false;
    // تعریف سیستم‌ها
    const allSystems = [
        { code: 1, icon: '🌊', name: isEnglish ? 'Hydrodynamic' : 'هیدرودینامیک', desc: isEnglish ? 'Full fluid film with self-generated pressure' : 'فیلم کامل سیال با فشار خود-تولید', condition: isEnglish ? 'High speed, medium load, conformal contact' : 'سرعت بالا، بار متوسط، تماس همسان' },
        { code: 2, icon: '💉', name: isEnglish ? 'Hydrostatic' : 'هیدرواستاتیک', desc: isEnglish ? 'Fluid film with external pressure (pump)' : 'فیلم سیال با فشار خارجی (پمپ)', condition: isEnglish ? 'Zero or low speed, high load, high precision' : 'سرعت صفر یا کم، بار بالا، دقت بالا' },
        { code: 3, icon: '⚡', name: isEnglish ? 'Elastohydrodynamic (EHL)' : 'الاستوهیدرودینامیک (EHL)', desc: isEnglish ? 'Thin film with elastic deformation' : 'فیلم نازک با تغییر شکل الاستیک', condition: isEnglish ? 'Non-conformal contact, high load, p_max > 1 GPa' : 'تماس غیرهمسان، بار بالا، p_max > 1 GPa' },
        { code: 4, icon: '🛡️', name: isEnglish ? 'Boundary Lubrication' : 'روانکاری مرزی', desc: isEnglish ? 'Thin molecular layer, direct contact' : 'لایه نازک مولکولی، تماس مستقیم', condition: isEnglish ? 'Low speed, medium load, medium temperature' : 'سرعت کم، بار متوسط، دمای متوسط' },
        { code: 5, icon: '💎', name: isEnglish ? 'Solid Lubricant' : 'روانکار جامد', desc: isEnglish ? 'Powder or solid coating' : 'پودر یا پوشش جامد', condition: isEnglish ? 'Vacuum, high temperature, corrosive environment' : 'خلأ، دمای بالا، محیط خورنده' },
        { code: 6, icon: '🔀', name: isEnglish ? 'Hybrid' : 'هیبریدی', desc: isEnglish ? 'Combination of hydrostatic + hydrodynamic' : 'ترکیب هیدرواستاتیک + هیدرودینامیک', condition: isEnglish ? 'Frequent start-stop, variable load' : 'استارت-استاپ مکرر، بار متغیر' },
        { code: 7, icon: '💨', name: isEnglish ? 'Gas Dynamic' : 'گاز دینامیک', desc: isEnglish ? 'Gas film with self-generated pressure' : 'فیلم گاز با فشار خود-تولید', condition: isEnglish ? 'Very high speed, high temperature, low load' : 'سرعت بسیار بالا، دمای بالا، بار کم' },
        { code: 8, icon: '🎈', name: isEnglish ? 'Aerostatic' : 'ایرواستاتیک', desc: isEnglish ? 'Air film with external pressure' : 'فیلم هوا با فشار خارجی', condition: isEnglish ? 'Very high precision (µm), low load' : 'دقت بسیار بالا (µm)، بار کم' },
        { code: 9, icon: '🧴', name: isEnglish ? 'Grease' : 'گریس', desc: isEnglish ? 'Semi-solid lubricant, low maintenance' : 'روانکار نیمه‌جامد، نگهداری کم', condition: isEnglish ? 'Medium speed, medium load, maintenance-free' : 'سرعت متوسط، بار متوسط، maintenance-free' },
        { code: 10, icon: '💧', name: isEnglish ? 'Emulsion' : 'امولسیون', desc: isEnglish ? 'Water-oil mixture, excellent cooling' : 'مخلوط آب و روغن، خنک‌کاری عالی', condition: isEnglish ? 'High temperature, fire risk, need for cooling' : 'دمای بالا، ریسک آتش‌سوزی، نیاز به خنک‌کاری' }
    ];
    const eliminated = new Set();
    const eliminationReasons = {};
    // اعمال شرایط ویژه
    if (specialConditions.includes(4)) {
        [1, 2, 3, 4, 6, 7, 8, 9, 10].forEach(code => {
            eliminated.add(code);
            eliminationReasons[code] = isEnglish ? 'Vacuum/corrosive environment — only solid lubricant allowed' : 'محیط خلأ/خورنده — فقط روانکار جامد مجاز است';
        });
    }
    if (specialConditions.includes(1)) {
        [1, 2, 3, 4, 6].forEach(code => {
            if (!eliminated.has(code)) {
                eliminated.add(code);
                eliminationReasons[code] = isEnglish ? 'Fire risk — mineral oil not allowed' : 'ریسک آتش‌سوزی — روغن معدنی مجاز نیست';
            }
        });
    }
    if (specialConditions.includes(2)) {
        [1, 9].forEach(code => {
            if (!eliminated.has(code)) {
                eliminated.add(code);
                eliminationReasons[code] = code === 1 ? (isEnglish ? 'High precision — hydrodynamic causes vibration' : 'دقت بالا — هیدرودینامیک لرزش ایجاد می‌کند') : (isEnglish ? 'High precision — grease causes noise' : 'دقت بالا — گریس نویز ایجاد می‌کند');
            }
        });
    }
    if (specialConditions.includes(3)) {
        [1, 3].forEach(code => {
            if (!eliminated.has(code)) {
                eliminated.add(code);
                eliminationReasons[code] = isEnglish ? 'Frequent start-stop — stable film not formed' : 'استارت-استاپ مکرر — فیلم پایدار تشکیل نمی‌شود';
            }
        });
    }
    // منطق اصلی انتخاب
    const mainLogicReasons = [];
    let recommendedSystem = null;
    if (U < 0.001) {
        if (specialConditions.includes(2)) {
            recommendedSystem = 8;
            mainLogicReasons.push(isEnglish ? 'U ≈ 0 + high precision → aerostatic' : 'U ≈ 0 + دقت بالا → ایرواستاتیک');
        } else if (F > 10000) {
            recommendedSystem = 2;
            mainLogicReasons.push(isEnglish ? 'U ≈ 0 + high load → hydrostatic' : 'U ≈ 0 + بار بالا → هیدرواستاتیک');
        } else if (specialConditions.includes(4)) {
            recommendedSystem = 5;
            mainLogicReasons.push(isEnglish ? 'U ≈ 0 + corrosive environment → solid lubricant' : 'U ≈ 0 + محیط خورنده → روانکار جامد');
        } else {
            recommendedSystem = 5;
            mainLogicReasons.push(isEnglish ? 'U ≈ 0 → solid lubricant (default)' : 'U ≈ 0 → روانکار جامد (پیش‌فرض)');
        }
    } else if (p_max > 1000) {
        if (!isConformal && !eliminated.has(3)) {
            recommendedSystem = 3;
            mainLogicReasons.push(isEnglish ? `p_max = ${p_max.toFixed(0)} MPa > 1 GPa + Non-conformal → EHL` : `p_max = ${p_max.toFixed(0)} MPa > 1 GPa + غیرهمسان → EHL`);
        } else if (isConformal && !eliminated.has(1)) {
            recommendedSystem = 1;
            mainLogicReasons.push(isEnglish ? `p_max = ${p_max.toFixed(0)} MPa + Conformal → Hydrodynamic` : `p_max = ${p_max.toFixed(0)} MPa + همسان → هیدرودینامیک`);
        }
    } else if (T > 200) {
        if (!eliminated.has(7)) {
            recommendedSystem = 7;
            mainLogicReasons.push(isEnglish ? `T = ${T}°C > 200°C → Gas Dynamic` : `T = ${T}°C > 200°C → گاز دینامیک`);
        } else if (!eliminated.has(5)) {
            recommendedSystem = 5;
            mainLogicReasons.push(isEnglish ? `T = ${T}°C > 200°C → Solid Lubricant` : `T = ${T}°C > 200°C → روانکار جامد`);
        }
    } else {
        if (isConformal && U > 0.1 && F < 100000 && !eliminated.has(1)) {
            recommendedSystem = 1;
            mainLogicReasons.push(isEnglish ? 'Conformal contact + U > 0.1 + F < 100 kN → Hydrodynamic' : 'تماس همسان + U > 0.1 + F < 100 kN → هیدرودینامیک');
        } else if (!isConformal && F > 1000 && !eliminated.has(3)) {
            recommendedSystem = 3;
            mainLogicReasons.push(isEnglish ? 'Non-conformal contact + F > 1 kN → EHL' : 'تماس غیرهمسان + F > 1 kN → EHL');
        } else if (!eliminated.has(4)) {
            recommendedSystem = 4;
            mainLogicReasons.push(isEnglish ? 'Medium conditions → boundary lubrication' : 'شرایط متوسط → روانکاری مرزی');
        }
    }
    if (specialConditions.includes(5) && [9, 5].includes(recommendedSystem || 0)) {
        mainLogicReasons.push(isEnglish ? 'Maintenance-free → confirming grease/solid lubricant' : 'Maintenance-free → تأیید گریس/روانکار جامد');
    } else if (specialConditions.includes(5) && !eliminated.has(9)) {
        recommendedSystem = 9;
        mainLogicReasons.push(isEnglish ? 'Maintenance-free → priority with grease' : 'Maintenance-free → اولویت با گریس');
    }
    if (!recommendedSystem) {
        for (const sys of allSystems) {
            if (!eliminated.has(sys.code)) {
                recommendedSystem = sys.code;
                mainLogicReasons.push(isEnglish ? 'Fallback: first available system' : 'Fallback: اولین سیستم مجاز');
                break;
            }
        }
    }
    const selectedSystem = allSystems.find(s => s.code === recommendedSystem);
    const step3SystemData = {
        recommendedSystem: recommendedSystem,
        systemName: selectedSystem ? selectedSystem.name : (isEnglish ? 'Unknown' : 'نامشخص'),
        eliminatedSystems: Array.from(eliminated),
        eliminationReasons: eliminationReasons,
        mainLogicReasons: mainLogicReasons,
        allSystems: allSystems,
        manuallySelected: false
    };
    appState.setAnswer('3-2', step3SystemData);
    appState.setFlag('LUBRICATION_SYSTEM', recommendedSystem);
    const hasSpecialConditions = specialConditions.length > 0 && !specialConditions.includes(6);
    container.innerHTML = `
        <div class="question-card">
            <div class="question-header">
                <span class="question-number">${isEnglish ? 'Question 3-2' : 'سوال ۳-۲'}</span>
                <span class="question-tag tag-auto">${isEnglish ? 'Combined Analysis' : 'تحلیل ترکیبی'}</span>
            </div>
            <h2 class="question-title">${isEnglish ? 'Ideal Lubrication System' : 'سیستم روانکاری ایده‌آل'}</h2>
            <p class="question-description">
                ${isEnglish ? 'Based on the combined analysis of special conditions and main logic (speed, load, temperature, contact stress), the appropriate lubrication system has been selected.' : 'بر اساس تحلیل ترکیبی شرایط ویژه و منطق اصلی (سرعت، بار، دما، تنش تماسی)، سیستم روانکاری مناسب انتخاب شده است.'}
            </p>
            <!-- پارامترهای تحلیل -->
            <div class="result-panel">
                <h3>${isEnglish ? 'Analysis Parameters' : 'پارامترهای تحلیل'}</h3>
                <div class="result-grid">
                    <div class="result-item">
                        <span class="label">U — ${isEnglish ? 'Relative Speed' : 'سرعت نسبی'}</span>
                        <span class="value">${U.toFixed(3)} m/s</span>
                    </div>
                    <div class="result-item">
                        <span class="label">F — ${isEnglish ? 'Normal Load' : 'بار عمودی'}</span>
                        <span class="value">${F.toFixed(0)} N ${F > 1000 ? '(' + (F/1000).toFixed(1) + ' kN)' : ''}</span>
                    </div>
                    <div class="result-item">
                        <span class="label">T — ${isEnglish ? 'Operating Temperature' : 'دمای کاری'}</span>
                        <span class="value">${T} °C</span>
                    </div>
                    <div class="result-item ${p_max > 1000 ? 'danger' : ''}">
                        <span class="label">p_max — ${isEnglish ? 'Contact Stress' : 'تنش تماسی'}</span>
                        <span class="value">${p_max.toFixed(1)} MPa ${p_max > 1000 ? '⚠️' : ''}</span>
                    </div>
                    <div class="result-item">
                        <span class="label">${isEnglish ? 'Contact Geometry' : 'هندسه تماس'}</span>
                        <span class="value">${isConformal ? (isEnglish ? 'Conformal' : 'همسان') : (isEnglish ? 'Non-conformal' : 'غیرهمسان')}</span>
                    </div>
                    <div class="result-item">
                        <span class="label">${isEnglish ? 'Special Conditions' : 'شرایط ویژه'}</span>
                        <span class="value">${hasSpecialConditions ? specialConditions.length + ' ' + (isEnglish ? 'case(s)' : 'مورد') : (isEnglish ? 'None' : 'ندارد')}</span>
                    </div>
                </div>
            </div>
            <!-- سیستم‌های حذف‌شده -->
            ${hasSpecialConditions ? `
            <div class="formula-panel">
                <h4>${isEnglish ? 'Eliminated Systems (based on special conditions)' : 'سیستم‌های حذف‌شده (بر اساس شرایط ویژه)'}</h4>
                ${Array.from(eliminated).map(code => {
                    const sys = allSystems.find(s => s.code === code);
                    return sys ? `
                        <div class="equipment-item" style="opacity: 0.6; background: #fff5f5;">
                            <div class="equipment-icon" style="background: #c62828;">${sys.icon}</div>
                            <div class="equipment-info">
                                <strong style="text-decoration: line-through;">${sys.name}</strong>
                                <small style="color: #c62828;">${eliminationReasons[code] || (isEnglish ? 'Eliminated' : 'حذف شد')}</small>
                            </div>
                        </div>
                    ` : '';
                }).join('')}
            </div>
            ` : ''}
            <!-- منطق اصلی انتخاب -->
            <div class="formula-panel">
                <h4>${isEnglish ? 'Main Selection Logic' : 'منطق اصلی انتخاب'}</h4>
                ${mainLogicReasons.map((reason, i) => `
                    <div class="formula-box" style="margin-bottom: 8px;">
                        <div class="formula-text" style="color: var(--blue-standard);">
                            <strong>${i + 1}.</strong> ${reason}
                        </div>
                    </div>
                `).join('')}
            </div>
            <!-- سیستم پیشنهادی -->
            <div class="result-panel" style="border: 2px solid var(--green-industrial); background: #f1f8e9; position: relative;">
                <div style="position: absolute; top: -12px; ${isEnglish ? 'left: 16px;' : 'right: 16px;'} background: var(--green-industrial); color: white; padding: 2px 12px; border-radius: 12px; font-size: 0.75rem; font-weight: 600;">
                    ${isEnglish ? 'Recommended System' : 'سیستم پیشنهادی'}
                </div>
                <div style="display: flex; align-items: center; gap: 20px; padding: 16px; margin-top: 8px;">
                    <div style="font-size: 4rem;">${selectedSystem.icon}</div>
                    <div>
                        <h4 style="color: var(--green-industrial); font-size: 1.3rem; margin-bottom: 8px;">
                            ${selectedSystem.name}
                        </h4>
                        <p style="color: var(--text-primary); margin-bottom: 4px;">${selectedSystem.desc}</p>
                        <p style="color: var(--text-secondary); font-size: 0.85rem;">${selectedSystem.condition}</p>
                    </div>
                </div>
            </div>
            <!-- همه سیستم‌ها -->
            <div class="formula-panel">
                <h4>${isEnglish ? 'All Lubrication Systems (for review)' : 'همه سیستم‌های روانکاری (برای بررسی)'}</h4>
                <div style="display: flex; flex-direction: column; gap: 8px;">
                    ${allSystems.map(sys => {
                        const isThisRecommended = (sys.code === recommendedSystem);
                        const isThisEliminated = eliminated.has(sys.code);
                        const langClass = isEnglish ? 'lang-en' : 'lang-fa';
                        return `
                            <div class="system-card ${isThisRecommended ? `recommended ${langClass}` : ''} ${isThisEliminated ? 'eliminated' : ''}">
                                <div class="system-icon">${sys.icon}</div>
                                <div class="system-info">
                                    <strong>${sys.name}</strong>
                                    <small>${sys.desc}</small>
                                    ${isThisEliminated ? `<span class="system-reason">${eliminationReasons[sys.code] || (isEnglish ? 'Eliminated' : 'حذف شد')}</span>` : ''}
                                </div>
                                ${isThisRecommended ? 
                                    '<div style="font-size: 1.2rem;">✅</div>' : 
                                    isThisEliminated ? 
                                    '<div style="font-size: 1.2rem;">❌</div>' : 
                                    ''
                                }
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
            <!-- تأیید -->
            <div style="margin-top: 24px; padding: 16px; background: #fff; border: 1px solid var(--border-light); border-radius: var(--radius-md);">
                <p style="font-weight: 600; margin-bottom: 12px;">${isEnglish ? 'Do you confirm this system?' : 'آیا این سیستم را تأیید می‌کنید؟'}</p>
                <div style="display: flex; gap: 12px;">
                    <button id="btn-confirm-system" class="btn btn-primary" style="flex: 1;">
                        ✅ ${isEnglish ? 'Yes, I confirm' : 'بله، تأیید می‌کنم'}
                    </button>
                    <button id="btn-change-system" class="btn btn-secondary" style="flex: 1;">
                        🔄 ${isEnglish ? 'No, I will change the system' : 'خیر، سیستم را تغییر می‌دهم'}
                    </button>
                </div>
            </div>
            <div class="action-bar">
                <button id="back-btn-3-2" class="btn btn-secondary">${isEnglish ? 'Back' : 'بازگشت'}</button>
            </div>
        </div>
    `;
    document.getElementById('back-btn-3-2').addEventListener('click', () => {
        window.dispatchEvent(new CustomEvent('navigate', { detail: { question: '3-1' } }));
    });
    document.getElementById('btn-confirm-system').addEventListener('click', () => {
        appState.currentQuestion = '3-2';
        const nextQuestion = router.getNextQuestion('3-2', null);
        if (nextQuestion) {
            window.dispatchEvent(new CustomEvent('navigate', { detail: { question: nextQuestion } }));
        }
    });
    document.getElementById('btn-change-system').addEventListener('click', () => {
        showManualSelection(container, allSystems, eliminated, eliminationReasons, isEnglish);
    });
}
function showManualSelection(container, allSystems, eliminated, eliminationReasons, isEnglish) {
    container.innerHTML = `
        <div class="question-card" id="manual-selection-card">
            <div class="question-header">
                <span class="question-number">${isEnglish ? 'Question 3-2' : 'سوال ۳-۲'}</span>
                <span class="question-tag tag-conditional">${isEnglish ? 'Manual Selection' : 'انتخاب دستی'}</span>
            </div>
            <h2 class="question-title">${isEnglish ? 'Please select the appropriate lubrication system' : 'لطفاً سیستم روانکاری مناسب را انتخاب کنید'}</h2>
            <p class="question-description">
                ${isEnglish ? 'You did not accept the automatic suggestion. Please select from the options below.' : 'سیستم پیشنهادی خودکار را نپذیرفتید. لطفاً از بین گزینه‌های زیر انتخاب کنید.'}
            </p>
            <div class="options-list">
                ${allSystems.map(sys => `
                    <label class="option-card ${eliminated.has(sys.code) ? 'option-disabled' : ''}" 
                           style="${eliminated.has(sys.code) ? 'opacity: 0.5; pointer-events: none;' : ''}">
                        <input type="radio" name="manual-system" value="${sys.code}" 
                               ${eliminated.has(sys.code) ? 'disabled' : ''}>
                        <div class="option-content">
                            <div class="option-icon">${sys.icon}</div>
                            <div class="option-text">
                                <strong>${sys.name}</strong>
                                <span>${sys.desc}</span>
                                ${eliminated.has(sys.code) ? 
                                    `<small style="color: #c62828;">⚠️ ${eliminationReasons[sys.code]}</small>` : 
                                    `<small>${sys.condition}</small>`
                                }
                            </div>
                        </div>
                        <div class="option-radio"></div>
                    </label>
                `).join('')}
            </div>
            <div class="action-bar">
                <button id="btn-back-to-auto" class="btn btn-secondary">
                    🔄 ${isEnglish ? 'Back to Automatic Suggestion' : 'بازگشت به پیشنهاد خودکار'}
                </button>
                <button id="btn-confirm-manual" class="btn btn-primary" disabled>
                    ✅ ${isEnglish ? 'Confirm Manual Selection' : 'تأیید انتخاب دستی'}
                </button>
            </div>
        </div>
    `;
    let selectedManualSystem = null;
    document.querySelectorAll('input[name="manual-system"]').forEach(radio => {
        radio.addEventListener('change', (e) => {
            selectedManualSystem = parseInt(e.target.value);
            document.getElementById('btn-confirm-manual').disabled = false;
        });
    });
    document.getElementById('btn-back-to-auto').addEventListener('click', () => {
        renderQuestion3_2(container);
    });
    document.getElementById('btn-confirm-manual').addEventListener('click', () => {
        if (!selectedManualSystem) return;
        const step3SystemData = {
            recommendedSystem: selectedManualSystem,
            systemName: allSystems.find(s => s.code === selectedManualSystem).name,
            eliminatedSystems: Array.from(eliminated),
            eliminationReasons: eliminationReasons,
            mainLogicReasons: [isEnglish ? 'Manual selection by user' : 'انتخاب دستی توسط کاربر'],
            allSystems: allSystems,
            manuallySelected: true
        };
        appState.setAnswer('3-2', step3SystemData);
        appState.setFlag('LUBRICATION_SYSTEM', selectedManualSystem);
        appState.currentQuestion = '3-2';
        const nextQuestion = router.getNextQuestion('3-2', null);
        if (nextQuestion) {
            window.dispatchEvent(new CustomEvent('navigate', { detail: { question: nextQuestion } }));
        }
    });
}