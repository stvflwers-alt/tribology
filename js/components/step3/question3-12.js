import appState from '../../state.js';
import router from '../../router.js';
export function renderQuestion3_12(container) {
    const translate = (text) => {
        if (appState.language !== 'en') return text;
        const translations = {
            'سوال ۳-۱۲': 'Question 3-12',
            'دما': 'Temperature',
            'آیا دمای سیال مجاز است؟': 'Is the fluid temperature acceptable?',
            'دمای روغن را در شرایط کاری بررسی کنید.': 'Check the oil temperature under operating conditions.',
            'بله، دما نرمال است': 'Yes, temperature is normal',
            'لوله‌ها گرم اما داغ نیستند / دما کمتر از ۸۰ درجه': 'Pipes are warm but not hot / temperature below 80°C',
            'خیر، دما بالاست': 'No, temperature is high',
            'لوله‌ها داغ، بخار از مخزن / دما ۸۰ تا ۱۰۰ درجه': 'Pipes are hot, steam from tank / temperature 80-100°C',
            'خیر، دما بسیار بالاست': 'No, temperature is very high',
            'لوله‌ها بسیار داغ، بوی سوختگی، روغن سیاه / دما بیش از ۱۰۰ درجه': 'Pipes are very hot, burning smell, black oil / temperature above 100°C',
            'بازگشت': 'Back',
            'ادامه': 'Continue',
            // راهنماها و راه حل‌ها
            'دمای بالا (۸۰ تا ۱۰۰ درجه)': 'High Temperature (80-100°C)',
            'علل احتمالی:': 'Possible causes:',
            'نارسایی سیستم خنک‌کاری': 'Cooling system inefficiency',
            'ویسکوزیته نامناسب': 'Inappropriate viscosity',
            'بار بیش از حد': 'Overload',
            'کثیفی مبدل حرارتی': 'Heat exchanger fouling',
            'راه حل:': 'Solution:',
            'تمیزکاری یا ارتقای مبدل حرارتی': 'Clean or upgrade heat exchanger',
            'بررسی ویسکوزیته': 'Check viscosity',
            'کاهش بار در صورت امکان': 'Reduce load if possible',
            'دمای بحرانی (بیش از ۱۰۰ درجه) — خطر فوری!': 'Critical Temperature (above 100°C) — Immediate danger!',
            'علل احتمالی:': 'Possible causes:',
            'خرابی کامل سیستم خنک‌کاری': 'Complete cooling system failure',
            'اصطکاک شدید (تماس فلز با فلز)': 'Severe friction (metal-to-metal contact)',
            'روانکاری ناقص': 'Insufficient lubrication',
            'نشتی داخلی شدید': 'Severe internal leakage',
            'اقدام فوری:': 'Immediate action:',
            '⛔ دستگاه را فوراً متوقف کنید!': '⛔ Immediately stop the machine!',
            'بررسی پمپ و سیستم خنک‌کاری': 'Check pump and cooling system',
            'تعویض کامل روغن': 'Complete oil change',
            'بررسی یاتاقان‌ها از نظر آسیب': 'Check bearings for damage',
            '⚠️ هشدار بحرانی: دمای بالای ۱۰۰ درجه باعث اکسیداسیون سریع روغن، کاهش شدید ویسکوزیته، و خطر آتش‌سوزی می‌شود.': '⚠️ Critical warning: Temperature above 100°C causes rapid oil oxidation, severe viscosity reduction, and fire risk.'
        };
        return translations[text] || text;
    };
    const isRTL = document.documentElement.dir === 'rtl';
    container.innerHTML = `
        <div class="question-card">
            <div class="question-header">
                <span class="question-number">${translate('سوال ۳-۱۲')}</span>
                <span class="question-tag tag-important">${translate('دما')}</span>
            </div>
            <h2 class="question-title">${translate('آیا دمای سیال مجاز است؟')}</h2>
            <p class="question-description">
                ${translate('دمای روغن را در شرایط کاری بررسی کنید.')}
            </p>
            <div class="options-list">
                <label class="option-card" data-value="1">
                    <input type="radio" name="q3-12" value="1">
                    <div class="option-content">
                        <div class="option-icon">✅</div>
                        <div class="option-text">
                            <strong>${translate('بله، دما نرمال است')}</strong>
                            <span>${translate('لوله‌ها گرم اما داغ نیستند / دما کمتر از ۸۰ درجه')}</span>
                        </div>
                    </div>
                    <div class="option-radio"></div>
                </label>
                <label class="option-card" data-value="2">
                    <input type="radio" name="q3-12" value="2">
                    <div class="option-content">
                        <div class="option-icon">🌡️</div>
                        <div class="option-text">
                            <strong>${translate('خیر، دما بالاست')}</strong>
                            <span>${translate('لوله‌ها داغ، بخار از مخزن / دما ۸۰ تا ۱۰۰ درجه')}</span>
                        </div>
                    </div>
                    <div class="option-radio"></div>
                </label>
                <label class="option-card" data-value="3">
                    <input type="radio" name="q3-12" value="3">
                    <div class="option-content">
                        <div class="option-icon">🔥</div>
                        <div class="option-text">
                            <strong>${translate('خیر، دما بسیار بالاست')}</strong>
                            <span>${translate('لوله‌ها بسیار داغ، بوی سوختگی، روغن سیاه / دما بیش از ۱۰۰ درجه')}</span>
                        </div>
                    </div>
                    <div class="option-radio"></div>
                </label>
            </div>
            <div id="temp-diagnosis" style="display: none; margin-top: 16px;"></div>
            <div class="action-bar">
                <button id="back-btn-3-12" class="btn btn-secondary">${translate('بازگشت')}</button>
                <button id="next-btn-3-12" class="btn btn-primary" disabled>${translate('ادامه')}</button>
            </div>
        </div>
    `;
    let selectedValue = null;
    const nextBtn = document.getElementById('next-btn-3-12');
    const diagnosisDiv = document.getElementById('temp-diagnosis');
    document.querySelectorAll('input[name="q3-12"]').forEach(radio => {
        radio.addEventListener('change', (e) => {
            selectedValue = e.target.value;
            nextBtn.disabled = false;
            if (selectedValue === '2') {
                diagnosisDiv.style.display = 'block';
                diagnosisDiv.innerHTML = `
                    <div class="solution-panel">
                        <h3>🌡️ ${translate('دمای بالا (۸۰ تا ۱۰۰ درجه)')}</h3>
                        <p><strong>${translate('علل احتمالی:')}</strong></p>
                        <ul>
                            <li>${translate('نارسایی سیستم خنک‌کاری')}</li>
                            <li>${translate('ویسکوزیته نامناسب')}</li>
                            <li>${translate('بار بیش از حد')}</li>
                            <li>${translate('کثیفی مبدل حرارتی')}</li>
                        </ul>
                        <p><strong>${translate('راه حل:')}</strong></p>
                        <ul>
                            <li>${translate('تمیزکاری یا ارتقای مبدل حرارتی')}</li>
                            <li>${translate('بررسی ویسکوزیته')}</li>
                            <li>${translate('کاهش بار در صورت امکان')}</li>
                        </ul>
                    </div>
                `;
            } else if (selectedValue === '3') {
                diagnosisDiv.style.display = 'block';
                diagnosisDiv.innerHTML = `
                    <div class="solution-panel" style="border-color: #c62828;">
                        <h3>🔥 ${translate('دمای بحرانی (بیش از ۱۰۰ درجه) — خطر فوری!')}</h3>
                        <p><strong>${translate('علل احتمالی:')}</strong></p>
                        <ul>
                            <li>${translate('خرابی کامل سیستم خنک‌کاری')}</li>
                            <li>${translate('اصطکاک شدید (تماس فلز با فلز)')}</li>
                            <li>${translate('روانکاری ناقص')}</li>
                            <li>${translate('نشتی داخلی شدید')}</li>
                        </ul>
                        <p><strong>${translate('اقدام فوری:')}</strong></p>
                        <ul>
                            <li>⛔ ${translate('دستگاه را فوراً متوقف کنید!')}</li>
                            <li>${translate('بررسی پمپ و سیستم خنک‌کاری')}</li>
                            <li>${translate('تعویض کامل روغن')}</li>
                            <li>${translate('بررسی یاتاقان‌ها از نظر آسیب')}</li>
                        </ul>
                    </div>
                    <div class="alert alert-danger" style="margin-top: 12px;">
                        ⚠️ ${translate('⚠️ هشدار بحرانی: دمای بالای ۱۰۰ درجه باعث اکسیداسیون سریع روغن، کاهش شدید ویسکوزیته، و خطر آتش‌سوزی می‌شود.')}
                    </div>
                `;
                appState.setFlag('OVERHEATING_CRITICAL', true);
            } else {
                diagnosisDiv.style.display = 'none';
            }
        });
    });
    document.getElementById('back-btn-3-12').addEventListener('click', () => {
        window.dispatchEvent(new CustomEvent('navigate', { 
            detail: { question: '3-11' } 
        }));
    });
    nextBtn.addEventListener('click', () => {
        appState.setAnswer('3-12', selectedValue);
        appState.currentQuestion = '3-12';
        window.dispatchEvent(new CustomEvent('navigate', { 
            detail: { question: '3-13' } 
        }));
    });
    const savedAnswer = appState.getAnswer('3-12');
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
                        <h3>🌡️ ${translate('دمای بالا (۸۰ تا ۱۰۰ درجه)')}</h3>
                        <p><strong>${translate('علل احتمالی:')}</strong></p>
                        <ul>
                            <li>${translate('نارسایی سیستم خنک‌کاری')}</li>
                            <li>${translate('ویسکوزیته نامناسب')}</li>
                            <li>${translate('بار بیش از حد')}</li>
                            <li>${translate('کثیفی مبدل حرارتی')}</li>
                        </ul>
                        <p><strong>${translate('راه حل:')}</strong></p>
                        <ul>
                            <li>${translate('تمیزکاری یا ارتقای مبدل حرارتی')}</li>
                            <li>${translate('بررسی ویسکوزیته')}</li>
                            <li>${translate('کاهش بار در صورت امکان')}</li>
                        </ul>
                    </div>
                `;
            } else if (savedAnswer === '3') {
                diagnosisDiv.style.display = 'block';
                diagnosisDiv.innerHTML = `
                    <div class="solution-panel" style="border-color: #c62828;">
                        <h3>🔥 ${translate('دمای بحرانی (بیش از ۱۰۰ درجه) — خطر فوری!')}</h3>
                        <p><strong>${translate('علل احتمالی:')}</strong></p>
                        <ul>
                            <li>${translate('خرابی کامل سیستم خنک‌کاری')}</li>
                            <li>${translate('اصطکاک شدید (تماس فلز با فلز)')}</li>
                            <li>${translate('روانکاری ناقص')}</li>
                            <li>${translate('نشتی داخلی شدید')}</li>
                        </ul>
                        <p><strong>${translate('اقدام فوری:')}</strong></p>
                        <ul>
                            <li>⛔ ${translate('دستگاه را فوراً متوقف کنید!')}</li>
                            <li>${translate('بررسی پمپ و سیستم خنک‌کاری')}</li>
                            <li>${translate('تعویض کامل روغن')}</li>
                            <li>${translate('بررسی یاتاقان‌ها از نظر آسیب')}</li>
                        </ul>
                    </div>
                    <div class="alert alert-danger" style="margin-top: 12px;">
                        ⚠️ ${translate('⚠️ هشدار بحرانی: دمای بالای ۱۰۰ درجه باعث اکسیداسیون سریع روغن، کاهش شدید ویسکوزیته، و خطر آتش‌سوزی می‌شود.')}
                    </div>
                `;
            }
        }
    }
}