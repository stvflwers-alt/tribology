import appState from '../../state.js';

export function renderQuestion4_13(container) {
    const t = (key, params = {}) => appState.t(key, params);
    const isEnglish = appState.language === 'en';
    const regime = appState.getAnswer('3-2')?.recommendedSystem;
    const isGas = [7, 8].includes(regime);

    if (isGas) {
        container.innerHTML = `
            <div class="question-card">
                <div class="question-header">
                    <span class="question-number">${isEnglish ? 'Question 4-13' : '۴-۱۳'}</span>
                    <span class="question-tag tag-info">${isEnglish ? 'Not Applicable' : 'قابل اجرا نیست'}</span>
                </div>
                <h2 class="question-title">${isEnglish ? 'Replacement and Maintenance Intervals' : 'فواصل تعویض و نگهداری'}</h2>
                <div class="alert alert-info" style="margin: 16px 0;">
                    ℹ️ ${isEnglish ? 
                        'Gas lubricants do not require oil or filter replacement. Maintenance focuses on gas supply system (compressor, filters, dryer).' :
                        'روانکارهای گازی نیازی به تعویض روغن یا فیلتر ندارند. نگهداری بر روی سیستم تأمین گاز (کمپرسور، فیلترها، خشک‌کن) متمرکز است.'}
                </div>
                <div class="result-panel" style="border: 2px solid var(--blue-standard); background: #E3F2FD;">
                    <h3>✅ ${isEnglish ? 'Maintenance Requirements' : 'نیازمندی‌های نگهداری'}</h3>
                    <ul style="padding-right: 20px; margin: 8px 0;">
                        <li>${isEnglish ? 'Check gas compressor and filters regularly' : 'بررسی منظم کمپرسور و فیلترهای گاز'}</li>
                        <li>${isEnglish ? 'Monitor gas pressure and flow rate' : 'پایش فشار و دبی گاز'}</li>
                        <li>${isEnglish ? 'Check gas dryer and moisture content' : 'بررسی خشک‌کن گاز و میزان رطوبت'}</li>
                        <li>${isEnglish ? 'Replace gas filters according to manufacturer schedule' : 'تعویض فیلترهای گاز طبق برنامه سازنده'}</li>
                    </ul>
                </div>
                <div class="action-bar">
                    <button id="back-btn" class="btn btn-secondary">${isEnglish ? 'Back' : 'بازگشت'}</button>
                    <button id="next-btn" class="btn btn-primary">${isEnglish ? 'Continue' : 'ادامه'}</button>
                </div>
            </div>
        `;

        document.getElementById('back-btn')?.addEventListener('click', () => {
            window.dispatchEvent(new CustomEvent('navigate', { detail: { question: '4-12' } }));
        });

        document.getElementById('next-btn')?.addEventListener('click', () => {
            appState.currentQuestion = '4-13';
            window.dispatchEvent(new CustomEvent('navigate', { detail: { question: '4-14' } }));
        });

        return;
    }

    let baseOilChange = 3000;
    let baseFilterChange = 1500;

    if (regime === 2) {
        baseOilChange = 5000;
        baseFilterChange = 2500;
    } else if (regime === 3) {
        baseOilChange = 2000;
        baseFilterChange = 1000;
    } else if (regime === 9) {
        baseOilChange = 4380;
        baseFilterChange = 0;
    } else if (regime === 10) {
        baseOilChange = 1500;
        baseFilterChange = 500;
    }

    let reductionOil = 1.0;
    let reductionFilter = 1.0;
    const factors = [];

    if (appState.getFlag('FLASH_TEMP_EXCEEDED')) {
        reductionOil *= 0.5;
        reductionFilter *= 0.5;
        factors.push(isEnglish ? 'High contact temperature → 50% reduction' : 'دمای بالای تماس ← کاهش ۵۰٪');
    }

    if (appState.getFlag('WEAR_SYNERGISM_DETECTED')) {
        reductionOil *= 0.3;
        reductionFilter *= 0.3;
        factors.push(isEnglish ? 'Active wear particles (Synergism) → 70% reduction' : 'ذرات سایشی فعال (Synergism) ← کاهش ۷۰٪');
    }

    const contaminants = appState.getAnswer('2-13') || [];

    if (contaminants.includes('2') || contaminants.includes('5')) {
        reductionOil *= 0.7;
        reductionFilter *= 0.7;
        factors.push(isEnglish ? 'Particle contamination → 30% reduction' : 'آلودگی ذرات ← کاهش ۳۰٪');
    }

    if (contaminants.includes('3')) {
        reductionOil *= 0.7;
        reductionFilter *= 0.7;
        factors.push(isEnglish ? 'Water contamination → 30% reduction' : 'آلودگی آب ← کاهش ۳۰٪');
    }

    if (!appState.getFlag('OIL_ANALYSIS_AVAILABLE')) {
        reductionOil *= 0.8;
        factors.push(isEnglish ? 'No oil analysis → 20% reduction (conservative)' : 'بدون آنالیز روغن ← کاهش ۲۰٪ (محافظه‌کارانه)');
    }

    const feValue = appState.getAnswer('4-16-fe') || 0;
    const cuValue = appState.getAnswer('4-16-cu') || 0;

    if (feValue > 100 || cuValue > 50) {
        reductionOil *= 0.6;
        reductionFilter *= 0.6;
        factors.push(isEnglish ? 'Heavy metals (Cu/Fe) as oxidation catalysts → 40% reduction' : 'فلزات سنگین (مس/آهن) به عنوان کاتالیزور اکسیداسیون ← کاهش ۴۰٪');
    }

    const finalOil = Math.round(baseOilChange * reductionOil);
    const finalFilter = baseFilterChange > 0 ? Math.round(baseFilterChange * reductionFilter) : null;

    appState.setAnswer('4-13-oil-change', finalOil);
    appState.setAnswer('4-13-filter-change', finalFilter);
    appState.setAnswer('4-13-factors', factors);

    container.innerHTML = `
        <div class="question-card">
            <div class="question-header">
                <span class="question-number">${isEnglish ? 'Question 4-13' : '۴-۱۳'}</span>
                <span class="question-tag tag-auto">${isEnglish ? 'Replacement Intervals' : 'فواصل تعویض'}</span>
            </div>
            <h2 class="question-title">${isEnglish ? 'Replacement and Maintenance Intervals' : 'فواصل تعویض و نگهداری'}</h2>
            <p class="question-description">
                ${isEnglish ? 'Based on operating conditions and the reference book, the following replacement intervals are recommended.' : 'بر اساس شرایط عملیاتی و کتاب، فواصل تعویض زیر پیشنهاد می‌شود.'}
            </p>
            <div class="result-panel">
                <h3>📅 ${isEnglish ? 'Replacement Schedule' : 'برنامه تعویض'}</h3>
                <table class="report-table">
                    <thead>
                        <tr>
                            <th>${isEnglish ? 'Item' : 'مورد'}</th>
                            <th>${isEnglish ? 'Base Interval' : 'فاصله پایه'}</th>
                            <th>${isEnglish ? 'Final Interval' : 'فاصله نهایی'}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>${isEnglish ? 'Lubricant Replacement' : 'تعویض روانکار'}</strong></td>
                            <td>${baseOilChange} ${isEnglish ? 'hours' : 'ساعت'}</td>
                            <td><strong style="color: #1565C0;">${finalOil} ${isEnglish ? 'hours' : 'ساعت'}</strong></td>
                        </tr>
                        ${finalFilter ? `
                        <tr>
                            <td><strong>${isEnglish ? 'Filter Replacement' : 'تعویض فیلتر'}</strong></td>
                            <td>${baseFilterChange} ${isEnglish ? 'hours' : 'ساعت'}</td>
                            <td><strong style="color: #1565C0;">${finalFilter} ${isEnglish ? 'hours' : 'ساعت'}</strong></td>
                        </tr>
                        ` : ''}
                    </tbody>
                </table>
            </div>
            ${factors.length > 0 ? `
            <div class="alert alert-warning" style="margin-top: 16px;">
                <strong>⚠️ ${isEnglish ? 'Reducing Factors:' : 'عوامل کاهش‌دهنده:'}</strong>
                <ul style="margin-top: 8px; padding-right: 20px;">
                    ${factors.map(f => `<li>${f}</li>`).join('')}
                </ul>
            </div>
            ` : ''}
            <div class="alert alert-info" style="margin-top: 16px;">
                <strong>📋 ${isEnglish ? 'Book Recommendations:' : 'توصیه کتاب:'}</strong>
                <ul style="margin-top: 8px; padding-right: 20px;">
                    <li>${isEnglish ? 'Replacement intervals should be adjusted based on periodic oil analysis (TAN, TBN, particles)' : 'فواصل تعویض باید بر اساس آنالیز دوره‌ای روغن (TAN، TBN، ذرات) تنظیم شود'}</li>
                    <li>${isEnglish ? 'If TBN has decreased or TAN has increased, immediate replacement is necessary' : 'اگر TBN کاهش یافته یا TAN افزایش یافته باشد، تعویض فوری لازم است'}</li>
                    <li>${isEnglish ? 'If metal particles are observed in oil analysis, reduce the replacement interval' : 'در صورت مشاهده ذرات فلزی در آنالیز روغن، فاصله تعویض را کاهش دهید'}</li>
                </ul>
            </div>
            <div class="action-bar">
                <button id="back-btn" class="btn btn-secondary">${isEnglish ? 'Back' : 'بازگشت'}</button>
                <button id="next-btn" class="btn btn-primary">${isEnglish ? 'Continue' : 'ادامه'}</button>
            </div>
        </div>
    `;

    document.getElementById('back-btn').addEventListener('click', () => {
        window.dispatchEvent(new CustomEvent('navigate', {
            detail: { question: '4-12' }
        }));
    });

    document.getElementById('next-btn').addEventListener('click', () => {
        appState.currentQuestion = '4-13';
        window.dispatchEvent(new CustomEvent('navigate', {
            detail: { question: '4-14' }
        }));
    });
}