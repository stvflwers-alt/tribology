import appState from '../../state.js';
import router from '../../router.js';
export function renderQuestion4_3_solid(container) {
    const t = (key, params = {}) => appState.t(key, params);
    const isEnglish = appState.language === 'en';
    const lubricantCode = appState.getAnswer('4-1-lubricant-code') || 'mos2';
    const solidLubeMethod = appState.getAnswer('3-7b') || '1';
    const solidLubeData = {
        'mos2': {
            name: isEnglish ? 'MoS₂ (Molybdenum Disulfide)' : 'MoS₂ (مولیبدن دی‌سولفید)',
            icon: '💎',
            mu: '0.002 – 0.10',
            T_max: isEnglish ? '400°C (in air) / 1100°C (in vacuum)' : '۴۰۰°C (در هوا) / ۱۱۰۰°C (در خلأ)',
            thickness: '3-10 µm',
            life: isEnglish ? 'Depends on application method' : 'بستگی به روش اعمال',
            page: '414-418'
        },
        'graphite': {
            name: isEnglish ? 'Graphite' : 'گرافیت (Graphite)',
            icon: '🖤',
            mu: '0.05 – 0.20',
            T_max: isEnglish ? '500°C (non-oxidizing)' : '۵۰۰°C (غیر اکسیدی)',
            thickness: '5-15 µm',
            life: isEnglish ? 'Depends on environmental humidity' : 'بستگی به رطوبت محیط',
            page: '418-421'
        },
        'ptfe': {
            name: 'PTFE',
            icon: '⬜',
            mu: '0.04 – 0.10',
            T_max: isEnglish ? '260°C' : '۲۶۰°C',
            thickness: '10-50 µm',
            life: isEnglish ? 'Limited life — requires renewal' : 'عمر محدود — نیاز به تجدید',
            page: '421-423'
        },
        'soft_metal': {
            name: isEnglish ? 'Soft Metal Coating (Ag, Au, Pb, In)' : 'پوشش نرم فلزی (Ag, Au, Pb, In)',
            icon: '🥇',
            mu: '0.10 – 0.30',
            T_max: isEnglish ? 'Depends on metal' : 'بستگی به فلز',
            thickness: '1-10 µm',
            life: isEnglish ? 'Suitable for high load' : 'مناسب بار بالا',
            page: '421-423'
        }
    };
    const methodNames = {
        '1': isEnglish ? 'Spraying — 3-10 µm' : 'اسپری (Spraying) — ۳-۱۰ µm',
        '2': isEnglish ? 'Brushing — 5-15 µm' : 'براش (Brushing) — ۵-۱۵ µm',
        '3': isEnglish ? 'Dip coating — 5-20 µm' : 'غوطه‌وری (Dip coating) — ۵-۲۰ µm',
        '4': isEnglish ? 'Burnishing — 1-5 µm' : 'مالش (Burnishing) — ۱-۵ µm',
        '5': isEnglish ? 'Sputtering — ~0.2 µm' : 'اسپاترینگ (Sputtering) — ~۰.۲ µm',
        '6': isEnglish ? 'Ion-plating — 1-3 µm' : 'یون-پلیتینگ (Ion-plating) — ۱-۳ µm'
    };
    const lubeInfo = solidLubeData[lubricantCode] || solidLubeData['mos2'];
    const thicknessMap = {
        '1': isEnglish ? '3-10 µm' : '۳-۱۰ µm',
        '2': isEnglish ? '5-15 µm' : '۵-۱۵ µm',
        '3': isEnglish ? '5-20 µm' : '۵-۲۰ µm',
        '4': isEnglish ? '1-5 µm' : '۱-۵ µm',
        '5': isEnglish ? '~0.2 µm' : '~۰.۲ µm',
        '6': isEnglish ? '1-3 µm' : '۱-۳ µm'
    };
    const estimatedThickness = thicknessMap[solidLubeMethod] || (isEnglish ? '3-10 µm' : '۳-۱۰ µm');
    appState.setAnswer('4-3-lambda', null);
    appState.setAnswer('4-3-h0', null);
    appState.setAnswer('4-3-regime', 'solid');
    container.innerHTML = `
        <div class="question-card">
            <div class="question-header">
                <span class="question-number">${isEnglish ? 'Question 4-3' : '۴-۳'}</span>
                <span class="question-tag tag-conditional">${isEnglish ? 'Solid Lubricant' : 'روانکار جامد'}</span>
            </div>
            <h2 class="question-title">${isEnglish ? 'Solid Lubricant Analysis' : 'تحلیل روانکار جامد'}</h2>
            <p class="question-description">
                ${isEnglish ? 'Solid lubricant has been selected. Lubricant film analysis (h₀ and λ) is not defined for solid lubricants.' : 'روانکار جامد انتخاب شده است. تحلیل فیلم روانکار (h₀ و λ) برای روانکار جامد تعریف نمی‌شود.'}
            </p>
            <div class="result-panel" style="border: 2px solid var(--primary-navy);">
                <h3>${lubeInfo.icon} ${lubeInfo.name}</h3>
                <div class="result-grid">
                    <div class="result-item">
                        <span class="label">μ — ${isEnglish ? 'Friction Coefficient' : 'ضریب اصطکاک'}</span>
                        <span class="value">${lubeInfo.mu}</span>
                    </div>
                    <div class="result-item">
                        <span class="label">T<sub>max</sub> — ${isEnglish ? 'Maximum Temperature' : 'حداکثر دما'}</span>
                        <span class="value">${lubeInfo.T_max}</span>
                    </div>
                    <div class="result-item">
                        <span class="label">${isEnglish ? 'Estimated Film Thickness' : 'ضخامت فیلم (تخمینی)'}</span>
                        <span class="value">${estimatedThickness}</span>
                    </div>
                    <div class="result-item">
                        <span class="label">${isEnglish ? 'Estimated Film Life' : 'عمر تخمینی فیلم'}</span>
                        <span class="value">${lubeInfo.life}</span>
                    </div>
                    <div class="result-item">
                        <span class="label">${isEnglish ? 'Application Method' : 'روش اعمال'}</span>
                        <span class="value">${methodNames[solidLubeMethod] || (isEnglish ? 'Unknown' : 'نامشخص')}</span>
                    </div>
                </div>
            </div>
            <div class="alert alert-info" style="margin-top: 16px;">
                "${isEnglish ? 'The durability of solid lubricant film strongly depends on its application method.' : 'دوام فیلم روانکار جامد به شدت به روش اعمال آن بستگی دارد.'}"
            </div>
            <div style="margin-top: 20px; padding: 16px; background: #fff; border: 1px solid var(--border-light); border-radius: var(--radius-md);">
                <p style="font-weight: 600; margin-bottom: 12px;">${isEnglish ? 'Do you confirm these values?' : 'آیا این مقادیر را تأیید می‌کنید؟'}</p>
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
        window.dispatchEvent(new CustomEvent('navigate', { 
            detail: { question: '4-1' } 
        }));
    });
    document.getElementById('btn-confirm').addEventListener('click', () => {
        appState.currentQuestion = '4-3-solid';
        window.dispatchEvent(new CustomEvent('navigate', { 
            detail: { question: '4-7' } 
        }));
    });
    document.getElementById('btn-edit').addEventListener('click', () => {
        window.dispatchEvent(new CustomEvent('navigate', { 
            detail: { question: '4-1' } 
        }));
    });
}