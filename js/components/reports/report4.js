import appState from '../../state.js';

export function renderReport4(container) {
    const t = (key, params = {}) => appState.t(key, params);
    const isEnglish = appState.language === 'en';
    const route = appState.getAnswer('1-1');
    const regime = appState.getAnswer('3-2')?.recommendedSystem;
    const isGas = [7, 8].includes(regime);

    const routeNames = {
        '1': t('summary.routeDesign') || (isEnglish ? 'Design' : 'طراحی'),
        '2': t('summary.routeTroubleshooting') || (isEnglish ? 'Troubleshooting' : 'عیب‌یابی'),
        '3': t('summary.routeMonitoring') || (isEnglish ? 'Monitoring' : 'پایش')
    };
    const routeIcons = { '1': '✏️', '2': '🔧', '3': '📊' };
    const routeColors = { '1': '#1565C0', '2': '#EF6C00', '3': '#2E7D32' };

    let lubricantName = appState.getAnswer('4-1-lubricant-name') || (isEnglish ? 'Unknown' : 'نامشخص');
    const lubricantCode = appState.getAnswer('4-1-lubricant-code') || 'unknown';
    const isoGrade = appState.getAnswer('4-10-grade') || appState.getAnswer('4-2-iso-grade') || '—';
    const eta0 = appState.getAnswer('4-2-eta0');
    const alpha = appState.getAnswer('4-2-alpha');
    const rho0 = appState.getAnswer('4-2-rho0') || 850;
    const vi = appState.getAnswer('4-2-vi') || '—';
    const tMax = appState.getAnswer('4-2-t_max') || '—';
    const methodUsed = appState.getAnswer('4-2-method-used') || '—';
    const isNonNewtonian = appState.getAnswer('4-2-grease-method') === 'precise' || false;

    let systemNameDisplay = appState.getAnswer('3-2')?.systemName || (isEnglish ? 'Unknown' : 'نامشخص');

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

        const systemNameMap = {
            'گاز دینامیک': 'Gas Dynamic',
            'ایرواستاتیک': 'Aerostatic',
            'هیدرودینامیک': 'Hydrodynamic',
            'هیدرواستاتیک': 'Hydrostatic',
            'EHL': 'EHL',
            'روانکاری مرزی': 'Boundary Lubrication',
            'روانکار جامد': 'Solid Lubricant',
            'هیبریدی': 'Hybrid',
            'گریس': 'Grease',
            'امولسیون': 'Emulsion'
        };
        systemNameDisplay = systemNameMap[systemNameDisplay] || systemNameDisplay;
    }

    const methodNames = {
        'precise': isEnglish ? '🔬 Precise (Vogel + So & Klaus)' : '🔬 دقیق (وگل + سو و کلاوس)',
        'estimated': isEnglish ? '📊 Estimated (ISO VG)' : '📊 تخمینی (ISO VG)',
        'manual': isEnglish ? '✏️ Manual' : '✏️ دستی',
        'grease_simple': isEnglish ? '🧴 Grease — Simple (Newtonian)' : '🧴 گریس — تحلیل ساده (تقریب نیوتنی)',
        'grease_precise': isEnglish ? '🧴 Grease — Precise (Herschel-Bulkley)' : '🧴 گریس — تحلیل دقیق (مدل هرشل-بالکلی)',
        'gas': isEnglish ? '💨 Gas Lubricant' : '💨 روانکار گازی',
        'gas_manual': isEnglish ? '💨 Gas Lubricant (Manual)' : '💨 روانکار گازی (دستی)'
    };

    const filmData = appState.getAnswer('4-3-film-data') || {};
    const gasResults = appState.getAnswer('4-3-gas-results') || {};
    const contactData = appState.getAnswer('3-0') || {};
    const E_prime = contactData.E_prime_GPa || '—';
    const lambda = filmData.lambda;
    const h0_um = filmData.h0_um;
    const sigma_um = filmData.sigma_um;
    const regimeName = filmData.regimeName || '—';
    const formulaName = filmData.formulaName || '—';
    const k = filmData.k || '—';
    const R_prime_mm = filmData.R_prime_mm || '—';

    let filmRegimeDisplay = regimeName;
    let h0Display = h0_um ? h0_um.toFixed(3) + ' µm' : '—';
    let lambdaDisplay = lambda ? lambda.toFixed(2) : '—';
    let sigmaDisplay = sigma_um ? sigma_um.toFixed(3) + ' µm' : '—';
    let kDisplay = k;
    let RDisplay = R_prime_mm !== '—' && R_prime_mm ? R_prime_mm.toFixed(2) + ' mm' : '—';
    let filmStatusDisplay = filmData.lambdaDesc || '—';

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
        kDisplay = isEnglish ? 'N/A (Gas)' : 'N/A (گازی)';
        RDisplay = isEnglish ? 'N/A (Gas)' : 'N/A (گازی)';
    }

    const cavitation = appState.getAnswer('4-4');
    let cavitationDisplay = '—';
    if (cavitation === 'none') cavitationDisplay = isEnglish ? '✅ None' : '✅ هیچ‌کدام';
    else if (cavitation === 'cavitation') cavitationDisplay = isEnglish ? '🕳️ Cavitation' : '🕳️ کاویتاسیون';
    else if (cavitation === 'oil_whirl') cavitationDisplay = isEnglish ? '🌀 Oil Whirl' : '🌀 گرداب روغن';
    else if (cavitation === 'both') cavitationDisplay = isEnglish ? '⚠️ Both' : '⚠️ هر دو';

    const flashData = appState.getAnswer('4-5-flash-data') || {};
    const Tf_max = flashData.Tf_max;
    const T_contact = flashData.T_contact;
    const T_ambient = flashData.T_ambient || 25;
    const tempExceeded = flashData.tempExceeded || appState.getFlag('FLASH_TEMP_EXCEEDED');
    const meltingRisk = flashData.meltingRisk || appState.getFlag('MELTING_RISK');

    let tempStatus = isEnglish ? '✅ Normal' : '✅ نرمال';
    let tempStatusColor = '#2E7D32';
    if (tempExceeded) {
        tempStatus = isEnglish ? '⚠️ Warning' : '⚠️ هشدار';
        tempStatusColor = '#EF6C00';
    }
    if (meltingRisk) {
        tempStatus = isEnglish ? '🔴 Critical' : '🔴 بحرانی';
        tempStatusColor = '#C62828';
    }

    const psi = appState.getAnswer('4-6-psi');
    const deflectionNeeded = appState.getFlag('DEFLECTION_NEEDED');
    const needExperimental = appState.getFlag('NEED_EXPERIMENTAL');
    const mismatchRegime = appState.getFlag('MISMATCH_REGIME');

    const calcType = appState.getAnswer('4-9-calc-type');
    const P_supply = appState.getAnswer('4-9-P-supply');
    const Q_m3s = appState.getAnswer('4-9-Q');
    const Q_Lmin = Q_m3s ? Q_m3s * 1000 * 60 : null;
    const tankVolume = appState.getAnswer('4-9-tank-volume');
    const P_actual = appState.getAnswer('4-9-P-actual');
    const Q_actual = appState.getAnswer('4-9-Q-actual');

    const calcTypeNames = {
        'formula': isEnglish ? '🟢 Analytical Formula' : '🟢 فرمول تحلیلی',
        'chart': isEnglish ? '🟡 Raimondi-Boyd Chart' : '🟡 نمودار Raimondi-Boyd',
        'hydrostatic': isEnglish ? '🟢 Hydrostatic Formula' : '🟢 فرمول هیدرواستاتیک',
        'aerostatic': isEnglish ? '🟢 Aerostatic Formula' : '🟢 فرمول ایرواستاتیک',
        'gas_dynamic': isEnglish ? '🟢 Gas Dynamic Formula' : '🟢 فرمول گاز دینامیک',
        'numerical': isEnglish ? '🔴 Numerical Analysis' : '🔴 تحلیل عددی',
        'empirical': isEnglish ? '🟢 Empirical Estimate' : '🟢 تخمین تجربی'
    };

    const additives = appState.getAnswer('4-11-additives') || [];
    let rootCause = appState.getAnswer('4-15-root-cause-text') || (isEnglish ? 'Unknown' : 'نامشخص');

    if (isEnglish) {
        const causeMap = {
            'دمای بالا': 'High Temperature',
            'بار بیش از حد': 'Overload',
            'کمبود روانکار': 'Lack of Lubricant',
            'آلودگی': 'Contamination',
            'سایش': 'Wear',
            'خوردگی': 'Corrosion',
            'ناشناخته': 'Unknown',
            'نامشخص': 'Unknown',
            'خطای مونتاژ': 'Assembly Error'
        };
        rootCause = causeMap[rootCause] || rootCause;
    }

    const sealMaterial = appState.getAnswer('4-17-seal') || (isEnglish ? 'Unknown' : 'نامشخص');

    let sealCompatibility;
    if (isGas) {
        sealCompatibility = isEnglish ? '✅ Compatible' : '✅ سازگار';
    } else {
        const sealCompatMap = {
            'NBR': ['mineral'],
            'FKM': ['mineral', 'pao'],
            'EPDM': ['pag'],
            'PTFE': ['mineral', 'pao', 'ester', 'pag', 'silicone']
        };
        const isCompatible = sealCompatMap[sealMaterial]?.includes(lubricantCode);
        if (sealMaterial === 'unknown') {
            sealCompatibility = isEnglish ? 'Unknown' : 'نامشخص';
        } else {
            sealCompatibility = isCompatible ? (isEnglish ? '✅ Compatible' : '✅ سازگار') : (isEnglish ? '⚠️ Incompatible' : '⚠️ ناسازگار');
        }
    }

    const oilMix = appState.getAnswer('4-18');
    const oilMixNames = {
        'mix': isEnglish ? '🔀 Mixed' : '🔀 مخلوط می‌شود',
        'flush': isEnglish ? '🧹 Flushed' : '🧹 شستشو',
        'new': isEnglish ? '🆕 New System' : '🆕 سیستم جدید'
    };

    const materialIncompatibility = appState.getFlag('MATERIAL_INCOMPATIBILITY');
    const oilChangeInterval = appState.getAnswer('4-13-oil-change') || '—';
    const filterInterval = appState.getAnswer('4-13-filter-change') || '—';
    const analysisInterval = isEnglish ? 'Every 500 hours or monthly' : 'هر ۵۰۰ ساعت یا ماهانه';
    const systemData = appState.getAnswer('3-2') || {};

    const allFlags = [];
    if (appState.getFlag('FLASH_TEMP_EXCEEDED')) allFlags.push({ key: isEnglish ? 'Critical Flash Temperature' : 'دمای فلش بحرانی', type: 'critical' });
    if (appState.getFlag('CAVITATION_DETECTED')) allFlags.push({ key: isEnglish ? 'Cavitation Detected' : 'کاویتاسیون تشخیص داده شد', type: 'warning' });
    if (appState.getFlag('OIL_WHIRL_DETECTED')) allFlags.push({ key: isEnglish ? 'Oil Whirl Detected' : 'گرداب روغن تشخیص داده شد', type: 'warning' });
    if (appState.getFlag('DEFLECTION_NEEDED')) allFlags.push({ key: isEnglish ? 'Deformation Analysis Required' : 'نیاز به تحلیل تغییر شکل', type: 'warning' });
    if (appState.getFlag('NEED_EXPERIMENTAL')) allFlags.push({ key: isEnglish ? 'Experimental Measurement Required' : 'نیاز به اندازه‌گیری تجربی', type: 'warning' });
    if (appState.getFlag('MISMATCH_REGIME')) allFlags.push({ key: isEnglish ? 'Mechanism Mismatch' : 'عدم تطابق مکانیزم', type: 'critical' });
    if (appState.getFlag('MATERIAL_INCOMPATIBILITY')) allFlags.push({ key: isEnglish ? 'Material Incompatibility' : 'ناسازگاری مواد', type: 'critical' });
    if (appState.getFlag('LUBRICANT_TYPE_MISMATCH')) allFlags.push({ key: isEnglish ? 'Lubricant Type Mismatch' : 'عدم تطابق روانکار', type: 'warning' });

    const now = new Date();
    const dateStr = now.toLocaleDateString(isEnglish ? 'en-US' : 'fa-IR', {
        year: 'numeric', month: 'long', day: 'numeric',
        hour: '2-digit', minute: '2-digit'
    });
    const answeredCount = appState.getAnsweredCount();

    container.innerHTML = `
        <div class="report-container" id="report4-printable">
            <div style="text-align: center; margin-bottom: 32px; padding-bottom: 24px; border-bottom: 2px solid var(--border-light);">
                <div style="font-size: 2.5rem; margin-bottom: 8px;">🛢️</div>
                <h1 style="font-size: 1.6rem; color: var(--primary-navy); margin-bottom: 4px;">
                    ${isEnglish ? 'Step 4 Report: Lubricant Selection & Management' : 'گزارش گام ۴: انتخاب و مدیریت روانکار'}
                </h1>
                <p class="report-subtitle" style="color: ${routeColors[route] || '#666'}; font-size: 1.1rem;">
                    ${routeIcons[route] || '📌'} ${isEnglish ? 'Route:' : 'مسیر:'} ${routeNames[route] || (isEnglish ? 'Unknown' : 'نامشخص')}
                </p>
                <div class="report-meta" style="justify-content: center; gap: 24px;">
                    <span>📅 ${dateStr}</span>
                    <span>❓ ${answeredCount} ${isEnglish ? 'questions answered' : 'سوال پاسخ‌داده‌شده'}</span>
                    <span>🏷️ v1.0.0</span>
                </div>
            </div>

            <div class="report-section">
                <h3>${isEnglish ? '1. 🛢️ Selected Lubricant' : '۱. 🛢️ روانکار انتخاب‌شده'}</h3>
                <table class="report-table">
                    <tbody>
                        <tr><td style="width: 40%;"><strong>${isEnglish ? 'Lubricant Type' : 'نوع روانکار'}</strong></td>
                            <td>${getLubricantIcon(lubricantCode)} ${lubricantName}</td>
                        </tr>
                        <tr><td><strong>${isEnglish ? 'Viscosity Grade' : 'گرید ویسکوزیته'}</strong></td>
                            <td>${isGas ? (isEnglish ? 'N/A (Gas)' : 'N/A (گازی)') : (isoGrade !== '—' ? 'ISO VG ' + isoGrade : '—')}</td>
                        </tr>
                        <tr><td><strong>η₀ — ${isEnglish ? 'Dynamic Viscosity' : 'ویسکوزیته دینامیکی'}</strong></td>
                            <td>${eta0 ? eta0.toExponential(3) : '—'} Pa·s</td>
                        </tr>
                        <tr><td><strong>α — ${isEnglish ? 'Pressure-Viscosity Coefficient' : 'ضریب فشار-ویسکوزیته'}</strong></td>
                            <td>${alpha ? alpha.toExponential(2) : '—'} Pa⁻¹</td>
                        </tr>
                        <tr><td><strong>VI — ${isEnglish ? 'Viscosity Index' : 'شاخص ویسکوزیته'}</strong></td>
                            <td>${vi}</td>
                        </tr>
                        <tr><td><strong>T_max — ${isEnglish ? 'Maximum Allowable Temperature' : 'دمای حداکثر مجاز'}</strong></td>
                            <td>${tMax !== '—' ? tMax + ' °C' : '—'}</td>
                        </tr>
                        <tr><td><strong>ρ₀ — ${isEnglish ? 'Density' : 'چگالی'}</strong></td>
                            <td>${rho0 ? rho0.toFixed(0) : '—'} kg/m³</td>
                        </tr>
                        <tr><td><strong>${isEnglish ? 'Non-Newtonian Behavior' : 'رفتار غیرنیوتنی'}</strong></td>
                            <td>${isNonNewtonian ? (isEnglish ? 'Yes (Herschel-Bulkley)' : 'بله (هرشل-بالکلی)') : (isEnglish ? 'No (Newtonian)' : 'خیر (نیوتنی)')}</td>
                        </tr>
                        <tr><td><strong>${isEnglish ? 'Calculation Method' : 'روش محاسبه'}</strong></td>
                            <td>${methodNames[methodUsed] || methodUsed}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="report-section">
                <h3>${isEnglish ? '2. 🔬 Lubricant Film Analysis' : '۲. 🔬 تحلیل فیلم روانکار'}</h3>
                <table class="report-table">
                    <tbody>
                        <tr><td style="width: 40%;"><strong>E' — ${isEnglish ? 'Reduced Modulus' : 'مدول کاهش‌یافته'}</strong></td>
                            <td>${E_prime !== '—' ? Number(E_prime).toFixed(2) + ' GPa' : '—'}</td>
                        </tr>
                        <tr><td><strong>R' — ${isEnglish ? 'Equivalent Radius of Curvature' : 'شعاع انحنای معادل'}</strong></td>
                            <td>${RDisplay}</td>
                        </tr>
                        <tr><td><strong>k — ${isEnglish ? 'Ellipticity Parameter' : 'پارامتر بیضوی'}</strong></td>
                            <td>${kDisplay}</td>
                        </tr>
                        <tr><td><strong>${isEnglish ? 'Lubrication Regime' : 'رژیم روانکاری'}</strong></td>
                            <td>${filmRegimeDisplay}</td>
                        </tr>
                        <tr><td><strong>${isEnglish ? 'Formula Used' : 'فرمول استفاده‌شده'}</strong></td>
                            <td style="font-size: 0.85rem;">${formulaName}</td>
                        </tr>
                        <tr style="background: #E8F5E9;">
                            <td><strong>h₀ — ${isEnglish ? 'Minimum Film Thickness' : 'حداقل ضخامت فیلم'}</strong></td>
                            <td><strong>${h0Display}</strong></td>
                        </tr>
                        <tr><td><strong>σ — ${isEnglish ? 'Combined Roughness' : 'زبری ترکیبی'}</strong></td>
                            <td>${sigmaDisplay}</td>
                        </tr>
                        <tr style="background: ${getLambdaColor(lambda)};">
                            <td><strong>λ = h₀ / σ</strong></td>
                            <td><strong style="font-size: 1.2rem;">${lambdaDisplay}</strong></td>
                        </tr>
                        <tr><td><strong>${isEnglish ? 'Film Status' : 'وضعیت فیلم'}</strong></td>
                            <td>${filmStatusDisplay}</td>
                        </tr>
                    </tbody>
                </table>

                <div style="margin-top: 16px;">
                    <h4 style="margin-bottom: 8px;">📊 ${isEnglish ? 'λ Ratio Interpretation' : 'تفسیر نسبت λ'}</h4>
                    <table class="report-table">
                        <thead><tr><th>λ ${isEnglish ? 'Range' : 'محدوده'}</th><th>${isEnglish ? 'Film Status' : 'وضعیت فیلم'}</th><th>${isEnglish ? 'Interpretation' : 'تفسیر'}</th></tr></thead>
                        <tbody>
                            <tr><td>λ < 1</td><td>${isEnglish ? 'Boundary' : 'مرزی (Boundary)'}</td><td>${isEnglish ? 'Solid contact — Severe wear' : 'تماس جامد — سایش شدید'}</td></tr>
                            <tr><td>1 ≤ λ < 1.5</td><td>${isEnglish ? 'Surface Distress' : 'ناراحتی سطحی'}</td><td>${isEnglish ? 'Risk of pitting' : 'احتمال پیتینگ'}</td></tr>
                            <tr><td>1.5 ≤ λ < 3</td><td>${isEnglish ? 'Mixed Lubrication' : 'مختلط (Mixed)'}</td><td>${isEnglish ? 'Usually healthy performance' : 'عملکرد معمولاً سالم'}</td></tr>
                            <tr><td>3 ≤ λ < 4</td><td>${isEnglish ? 'Full EHL' : 'فیلم کامل (Full EHL)'}</td><td>${isEnglish ? 'Negligible wear' : 'سایش ناچیز'}</td></tr>
                            <tr><td>λ ≥ 4</td><td>${isEnglish ? 'Full Safe EHL' : 'فیلم کامل و مطمئن'}</td><td>${isEnglish ? 'EHL performance guaranteed' : 'عملکرد EHL تضمین شده'}</td></tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div class="report-section">
                <h3>${isEnglish ? '3. ⚠️ Destructive Phenomena & Advanced Analysis' : '۳. ⚠️ پدیده‌های مخرب و تحلیل‌های پیشرفته'}</h3>
                <table class="report-table">
                    <tbody>
                        <tr><td style="width: 40%;"><strong>${isEnglish ? 'Cavitation/Oil Whirl' : 'کاویتاسیون/گرداب روغن'}</strong></td>
                            <td>${cavitationDisplay}</td>
                        </tr>
                        <tr><td><strong>T_ambient — ${isEnglish ? 'Ambient Temperature' : 'دمای محیط'}</strong></td>
                            <td>${T_ambient} °C</td>
                        </tr>
                        <tr><td><strong>T_f,max — ${isEnglish ? 'Flash Temperature' : 'دمای فلش'}</strong></td>
                            <td>${Tf_max ? Tf_max.toFixed(1) + ' °C' : '— °C'}</td>
                        </tr>
                        <tr style="${tempExceeded ? 'background: #FFEBEE;' : meltingRisk ? 'background: #FFF3E0;' : 'background: #E8F5E9;'}">
                            <td><strong>T_contact — ${isEnglish ? 'Actual Contact Temperature' : 'دمای واقعی تماس'}</strong></td>
                            <td style="color: ${tempStatusColor}; font-weight: 700;">
                                ${T_contact ? T_contact.toFixed(1) + ' °C' : '— °C'}
                                ${tempExceeded ? ' ⚠️' : meltingRisk ? ' 🌡️' : ' ✅'}
                            </td>
                        </tr>
                        <tr><td><strong>${isEnglish ? 'Temperature Status' : 'وضعیت دمایی'}</strong></td>
                            <td style="color: ${tempStatusColor};">${tempStatus}</td>
                        </tr>
                        <tr><td><strong>ψ — ${isEnglish ? 'Plasticity Index' : 'شاخص پلاستیسیته'}</strong></td>
                            <td>${psi ? psi.toFixed(3) : '—'} ${psi > 0.6 ? '⚠️ > 0.6' : ''}</td>
                        </tr>
                        <tr><td><strong>${isEnglish ? 'Deformation Analysis Required' : 'نیاز به تحلیل تغییر شکل'}</strong></td>
                            <td>${deflectionNeeded ? (isEnglish ? '⚠️ Yes' : '⚠️ بله') : (isEnglish ? '✅ No' : '✅ خیر')}</td>
                        </tr>
                        <tr><td><strong>${isEnglish ? 'Experimental Measurement Required' : 'نیاز به اندازه‌گیری تجربی'}</strong></td>
                            <td>${needExperimental ? (isEnglish ? '⚠️ Recommended' : '⚠️ توصیه می‌شود') : (isEnglish ? '✅ Not necessary' : '✅ ضروری نیست')}</td>
                        </tr>
                        <tr><td><strong>${isEnglish ? 'Mechanism Match with Ideal System' : 'تطابق مکانیزم با سیستم ایده‌آل'}</strong></td>
                            <td>${mismatchRegime ? (isEnglish ? '⚠️ Mismatch' : '⚠️ عدم تطابق') : (isEnglish ? '✅ Match' : '✅ تطابق دارد')}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="report-section">
                <h3>${isEnglish ? '4. 🔩 Lubricant Supply System' : '۴. 🔩 سیستم تأمین روانکار'}</h3>
                <table class="report-table">
                    <tbody>
                        <tr><td style="width: 40%;"><strong>${isEnglish ? 'Lubrication System' : 'سیستم روانکاری'}</strong></td>
                            <td>${systemNameDisplay}</td>
                        </tr>
                        <tr><td><strong>${isEnglish ? 'Calculation Type' : 'نوع محاسبه'}</strong></td>
                            <td>${calcTypeNames[calcType] || '—'}</td>
                        </tr>
                        <tr><td><strong>P_supply — ${isEnglish ? 'Supply Pressure (Calculated)' : 'فشار تأمین (محاسبه‌شده)'}</strong></td>
                            <td>${P_supply ? P_supply.toFixed(1) + ' bar' : '—'}</td>
                        </tr>
                        <tr><td><strong>Q_supply — ${isEnglish ? 'Supply Flow Rate (Calculated)' : 'دبی تأمین (محاسبه‌شده)'}</strong></td>
                            <td>${Q_Lmin ? Q_Lmin.toFixed(2) + ' L/min' : '—'}</td>
                        </tr>
                        ${P_actual ? `
                        <tr><td><strong>P_actual — ${isEnglish ? 'Actual Pressure' : 'فشار واقعی'}</strong></td>
                            <td>${P_actual.toFixed(1)} bar</td>
                        </tr>
                        ` : ''}
                        ${Q_actual ? `
                        <tr><td><strong>Q_actual — ${isEnglish ? 'Actual Flow Rate' : 'دبی واقعی'}</strong></td>
                            <td>${Q_actual.toFixed(2)} L/min</td>
                        </tr>
                        ` : ''}
                        <tr><td><strong>${isEnglish ? 'Pressure Status' : 'وضعیت فشار'}</strong></td>
                            <td class="${getPressureStatusClass(P_supply, P_actual, isEnglish)}">${getPressureStatusText(P_supply, P_actual, isEnglish)}</td>
                        </tr>
                        <tr><td><strong>${isEnglish ? 'Recommended Tank Volume' : 'حجم مخزن پیشنهادی'}</strong></td>
                            <td>${tankVolume ? '≈ ' + tankVolume.toFixed(0) + ' L' : '—'}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            ${additives.length > 0 ? `
            <div class="report-section">
                <h3>${isEnglish ? '5. 🧪 Additive Package' : '۵. 🧪 بسته افزودنی'}</h3>
                <table class="report-table">
                    <thead><tr><th>${isEnglish ? 'Additive' : 'افزودنی'}</th><th>${isEnglish ? 'Reason' : 'دلیل'}</th></tr></thead>
                    <tbody>
                        ${additives.map(a => `<tr><td>${a.name}</td><td>${a.reason}</td></tr>`).join('')}
                    </tbody>
                </table>
            </div>
            ` : ''}

            <div class="report-section">
                <h3>${isEnglish ? '6. 📅 Compatibility & Maintenance' : '۶. 📅 نگهداری و سازگاری'}</h3>
                <table class="report-table">
                    <tbody>
                        <tr><td style="width: 40%;"><strong>${isEnglish ? 'Tank Volume / Grease Quantity' : 'حجم مخزن / مقدار گریس'}</strong></td>
                            <td>${tankVolume ? '≈ ' + tankVolume.toFixed(0) + ' L' : '—'}</td>
                        </tr>
                        <tr><td><strong>${isEnglish ? 'Lubricant Replacement Interval' : 'فواصل تعویض روانکار'}</strong></td>
                            <td><strong>${oilChangeInterval} ${isEnglish ? 'hours' : 'ساعت'}</strong></td>
                        </tr>
                        ${filterInterval && filterInterval !== '—' ? `
                        <tr><td><strong>${isEnglish ? 'Filter Replacement Interval' : 'فواصل تعویض فیلتر'}</strong></td>
                            <td><strong>${filterInterval} ${isEnglish ? 'hours' : 'ساعت'}</strong></td>
                        </tr>
                        ` : ''}
                        <tr><td><strong>${isEnglish ? 'Oil Analysis Interval' : 'فواصل آنالیز روغن'}</strong></td>
                            <td>${analysisInterval}</td>
                        </tr>
                        <tr><td><strong>${isEnglish ? 'Material Compatibility' : 'سازگاری با قطعات'}</strong></td>
                            <td>${materialIncompatibility ? (isEnglish ? '⚠️ Incompatible' : '⚠️ ناسازگار') : (isEnglish ? '✅ Compatible' : '✅ سازگار')}</td>
                        </tr>
                        <tr><td><strong>${isEnglish ? 'Seal Compatibility' : 'سازگاری با آب‌بند'}</strong></td>
                            <td>${sealMaterial} — ${sealCompatibility}</td>
                        </tr>
                        <tr><td><strong>${isEnglish ? 'Mixing Status' : 'وضعیت اختلاط'}</strong></td>
                            <td>${oilMixNames[oilMix] || '—'}</td>
                        </tr>
                        <tr style="background: #FFF3E0;">
                            <td><strong>${isEnglish ? 'Root Cause' : 'علت ریشه‌ای خرابی'}</strong></td>
                            <td><strong>${rootCause}</strong></td>
                        </tr>
                    </tbody>
                </table>
            </div>

            ${allFlags.length > 0 ? `
            <div class="report-section">
                <h3>🚩 ${isEnglish ? 'Active Flags' : 'پرچم‌های فعال'}</h3>
                <ul class="report-flags-list">
                    ${allFlags.map(flag => `<li class="${flag.type === 'critical' ? 'flag-critical' : 'flag-warning'}">${flag.key}</li>`).join('')}
                </ul>
            </div>
            ` : ''}

            <div style="text-align: center; margin-top: 32px; padding-top: 20px; border-top: 1px solid var(--border-light); color: var(--text-secondary); font-size: 0.85rem;">
                <p>${t('app.title')} © 2026</p>
                <p style="margin-top: 4px;">${isEnglish ? 'Step 4 Report: Lubricant Selection & Management' : 'گزارش گام ۴: انتخاب و مدیریت روانکار'} – ${dateStr}</p>
                <p style="margin-top: 8px; color: #2E7D32;">✅ ${isEnglish ? 'Analysis completed. Return to previous steps for review.' : 'تحلیل کامل شد. برای بازبینی به گام‌های قبلی مراجعه کنید.'}</p>
            </div>
        </div>

        <div class="report-action no-print" style="margin-top: 24px;">
            <button id="btn-back-step4" class="btn btn-secondary">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M9 18l6-6-6-6"/>
                </svg>
                ${isEnglish ? 'Back to Step 4' : 'بازگشت به گام ۴'}
            </button>
            <button id="btn-print-report4" class="btn btn-secondary">
                🖨️ ${isEnglish ? 'Print Report' : 'چاپ گزارش'}
            </button>
            <button id="btn-restart-analysis4" class="btn btn-secondary">
                ${isEnglish ? 'Restart' : 'شروع مجدد'}
            </button>
        </div>
    `;

    document.getElementById('btn-print-report4')?.addEventListener('click', () => {
        window.print();
    });

    document.getElementById('btn-restart-analysis4')?.addEventListener('click', () => {
        if (confirm(isEnglish ? 'Are you sure you want to restart? All progress will be lost.' : 'آیا مطمئن هستید که می‌خواهید از اول شروع کنید؟ تمام پیشرفت‌ها از بین خواهد رفت.')) {
            appState.resetAll(true);
            window.dispatchEvent(new CustomEvent('navigate', { detail: { question: '1-1' } }));
        }
    });

    document.getElementById('btn-back-step4')?.addEventListener('click', () => {
        window.dispatchEvent(new CustomEvent('navigate', {
            detail: { question: '4-20' }
        }));
    });
}

