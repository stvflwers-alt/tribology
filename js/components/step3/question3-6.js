import appState from '../../state.js';
import router from '../../router.js';
export function renderQuestion3_6(container) {
    const translate = (text) => {
        if (appState.language !== 'en') return text;
        const translations = {
            'سوال ۳-۶': 'Question 3-6',
            'راه حل خودکار': 'Auto Solution',
            'راه‌حل‌های پیشنهادی': 'Proposed Solutions',
            'بر اساس مشکل(های) تشخیص‌داده‌شده، راه‌حل‌های زیر پیشنهاد می‌شود.': 'Based on the identified problem(s), the following solutions are recommended.',
            'راه‌حل‌های پیشنهادی ✅': 'Proposed Solutions ✅',
            'مشکلات شناسایی‌شده:': 'Identified Problems:',
            'مرتبط با:': 'Related to:',
            'بازگشت': 'Back',
            'ادامه': 'Continue',
            'قبل از انجام هرگونه تعمیرات، از خاموش بودن دستگاه اطمینان حاصل کنید.': 'Before performing any repairs, make sure the device is turned off.',
            '⚠️ هشدار ایمنی': '⚠️ Safety Warning',
            'تغییر نوع سیستم روانکاری': 'Change the type of lubrication system',
            'بررسی و اصلاح نوع روانکار و مکانیزم تحویل': 'Review and correct the lubricant type and delivery mechanism',
            'تنظیم یا تعویض پمپ': 'Adjust or replace the pump',
            'بررسی منحنی عملکرد پمپ و تنظیم فشار/دبی': 'Check pump performance curve and adjust pressure/flow rate',
            'تعویض یا تصفیه روانکار': 'Replace or purify the lubricant',
            'تخلیه کامل، شستشو و شارژ مجدد': 'Complete drain, flush and refill',
            'تعویض فیلترها': 'Replace filters',
            'تعویض المنت فیلتر و بررسی بای‌پس': 'Replace filter element and check bypass',
            'رفع نشتی': 'Fix leakage',
            'تعویض واشرها، آب‌بندها و اتصالات': 'Replace gaskets, seals and fittings',
            'افزودن مواد ضدکف': 'Add anti-foam agents',
            'استفاده از افزودنی‌های Anti-foam': 'Use anti-foam additives',
            'بهبود سیستم خنک‌کاری': 'Improve the cooling system',
            'نصب یا ارتقای مبدل حرارتی': 'Install or upgrade heat exchanger',
            'تعویض روانکار و تمیزکاری مدار': 'Replace lubricant and clean the circuit',
            'شستشوی کامل مدار': 'Complete circuit flushing',
            'انتخاب ویسکوزیته صحیح': 'Select the correct viscosity',
            'محاسبه و انتخاب گرید مناسب': 'Calculate and select the appropriate grade',
            'اصلاح مسیر برگشت': 'Correct the return path',
            'بازگشت روغن زیر سطح مایع': 'Oil return below liquid level',
            'تعویض پمپ': 'Replace pump',
            'بررسی و تعویض پمپ فرسوده': 'Check and replace worn pump',
            'تمیزکاری مسیر': 'Clean the path',
            'شستشوی لوله‌ها و شیلنگ‌های ورودی': 'Flush pipes and inlet hoses',
            'اصلاح طراحی مخزن': 'Improve tank design',
            'بهینه‌سازی حجم و مسیر برگشت': 'Optimize volume and return path',
            'بهبود آب‌بندی': 'Improve sealing',
            'ارتقای سیل‌ها و گسکت‌ها': 'Upgrade seals and gaskets',
            'افزایش دبی': 'Increase flow rate',
            'تنظیم پمپ برای دبی بالاتر': 'Adjust pump for higher flow rate',
            'بهبود خنک‌کاری': 'Improve cooling',
            'نصب خنک‌کن بین پدها': 'Install cooler between pads',
            'تعویض روانکار': 'Replace lubricant',
            'انتخاب روانکار سازگار با جنس آب‌بندها': 'Select lubricant compatible with seal material',
            'تعویض/تصفیه روانکار': 'Replace/purify lubricant',
            'حذف محصولات پلیمریزاسیون': 'Remove polymerization products',
            'انتخاب روغن با نقطه جوش بالاتر': 'Select oil with higher boiling point',
            'مکانیزم اشتباه': 'Wrong mechanism',
            'فشار یا دبی ناکافی': 'Insufficient pressure or flow rate',
            'ورودی سیال نامناسب': 'Inappropriate fluid input',
            'فیلترها گرفته شده': 'Filters are clogged',
            'نشتی': 'Leakage',
            'کف/هوا (Foaming)': 'Foam/Air (Foaming)',
            'دمای سیال بالا': 'High fluid temperature',
            'خوردگی یا رسوب‌گذاری': 'Corrosion or fouling',
            'ویسکوزیته اشتباه': 'Wrong viscosity',
            'حباب گاز محلول (Aeration)': 'Dissolved gas bubbles (Aeration)',
            'پمپ خراب یا فرسوده': 'Pump damaged or worn',
            'گرفتگی لوله‌ها یا شیلنگ‌ها': 'Pipes or hoses are clogged',
            'مخزن روغن نامناسب': 'Inappropriate oil reservoir',
            'آب‌بندی نامناسب': 'Improper sealing',
            'روغن‌کاری ناقص (Starvation)': 'Insufficient lubrication (Starvation)',
            'Hot oil carry over': 'Hot oil carry over',
            'واکنش شیمیایی با آب‌بندها': 'Chemical reaction with seals',
            'پلیمریزاسیون': 'Polymerization',
            'تبخیر روانکار': 'Lubricant evaporation'
        };
        return translations[text] || text;
    };
    const selectedProblems = appState.getAnswer('3-5') || [];
    const solutionMap = {
        1: { problem: translate('مکانیزم اشتباه'), solutions: [{ text: translate('تغییر نوع سیستم روانکاری'), desc: translate('بررسی و اصلاح نوع روانکار و مکانیزم تحویل') }] },
        2: { problem: translate('فشار یا دبی ناکافی'), solutions: [{ text: translate('تنظیم یا تعویض پمپ'), desc: translate('بررسی منحنی عملکرد پمپ و تنظیم فشار/دبی') }] },
        3: { problem: translate('ورودی سیال نامناسب'), solutions: [{ text: translate('تعویض یا تصفیه روانکار'), desc: translate('تخلیه کامل، شستشو و شارژ مجدد') }] },
        4: { problem: translate('فیلترها گرفته شده'), solutions: [{ text: translate('تعویض فیلترها'), desc: translate('تعویض المنت فیلتر و بررسی بای‌پس') }] },
        5: { problem: translate('نشتی'), solutions: [{ text: translate('رفع نشتی'), desc: translate('تعویض واشرها، آب‌بندها و اتصالات') }] },
        6: { problem: translate('کف/هوا (Foaming)'), solutions: [{ text: translate('افزودن مواد ضدکف'), desc: translate('استفاده از افزودنی‌های Anti-foam') }] },
        7: { problem: translate('دمای سیال بالا'), solutions: [{ text: translate('بهبود سیستم خنک‌کاری'), desc: translate('نصب یا ارتقای مبدل حرارتی') }] },
        8: { problem: translate('خوردگی یا رسوب‌گذاری'), solutions: [{ text: translate('تعویض روانکار و تمیزکاری مدار'), desc: translate('شستشوی کامل مدار') }] },
        9: { problem: translate('ویسکوزیته اشتباه'), solutions: [{ text: translate('انتخاب ویسکوزیته صحیح'), desc: translate('محاسبه و انتخاب گرید مناسب') }] },
        10: { problem: translate('حباب گاز محلول (Aeration)'), solutions: [{ text: translate('اصلاح مسیر برگشت'), desc: translate('بازگشت روغن زیر سطح مایع') }] },
        11: { problem: translate('پمپ خراب یا فرسوده'), solutions: [{ text: translate('تعویض پمپ'), desc: translate('بررسی و تعویض پمپ فرسوده') }] },
        12: { problem: translate('گرفتگی لوله‌ها یا شیلنگ‌ها'), solutions: [{ text: translate('تمیزکاری مسیر'), desc: translate('شستشوی لوله‌ها و شیلنگ‌های ورودی') }] },
        13: { problem: translate('مخزن روغن نامناسب'), solutions: [{ text: translate('اصلاح طراحی مخزن'), desc: translate('بهینه‌سازی حجم و مسیر برگشت') }] },
        14: { problem: translate('آب‌بندی نامناسب'), solutions: [{ text: translate('بهبود آب‌بندی'), desc: translate('ارتقای سیل‌ها و گسکت‌ها') }] },
        15: { problem: translate('روغن‌کاری ناقص (Starvation)'), solutions: [{ text: translate('افزایش دبی'), desc: translate('تنظیم پمپ برای دبی بالاتر') }] },
        16: { problem: translate('Hot oil carry over'), solutions: [{ text: translate('بهبود خنک‌کاری'), desc: translate('نصب خنک‌کن بین پدها') }] },
        17: { problem: translate('واکنش شیمیایی با آب‌بندها'), solutions: [{ text: translate('تعویض روانکار'), desc: translate('انتخاب روانکار سازگار با جنس آب‌بندها') }] },
        18: { problem: translate('پلیمریزاسیون'), solutions: [{ text: translate('تعویض/تصفیه روانکار'), desc: translate('حذف محصولات پلیمریزاسیون') }] },
        19: { problem: translate('تبخیر روانکار'), solutions: [{ text: translate('انتخاب روغن با نقطه جوش بالاتر'), desc: translate('انتخاب روغن با نقطه جوش بالاتر') }] }
    };
    const allSolutions = [];
    selectedProblems.forEach(code => {
        const mapping = solutionMap[code];
        if (mapping) {
            mapping.solutions.forEach(sol => {
                if (!allSolutions.find(s => s.text === sol.text)) {
                    allSolutions.push({ ...sol, problem: mapping.problem });
                }
            });
        }
    });
    appState.setAnswer('3-6', { problems: selectedProblems, solutions: allSolutions });
    container.innerHTML = `
        <div class="question-card">
            <div class="question-header">
                <span class="question-number">${translate('سوال ۳-۶')}</span>
                <span class="question-tag tag-auto">${translate('راه حل خودکار')}</span>
            </div>
            <h2 class="question-title">${translate('راه‌حل‌های پیشنهادی')}</h2>
            <p class="question-description">
                ${translate('بر اساس مشکل(های) تشخیص‌داده‌شده، راه‌حل‌های زیر پیشنهاد می‌شود.')}
            </p>
            <div class="solution-panel">
                <h3>✅ ${translate('راه‌حل‌های پیشنهادی')}</h3>
                ${selectedProblems.length > 0 ? `
                    <div style="margin-bottom: 16px; padding: 8px 12px; background: #FFF3E0; border-radius: 6px;">
                        <strong>${translate('مشکلات شناسایی‌شده:')}</strong> ${selectedProblems.map(code => solutionMap[code]?.problem).filter(Boolean).join('، ')}
                    </div>
                ` : ''}
                <div class="solution-list">
                    ${allSolutions.map((sol, i) => `
                        <div class="solution-item">
                            <div class="solution-number">${i + 1}</div>
                            <div class="solution-content">
                                <strong>${sol.text}</strong>
                                <p>${sol.desc}</p>
                                <small>${translate('مرتبط با:')} ${sol.problem}</small>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
            <div class="alert alert-warning">
                <strong>${translate('⚠️ هشدار ایمنی')}</strong><br>
                ${translate('قبل از انجام هرگونه تعمیرات، از خاموش بودن دستگاه اطمینان حاصل کنید.')}
            </div>
            <div class="action-bar">
                <button id="back-btn-3-6" class="btn btn-secondary">${translate('بازگشت')}</button>
                <button id="next-btn-3-6" class="btn btn-primary">${translate('ادامه')}</button>
            </div>
        </div>
    `;
    document.getElementById('back-btn-3-6').addEventListener('click', () => {
        window.dispatchEvent(new CustomEvent('navigate', { detail: { question: '3-5' } }));
    });
    document.getElementById('next-btn-3-6').addEventListener('click', () => {
        appState.currentQuestion = '3-6';
        window.dispatchEvent(new CustomEvent('navigate', { detail: { question: '3-7' } }));
    });
}