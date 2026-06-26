import appState from '../../state.js';

export function renderReport3(container) {
    const t = (key, params = {}) => appState.t(key, params);
    const route = appState.getAnswer('1-1');
    const isEnglish = appState.language === 'en';

    const routeNames = {
        '1': isEnglish ? 'Design' : 'طراحی',
        '2': isEnglish ? 'Troubleshooting' : 'عیب‌یابی',
        '3': isEnglish ? 'Monitoring' : 'پایش'
    };
    const routeIcons = { '1': '✏️', '2': '🔧', '3': '📊' };
    const routeColors = { '1': '#1565C0', '2': '#EF6C00', '3': '#2E7D32' };

    const contactData = appState.getAnswer('3-0') || {};
    const specialConditions = appState.getAnswer('3-1') || [];
    const systemData = appState.getAnswer('3-2') || {};
    const hasSystemProblem = appState.getAnswer('3-4');
    const selectedProblems = appState.getAnswer('3-5') || [];
    const solutionData = appState.getAnswer('3-6') || {};
    const maintenanceData = appState.getAnswer('3-13') || {};
    const greaseType = appState.getAnswer('3-7a');
    const solidLubeMethod = appState.getAnswer('3-7b');
    const grooveStatus = appState.getAnswer('3-8');
    const filterStatus = appState.getAnswer('3-9');
    const leakStatus = appState.getAnswer('3-10');
    const foamStatus = appState.getAnswer('3-11');
    const tempStatus = appState.getAnswer('3-12');

    const filterStatusNames = {
        '1': '✅ ' + (isEnglish ? 'Healthy and Bypass Closed' : 'سالم و بای‌پس بسته'),
        '2': '⚠️ ' + (isEnglish ? 'Clogged' : 'گرفته شده'),
        '3': '❌ ' + (isEnglish ? 'None' : 'ندارد')
    };
    const leakStatusNames = {
        '1': '✅ ' + (isEnglish ? 'None' : 'ندارد'),
        '2': '⚠️ ' + (isEnglish ? 'From Fittings' : 'از اتصالات'),
        '3': '⚠️ ' + (isEnglish ? 'From Seal/Gasket' : 'از کاسه نمد/آب‌بند'),
        '4': '⚠️ ' + (isEnglish ? 'From Tank/Pipes' : 'از مخزن/لوله‌ها')
    };
    const foamStatusNames = {
        '1': '✅ ' + (isEnglish ? 'Clear' : 'شفاف'),
        '2': '🫧 ' + (isEnglish ? 'Surface Foaming' : 'کف سطحی (Foaming)'),
        '3': '💨 ' + (isEnglish ? 'Fine Bubbles (Aeration)' : 'حباب ریز (Aeration)')
    };
    const tempStatusNames = {
        '1': '✅ ' + (isEnglish ? 'Normal' : 'نرمال'),
        '2': '🌡️ ' + (isEnglish ? 'High (80-100°C)' : 'بالا (۸۰-۱۰۰°C)'),
        '3': '🔥 ' + (isEnglish ? 'Critical (>100°C)' : 'بحرانی (>۱۰۰°C)')
    };

    const getEquipmentText = (code) => {
        const equipmentMap = {
            1: isEnglish ? 'Pump, 10-25 µm filter, tank, cooler, inlet valves' : 'پمپ، فیلتر ۱۰-۲۵ µm، مخزن، خنک‌کن، شیرهای ورودی',
            2: isEnglish ? 'High pressure pump, ≤5 µm filter, pressurized tank, flow reducer, pressure control valve' : 'پمپ فشار بالا، فیلتر ≤۵ µm، مخزن تحت فشار، کاهنده جریان، شیر کنترل فشار',
            3: isEnglish ? 'Medium pressure pump, filtration, cooling system, precision nozzle' : 'پمپ فشار متوسط، فیلتراسیون، سیستم خنک‌کاری، نازل دقیق',
            4: isEnglish ? 'Simple system (drip/wick), small reservoir' : 'سیستم ساده (قطره‌ای/فتیله‌ای)، مخزن کوچک',
            5: isEnglish ? 'Coating application equipment, cleaning system, curing oven' : 'تجهیزات اعمال پوشش، سیستم تمیزکاری، کوره پخت',
            6: isEnglish ? 'High pressure pump + hydrodynamic system + automatic control valve' : 'پمپ فشار بالا + سیستم هیدرودینامیک + شیر کنترل خودکار',
            7: isEnglish ? 'Gas compressor, ≤1 µm filter, dryer, pressure regulator' : 'کمپرسور گاز، فیلتر ≤۱ µm، خشک‌کن، تنظیم‌کننده فشار',
            8: isEnglish ? 'Air compressor, ≤1 µm filter, dryer, pressure regulator, flow reducer' : 'کمپرسور هوا، فیلتر ≤۱ µm، خشک‌کن، تنظیم‌کننده فشار، کاهنده جریان',
            9: isEnglish ? 'Grease pump, check valve, short pipes, standard fittings' : 'گریس‌پمپ، شیر یک‌طرفه، لوله‌های کوتاه، اتصالات استاندارد',
            10: isEnglish ? 'Water-oil mixing system, special pump, filter, temperature control, antibacterial' : 'سیستم اختلاط آب و روغن، پمپ مخصوص، فیلتر، کنترل دما، ضد باکتری'
        };
        return equipmentMap[code] || '—';
    };

    const now = new Date();
    const dateStr = now.toLocaleDateString(isEnglish ? 'en-US' : 'fa-IR', {
        year: 'numeric', month: 'long', day: 'numeric',
        hour: '2-digit', minute: '2-digit'
    });
    const answeredCount = appState.getAnsweredCount();
    const step3AnsweredCount = Object.keys(appState.answers).filter(k => k.startsWith('3-')).length;

    const systemName = systemData.systemName || (isEnglish ? 'Unknown' : 'نامشخص');
    const systemNameDisplay = isEnglish ? systemName : systemName;

    container.innerHTML = `
        <div class="report-container" id="report3-printable">
            <!-- HEADER -->
            <div style="text-align: center; margin-bottom: 32px; padding-bottom: 24px; border-bottom: 2px solid var(--border-light);">
                <div style="font-size: 2.5rem; margin-bottom: 8px;">🛢️</div>
                <h1 style="font-size: 1.6rem; color: var(--primary-navy); margin-bottom: 4px;">
                    ${isEnglish ? 'Step 3 Report: Lubrication System' : 'گزارش گام ۳: سیستم روانکاری'}
                </h1>
                <p class="report-subtitle" style="color: ${routeColors[route] || '#666'}; font-size: 1.1rem;">
                    ${routeIcons[route] || '📌'} ${isEnglish ? 'Route:' : 'مسیر:'} ${routeNames[route] || (isEnglish ? 'Unknown' : 'نامشخص')}
                </p>
                <div class="report-meta" style="justify-content: center; gap: 24px;">
                    <span>📅 ${dateStr}</span>
                    <span>❓ ${step3AnsweredCount} ${isEnglish ? 'Questions' : 'سوال'} (${isEnglish ? 'Step 3' : 'گام ۳'})</span>
                    <span>📊 ${isEnglish ? 'Total' : 'مجموع'}: ${answeredCount} ${isEnglish ? 'Questions' : 'سوال'}</span>
                </div>
            </div>

            <!-- SECTION 1: Contact Stress Calculations -->
            <div class="report-section">
                <h3>📊 ${isEnglish ? 'Contact Stress Calculations (Question 3-0)' : 'محاسبات تنش تماسی (سوال ۳-۰)'}</h3>
                <table class="report-table">
                    <tbody>
                        <tr>
                            <td style="width: 40%;"><strong>${isEnglish ? "E' — Equivalent Elastic Modulus" : "E' — مدول الاستیسیته معادل"}</strong></td>
                            <td><strong>${contactData.E_prime_GPa?.toFixed(2) || '—'} GPa</strong></td>
                        </tr>
                        <tr>
                            <td><strong>${isEnglish ? 'p_max — Maximum Contact Stress' : 'p_max — تنش تماسی حداکثر'}</strong></td>
                            <td style="color: ${contactData.ratio > 1 ? '#C62828' : '#2E7D32'}; font-weight: 700;">
                                ${contactData.p_max_MPa?.toFixed(2) || '—'} MPa
                            </td>
                        </tr>
                        <tr>
                            <td><strong>${isEnglish ? 'σ_y — Yield Stress (softer)' : 'σ_y — تنش تسلیم (نرم‌تر)'}</strong></td>
                            <td>${contactData.sigma_y_MPa?.toFixed(2) || '—'} MPa</td>
                        </tr>
                        <tr>
                            <td><strong>p<sub>max</sub> / σ<sub>y</sub></strong></td>
                            <td style="color: ${contactData.ratio > 1 ? '#C62828' : '#2E7D32'}; font-weight: 700;">
                                ${contactData.ratio?.toFixed(3) || '—'}
                                ${contactData.ratio > 1 ? ' ⚠️ ' + (isEnglish ? 'Yielding' : 'تسلیم') : ' ✓ ' + (isEnglish ? 'Safe' : 'ایمن')}
                            </td>
                        </tr>
                        <tr>
                            <td><strong>${isEnglish ? 'Contact Type' : 'نوع تماس'}</strong></td>
                            <td>${contactData.isConformal ? (isEnglish ? 'Conformal' : 'همسان (Conformal)') : (isEnglish ? 'Non-conformal' : 'غیرهمسان (Non-conformal)')}</td>
                        </tr>
                        <tr>
                            <td><strong>${isEnglish ? 'Formula Type' : 'نوع فرمول'}</strong></td>
                            <td>${contactData.formulaType === 'conformal' ? (isEnglish ? 'Conformal Contact' : 'تماس همسان') : contactData.formulaType === 'line' ? (isEnglish ? 'Line Contact (Hertz)' : 'تماس خطی (هرتز)') : (isEnglish ? 'Point Contact (Hertz)' : 'تماس نقطه‌ای (هرتز)')}</td>
                        </tr>
                    </tbody>
                </table>
                <div style="margin-top: 12px; padding: 10px; background: #E3F2FD; border-radius: 6px; font-size: 0.85rem;">
                    <strong>${isEnglish ? 'Input Parameters:' : 'پارامترهای ورودی:'}</strong>
                    E₁ = ${contactData.E1_GPa?.toFixed(0) || '—'} GPa, 
                    E₂ = ${contactData.E2_GPa?.toFixed(0) || '—'} GPa, 
                    ν₁ = ${contactData.nu1 || '—'}, 
                    ν₂ = ${contactData.nu2 || '—'}, 
                    F = ${contactData.F_N?.toFixed(0) || '—'} N, 
                    U = ${contactData.U_ms?.toFixed(2) || '—'} m/s, 
                    T = ${contactData.T_C || '—'} °C
                </div>
            </div>

            <!-- SECTION 2: Special Conditions -->
            <div class="report-section">
                <h3>🔍 ${isEnglish ? 'Special Conditions (Question 3-1)' : 'شرایط ویژه (سوال ۳-۱)'}</h3>
                ${specialConditions.length === 0 || specialConditions.includes(6) ? 
                    '<p>✅ ' + (isEnglish ? 'No special conditions selected. Analysis performed based on main logic.' : 'هیچ شرایط ویژه‌ای انتخاب نشده. تحلیل بر اساس منطق اصلی انجام شده است.') + '</p>' :
                    `<ul class="report-flags-list">
                        ${specialConditions.filter(c => c !== 6).map(c => {
                            const conditionNames = {
                                1: isEnglish ? 'High Fire Risk' : 'ریسک آتش‌سوزی بالا',
                                2: isEnglish ? 'Very High Precision (µm)' : 'نیاز به دقت بسیار بالا (µm)',
                                3: isEnglish ? 'Frequent Start-Stop' : 'استارت-استاپ مکرر',
                                4: isEnglish ? 'Vacuum or Corrosive Environment' : 'خلأ یا محیط خورنده',
                                5: isEnglish ? 'Low Maintenance (Maintenance-free)' : 'نیاز به نگهداری کم (Maintenance-free)'
                            };
                            return `<li>${conditionNames[c] || 'Unknown'}</li>`;
                        }).join('')}
                    </ul>`
                }
            </div>

            <!-- SECTION 3: Ideal Lubrication System -->
            <div class="report-section" style="border: 2px solid ${systemData.manuallySelected ? '#EF6C00' : '#2E7D32'};">
                <h3>⚙️ ${isEnglish ? 'Ideal Lubrication System (Question 3-2)' : 'سیستم روانکاری ایده‌آل (سوال ۳-۲)'}</h3>
                <div style="text-align: center; padding: 20px;">
                    <div style="font-size: 4rem; margin-bottom: 8px;">
                        ${getSystemIcon(systemData.recommendedSystem)}
                    </div>
                    <h4 style="color: ${systemData.manuallySelected ? '#EF6C00' : '#2E7D32'}; font-size: 1.3rem; margin-bottom: 8px;">
                        ${systemNameDisplay || 'Unknown'}
                        ${systemData.manuallySelected ? ' (Manual Selection)' : ' (Auto Suggestion)'}
                    </h4>
                    <p style="color: var(--text-secondary);">
                        ${getSystemDesc(systemData.recommendedSystem, isEnglish)}
                    </p>
                </div>
                ${systemData.mainLogicReasons && systemData.mainLogicReasons.length > 0 ? `
                <div style="margin-top: 16px; padding: 12px; background: #F5F5F5; border-radius: 6px;">
                    <strong>🧠 ${isEnglish ? 'Selection Logic:' : 'منطق انتخاب:'}</strong>
                    <ol style="margin: 8px 0; padding-left: 20px;">
                        ${systemData.mainLogicReasons.map(r => {
                            if (isEnglish) {
                                const reasonTranslations = {
                                    'انتخاب دستی توسط کاربر': 'Manual selection by user',
                                    'شرایط متوسط → روانکاری مرزی': 'Medium conditions → boundary lubrication',
                                    'U ≈ 0 + دقت بالا → ایرواستاتیک': 'U ≈ 0 + high precision → aerostatic',
                                    'U ≈ 0 + بار بالا → هیدرواستاتیک': 'U ≈ 0 + high load → hydrostatic',
                                    'U ≈ 0 → روانکار جامد (پیش‌فرض)': 'U ≈ 0 → solid lubricant (default)',
                                    'تماس همسان + U > 0.1 + F < 100 kN → هیدرودینامیک': 'Conformal contact + U > 0.1 + F < 100 kN → hydrodynamic',
                                    'تماس غیرهمسان + F > 1 kN → EHL': 'Non-conformal contact + F > 1 kN → EHL',
                                    'Fallback: اولین سیستم مجاز': 'Fallback: first available system',
                                    'Maintenance-free → تأیید گریس/روانکار جامد': 'Maintenance-free → confirming grease/solid lubricant',
                                    'Maintenance-free → اولویت با گریس': 'Maintenance-free → priority with grease'
                                };
                                r = reasonTranslations[r] || r;
                            }
                            return `<li style="margin-bottom: 4px;">${r}</li>`;
                        }).join('')}
                    </ol>
                </div>
                ` : ''}
                ${systemData.eliminatedSystems && systemData.eliminatedSystems.length > 0 ? `
                <div style="margin-top: 12px;">
                    <strong>🚫 ${isEnglish ? 'Eliminated Systems:' : 'سیستم‌های حذف‌شده:'}</strong>
                    <ul style="margin: 8px 0; padding-left: 20px; color: #C62828;">
                        ${systemData.eliminatedSystems.map(code => {
                            const systemNames = {
                                1: isEnglish ? 'Hydrodynamic' : 'هیدرودینامیک',
                                2: isEnglish ? 'Hydrostatic' : 'هیدرواستاتیک',
                                3: 'EHL',
                                4: isEnglish ? 'Boundary Lubrication' : 'روانکاری مرزی',
                                5: isEnglish ? 'Solid Lubricant' : 'روانکار جامد',
                                6: isEnglish ? 'Hybrid' : 'هیبریدی',
                                7: isEnglish ? 'Gas Dynamic' : 'گاز دینامیک',
                                8: isEnglish ? 'Aerostatic' : 'ایرواستاتیک',
                                9: isEnglish ? 'Grease' : 'گریس',
                                10: isEnglish ? 'Emulsion' : 'امولسیون'
                            };
                            let reason = systemData.eliminationReasons?.[code] || '—';
                            if (isEnglish) {
                                const reasonTranslations = {
                                    'محیط خلأ/خورنده — فقط روانکار جامد مجاز است': 'Vacuum/corrosive environment — only solid lubricant allowed',
                                    'ریسک آتش‌سوزی — روغن معدنی مجاز نیست': 'Fire risk — mineral oil not allowed',
                                    'دقت بالا — هیدرودینامیک لرزش ایجاد می‌کند': 'High precision — hydrodynamic causes vibration',
                                    'دقت بالا — گریس نویز ایجاد می‌کند': 'High precision — grease causes noise',
                                    'استارت-استاپ مکرر — فیلم پایدار تشکیل نمی‌شود': 'Frequent start-stop — stable film not formed'
                                };
                                reason = reasonTranslations[reason] || reason;
                            }
                            return `<li>${systemNames[code] || code}: ${reason}</li>`;
                        }).join('')}
                    </ul>
                </div>
                ` : ''}
            </div>

            <!-- SECTION 4: Troubleshooting -->
            ${route !== '1' ? `
            <div class="report-section">
                <h3>🔧 ${isEnglish ? 'System Troubleshooting (Questions 3-4 to 3-6)' : 'عیب‌یابی سیستم (سوال ۳-۴ تا ۳-۶)'}</h3>
                ${hasSystemProblem === '1' ? `
                    ${selectedProblems.length > 0 ? `
                    <h4 style="color: #EF6C00; margin-bottom: 8px;">⚠️ ${isEnglish ? 'Identified Problems:' : 'مشکلات شناسایی‌شده:'}</h4>
                    <ul class="report-flags-list">
                        ${selectedProblems.map(code => {
                            const problemNames = {
                                1: isEnglish ? 'Wrong mechanism' : 'مکانیزم اشتباه',
                                2: isEnglish ? 'Insufficient pressure or flow rate' : 'فشار یا دبی ناکافی',
                                3: isEnglish ? 'Inappropriate fluid input' : 'ورودی سیال نامناسب',
                                4: isEnglish ? 'Filters are clogged' : 'فیلترها گرفته شده',
                                5: isEnglish ? 'Leakage' : 'نشتی',
                                6: isEnglish ? 'Foam/Air (Foaming)' : 'کف/هوا (Foaming)',
                                7: isEnglish ? 'High fluid temperature' : 'دمای سیال بالا',
                                8: isEnglish ? 'Corrosion or fouling' : 'خوردگی یا رسوب‌گذاری',
                                9: isEnglish ? 'Wrong viscosity' : 'ویسکوزیته اشتباه',
                                10: isEnglish ? 'Dissolved gas bubbles (Aeration)' : 'حباب گاز محلول (Aeration)',
                                11: isEnglish ? 'Pump damaged or worn' : 'پمپ خراب یا فرسوده',
                                12: isEnglish ? 'Pipes or hoses are clogged' : 'گرفتگی لوله‌ها یا شیلنگ‌ها',
                                13: isEnglish ? 'Inappropriate oil reservoir' : 'مخزن روغن نامناسب',
                                14: isEnglish ? 'Improper sealing' : 'آب‌بندی نامناسب',
                                15: isEnglish ? 'Insufficient lubrication (Starvation)' : 'روغن‌کاری ناقص (Starvation)',
                                16: isEnglish ? 'Hot oil carry over' : 'Hot oil carry over',
                                17: isEnglish ? 'Chemical reaction with seals' : 'واکنش شیمیایی با آب‌بندها',
                                18: isEnglish ? 'Polymerization' : 'پلیمریزاسیون',
                                19: isEnglish ? 'Lubricant evaporation' : 'تبخیر روانکار'
                            };
                            return `<li class="flag-warning">${problemNames[code] || code}</li>`;
                        }).join('')}
                    </ul>
                    ` : ''}
                    ${solutionData.solutions && solutionData.solutions.length > 0 ? `
                    <h4 style="color: #2E7D32; margin: 16px 0 8px;">✅ ${isEnglish ? 'Proposed Solutions:' : 'راه‌حل‌های پیشنهادی:'}</h4>
                    <table class="report-table">
                        <tbody>
                            ${solutionData.solutions.map((sol, i) => `
                                <tr>
                                    <td style="width: 5%;"><strong>${i + 1}</strong></td>
                                    <td style="width: 45%;"><strong>${sol.text}</strong></td>
                                    <td style="width: 50%;">${sol.desc}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                    ` : ''}
                ` : `
                <p style="color: #2E7D32;">✅ ${isEnglish ? 'System reported healthy. Preventive maintenance recommended.' : 'سیستم سالم گزارش شده است. برنامه نگهداری پیشگیرانه توصیه می‌شود.'}</p>
                `}
            </div>
            ` : ''}

            <!-- SECTION 5: Supply Equipment -->
            <div class="report-section">
                <h3>🔧 ${isEnglish ? 'Lubricant Supply Equipment (Question 3-7)' : 'تجهیزات تأمین روانکار (سوال ۳-۷)'}</h3>
                <p><strong>${isEnglish ? 'System:' : 'سیستم:'}</strong> ${systemNameDisplay || 'Unknown'}</p>
                <p><strong>${isEnglish ? 'Main Equipment:' : 'تجهیزات اصلی:'}</strong> ${getEquipmentText(systemData.recommendedSystem)}</p>
                ${systemData.recommendedSystem === 9 && greaseType ? `
                <p><strong>${isEnglish ? 'Grease Type:' : 'نوع گریس‌کاری:'}</strong> ${greaseType === '1' ? (isEnglish ? 'Manual (Grease nipple)' : 'دستی (Grease nipple)') : (isEnglish ? 'Centralized' : 'متمرکز (Centralized)')}</p>
                ` : ''}
                ${systemData.recommendedSystem === 5 && solidLubeMethod ? `
                <p><strong>${isEnglish ? 'Application Method:' : 'روش اعمال:'}</strong> ${getSolidLubeMethodName(solidLubeMethod, isEnglish)}</p>
                ` : ''}
            </div>

            <!-- SECTION 6: Health Checklist -->
            ${route !== '1' ? `
            <div class="report-section">
                <h3>📋 ${isEnglish ? 'System Health Checklist (Questions 3-8 to 3-12)' : 'چک‌لیست سلامت سیستم (سوال ۳-۸ تا ۳-۱۲)'}</h3>
                <table class="report-table">
                    <tbody>
                        <tr><td style="width: 40%;"><strong>${isEnglish ? 'Grooves and Inlets' : 'شیارها و ورودی‌ها'}</strong></td><td>${grooveStatus === '1' ? '✅ ' + (isEnglish ? 'Healthy' : 'سالم') : grooveStatus === '2' ? '🧹 ' + (isEnglish ? 'Needs Cleaning' : 'نیاز به تمیزکاری') : '—'}</td></tr>
                        ${filterStatus ? `<tr><td><strong>${isEnglish ? 'Filters' : 'فیلترها'}</strong></td><td>${filterStatusNames[filterStatus] || '—'}</td></tr>` : ''}
                        ${leakStatus ? `<tr><td><strong>${isEnglish ? 'Leakage' : 'نشتی'}</strong></td><td>${leakStatusNames[leakStatus] || '—'}</td></tr>` : ''}
                        ${foamStatus ? `<tr><td><strong>${isEnglish ? 'Foam/Air' : 'کف/هوا'}</strong></td><td>${foamStatusNames[foamStatus] || '—'}</td></tr>` : ''}
                        ${tempStatus ? `<tr><td><strong>${isEnglish ? 'Fluid Temperature' : 'دمای سیال'}</strong></td><td>${tempStatusNames[tempStatus] || '—'}</td></tr>` : ''}
                    </tbody>
                </table>
            </div>
            ` : ''}

            <!-- SECTION 7: Maintenance Schedule -->
            <div class="report-section">
                <h3>📅 ${isEnglish ? 'Maintenance Schedule (Question 3-13)' : 'برنامه نگهداری (سوال ۳-۱۳)'}</h3>
                ${maintenanceData.requiredItems && maintenanceData.requiredItems.length > 0 ? `
                    <p><strong>${maintenanceData.requiredItems.length} ${isEnglish ? 'Required Actions:' : 'اقدامات ضروری:'}</strong></p>
                    <ul style="padding-left: 20px;">
                        ${maintenanceData.allItems?.filter(i => i.required).map(i => `
                            <li style="margin-bottom: 8px;">
                                <strong>${i.title}</strong><br>
                                <small>${isEnglish ? 'Reason:' : 'دلیل:'} ${i.reason}</small><br>
                                <small>⏱️ ${isEnglish ? 'Interval:' : 'بازه:'} ${i.interval}</small>
                            </li>
                        `).join('') || ''}
                    </ul>
                ` : `<p>✅ ${isEnglish ? 'Minimum: Weekly visual inspection' : 'حداقل: بازرسی چشمی هفتگی'}</p>`}
            </div>

            <!-- SECTION 8: Flags -->
            ${renderFlagsSection(systemData.systemName, isEnglish)}

            <!-- SECTION 9: Parameters for Step 4 -->
            <div class="report-section" style="background: #E8F5E9;">
                <h3>📦 ${isEnglish ? 'Parameters Saved for Step 4' : 'پارامترهای ذخیره‌شده برای گام ۴'}</h3>
                <table class="report-table">
                    <tbody>
                        <tr><td style="width: 40%;"><strong>${isEnglish ? 'p_max — Contact Stress' : 'p_max — تنش تماسی'}</strong></td><td>${contactData.p_max_MPa?.toFixed(2) || '—'} MPa</td></tr>
                        <tr><td><strong>${isEnglish ? 'σ_y — Yield Stress' : 'σ_y — تنش تسلیم'}</strong></td><td>${contactData.sigma_y_MPa?.toFixed(2) || '—'} MPa</td></tr>
                        <tr><td><strong>${isEnglish ? 'U — Relative Speed' : 'U — سرعت نسبی'}</strong></td><td>${contactData.U_ms?.toFixed(3) || '—'} m/s</td></tr>
                        <tr><td><strong>${isEnglish ? 'F — Normal Load' : 'F — بار عمودی'}</strong></td><td>${contactData.F_N?.toFixed(0) || '—'} N</td></tr>
                        <tr><td><strong>${isEnglish ? 'T — Operating Temperature' : 'T — دمای کاری'}</strong></td><td>${contactData.T_C || '—'} °C</td></tr>
                        <tr><td><strong>${isEnglish ? 'Lubrication System' : 'سیستم روانکاری'}</strong></td><td><strong>${systemNameDisplay || 'Unknown'}</strong></td></tr>
                    </tbody>
                </table>
            </div>

            <!-- FOOTER -->
            <div style="text-align: center; margin-top: 32px; padding-top: 20px; border-top: 1px solid var(--border-light); color: var(--text-secondary); font-size: 0.85rem;">
                <p>Wear & Failure Analysis Expert System © 2026</p>
                <p style="margin-top: 4px;">${isEnglish ? 'Step 3 Report: Lubrication System' : 'گزارش گام ۳: سیستم روانکاری'} – ${dateStr}</p>
            </div>
        </div>

        <!-- ACTION BUTTONS -->
        <div class="report-action no-print" style="margin-top: 24px;">
            <button id="btn-back-step3" class="btn btn-secondary">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M9 18l6-6-6-6"/>
                </svg>
                ${isEnglish ? 'Back to Step 3' : 'بازگشت به گام ۳'}
            </button>
            <button id="btn-print-report3" class="btn btn-secondary">
                🖨️ ${isEnglish ? 'Print Report' : 'چاپ گزارش'}
            </button>
            <button id="btn-restart-analysis3" class="btn btn-secondary">
                ${isEnglish ? 'Restart' : 'شروع مجدد'}
            </button>
            <button id="btn-continue-step4" class="btn btn-primary btn-large">
                ${isEnglish ? 'Continue to Step 4' : 'ادامه به گام ۴'}
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M9 18l6-6-6-6"/>
                </svg>
            </button>
        </div>
    `;

    document.getElementById('btn-print-report3')?.addEventListener('click', () => {
        window.print();
    });

    document.getElementById('btn-restart-analysis3')?.addEventListener('click', () => {
        if (confirm(isEnglish ? 'Are you sure you want to restart? All progress will be lost.' : 'آیا مطمئن هستید که می‌خواهید از اول شروع کنید؟ تمام پیشرفت‌ها از بین خواهد رفت.')) {
            appState.resetAll(true);
            window.dispatchEvent(new CustomEvent('navigate', { detail: { question: '1-1' } }));
        }
    });

    document.getElementById('btn-continue-step4')?.addEventListener('click', () => {
        appState.setFlag('step3Completed', true);
        appState.currentStep = 4;
        window.dispatchEvent(new CustomEvent('stepComplete', { 
            detail: { step: 3, nextStep: 4 } 
        }));
    });

    document.getElementById('btn-back-step3')?.addEventListener('click', () => {
        window.dispatchEvent(new CustomEvent('navigate', { 
            detail: { question: '3-13' } 
        }));
    });

    function getSystemIcon(code) {
        const icons = { 1: '🌊', 2: '💉', 3: '⚡', 4: '🛡️', 5: '💎', 6: '🔀', 7: '💨', 8: '🎈', 9: '🧴', 10: '💧' };
        return icons[code] || '❓';
    }

    function getSystemDesc(code, isEnglish) {
        const descs = {
            1: isEnglish ? 'Full fluid film with self-generated pressure' : 'فیلم کامل سیال با فشار خود-تولید',
            2: isEnglish ? 'Fluid film with external pressure (pump)' : 'فیلم سیال با فشار خارجی (پمپ)',
            3: isEnglish ? 'Thin film with elastic deformation' : 'فیلم نازک با تغییر شکل الاستیک',
            4: isEnglish ? 'Thin molecular layer, direct contact' : 'لایه نازک مولکولی، تماس مستقیم',
            5: isEnglish ? 'Powder or solid coating (MoS₂, Graphite, PTFE)' : 'پودر یا پوشش جامد (MoS₂، گرافیت، PTFE)',
            6: isEnglish ? 'Combination of hydrostatic + hydrodynamic' : 'ترکیب هیدرواستاتیک + هیدرودینامیک',
            7: isEnglish ? 'Gas film with self-generated pressure' : 'فیلم گاز با فشار خود-تولید',
            8: isEnglish ? 'Air film with external pressure' : 'فیلم هوا با فشار خارجی',
            9: isEnglish ? 'Semi-solid lubricant, low maintenance' : 'روانکار نیمه‌جامد، نگهداری کم',
            10: isEnglish ? 'Water-oil mixture, excellent cooling' : 'مخلوط آب و روغن، خنک‌کاری عالی'
        };
        return descs[code] || '—';
    }

    function getSolidLubeMethodName(code, isEnglish) {
        const methods = {
            1: isEnglish ? 'Spraying' : 'اسپری (Spraying)',
            2: isEnglish ? 'Brushing' : 'براش (Brushing)',
            3: isEnglish ? 'Dip coating' : 'غوطه‌وری (Dip coating)',
            4: isEnglish ? 'Burnishing' : 'مالش (Burnishing)',
            5: isEnglish ? 'Sputtering' : 'اسپاتری‌نگ (Sputtering)',
            6: isEnglish ? 'Ion-plating' : 'یون-پلیتینگ (Ion-plating)'
        };
        return methods[code] || '—';
    }

    function renderFlagsSection(systemName, isEnglish) {
        const flags = [];
        if (appState.getFlag('AERATION_DETECTED')) flags.push({ key: isEnglish ? 'Aeration Detected' : 'Aeration تشخیص داده شد', type: 'warning' });
        if (appState.getFlag('OVERHEATING_CRITICAL')) flags.push({ key: isEnglish ? 'Critical Temperature' : 'دمای بحرانی', type: 'critical' });
        if (appState.getFlag('WEAR_SYNERGISM_DETECTED')) flags.push({ key: isEnglish ? 'Wear Synergism Detected' : 'تشدید سایش (Synergism)', type: 'critical' });
        if (appState.getFlag('LUBRICATION_SYSTEM')) {
            const sysName = systemName || (isEnglish ? 'Unknown' : 'نامشخص');
            flags.push({ key: `${isEnglish ? 'Lubrication System:' : 'سیستم روانکاری:'} ${sysName}`, type: 'info' });
        }
        if (flags.length === 0) return '';
        return `
            <div class="report-section">
                <h3>🚩 ${isEnglish ? 'Active Step 3 Flags' : 'پرچم‌های فعال گام ۳'}</h3>
                <ul class="report-flags-list">
                    ${flags.map(flag => `
                        <li class="${flag.type === 'critical' ? 'flag-critical' : flag.type === 'warning' ? 'flag-warning' : ''}">
                            ${flag.key}
                        </li>
                    `).join('')}
                </ul>
            </div>
        `;
    }
}