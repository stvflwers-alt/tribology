import appState from '../../state.js';
import router from '../../router.js';
export function renderQuestion3_0(container) {
    // تابع ساده ترجمه
    const translate = (text) => {
        if (appState.language !== 'en') return text;
        const translations = {
            // عنوان‌ها و برچسب‌ها
            'محاسبه خودکار': 'Auto Calculation',
            'محاسبه تنش تماسی (p_max)': 'Contact Stress Calculation (p_max)',
            'بر اساس داده‌های وارد شده در گام ۲، تنش تماسی حداکثر محاسبه شده است.': 'Based on the data entered in Step 2, the maximum contact stress has been calculated.',
            '📊 نتایج محاسبات تماس': '📊 Contact Calculation Results',
            'E\' — مدول الاستیسیته معادل': 'E\' — Equivalent Elastic Modulus',
            'p_max — تنش تماسی حداکثر': 'p_max — Maximum Contact Stress',
            'σ_y — تنش تسلیم (نرم‌تر)': 'σ_y — Yield Stress (softer)',
            'p_max / σ_y': 'p_max / σ_y',
            'ایمن': 'Safe',
            'تسلیم': 'Yielding',
            'b — نیم‌عرض تماس': 'b — Half Contact Width',
            'a — شعاع تماس': 'a — Contact Radius',
            'A — مساحت تماس': 'A — Contact Area',
            'پارامترهای ورودی:': 'Input Parameters:',
            'تنش تماسی در محدوده مجاز قرار دارد.': 'Contact stress is within acceptable limits.',
            'تنش تماسی از تنش تسلیم ماده نرم‌تر بیشتر است. تغییر شکل پلاستیک محتمل است.': 'Contact stress exceeds yield stress of the softer material. Plastic deformation is likely.',
            'بازگشت': 'Back',
            'ادامه': 'Continue'
        };
        return translations[text] || text;
    };
    const materialData = appState.getAnswer('2-3') || [];
    const E1 = materialData[0] || 210e9;
    const nu1 = materialData[1] || 0.3;
    const sigma_y1 = materialData[2] || 250e6;
    const E2 = materialData[10] || 210e9;
    const nu2 = materialData[11] || 0.3;
    const sigma_y2 = materialData[12] || 250e6;
    const contactData = appState.getAnswer('2-6') || [];
    const F = contactData[10] || 1000;
    const U = contactData[11] || 1;
    const T = contactData[12] || 25;
    const geometryData = appState.getAnswer('2-geometry') || {};
    const R1x = geometryData.r1x || geometryData.d_shaft/2 || 0.01;
    const R2x = geometryData.r2x || geometryData.d_bush/2 || Infinity;
    const L = geometryData.l || geometryData.l_bearing || 0.01;
    const geometryType = appState.getAnswer('2-5') || '4';
    const E_prime = 1 / ((1 - nu1**2)/E1 + (1 - nu2**2)/E2);
    let R_prime;
    if (!isFinite(R1x) && !isFinite(R2x)) {
        R_prime = Infinity;
    } else if (!isFinite(R1x)) {
        R_prime = R2x;
    } else if (!isFinite(R2x)) {
        R_prime = R1x;
    } else {
        R_prime = 1 / (1/R1x + 1/R2x);
    }
    const isConformal = geometryType === '1' || geometryType === '2';
    const isLineContact = geometryType === '4' || geometryType === '6';
    let p_max_pa, half_width_m, contact_area_m2, formula_type;
    if (isConformal) {
        const avgDiameter = (Math.abs(R1x) + (isFinite(R2x) ? Math.abs(R2x) : Math.abs(R1x))) / 2;
        contact_area_m2 = L * Math.PI * avgDiameter;
        p_max_pa = F / contact_area_m2;
        half_width_m = null;
        formula_type = 'conformal';
    } else if (isLineContact) {
        const b = Math.sqrt((4 * F * R_prime) / (Math.PI * L * E_prime));
        p_max_pa = (2 * F) / (Math.PI * b * L);
        half_width_m = b;
        contact_area_m2 = 2 * b * L;
        formula_type = 'line';
    } else {
        const a = Math.cbrt((3 * F * R_prime) / E_prime);
        p_max_pa = (3 * F) / (2 * Math.PI * a**2);
        half_width_m = a;
        contact_area_m2 = Math.PI * a**2;
        formula_type = 'point';
    }
    const p_max_MPa = p_max_pa / 1e6;
    const sigma_y = Math.min(sigma_y1, sigma_y2);
    const sigma_y_MPa = sigma_y / 1e6;
    const ratio = p_max_MPa / sigma_y_MPa;
    const step3ContactData = {
        E_prime_GPa: E_prime / 1e9,
        p_max_MPa: p_max_MPa,
        sigma_y_MPa: sigma_y_MPa,
        ratio: ratio,
        isConformal: isConformal,
        formulaType: formula_type,
        halfWidth_micron: half_width_m ? half_width_m * 1e6 : null,
        contactArea_mm2: contact_area_m2 * 1e6,
        R_prime_mm: isFinite(R_prime) ? R_prime * 1000 : null,
        E1_GPa: E1 / 1e9,
        E2_GPa: E2 / 1e9,
        nu1: nu1,
        nu2: nu2,
        F_N: F,
        U_ms: U,
        T_C: T,
        R1x_mm: R1x * 1000,
        R2x_mm: isFinite(R2x) ? R2x * 1000 : '∞',
        L_mm: L * 1000
    };
    appState.setAnswer('3-0', step3ContactData);
    container.innerHTML = `
        <div class="question-card">
            <div class="question-header">
                <span class="question-number">3-0</span>
                <span class="question-tag tag-auto">${translate('محاسبه خودکار')}</span>
            </div>
            <h2 class="question-title">${translate('محاسبه تنش تماسی (p_max)')}</h2>
            <p class="question-description">
                ${translate('بر اساس داده‌های وارد شده در گام ۲، تنش تماسی حداکثر محاسبه شده است.')}
            </p>
            <div class="result-panel">
                <h3>${translate('📊 نتایج محاسبات تماس')}</h3>
                <div class="result-grid">
                    <div class="result-item highlight">
                        <span class="label">${translate('E\' — مدول الاستیسیته معادل')}</span>
                        <span class="value">${(E_prime / 1e9).toFixed(2)} GPa</span>
                    </div>
                    <div class="result-item ${ratio > 1 ? 'danger' : 'success'}">
                        <span class="label">${translate('p_max — تنش تماسی حداکثر')}</span>
                        <span class="value">${p_max_MPa.toFixed(2)} MPa</span>
                    </div>
                    <div class="result-item">
                        <span class="label">${translate('σ_y — تنش تسلیم (نرم‌تر)')}</span>
                        <span class="value">${sigma_y_MPa.toFixed(2)} MPa</span>
                    </div>
                    <div class="result-item ${ratio > 1 ? 'danger' : 'success'}">
                        <span class="label">${translate('p_max / σ_y')}</span>
                        <span class="value">${ratio.toFixed(3)} ${ratio > 1 ? '⚠️ ' + translate('تسلیم') : '✓ ' + translate('ایمن')}</span>
                    </div>
                    ${half_width_m ? `
                    <div class="result-item">
                        <span class="label">${formula_type === 'line' ? translate('b — نیم‌عرض تماس') : translate('a — شعاع تماس')}</span>
                        <span class="value">${(half_width_m * 1e6).toFixed(1)} µm</span>
                    </div>
                    ` : ''}
                    <div class="result-item">
                        <span class="label">${translate('A — مساحت تماس')}</span>
                        <span class="value">${(contact_area_m2 * 1e6).toFixed(2)} mm²</span>
                    </div>
                </div>
            </div>
            <div style="margin-top: 16px; padding: 12px; background: #f8f9fa; border-radius: 8px; font-size: 0.85rem;">
                <strong>${translate('پارامترهای ورودی:')}</strong>
                E₁ = ${(E1/1e9).toFixed(0)} GPa, E₂ = ${(E2/1e9).toFixed(0)} GPa, 
                ν₁ = ${nu1}, ν₂ = ${nu2}, 
                F = ${F.toFixed(0)} N, U = ${U.toFixed(2)} m/s, T = ${T}°C
            </div>
            ${ratio > 1 ? `
            <div class="alert alert-warning">
                ⚠️ ${translate('تنش تماسی از تنش تسلیم ماده نرم‌تر بیشتر است. تغییر شکل پلاستیک محتمل است.')}
            </div>
            ` : `
            <div class="alert alert-success">
                ✅ ${translate('تنش تماسی در محدوده مجاز قرار دارد.')}
            </div>
            `}
            <div class="action-bar">
                <button id="back-btn-3-0" class="btn btn-secondary">${translate('بازگشت')}</button>
                <button id="next-btn-3-0" class="btn btn-primary">${translate('ادامه')}</button>
            </div>
        </div>
    `;
    document.getElementById('back-btn-3-0').addEventListener('click', () => {
        window.dispatchEvent(new CustomEvent('navigate', { 
            detail: { question: '2-geometry' } 
        }));
    });
    document.getElementById('next-btn-3-0').addEventListener('click', () => {
        appState.currentQuestion = '3-0';
        const nextQuestion = router.getNextQuestion('3-0', null);
        if (nextQuestion) {
            window.dispatchEvent(new CustomEvent('navigate', { 
                detail: { question: nextQuestion } 
            }));
        }
    });
}