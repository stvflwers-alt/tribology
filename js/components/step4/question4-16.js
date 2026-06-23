import appState from '../../state.js';
import router from '../../router.js';

export function renderQuestion4_16(container) {
    const t = (key, params = {}) => appState.t(key, params);
    const isEnglish = appState.language === 'en';
    const regime = appState.getAnswer('3-2')?.recommendedSystem;
    const isGas = [7, 8].includes(regime);

    if (isGas) {
        const P_supply = appState.getAnswer('4-9-P-supply') || 5;
        const T_contact = (appState.getAnswer('4-5-flash-data') || {}).T_contact || 25;
        const eta0 = appState.getAnswer('4-2-eta0') || 1.8e-5;
        const gasResults = appState.getAnswer('4-3-gas-results') || {};

        container.innerHTML = `
            <div class="question-card">
                <div class="question-header">
                    <span class="question-number">${isEnglish ? 'Question 4-16' : '۴-۱۶'}</span>
                    <span class="question-tag tag-auto">${isEnglish ? 'Condition Monitoring' : 'پایش وضعیت'}</span>
                </div>
                <h2 class="question-title">${isEnglish ? 'Gas Bearing Condition Monitoring' : 'پایش وضعیت یاتاقان گازی'}</h2>

                <div class="result-panel">
                    <h3>📊 ${isEnglish ? 'Automatic Parameters' : 'پارامترهای خودکار'}</h3>
                    <table class="report-table">
                        <thead>
                            <tr>
                                <th>${isEnglish ? 'Parameter' : 'پارامتر'}</th>
                                <th>${isEnglish ? 'Value' : 'مقدار'}</th>
                                <th>${isEnglish ? 'Warning Threshold' : 'آستانه هشدار'}</th>
                                <th>${isEnglish ? 'Status' : 'وضعیت'}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><strong>${isEnglish ? 'Supply Pressure' : 'فشار ورودی'}</strong></td>
                                <td>${P_supply.toFixed(1)} bar</td>
                                <td>${(P_supply * 0.8).toFixed(1)} - ${(P_supply * 1.2).toFixed(1)} bar</td>
                                <td style="color: ${P_supply >= P_supply * 0.8 && P_supply <= P_supply * 1.2 ? '#2E7D32' : '#EF6C00'};">
                                    ${P_supply >= P_supply * 0.8 && P_supply <= P_supply * 1.2 ? '✅ ' + (isEnglish ? 'Normal' : 'نرمال') : '⚠️ ' + (isEnglish ? 'Check' : 'بررسی کنید')}
                                </td>
                            </tr>
                            <tr>
                                <td><strong>${isEnglish ? 'Outlet Temperature' : 'دمای خروجی'}</strong></td>
                                <td>${T_contact.toFixed(1)} °C</td>
                                <td>< 80 °C</td>
                                <td style="color: ${T_contact < 80 ? '#2E7D32' : '#EF6C00'};">
                                    ${T_contact < 80 ? '✅ ' + (isEnglish ? 'Normal' : 'نرمال') : '⚠️ ' + (isEnglish ? 'High' : 'بالا')}
                                </td>
                            </tr>
                            <tr>
                                <td><strong>${isEnglish ? 'Gas Viscosity' : 'ویسکوزیته گاز'}</strong></td>
                                <td>${eta0.toExponential(2)} Pa·s</td>
                                <td>±15% ${isEnglish ? 'of initial' : 'اولیه'}</td>
                                <td style="color: #2E7D32;">✅ ${isEnglish ? 'Normal' : 'نرمال'}</td>
                            </tr>
                            ${gasResults.Lambda ? `
                            <tr>
                                <td><strong>Λ — ${isEnglish ? 'Bearing Number' : 'عدد یاتاقان'}</strong></td>
                                <td>${gasResults.Lambda.toFixed(3)}</td>
                                <td>> 0.5</td>
                                <td style="color: ${gasResults.Lambda > 0.5 ? '#2E7D32' : '#EF6C00'};">
                                    ${gasResults.Lambda > 0.5 ? '✅' : '⚠️'} ${gasResults.Lambda > 0.5 ? (isEnglish ? 'Stable' : 'پایدار') : (isEnglish ? 'Unstable' : 'ناپایدار')}
                                </td>
                            </tr>
                            ` : ''}
                            ${gasResults.liftMargin ? `
                            <tr>
                                <td><strong>${isEnglish ? 'Lift-off Margin' : 'حاشیه بلند شدن'}</strong></td>
                                <td>${gasResults.liftMargin.toFixed(2)}</td>
                                <td>> 1.5</td>
                                <td style="color: ${gasResults.liftMargin > 1.5 ? '#2E7D32' : '#EF6C00'};">
                                    ${gasResults.liftMargin > 1.5 ? '✅' : '⚠️'} ${gasResults.liftMargin > 1.5 ? (isEnglish ? 'Safe' : 'ایمن') : (isEnglish ? 'Check' : 'بررسی کنید')}
                                </td>
                            </tr>
                            ` : ''}
                            ${gasResults.h0 ? `
                            <tr>
                                <td><strong>h₀ — ${isEnglish ? 'Film Thickness' : 'ضخامت فیلم'}</strong></td>
                                <td>${gasResults.h0.toFixed(2)} µm</td>
                                <td>> 5 µm</td>
                                <td style="color: ${gasResults.h0 > 5 ? '#2E7D32' : '#EF6C00'};">
                                    ${gasResults.h0 > 5 ? '✅' : '⚠️'} ${gasResults.h0 > 5 ? (isEnglish ? 'Adequate' : 'کافی') : (isEnglish ? 'Thin' : 'نازک')}
                                </td>
                            </tr>
                            ` : ''}
                        </tbody>
                    </table>
                </div>

                <div class="formula-panel" style="margin-top: 20px;">
                    <h4>💨 ${isEnglish ? 'Gas Quality Monitoring' : 'پایش کیفیت گاز'}</h4>
                    <p style="color: var(--text-secondary); margin-bottom: 16px;">
                        ${isEnglish ? 
                            'For gas bearings, the following parameters should be monitored regularly:' :
                            'برای یاتاقان‌های گازی، پارامترهای زیر باید به طور منظم پایش شوند:'}
                    </p>
                    <table class="report-table">
                        <thead>
                            <tr>
                                <th>${isEnglish ? 'Parameter' : 'پارامتر'}</th>
                                <th>${isEnglish ? 'Recommended Value' : 'مقدار توصیه‌شده'}</th>
                                <th>${isEnglish ? 'Action' : 'اقدام'}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>${isEnglish ? 'Dew Point' : 'نقطه شبنم'}</td>
                                <td>< -40 °C</td>
                                <td>${isEnglish ? 'Check dryer' : 'بررسی خشک‌کن'}</td>
                            </tr>
                            <tr>
                                <td>${isEnglish ? 'Particle Content' : 'میزان ذرات'}</td>
                                <td>< 0.1 µm</td>
                                <td>${isEnglish ? 'Check filters' : 'بررسی فیلترها'}</td>
                            </tr>
                            <tr>
                                <td>${isEnglish ? 'Oil Content' : 'میزان روغن'}</td>
                                <td>< 0.01 ppm</td>
                                <td>${isEnglish ? 'Check compressor oil carry-over' : 'بررسی نشتی روغن کمپرسور'}</td>
                            </tr>
                            <tr>
                                <td>${isEnglish ? 'Pressure Fluctuation' : 'نوسان فشار'}</td>
                                <td>< ±5%</td>
                                <td>${isEnglish ? 'Check supply system' : 'بررسی سیستم تأمین'}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="alert alert-info" style="margin-top: 16px;">
                    ℹ️ ${isEnglish ? 
                        'Oil analysis is not applicable for gas lubricants. Focus on gas quality and supply system monitoring.' :
                        'آنالیز روغن برای روانکارهای گازی کاربرد ندارد. بر کیفیت گاز و سیستم تأمین متمرکز شوید.'}
                </div>

                <div class="action-bar">
                    <button id="back-btn" class="btn btn-secondary">${isEnglish ? 'Back' : 'بازگشت'}</button>
                    <button id="next-btn" class="btn btn-primary">${isEnglish ? 'Continue' : 'ادامه'}</button>
                </div>
            </div>
        `;

        document.getElementById('back-btn')?.addEventListener('click', () => {
            window.dispatchEvent(new CustomEvent('navigate', { detail: { question: '4-15' } }));
        });

        document.getElementById('next-btn')?.addEventListener('click', () => {
            appState.currentQuestion = '4-16';
            window.dispatchEvent(new CustomEvent('navigate', { detail: { question: '4-17' } }));
        });

        return;
    }

    const P_supply = appState.getAnswer('4-9-P-supply') || 2;
    const T_contact = (appState.getAnswer('4-5-flash-data') || {}).T_contact || 25;
    const eta0 = appState.getAnswer('4-2-eta0') || 0.05;

    const thresholds = {
        pressure: { warning: P_supply * 0.8, critical: P_supply * 0.6, max: P_supply * 1.2 },
        temperature: { warning: 80, critical: 100 },
        viscosity: { warning: eta0 * 0.85, critical: eta0 * 0.7, maxWarning: eta0 * 1.15, maxCritical: eta0 * 1.3 },
        fe: { warning: 100, critical: 200 },
        cu: { warning: 50, critical: 100 },
        si: { warning: 20, critical: 50 },
        moisture: { warning: 500, critical: 1000 },
        tan: { warning: 2, critical: 4 },
        tbn: { warning: 50, critical: 30 },
        filter_dp: { warning: 1, critical: 2 }
    };

    container.innerHTML = `
        <div class="question-card">
            <div class="question-header">
                <span class="question-number">${isEnglish ? 'Question 4-16' : '۴-۱۶'}</span>
                <span class="question-tag tag-standard">${isEnglish ? 'Condition Monitoring' : 'پایش وضعیت'}</span>
            </div>
            <h2 class="question-title">${isEnglish ? 'Condition Monitoring Parameters' : 'پارامترهای پایش وضعیت'}</h2>
            <div class="result-panel">
                <h3>📊 ${isEnglish ? 'Automatic Parameters' : 'پارامترهای خودکار'}</h3>
                <table class="report-table">
                    <thead>
                        <tr>
                            <th>${isEnglish ? 'Parameter' : 'پارامتر'}</th>
                            <th>${isEnglish ? 'Value' : 'مقدار'}</th>
                            <th>${isEnglish ? 'Warning Threshold' : 'آستانه هشدار'}</th>
                            <th>${isEnglish ? 'Status' : 'وضعیت'}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr id="pressure-row">
                            <td><strong>${isEnglish ? 'Inlet Pressure' : 'فشار ورودی'}</strong></td>
                            <td>${P_supply.toFixed(1)} bar</td>
                            <td>${thresholds.pressure.warning.toFixed(1)} - ${thresholds.pressure.max.toFixed(1)} bar</td>
                            <td id="pressure-status">—</td>
                        </tr>
                        <tr id="temp-row">
                            <td><strong>${isEnglish ? 'Outlet Temperature' : 'دمای خروجی'}</strong></td>
                            <td>${T_contact.toFixed(1)} °C</td>
                            <td>&lt; ${thresholds.temperature.warning} °C</td>
                            <td id="temp-status">—</td>
                        </tr>
                        <tr id="viscosity-row">
                            <td><strong>${isEnglish ? 'Viscosity' : 'ویسکوزیته'}</strong></td>
                            <td>${eta0.toExponential(2)} Pa·s</td>
                            <td>±15% ${isEnglish ? 'of initial' : 'اولیه'}</td>
                            <td id="viscosity-status">—</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="formula-panel" style="margin-top: 20px;">
                <h4>🧪 ${isEnglish ? 'Oil Analysis Parameters' : 'پارامترهای آنالیز روغن'}</h4>
                <p style="color: var(--text-secondary); margin-bottom: 16px;">
                    ${isEnglish ? 'Please enter the latest oil analysis results (leave empty if not available):' : 'لطفاً نتایج آخرین آنالیز روغن را وارد کنید (اگر در دسترس نیست، خالی بگذارید):'}
                </p>
                <div class="numeric-inputs-container">
                    <div class="input-group">
                        <label><span class="input-label">${isEnglish ? 'Fe Particles' : 'ذرات Fe'}</span><span class="input-unit">ppm</span></label>
                        <input type="number" id="fe" class="numeric-input" placeholder="${isEnglish ? 'Warning threshold: 100' : 'آستانه هشدار: 100'}" step="any" min="0">
                    </div>
                    <div class="input-group">
                        <label><span class="input-label">${isEnglish ? 'Cu Particles' : 'ذرات Cu'}</span><span class="input-unit">ppm</span></label>
                        <input type="number" id="cu" class="numeric-input" placeholder="${isEnglish ? 'Warning threshold: 50' : 'آستانه هشدار: 50'}" step="any" min="0">
                    </div>
                    <div class="input-group">
                        <label><span class="input-label">${isEnglish ? 'Si Particles' : 'ذرات Si'}</span><span class="input-unit">ppm</span></label>
                        <input type="number" id="si" class="numeric-input" placeholder="${isEnglish ? 'Warning threshold: 20' : 'آستانه هشدار: 20'}" step="any" min="0">
                    </div>
                    <div class="input-group">
                        <label><span class="input-label">${isEnglish ? 'Moisture' : 'رطوبت'}</span><span class="input-unit">ppm</span></label>
                        <input type="number" id="moisture" class="numeric-input" placeholder="${isEnglish ? 'Warning threshold: 500' : 'آستانه هشدار: 500'}" step="any" min="0">
                    </div>
                    <div class="input-group">
                        <label><span class="input-label">TAN</span><span class="input-unit">mgKOH/g</span></label>
                        <input type="number" id="tan" class="numeric-input" placeholder="${isEnglish ? 'Change from initial' : 'تغییر از اولیه'}" step="any" min="0">
                    </div>
                    <div class="input-group">
                        <label><span class="input-label">TBN</span><span class="input-unit">mgKOH/g</span></label>
                        <input type="number" id="tbn" class="numeric-input" placeholder="${isEnglish ? 'Percentage of initial' : 'درصد از اولیه'}" step="any" min="0">
                    </div>
                    <div class="input-group">
                        <label><span class="input-label">${isEnglish ? 'Filter Differential Pressure' : 'فشار تفاضلی فیلتر'}</span><span class="input-unit">bar</span></label>
                        <input type="number" id="filter-dp" class="numeric-input" placeholder="${isEnglish ? 'Warning threshold: 1' : 'آستانه هشدار: 1'}" step="any" min="0">
                    </div>
                    <div class="input-group">
                        <label><span class="input-label">ISO 4406 ${isEnglish ? 'Cleanliness Code' : 'کد تمیزی'}</span><span class="input-unit">—</span></label>
                        <input type="text" id="iso-code" class="numeric-input" placeholder="${isEnglish ? 'Example: 20/18/15' : 'مثال: 20/18/15'}">
                    </div>
                </div>
                <button id="analyze-btn" class="btn btn-primary" style="margin-top: 16px;">${isEnglish ? 'Analyze Results' : 'تحلیل نتایج'}</button>
                <div id="analysis-result" style="margin-top: 16px;"></div>
            </div>
            <div class="action-bar">
                <button id="back-btn" class="btn btn-secondary">${isEnglish ? 'Back' : 'بازگشت'}</button>
                <button id="next-btn" class="btn btn-primary">${isEnglish ? 'Continue' : 'ادامه'}</button>
            </div>
        </div>
    `;

    function updateAutoParamsStatus() {
        const pressureStatus = document.getElementById('pressure-status');
        if (P_supply < thresholds.pressure.warning) {
            pressureStatus.innerHTML = isEnglish ? '⚠️ Low Pressure' : '⚠️ فشار پایین';
            pressureStatus.style.color = '#EF6C00';
            document.getElementById('pressure-row').style.background = '#FFF3E0';
        } else if (P_supply > thresholds.pressure.max) {
            pressureStatus.innerHTML = isEnglish ? '⚠️ High Pressure' : '⚠️ فشار بالا';
            pressureStatus.style.color = '#EF6C00';
            document.getElementById('pressure-row').style.background = '#FFF3E0';
        } else {
            pressureStatus.innerHTML = isEnglish ? '✅ Normal' : '✅ نرمال';
            pressureStatus.style.color = '#2E7D32';
            document.getElementById('pressure-row').style.background = '';
        }

        const tempStatus = document.getElementById('temp-status');
        if (T_contact >= thresholds.temperature.critical) {
            tempStatus.innerHTML = isEnglish ? '🔴 Critical' : '🔴 بحرانی';
            tempStatus.style.color = '#C62828';
            document.getElementById('temp-row').style.background = '#FFEBEE';
        } else if (T_contact >= thresholds.temperature.warning) {
            tempStatus.innerHTML = isEnglish ? '⚠️ Warning' : '⚠️ هشدار';
            tempStatus.style.color = '#EF6C00';
            document.getElementById('temp-row').style.background = '#FFF3E0';
        } else {
            tempStatus.innerHTML = isEnglish ? '✅ Normal' : '✅ نرمال';
            tempStatus.style.color = '#2E7D32';
            document.getElementById('temp-row').style.background = '';
        }

        const viscosityStatus = document.getElementById('viscosity-status');
        if (eta0 < thresholds.viscosity.critical || eta0 > thresholds.viscosity.maxCritical) {
            viscosityStatus.innerHTML = isEnglish ? '🔴 Critical' : '🔴 بحرانی';
            viscosityStatus.style.color = '#C62828';
            document.getElementById('viscosity-row').style.background = '#FFEBEE';
        } else if (eta0 < thresholds.viscosity.warning || eta0 > thresholds.viscosity.maxWarning) {
            viscosityStatus.innerHTML = isEnglish ? '⚠️ Warning' : '⚠️ هشدار';
            viscosityStatus.style.color = '#EF6C00';
            document.getElementById('viscosity-row').style.background = '#FFF3E0';
        } else {
            viscosityStatus.innerHTML = isEnglish ? '✅ Normal' : '✅ نرمال';
            viscosityStatus.style.color = '#2E7D32';
            document.getElementById('viscosity-row').style.background = '';
        }
    }

    updateAutoParamsStatus();

    document.getElementById('analyze-btn').addEventListener('click', () => {
        const fe = parseFloat(document.getElementById('fe')?.value) || 0;
        const cu = parseFloat(document.getElementById('cu')?.value) || 0;
        const si = parseFloat(document.getElementById('si')?.value) || 0;
        const moisture = parseFloat(document.getElementById('moisture')?.value) || 0;
        const tan = parseFloat(document.getElementById('tan')?.value) || 0;
        const tbn = parseFloat(document.getElementById('tbn')?.value) || 0;
        const filterDp = parseFloat(document.getElementById('filter-dp')?.value) || 0;
        const isoCode = document.getElementById('iso-code')?.value || '';

        appState.setAnswer('4-16-fe', fe);
        appState.setAnswer('4-16-cu', cu);
        appState.setAnswer('4-16-si', si);
        appState.setAnswer('4-16-moisture', moisture);
        appState.setAnswer('4-16-tan', tan);
        appState.setAnswer('4-16-tbn', tbn);
        appState.setAnswer('4-16-filter-dp', filterDp);
        appState.setAnswer('4-16-iso-code', isoCode);

        const results = [];

        if (fe > thresholds.fe.critical) {
            results.push({ param: 'Fe', value: fe, threshold: thresholds.fe.critical, status: isEnglish ? '🔴 Critical' : '🔴 بحرانی', recommendation: isEnglish ? 'Immediate oil change and check particle source' : 'تعویض فوری روغن و بررسی منبع ذرات' });
        } else if (fe > thresholds.fe.warning) {
            results.push({ param: 'Fe', value: fe, threshold: thresholds.fe.warning, status: isEnglish ? '⚠️ Warning' : '⚠️ هشدار', recommendation: isEnglish ? 'Check particle source, replace filters' : 'بررسی منبع ذرات، تعویض فیلترها' });
        } else if (fe > 0) {
            results.push({ param: 'Fe', value: fe, threshold: thresholds.fe.warning, status: isEnglish ? '✅ Normal' : '✅ نرمال', recommendation: '' });
        }

        if (cu > thresholds.cu.critical) {
            results.push({ param: 'Cu', value: cu, threshold: thresholds.cu.critical, status: isEnglish ? '🔴 Critical' : '🔴 بحرانی', recommendation: isEnglish ? 'Check bearings, possible corrosion' : 'بررسی یاتاقان‌ها، احتمال خوردگی' });
        } else if (cu > thresholds.cu.warning) {
            results.push({ param: 'Cu', value: cu, threshold: thresholds.cu.warning, status: isEnglish ? '⚠️ Warning' : '⚠️ هشدار', recommendation: isEnglish ? 'Check copper source in system' : 'بررسی منبع مس در سیستم' });
        } else if (cu > 0) {
            results.push({ param: 'Cu', value: cu, threshold: thresholds.cu.warning, status: isEnglish ? '✅ Normal' : '✅ نرمال', recommendation: '' });
        }

        if (si > thresholds.si.critical) {
            results.push({ param: 'Si', value: si, threshold: thresholds.si.critical, status: isEnglish ? '🔴 Critical' : '🔴 بحرانی', recommendation: isEnglish ? 'Severe soil/silica contamination — Change oil and check filters' : 'آلودگی شدید خاک/سیلیس — تعویض روغن و بررسی فیلترها' });
        } else if (si > thresholds.si.warning) {
            results.push({ param: 'Si', value: si, threshold: thresholds.si.warning, status: isEnglish ? '⚠️ Warning' : '⚠️ هشدار', recommendation: isEnglish ? 'Possible dust ingress — Check seals' : 'احتمال ورود گرد و غبار — بررسی آب‌بندها' });
        } else if (si > 0) {
            results.push({ param: 'Si', value: si, threshold: thresholds.si.warning, status: isEnglish ? '✅ Normal' : '✅ نرمال', recommendation: '' });
        }

        if (moisture > thresholds.moisture.critical) {
            results.push({ param: isEnglish ? 'Moisture' : 'رطوبت', value: moisture, threshold: thresholds.moisture.critical, status: isEnglish ? '🔴 Critical' : '🔴 بحرانی', recommendation: isEnglish ? 'Water ingress — Check seals and change oil' : 'ورود آب به سیستم — بررسی آب‌بندها و تعویض روغن' });
        } else if (moisture > thresholds.moisture.warning) {
            results.push({ param: isEnglish ? 'Moisture' : 'رطوبت', value: moisture, threshold: thresholds.moisture.warning, status: isEnglish ? '⚠️ Warning' : '⚠️ هشدار', recommendation: isEnglish ? 'Possible water leak — Check cooling system' : 'نشتی آب محتمل — بررسی سیستم خنک‌کاری' });
        } else if (moisture > 0) {
            results.push({ param: isEnglish ? 'Moisture' : 'رطوبت', value: moisture, threshold: thresholds.moisture.warning, status: isEnglish ? '✅ Normal' : '✅ نرمال', recommendation: '' });
        }

        if (tan > thresholds.tan.critical) {
            results.push({ param: 'TAN', value: tan, threshold: thresholds.tan.critical, status: isEnglish ? '🔴 Critical' : '🔴 بحرانی', recommendation: isEnglish ? 'Severe oxidation — Immediate oil change' : 'اکسیداسیون شدید — تعویض فوری روغن' });
        } else if (tan > thresholds.tan.warning) {
            results.push({ param: 'TAN', value: tan, threshold: thresholds.tan.warning, status: isEnglish ? '⚠️ Warning' : '⚠️ هشدار', recommendation: isEnglish ? 'Oxidation starting — Shorten oil change interval' : 'شروع اکسیداسیون — برنامه تعویض روغن را کوتاه‌تر کنید' });
        } else if (tan > 0) {
            results.push({ param: 'TAN', value: tan, threshold: thresholds.tan.warning, status: isEnglish ? '✅ Normal' : '✅ نرمال', recommendation: '' });
        }

        if (tbn < thresholds.tbn.critical && tbn > 0) {
            results.push({ param: 'TBN', value: tbn + '%', threshold: thresholds.tbn.critical + '%', status: isEnglish ? '🔴 Critical' : '🔴 بحرانی', recommendation: isEnglish ? 'Neutralization depleted — Immediate oil change' : 'خنثی‌کنندگی تمام شده — تعویض فوری روغن' });
        } else if (tbn < thresholds.tbn.warning && tbn > 0) {
            results.push({ param: 'TBN', value: tbn + '%', threshold: thresholds.tbn.warning + '%', status: isEnglish ? '⚠️ Warning' : '⚠️ هشدار', recommendation: isEnglish ? 'TBN decreasing — Shorten oil change interval' : 'کاهش TBN — برنامه تعویض روغن را کوتاه‌تر کنید' });
        } else if (tbn > 0) {
            results.push({ param: 'TBN', value: tbn + '%', threshold: thresholds.tbn.warning + '%', status: isEnglish ? '✅ Normal' : '✅ نرمال', recommendation: '' });
        }

        if (filterDp > thresholds.filter_dp.critical) {
            results.push({ param: isEnglish ? 'Filter Differential Pressure' : 'فشار تفاضلی فیلتر', value: filterDp, threshold: thresholds.filter_dp.critical, status: isEnglish ? '🔴 Critical' : '🔴 بحرانی', recommendation: isEnglish ? 'Immediate filter replacement — Bypass open' : 'تعویض فوری فیلتر — بای‌پس باز شده' });
        } else if (filterDp > thresholds.filter_dp.warning) {
            results.push({ param: isEnglish ? 'Filter Differential Pressure' : 'فشار تفاضلی فیلتر', value: filterDp, threshold: thresholds.filter_dp.warning, status: isEnglish ? '⚠️ Warning' : '⚠️ هشدار', recommendation: isEnglish ? 'Filter clogging — Review replacement schedule' : 'فیلتر در حال گرفتگی — برنامه تعویض را بررسی کنید' });
        } else if (filterDp > 0) {
            results.push({ param: isEnglish ? 'Filter Differential Pressure' : 'فشار تفاضلی فیلتر', value: filterDp, threshold: thresholds.filter_dp.warning, status: isEnglish ? '✅ Normal' : '✅ نرمال', recommendation: '' });
        }

        if (isoCode) {
            results.push({ param: 'ISO 4406', value: isoCode, threshold: '20/18/15', status: isEnglish ? 'ℹ️ Recorded' : 'ℹ️ ثبت شد', recommendation: isEnglish ? 'Compare with standard thresholds' : 'مقایسه با آستانه‌های استاندارد' });
        }

        appState.setAnswer('4-16-oil-analysis-results', results);

        const resultDiv = document.getElementById('analysis-result');

        if (results.length === 0) {
            resultDiv.innerHTML = `
                <div class="alert alert-info">
                    ${isEnglish ? 'No data entered. Please enter values for oil analysis.' : 'هیچ داده‌ای وارد نشده است. برای تحلیل آنالیز روغن، مقادیر را وارد کنید.'}
                </div>
            `;
        } else {
            resultDiv.innerHTML = `
                <div class="result-panel" style="margin-top: 0;">
                    <h4>📊 ${isEnglish ? 'Oil Analysis Results' : 'نتایج تحلیل آنالیز روغن'}</h4>
                    <table class="report-table">
                        <thead>
                            <tr>
                                <th>${isEnglish ? 'Parameter' : 'پارامتر'}</th>
                                <th>${isEnglish ? 'Value' : 'مقدار'}</th>
                                <th>${isEnglish ? 'Threshold' : 'آستانه هشدار'}</th>
                                <th>${isEnglish ? 'Status' : 'وضعیت'}</th>
                                <th>${isEnglish ? 'Recommendation' : 'توصیه'}</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${results.map(r => `
                                <tr style="${r.status.includes('Critical') || r.status.includes('بحرانی') ? 'background: #FFEBEE;' : (r.status.includes('Warning') || r.status.includes('هشدار')) ? 'background: #FFF3E0;' : ''}">
                                    <td><strong>${r.param}</strong></td>
                                    <td>${r.value}</td>
                                    <td>${r.threshold}</td>
                                    <td style="font-weight: 600;">${r.status}</td>
                                    <td>${r.recommendation || '—'}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            `;
        }
    });

    document.getElementById('back-btn').addEventListener('click', () => {
        window.dispatchEvent(new CustomEvent('navigate', {
            detail: { question: '4-15' }
        }));
    });

    document.getElementById('next-btn').addEventListener('click', () => {
        appState.currentQuestion = '4-16';
        window.dispatchEvent(new CustomEvent('navigate', {
            detail: { question: '4-17' }
        }));
    });
}