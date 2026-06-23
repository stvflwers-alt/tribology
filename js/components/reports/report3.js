import appState from '../../state.js';
export function renderReport3(container) {
    // تابع translate بهبود یافته - تمام متون ثابت را ترجمه می‌کند
    const translate = (text) => {
        if (appState.language !== 'en') return text;
        const translations = {
            // عنوان‌ها
            'گزارش گام ۳: سیستم روانکاری': 'Step 3 Report: Lubrication System',
            'مسیر:': 'Route:',
            'طراحی': 'Design',
            'عیب‌یابی': 'Troubleshooting',
            'پایش': 'Monitoring',
            'محاسبات تنش تماسی (سوال ۳-۰)': 'Contact Stress Calculations (Question 3-0)',
            'شرایط ویژه (سوال ۳-۱)': 'Special Conditions (Question 3-1)',
            'سیستم روانکاری ایده‌آل (سوال ۳-۲)': 'Ideal Lubrication System (Question 3-2)',
            'عیب‌یابی سیستم (سوال ۳-۴ تا ۳-۶)': 'System Troubleshooting (Questions 3-4 to 3-6)',
            'تجهیزات تأمین روانکار (سوال ۳-۷)': 'Lubricant Supply Equipment (Question 3-7)',
            'چک‌لیست سلامت سیستم (سوال ۳-۸ تا ۳-۱۲)': 'System Health Checklist (Questions 3-8 to 3-12)',
            'برنامه نگهداری (سوال ۳-۱۳)': 'Maintenance Schedule (Question 3-13)',
            'پارامترهای ذخیره‌شده برای گام ۴': 'Parameters Saved for Step 4',
            'پرچم‌های فعال گام ۳': 'Active Step 3 Flags',
            // محاسبات تماس
            'E\' — مدول الاستیسیته معادل': "E' — Equivalent Elastic Modulus",
            'p_max — تنش تماسی حداکثر': 'p_max — Maximum Contact Stress',
            'σ_y — تنش تسلیم (نرم‌تر)': 'σ_y — Yield Stress (softer)',
            'نوع تماس': 'Contact Type',
            'همسان (Conformal)': 'Conformal',
            'غیرهمسان (Non-conformal)': 'Non-conformal',
            'نوع فرمول': 'Formula Type',
            'تماس همسان': 'Conformal Contact',
            'تماس خطی (هرتز)': 'Line Contact (Hertz)',
            'تماس نقطه‌ای (هرتز)': 'Point Contact (Hertz)',
            'پارامترهای ورودی:': 'Input Parameters:',
            // شرایط ویژه
            'هیچ شرایط ویژه‌ای انتخاب نشده. تحلیل بر اساس منطق اصلی انجام شده است.': 'No special conditions selected. Analysis performed based on main logic.',
            'ریسک آتش‌سوزی بالا': 'High Fire Risk',
            'نیاز به دقت بسیار بالا (µm)': 'Very High Precision (µm)',
            'استارت-استاپ مکرر': 'Frequent Start-Stop',
            'خلأ یا محیط خورنده': 'Vacuum or Corrosive Environment',
            'نیاز به نگهداری کم (Maintenance-free)': 'Low Maintenance (Maintenance-free)',
            // سیستم روانکاری - اسامی سیستم‌ها
            'هیدرودینامیک': 'Hydrodynamic',
            'هیدرواستاتیک': 'Hydrostatic',
            'EHL': 'EHL',
            'روانکاری مرزی': 'Boundary Lubrication',
            'روانکار جامد': 'Solid Lubricant',
            'هیبریدی': 'Hybrid',
            'گاز دینامیک': 'Gas Dynamic',
            'ایرواستاتیک': 'Aerostatic',
            'گریس': 'Grease',
            'امولسیون': 'Emulsion',
            'سیستم ساده (قطره‌ای/فتیله‌ای)، مخزن کوچک': 'Simple system (drip/wick), small reservoir',
            'پمپ، فیلتر ۱۰-۲۵ µm، مخزن، خنک‌کن، شیرهای ورودی': 'Pump, 10-25 µm filter, tank, cooler, inlet valves',
            'پمپ فشار بالا، فیلتر ≤۵ µm، مخزن تحت فشار، کاهنده جریان، شیر کنترل فشار': 'High pressure pump, ≤5 µm filter, pressurized tank, flow reducer, pressure control valve',
            'پمپ فشار متوسط، فیلتراسیون، سیستم خنک‌کاری، نازل دقیق': 'Medium pressure pump, filtration, cooling system, precision nozzle',
            'تجهیزات اعمال پوشش، سیستم تمیزکاری، کوره پخت': 'Coating application equipment, cleaning system, curing oven',
            'پمپ فشار بالا + سیستم هیدرودینامیک + شیر کنترل خودکار': 'High pressure pump + hydrodynamic system + automatic control valve',
            'کمپرسور گاز، فیلتر ≤۱ µm، خشک‌کن، تنظیم‌کننده فشار': 'Gas compressor, ≤1 µm filter, dryer, pressure regulator',
            'کمپرسور هوا، فیلتر ≤۱ µm، خشک‌کن، تنظیم‌کننده فشار، کاهنده جریان': 'Air compressor, ≤1 µm filter, dryer, pressure regulator, flow reducer',
            'گریس‌پمپ، شیر یک‌طرفه، لوله‌های کوتاه، اتصالات استاندارد': 'Grease pump, check valve, short pipes, standard fittings',
            'سیستم اختلاط آب و روغن، پمپ مخصوص، فیلتر، کنترل دما، ضد باکتری': 'Water-oil mixing system, special pump, filter, temperature control, antibacterial',
            // متون منطق انتخاب (Selection Logic)
            'منطق انتخاب:': 'Selection Logic:',
            'سیستم‌های حذف‌شده:': 'Eliminated Systems:',
            'شرایط متوسط → روانکاری مرزی': 'Medium conditions → boundary lubrication',
            'U ≈ 0 + دقت بالا → ایرواستاتیک': 'U ≈ 0 + high precision → aerostatic',
            'U ≈ 0 + بار بالا → هیدرواستاتیک': 'U ≈ 0 + high load → hydrostatic',
            'U ≈ 0 → روانکار جامد (پیش‌فرض)': 'U ≈ 0 → solid lubricant (default)',
            'تماس همسان + U > 0.1 + F < 100 kN → هیدرودینامیک': 'Conformal contact + U > 0.1 + F < 100 kN → hydrodynamic',
            'تماس غیرهمسان + F > 1 kN → EHL': 'Non-conformal contact + F > 1 kN → EHL',
            'Fallback: اولین سیستم مجاز': 'Fallback: first available system',
            'Maintenance-free → تأیید گریس/روانکار جامد': 'Maintenance-free → confirming grease/solid lubricant',
            'Maintenance-free → اولویت با گریس': 'Maintenance-free → priority with grease',
            // پیام‌های حذف سیستم
            'محیط خلأ/خورنده — فقط روانکار جامد مجاز است': 'Vacuum/corrosive environment — only solid lubricant allowed',
            'ریسک آتش‌سوزی — روغن معدنی مجاز نیست': 'Fire risk — mineral oil not allowed',
            'دقت بالا — هیدرودینامیک لرزش ایجاد می‌کند': 'High precision — hydrodynamic causes vibration',
            'دقت بالا — گریس نویز ایجاد می‌کند': 'High precision — grease causes noise',
            'استارت-استاپ مکرر — فیلم پایدار تشکیل نمی‌شود': 'Frequent start-stop — stable film not formed',
            // عیب‌یابی
            'سیستم سالم گزارش شده است. برنامه نگهداری پیشگیرانه توصیه می‌شود.': 'System reported healthy. Preventive maintenance recommended.',
            'مشکلات شناسایی‌شده:': 'Identified Problems:',
            'راه‌حل‌های پیشنهادی:': 'Proposed Solutions:',
            // تجهیزات
            'سیستم:': 'System:',
            'تجهیزات اصلی:': 'Main Equipment:',
            'نوع گریس‌کاری:': 'Grease Type:',
            'دستی (Grease nipple)': 'Manual (Grease nipple)',
            'متمرکز (Centralized)': 'Centralized',
            'روش اعمال:': 'Application Method:',
            'اسپری (Spraying)': 'Spraying',
            'براش (Brushing)': 'Brushing',
            'غوطه‌وری (Dip coating)': 'Dip coating',
            'مالش (Burnishing)': 'Burnishing',
            'اسپاتری‌نگ (Sputtering)': 'Sputtering',
            'یون-پلیتینگ (Ion-plating)': 'Ion-plating',
            // چک‌لیست
            'شیارها و ورودی‌ها': 'Grooves and Inlets',
            'سالم': 'Healthy',
            'نیاز به تمیزکاری': 'Needs Cleaning',
            'فیلترها': 'Filters',
            'سالم و بای‌پس بسته': 'Healthy and Bypass Closed',
            'گرفته شده': 'Clogged',
            'ندارد': 'None',
            'نشتی': 'Leakage',
            'از اتصالات': 'From Fittings',
            'از کاسه نمد/آب‌بند': 'From Seal/Gasket',
            'از مخزن/لوله‌ها': 'From Tank/Pipes',
            'کف/هوا': 'Foam/Air',
            'شفاف': 'Clear',
            'کف سطحی (Foaming)': 'Surface Foaming',
            'حباب ریز (Aeration)': 'Fine Bubbles (Aeration)',
            'دمای سیال': 'Fluid Temperature',
            'نرمال': 'Normal',
            'بالا (۸۰-۱۰۰°C)': 'High (80-100°C)',
            'بحرانی (>۱۰۰°C)': 'Critical (>100°C)',
            // برنامه نگهداری
            'اقدامات ضروری:': 'Required Actions:',
            'بازرسی چشمی هفتگی': 'Weekly Visual Inspection',
            'توصیه پایه — بررسی نشتی، سطح روغن، دمای ظاهری': 'Basic recommendation — check leaks, oil level, apparent temperature',
            'هفتگی': 'Weekly',
            'دلیل:': 'Reason:',
            'بازه:': 'Interval:',
            // گام ۴
            'p_max — تنش تماسی': 'p_max — Contact Stress',
            'σ_y — تنش تسلیم': 'σ_y — Yield Stress',
            'U — سرعت نسبی': 'U — Relative Speed',
            'F — بار عمودی': 'F — Normal Load',
            'T — دمای کاری': 'T — Operating Temperature',
            'سیستم روانکاری': 'Lubrication System',
            // دکمه‌ها
            'بازگشت به گام ۳': 'Back to Step 3',
            'چاپ گزارش': 'Print Report',
            'شروع مجدد': 'Restart',
            'ادامه به گام ۴': 'Continue to Step 4',
            'نامشخص': 'Unknown',
            '—': '—',
            // پرچم‌ها
            'Aeration تشخیص داده شد': 'Aeration Detected',
            'دمای بحرانی': 'Critical Temperature',
            'تشدید سایش (Synergism)': 'Wear Synergism Detected',
            'سیستم روانکاری:': 'Lubrication System:'
        };
        return translations[text] || text;
    };
    const t = (key, params = {}) => appState.t(key, params);
    // تابع برای ترجمه متن‌های داینامیک
    const translateDynamic = (text) => {
        if (appState.language !== 'en') return text;
        if (!text || typeof text !== 'string') return text;
        const dynamicTranslations = {
            // اسامی سیستم‌ها
            'هیدرودینامیک': 'Hydrodynamic',
            'هیدرواستاتیک': 'Hydrostatic',
            'EHL': 'EHL',
            'روانکاری مرزی': 'Boundary Lubrication',
            'روانکار جامد': 'Solid Lubricant',
            'هیبریدی': 'Hybrid',
            'گاز دینامیک': 'Gas Dynamic',
            'ایرواستاتیک': 'Aerostatic',
            'گریس': 'Grease',
            'امولسیون': 'Emulsion',
            'سیستم ساده (قطره‌ای/فتیله‌ای)، مخزن کوچک': 'Simple system (drip/wick), small reservoir',
            'پمپ، فیلتر ۱۰-۲۵ µm، مخزن، خنک‌کن، شیرهای ورودی': 'Pump, 10-25 µm filter, tank, cooler, inlet valves',
            'پمپ فشار بالا، فیلتر ≤۵ µm، مخزن تحت فشار، کاهنده جریان، شیر کنترل فشار': 'High pressure pump, ≤5 µm filter, pressurized tank, flow reducer, pressure control valve',
            'پمپ فشار متوسط، فیلتراسیون، سیستم خنک‌کاری، نازل دقیق': 'Medium pressure pump, filtration, cooling system, precision nozzle',
            'تجهیزات اعمال پوشش، سیستم تمیزکاری، کوره پخت': 'Coating application equipment, cleaning system, curing oven',
            'پمپ فشار بالا + سیستم هیدرودینامیک + شیر کنترل خودکار': 'High pressure pump + hydrodynamic system + automatic control valve',
            'کمپرسور گاز، فیلتر ≤۱ µm، خشک‌کن، تنظیم‌کننده فشار': 'Gas compressor, ≤1 µm filter, dryer, pressure regulator',
            'کمپرسور هوا، فیلتر ≤۱ µm، خشک‌کن، تنظیم‌کننده فشار، کاهنده جریان': 'Air compressor, ≤1 µm filter, dryer, pressure regulator, flow reducer',
            'گریس‌پمپ، شیر یک‌طرفه، لوله‌های کوتاه، اتصالات استاندارد': 'Grease pump, check valve, short pipes, standard fittings',
            'سیستم اختلاط آب و روغن، پمپ مخصوص، فیلتر، کنترل دما، ضد باکتری': 'Water-oil mixing system, special pump, filter, temperature control, antibacterial',
            // متون منطق انتخاب
            'منطق انتخاب:': 'Selection Logic:',
            'سیستم‌های حذف‌شده:': 'Eliminated Systems:',
            'شرایط متوسط → روانکاری مرزی': 'Medium conditions → boundary lubrication',
            'U ≈ 0 + دقت بالا → ایرواستاتیک': 'U ≈ 0 + high precision → aerostatic',
            'U ≈ 0 + بار بالا → هیدرواستاتیک': 'U ≈ 0 + high load → hydrostatic',
            'U ≈ 0 → روانکار جامد (پیش‌فرض)': 'U ≈ 0 → solid lubricant (default)',
            'تماس همسان + U > 0.1 + F < 100 kN → هیدرودینامیک': 'Conformal contact + U > 0.1 + F < 100 kN → hydrodynamic',
            'تماس غیرهمسان + F > 1 kN → EHL': 'Non-conformal contact + F > 1 kN → EHL',
            'Fallback: اولین سیستم مجاز': 'Fallback: first available system',
            'Maintenance-free → تأیید گریس/روانکار جامد': 'Maintenance-free → confirming grease/solid lubricant',
            'Maintenance-free → اولویت با گریس': 'Maintenance-free → priority with grease',
            // پیام‌های حذف
            'محیط خلأ/خورنده — فقط روانکار جامد مجاز است': 'Vacuum/corrosive environment — only solid lubricant allowed',
            'ریسک آتش‌سوزی — روغن معدنی مجاز نیست': 'Fire risk — mineral oil not allowed',
            'دقت بالا — هیدرودینامیک لرزش ایجاد می‌کند': 'High precision — hydrodynamic causes vibration',
            'دقت بالا — گریس نویز ایجاد می‌کند': 'High precision — grease causes noise',
            'استارت-استاپ مکرر — فیلم پایدار تشکیل نمی‌شود': 'Frequent start-stop — stable film not formed',
            // نگهداری
            'بازرسی چشمی هفتگی': 'Weekly Visual Inspection',
            'توصیه پایه — بررسی نشتی، سطح روغن، دمای ظاهری': 'Basic recommendation — check leaks, oil level, apparent temperature',
            'هفتگی': 'Weekly',
            'دلیل:': 'Reason:',
            'بازه:': 'Interval:'
        };
        return dynamicTranslations[text] || text;
    };
    const route = appState.getAnswer('1-1');
    const routeNames = {
        '1': translate('طراحی'),
        '2': translate('عیب‌یابی'),
        '3': translate('پایش')
    };
    const routeIcons = { '1': '✏️', '2': '🔧', '3': '📊' };
    const routeColors = { '1': '#1565C0', '2': '#EF6C00', '3': '#2E7D32' };
    const contactData = appState.getAnswer('3-0') || {};
    const specialConditions = appState.getAnswer('3-1') || [];
    const systemData = appState.getAnswer('3-2') || {};
    const hasSystemProblem = appState.getAnswer('3-4');
    const selectedProblems = appState.getAnswer('3-5') || [];
    const solutionData = appState.getAnswer('3-6') || {};
    const maintenanceData = appState.getAnswer('3-13') || {};
    const greaseType = appState.getAnswer('3-7a');
    const solidLubeMethod = appState.getAnswer('3-7b');
    const grooveStatus = appState.getAnswer('3-8');
    const filterStatus = appState.getAnswer('3-9');
    const leakStatus = appState.getAnswer('3-10');
    const foamStatus = appState.getAnswer('3-11');
    const tempStatus = appState.getAnswer('3-12');
    const filterStatusNames = {
        '1': '✅ ' + translate('سالم و بای‌پس بسته'),
        '2': '⚠️ ' + translate('گرفته شده'),
        '3': '❌ ' + translate('ندارد')
    };
    const leakStatusNames = {
        '1': '✅ ' + translate('ندارد'),
        '2': '⚠️ ' + translate('از اتصالات'),
        '3': '⚠️ ' + translate('از کاسه نمد/آب‌بند'),
        '4': '⚠️ ' + translate('از مخزن/لوله‌ها')
    };
    const foamStatusNames = {
        '1': '✅ ' + translate('شفاف'),
        '2': '🫧 ' + translate('کف سطحی (Foaming)'),
        '3': '💨 ' + translate('حباب ریز (Aeration)')
    };
    const tempStatusNames = {
        '1': '✅ ' + translate('نرمال'),
        '2': '🌡️ ' + translate('بالا (۸۰-۱۰۰°C)'),
        '3': '🔥 ' + translate('بحرانی (>۱۰۰°C)')
    };
    // ترجمه داینامیک equipmentMap
    const getEquipmentText = (code) => {
        const equipmentMap = {
            1: 'پمپ، فیلتر ۱۰-۲۵ µm، مخزن، خنک‌کن، شیرهای ورودی',
            2: 'پمپ فشار بالا، فیلتر ≤۵ µm، مخزن تحت فشار، کاهنده جریان، شیر کنترل فشار',
            3: 'پمپ فشار متوسط، فیلتراسیون، سیستم خنک‌کاری، نازل دقیق',
            4: 'سیستم ساده (قطره‌ای/فتیله‌ای)، مخزن کوچک',
            5: 'تجهیزات اعمال پوشش، سیستم تمیزکاری، کوره پخت',
            6: 'پمپ فشار بالا + سیستم هیدرودینامیک + شیر کنترل خودکار',
            7: 'کمپرسور گاز، فیلتر ≤۱ µm، خشک‌کن، تنظیم‌کننده فشار',
            8: 'کمپرسور هوا، فیلتر ≤۱ µm، خشک‌کن، تنظیم‌کننده فشار، کاهنده جریان',
            9: 'گریس‌پمپ، شیر یک‌طرفه، لوله‌های کوتاه، اتصالات استاندارد',
            10: 'سیستم اختلاط آب و روغن، پمپ مخصوص، فیلتر، کنترل دما، ضد باکتری'
        };
        const text = equipmentMap[code] || '—';
        return translateDynamic(text);
    };
    const now = new Date();
    const dateStr = now.toLocaleDateString(appState.language === 'fa' ? 'fa-IR' : 'en-US', {
        year: 'numeric', month: 'long', day: 'numeric',
        hour: '2-digit', minute: '2-digit'
    });
    const answeredCount = appState.getAnsweredCount();
    const step3AnsweredCount = Object.keys(appState.answers).filter(k => k.startsWith('3-')).length;
    // ترجمه داینامیک systemName
    const systemNameTranslated = appState.language === 'en' ? translateDynamic(systemData.systemName) : systemData.systemName;
    container.innerHTML = `
        <div class="report-container" id="report3-printable">
            <!-- HEADER -->
            <div style="text-align: center; margin-bottom: 32px; padding-bottom: 24px; border-bottom: 2px solid var(--border-light);">
                <div style="font-size: 2.5rem; margin-bottom: 8px;">🛢️</div>
                <h1 style="font-size: 1.6rem; color: var(--primary-navy); margin-bottom: 4px;">
                    ${translate('گزارش گام ۳: سیستم روانکاری')}
                </h1>
                <p class="report-subtitle" style="color: ${routeColors[route] || '#666'}; font-size: 1.1rem;">
                    ${routeIcons[route] || '📌'} ${translate('مسیر:')} ${routeNames[route] || translate('نامشخص')}
                </p>
                <div class="report-meta" style="justify-content: center; gap: 24px;">
                    <span>📅 ${dateStr}</span>
                    <span>❓ ${step3AnsweredCount} Questions (Step 3)</span>
                    <span>📊 Total: ${answeredCount} Questions</span>
                </div>
            </div>
            <!-- SECTION 1: محاسبات تنش تماسی -->
            <div class="report-section">
                <h3>📊 ${translate('محاسبات تنش تماسی (سوال ۳-۰)')}</h3>
                <table class="report-table">
                    <tbody>
                        <tr>
                            <td style="width: 40%;"><strong>${translate("E' — مدول الاستیسیته معادل")}</strong>
                            </td>
                            <td><strong>${contactData.E_prime_GPa?.toFixed(2) || '—'} GPa</strong></td>
                        </tr>
                        <tr>
                            <td><strong>${translate('p_max — تنش تماسی حداکثر')}</strong></td>
                            <td style="color: ${contactData.ratio > 1 ? '#C62828' : '#2E7D32'}; font-weight: 700;">
                                ${contactData.p_max_MPa?.toFixed(2) || '—'} MPa
                            </td>
                        </tr>
                        <tr>
                            <td><strong>${translate('σ_y — تنش تسلیم (نرم‌تر)')}</strong></td>
                            <td>${contactData.sigma_y_MPa?.toFixed(2) || '—'} MPa</span></td>
                        </tr>
                        <tr>
                            <td><strong>p<sub>max</sub> / σ<sub>y</sub></strong></td>
                            <td style="color: ${contactData.ratio > 1 ? '#C62828' : '#2E7D32'}; font-weight: 700;">
                                ${contactData.ratio?.toFixed(3) || '—'}
                                ${contactData.ratio > 1 ? ' ⚠️ Yielding' : ' ✓ Safe'}
                            </td>
                        </tr>
                        <tr>
                            <td><strong>${translate('نوع تماس')}</strong></td>
                            <td>${contactData.isConformal ? translate('همسان (Conformal)') : translate('غیرهمسان (Non-conformal)')}</span></td>
                        </tr>
                        <tr>
                            <td><strong>${translate('نوع فرمول')}</strong></td>
                            <td>${contactData.formulaType === 'conformal' ? translate('تماس همسان') : contactData.formulaType === 'line' ? translate('تماس خطی (هرتز)') : translate('تماس نقطه‌ای (هرتز)')}</span></td>
                        </tr>
                    </tbody>
                </table>
                <div style="margin-top: 12px; padding: 10px; background: #E3F2FD; border-radius: 6px; font-size: 0.85rem;">
                    <strong>${translate('پارامترهای ورودی:')}</strong>
                    E₁ = ${contactData.E1_GPa?.toFixed(0) || '—'} GPa, 
                    E₂ = ${contactData.E2_GPa?.toFixed(0) || '—'} GPa, 
                    ν₁ = ${contactData.nu1 || '—'}, 
                    ν₂ = ${contactData.nu2 || '—'}, 
                    F = ${contactData.F_N?.toFixed(0) || '—'} N, 
                    U = ${contactData.U_ms?.toFixed(2) || '—'} m/s, 
                    T = ${contactData.T_C || '—'} °C
                </div>
            </div>
            <!-- SECTION 2: شرایط ویژه -->
            <div class="report-section">
                <h3>🔍 ${translate('شرایط ویژه (سوال ۳-۱)')}</h3>
                ${specialConditions.length === 0 || specialConditions.includes(6) ? 
                    '<p>✅ ' + translate('هیچ شرایط ویژه‌ای انتخاب نشده. تحلیل بر اساس منطق اصلی انجام شده است.') + '</p>' :
                    `<ul class="report-flags-list">
                        ${specialConditions.filter(c => c !== 6).map(c => {
                            const conditionNames = {
                                1: translate('ریسک آتش‌سوزی بالا'),
                                2: translate('نیاز به دقت بسیار بالا (µm)'),
                                3: translate('استارت-استاپ مکرر'),
                                4: translate('خلأ یا محیط خورنده'),
                                5: translate('نیاز به نگهداری کم (Maintenance-free)')
                            };
                            return `<li>${conditionNames[c] || 'Unknown'}</li>`;
                        }).join('')}
                    </ul>`
                }
            </div>
                        <!-- SECTION 3: سیستم روانکاری ایده‌آل -->
            <div class="report-section" style="border: 2px solid ${systemData.manuallySelected ? '#EF6C00' : '#2E7D32'};">
                <h3>⚙️ ${translate('سیستم روانکاری ایده‌آل (سوال ۳-۲)')}</h3>
                <div style="text-align: center; padding: 20px;">
                    <div style="font-size: 4rem; margin-bottom: 8px;">
                        ${getSystemIcon(systemData.recommendedSystem)}
                    </div>
                    <h4 style="color: ${systemData.manuallySelected ? '#EF6C00' : '#2E7D32'}; font-size: 1.3rem; margin-bottom: 8px;">
                        ${systemNameTranslated || 'Unknown'}
                        ${systemData.manuallySelected ? ' (Manual Selection)' : ' (Auto Suggestion)'}
                    </h4>
                    <p style="color: var(--text-secondary);">
                        ${getSystemDesc(systemData.recommendedSystem, appState.language)}
                    </p>
                </div>
                <!-- Selection Logic -->
                ${systemData.mainLogicReasons && systemData.mainLogicReasons.length > 0 ? `
                <div style="margin-top: 16px; padding: 12px; background: #F5F5F5; border-radius: 6px;">
                    <strong>🧠 ${translate('منطق انتخاب:')}</strong>
                    <ol style="margin: 8px 0; padding-right: 20px;">
                        ${systemData.mainLogicReasons.map(r => {
                            let translatedReason = r;
                            if (appState.language === 'en') {
                                const reasonTranslations = {
                                    'انتخاب دستی توسط کاربر': 'Manual selection by user',
                                    'شرایط متوسط → روانکاری مرزی': 'Medium conditions → boundary lubrication',
                                    'U ≈ 0 + دقت بالا → ایرواستاتیک': 'U ≈ 0 + high precision → aerostatic',
                                    'U ≈ 0 + بار بالا → هیدرواستاتیک': 'U ≈ 0 + high load → hydrostatic',
                                    'U ≈ 0 → روانکار جامد (پیش‌فرض)': 'U ≈ 0 → solid lubricant (default)',
                                    'تماس همسان + U > 0.1 + F < 100 kN → هیدرودینامیک': 'Conformal contact + U > 0.1 + F < 100 kN → hydrodynamic',
                                    'تماس غیرهمسان + F > 1 kN → EHL': 'Non-conformal contact + F > 1 kN → EHL',
                                    'Fallback: اولین سیستم مجاز': 'Fallback: first available system',
                                    'Maintenance-free → تأیید گریس/روانکار جامد': 'Maintenance-free → confirming grease/solid lubricant',
                                    'Maintenance-free → اولویت با گریس': 'Maintenance-free → priority with grease'
                                };
                                translatedReason = reasonTranslations[r] || r;
                            }
                            return `<li style="margin-bottom: 4px;">${translatedReason}</li>`;
                        }).join('')}
                    </ol>
                </div>
                ` : ''}
                <!-- Eliminated Systems -->
                ${systemData.eliminatedSystems && systemData.eliminatedSystems.length > 0 ? `
                <div style="margin-top: 12px;">
                    <strong>🚫 ${translate('سیستم‌های حذف‌شده:')}</strong>
                    <ul style="margin: 8px 0; padding-right: 20px; color: #C62828;">
                        ${systemData.eliminatedSystems.map(code => {
                            const systemNames = {
                                1: translate('هیدرودینامیک'), 2: translate('هیدرواستاتیک'), 3: translate('EHL'),
                                4: translate('روانکاری مرزی'), 5: translate('روانکار جامد'), 6: translate('هیبریدی'),
                                7: translate('گاز دینامیک'), 8: translate('ایرواستاتیک'), 9: translate('گریس'), 10: translate('امولسیون')
                            };
                            let reason = systemData.eliminationReasons?.[code] || '—';
                            if (appState.language === 'en') {
                                const reasonTranslations = {
                                    'محیط خلأ/خورنده — فقط روانکار جامد مجاز است': 'Vacuum/corrosive environment — only solid lubricant allowed',
                                    'ریسک آتش‌سوزی — روغن معدنی مجاز نیست': 'Fire risk — mineral oil not allowed',
                                    'دقت بالا — هیدرودینامیک لرزش ایجاد می‌کند': 'High precision — hydrodynamic causes vibration',
                                    'دقت بالا — گریس نویز ایجاد می‌کند': 'High precision — grease causes noise',
                                    'استارت-استاپ مکرر — فیلم پایدار تشکیل نمی‌شود': 'Frequent start-stop — stable film not formed'
                                };
                                reason = reasonTranslations[reason] || reason;
                            }
                            return `<li>${systemNames[code] || code}: ${reason}</li>`;
                        }).join('')}
                    </ul>
                </div>
                ` : ''}
            </div>
                ${systemData.eliminatedSystems && systemData.eliminatedSystems.length > 0 ? `
                <div style="margin-top: 12px;">
                    <strong>🚫 ${translate('سیستم‌های حذف‌شده:')}</strong>
                    <ul style="margin: 8px 0; padding-right: 20px; color: #C62828;">
                        ${systemData.eliminatedSystems.map(code => {
                            const systemNames = {
                                1: translate('هیدرودینامیک'), 2: translate('هیدرواستاتیک'), 3: translate('EHL'),
                                4: translate('روانکاری مرزی'), 5: translate('روانکار جامد'), 6: translate('هیبریدی'),
                                7: translate('گاز دینامیک'), 8: translate('ایرواستاتیک'), 9: translate('گریس'), 10: translate('امولسیون')
                            };
                            const reason = systemData.eliminationReasons?.[code] || '—';
                            return `<li>${systemNames[code] || code}: ${translateDynamic(reason)}</li>`;
                        }).join('')}
                    </ul>
                </div>
                ` : ''}
            </div>
            <!-- SECTION 4: عیب‌یابی -->
            ${route !== '1' ? `
            <div class="report-section">
                <h3>🔧 ${translate('عیب‌یابی سیستم (سوال ۳-۴ تا ۳-۶)')}</h3>
                ${hasSystemProblem === '1' ? `
                    ${selectedProblems.length > 0 ? `
                    <h4 style="color: #EF6C00; margin-bottom: 8px;">⚠️ ${translate('مشکلات شناسایی‌شده:')}</h4>
                    <ul class="report-flags-list">
                        ${selectedProblems.map(code => {
                            const problemNames = {
                                1: 'Wrong mechanism', 2: 'Insufficient pressure or flow rate', 
                                3: 'Inappropriate fluid input', 4: 'Filters are clogged', 
                                5: 'Leakage', 6: 'Foam/Air (Foaming)',
                                7: 'High fluid temperature', 8: 'Corrosion or fouling', 
                                9: 'Wrong viscosity', 10: 'Dissolved gas bubbles (Aeration)',
                                11: 'Pump damaged or worn', 12: 'Pipes or hoses are clogged',
                                13: 'Inappropriate oil reservoir', 14: 'Improper sealing',
                                15: 'Insufficient lubrication (Starvation)', 16: 'Hot oil carry over',
                                17: 'Chemical reaction with seals', 18: 'Polymerization',
                                19: 'Lubricant evaporation'
                            };
                            return `<li class="flag-warning">${problemNames[code] || code}</li>`;
                        }).join('')}
                    </ul>
                    ` : ''}
                    ${solutionData.solutions && solutionData.solutions.length > 0 ? `
                    <h4 style="color: #2E7D32; margin: 16px 0 8px;">✅ ${translate('راه‌حل‌های پیشنهادی:')}</h4>
                    <table class="report-table">
                        <tbody>
                            ${solutionData.solutions.map((sol, i) => `
                                <tr>
                                    <td style="width: 5%;"><strong>${i + 1}</strong></span></td>
                                    <td style="width: 45%;"><strong>${sol.text}</strong></span></td>
                                    <td style="width: 50%;">${sol.desc}</span></td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                    ` : ''}
                ` : `
                <p style="color: #2E7D32;">✅ ${translate('سیستم سالم گزارش شده است. برنامه نگهداری پیشگیرانه توصیه می‌شود.')}</p>
                `}
            </div>
            ` : ''}
            <!-- SECTION 5: تجهیزات تأمین -->
            <div class="report-section">
                <h3>🔧 ${translate('تجهیزات تأمین روانکار (سوال ۳-۷)')}</h3>
                <p><strong>${translate('سیستم:')}</strong> ${systemNameTranslated || 'Unknown'}</p>
                <p><strong>${translate('تجهیزات اصلی:')}</strong> ${getEquipmentText(systemData.recommendedSystem)}</p>
                ${systemData.recommendedSystem === 9 && greaseType ? `
                <p><strong>${translate('نوع گریس‌کاری:')}</strong> ${greaseType === '1' ? translate('دستی (Grease nipple)') : translate('متمرکز (Centralized)')}</p>
                ` : ''}
                ${systemData.recommendedSystem === 5 && solidLubeMethod ? `
                <p><strong>${translate('روش اعمال:')}</strong> ${getSolidLubeMethodName(solidLubeMethod, appState.language)}</p>
                ` : ''}
            </div>
            <!-- SECTION 6: چک‌لیست سلامت -->
            ${route !== '1' ? `
            <div class="report-section">
                <h3>📋 ${translate('چک‌لیست سلامت سیستم (سوال ۳-۸ تا ۳-۱۲)')}</h3>
                <table class="report-table">
                    <tbody>
                        <tr><td style="width: 40%;"><strong>${translate('شیارها و ورودی‌ها')}</strong></span></td><td>${grooveStatus === '1' ? '✅ ' + translate('سالم') : grooveStatus === '2' ? '🧹 ' + translate('نیاز به تمیزکاری') : '—'}</span></td></tr>
                        ${filterStatus ? `<tr><td><strong>${translate('فیلترها')}</strong></span></td><td>${filterStatusNames[filterStatus] || '—'}</span></td></tr>` : ''}
                        ${leakStatus ? `<tr><td><strong>${translate('نشتی')}</strong></span></td><td>${leakStatusNames[leakStatus] || '—'}</span></td></tr>` : ''}
                        ${foamStatus ? `<tr><td><strong>${translate('کف/هوا')}</strong></span></td><td>${foamStatusNames[foamStatus] || '—'}</span></td></tr>` : ''}
                        ${tempStatus ? `<tr><td><strong>${translate('دمای سیال')}</strong></span></td><td>${tempStatusNames[tempStatus] || '—'}</span></td></tr>` : ''}
                    </tbody>
                </table>
            </div>
            ` : ''}
            <!-- SECTION 7: برنامه نگهداری -->
            <div class="report-section">
                <h3>📅 ${translate('برنامه نگهداری (سوال ۳-۱۳)')}</h3>
                ${maintenanceData.requiredItems && maintenanceData.requiredItems.length > 0 ? `
                    <p><strong>${maintenanceData.requiredItems.length} ${translate('اقدامات ضروری:')}</strong></p>
                    <ul style="padding-right: 20px;">
                        ${maintenanceData.allItems?.filter(i => i.required).map(i => `
                            <li style="margin-bottom: 8px;">
                                <strong>${translateDynamic(i.title)}</strong><br>
                                <small>${translate('دلیل:')} ${translateDynamic(i.reason)}</small><br>
                                <small>⏱️ ${translate('بازه:')} ${translateDynamic(i.interval)}</small>
                            </li>
                        `).join('') || ''}
                    </ul>
                ` : '<p>✅ Minimum: Weekly visual inspection</p>'}
            </div>
            <!-- SECTION 8: FLAGS -->
            ${renderFlagsSection(systemData.systemName, appState.language)}
            <!-- SECTION 9: پارامترهای ذخیره‌شده برای گام ۴ -->
            <div class="report-section" style="background: #E8F5E9;">
                <h3>📦 ${translate('پارامترهای ذخیره‌شده برای گام ۴')}</h3>
                <table class="report-table">
                    <tbody>
                        <tr><td style="width: 40%;"><strong>${translate('p_max — تنش تماسی')}</strong></span></td><td>${contactData.p_max_MPa?.toFixed(2) || '—'} MPa</span></td></tr>
                        <tr><td><strong>${translate('σ_y — تنش تسلیم')}</strong></span></td><td>${contactData.sigma_y_MPa?.toFixed(2) || '—'} MPa</span></td></tr>
                        <tr><td><strong>${translate('U — سرعت نسبی')}</strong></span></td><td>${contactData.U_ms?.toFixed(3) || '—'} m/s</span></td></tr>
                        <tr><td><strong>${translate('F — بار عمودی')}</strong></span></td><td>${contactData.F_N?.toFixed(0) || '—'} N</span></td></tr>
                        <tr><td><strong>${translate('T — دمای کاری')}</strong></span></td><td>${contactData.T_C || '—'} °C</span></td></tr>
                        <tr><td><strong>${translate('سیستم روانکاری')}</strong></span></td><td><strong>${systemNameTranslated || 'Unknown'}</strong></span></td></tr>
                    </tbody>
                </table>
            </div>
            <!-- FOOTER -->
            <div style="text-align: center; margin-top: 32px; padding-top: 20px; border-top: 1px solid var(--border-light); color: var(--text-secondary); font-size: 0.85rem;">
                <p>Wear & Failure Analysis Expert System © 2026</p>
                <p style="margin-top: 4px;">${translate('گزارش گام ۳: سیستم روانکاری')} – ${dateStr}</p>
            </div>
        </div>
        <!-- ACTION BUTTONS -->
        <div class="report-action no-print" style="margin-top: 24px;">
            <button id="btn-back-step3" class="btn btn-secondary">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M9 18l6-6-6-6"/>
                </svg>
                ${translate('بازگشت به گام ۳')}
            </button>
            <button id="btn-print-report3" class="btn btn-secondary">
                🖨️ ${translate('چاپ گزارش')}
            </button>
            <button id="btn-restart-analysis3" class="btn btn-secondary">
                ${translate('شروع مجدد')}
            </button>
            <button id="btn-continue-step4" class="btn btn-primary btn-large">
                ${translate('ادامه به گام ۴')}
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M9 18l6-6-6-6"/>
                </svg>
            </button>
        </div>
    `;
    document.getElementById('btn-print-report3')?.addEventListener('click', () => {
        window.print();
    });
    document.getElementById('btn-restart-analysis3')?.addEventListener('click', () => {
        if (confirm('Are you sure you want to restart? All progress will be lost.')) {
            appState.resetAll(true);
            window.dispatchEvent(new CustomEvent('navigate', { detail: { question: '1-1' } }));
        }
    });
    document.getElementById('btn-continue-step4')?.addEventListener('click', () => {
        appState.setFlag('step3Completed', true);
        appState.currentStep = 4;
        window.dispatchEvent(new CustomEvent('stepComplete', { 
            detail: { step: 3, nextStep: 4 } 
        }));
    });
    document.getElementById('btn-back-step3')?.addEventListener('click', () => {
        window.dispatchEvent(new CustomEvent('navigate', { 
            detail: { question: '3-13' } 
        }));
    });
    function getSystemIcon(code) {
        const icons = { 1: '🌊', 2: '💉', 3: '⚡', 4: '🛡️', 5: '💎', 6: '🔀', 7: '💨', 8: '🎈', 9: '🧴', 10: '💧' };
        return icons[code] || '❓';
    }
    function getSystemDesc(code, lang) {
        const descs = {
            1: 'Full fluid film with self-generated pressure',
            2: 'Fluid film with external pressure (pump)',
            3: 'Thin film with elastic deformation',
            4: 'Thin molecular layer, direct contact',
            5: 'Powder or solid coating (MoS₂, Graphite, PTFE)',
            6: 'Combination of hydrostatic + hydrodynamic',
            7: 'Gas film with self-generated pressure',
            8: 'Air film with external pressure',
            9: 'Semi-solid lubricant, low maintenance',
            10: 'Water-oil mixture, excellent cooling'
        };
        if (lang === 'en') return descs[code] || '—';
        const descsFa = {
            1: 'فیلم کامل سیال با فشار خود-تولید',
            2: 'فیلم سیال با فشار خارجی (پمپ)',
            3: 'فیلم نازک با تغییر شکل الاستیک',
            4: 'لایه نازک مولکولی، تماس مستقیم',
            5: 'پودر یا پوشش جامد (MoS₂، گرافیت، PTFE)',
            6: 'ترکیب هیدرواستاتیک + هیدرودینامیک',
            7: 'فیلم گاز با فشار خود-تولید',
            8: 'فیلم هوا با فشار خارجی',
            9: 'روانکار نیمه‌جامد، نگهداری کم',
            10: 'مخلوط آب و روغن، خنک‌کاری عالی'
        };
        return descsFa[code] || '—';
    }
    function getSolidLubeMethodName(code, lang) {
        if (lang === 'en') {
            const methods = {
                1: 'Spraying',
                2: 'Brushing',
                3: 'Dip coating',
                4: 'Burnishing',
                5: 'Sputtering',
                6: 'Ion-plating'
            };
            return methods[code] || '—';
        }
        const methodsFa = {
            1: 'اسپری (Spraying)',
            2: 'براش (Brushing)',
            3: 'غوطه‌وری (Dip coating)',
            4: 'مالش (Burnishing)',
            5: 'اسپاتری‌نگ (Sputtering)',
            6: 'یون-پلیتینگ (Ion-plating)'
        };
        return methodsFa[code] || '—';
    }
    function renderFlagsSection(systemName, lang) {
        const flags = [];
        if (appState.getFlag('AERATION_DETECTED')) flags.push({ key: lang === 'en' ? 'Aeration Detected' : 'Aeration تشخیص داده شد', type: 'warning' });
        if (appState.getFlag('OVERHEATING_CRITICAL')) flags.push({ key: lang === 'en' ? 'Critical Temperature' : 'دمای بحرانی', type: 'critical' });
        if (appState.getFlag('WEAR_SYNERGISM_DETECTED')) flags.push({ key: lang === 'en' ? 'Wear Synergism Detected' : 'تشدید سایش (Synergism)', type: 'critical' });
        if (appState.getFlag('LUBRICATION_SYSTEM')) {
            const sysName = lang === 'en' ? translateDynamic(systemName) : systemName;
            flags.push({ key: `${lang === 'en' ? 'Lubrication System:' : 'سیستم روانکاری:'} ${sysName || '—'}`, type: 'info' });
        }
        if (flags.length === 0) return '';
        return `
            <div class="report-section">
                <h3>🚩 ${translate('پرچم‌های فعال گام ۳')}</h3>
                <ul class="report-flags-list">
                    ${flags.map(flag => `
                        <li class="${flag.type === 'critical' ? 'flag-critical' : flag.type === 'warning' ? 'flag-warning' : ''}">
                            ${flag.key}
                        </li>
                    `).join('')}
                </ul>
            </div>
        `;
    }
}