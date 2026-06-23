import appState from '../../state.js';
import router from '../../router.js';

const GAS_PROPERTIES = {
    'air': {
        name: 'هوا (Air)',
        name_en: 'Air',
        mu_g: 18.2e-6,
        rho: 1.205,
        cp: 1005,
        R_specific: 287,
        k: 0.026,
        T_max: 1000,
        desc: 'Default, low cost',
        desc_fa: 'پیش‌فرض، کم‌هزینه'
    },
    'nitrogen': {
        name: 'نیتروژن (N₂)',
        name_en: 'Nitrogen',
        mu_g: 17.8e-6,
        rho: 1.165,
        cp: 1040,
        R_specific: 296.8,
        k: 0.026,
        T_max: 1000,
        desc: 'For explosive/oxidizing environments',
        desc_fa: 'مناسب محیط انفجاری یا اکسیداسیون‌زا'
    },
    'helium': {
        name: 'هلیوم (He)',
        name_en: 'Helium',
        mu_g: 19.8e-6,
        rho: 0.166,
        cp: 5193,
        R_specific: 2077,
        k: 0.152,
        T_max: 1000,
        desc: 'High heat dissipation',
        desc_fa: 'دفع حرارت بالا'
    },
    'argon': {
        name: 'آرگون (Ar)',
        name_en: 'Argon',
        mu_g: 22.6e-6,
        rho: 1.662,
        cp: 520,
        R_specific: 208.1,
        k: 0.017,
        T_max: 1000,
        desc: 'For vacuum processes',
        desc_fa: 'مناسب فرآیندهای خلأ'
    }
};

function calculateGasViscosityAtTemperature(mu_ref, T_ref, T, S) {
    if (T <= 0) T = 20;
    const T_ref_K = T_ref + 273.15;
    const T_K = T + 273.15;
    return mu_ref * Math.pow(T_K / T_ref_K, 1.5) * (T_ref_K + S) / (T_K + S);
}

function calculateGasDensityAtTemperature(rho_ref, T_ref, T, p_abs) {
    const T_ref_K = T_ref + 273.15;
    const T_K = T + 273.15;
    const p_ref = 101325;
    return rho_ref * (T_ref_K / T_K) * (p_abs / p_ref);
}

