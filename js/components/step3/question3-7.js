import appState from '../../state.js';
import router from '../../router.js';
export function renderQuestion3_7(container) {
    const translate = (text) => {
        if (appState.language !== 'en') return text;
        const translations = {
            'سوال ۳-۷': 'Question 3-7',
            'تجهیزات تأمین': 'Supply Equipment',
            'تجهیزات تأمین روانکار': 'Lubricant Supply Equipment',
            'بر اساس سیستم روانکاری انتخاب‌شده:': 'Based on the selected lubrication system:',
            'تجهیزات تأمین زیر مورد نیاز است:': 'The following supply equipment is required:',
            'بازگشت': 'Back',
            'ادامه': 'Continue',
            // تجهیزات سیستم هیدرودینامیک (سیستم 1)
            'پمپ دنده‌ای یا گریز از مرکز': 'Gear pump or centrifugal pump',
            'تأمین جریان پیوسته روغن': 'Continuous oil flow supply',
            'فیلتر ۱۰-۲۵ میکرون': 'Filter 10-25 micron',
            'جلوگیری از ورود ذرات به یاتاقان‌ها': 'Prevent particle entry into bearings',
            'مخزن با حجم مناسب': 'Tank with appropriate volume',
            'زمان اقامت کافی برای جدایش هوا و خنک‌کاری': 'Sufficient residence time for air separation and cooling',
            'خنک‌کن روغن (در صورت نیاز)': 'Oil cooler (if needed)',
            'برای بارهای بالا یا سرعت زیاد': 'For high loads or high speeds',
            // تجهیزات سیستم هیدرواستاتیک (سیستم 2)
            'پمپ فشار بالا': 'High pressure pump',
            'تأمین فشار ثابت و بالا': 'Constant high pressure supply',
            'فیلترهای دقیق ≤ ۵ میکرون': 'Fine filters ≤ 5 micron',
            'حفاظت از یاتاقان‌های بسیار کم': 'Protection of very small bearings',
            'مخزن تحت فشار': 'Pressurized tank',
            'حفظ فشار در استارت و شرایط اضطراری': 'Pressure maintenance during start and emergency conditions',
            'کاهنده‌های جریان': 'Flow reducers',
            'تنظیم دقیق جریان هر پد': 'Precise flow adjustment for each pad',
            // تجهیزات سیستم EHL (سیستم 3)
            'پمپ روغن با فشار متوسط': 'Medium pressure oil pump',
            'تأمین روغن به منطقه تماس': 'Oil supply to contact area',
            'فیلتراسیون مناسب': 'Appropriate filtration',
            'با توجه به یاقی کم در تماس EHL': 'Considering low clearance in EHL contact',
            'سیستم خنک‌کاری': 'Cooling system',
            'کنترل دمای روغن ورودی': 'Inlet oil temperature control',
            // تجهیزات سیستم روانکاری مرزی (سیستم 4)
            'سیستم ساده روغن‌کاری': 'Simple lubrication system',
            'روغن‌کاری قطره‌ای یا فتیله‌ای': 'Drip or wick lubrication',
            'مخزن کوچک': 'Small tank',
            'حجم کم روغن': 'Small oil volume',
            // تجهیزات سیستم روانکار جامد (سیستم 5)
            'تجهیزات اعمال پوشش': 'Coating application equipment',
            'اسپری، براش، غوطه‌وری': 'Spraying, brushing, dipping',
            'سیستم تمیزکاری سطح': 'Surface cleaning system',
            'چربی‌گیری، سندبلاست': 'Degreasing, sandblasting',
            // تجهیزات سیستم هیبریدی (سیستم 6)
            'پمپ فشار بالا (برای استارت)': 'High pressure pump (for start)',
            'تأمین فشار هیدرواستاتیک': 'Hydrostatic pressure supply',
            'سیستم هیدرودینامیک (برای حرکت)': 'Hydrodynamic system (for motion)',
            'تأمین جریان در سرعت بالا': 'Flow supply at high speed',
            'شیرهای کنترل خودکار': 'Automatic control valves',
            'تغییر حالت بین دو رژیم': 'Mode switching between two regimes',
            // تجهیزات سیستم گاز دینامیک (سیستم 7)
            'کمپرسور گاز': 'Gas compressor',
            'تأمین گاز با فشار مناسب': 'Gas supply with appropriate pressure',
            'فیلترهای گاز (≤ ۱ میکرون)': 'Gas filters (≤ 1 micron)',
            'جلوگیری از ورود ذرات': 'Prevent particle entry',
            'خشک‌کن گاز': 'Gas dryer',
            'حذف رطوبت': 'Moisture removal',
            // تجهیزات سیستم ایرواستاتیک (سیستم 8)
            'کمپرسور هوا': 'Air compressor',
            'تأمین هوای فشرده': 'Compressed air supply',
            'فیلترهای هوای فشرده (≤ ۱ میکرون)': 'Compressed air filters (≤ 1 micron)',
            'حذف ذرات و روغن': 'Particle and oil removal',
            'خشک‌کن هوا': 'Air dryer',
            'حذف رطوبت': 'Moisture removal',
            // تجهیزات سیستم گریس (سیستم 9)
            'گریس‌پمپ (دستی یا برقی)': 'Grease pump (manual or electric)',
            'تزریق گریس به نقاط روانکاری': 'Grease injection to lubrication points',
            'شیرهای یک‌طرفه': 'Check valves',
            'جلوگیری از برگشت گریس': 'Prevent grease backflow',
            'لوله‌های کوتاه با قطر کافی': 'Short pipes with sufficient diameter',
            'کاهش افت فشار': 'Pressure drop reduction',
            // تجهیزات سیستم امولسیون (سیستم 10)
            'سیستم اختلاط آب و روغن': 'Water-oil mixing system',
            'تهیه امولسیون با نسبت دقیق': 'Emulsion preparation with precise ratio',
            'پمپ مخصوص امولسیون': 'Special emulsion pump',
            'مقاوم به خوردگی': 'Corrosion resistant',
            'سیستم کنترل دما': 'Temperature control system',
            'جلوگیری از تبخیر آب': 'Prevent water evaporation',
            'سیستم ضد باکتری': 'Antibacterial system',
            'جلوگیری از رشد میکروارگانیسم‌ها': 'Prevent microorganism growth'
        };
        return translations[text] || text;
    };
    const systemData = appState.getAnswer('3-2') || {};
    const recommendedSystem = systemData.recommendedSystem;
    const systemName = systemData.systemName || 'نامشخص';
    const equipmentMap = {
        1: { icon: '🌊', equipment: [
            { name: translate('پمپ دنده‌ای یا گریز از مرکز'), desc: translate('تأمین جریان پیوسته روغن') },
            { name: translate('فیلتر ۱۰-۲۵ میکرون'), desc: translate('جلوگیری از ورود ذرات به یاتاقان‌ها') },
            { name: translate('مخزن با حجم مناسب'), desc: translate('زمان اقامت کافی برای جدایش هوا و خنک‌کاری') },
            { name: translate('خنک‌کن روغن (در صورت نیاز)'), desc: translate('برای بارهای بالا یا سرعت زیاد') }
        ]},
        2: { icon: '💉', equipment: [
            { name: translate('پمپ فشار بالا'), desc: translate('تأمین فشار ثابت و بالا') },
            { name: translate('فیلترهای دقیق ≤ ۵ میکرون'), desc: translate('حفاظت از یاتاقان‌های بسیار کم') },
            { name: translate('مخزن تحت فشار'), desc: translate('حفظ فشار در استارت و شرایط اضطراری') },
            { name: translate('کاهنده‌های جریان'), desc: translate('تنظیم دقیق جریان هر پد') }
        ]},
        3: { icon: '⚡', equipment: [
            { name: translate('پمپ روغن با فشار متوسط'), desc: translate('تأمین روغن به منطقه تماس') },
            { name: translate('فیلتراسیون مناسب'), desc: translate('با توجه به یاقی کم در تماس EHL') },
            { name: translate('سیستم خنک‌کاری'), desc: translate('کنترل دمای روغن ورودی') }
        ]},
        4: { icon: '🛡️', equipment: [
            { name: translate('سیستم ساده روغن‌کاری'), desc: translate('روغن‌کاری قطره‌ای یا فتیله‌ای') },
            { name: translate('مخزن کوچک'), desc: translate('حجم کم روغن') }
        ]},
        5: { icon: '💎', equipment: [
            { name: translate('تجهیزات اعمال پوشش'), desc: translate('اسپری، براش، غوطه‌وری') },
            { name: translate('سیستم تمیزکاری سطح'), desc: translate('چربی‌گیری، سندبلاست') }
        ]},
        6: { icon: '🔀', equipment: [
            { name: translate('پمپ فشار بالا (برای استارت)'), desc: translate('تأمین فشار هیدرواستاتیک') },
            { name: translate('سیستم هیدرودینامیک (برای حرکت)'), desc: translate('تأمین جریان در سرعت بالا') },
            { name: translate('شیرهای کنترل خودکار'), desc: translate('تغییر حالت بین دو رژیم') }
        ]},
        7: { icon: '💨', equipment: [
            { name: translate('کمپرسور گاز'), desc: translate('تأمین گاز با فشار مناسب') },
            { name: translate('فیلترهای گاز (≤ ۱ میکرون)'), desc: translate('جلوگیری از ورود ذرات') },
            { name: translate('خشک‌کن گاز'), desc: translate('حذف رطوبت') }
        ]},
        8: { icon: '🎈', equipment: [
            { name: translate('کمپرسور هوا'), desc: translate('تأمین هوای فشرده') },
            { name: translate('فیلترهای هوای فشرده (≤ ۱ میکرون)'), desc: translate('حذف ذرات و روغن') },
            { name: translate('خشک‌کن هوا'), desc: translate('حذف رطوبت') }
        ]},
        9: { icon: '🧴', equipment: [
            { name: translate('گریس‌پمپ (دستی یا برقی)'), desc: translate('تزریق گریس به نقاط روانکاری') },
            { name: translate('شیرهای یک‌طرفه'), desc: translate('جلوگیری از برگشت گریس') },
            { name: translate('لوله‌های کوتاه با قطر کافی'), desc: translate('کاهش افت فشار') }
        ]},
        10: { icon: '💧', equipment: [
            { name: translate('سیستم اختلاط آب و روغن'), desc: translate('تهیه امولسیون با نسبت دقیق') },
            { name: translate('پمپ مخصوص امولسیون'), desc: translate('مقاوم به خوردگی') },
            { name: translate('سیستم کنترل دما'), desc: translate('جلوگیری از تبخیر آب') },
            { name: translate('سیستم ضد باکتری'), desc: translate('جلوگیری از رشد میکروارگانیسم‌ها') }
        ]}
    };
    const systemInfo = equipmentMap[recommendedSystem] || { icon: '❓', equipment: [] };
    container.innerHTML = `
        <div class="question-card">
            <div class="question-header">
                <span class="question-number">${translate('سوال ۳-۷')}</span>
                <span class="question-tag tag-auto">${translate('تجهیزات تأمین')}</span>
            </div>
            <h2 class="question-title">${translate('تجهیزات تأمین روانکار')}</h2>
            <p class="question-description">
                ${translate('بر اساس سیستم روانکاری انتخاب‌شده:')} <strong>${systemInfo.icon} ${systemName}</strong>
            </p>
            <div class="equipment-list">
                ${systemInfo.equipment.map(eq => `
                    <div class="equipment-item">
                        <div class="equipment-icon">🔧</div>
                        <div class="equipment-info">
                            <strong>${eq.name}</strong>
                            <small>${eq.desc}</small>
                        </div>
                    </div>
                `).join('')}
            </div>
            <div class="action-bar">
                <button id="back-btn-3-7" class="btn btn-secondary">${translate('بازگشت')}</button>
                <button id="next-btn-3-7" class="btn btn-primary">${translate('ادامه')}</button>
            </div>
        </div>
    `;
    document.getElementById('back-btn-3-7').addEventListener('click', () => {
        const analysisMode = appState.getAnswer('1-1');
        const prevQuestion = analysisMode === '1' ? '3-2' : '3-6';
        window.dispatchEvent(new CustomEvent('navigate', { detail: { question: prevQuestion } }));
    });
    document.getElementById('next-btn-3-7').addEventListener('click', () => {
        appState.currentQuestion = '3-7';
        const nextQuestion = router.getNextQuestion('3-7', null);
        if (nextQuestion) {
            window.dispatchEvent(new CustomEvent('navigate', { detail: { question: nextQuestion } }));
        }
    });
}