import appState from '../../state.js';
import router from '../../router.js';
export function renderQuestion3_10(container) {
    const translate = (text) => {
        if (appState.language !== 'en') return text;
        const translations = {
            'سوال ۳-۱۰': 'Question 3-10',
            'نشتی': 'Leakage',
            'آیا نشتی وجود دارد؟': 'Is there any leakage?',
            'سیستم روانکاری را از نظر نشتی بررسی کنید.': 'Check the lubrication system for leaks.',
            'خیر، نشتی وجود ندارد': 'No, there is no leakage',
            'تمامی اتصالات و آب‌بندها سالم هستند': 'All connections and seals are intact',
            'بله، نشتی از اتصالات': 'Yes, leakage from fittings',
            'روغن روی زمین، لکه‌های روغن اطراف اتصالات': 'Oil on the floor, oil stains around fittings',
            'بله، نشتی از کاسه نمد/آب‌بند': 'Yes, leakage from seal/gasket',
            'روغن از اطراف محور بیرون می‌زند': 'Oil leaks from around the shaft',
            'بله، نشتی از مخزن یا لوله‌ها': 'Yes, leakage from tank or pipes',
            'ترک یا سوراخ در مخزن/لوله‌ها': 'Crack or hole in tank/pipes',
            'بازگشت': 'Back',
            'ادامه': 'Continue',
            // هشدارها
            '⚠️ نشتی تشخیص داده شد': '⚠️ Leakage detected',
            'اتصالات را بررسی و در صورت نیاز واشرها را تعویض کنید.': 'Check the connections and replace gaskets if necessary.',
            'کاسه نمدها نیاز به تعویض دارند. سطح شفت را از نظر سایش بررسی کنید.': 'Seals need to be replaced. Check the shaft surface for wear.',
            'مخزن یا لوله‌ها نیاز به تعمیر یا تعویض دارند. خطر آلودگی محیطی!': 'The tank or pipes need repair or replacement. Risk of environmental contamination!'
        };
        return translations[text] || text;
    };
    const isRTL = document.documentElement.dir === 'rtl';
    container.innerHTML = `
        <div class="question-card">
            <div class="question-header">
                <span class="question-number">${translate('سوال ۳-۱۰')}</span>
                <span class="question-tag tag-important">${translate('نشتی')}</span>
            </div>
            <h2 class="question-title">${translate('آیا نشتی وجود دارد؟')}</h2>
            <p class="question-description">
                ${translate('سیستم روانکاری را از نظر نشتی بررسی کنید.')}
            </p>
            <div class="options-list">
                <label class="option-card" data-value="1">
                    <input type="radio" name="q3-10" value="1">
                    <div class="option-content">
                        <div class="option-icon">✅</div>
                        <div class="option-text">
                            <strong>${translate('خیر، نشتی وجود ندارد')}</strong>
                            <span>${translate('تمامی اتصالات و آب‌بندها سالم هستند')}</span>
                        </div>
                    </div>
                    <div class="option-radio"></div>
                </label>
                <label class="option-card" data-value="2">
                    <input type="radio" name="q3-10" value="2">
                    <div class="option-content">
                        <div class="option-icon">🔧</div>
                        <div class="option-text">
                            <strong>${translate('بله، نشتی از اتصالات')}</strong>
                            <span>${translate('روغن روی زمین، لکه‌های روغن اطراف اتصالات')}</span>
                        </div>
                    </div>
                    <div class="option-radio"></div>
                </label>
                <label class="option-card" data-value="3">
                    <input type="radio" name="q3-10" value="3">
                    <div class="option-content">
                        <div class="option-icon">🛡️</div>
                        <div class="option-text">
                            <strong>${translate('بله، نشتی از کاسه نمد/آب‌بند')}</strong>
                            <span>${translate('روغن از اطراف محور بیرون می‌زند')}</span>
                        </div>
                    </div>
                    <div class="option-radio"></div>
                </label>
                <label class="option-card" data-value="4">
                    <input type="radio" name="q3-10" value="4">
                    <div class="option-content">
                        <div class="option-icon">🛢️</div>
                        <div class="option-text">
                            <strong>${translate('بله، نشتی از مخزن یا لوله‌ها')}</strong>
                            <span>${translate('ترک یا سوراخ در مخزن/لوله‌ها')}</span>
                        </div>
                    </div>
                    <div class="option-radio"></div>
                </label>
            </div>
            <div id="leak-warning" style="display: none; margin-top: 16px;"></div>
            <div class="action-bar">
                <button id="back-btn-3-10" class="btn btn-secondary">${translate('بازگشت')}</button>
                <button id="next-btn-3-10" class="btn btn-primary" disabled>${translate('ادامه')}</button>
            </div>
        </div>
    `;
    let selectedValue = null;
    const nextBtn = document.getElementById('next-btn-3-10');
    const warningDiv = document.getElementById('leak-warning');
    document.querySelectorAll('input[name="q3-10"]').forEach(radio => {
        radio.addEventListener('change', (e) => {
            selectedValue = e.target.value;
            nextBtn.disabled = false;
            if (selectedValue !== '1') {
                warningDiv.style.display = 'block';
                if (selectedValue === '2') {
                    warningDiv.innerHTML = `
                        <div class="alert alert-warning">
                            <strong>${translate('⚠️ نشتی تشخیص داده شد')}</strong>
                            <p style="margin-top: 8px;">${translate('اتصالات را بررسی و در صورت نیاز واشرها را تعویض کنید.')}</p>
                        </div>
                    `;
                } else if (selectedValue === '3') {
                    warningDiv.innerHTML = `
                        <div class="alert alert-warning">
                            <strong>${translate('⚠️ نشتی تشخیص داده شد')}</strong>
                            <p style="margin-top: 8px;">${translate('کاسه نمدها نیاز به تعویض دارند. سطح شفت را از نظر سایش بررسی کنید.')}</p>
                        </div>
                    `;
                } else if (selectedValue === '4') {
                    warningDiv.innerHTML = `
                        <div class="alert alert-warning">
                            <strong>${translate('⚠️ نشتی تشخیص داده شد')}</strong>
                            <p style="margin-top: 8px;">${translate('مخزن یا لوله‌ها نیاز به تعمیر یا تعویض دارند. خطر آلودگی محیطی!')}</p>
                        </div>
                    `;
                }
            } else {
                warningDiv.style.display = 'none';
            }
        });
    });
    document.getElementById('back-btn-3-10').addEventListener('click', () => {
        window.dispatchEvent(new CustomEvent('navigate', { 
            detail: { question: '3-9' } 
        }));
    });
    nextBtn.addEventListener('click', () => {
        appState.setAnswer('3-10', selectedValue);
        appState.currentQuestion = '3-10';
        window.dispatchEvent(new CustomEvent('navigate', { 
            detail: { question: '3-11' } 
        }));
    });
    const savedAnswer = appState.getAnswer('3-10');
    if (savedAnswer) {
        const savedRadio = document.querySelector(`input[value="${savedAnswer}"]`);
        if (savedRadio) {
            savedRadio.checked = true;
            selectedValue = savedAnswer;
            nextBtn.disabled = false;
            if (selectedValue !== '1') {
                warningDiv.style.display = 'block';
                if (selectedValue === '2') {
                    warningDiv.innerHTML = `
                        <div class="alert alert-warning">
                            <strong>${translate('⚠️ نشتی تشخیص داده شد')}</strong>
                            <p style="margin-top: 8px;">${translate('اتصالات را بررسی و در صورت نیاز واشرها را تعویض کنید.')}</p>
                        </div>
                    `;
                } else if (selectedValue === '3') {
                    warningDiv.innerHTML = `
                        <div class="alert alert-warning">
                            <strong>${translate('⚠️ نشتی تشخیص داده شد')}</strong>
                            <p style="margin-top: 8px;">${translate('کاسه نمدها نیاز به تعویض دارند. سطح شفت را از نظر سایش بررسی کنید.')}</p>
                        </div>
                    `;
                } else if (selectedValue === '4') {
                    warningDiv.innerHTML = `
                        <div class="alert alert-warning">
                            <strong>${translate('⚠️ نشتی تشخیص داده شد')}</strong>
                            <p style="margin-top: 8px;">${translate('مخزن یا لوله‌ها نیاز به تعمیر یا تعویض دارند. خطر آلودگی محیطی!')}</p>
                        </div>
                    `;
                }
            }
        }
    }
}