export function renderQuestion4_3_gas(container) {
    const isEnglish = appState.language === 'en';
    const regime = appState.getAnswer('3-2')?.recommendedSystem;
    const isGasDynamic = (regime === 7);
    const isAerostatic = (regime === 8);
    
    const contactData = appState.getAnswer('3-0') || {};
    const U = contactData.U_ms || 1;
    const F = contactData.F_N || 1000;
    const T_ambient = contactData.T_C || 25;
    const E_prime_GPa = contactData.E_prime_GPa || 210;
    const E_prime_Pa = E_prime_GPa * 1e9;
    const isConformal = contactData.isConformal || false;
    
    const geometryData = appState.getAnswer('2-geometry') || {};
    const geometryType = appState.getAnswer('2-5') || '4';
    
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
    } else {
        R1x = 0.025;
        R1y = Infinity;
        R2x = 0.025;
        R2y = Infinity;
    }
    
    let Rx, Ry;
    const curvX1 = (R1x !== Infinity && R1x !== 0) ? 1 / R1x : 0;
    const curvX2 = (R2x !== Infinity && R2x !== 0) ? 1 / R2x : 0;
    const curvY1 = (R1y !== Infinity && R1y !== 0) ? 1 / R1y : 0;
    const curvY2 = (R2y !== Infinity && R2y !== 0) ? 1 / R2y : 0;
    const sumCurvX = curvX1 + curvX2;
    const sumCurvY = curvY1 + curvY2;
    Rx = sumCurvX > 0 ? 1 / sumCurvX : Infinity;
    Ry = sumCurvY > 0 ? 1 / sumCurvY : Infinity;
    const R_prime = (Rx !== Infinity && Ry !== Infinity) ? 1 / (1/Rx + 1/Ry) : (Rx !== Infinity ? Rx : (Ry !== Infinity ? Ry : 0.025));
    
    let L_contact;
    if (geometryType === '1') L_contact = (geometryData.params?.L_bearing || 50) / 1000;
    else if (geometryType === '4') L_contact = (geometryData.params?.width_gear || 20) / 1000;
    else if (geometryData.params?.L) L_contact = geometryData.params.L / 1000;
    else L_contact = 0.02;
    
    const gasCode = appState.getAnswer('4-1-gas-code') || 'air';
    const gasData = GAS_PROPERTIES[gasCode];
    const S = 110.4;
    const mu_g = calculateGasViscosityAtTemperature(gasData.mu_g, 20, T_ambient, S);
    const p_atm = 101325;
    const rho_g = calculateGasDensityAtTemperature(gasData.rho, 20, T_ambient, p_atm);
    const p_supply = 5 * p_atm;
    
    let results = {};
    let Lambda, h0_min, U_lift, Lambda_critical, filmStable;
    let h0_aero, orificeFlow, stiffness;
    let orificeType = appState.getAnswer('4-3-orifice-type') || 'simple';
    let orificeTypes = [
        { code: 'simple', name: isEnglish ? 'Simple Orifice' : 'اورفیس ساده', desc: isEnglish ? 'Cheap, sensitive to clogging' : 'ارزان، حساس به گرفتگی' },
        { code: 'recessed', name: isEnglish ? 'Recessed Orifice' : 'اورفیس محفظه‌ای', desc: isEnglish ? 'Better stability' : 'پایداری بهتر' },
        { code: 'porous', name: isEnglish ? 'Porous Orifice' : 'اورفیس متخلخل', desc: isEnglish ? 'Most uniform flow' : 'یکنواخت‌ترین جریان' }
    ];
    
    if (isGasDynamic) {
        const h0_design = 10e-6;
        Lambda = (6 * mu_g * U * R_prime) / (p_atm * h0_design * h0_design);
        Lambda_critical = 0.5;
        filmStable = Lambda > Lambda_critical;
        h0_min = R_prime * Math.sqrt(Lambda_critical);
        const K_factor = 0.8;
        U_lift = (p_atm * h0_design) / (6 * mu_g * K_factor * R_prime);
        
        results = {
            regime: 'gas_dynamic',
            Lambda: Lambda,
            Lambda_critical: Lambda_critical,
            filmStable: filmStable,
            h0_min: h0_min * 1e6,
            U_lift: U_lift,
            U_actual: U,
            liftMargin: U / U_lift,
            h0_design: h0_design * 1e6
        };
        
    } else if (isAerostatic) {
        const R_pad = 0.02;
        const R0 = 0.01;
        const Cd = 0.7;
        const A_o = Math.PI * Math.pow(0.00015, 2);
        const p_r = p_supply * 0.9;
        const Q_m3s = Cd * A_o * Math.sqrt(2 * rho_g * (p_supply - p_r));
        
        const h0_m = Math.pow((3 * Q_m3s * mu_g * Math.log(R_pad / R0)) / (Math.PI * (p_r - p_atm)), 1/3);
        h0_aero = h0_m * 1e6;
        orificeFlow = Q_m3s * 1000 * 60;
        
        const A_eff = Math.PI * Math.pow(R_pad, 2);
        stiffness = (p_r - p_atm) * A_eff / h0_m;
        
        const orificeCdMap = {
            'simple': 0.6,
            'recessed': 0.7,
            'porous': 0.85
        };
        
        const Cd_actual = orificeCdMap[orificeType] || 0.7;
        const Q_actual = Cd_actual * A_o * Math.sqrt(2 * rho_g * (p_supply - p_r));
        
        results = {
            regime: 'aerostatic',
            h0: h0_aero,
            orificeFlow: orificeFlow,
            stiffness: stiffness / 1e6,
            p_supply: p_supply / p_atm,
            p_recess: p_r / p_atm,
            Q_actual: Q_actual * 1000 * 60,
            orificeType: orificeType,
            R_pad_mm: R_pad * 1000,
            R0_mm: R0 * 1000
        };
    }
    
    appState.setAnswer('4-3-gas-results', results);
    
    let contentHTML = '';
    
    if (isGasDynamic) {
        const statusColor = filmStable ? '#2E7D32' : '#EF6C00';
        const statusBg = filmStable ? '#E8F5E9' : '#FFF3E0';
        const statusText = filmStable ? (isEnglish ? '✅ Stable' : '✅ پایدار') : (isEnglish ? '⚠️ Unstable' : '⚠️ ناپایدار');
        const liftStatus = results.liftMargin > 1.5 ? (isEnglish ? '✅ Safe' : '✅ ایمن') : (isEnglish ? '⚠️ Check' : '⚠️ بررسی کنید');
        
        contentHTML = `
            <div class="result-panel">
                <h3>🔄 ${isEnglish ? 'Gas Dynamic Bearing Analysis' : 'تحلیل یاتاقان گاز دینامیک'}</h3>
                <div class="result-grid">
                    <div class="result-item highlight">
                        <span class="label">Λ — ${isEnglish ? 'Bearing Number' : 'عدد یاتاقان'}</span>
                        <span class="value">${Lambda ? Lambda.toFixed(3) : '—'}</span>
                    </div>
                    <div class="result-item" style="background: ${statusBg};">
                        <span class="label">${isEnglish ? 'Film Stability' : 'پایداری فیلم'}</span>
                        <span class="value" style="color: ${statusColor};">${statusText} (Λ ${Lambda ? '>' : '<'} ${Lambda_critical})</span>
                    </div>
                    <div class="result-item">
                        <span class="label">h<sub>0,min</sub> — ${isEnglish ? 'Min Stable Film' : 'حداقل فیلم پایدار'}</span>
                        <span class="value">${h0_min ? h0_min.toFixed(2) : '—'} µm</span>
                    </div>
                    <div class="result-item">
                        <span class="label">U<sub>lift</sub> — ${isEnglish ? 'Lift-off Speed' : 'سرعت بلند شدن'}</span>
                        <span class="value">${U_lift ? U_lift.toFixed(3) : '—'} m/s</span>
                    </div>
                    <div class="result-item" style="${results.liftMargin > 1.5 ? 'background: #E8F5E9;' : 'background: #FFF3E0;'}">
                        <span class="label">U<sub>actual</sub> / U<sub>lift</sub></span>
                        <span class="value" style="${results.liftMargin > 1.5 ? 'color: #2E7D32;' : 'color: #EF6C00;'}">
                            ${results.liftMargin ? results.liftMargin.toFixed(2) : '—'} — ${liftStatus}
                        </span>
                    </div>
                    <div class="result-item">
                        <span class="label">${isEnglish ? 'Design Film Thickness' : 'ضخامت فیلم طراحی'}</span>
                        <span class="value">${results.h0_design ? results.h0_design.toFixed(1) : '—'} µm</span>
                    </div>
                </div>
            </div>
            ${!filmStable ? `
                <div class="alert alert-warning">
                    ⚠️ ${isEnglish ? 
                        `Lambda (${Lambda ? Lambda.toFixed(3) : '—'}) is below critical (${Lambda_critical}). Film may be unstable.` :
                        `عدد یاتاقان (${Lambda ? Lambda.toFixed(3) : '—'}) کمتر از حد بحرانی (${Lambda_critical}) است. فیلم ممکن است ناپایدار باشد.`}
                </div>
            ` : `
                <div class="alert alert-success">
                    ✅ ${isEnglish ? 
                        `Lambda (${Lambda ? Lambda.toFixed(3) : '—'}) is above critical (${Lambda_critical}). Film is stable.` :
                        `عدد یاتاقان (${Lambda ? Lambda.toFixed(3) : '—'}) بالای حد بحرانی (${Lambda_critical}) است. فیلم پایدار است.`}
                </div>
            `}
            ${results.liftMargin < 1.5 ? `
                <div class="alert alert-warning">
                    ⚠️ ${isEnglish ? 
                        `U_actual / U_lift = ${results.liftMargin ? results.liftMargin.toFixed(2) : '—'} < 1.5 — Risk of contact at start.` :
                        `نسبت سرعت واقعی به سرعت بلند شدن = ${results.liftMargin ? results.liftMargin.toFixed(2) : '—'} < 1.5 — خطر تماس در استارت وجود دارد.`}
                </div>
            ` : ''}
        `;
        
    } else if (isAerostatic) {
        const orificeName = orificeTypes.find(o => o.code === orificeType)?.name || (isEnglish ? 'Unknown' : 'نامشخص');
        
        contentHTML = `
            <div class="result-panel">
                <h3>💨 ${isEnglish ? 'Aerostatic Bearing Analysis' : 'تحلیل یاتاقان ایرواستاتیک'}</h3>
                <div class="result-grid">
                    <div class="result-item highlight">
                        <span class="label">h<sub>0</sub> — ${isEnglish ? 'Film Thickness' : 'ضخامت فیلم'}</span>
                        <span class="value">${results.h0 ? results.h0.toFixed(2) : '—'} µm</span>
                    </div>
                    <div class="result-item">
                        <span class="label">Q — ${isEnglish ? 'Orifice Flow' : 'دبی اورفیس'}</span>
                        <span class="value">${results.orificeFlow ? results.orificeFlow.toFixed(2) : '—'} L/min</span>
                    </div>
                    <div class="result-item">
                        <span class="label">k — ${isEnglish ? 'Bearing Stiffness' : 'سفتی یاتاقان'}</span>
                        <span class="value">${results.stiffness ? results.stiffness.toFixed(1) : '—'} N/µm</span>
                    </div>
                    <div class="result-item">
                        <span class="label">${isEnglish ? 'Orifice Type' : 'نوع اورفیس'}</span>
                        <span class="value">${orificeName}</span>
                    </div>
                    <div class="result-item">
                        <span class="label">P<sub>supply</sub></span>
                        <span class="value">${results.p_supply ? results.p_supply.toFixed(1) : '—'} bar</span>
                    </div>
                    <div class="result-item">
                        <span class="label">P<sub>recess</sub></span>
                        <span class="value">${results.p_recess ? results.p_recess.toFixed(1) : '—'} bar</span>
                    </div>
                </div>
            </div>
        `;
        
        contentHTML += `
            <div class="formula-panel" style="margin-top: 16px;">
                <h4>🔧 ${isEnglish ? 'Orifice Selection' : 'انتخاب اورفیس'}</h4>
                <div class="options-list" id="orifice-options">
                    ${orificeTypes.map(o => `
                        <label class="option-card ${o.code === orificeType ? 'selected' : ''}" data-value="${o.code}">
                            <input type="radio" name="orifice-type" value="${o.code}" ${o.code === orificeType ? 'checked' : ''}>
                            <div class="option-content">
                                <div class="option-text">
                                    <strong>${o.name}</strong>
                                    <span>${o.desc}</span>
                                </div>
                            </div>
                            <div class="option-radio"></div>
                        </label>
                    `).join('')}
                </div>
                <button id="recalc-orifice" class="btn btn-secondary" style="margin-top: 12px;">
                    ${isEnglish ? 'Recalculate with selected orifice' : 'محاسبه مجدد با اورفیس انتخاب شده'}
                </button>
            </div>
        `;
    }
    
    container.innerHTML = `
        <div class="question-card">
            <div class="question-header">
                <span class="question-number">${isEnglish ? 'Question 4-3' : '۴-۳'}</span>
                <span class="question-tag tag-auto">${isEnglish ? 'Gas Film Analysis' : 'تحلیل فیلم گاز'}</span>
            </div>
            <h2 class="question-title">
                ${isGasDynamic ? (isEnglish ? 'Gas Dynamic Bearing Analysis' : 'تحلیل یاتاقان گاز دینامیک') : 
                  isAerostatic ? (isEnglish ? 'Aerostatic Bearing Analysis' : 'تحلیل یاتاقان ایرواستاتیک') : 
                  (isEnglish ? 'Gas Bearing Analysis' : 'تحلیل یاتاقان گازی')}
            </h2>
            <p class="question-description">
                ${isEnglish ? 
                    `Gas lubricant: <strong>${isEnglish ? gasData.name_en : gasData.name}</strong> | Regime: ${isGasDynamic ? 'Dynamic' : 'Aerostatic'}` :
                    `روانکار گازی: <strong>${isEnglish ? gasData.name_en : gasData.name}</strong> | رژیم: ${isGasDynamic ? 'دینامیک' : 'ایرواستاتیک'}`}
            </p>
            
            ${contentHTML}
            
            <div class="alert alert-info" style="margin-top: 16px;">
                ℹ️ ${isEnglish ? 
                    `For gas bearings, the λ ratio is not applicable. The analysis focuses on bearing number (Λ) and lift-off speed for dynamic, or film thickness and stiffness for aerostatic.` :
                    `برای یاتاقان‌های گازی، نسبت λ کاربرد ندارد. تحلیل بر روی عدد یاتاقان (Λ) و سرعت بلند شدن برای دینامیک، یا ضخامت فیلم و سفتی برای ایرواستاتیک متمرکز است.`}
            </div>
            
            <div style="margin-top: 20px; padding: 16px; background: #fff; border: 1px solid var(--border-light); border-radius: var(--radius-md);">
                <p style="font-weight: 600; margin-bottom: 12px;">
                    ${isEnglish ? 'Do you confirm this analysis?' : 'آیا این تحلیل را تأیید می‌کنید؟'}
                </p>
                <div style="display: flex; gap: 12px;">
                    <button id="btn-confirm" class="btn btn-primary" style="flex: 1;">
                        ✅ ${isEnglish ? 'Yes, I confirm' : 'بله، تأیید می‌کنم'}
                    </button>
                </div>
            </div>
            
            <div class="action-bar">
                <button id="back-btn" class="btn btn-secondary">${isEnglish ? 'Back' : 'بازگشت'}</button>
            </div>
        </div>
    `;
    
    document.getElementById('back-btn')?.addEventListener('click', () => {
        window.dispatchEvent(new CustomEvent('navigate', { 
            detail: { question: '4-2' } 
        }));
    });
    
    document.getElementById('btn-confirm')?.addEventListener('click', () => {
        appState.setAnswer('4-3-gas-completed', true);
        appState.currentQuestion = '4-3';
        window.dispatchEvent(new CustomEvent('navigate', { 
            detail: { question: '4-7' } 
        }));
    });
    
    document.getElementById('recalc-orifice')?.addEventListener('click', () => {
        const selectedRadio = document.querySelector('input[name="orifice-type"]:checked');
        if (selectedRadio) {
            const newOrifice = selectedRadio.value;
            appState.setAnswer('4-3-orifice-type', newOrifice);
            renderQuestion4_3_gas(container);
        }
    });
}