import appState from './state.js';
class Calculations {
    static calculatePriority(answer1_3_2a, answer1_3_2b) {
        if (answer1_3_2a === '1' || answer1_3_2b === '1' || 
            answer1_3_2a === '3' || answer1_3_2b === '5') {
            appState.setFlag('PRIORITY', 'CRITICAL');
            appState.setFlag('PRIORITY_NEEDS_REVIEW', 
                answer1_3_2a === '3' || answer1_3_2b === '5');
            return 'CRITICAL';
        }
        if (answer1_3_2b === '2' && answer1_3_2a !== '1') {
            appState.setFlag('PRIORITY', 'URGENT');
            return 'URGENT';
        }
        if (answer1_3_2b === '3' && answer1_3_2a !== '1') {
            appState.setFlag('PRIORITY', 'HIGH');
            return 'HIGH';
        }
        if (answer1_3_2b === '4' && answer1_3_2a === '2') {
            appState.setFlag('PRIORITY', 'STANDARD');
            return 'STANDARD';
        }
        return 'STANDARD';
    }
    static detectMotionType(answer1_2_1) {
    const isEnglish = appState.language === 'en';
    const motionMap = {
        '1': isEnglish ? 'Rolling-Sliding' : 'غلتشی-لغزشی',
        '2': isEnglish ? 'Sliding' : 'لغزشی',
        '3': isEnglish ? 'Pure Rolling' : 'غلتشی خالص',
        '4': isEnglish ? 'Rolling-Sliding' : 'غلتشی-لغزشی',
        '5': isEnglish ? 'Stationary' : 'ساکن',
        '6': isEnglish ? 'Sliding' : 'لغزشی',
        '7': isEnglish ? 'Sliding' : 'لغزشی',
        '8': isEnglish ? 'Sliding' : 'لغزشی',
        '9': isEnglish ? 'Pure Rolling' : 'غلتشی خالص',
        '10': isEnglish ? 'Sliding' : 'لغزشی',
        '11': isEnglish ? 'Sliding' : 'لغزشی',
        '12': isEnglish ? 'Pure Rolling' : 'غلتشی خالص',
        '13': isEnglish ? 'Particle movement in fluid' : 'حرکت ذرات در سیال'
    };
    return motionMap[answer1_2_1] || null;
}
    static analyzeChanges(changeData) {
        if (changeData.includes('9')) {
            appState.setFlag('CHANGE_DETECTED', false);
            return 'برنامه پایش را طبق روال ادامه دهید.';
        }
        appState.setFlag('CHANGE_DETECTED', true);
        const changeTypes = [];
        changeData.forEach(change => {
            if (change !== '9') {
                changeTypes.push({ code: change, direction: null });
            }
        });
        appState.setFlag('CHANGE_TYPES', changeTypes);
        if (changeData.includes('5')) appState.setFlag('OPERATIONAL_CHANGE', true);
        if (changeData.includes('7')) appState.setFlag('MATERIAL_CHANGE', true);
        return 'فواصل پایش را کوتاه‌تر کنید.';
    }
    static generateStep1Summary() {
        return {
            route: appState.getAnswer('1-1'),
            analysisMode: appState.getFlag('ANALYSIS_MODE'),
            priority: appState.getFlag('PRIORITY'),
            pattern: appState.getFlag('PATTERN'),
            hasOilAnalysis: appState.getFlag('OIL_ANALYSIS_AVAILABLE'),
            hasVibration: appState.getFlag('VIBRATION_AVAILABLE'),
            changesDetected: appState.getFlag('CHANGE_DETECTED'),
            timestamp: new Date().toISOString()
        };
    }
    static calculateEffectiveModulus(E1, nu1, E2, nu2) {
        if (!E1 || !E2 || nu1 === undefined || nu2 === undefined) return null;
        return 1 / ((1 - nu1 * nu1) / E1 + (1 - nu2 * nu2) / E2);
    }
    static calculateEffectiveRadius(radii) {
        const { R1x, R1y, R2x, R2y } = radii;
        if (!R1x || !R2x) return null;
        let sumCurvature = 0;
        if (R1x !== Infinity && R1x !== 0) sumCurvature += 1 / R1x;
        if (R1y !== undefined && R1y !== Infinity && R1y !== 0) sumCurvature += 1 / R1y;
        if (R2x !== Infinity && R2x !== 0) sumCurvature += 1 / R2x;
        if (R2y !== undefined && R2y !== Infinity && R2y !== 0) sumCurvature += 1 / R2y;
        return sumCurvature > 0 ? 1 / sumCurvature : null;
    }
    static calculateHertzLineContact(F, L, R, E_star) {
        if (!F || !L || !R || !E_star) return null;
        const E_star_MPa = E_star * 1000;
        const sigma_max = Math.sqrt((F * E_star_MPa) / (Math.PI * L * R));
        const a = Math.sqrt((4 * F * R) / (Math.PI * L * E_star_MPa));
        return {
            sigma_max: sigma_max,
            half_width: a,
            contact_area: 2 * a * L,
            type: 'line_contact'
        };
    }
    static calculateHertzPointContact(F, R1, R2, E_star) {
        if (!F || !R1 || !R2 || !E_star) return null;
        const E_star_MPa = E_star * 1000;
        const R_eff = 1 / ((1 / R1) + (1 / R2));
        const a = Math.pow((3 * F * R_eff) / (4 * E_star_MPa), 1/3);
        const sigma_max = (3 * F) / (2 * Math.PI * a * a);
        return {
            sigma_max: sigma_max,
            contact_radius: a,
            contact_area: Math.PI * a * a,
            type: 'point_contact'
        };
    }
    static calculateCombinedRoughness(Rq1, Rq2) {
        if (Rq1 === undefined || Rq2 === undefined) return null;
        return Math.sqrt(Rq1 * Rq1 + Rq2 * Rq2);
    }
    static calculateLambda(h_min, sigma) {
        if (!h_min || !sigma) return null;
        return h_min / sigma;
    }
    static calculateFlashTemperature(mu, F, U, L, k1, k2, T0 = 25) {
        if (!mu || !F || !U || !L || !k1 || !k2) return null;
        const L_m = L / 1000;
        const deltaT = (mu * F * Math.abs(U)) / (4 * L_m * (k1 + k2));
        return {
            deltaT: deltaT,
            T_flash: T0 + deltaT,
            T0: T0
        };
    }
    static generateStep2Summary() {
        const mechanisms = appState.getAnswer('2-8-mechanisms') || [];
        return {
            part1: appState.getAnswer('2-1'),
            part2: appState.getAnswer('2-2'),
            geometryType: appState.getAnswer('2-5'),
            mechanisms: mechanisms,
            hasSynergism: appState.getFlag('WEAR_SYNERGISM_DETECTED'),
            hasSubsurfaceCrack: appState.getFlag('SUBSURFACE_CRACK'),
            hasThermalDamage: appState.getFlag('THERMAL_DAMAGE'),
            step1Summary: this.generateStep1Summary(),
            timestamp: new Date().toISOString()
        };
    }
    static calculateEffectiveRadii(radii) {
        const { R1x, R1y, R2x, R2y } = radii;
        const toMeter = (val) => {
            if (!val || !isFinite(val) || val === 0) return Infinity;
            return val / 1000; // mm → m
        };
        const r1x = toMeter(R1x);
        const r1y = toMeter(R1y);
        const r2x = toMeter(R2x);
        const r2y = toMeter(R2y);
        const curvX1 = r1x !== Infinity ? 1 / r1x : 0;
        const curvX2 = r2x !== Infinity ? 1 / r2x : 0;
        const curvY1 = r1y !== Infinity ? 1 / r1y : 0;
        const curvY2 = r2y !== Infinity ? 1 / r2y : 0;
        const sumCurvX = curvX1 + curvX2;
        const sumCurvY = curvY1 + curvY2;
        const Rx = sumCurvX > 0 ? 1 / sumCurvX : Infinity;
        const Ry = sumCurvY > 0 ? 1 / sumCurvY : Infinity;
        let R_prime;
        if (Rx === Infinity && Ry === Infinity) {
            R_prime = Infinity;
        } else if (Rx === Infinity) {
            R_prime = Ry;
        } else if (Ry === Infinity) {
            R_prime = Rx;
        } else {
            R_prime = 1 / (1/Rx + 1/Ry);
        }
        return {
            Rx_m: Rx,
            Ry_m: Ry,
            R_prime_m: R_prime,
            Rx_mm: Rx !== Infinity ? Rx * 1000 : null,
            Ry_mm: Ry !== Infinity ? Ry * 1000 : null,
            R_prime_mm: R_prime !== Infinity ? R_prime * 1000 : null
        };
    }
    static calculateEllipticityParameter(Rx, Ry) {
        if (Rx === Infinity || Ry === Infinity) return Infinity;
        if (Rx === 0 || Ry === 0) return 1;
        const ratio = Ry / Rx;
        if (ratio > 100) return Infinity; // تماس خطی
        if (ratio < 0.01) return 0; // حالت معکوس
        return 1.0339 * Math.pow(ratio, 0.636);
    }
    static calculateDimensionlessParams(params) {
        const { eta0, U, E_prime, R_prime, alpha, F } = params;
        if (!eta0 || !U || !E_prime || !R_prime || !alpha || !F) {
            return { U_dim: null, G: null, W: null };
        }
        const U_dim = (eta0 * U) / (E_prime * R_prime);
        const G = alpha * E_prime;
        const W = F / (E_prime * R_prime * R_prime);
        return { U_dim, G, W };
    }
    static detectLubricationRegime(U_dim, G, W) {
        if (!U_dim || !G || !W) return { code: 'unknown', name: 'نامشخص', Gv: null, GE: null };
        const Gv = (U_dim * U_dim) / (G * Math.pow(W, 3));
        const GE = (U_dim * U_dim) / Math.pow(W, 8/3);
        let code, name;
        if (Gv < 0.1 && GE < 0.1) {
            code = 'IR';
            name = 'ایزوویسکوز-صلب (Isoviscous-Rigid)';
        } else if (Gv > 0.1 && GE < 0.1) {
            code = 'PR';
            name = 'پیزوویسکوز-صلب (Piezoviscous-Rigid)';
        } else if (Gv < 0.1 && GE > 0.1) {
            code = 'IE';
            name = 'ایزوویسکوز-الاستیک (Isoviscous-Elastic)';
        } else {
            code = 'PE';
            name = 'پیزوویسکوز-الاستیک — EHL (Piezoviscous-Elastic)';
        }
        return { code, name, Gv, GE };
    }
    static calculateH0Grubin(params) {
        const { R_prime, eta0, U, alpha, F, L, E_prime } = params;
        if (!R_prime || !eta0 || !U || !alpha || !F || !L || !E_prime) return null;
        const term1 = Math.pow((eta0 * U * alpha) / R_prime, 0.727);
        const term2 = Math.pow(F / (L * E_prime * R_prime), -0.0909);
        const h0 = R_prime * 1.657 * term1 * term2;
        return h0; // متر
    }
    static calculateH0HamrockDowson(params) {
        const { R_prime, U_dim, G, W, k } = params;
        if (!R_prime || !U_dim || !G || !W || k === undefined) return null;
        if (k === Infinity) return null;
        const term1 = Math.pow(U_dim, 0.68);
        const term2 = Math.pow(G, 0.49);
        const term3 = Math.pow(W, -0.073);
        const term4 = 1 - Math.exp(-0.68 * k);
        const h0 = R_prime * 3.63 * term1 * term2 * term3 * term4;
        return h0; // متر
    }
    static interpretLambda(lambda) {
    // Get current language from appState
    const isEnglish = appState?.language === 'en';
    if (lambda === null || lambda === undefined) {
        return { 
            status: 'unknown', 
            description: isEnglish ? 'Unknown' : 'نامشخص', 
            risk: 'unknown', 
            text: isEnglish ? 'No data available for analysis' : 'داده‌ای برای تحلیل وجود ندارد' 
        };
    }
    if (lambda < 1) {
        return {
            status: 'boundary',
            description: isEnglish ? 'Boundary' : 'مرزی (Boundary)',
            risk: 'high',
            text: isEnglish ? 'Significant solid contact — Severe wear likely' : 'سایش شدید محتمل است. روانکار نمی‌تواند سطوح را جدا کند.'
        };
    } else if (lambda < 1.5) {
        return {
            status: 'mixed_risk',
            description: isEnglish ? 'Surface Distress Zone' : 'ناحیه ناراحتی سطحی',
            risk: 'medium',
            text: isEnglish ? 'Risk of pitting and surface shine' : 'احتمال پیتینگ و درخشش سطح وجود دارد.'
        };
    } else if (lambda < 3) {
        return {
            status: 'mixed',
            description: isEnglish ? 'Mixed Lubrication' : 'مختلط (Mixed)',
            risk: 'low',
            text: isEnglish ? 'Surface shine possible — Usually healthy performance' : 'درخشش سطح ممکن است — عملکرد معمولاً سالم.'
        };
    } else if (lambda < 4) {
        return {
            status: 'full_ehl',
            description: isEnglish ? 'Full EHL' : 'فیلم کامل (Full EHL)',
            risk: 'minimal',
            text: isEnglish ? 'Complete surface separation — Negligible wear' : 'جدایش کامل سطوح — سایش ناچیز.'
        };
    } else {
        return {
            status: 'full_ehl_safe',
            description: isEnglish ? 'Full Safe EHL' : 'فیلم کامل و مطمئن',
            risk: 'none',
            text: isEnglish ? 'Full EHL performance guaranteed' : 'عملکرد EHL کامل تضمین می‌شود.'
        };
    }
}
    static calculateThermalDiffusivity(k_thermal, rho, c) {
        if (!k_thermal || !rho || !c || rho === 0 || c === 0) return null;
        return k_thermal / (rho * c);
    }
    static calculatePecletNumber(U, halfWidth, chi) {
        if (!U || !halfWidth || !chi || chi === 0) return null;
        return (U * halfWidth) / (2 * chi);
    }
    static calculateFlashTemperatureAdvanced(params) {
        const { mu, F, deltaU, k_thermal, halfWidth, L_contact, U, chi, contactType } = params;
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
    static calculateMaxFlashTemperature(Tf_A, Tf_B, T_ambient = 25) {
        if (!Tf_A || !Tf_B) {
            const Tf = Tf_A || Tf_B || 0;
            return {
                Tf_max: Tf,
                T_contact: T_ambient + Tf
            };
        }
        if (Tf_A === 0 || Tf_B === 0) {
            const Tf_max = Math.max(Tf_A, Tf_B);
            return {
                Tf_max: Tf_max,
                T_contact: T_ambient + Tf_max
            };
        }
        const Tf_max = 1 / (1/Tf_A + 1/Tf_B);
        return {
            Tf_max: Tf_max,
            T_contact: T_ambient + Tf_max
        };
    }
    static calculatePlasticityIndex(E_prime, H, sigma_star, r) {
        if (!E_prime || !H || !sigma_star || !r || H === 0 || r === 0) return null;
        return (E_prime / H) * Math.sqrt(sigma_star / r);
    }
    static calculateHydrostaticFlow(h0, p_r, eta0, R, R0) {
        if (!h0 || !p_r || !eta0 || !R || !R0 || R <= R0 || eta0 === 0) return null;
        const Q = (Math.PI * Math.pow(h0, 3) * p_r) / (6 * eta0 * Math.log(R / R0));
        return Q; // m³/s
    }
}
export default Calculations;