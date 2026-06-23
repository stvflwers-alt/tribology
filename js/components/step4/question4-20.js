import appState from '../../state.js';
import router from '../../router.js';

export function renderQuestion4_20(container) {
    const t = (key, params = {}) => appState.t(key, params);
    const isEnglish = appState.language === 'en';
    const regime = appState.getAnswer('3-2')?.recommendedSystem;
    const isGas = [7, 8].includes(regime);

    let lubricantName = appState.getAnswer('4-1-lubricant-name') || (isEnglish ? 'Unknown' : 'نامشخص');
    const lubricantCode = appState.getAnswer('4-1-lubricant-code') || 'unknown';
    const grade = appState.getAnswer('4-10-grade') || appState.getAnswer('4-2-iso-grade') || '—';
    const eta0 = appState.getAnswer('4-2-eta0');
    const alpha = appState.getAnswer('4-2-alpha');
    const methodUsed = appState.getAnswer('4-2-method-used') || '—';
    const filmData = appState.getAnswer('4-3-film-data') || {};
    const gasResults = appState.getAnswer('4-3-gas-results') || {};
    const lambda = filmData.lambda;
    const h0_um = filmData.h0_um;
    const sigma_um = filmData.sigma_um;
    const flashData = appState.getAnswer('4-5-flash-data') || {};
    const T_contact = flashData.T_contact;
    const Tf_max = flashData.Tf_max;
    const psi = appState.getAnswer('4-6-psi');
    const Q_Lmin = appState.getAnswer('4-9-Q') ? appState.getAnswer('4-9-Q') * 1000 * 60 : null;
    const P_supply = appState.getAnswer('4-9-P-supply');
    let rootCause = appState.getAnswer('4-15-root-cause-text') || (isEnglish ? 'Unknown' : 'نامشخص');
    const oilChangeInterval = appState.getAnswer('4-13-oil-change');
    const filterInterval = appState.getAnswer('4-13-filter-change');
    const additives = appState.getAnswer('4-11-additives') || [];

    if (isEnglish) {
        const nameMap = {
            'هوا (Air)': 'Air',
            'هوا': 'Air',
            'نیتروژن (N₂)': 'Nitrogen',
            'نیتروژن': 'Nitrogen',
            'هلیوم (He)': 'Helium',
            'هلیوم': 'Helium',
            'آرگون (Ar)': 'Argon',
            'آرگون': 'Argon',
            'روغن معدنی': 'Mineral Oil',
            'گریس لیتیم': 'Lithium Grease',
            'MoS₂ (مولیبدن دی‌سولفید)': 'MoS₂',
            'گرافیت (Graphite)': 'Graphite',
            'استر': 'Ester',
            'سیلیکون': 'Silicone'
        };
        lubricantName = nameMap[lubricantName] || lubricantName;

        const causeMap = {
            'دمای بالا': 'High Temperature',
            'بار بیش از حد': 'Overload',
            'کمبود روانکار': 'Lack of Lubricant',
            'آلودگی': 'Contamination',
            'سایش': 'Wear',
            'خوردگی': 'Corrosion',
            'ناشناخته': 'Unknown'
        };
        rootCause = causeMap[rootCause] || rootCause;
    }

    const flags = [];
    if (appState.getFlag('FLASH_TEMP_EXCEEDED')) flags.push(isEnglish ? '⚠️ Critical Flash Temperature' : '⚠️ دمای فلش بحرانی');
    if (appState.getFlag('CAVITATION_DETECTED')) flags.push(isEnglish ? '🕳️ Cavitation' : '🕳️ کاویتاسیون');
    if (appState.getFlag('OIL_WHIRL_DETECTED')) flags.push(isEnglish ? '🌪️ Oil Whirl' : '🌪️ گرداب روغن');
    if (appState.getFlag('DEFLECTION_NEEDED')) flags.push(isEnglish ? '📐 Deformation Analysis Required' : '📐 نیاز به تحلیل تغییر شکل');
    if (appState.getFlag('NEED_EXPERIMENTAL')) flags.push(isEnglish ? '🔬 Experimental Measurement Required' : '🔬 نیاز به اندازه‌گیری تجربی');
    if (appState.getFlag('MISMATCH_REGIME')) flags.push(isEnglish ? '⚠️ Mechanism Mismatch' : '⚠️ عدم تطابق مکانیزم');
    if (appState.getFlag('MATERIAL_INCOMPATIBILITY')) flags.push(isEnglish ? '⚠️ Material Incompatibility' : '⚠️ ناسازگاری مواد');
    if (appState.getFlag('LUBRICANT_TYPE_MISMATCH')) flags.push(isEnglish ? '⚠️ Lubricant Type Mismatch' : '⚠️ عدم تطابق روانکار');

    const methodNames = {
        'precise': isEnglish ? 'Precise (Vogel + So & Klaus)' : 'دقیق (وگل + سو و کلاوس)',
        'estimated': isEnglish ? 'Estimated (ISO VG)' : 'تخمینی (ISO VG)',
        'manual': isEnglish ? 'Manual Entry' : 'ورود دستی',
        'grease_simple': isEnglish ? 'Grease - Simple (Newtonian)' : 'گریس — ساده (نیوتنی)',
        'grease_precise': isEnglish ? 'Grease - Precise (Herschel-Bulkley)' : 'گریس — دقیق (هرشل-بالکلی)',
        'gas': isEnglish ? 'Gas Lubricant' : 'روانکار گازی',
        'gas_manual': isEnglish ? 'Gas Lubricant (Manual)' : 'روانکار گازی (دستی)'
    };

    let filmRegimeDisplay = '—';
    let h0Display = '—';
    let lambdaDisplay = '—';
    let sigmaDisplay = '—';
    let filmStatusDisplay = '—';
    let tfDisplay = '—';
    let tContactDisplay = '—';
    let psiDisplay = '—';

    if (isGas) {
        if (regime === 7) {
            filmRegimeDisplay = isEnglish ? 'Gas Dynamic' : 'گاز دینامیک';
            filmStatusDisplay = isEnglish ? 'Gas Dynamic Bearing' : 'یاتاقان گاز دینامیک';
        } else if (regime === 8) {
            filmRegimeDisplay = isEnglish ? 'Aerostatic' : 'ایرواستاتیک';
            filmStatusDisplay = isEnglish ? 'Aerostatic Bearing' : 'یاتاقان ایرواستاتیک';
        }

        if (gasResults.h0) {
            h0Display = gasResults.h0.toFixed(2) + ' µm';
        }

        if (gasResults.Lambda) {
            lambdaDisplay = gasResults.Lambda.toFixed(3);
        }

        sigmaDisplay = isEnglish ? 'N/A (Gas)' : 'N/A (گازی)';

        if (T_contact !== undefined && T_contact !== null) {
            tContactDisplay = T_contact.toFixed(1) + ' °C';
        }
        if (Tf_max !== undefined && Tf_max !== null) {
            tfDisplay = Tf_max.toFixed(1) + ' °C';
        }

        if (psi !== undefined && psi !== null) {
            psiDisplay = psi.toFixed(3);
        }
    } else {
        filmRegimeDisplay = filmData.regimeName || '—';
        h0Display = h0_um ? h0_um.toFixed(3) + ' µm' : '—';
        lambdaDisplay = lambda ? lambda.toFixed(2) : '—';
        sigmaDisplay = sigma_um ? sigma_um.toFixed(3) + ' µm' : '—';
        filmStatusDisplay = filmData.lambdaDesc || '—';
        tContactDisplay = T_contact ? T_contact.toFixed(1) + ' °C' : '—';
        tfDisplay = Tf_max ? Tf_max.toFixed(1) + ' °C' : '—';
        psiDisplay = psi ? psi.toFixed(3) : '—';
    }

    const displayGrade = isGas ? (isEnglish ? 'N/A (Gas)' : 'N/A (گازی)') : (grade !== '—' ? 'ISO VG ' + grade : '—');

    container.innerHTML = `
        <div class="question-card" style="max-width: 900px;">
            <div class="question-header">
                <span class="question-number">${isEnglish ? 'Question 4-20' : '۴-۲۰'}</span>
                <span class="question-tag tag-auto">${isEnglish ? 'Final Report' : 'گزارش نهایی'}</span>
            </div>
            <h2 class="question-title">📋 ${isEnglish ? 'Step 4 Final Report: Lubricant Selection & Management' : 'گزارش نهایی گام ۴: انتخاب و مدیریت روانکار'}</h2>

            <div class="report-section">
                <h3>${isEnglish ? '1. Selected Lubricant' : '۱. روانکار انتخاب‌شده'}</h3>
                <table class="report-table">
                    <tbody>
                        <tr><td style="width: 40%;"><strong>${isEnglish ? 'Lubricant Type' : 'نوع روانکار'}</strong></td>
                            <td>${lubricantName}</td>
                        </tr>
                        <tr><td><strong>${isEnglish ? 'Viscosity Grade' : 'گرید ویسکوزیته'}</strong></td>
                            <td>${displayGrade}</td>
                        </tr>
                        <tr><td><strong>η₀ (${isEnglish ? 'Dynamic Viscosity' : 'ویسکوزیته دینامیکی'})</strong></td>
                            <td>${eta0 ? eta0.toExponential(3) : '—'} Pa·s</td>
                        </tr>
                        <tr><td><strong>α (${isEnglish ? 'Pressure-Viscosity Coefficient' : 'ضریب فشار-ویسکوزیته'})</strong></td>
                            <td>${alpha ? alpha.toExponential(2) : '—'} Pa⁻¹</td>
                        </tr>
                        <tr><td><strong>${isEnglish ? 'Calculation Method' : 'روش محاسبه'}</strong></td>
                            <td>${methodNames[methodUsed] || methodUsed}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="report-section">
                <h3>${isEnglish ? '2. Lubricant Film Analysis' : '۲. تحلیل فیلم روانکار'}</h3>
                <table class="report-table">
                    <tbody>
                        <tr><td><strong>E' (${isEnglish ? 'Reduced Modulus' : 'مدول کاهش‌یافته'})</strong></td>
                            <td>${((appState.getAnswer('3-0') || {}).E_prime_GPa || '—').toFixed(2)} GPa</td>
                        </tr>
                        <tr><td><strong>${isEnglish ? 'Lubrication Regime' : 'رژیم روانکاری'}</strong></td>
                            <td>${filmRegimeDisplay}</td>
                        </tr>
                        <tr><td><strong>h₀ (${isEnglish ? 'Minimum Film Thickness' : 'حداقل ضخامت فیلم'})</strong></td>
                            <td>${h0Display}</td>
                        </tr>
                        <tr><td><strong>σ (${isEnglish ? 'Combined Roughness' : 'زبری ترکیبی'})</strong></td>
                            <td>${sigmaDisplay}</td>
                        </tr>
                        <tr><td><strong>λ (${isEnglish ? 'Film Ratio' : 'نسبت فیلم'})</strong></td>
                            <td style="font-weight: 700;">${lambdaDisplay}</td>
                        </tr>
                        <tr><td><strong>${isEnglish ? 'Film Status' : 'وضعیت فیلم'}</strong></td>
                            <td>${filmStatusDisplay}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="report-section">
                <h3>${isEnglish ? '3. Destructive Phenomena' : '۳. پدیده‌های مخرب'}</h3>
                <table class="report-table">
                    <tbody>
                        <tr><td><strong>Tf_max (${isEnglish ? 'Flash Temperature' : 'دمای فلش'})</strong></td>
                            <td>${tfDisplay}</td>
                        </tr>
                        <tr><td><strong>T_contact (${isEnglish ? 'Actual Contact Temperature' : 'دمای واقعی تماس'})</strong></td>
                            <td style="color: ${T_contact > 150 ? '#C62828' : '#2E7D32'};">${tContactDisplay}</td>
                        </tr>
                        <tr><td><strong>ψ (${isEnglish ? 'Plasticity Index' : 'شاخص پلاستیسیته'})</strong></td>
                            <td>${psiDisplay}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="report-section">
                <h3>${isEnglish ? '4. Supply System' : '۴. سیستم تأمین'}</h3>
                <table class="report-table">
                    <tbody>
                        <tr><td><strong>P_supply</strong></td>
                            <td>${P_supply ? P_supply.toFixed(1) + ' bar' : '—'}</td>
                        </tr>
                        <tr><td><strong>Q_supply</strong></td>
                            <td>${Q_Lmin ? Q_Lmin.toFixed(2) + ' L/min' : '—'}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="report-section">
                <h3>${isEnglish ? '5. Compatibility & Maintenance' : '۵. سازگاری و نگهداری'}</h3>
                <table class="report-table">
                    <tbody>
                        <tr><td><strong>${isEnglish ? 'Additive Package' : 'بسته افزودنی'}</strong></td>
                            <td>${additives.map(a => a.name).join('، ') || '—'}</td>
                        </tr>
                        <tr><td><strong>${isEnglish ? 'Replacement Intervals' : 'فواصل تعویض'}</strong></td>
                            <td>${oilChangeInterval || '—'} ${isEnglish ? 'hours' : 'ساعت'}</td>
                        </tr>
                        <tr><td><strong>${isEnglish ? 'Root Cause' : 'علت ریشه‌ای خرابی'}</strong></td>
                            <td style="font-weight: 700;">${rootCause}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            ${flags.length > 0 ? `
            <div class="report-section">
                <h3>🚩 ${isEnglish ? 'Active Flags' : 'پرچم‌های فعال'}</h3>
                <ul class="report-flags-list">
                    ${flags.map(f => `<li class="flag-warning">${f}</li>`).join('')}
                </ul>
            </div>
            ` : ''}

            <div style="text-align: center; margin-top: 24px; padding: 16px; background: #E8F5E9; border-radius: var(--radius-md);">
                <strong style="color: #2E7D32;">✅ ${isEnglish ? 'Step 4 Completed.' : 'گام ۴ تکمیل شد.'}</strong>
            </div>

            <div class="action-bar">
                <button id="back-btn" class="btn btn-secondary">${isEnglish ? 'Back' : 'بازگشت'}</button>
                <button id="view-report-btn" class="btn btn-primary btn-large">
                    📋 ${isEnglish ? 'View Full Report' : 'مشاهده گزارش کامل'}
                </button>
            </div>
        </div>
    `;

    document.getElementById('back-btn').addEventListener('click', () => {
        window.dispatchEvent(new CustomEvent('navigate', { detail: { question: '4-19' } }));
    });

    document.getElementById('view-report-btn').addEventListener('click', () => {
        appState.currentQuestion = '4-20';
        appState.setFlag('STEP4_COMPLETED', true);
        appState.currentStep = 4;
        appState.saveToLocalStorage();
        window.dispatchEvent(new CustomEvent('navigate', { detail: { question: 'report4' } }));
    });
}