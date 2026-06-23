import appState from '../../state.js';
import Calculations from '../../calculations.js';

export function renderQuestion1_2_2(container) {
    const t = (key, params = {}) => appState.t(key, params);
    const isEnglish = appState.language === 'en';
    
    const title = t('step1.question1_2_2.title');
    const tag = t('step1.question1_2_2.tag');
    const btnContinue = t('common.btnContinue');
    const btnBack = t('common.btnBack');
    
    const contactAnswer = appState.getAnswer('1-2-1');
    const detectedMotion = Calculations.detectMotionType(contactAnswer);
    
    // تبدیل نوع حرکت به کد عددی
    function getMotionCode(motionText) {
        if (isEnglish) {
            const enMap = {
                'Rolling': '2',
                'Sliding': '1',
                'Rolling-Sliding': '3',
                'Stationary': '6',
                'Impact': '5',
                'Oscillating': '4',
                'Particle movement in fluid': '7',
                'Unknown': '6'
            };
            return enMap[motionText] || '3';
        }
        const motionMap = {
            'غلتشی': '2',
            'لغزشی': '1',
            'غلتشی-لغزشی': '3',
            'ساکن': '6',
            'ضربه‌ای': '5',
            'نوسانی': '4',
            'حرکت ذرات در سیال': '7',
            'نامشخص': '6'
        };
        return motionMap[motionText] || '3';
    }
    
    // تبدیل کد عددی به متن برای نمایش
    function getMotionTextFromCode(code) {
        const motions = [
            { code: '1', fa: 'لغزشی یک‌جهته یا دو‌جهته', en: 'Unidirectional or bidirectional sliding' },
            { code: '2', fa: 'غلتشی خالص', en: 'Pure rolling' },
            { code: '3', fa: 'غلتشی-لغزشی (ترکیبی)', en: 'Rolling-sliding (combined)' },
            { code: '4', fa: 'نوسانی با دامنه کم (احتمال فرتینگ)', en: 'Low amplitude oscillation (fretting risk)' },
            { code: '5', fa: 'ضربه‌ای مکرر', en: 'Repeated impact' },
            { code: '6', fa: 'ساکن (بدون حرکت نسبی)', en: 'Stationary (no relative motion)' },
            { code: '7', fa: 'حرکت ذرات در سیال (فرسایش ذره‌ای)', en: 'Particle movement in fluid (erosion)' }
        ];
        const motion = motions.find(m => m.code === code);
        if (!motion) return isEnglish ? 'Unknown' : 'نامشخص';
        return isEnglish ? motion.en : motion.fa;
    }
    
    // تشخیص نوع حرکت و تبدیل به کد
    let detectedMotionCode = getMotionCode(detectedMotion);
    
    // اگر قطعه "سایر" است، از پاسخ 1-2-1a استفاده کن
    if (contactAnswer === '14') {
        const otherData = appState.getAnswer('1-2-1a');
        if (otherData && otherData.motion) {
            const motionCodeFromOther = {
                '1': '2',   // غلتشی
                '2': '1',   // لغزشی
                '3': '3',   // غلتشی-لغزشی
                '4': '6',   // ساکن
                '5': '5',   // ضربه‌ای
                '6': '4',   // نوسانی
                '7': '7'    // حرکت ذرات در سیال
            };
            detectedMotionCode = motionCodeFromOther[otherData.motion] || '3';
        }
    }
    
    const autoNote = t('step1.question1_2_2.autoDetect', { motionType: detectedMotion });
    
    // لیست گزینه‌های حرکتی (برای حالت انتخاب دستی)
    const motionOptions = [];
    for (let i = 0; i < 7; i++) {
        motionOptions.push(t(`step1.question1_2_2.options.${i}`));
    }
    
    container.innerHTML = `
        <div class="question-card">
            <div class="question-header">
                <span class="question-number">1-2-2</span>
                <span class="question-tag tag-auto">${tag}</span>
            </div>
            <h2 class="question-title">${title}</h2>
            
            <!-- نمایش خودکار مانند سوال ۳-۲ -->
            <div class="result-panel" style="border: 2px solid var(--blue-standard); background: #f0f7ff; position: relative;">
                <div style="position: absolute; top: -12px; ${isEnglish ? 'left: 16px;' : 'right: 16px;'} background: var(--blue-standard); color: white; padding: 2px 12px; border-radius: 12px; font-size: 0.75rem; font-weight: 600;">
                    🔍 ${isEnglish ? 'Auto Detected' : 'تشخیص خودکار'}
                </div>
                <div style="display: flex; align-items: center; gap: 20px; padding: 16px; margin-top: 8px;">
                    <div style="font-size: 3rem;">${getMotionIcon(detectedMotionCode)}</div>
                    <div>
                        <h4 style="color: var(--blue-standard); font-size: 1.2rem; margin-bottom: 8px;">
                            ${getMotionTextFromCode(detectedMotionCode)}
                        </h4>
                        <p style="color: var(--text-secondary); margin-bottom: 4px;">${autoNote}</p>
                    </div>
                </div>
            </div>
            
            <!-- دکمه‌های تأیید مانند سوال ۳-۲ -->
            <div style="margin-top: 24px; padding: 16px; background: #fff; border: 1px solid var(--border-light); border-radius: var(--radius-md);">
                <p style="font-weight: 600; margin-bottom: 12px;">
                    ${isEnglish ? 'Do you confirm this motion type?' : 'آیا این نوع حرکت را تأیید می‌کنید؟'}
                </p>
                <div style="display: flex; gap: 12px;">
                    <button id="btn-confirm-motion" class="btn btn-primary" style="flex: 1;">
                        ✅ ${isEnglish ? 'Yes, I confirm' : 'بله، تأیید می‌کنم'}
                    </button>
                    <button id="btn-change-motion" class="btn btn-secondary" style="flex: 1;">
                        🔄 ${isEnglish ? 'No, I will change it' : 'خیر، تغییر می‌دهم'}
                    </button>
                </div>
            </div>
            
            <!-- بخش انتخاب دستی (مخفی در ابتدا) -->
            <div id="manual-selection-section" style="display: none; margin-top: 20px;">
                <div class="alert alert-warning" style="margin-bottom: 16px;">
                    ⚠️ ${isEnglish ? 'Please select the correct motion type:' : 'لطفاً نوع حرکت صحیح را انتخاب کنید:'}
                </div>
                <div class="options-list" id="options-list-1-2-2-manual">
                    ${motionOptions.map((opt, i) => `
                        <label class="option-card" data-value="${i + 1}">
                            <input type="radio" name="question-1-2-2-manual" value="${i + 1}">
                            <div class="option-content">
                                <div class="option-icon">${getMotionIcon(String(i + 1))}</div>
                                <div class="option-text"><strong>${opt}</strong></div>
                            </div>
                            <div class="option-radio"></div>
                        </label>
                    `).join('')}
                </div>
            </div>
            
            <div class="action-bar">
                <button id="back-btn-1-2-2" class="btn btn-secondary">
                    <svg class="btn-arrow-back" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M9 18l6-6-6-6"/>
                    </svg>
                    ${btnBack}
                </button>
                <button id="next-btn-1-2-2" class="btn btn-primary" style="display: none;">
                    ${btnContinue}
                    <svg class="btn-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M9 18l6-6-6-6"/>
                    </svg>
                </button>
            </div>
        </div>
    `;
    
    const confirmBtn = document.getElementById('btn-confirm-motion');
    const changeBtn = document.getElementById('btn-change-motion');
    const nextBtn = document.getElementById('next-btn-1-2-2');
    const backBtn = document.getElementById('back-btn-1-2-2');
    const manualSection = document.getElementById('manual-selection-section');
    
    let selectedValue = detectedMotionCode;
    
    // تأیید خودکار
    confirmBtn.addEventListener('click', () => {
        appState.setAnswer('1-2-2', selectedValue);
        window.dispatchEvent(new CustomEvent('navigate', { detail: { question: '1-2-3' } }));
    });
    
    // تغییر دستی - نمایش گزینه‌ها
    changeBtn.addEventListener('click', () => {
        manualSection.style.display = 'block';
        confirmBtn.style.display = 'none';
        changeBtn.style.display = 'none';
        nextBtn.style.display = 'inline-flex';
    });
    
    // انتخاب دستی از لیست
    const manualOptions = container.querySelectorAll('#options-list-1-2-2-manual .option-card');
    manualOptions.forEach(card => {
        card.addEventListener('click', () => {
            manualOptions.forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');
            selectedValue = card.dataset.value;
            nextBtn.disabled = false;
        });
    });
    
    nextBtn.addEventListener('click', () => {
        if (!selectedValue) return;
        appState.setAnswer('1-2-2', selectedValue);
        window.dispatchEvent(new CustomEvent('navigate', { detail: { question: '1-2-3' } }));
    });
    
    backBtn.addEventListener('click', () => {
        const contactAnswer = appState.getAnswer('1-2-1');
        if (contactAnswer === '14') {
            window.dispatchEvent(new CustomEvent('navigate', { detail: { question: '1-2-1a' } }));
        } else if (['8', '9', '11'].includes(contactAnswer)) {
            window.dispatchEvent(new CustomEvent('navigate', { detail: { question: '1-2-1b' } }));
        } else {
            window.dispatchEvent(new CustomEvent('navigate', { detail: { question: '1-2-1' } }));
        }
    });
    
    // ذخیره پاسخ قبلی اگر وجود داشت
    const savedAnswer = appState.getAnswer('1-2-2');
    if (savedAnswer) {
        selectedValue = savedAnswer;
        // اگر پاسخ قبلی با تشخیص خودکار متفاوت بود، حالت manual را فعال کن
        if (savedAnswer !== detectedMotionCode) {
            manualSection.style.display = 'block';
            confirmBtn.style.display = 'none';
            changeBtn.style.display = 'none';
            nextBtn.style.display = 'inline-flex';
            const savedCard = container.querySelector(`#options-list-1-2-2-manual .option-card[data-value="${savedAnswer}"]`);
            if (savedCard) {
                savedCard.classList.add('selected');
                const radio = savedCard.querySelector('input');
                if (radio) radio.checked = true;
            }
            nextBtn.disabled = false;
        }
    }
}

// تابع کمکی برای دریافت آیکون متناسب با نوع حرکت
function getMotionIcon(code) {
    const icons = {
        '1': '↔️',
        '2': '⚙️',
        '3': '🔄',
        '4': '〰️',
        '5': '💥',
        '6': '⏸️',
        '7': '💨'
    };
    return icons[code] || '❓';
}