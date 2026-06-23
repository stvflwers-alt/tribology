import appState from '../../state.js';
export function renderQuestion4_15(container) {
    const t = (key, params = {}) => appState.t(key, params);
    const isEnglish = appState.language === 'en';
    const lambda = appState.getAnswer('4-3-lambda');
    const F = (appState.getAnswer('3-0') || {}).F_N || 1000;
    const U = (appState.getAnswer('3-0') || {}).U_ms || 1;
    const T_contact = (appState.getAnswer('4-5-flash-data') || {}).T_contact || 25;
    const isCombined = appState.getFlag('COMBINED_MECHANISMS') || false;
    let suggestedCauses = [];
    let reasons = [];
    if (lambda !== null && lambda < 1) {
        suggestedCauses.push('1');
        reasons.push(isEnglish ? `λ = ${lambda.toFixed(2)} (< 1) ← Insufficient lubricant film` : `λ = ${lambda.toFixed(2)} (< 1) ← فیلم روانکار ناکافی`);
    }
    if (appState.getFlag('FLASH_TEMP_EXCEEDED')) {
        suggestedCauses.push('5');
        reasons.push(isEnglish ? 'Contact temperature exceeded limit' : 'دمای تماس از حد مجاز فراتر رفته');
    }
    if (appState.getFlag('WEAR_SYNERGISM_DETECTED')) {
        suggestedCauses.push('4');
        reasons.push(isEnglish ? 'Active wear particles (Synergism)' : 'ذرات سایشی فعال (Synergism)');
    }
    if (F > 10000) {
        suggestedCauses.push('2');
        reasons.push(isEnglish ? `F = ${F.toFixed(0)} N (> 10,000 N) ← Excessive load` : `F = ${F.toFixed(0)} N (> 10,000 N) ← بار بیش از حد`);
    }
    if (U > 50) {
        suggestedCauses.push('3');
        reasons.push(isEnglish ? `U = ${U.toFixed(1)} m/s (> 50 m/s) ← High speed` : `U = ${U.toFixed(1)} m/s (> 50 m/s) ← سرعت بالا`);
    }
    if (appState.getFlag('MISMATCH_REGIME')) {
        suggestedCauses.push('8');
        reasons.push(isEnglish ? 'Mismatch between actual mechanism and ideal system' : 'عدم تطابق مکانیزم واقعی با سیستم ایده‌آل');
    }
    if (appState.getFlag('CAVITATION_DETECTED')) {
        suggestedCauses.push('7');
        reasons.push(isEnglish ? 'Cavitation detected' : 'کاویتاسیون تشخیص داده شد');
    }
    if (suggestedCauses.length === 0) {
        suggestedCauses = ['10'];
        reasons.push(isEnglish ? 'No critical flags active — Further investigation needed' : 'هیچ پرچم بحرانی فعال نیست — بررسی دقیق‌تر لازم است');
    }
    const causes = [
        { code: '1', icon: '🛢️', text: isEnglish ? 'Lack of lubricant' : 'کمبود روانکار', action: isEnglish ? 'Fix lubricant supply issue → Step 3 (Question 3-6)' : 'رفع مشکل تأمین روانکار → گام ۳ (سوال ۳-۶)' },
        { code: '2', icon: '⚖️', text: isEnglish ? 'Excessive load' : 'بار بیش از حد', action: isEnglish ? 'Reduce load or select stronger material' : 'کاهش بار یا انتخاب ماده مقاوم‌تر' },
        { code: '3', icon: '🏃', text: isEnglish ? 'Inappropriate speed' : 'سرعت نامناسب', action: isEnglish ? 'Adjust speed or review film design' : 'تنظیم سرعت یا بررسی طراحی فیلم' },
        { code: '4', icon: '🏜️', text: isEnglish ? 'Contamination' : 'آلودگی', action: isEnglish ? 'Improve filtration → Step 3 (Filters)' : 'بهبود فیلتراسیون → گام ۳ (فیلترها)' },
        { code: '5', icon: '🔥', text: isEnglish ? 'High temperature' : 'دمای بالا', action: isEnglish ? 'Improve cooling → Step 3 (Cooling)' : 'بهبود خنک‌کاری → گام ۳ (خنک‌کاری)' },
        { code: '6', icon: '🔬', text: isEnglish ? 'Unsuitable material pair' : 'ترکیب مواد نامناسب', action: isEnglish ? 'Select better material pair' : 'انتخاب جفت ماده بهتر' },
        { code: '7', icon: '🕳️', text: isEnglish ? 'Chemical corrosion' : 'خوردگی شیمیایی', action: isEnglish ? 'Select corrosion-resistant lubricant' : 'انتخاب روانکار مقاوم به خوردگی' },
        { code: '8', icon: '📳', text: isEnglish ? 'Vibration / Instability' : 'ارتعاشات / ناپایداری', action: isEnglish ? 'Dynamic stability analysis' : 'تحلیل پایداری دینامیکی' },
        { code: '9', icon: '🔧', text: isEnglish ? 'Assembly error' : 'خطای مونتاژ', action: isEnglish ? 'Correct assembly and alignment' : 'اصلاح مونتاژ و هم‌محوری' },
        { code: '10', icon: '❓', text: isEnglish ? 'Unknown cause' : 'علت نامشخص', action: isEnglish ? 'Continue analysis and further investigation' : 'ادامه تحلیل و بررسی بیشتر' }
    ];
    let selectedCauses = [...suggestedCauses];
    container.innerHTML = `
        <div class="question-card">
            <div class="question-header">
                <span class="question-number">${isEnglish ? 'Question 4-15' : '۴-۱۵'}</span>
                <span class="question-tag tag-important">${isEnglish ? 'Root Cause' : 'علت ریشه‌ای'}</span>
            </div>
            <h2 class="question-title">${isEnglish ? 'Root Cause Diagnosis' : 'تشخیص علت ریشه‌ای خرابی'}</h2>
            <div class="auto-detection-box highlight">
                <div class="auto-detection-icon">🔍</div>
                <div class="auto-detection-text">
                    <strong>${isEnglish ? 'Suggested possible causes:' : 'علل محتمل پیشنهادی:'} ${suggestedCauses.map(c => causes.find(cause => cause.code === c)?.text).join(', ')}</strong>
                    <p>${isEnglish ? 'Reasons:' : 'دلایل:'}</p>
                    <ol style="margin: 8px 0; padding-right: 20px;">
                        ${reasons.map(r => `<li>${r}</li>`).join('')}
                    </ol>
                </div>
            </div>
            <p class="question-description" style="margin-top: 16px;">
                ${isCombined 
                    ? (isEnglish ? '⚠️ Combined mechanisms detected. You can select multiple causes:' : '⚠️ مکانیسم‌های ترکیبی تشخیص داده شده است. می‌توانید چند علت را انتخاب کنید:')
                    : (isEnglish ? 'Please select the main cause:' : 'لطفاً علت اصلی را انتخاب کنید:')}
            </p>
            <div class="options-list" id="causes-list">
                ${causes.map(c => `
                    <label class="option-card ${suggestedCauses.includes(c.code) ? 'option-recommended' : ''}" data-value="${c.code}">
                        <input type="${isCombined ? 'checkbox' : 'radio'}" name="root-cause" value="${c.code}" ${suggestedCauses.includes(c.code) ? 'checked' : ''}>
                        <div class="option-content">
                            <div class="option-icon">${c.icon}</div>
                            <div class="option-text">
                                <strong>${c.text}</strong>
                                <span>${c.action}</span>
                            </div>
                        </div>
                        <div class="option-${isCombined ? 'checkbox' : 'radio'}"></div>
                    </label>
                `).join('')}
            </div>
            <div class="action-bar">
                <button id="back-btn" class="btn btn-secondary">${isEnglish ? 'Back' : 'بازگشت'}</button>
                <button id="next-btn" class="btn btn-primary" ${selectedCauses.length === 0 ? 'disabled' : ''}>${isEnglish ? 'Continue' : 'ادامه'}</button>
            </div>
        </div>
    `;
    function updateNextButton() {
        const nextBtn = document.getElementById('next-btn');
        if (nextBtn) {
            nextBtn.disabled = selectedCauses.length === 0;
        }
    }
    const cards = document.querySelectorAll('#causes-list .option-card');
    cards.forEach(card => {
        const input = card.querySelector('input');
        const value = card.dataset.value;
        if (selectedCauses.includes(value)) {
            card.classList.add('selected');
        }
        card.addEventListener('click', (e) => {
            e.stopPropagation();
            if (isCombined) {
                if (input.checked) {
                    input.checked = false;
                    card.classList.remove('selected');
                    const index = selectedCauses.indexOf(value);
                    if (index !== -1) selectedCauses.splice(index, 1);
                } else {
                    input.checked = true;
                    card.classList.add('selected');
                    if (!selectedCauses.includes(value)) {
                        selectedCauses.push(value);
                    }
                }
            } else {
                cards.forEach(c => {
                    const cInput = c.querySelector('input');
                    if (cInput) cInput.checked = false;
                    c.classList.remove('selected');
                });
                input.checked = true;
                card.classList.add('selected');
                selectedCauses = [value];
            }
            updateNextButton();
        });
    });
    document.getElementById('back-btn').addEventListener('click', () => {
        window.dispatchEvent(new CustomEvent('navigate', { 
            detail: { question: '4-14' } 
        }));
    });
    document.getElementById('next-btn').addEventListener('click', () => {
        if (selectedCauses.length === 0) {
            alert(isEnglish ? 'Please select at least one cause.' : 'لطفاً حداقل یک علت را انتخاب کنید.');
            return;
        }
        appState.setAnswer('4-15-root-cause', selectedCauses);
        appState.setAnswer('4-15-root-cause-text', 
            selectedCauses.map(code => causes.find(c => c.code === code)?.text).join(', '));
        console.log(isEnglish ? 'Selected causes:' : 'علل انتخاب شده:', selectedCauses);
        window.dispatchEvent(new CustomEvent('navigate', { 
            detail: { question: '4-16' } 
        }));
    });
}