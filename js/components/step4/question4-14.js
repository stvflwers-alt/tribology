import appState from '../../state.js';
import router from '../../router.js';
export function renderQuestion4_14(container) {
    const t = (key, params = {}) => appState.t(key, params);
    const isEnglish = appState.language === 'en';
    const lubricantCode = appState.getAnswer('4-1-lubricant-code') || 'mineral';
    const lubricantName = appState.getAnswer('4-1-lubricant-name') || (isEnglish ? 'Unknown' : 'نامشخص');
    const additives = appState.getAnswer('4-11-additives') || [];
    const hasEP = additives.some(a => a.name.includes('EP') || a.name.includes('EP'));
    const part1Code = appState.getAnswer('2-1') || '1';
    const part2Code = appState.getAnswer('2-2') || '2';
    const partNames = {
        '1': isEnglish ? 'Gear' : 'چرخ‌دنده',
        '2': isEnglish ? 'Shaft' : 'شفت',
        '3': isEnglish ? 'Ball/Roller' : 'ساچمه/غلتک',
        '4': isEnglish ? 'Cam' : 'بادامک',
        '5': isEnglish ? 'Surface' : 'سطح',
        '6': isEnglish ? 'Seal' : 'کاسه نمد',
        '7': isEnglish ? 'Piston' : 'پیستون',
        '8': isEnglish ? 'Disc' : 'دیسک',
        '9': isEnglish ? 'Wheel' : 'چرخ',
        '10': isEnglish ? 'Blade' : 'تیغه',
        '11': isEnglish ? 'Bar/Rod' : 'میله',
        '12': isEnglish ? 'Wire Rope' : 'سیم بکسل',
        '13': isEnglish ? 'Impeller' : 'پروانه',
        '14': isEnglish ? 'Part' : 'قطعه'
    };
    const materialMap = {
        '1': { name: isEnglish ? 'Alloy Steel' : 'فولاد آلیاژی', risk: 'none' },
        '2': { name: isEnglish ? 'Steel' : 'فولاد', risk: 'none' },
        '3': { name: isEnglish ? 'Bearing Steel' : 'فولاد بلبرینگ', risk: 'none' },
        '4': { name: isEnglish ? 'Hardened Steel' : 'فولاد سخت‌کاری شده', risk: 'none' },
        '5': { name: isEnglish ? 'Steel/Cast Iron' : 'فولاد/چدن', risk: 'none' },
        '6': { name: isEnglish ? 'NBR/Steel' : 'NBR/فولاد', risk: 'seal' },
        '7': { name: isEnglish ? 'Aluminum/Steel' : 'آلومینیوم/فولاد', risk: 'aluminum' },
        '8': { name: isEnglish ? 'Cast Iron' : 'چدن', risk: 'none' },
        '9': { name: isEnglish ? 'Steel' : 'فولاد', risk: 'none' },
        '10': { name: isEnglish ? 'Tool Steel' : 'فولاد ابزار', risk: 'none' },
        '11': { name: isEnglish ? 'Steel' : 'فولاد', risk: 'none' },
        '12': { name: isEnglish ? 'Steel' : 'فولاد', risk: 'none' },
        '13': { name: isEnglish ? 'Bronze/Brass' : 'برنز/برنج', risk: 'bronze' },
        '14': { name: isEnglish ? 'Unknown' : 'نامشخص', risk: 'unknown' }
    };
    const part1Material = materialMap[part1Code] || { name: isEnglish ? 'Unknown' : 'نامشخص', risk: 'unknown' };
    const part2Material = materialMap[part2Code] || { name: isEnglish ? 'Unknown' : 'نامشخص', risk: 'unknown' };
    const incompatibilities = [];
    if ((part1Material.risk === 'bronze' || part2Material.risk === 'bronze') && hasEP) {
        incompatibilities.push({
            part: part1Material.risk === 'bronze' ? partNames[part1Code] : partNames[part2Code],
            material: isEnglish ? 'Bronze/Brass' : 'برنز/برنج',
            issue: isEnglish ? 'Active sulfur EP additive — Corrosion risk' : 'EP گوگردی فعال — خطر خوردگی',
            page: '91-92',
            severity: 'high'
        });
    }
    if ((part1Material.risk === 'aluminum' || part2Material.risk === 'aluminum')) {
        incompatibilities.push({
            part: part1Material.risk === 'aluminum' ? partNames[part1Code] : partNames[part2Code],
            material: isEnglish ? 'Aluminum' : 'آلومینیوم',
            issue: isEnglish ? 'Sensitivity to high TAN — Acidic corrosion' : 'حساسیت به TAN بالا — خوردگی اسیدی',
            page: '87',
            severity: 'medium'
        });
    }
    if ((part1Material.risk === 'seal' || part2Material.risk === 'seal') && 
        ['pao', 'ester'].includes(lubricantCode)) {
        incompatibilities.push({
            part: isEnglish ? 'Seal' : 'کاسه نمد',
            material: 'NBR',
            issue: isEnglish ? 'Incompatibility with PAO/Ester — Swelling/Shrinkage' : 'ناسازگاری با PAO/استر — تورم/انقباض',
            page: '57',
            severity: 'high'
        });
    }
    const hasIncompatibility = incompatibilities.length > 0;
    if (hasIncompatibility) appState.setFlag('MATERIAL_INCOMPATIBILITY', true);
    // Helper function to get status text
    const getStatusText = (risk, hasEP) => {
        if (risk === 'bronze' && hasEP) return isEnglish ? '⚠️ Incompatible' : '⚠️ ناسازگار';
        if (risk === 'aluminum') return isEnglish ? '⚠️ Caution' : '⚠️ احتیاط';
        return isEnglish ? '✅ Compatible' : '✅ سازگار';
    };
    container.innerHTML = `
        <div class="question-card">
            <div class="question-header">
                <span class="question-number">${isEnglish ? 'Question 4-14' : '۴-۱۴'}</span>
                <span class="question-tag tag-auto">${isEnglish ? 'Compatibility' : 'سازگاری'}</span>
            </div>
            <h2 class="question-title">${isEnglish ? 'Lubricant Compatibility with Part Materials' : 'سازگاری روانکار با جنس قطعات'}</h2>
            <div class="result-panel">
                <h3>🔍 ${isEnglish ? 'Compatibility Check' : 'بررسی سازگاری'}</h3>
                <table class="report-table">
                    <thead>
                        <tr>
                            <th>${isEnglish ? 'Part' : 'قطعه'}</th>
                            <th>${isEnglish ? 'Material' : 'جنس'}</th>
                            <th>${isEnglish ? 'Lubricant/Additive' : 'روانکار/افزودنی'}</th>
                            <th>${isEnglish ? 'Status' : 'وضعیت'}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>${partNames[part1Code] || (isEnglish ? 'Part 1' : 'قطعه ۱')}</span></td>
                            <td>${part1Material.name}</span></td>
                            <td>${lubricantName}</span></td>
                            <td>${getStatusText(part1Material.risk, hasEP)}</span></td>
                        </tr>
                        <tr>
                            <td>${partNames[part2Code] || (isEnglish ? 'Part 2' : 'قطعه ۲')}</span></td>
                            <td>${part2Material.name}</span></td>
                            <td>${lubricantName}</span></td>
                            <td>${getStatusText(part2Material.risk, hasEP)}</span></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            ${hasIncompatibility ? `
            <div class="alert alert-danger" style="margin-top: 16px;">
                <strong>⚠️ ${isEnglish ? 'One or more incompatibilities found:' : 'یک یا چند مورد ناسازگار یافت شد:'}</strong>
                ${incompatibilities.map(inc => `
                    <div style="margin-top: 8px; padding: 8px; background: #fff; border-radius: 4px;">
                        <strong>${inc.part} (${inc.material}):</strong> ${inc.issue}
                        <br><small>📖 ${isEnglish ? 'Book, page' : 'کتاب، صفحه'} ${inc.page}</small>
                    </div>
                `).join('')}
                <p style="margin-top: 12px;">
                    ${isEnglish ? 'It is recommended to return to Question 4-1 and change the lubricant, or modify the additive package (4-11).' : 'توصیه می‌شود به سوال ۴-۱ بازگردید و روانکار را تغییر دهید، یا بسته افزودنی (۴-۱۱) را اصلاح کنید.'}
                </p>
            </div>
            ` : `
            <div class="alert alert-success" style="margin-top: 16px;">
                ✅ ${isEnglish ? 'All items are compatible.' : 'تمام موارد سازگار هستند.'}
            </div>
            `}
            <div class="action-bar">
                <button id="back-btn" class="btn btn-secondary">${isEnglish ? 'Back' : 'بازگشت'}</button>
                <button id="next-btn" class="btn btn-primary">${isEnglish ? 'Continue' : 'ادامه'}</button>
            </div>
        </div>
    `;
    document.getElementById('back-btn').addEventListener('click', () => {
        window.dispatchEvent(new CustomEvent('navigate', { detail: { question: '4-13' } }));
    });
    document.getElementById('next-btn').addEventListener('click', () => {
        appState.currentQuestion = '4-14';
        window.dispatchEvent(new CustomEvent('navigate', { detail: { question: '4-15' } }));
    });
}