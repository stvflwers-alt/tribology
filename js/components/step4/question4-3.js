import appState from '../../state.js';
import router from '../../router.js';
import Calculations from '../../calculations.js';
export function renderQuestion4_3(container) {
    const t = (key, params = {}) => appState.t(key, params);
    const isEnglish = appState.language === 'en';
    const eta0 = appState.getAnswer('4-2-eta0');
    const alpha = appState.getAnswer('4-2-alpha');
    const rho0 = appState.getAnswer('4-2-rho0') || 850;
    const methodUsed = appState.getAnswer('4-2-method-used') || 'unknown';
    const contactData = appState.getAnswer('3-0') || {};
    const F = contactData.F_N || 1000;
    const U = contactData.U_ms || 1;
    const T_ambient = contactData.T_C || 25;
    const E_prime = (contactData.E_prime_GPa || 210) * 1e9;
    const isConformal = contactData.isConformal || false;
    const formulaType = contactData.formulaType || 'point';
    const geometryData = appState.getAnswer('2-geometry') || {};
    const geometryType = appState.getAnswer('2-5') || '4';
    const sigma_micron = appState.getAnswer('2-6-sigma') || 0.5;
    const sigma_m = sigma_micron * 1e-6;
    const regime = appState.getAnswer('3-2')?.recommendedSystem;
    let R1x, R1y, R2x, R2y;
    if (geometryType === '1') {
        const D_shaft = (geometryData.params?.D_shaft || 50) / 1000;
        const D_bush = (geometryData.params?.D_bush || 50.1) / 1000;
        R1x = D_shaft / 2;
        R1y = Infinity;
        R2x = -D_bush / 2;
        R2y = Infinity;
    } else if (geometryType === '3') {
        const R_ball = (geometryData.params?.R_ball || 10) / 1000;
        const R_inner = (geometryData.params?.R_inner || 25) / 1000;
        R1x = R_ball;
        R1y = R_ball;
        R2x = -R_inner;
        R2y = -R_inner;
    } else if (geometryType === '4') {
        const R_pinion = (geometryData.params?.R_pinion || 30) / 1000;
        const R_gear = (geometryData.params?.R_gear || 100) / 1000;
        R1x = R_pinion;
        R1y = Infinity;
        R2x = R_gear;
        R2y = Infinity;
    } else if (geometryType === '7') {
        R1x = (geometryData.params?.R1x || 50) / 1000;
        R1y = (geometryData.params?.R1y || Infinity) / 1000;
        R2x = (geometryData.params?.R2x || 50) / 1000;
        R2y = (geometryData.params?.R2y || Infinity) / 1000;
    } else {
        R1x = 0.025;
        R1y = Infinity;
        R2x = 0.025;
        R2y = Infinity;
    }
    const radii = Calculations.calculateEffectiveRadii({
        R1x: R1x * 1000, R1y: R1y !== Infinity ? R1y * 1000 : null,
        R2x: R2x * 1000, R2y: R2y !== Infinity ? R2y * 1000 : null
    });
    const Rx = radii.Rx_m;
    const Ry = radii.Ry_m;
    const R_prime = radii.R_prime_m;
    const k = Calculations.calculateEllipticityParameter(Rx, Ry);
    const isLineContact = k === Infinity;
    let L_contact;
    if (geometryType === '1') L_contact = (geometryData.params?.L_bearing || 50) / 1000;
    else if (geometryType === '4') L_contact = (geometryData.params?.width_gear || 20) / 1000;
    else if (geometryData.params?.L) L_contact = geometryData.params.L / 1000;
    else L_contact = 0.02;
    const dimParams = Calculations.calculateDimensionlessParams({
        eta0, U, E_prime, R_prime, alpha, F
    });
    const regimeResult = Calculations.detectLubricationRegime(
        dimParams.U_dim, dimParams.G, dimParams.W
    );
    // ترجمه regime name در صورت نیاز
    if (isEnglish && regimeResult.name) {
        const regimeNamesEn = {
            'ایزوویسکوز-صلب (Isoviscous-Rigid)': 'Isoviscous-Rigid',
            'پیزوویسکوز-صلب (Piezoviscous-Rigid)': 'Piezoviscous-Rigid',
            'ایزوویسکوز-الاستیک (Isoviscous-Elastic)': 'Isoviscous-Elastic',
            'پیزوویسکوز-الاستیک — EHL (Piezoviscous-Elastic)': 'Piezoviscous-Elastic — EHL',
            'نامشخص': 'Unknown'
        };
        regimeResult.name = regimeNamesEn[regimeResult.name] || regimeResult.name;
    }
    let h0_m;
    let formulaName;
    if (isLineContact) {
        h0_m = Calculations.calculateH0Grubin({
            R_prime, eta0, U, alpha, F, L: L_contact, E_prime
        });
        formulaName = isEnglish ? 'Grubin Formula — Line Contact' : 'فرمول گرابین (Grubin) — تماس خطی';
    } else {
        h0_m = Calculations.calculateH0HamrockDowson({
            R_prime, U_dim: dimParams.U_dim, G: dimParams.G, W: dimParams.W, k
        });
        formulaName = isEnglish ? 'Hamrock-Dowson Formula — Point/Elliptical Contact' : 'فرمول هامروک-دوسن (Hamrock-Dowson) — تماس نقطه‌ای/بیضوی';
    }
    let greaseNote = '';
    if (regime === 9 && appState.getAnswer('4-2-grease-method') === 'simple') {
        h0_m = h0_m * 0.6;
        greaseNote = isEnglish ? '⚠️ Simple grease analysis (Newtonian approximation) was used. Film thickness reduced by 40%.' : '⚠️ تحلیل ساده گریس (تقریب نیوتنی) استفاده شد. ضخامت فیلم ۴۰٪ کاهش یافت.';
    }
    const lambda = Calculations.calculateLambda(h0_m, sigma_m);
    let lambdaInterpretation = Calculations.interpretLambda(lambda);
    // ترجمه lambda interpretation در صورت نیاز
    if (isEnglish && lambdaInterpretation) {
        const descEn = {
            'مرزی (Boundary)': 'Boundary',
            'ناحیه ناراحتی سطحی': 'Surface Distress Zone',
            'مختلط (Mixed)': 'Mixed Lubrication',
            'فیلم کامل (Full EHL)': 'Full EHL',
            'فیلم کامل و مطمئن': 'Full Safe EHL',
            'نامشخص': 'Unknown'
        };
        const textEn = {
            'سایش شدید محتمل است. روانکار نمی‌تواند سطوح را جدا کند.': 'Significant solid contact — Severe wear likely',
            'احتمال پیتینگ و درخشش سطح وجود دارد.': 'Risk of pitting and surface shine',
            'درخشش سطح ممکن است — عملکرد معمولاً سالم.': 'Surface shine possible — Usually healthy performance',
            'جدایش کامل سطوح — سایش ناچیز.': 'Complete surface separation — Negligible wear',
            'عملکرد EHL کامل تضمین می‌شود.': 'Full EHL performance guaranteed',
            'داده‌ای برای تحلیل وجود ندارد': 'No data available for analysis'
        };
        lambdaInterpretation.description = descEn[lambdaInterpretation.description] || lambdaInterpretation.description;
        lambdaInterpretation.text = textEn[lambdaInterpretation.text] || lambdaInterpretation.text;
    }
    const filmData = {
        Rx_mm: radii.Rx_mm,
        Ry_mm: radii.Ry_mm,
        R_prime_mm: radii.R_prime_mm,
        k: k === Infinity ? (isEnglish ? '∞ (Line Contact)' : '∞ (تماس خطی)') : k.toFixed(3),
        isLineContact,
        U_dim: dimParams.U_dim,
        G: dimParams.G,
        W: dimParams.W,
        Gv: regimeResult.Gv,
        GE: regimeResult.GE,
        regimeCode: regimeResult.code,
        regimeName: regimeResult.name,
        h0_um: h0_m * 1e6,
        formulaName,
        sigma_um: sigma_micron,
        lambda,
        lambdaStatus: lambdaInterpretation.status,
        lambdaDesc: lambdaInterpretation.description,
        lambdaText: lambdaInterpretation.text,
        lambdaRisk: lambdaInterpretation.risk,
        greaseNote
    };
    appState.setAnswer('4-3-film-data', filmData);
    appState.setAnswer('4-3-lambda', lambda);
    appState.setAnswer('4-3-h0', h0_m);
    appState.setAnswer('4-3-regime', regimeResult.code);
    const riskColors = {
        'high': '#C62828',
        'medium': '#EF6C00',
        'low': '#FDD835',
        'minimal': '#2E7D32',
        'none': '#1565C0',
        'unknown': '#6C757D'
    };
    const riskBg = {
        'high': '#FFEBEE',
        'medium': '#FFF3E0',
        'low': '#FFFDE7',
        'minimal': '#E8F5E9',
        'none': '#E3F2FD',
        'unknown': '#F5F5F5'
    };
    const riskColor = riskColors[lambdaInterpretation.risk] || '#6C757D';
    const riskBackground = riskBg[lambdaInterpretation.risk] || '#F5F5F5';
    container.innerHTML = `
        <div class="question-card">
            <div class="question-header">
                <span class="question-number">${isEnglish ? 'Question 4-3' : '۴-۳'}</span>
                <span class="question-tag tag-auto">${isEnglish ? 'Auto Analysis' : 'تحلیل خودکار'}</span>
            </div>
            <h2 class="question-title">${isEnglish ? 'Lubricant Film Analysis and Contact Parameters' : 'تحلیل فیلم روانکار و پارامترهای تماس'}</h2>
            <p class="question-description">
                ${isEnglish ? 'Based on the calculated parameters, a complete lubricant film analysis has been performed.' : 'بر اساس پارامترهای محاسبه‌شده، تحلیل کامل فیلم روانکار انجام شده است.'}
            </p>
            <div class="result-panel">
                <h3>📐 ${isEnglish ? 'Geometric and Mechanical Parameters' : 'پارامترهای هندسی و مکانیکی'}</h3>
                <div class="result-grid">
                    <div class="result-item">
                        <span class="label">R' — ${isEnglish ? 'Equivalent Radius of Curvature' : 'شعاع انحنای معادل'}</span>
                        <span class="value">${radii.R_prime_mm ? radii.R_prime_mm.toFixed(2) + ' mm' : '∞'}</span>
                    </div>
                    <div class="result-item">
                        <span class="label">k — ${isEnglish ? 'Ellipticity Parameter' : 'پارامتر بیضوی'}</span>
                        <span class="value">${k === Infinity ? (isEnglish ? '∞ (Line Contact)' : '∞ (تماس خطی)') : k.toFixed(3)}</span>
                    </div>
                    <div class="result-item">
                        <span class="label">E' — ${isEnglish ? 'Equivalent Elastic Modulus' : 'مدول الاستیسیته معادل'}</span>
                        <span class="value">${(E_prime / 1e9).toFixed(1)} GPa</span>
                    </div>
                    <div class="result-item">
                        <span class="label">${isEnglish ? 'Contact Type' : 'نوع تماس'}</span>
                        <span class="value">${isLineContact ? (isEnglish ? 'Line' : 'خطی') : (isEnglish ? 'Point/Elliptical' : 'نقطه‌ای/بیضوی')}</span>
                    </div>
                </div>
            </div>
            <div class="result-panel">
                <h3>🔬 ${isEnglish ? 'Dimensionless Parameters and Lubrication Regime' : 'پارامترهای بی‌بعد و رژیم روانکاری'}</h3>
                <div class="result-grid">
                    <div class="result-item">
                        <span class="label">U<sub>dim</sub> — ${isEnglish ? 'Speed Parameter' : 'پارامتر سرعت'}</span>
                        <span class="value">${dimParams.U_dim ? dimParams.U_dim.toExponential(2) : '—'}</span>
                    </div>
                    <div class="result-item">
                        <span class="label">G — ${isEnglish ? 'Material Parameter' : 'پارامتر ماده'}</span>
                        <span class="value">${dimParams.G ? dimParams.G.toFixed(0) : '—'}</span>
                    </div>
                    <div class="result-item">
                        <span class="label">W — ${isEnglish ? 'Load Parameter' : 'پارامتر بار'}</span>
                        <span class="value">${dimParams.W ? dimParams.W.toExponential(2) : '—'}</span>
                    </div>
                    <div class="result-item highlight">
                        <span class="label">${isEnglish ? 'Lubrication Regime' : 'رژیم روانکاری'}</span>
                        <span class="value" style="font-size: 0.9rem;">${regimeResult.name || (isEnglish ? 'Unknown' : 'نامشخص')}</span>
                    </div>
                </div>
            </div>
            <div class="result-panel" style="border: 2px solid var(--blue-standard);">
                <h3>🛢️ ${isEnglish ? 'Film Thickness and λ Ratio' : 'ضخامت فیلم و نسبت λ'}</h3>
                <div class="result-grid">
                    <div class="result-item highlight">
                        <span class="label">h₀ — ${isEnglish ? 'Minimum Film Thickness' : 'حداقل ضخامت فیلم'}</span>
                        <span class="value">${(h0_m * 1e6).toFixed(3)} µm</span>
                    </div>
                    <div class="result-item">
                        <span class="label">σ — ${isEnglish ? 'Combined Roughness' : 'زبری ترکیبی'}</span>
                        <span class="value">${sigma_micron.toFixed(3)} µm</span>
                    </div>
                    <div class="result-item" style="background: ${riskBackground}; border-color: ${riskColor};">
                        <span class="label">λ = h₀ / σ</span>
                        <span class="value" style="color: ${riskColor}; font-size: 1.3rem;">${lambda ? lambda.toFixed(2) : '—'}</span>
                    </div>
                </div>
                <div style="margin-top: 16px; padding: 12px; background: ${riskBackground}; border-radius: var(--radius-sm); border-right: 4px solid ${riskColor};">
                    <strong style="color: ${riskColor};">${lambdaInterpretation.description || (isEnglish ? 'Unknown' : 'نامشخص')}</strong>
                    <p style="margin-top: 4px; font-size: 0.9rem; color: var(--text-primary);">${lambdaInterpretation.text || (isEnglish ? 'No data available for analysis' : 'داده‌ای برای تحلیل وجود ندارد')}</p>
                </div>
                ${greaseNote ? `<div class="alert alert-warning" style="margin-top: 12px;">${greaseNote}</div>` : ''}
            </div>
            <div class="formula-panel">
                <h4>📊 ${isEnglish ? 'λ Ratio Interpretation' : 'تفسیر نسبت λ'}</h4>
                <table class="report-table">
                    <thead>
                        <tr><th>λ ${isEnglish ? 'Range' : 'محدوده'}</th><th>${isEnglish ? 'Film Status' : 'وضعیت فیلم'}</th><th>${isEnglish ? 'Interpretation' : 'تفسیر'}</th></tr>
                    </thead>
                    <tbody>
                        <tr style="${lambda < 1 ? 'background: #FFEBEE; font-weight: 700;' : ''}">
                            <td>λ < 1</span></td>
                            <td>${isEnglish ? 'Boundary' : 'مرزی (Boundary)'}</span></td>
                            <td>${isEnglish ? 'Significant solid contact — Severe wear' : 'تماس جامد قابل توجه — سایش شدید'}</span></td>
                        </tr>
                        <tr style="${lambda >= 1 && lambda < 1.5 ? 'background: #FFF3E0; font-weight: 700;' : ''}">
                            <td>1 ≤ λ < 1.5</span></td>
                            <td>${isEnglish ? 'Surface Distress Zone' : 'ناحیه ناراحتی سطحی'}</span></td>
                            <td>${isEnglish ? 'Risk of pitting and surface shine' : 'احتمال پیتینگ و درخشش سطح'}</span></td>
                        </tr>
                        <tr style="${lambda >= 1.5 && lambda < 3 ? 'background: #FFFDE7; font-weight: 700;' : ''}">
                            <td>1.5 ≤ λ < 3</span></td>
                            <td>${isEnglish ? 'Mixed Lubrication' : 'مختلط (Mixed)'}</span></td>
                            <td>${isEnglish ? 'Surface shine possible — Usually healthy performance' : 'درخشش سطح ممکن است — عملکرد معمولاً سالم'}</span></td>
                        </tr>
                        <tr style="${lambda >= 3 && lambda < 4 ? 'background: #E8F5E9; font-weight: 700;' : ''}">
                            <td>3 ≤ λ < 4</span></td>
                            <td>${isEnglish ? 'Full EHL' : 'فیلم کامل (Full EHL)'}</span></td>
                            <td>${isEnglish ? 'Complete surface separation — Negligible wear' : 'جدایش کامل سطوح — سایش ناچیز'}</span></td>
                        </tr>
                        <tr style="${lambda >= 4 ? 'background: #E3F2FD; font-weight: 700;' : ''}">
                            <td>λ ≥ 4</span></td>
                            <td>${isEnglish ? 'Full Safe EHL' : 'فیلم کامل و مطمئن'}</span></td>
                            <td>${isEnglish ? 'Full EHL performance guaranteed' : 'عملکرد EHL کامل تضمین می‌شود'}</span></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="auto-detection-box">
                <div class="auto-detection-icon">📐</div>
                <div class="auto-detection-text">
                    <strong>${isEnglish ? 'Formula Used:' : 'فرمول استفاده‌شده:'}</strong>
                    <span>${formulaName}</span>
                </div>
            </div>
            <div style="margin-top: 20px; padding: 16px; background: #fff; border: 1px solid var(--border-light); border-radius: var(--radius-md);">
                <p style="font-weight: 600; margin-bottom: 12px;">${isEnglish ? 'Do you confirm this analysis?' : 'آیا این تحلیل را تأیید می‌کنید؟'}</p>
                <div style="display: flex; gap: 12px;">
                    <button id="btn-confirm" class="btn btn-primary" style="flex: 1;">
                        ✅ ${isEnglish ? 'Yes, I confirm' : 'بله، تأیید می‌کنم'}
                    </button>
                    <button id="btn-edit" class="btn btn-secondary" style="flex: 1;">
                        🔄 ${isEnglish ? 'No, I will correct it' : 'خیر، اصلاح می‌کنم'}
                    </button>
                </div>
            </div>
            <div class="action-bar">
                <button id="back-btn" class="btn btn-secondary">${isEnglish ? 'Back' : 'بازگشت'}</button>
            </div>
        </div>
    `;
    document.getElementById('back-btn').addEventListener('click', () => {
        const method = appState.getAnswer('4-2-method-used');
        if (method === 'estimated') {
            window.dispatchEvent(new CustomEvent('navigate', { detail: { question: '4-2-estimated' } }));
        } else if (method === 'precise') {
            window.dispatchEvent(new CustomEvent('navigate', { detail: { question: '4-2-precise' } }));
        } else {
            window.dispatchEvent(new CustomEvent('navigate', { detail: { question: '4-2' } }));
        }
    });
    document.getElementById('btn-confirm').addEventListener('click', () => {
        appState.currentQuestion = '4-3';
        const nextQuestion = router.getNextQuestion('4-3', null);
        window.dispatchEvent(new CustomEvent('navigate', { 
            detail: { question: nextQuestion || '4-4' } 
        }));
    });
    document.getElementById('btn-edit').addEventListener('click', () => {
        window.dispatchEvent(new CustomEvent('navigate', { 
            detail: { question: '4-2' } 
        }));
    });
}