import appState from '../../state.js';
import router from '../../router.js';
export function renderQuestion3_13(container) {
    const translate = (text) => {
        if (appState.language !== 'en') return text;
        const translations = {
            'سوال ۳-۱۳': 'Question 3-13',
            'برنامه نگهداری': 'Maintenance Schedule',
            'برنامه نگهداری و پایش وضعیت': 'Maintenance and Condition Monitoring Schedule',
            'بر اساس تحلیل‌های انجام‌شده، برنامه نگهداری زیر برای سیستم روانکاری پیشنهاد می‌شود:': 'Based on the analysis performed, the following maintenance schedule is recommended for the lubrication system:',
            'اقدامات ضروری': 'Required Actions',
            'بازرسی چشمی هفتگی': 'Weekly Visual Inspection',
            'اقدام پایه — بررسی نشتی، سطح روغن، دمای ظاهری': 'Basic action — check for leaks, oil level, apparent temperature',
            'تعویض دوره‌ای روانکار': 'Periodic Lubricant Replacement',
            'تعویض دوره‌ای فیلترها': 'Periodic Filter Replacement',
            'آنالیز دوره‌ای روغن': 'Periodic Oil Analysis',
            'پایش وضعیت آنلاین فشار و دما': 'Online Pressure and Temperature Monitoring',
            'گریس‌کاری مجدد دوره‌ای': 'Periodic Regreasing',
            'فوری': 'Immediate',
            'بازگشت': 'Back',
            'مشاهده گزارش گام ۳': 'View Step 3 Report',
            // دلایل
            'دمای بحرانی — روغن اکسید شده است': 'Critical temperature — oil is oxidized',
            'تشخیص تشدید سایش داده شد': 'Wear intensification detected',
            'فیلترهای فعلی مشکل دارند': 'Current filters have problems',
            'توصیه پایه — بررسی نشتی، سطح روغن، دمای ظاهری': 'Basic recommendation — check leaks, oil level, apparent temperature',
            'پایش وضعیت روغن — بررسی TAN، TBN، ویسکوزیته، ذرات': 'Oil condition monitoring — check TAN, TBN, viscosity, particles',
            'دمای بحرانی': 'Critical temperature',
            'Aeration تشخیص داده شد': 'Aeration detected',
            'تنش تماسی بالا': 'High contact stress',
            'سیستم گریس‌کاری': 'Grease system',
            'دلیل:': 'Reason:',
            'بازه:': 'Interval:',
            'هفتگی': 'Weekly',
            'هر ۲۰۰۰-۳۰۰۰ ساعت': 'Every 2000-3000 hours',
            'هر ۵۰۰-۱۰۰۰ ساعت': 'Every 500-1000 hours',
            'هر ۵۰۰ ساعت یا ماهانه': 'Every 500 hours or monthly',
            'پیوسته (آنلاین)': 'Continuous (online)',
            'طبق برنامه زمان‌بندی': 'According to schedule'
        };
        return translations[text] || text;
    };
    const systemData = appState.getAnswer('3-2') || {};
    const systemName = systemData.systemName || 'نامشخص';
    const contactData = appState.getAnswer('3-0') || {};
    const ratio = contactData.ratio || 0;
    const analysisMode = appState.getAnswer('1-1');
    const isDesign = analysisMode === '1';
    const wearSynergism = appState.getFlag('wearSynergismDetected');
    const aerationDetected = appState.getFlag('AERATION_DETECTED');
    const overheatingCritical = appState.getFlag('OVERHEATING_CRITICAL');
    const selectedProblems = appState.getAnswer('3-5') || [];
    const hasFilterProblem = selectedProblems.includes(4);
    const maintenanceItems = [
        { 
            id: 1, 
            title: translate('تعویض دوره‌ای روانکار'), 
            required: wearSynergism || overheatingCritical, 
            interval: overheatingCritical ? translate('فوری') : translate('هر ۲۰۰۰-۳۰۰۰ ساعت'), 
            reason: overheatingCritical ? translate('دمای بحرانی — روغن اکسید شده است') : translate('تشخیص تشدید سایش داده شد')
        },
        { 
            id: 2, 
            title: translate('تعویض دوره‌ای فیلترها'), 
            required: hasFilterProblem, 
            interval: translate('هر ۵۰۰-۱۰۰۰ ساعت'), 
            reason: translate('فیلترهای فعلی مشکل دارند')
        },
        { 
            id: 3, 
            title: translate('بازرسی چشمی هفتگی'), 
            required: true, 
            interval: translate('هفتگی'), 
            reason: translate('توصیه پایه — بررسی نشتی، سطح روغن، دمای ظاهری')
        },
        { 
            id: 4, 
            title: translate('آنالیز دوره‌ای روغن'), 
            required: wearSynergism || selectedProblems.length > 0, 
            interval: translate('هر ۵۰۰ ساعت یا ماهانه'), 
            reason: translate('پایش وضعیت روغن — بررسی TAN، TBN، ویسکوزیته، ذرات')
        },
        { 
            id: 5, 
            title: translate('پایش وضعیت آنلاین فشار و دما'), 
            required: overheatingCritical || aerationDetected || ratio > 1, 
            interval: translate('پیوسته (آنلاین)'), 
            reason: overheatingCritical ? translate('دمای بحرانی') : aerationDetected ? translate('Aeration تشخیص داده شد') : translate('تنش تماسی بالا')
        },
        { 
            id: 6, 
            title: translate('گریس‌کاری مجدد دوره‌ای'), 
            required: systemData.recommendedSystem === 9, 
            interval: translate('طبق برنامه زمان‌بندی'), 
            reason: translate('سیستم گریس‌کاری')
        }
    ];
    const requiredItems = maintenanceItems.filter(item => item.required);
    appState.setAnswer('3-13', { requiredItems: requiredItems.map(i => i.id), allItems: maintenanceItems });
    container.innerHTML = `
        <div class="question-card">
            <div class="question-header">
                <span class="question-number">${translate('سوال ۳-۱۳')}</span>
                <span class="question-tag tag-auto">${translate('برنامه نگهداری')}</span>
            </div>
            <h2 class="question-title">${translate('برنامه نگهداری و پایش وضعیت')}</h2>
            <p class="question-description">
                ${translate('بر اساس تحلیل‌های انجام‌شده، برنامه نگهداری زیر برای سیستم روانکاری پیشنهاد می‌شود:')}
                <strong>${systemName}</strong>
            </p>
            <div class="maintenance-plan">
                <h3>✅ ${translate('اقدامات ضروری')}</h3>
                ${requiredItems.length > 0 ? requiredItems.map(item => `
                    <div class="maintenance-item">
                        <div class="maintenance-check required"></div>
                        <div class="maintenance-text">
                            <strong>${item.title}</strong>
                            <div class="maintenance-reason">
                                <span>${translate('دلیل:')} ${item.reason}</span><br>
                                <span>⏱️ ${translate('بازه:')} ${item.interval}</span>
                            </div>
                        </div>
                    </div>
                `).join('') : `
                    <div class="maintenance-item">
                        <div class="maintenance-check required"></div>
                        <div class="maintenance-text">
                            <strong>${translate('بازرسی چشمی هفتگی')}</strong>
                            <div class="maintenance-reason">${translate('توصیه پایه — بررسی نشتی، سطح روغن، دمای ظاهری')}</div>
                        </div>
                    </div>
                `}
            </div>
            <div class="action-bar">
                <button id="back-btn-3-13" class="btn btn-secondary">${translate('بازگشت')}</button>
                <button id="next-btn-3-13" class="btn btn-primary">${translate('مشاهده گزارش گام ۳')}</button>
            </div>
        </div>
    `;
    document.getElementById('back-btn-3-13').addEventListener('click', () => {
        const analysisMode = appState.getAnswer('1-1');
        if (analysisMode === '1') {
            window.dispatchEvent(new CustomEvent('navigate', { detail: { question: '3-8-design' } }));
        } else {
            const systemProblem = appState.getAnswer('3-4');
            if (systemProblem === '2') {
                window.dispatchEvent(new CustomEvent('navigate', { detail: { question: '3-4' } }));
            } else {
                window.dispatchEvent(new CustomEvent('navigate', { detail: { question: '3-12' } }));
            }
        }
    });
    document.getElementById('next-btn-3-13').addEventListener('click', () => {
        appState.setAnswer('3-13-completed', true);
        appState.currentQuestion = '3-13';
        window.dispatchEvent(new CustomEvent('navigate', { detail: { question: 'report3' } }));
    });
}