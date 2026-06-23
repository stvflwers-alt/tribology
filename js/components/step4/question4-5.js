import appState from '../../state.js';
import router from '../../router.js';
export function renderQuestion4_5(container) {
    const t = (key, params = {}) => appState.t(key, params);
    const isEnglish = appState.language === 'en';
    const contactData = appState.getAnswer('3-0') || {};
    const F = contactData.F_N || 1000;
    const U = contactData.U_ms || 1;
    const T_ambient = contactData.T_C || 25;
    const halfWidth_m = contactData.halfWidth_micron ? contactData.halfWidth_micron * 1e-6 : 0.001;
    const filmData = appState.getAnswer('4-3-film-data') || {};
    const isLineContact = filmData.isLineContact || false;
    const materialData = appState.getAnswer('2-3') || {};
    const k1 = materialData.part1?.k || 50;
    const rho1 = materialData.part1?.rho || 7800;
    const c1 = materialData.part1?.c || 460;
    const k2 = materialData.part2?.k || 50;
    const rho2 = materialData.part2?.rho || 7800;
    const c2 = materialData.part2?.c || 460;
    const T_melt1 = materialData.part1?.T_melt || 1400;
    const T_melt2 = materialData.part2?.T_melt || 1400;
    const lambda = appState.getAnswer('4-3-lambda');
    const mu = (lambda !== null && lambda > 3) ? 0.05 : 0.12;
    const geometryData = appState.getAnswer('2-geometry') || {};
    let L_contact = 0.02;
    if (geometryData.params?.L_bearing) L_contact = geometryData.params.L_bearing / 1000;
    else if (geometryData.params?.width_gear) L_contact = geometryData.params.width_gear / 1000;
    else if (geometryData.params?.L) L_contact = geometryData.params.L / 1000;
    function calculateThermalDiffusivity(k, rho, c) {
        if (!k || !rho || !c || rho === 0 || c === 0) return null;
        return k / (rho * c);
    }
    const chi1 = calculateThermalDiffusivity(k1, rho1, c1);
    const chi2 = calculateThermalDiffusivity(k2, rho2, c2);
    function calculatePecletNumber(U, halfWidth, chi) {
        if (!U || !halfWidth || !chi || chi === 0) return null;
        return (U * halfWidth) / (2 * chi);
    }
    const L1 = calculatePecletNumber(U, halfWidth_m, chi1);
    const L2 = calculatePecletNumber(U, halfWidth_m, chi2);
    const isFastRegime = (L1 !== null && L1 > 5) || (L2 !== null && L2 > 5);
    function calculateFlashTemperature(mu, F, deltaU, k_thermal, halfWidth, L_contact, U, chi, contactType) {
        if (!mu || !F || deltaU === undefined || !k_thermal || !halfWidth || !U || !chi) {
            return null;
        }
        let Tf;
        if (contactType === 'line') {
            if (!L_contact) return null;
            const term1 = (mu * F * Math.abs(deltaU)) / (k_thermal * L_contact);
            const term2 = Math.sqrt((U * halfWidth) / chi);
            Tf = 0.266 * term1 * term2;
        } else {
            const term1 = (mu * F * Math.abs(deltaU)) / (k_thermal * halfWidth);
            const term2 = Math.sqrt((U * halfWidth) / chi);
            Tf = 0.308 * term1 * term2;
        }
        return Tf;
    }
    const Tf_A = calculateFlashTemperature(mu, F, U, k1, halfWidth_m, L_contact, U, chi1, isLineContact ? 'line' : 'point');
    const Tf_B = calculateFlashTemperature(mu, F, U, k2, halfWidth_m, L_contact, U, chi2, isLineContact ? 'line' : 'point');
    function calculateMaxFlashTemperature(Tf_A, Tf_B, T_ambient = 25) {
        if (!Tf_A || !Tf_B) {
            const Tf = Tf_A || Tf_B || 0;
            return { Tf_max: Tf, T_contact: T_ambient + Tf };
        }
        if (Tf_A === 0 || Tf_B === 0) {
            const Tf_max = Math.max(Tf_A, Tf_B);
            return { Tf_max: Tf_max, T_contact: T_ambient + Tf_max };
        }
        const Tf_max = 1 / (1/Tf_A + 1/Tf_B);
        return { Tf_max: Tf_max, T_contact: T_ambient + Tf_max };
    }
    const flashResult = calculateMaxFlashTemperature(Tf_A, Tf_B, T_ambient);
    const lubricantCode = appState.getAnswer('4-1-lubricant-code') || 'mineral';
    function getLubricantMaxTemp(code) {
        const temps = {
            'mineral': 120, 'pao': 160, 'ester': 220, 'pag': 180,
            'silicone': 250, 'mos2': 400, 'graphite': 500, 'ptfe': 260,
            'soft_metal': 300, 'air': 1000, 'nitrogen': 1000, 'helium': 1000,
            'lithium_grease': 130, 'lithium_complex': 160, 'calcium_grease': 120,
            'polyurea': 180, 'emulsion_ow': 80, 'emulsion_wo': 100, 'custom': 150
        };
        return temps[code] || 150;
    }
    const T_max_lube = getLubricantMaxTemp(lubricantCode);
    const tempExceeded = flashResult.T_contact > T_max_lube;
    const meltingRisk = flashResult.T_contact > 0.5 * Math.min(T_melt1, T_melt2);
    const flashData = {
        chi1, chi2, L1, L2, isFastRegime,
        Tf_A, Tf_B, Tf_max: flashResult.Tf_max,
        T_contact: flashResult.T_contact, T_ambient,
        mu, T_max_lube, tempExceeded, meltingRisk
    };
    appState.setAnswer('4-5-flash-data', flashData);
    if (tempExceeded) appState.setFlag('FLASH_TEMP_EXCEEDED', true);
    if (meltingRisk) appState.setFlag('MELTING_RISK', true);
    let statusColor, statusBg, statusText;
    if (tempExceeded) {
        statusColor = '#C62828';
        statusBg = '#FFEBEE';
        statusText = isEnglish ? '⚠️ Warning — Contact temperature exceeds lubricant limit' : '⚠️ هشدار — دمای تماس از حد مجاز روانکار فراتر رفته';
    } else if (meltingRisk) {
        statusColor = '#EF6C00';
        statusBg = '#FFF3E0';
        statusText = isEnglish ? '🌡️ Warning — Surface melting risk' : '🌡️ هشدار — خطر ذوب سطح';
    } else {
        statusColor = '#2E7D32';
        statusBg = '#E8F5E9';
        statusText = isEnglish ? '✅ Normal' : '✅ نرمال';
    }
    container.innerHTML = `
        <div class="question-card">
            <div class="question-header">
                <span class="question-number">${isEnglish ? 'Question 4-5' : '۴-۵'}</span>
                <span class="question-tag tag-auto">${isEnglish ? 'Auto Analysis' : 'تحلیل خودکار'}</span>
            </div>
            <h2 class="question-title">${isEnglish ? 'Flash Temperature Analysis' : 'تحلیل دمای فلش (Flash Temperature)'}</h2>
            <!-- Thermal Parameters -->
            <div class="result-panel">
                <h3>🔥 ${isEnglish ? 'Thermal Parameters' : 'پارامترهای حرارتی'}</h3>
                <div class="result-grid">
                    <div class="result-item">
                        <span class="label">χ₁ — ${isEnglish ? 'Thermal diffusivity of Part 1' : 'نفوذ حرارتی قطعه ۱'}</span>
                        <span class="value">${chi1 ? chi1.toExponential(2) : '—'} m²/s</span>
                    </div>
                    <div class="result-item">
                        <span class="label">χ₂ — ${isEnglish ? 'Thermal diffusivity of Part 2' : 'نفوذ حرارتی قطعه ۲'}</span>
                        <span class="value">${chi2 ? chi2.toExponential(2) : '—'} m²/s</span>
                    </div>
                    <div class="result-item">
                        <span class="label">L₁ — ${isEnglish ? 'Peclet number of Part 1' : 'عدد پکله قطعه ۱'}</span>
                        <span class="value">${L1 !== null ? L1.toFixed(2) : '—'}</span>
                    </div>
                    <div class="result-item">
                        <span class="label">L₂ — ${isEnglish ? 'Peclet number of Part 2' : 'عدد پکله قطعه ۲'}</span>
                        <span class="value">${L2 !== null ? L2.toFixed(2) : '—'}</span>
                    </div>
                    <div class="result-item">
                        <span class="label">${isEnglish ? 'Thermal Regime' : 'رژیم حرارتی'}</span>
                        <span class="value">${isFastRegime ? (isEnglish ? '⚡ Fast (L > 5)' : '⚡ سریع (L > 5)') : (isEnglish ? '🐢 Slow/Medium (L < 5)' : '🐢 کند/میانی (L < 5)')}</span>
                    </div>
                </div>
                ${!isFastRegime ? `
                    <div class="alert alert-warning" style="margin-top: 12px;">
                        ⚠️ ${isEnglish ? 'Approximate analysis (Slow/Medium regime). For higher accuracy, use numerical methods.' : 'تحلیل تقریبی است (رژیم کند/میانی). برای دقت بیشتر، از روش‌های عددی استفاده کنید.'}
                    </div>
                ` : ''}
            </div>
            <!-- Flash Temperature -->
            <div class="result-panel">
                <h3>🌡️ ${isEnglish ? 'Flash Temperature Calculation' : 'محاسبه دمای فلش'}</h3>
                <div class="result-grid">
                    <div class="result-item">
                        <span class="label">T<sub>f,A</sub> — ${isEnglish ? 'Flash temperature of surface A' : 'دمای فلش سطح A'}</span>
                        <span class="value">${Tf_A ? Tf_A.toFixed(1) : '—'} °C</span>
                    </div>
                    <div class="result-item">
                        <span class="label">T<sub>f,B</sub> — ${isEnglish ? 'Flash temperature of surface B' : 'دمای فلش سطح B'}</span>
                        <span class="value">${Tf_B ? Tf_B.toFixed(1) : '—'} °C</span>
                    </div>
                    <div class="result-item highlight">
                        <span class="label">T<sub>f,max</sub> — ${isEnglish ? 'Actual flash temperature' : 'دمای فلش واقعی'}</span>
                        <span class="value">${flashResult.Tf_max ? flashResult.Tf_max.toFixed(1) : '—'} °C</span>
                    </div>
                    <div class="result-item" style="background: ${statusBg};">
                        <span class="label">T<sub>contact</sub> — ${isEnglish ? 'Actual contact temperature' : 'دمای واقعی تماس'}</span>
                        <span class="value" style="color: ${statusColor}; font-size: 1.3rem;">
                            ${flashResult.T_contact ? flashResult.T_contact.toFixed(1) : '—'} °C
                        </span>
                    </div>
                </div>
                <div style="margin-top: 12px; padding: 12px; background: ${statusBg}; border-radius: var(--radius-sm); border-right: 4px solid ${statusColor};">
                    <strong style="color: ${statusColor};">${statusText}</strong>
                    <p style="margin-top: 4px; font-size: 0.85rem;">
                        ${isEnglish ? 'Lubricant T_max =' : 'T<sub>max</sub> روانکار ='} ${T_max_lube}°C | 
                        ${isEnglish ? 'Part T_melt =' : 'T<sub>melt</sub> قطعات ='} ${Math.min(T_melt1, T_melt2)}°C
                    </p>
                </div>
            </div>
            <div class="action-bar">
                <button id="back-btn" class="btn btn-secondary">${isEnglish ? 'Back' : 'بازگشت'}</button>
                <button id="next-btn" class="btn btn-primary">${isEnglish ? 'Continue' : 'ادامه'}</button>
            </div>
        </div>
    `;
    document.getElementById('back-btn').addEventListener('click', () => {
        window.dispatchEvent(new CustomEvent('navigate', { 
            detail: { question: '4-4' } 
        }));
    });
    document.getElementById('next-btn').addEventListener('click', () => {
        appState.currentQuestion = '4-5';
        const nextQuestion = router.getNextQuestion('4-5', null);
        window.dispatchEvent(new CustomEvent('navigate', { 
            detail: { question: nextQuestion || '4-6' } 
        }));
    });
}