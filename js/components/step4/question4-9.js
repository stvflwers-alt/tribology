import appState from '../../state.js';
import router from '../../router.js';
import Calculations from '../../calculations.js';
export function renderQuestion4_9(container) {
    const t = (key, params = {}) => appState.t(key, params);
    const isEnglish = appState.language === 'en';
    const regime = appState.getAnswer('3-2')?.recommendedSystem;
    const systemName = appState.getAnswer('3-2')?.systemName || (isEnglish ? 'Unknown' : 'نامشخص');
    const eta0 = appState.getAnswer('4-2-eta0') || 0.05;
    const h0_m = appState.getAnswer('4-3-h0') || 1e-6;
    const geometryData = appState.getAnswer('2-geometry') || {};
    const D_shaft = geometryData.params?.D_shaft || 50;
    const L_bearing = geometryData.params?.L_bearing || 50;
    const clearance = geometryData.params?.c || 0.05;
    const U = (appState.getAnswer('3-0') || {}).U_ms || 1;
    const L_over_D = L_bearing / D_shaft;
    let calcType, calcTypeColor, calcTypeText;
    if (regime === 1) {
        if (L_over_D < 0.3 || L_over_D > 3) {
            calcType = 'formula';
            calcTypeColor = '#2E7D32';
            calcTypeText = isEnglish ? '🟢 Analytical Formula' : '🟢 فرمول تحلیلی';
        } else {
            calcType = 'chart';
            calcTypeColor = '#FDD835';
            calcTypeText = isEnglish ? '🟡 Raimondi-Boyd Chart' : '🟡 نمودار Raimondi-Boyd';
        }
    } else if (regime === 2) {
        calcType = 'hydrostatic';
        calcTypeColor = '#2E7D32';
        calcTypeText = isEnglish ? '🟢 Hydrostatic Formula' : '🟢 فرمول هیدرواستاتیک';
    } else if (regime === 8) {
        calcType = 'aerostatic';
        calcTypeColor = '#2E7D32';
        calcTypeText = isEnglish ? '🟢 Aerostatic Formula' : '🟢 فرمول ایرواستاتیک';
    } else if (regime === 6) {
        calcType = 'numerical';
        calcTypeColor = '#C62828';
        calcTypeText = isEnglish ? '🔴 Numerical Analysis' : '🔴 تحلیل عددی';
    } else if ([9, 10].includes(regime)) {
        calcType = 'empirical';
        calcTypeColor = '#2E7D32';
        calcTypeText = isEnglish ? '🟢 Empirical Estimate' : '🟢 تخمین تجربی';
    } else {
        calcType = 'formula';
        calcTypeColor = '#2E7D32';
        calcTypeText = isEnglish ? '🟢 Analytical Formula' : '🟢 فرمول تحلیلی';
    }
    const deflectionNeeded = appState.getFlag('DEFLECTION_NEEDED');
    if (deflectionNeeded) {
        calcType = 'numerical';
        calcTypeColor = '#C62828';
        calcTypeText = isEnglish ? '🔴 Requires DEFLECTION Program' : '🔴 نیاز به برنامه DEFLECTION';
    }
    let Q_m3s = null;
    let P_supply_bar = null;
    let formulaUsed = '';
    if (calcType === 'formula' && regime === 1) {
        const epsilon = 0.5;
        Q_m3s = U * (clearance / 1000) * (L_bearing / 1000) * epsilon;
        P_supply_bar = 2;
    } else if (calcType === 'hydrostatic') {
        appState.setFlag('HYDROSTATIC_PARAMS_NEEDED', true);
        const R = (D_shaft / 2) * 0.8;
        const R0 = R * 0.5;
        const p_r = 10e6;
        Q_m3s = Calculations.calculateHydrostaticFlow(h0_m, p_r, eta0, R / 1000, R0 / 1000);
        P_supply_bar = p_r / 1e5 * 1.2;
    } else if (calcType === 'aerostatic') {
        Q_m3s = h0_m * 1e6 * 0.1 * 1e-3 / 60;
        P_supply_bar = 5;
    }
    const Q_Lmin = Q_m3s ? Q_m3s * 1000 * 60 : null;
    const tankVolume = Q_Lmin ? Q_Lmin * 4 : 50;
    appState.setAnswer('4-9-calc-type', calcType);
    appState.setAnswer('4-9-Q', Q_m3s);
    appState.setAnswer('4-9-P-supply', P_supply_bar);
    appState.setAnswer('4-9-tank-volume', tankVolume);
    container.innerHTML = `
        <div class="question-card">
            <div class="question-header">
                <span class="question-number">${isEnglish ? 'Question 4-9' : '۴-۹'}</span>
                <span class="question-tag tag-auto">${isEnglish ? 'Supply System' : 'سیستم تأمین'}</span>
            </div>
            <h2 class="question-title">${isEnglish ? 'Lubricant Supply System Pressure and Flow Calculation' : 'محاسبه فشار و دبی سیستم تأمین روانکار'}</h2>
            <p class="question-description">
                ${isEnglish ? 'Lubrication Regime:' : 'رژیم روانکاری:'} <strong>${systemName}</strong> | L/D: <strong>${L_over_D.toFixed(2)}</strong>
            </p>
            <div class="result-panel">
                <h3>📊 ${isEnglish ? 'Calculation Type' : 'نوع محاسبه'}</h3>
                <div style="text-align: center; padding: 16px;">
                    <span style="font-size: 1.2rem; color: ${calcTypeColor}; font-weight: 700;">${calcTypeText}</span>
                </div>
            </div>
            ${Q_m3s !== null ? `
            <div class="result-panel" style="border: 2px solid var(--green-industrial);">
                <h3>✅ ${isEnglish ? 'Calculation Results' : 'نتایج محاسبات'}</h3>
                <div class="result-grid">
                    <div class="result-item highlight">
                        <span class="label">P<sub>supply</sub> — ${isEnglish ? 'Supply Pressure' : 'فشار تأمین'}</span>
                        <span class="value">${P_supply_bar?.toFixed(1) || '—'} bar</span>
                    </div>
                    <div class="result-item highlight">
                        <span class="label">Q<sub>supply</sub> — ${isEnglish ? 'Supply Flow Rate' : 'دبی تأمین'}</span>
                        <span class="value">${Q_Lmin?.toFixed(2) || '—'} L/min</span>
                    </div>
                    <div class="result-item">
                        <span class="label">${isEnglish ? 'Recommended Tank Volume' : 'حجم مخزن پیشنهادی'}</span>
                        <span class="value">≈ ${tankVolume.toFixed(0)} L</span>
                    </div>
                </div>
                <p style="margin-top: 8px; font-size: 0.85rem; color: var(--text-secondary);">📐 ${formulaUsed}</p>
            </div>
            ` : `
            <div class="alert alert-warning">
                ${calcType === 'numerical' 
                    ? (isEnglish ? '📋 Use programs from the book: THERMAL (p. 686), DEFLECTION (p. 696)' : '📋 از برنامه‌های کتاب استفاده کنید: THERMAL (صفحه ۶۸۶)، DEFLECTION (صفحه ۶۹۶)')
                    : (isEnglish ? '📋 Use Raimondi-Boyd chart (Book, pp. 144-156)' : '📋 از نمودار Raimondi-Boyd (کتاب، صفحات ۱۴۴-۱۵۶) استفاده کنید')}
            </div>
            `}
            ${regime === 2 ? `
            <div class="formula-panel" style="margin-top: 16px;">
                <h4>${isEnglish ? 'Recess Geometry Parameters (Hydrostatic)' : 'پارامترهای هندسی جیب (هیدرواستاتیک)'}</h4>
                <div class="numeric-inputs-container">
                    <div class="input-group">
                        <label><span class="input-label">R — ${isEnglish ? 'Pad Outer Radius' : 'شعاع بیرونی پد'}</span><span class="input-unit">mm</span></label>
                        <input type="number" id="R-pad" class="numeric-input" value="${(D_shaft/2*0.8).toFixed(1)}" step="any">
                    </div>
                    <div class="input-group">
                        <label><span class="input-label">R₀ — ${isEnglish ? 'Recess Radius' : 'شعاع جیب (Recess)'}</span><span class="input-unit">mm</span></label>
                        <input type="number" id="R0-recess" class="numeric-input" value="${(D_shaft/2*0.4).toFixed(1)}" step="any">
                    </div>
                </div>
                <button id="recalc-btn" class="btn btn-secondary" style="margin-top: 12px;">${isEnglish ? 'Recalculate' : 'محاسبه مجدد'}</button>
            </div>
            ` : ''}
            <!-- مقایسه با فشار واقعی (مسیر عیب‌یابی/پایش) -->
            ${appState.getAnswer('1-1') !== '1' ? `
            <div class="formula-panel" style="margin-top: 20px;">
                <h4>📏 ${isEnglish ? 'Comparison with Actual Values' : 'مقایسه با مقادیر واقعی'}</h4>
                <div class="numeric-inputs-container">
                    <div class="input-group">
                        <label><span class="input-label">P<sub>actual</sub> — ${isEnglish ? 'Actual Pressure (on gauge)' : 'فشار واقعی (روی گیج)'}</span><span class="input-unit">bar</span></label>
                        <input type="number" id="P-actual" class="numeric-input" placeholder="${isEnglish ? 'Gauge value' : 'مقدار گیج'}" step="any">
                    </div>
                    <div class="input-group">
                        <label><span class="input-label">Q<sub>actual</sub> — ${isEnglish ? 'Actual Flow Rate' : 'دبی واقعی'}</span><span class="input-unit">L/min</span></label>
                        <input type="number" id="Q-actual" class="numeric-input" placeholder="${isEnglish ? 'Measured flow rate' : 'دبی اندازه‌گیری شده'}" step="any">
                    </div>
                </div>
                <button id="compare-btn" class="btn btn-secondary" style="margin-top: 12px;">${isEnglish ? 'Compare' : 'مقایسه'}</button>
                <div id="compare-result" style="margin-top: 12px;"></div>
            </div>
            ` : ''}
            <div class="action-bar">
                <button id="back-btn" class="btn btn-secondary">${isEnglish ? 'Back' : 'بازگشت'}</button>
                <button id="next-btn" class="btn btn-primary">${isEnglish ? 'Continue' : 'ادامه'}</button>
            </div>
        </div>
    `;
    document.getElementById('back-btn').addEventListener('click', () => {
        window.dispatchEvent(new CustomEvent('navigate', { detail: { question: '4-8' } }));
    });
    document.getElementById('next-btn').addEventListener('click', () => {
        appState.currentQuestion = '4-9';
        window.dispatchEvent(new CustomEvent('navigate', { detail: { question: '4-10' } }));
    });
    document.getElementById('recalc-btn')?.addEventListener('click', () => {
        const R = parseFloat(document.getElementById('R-pad')?.value) || 20;
        const R0 = parseFloat(document.getElementById('R0-recess')?.value) || 10;
        const p_r = 10e6;
        const Q = Calculations.calculateHydrostaticFlow(h0_m, p_r, eta0, R / 1000, R0 / 1000);
        const Q_L = Q ? Q * 1000 * 60 : 0;
        alert(isEnglish ? `Calculated flow rate: ${Q_L.toFixed(2)} L/min` : `دبی محاسبه‌شده: ${Q_L.toFixed(2)} L/min`);
    });
    document.getElementById('compare-btn')?.addEventListener('click', () => {
        const P_actual = parseFloat(document.getElementById('P-actual')?.value);
        const Q_actual = parseFloat(document.getElementById('Q-actual')?.value);
        const resultDiv = document.getElementById('compare-result');
        if (isNaN(P_actual) && isNaN(Q_actual)) {
            resultDiv.innerHTML = `<div class="alert alert-warning">${isEnglish ? 'Please enter at least one value.' : 'لطفاً حداقل یک مقدار وارد کنید.'}</div>`;
            return;
        }
        let messages = [];
        if (!isNaN(P_actual) && P_supply_bar) {
            if (P_actual < P_supply_bar * 0.8) {
                messages.push(isEnglish ? '⚠️ Pressure lower than expected — Possible leakage or pump failure' : '⚠️ فشار کمتر از حد انتظار — احتمال نشتی یا خرابی پمپ');
                appState.setFlag('LOW_PRESSURE', true);
            } else if (P_actual > P_supply_bar * 1.2) {
                messages.push(isEnglish ? '⚠️ Pressure higher than expected — Possible blockage' : '⚠️ فشار بیشتر از حد انتظار — احتمال گرفتگی مسیر');
                appState.setFlag('HIGH_PRESSURE', true);
            } else {
                messages.push(isEnglish ? '✅ Pressure matches design' : '✅ فشار مطابق طراحی است');
            }
        }
        if (!isNaN(Q_actual) && Q_Lmin) {
            if (Q_actual < Q_Lmin * 0.8) {
                messages.push(isEnglish ? '⚠️ Flow rate lower than expected' : '⚠️ دبی کمتر از حد انتظار');
                appState.setFlag('LOW_FLOW', true);
            } else {
                messages.push(isEnglish ? '✅ Flow rate within acceptable range' : '✅ دبی در محدوده مجاز');
            }
        }
        resultDiv.innerHTML = messages.map(m => `<div class="alert ${m.includes('⚠️') ? 'alert-warning' : 'alert-success'}">${m}</div>`).join('');
    });
}