import appState from '../../state.js';
import router from '../../router.js';
export function renderQuestion3_11(container) {
    const translate = (text) => {
        if (appState.language !== 'en') return text;
        const translations = {
            'سوال ۳-۱۱': 'Question 3-11',
            'کف/هوا': 'Foam/Air',
            'آیا سیال کف کرده یا هوا گرفته است؟': 'Is the fluid foaming or aerated?',
            'وضعیت ظاهری روغن را از نظر وجود حباب و کف بررسی کنید.': 'Check the visual condition of the oil for bubbles and foam.',
            'خیر، روغن شفاف است': 'No, the oil is clear',
            'هیچ نشانه‌ای از کف یا حباب وجود ندارد': 'No signs of foam or bubbles',
            'بله، کف سطحی (Foaming)': 'Yes, surface foaming',
            'کف درشت روی سطح، حباب‌ها زود می‌ترکند': 'Coarse foam on the surface, bubbles burst quickly',
            'بله، حباب ریز (Aeration)': 'Yes, fine bubbles (Aeration)',
            'روغن شیری رنگ، حباب‌های ریز پایدار': 'Milky oil, stable fine bubbles',
            'بازگشت': 'Back',
            'ادامه': 'Continue',
            // راهنماها و راه حل‌ها
            'کف سطحی (Foaming)': 'Surface Foaming',
            'علت: تلاطم شدید روغن در مخزن': 'Cause: Severe oil turbulence in the tank',
            'راه حل:': 'Solution:',
            'افزودن مواد ضدکف': 'Add anti-foam agents',
            'اصلاح طراحی مخزن (افزایش زمان اقامت)': 'Improve tank design (increase residence time)',
            'نصب بافل برای کاهش تلاطم': 'Install baffles to reduce turbulence',
            'بررسی برگشت روغن (زیر سطح مایع باشد)': 'Check oil return (below liquid level)',
            'حباب ریز (Aeration) — بحرانی!': 'Fine bubbles (Aeration) — Critical!',
            'علت: مکش هوا در مسیر برگشت یا پمپ': 'Cause: Air suction in return line or pump',
            'بررسی آب‌بندی مسیر مکش پمپ': 'Check pump suction line sealing',
            'اطمینان از غوطه‌ور بودن لوله برگشت': 'Ensure return pipe is submerged',
            'افزایش سطح روغن در مخزن': 'Increase oil level in the tank',
            'نصب هواگیر': 'Install air eliminator',
            '⚠️ هشدار: Aeration می‌تواند باعث کاهش شدید عمر یاتاقان‌ها شود.': '⚠️ Warning: Aeration can significantly reduce bearing life.'
        };
        return translations[text] || text;
    };
    const isRTL = document.documentElement.dir === 'rtl';
    container.innerHTML = `
        <div class="question-card">
            <div class="question-header">
                <span class="question-number">${translate('سوال ۳-۱۱')}</span>
                <span class="question-tag tag-important">${translate('کف/هوا')}</span>
            </div>
            <h2 class="question-title">${translate('آیا سیال کف کرده یا هوا گرفته است؟')}</h2>
            <p class="question-description">
                ${translate('وضعیت ظاهری روغن را از نظر وجود حباب و کف بررسی کنید.')}
            </p>
            <div class="options-list">
                <label class="option-card" data-value="1">
                    <input type="radio" name="q3-11" value="1">
                    <div class="option-content">
                        <div class="option-icon">✅</div>
                        <div class="option-text">
                            <strong>${translate('خیر، روغن شفاف است')}</strong>
                            <span>${translate('هیچ نشانه‌ای از کف یا حباب وجود ندارد')}</span>
                        </div>
                    </div>
                    <div class="option-radio"></div>
                </label>
                <label class="option-card" data-value="2">
                    <input type="radio" name="q3-11" value="2">
                    <div class="option-content">
                        <div class="option-icon">🫧</div>
                        <div class="option-text">
                            <strong>${translate('بله، کف سطحی (Foaming)')}</strong>
                            <span>${translate('کف درشت روی سطح، حباب‌ها زود می‌ترکند')}</span>
                        </div>
                    </div>
                    <div class="option-radio"></div>
                </label>
                <label class="option-card" data-value="3">
                    <input type="radio" name="q3-11" value="3">
                    <div class="option-content">
                        <div class="option-icon">💨</div>
                        <div class="option-text">
                            <strong>${translate('بله، حباب ریز (Aeration)')}</strong>
                            <span>${translate('روغن شیری رنگ، حباب‌های ریز پایدار')}</span>
                        </div>
                    </div>
                    <div class="option-radio"></div>
                </label>
            </div>
            <div id="foam-diagnosis" style="display: none; margin-top: 16px;"></div>
            <div class="action-bar">
                <button id="back-btn-3-11" class="btn btn-secondary">${translate('بازگشت')}</button>
                <button id="next-btn-3-11" class="btn btn-primary" disabled>${translate('ادامه')}</button>
            </div>
        </div>
    `;
    let selectedValue = null;
    const nextBtn = document.getElementById('next-btn-3-11');
    const diagnosisDiv = document.getElementById('foam-diagnosis');
    document.querySelectorAll('input[name="q3-11"]').forEach(radio => {
        radio.addEventListener('change', (e) => {
            selectedValue = e.target.value;
            nextBtn.disabled = false;
            if (selectedValue === '2') {
                diagnosisDiv.style.display = 'block';
                diagnosisDiv.innerHTML = `
                    <div class="solution-panel">
                        <h3>🫧 ${translate('کف سطحی (Foaming)')}</h3>
                        <p><strong>${translate('علت: تلاطم شدید روغن در مخزن')}</strong></p>
                        <p><strong>${translate('راه حل:')}</strong></p>
                        <ul>
                            <li>${translate('افزودن مواد ضدکف')}</li>
                            <li>${translate('اصلاح طراحی مخزن (افزایش زمان اقامت)')}</li>
                            <li>${translate('نصب بافل برای کاهش تلاطم')}</li>
                            <li>${translate('بررسی برگشت روغن (زیر سطح مایع باشد)')}</li>
                        </ul>
                    </div>
                `;
            } else if (selectedValue === '3') {
                diagnosisDiv.style.display = 'block';
                diagnosisDiv.innerHTML = `
                    <div class="solution-panel" style="border-color: #c62828;">
                        <h3>💨 ${translate('حباب ریز (Aeration) — بحرانی!')}</h3>
                        <p><strong>${translate('علت: مکش هوا در مسیر برگشت یا پمپ')}</strong></p>
                        <p><strong>${translate('راه حل:')}</strong></p>
                        <ul>
                            <li>${translate('بررسی آب‌بندی مسیر مکش پمپ')}</li>
                            <li>${translate('اطمینان از غوطه‌ور بودن لوله برگشت')}</li>
                            <li>${translate('افزایش سطح روغن در مخزن')}</li>
                            <li>${translate('نصب هواگیر')}</li>
                        </ul>
                    </div>
                    <div class="alert alert-danger" style="margin-top: 12px;">
                        ⚠️ ${translate('⚠️ هشدار: Aeration می‌تواند باعث کاهش شدید عمر یاتاقان‌ها شود.')}
                    </div>
                `;
                appState.setFlag('AERATION_DETECTED', true);
            } else {
                diagnosisDiv.style.display = 'none';
            }
        });
    });
    document.getElementById('back-btn-3-11').addEventListener('click', () => {
        window.dispatchEvent(new CustomEvent('navigate', { 
            detail: { question: '3-10' } 
        }));
    });
    nextBtn.addEventListener('click', () => {
        appState.setAnswer('3-11', selectedValue);
        appState.currentQuestion = '3-11';
        window.dispatchEvent(new CustomEvent('navigate', { 
            detail: { question: '3-12' } 
        }));
    });
    const savedAnswer = appState.getAnswer('3-11');
    if (savedAnswer) {
        const savedRadio = document.querySelector(`input[value="${savedAnswer}"]`);
        if (savedRadio) {
            savedRadio.checked = true;
            selectedValue = savedAnswer;
            nextBtn.disabled = false;
            if (savedAnswer === '2') {
                diagnosisDiv.style.display = 'block';
                diagnosisDiv.innerHTML = `
                    <div class="solution-panel">
                        <h3>🫧 ${translate('کف سطحی (Foaming)')}</h3>
                        <p><strong>${translate('علت: تلاطم شدید روغن در مخزن')}</strong></p>
                        <p><strong>${translate('راه حل:')}</strong></p>
                        <ul>
                            <li>${translate('افزودن مواد ضدکف')}</li>
                            <li>${translate('اصلاح طراحی مخزن (افزایش زمان اقامت)')}</li>
                            <li>${translate('نصب بافل برای کاهش تلاطم')}</li>
                            <li>${translate('بررسی برگشت روغن (زیر سطح مایع باشد)')}</li>
                        </ul>
                    </div>
                `;
            } else if (savedAnswer === '3') {
                diagnosisDiv.style.display = 'block';
                diagnosisDiv.innerHTML = `
                    <div class="solution-panel" style="border-color: #c62828;">
                        <h3>💨 ${translate('حباب ریز (Aeration) — بحرانی!')}</h3>
                        <p><strong>${translate('علت: مکش هوا در مسیر برگشت یا پمپ')}</strong></p>
                        <p><strong>${translate('راه حل:')}</strong></p>
                        <ul>
                            <li>${translate('بررسی آب‌بندی مسیر مکش پمپ')}</li>
                            <li>${translate('اطمینان از غوطه‌ور بودن لوله برگشت')}</li>
                            <li>${translate('افزایش سطح روغن در مخزن')}</li>
                            <li>${translate('نصب هواگیر')}</li>
                        </ul>
                    </div>
                    <div class="alert alert-danger" style="margin-top: 12px;">
                        ⚠️ ${translate('⚠️ هشدار: Aeration می‌تواند باعث کاهش شدید عمر یاتاقان‌ها شود.')}
                    </div>
                `;
            }
        }
    }
}