function getLubricantIcon(code) {
    const icons = {
        'mineral': '🛢️', 'pao': '🧪', 'ester': '🧬', 'pag': '💧',
        'silicone': '🔬', 'mos2': '💎', 'graphite': '🖤', 'ptfe': '⬜',
        'soft_metal': '🥇', 'air': '💨', 'nitrogen': '🫧', 'helium': '🎈',
        'argon': '🔵',
        'lithium_grease': '🧴', 'lithium_complex': '🧴', 'calcium_grease': '🧴',
        'polyurea': '🧴', 'emulsion_ow': '💧', 'emulsion_wo': '🫧', 'custom': '❓'
    };
    return icons[code] || '❓';
}

function getLambdaColor(lambda) {
    if (lambda === null || lambda === undefined) return '';
    if (lambda < 1) return 'background: #FFEBEE;';
    if (lambda < 1.5) return 'background: #FFF3E0;';
    if (lambda < 3) return 'background: #FFFDE7;';
    if (lambda < 4) return 'background: #E8F5E9;';
    return 'background: #E3F2FD;';
}

function getPressureStatusClass(P_supply, P_actual, isEnglish) {
    if (!P_actual || !P_supply) return '';
    if (P_actual < P_supply * 0.8) return 'status-warning';
    if (P_actual > P_supply * 1.2) return 'status-warning';
    return 'status-success';
}

function getPressureStatusText(P_supply, P_actual, isEnglish) {
    if (!P_actual || !P_supply) return '—';
    if (P_actual < P_supply * 0.8) return isEnglish ? '⚠️ Pressure lower than expected' : '⚠️ فشار کمتر از حد انتظار';
    if (P_actual > P_supply * 1.2) return isEnglish ? '⚠️ Pressure higher than expected' : '⚠️ فشار بیشتر از حد انتظار';
    return isEnglish ? '✅ Normal' : '✅ نرمال';
}