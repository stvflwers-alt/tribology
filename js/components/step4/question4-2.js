import appState from '../../state.js';
import router from '../../router.js';
import Calculations from '../../calculations.js';

const GAS_PROPERTIES = {
    'air': {
        name: 'هوا (Air)',
        name_en: 'Air',
        mu_g: 18.2e-6,
        rho: 1.205,
        cp: 1005,
        R_specific: 287,
        k: 0.026,
        T_max: 1000,
        desc: 'Default, low cost',
        desc_fa: 'پیش‌فرض، کم‌هزینه'
    },
    'nitrogen': {
        name: 'نیتروژن (N₂)',
        name_en: 'Nitrogen',
        mu_g: 17.8e-6,
        rho: 1.165,
        cp: 1040,
        R_specific: 296.8,
        k: 0.026,
        T_max: 1000,
        desc: 'For explosive/oxidizing environments',
        desc_fa: 'مناسب محیط انفجاری یا اکسیداسیون‌زا'
    },
    'helium': {
        name: 'هلیوم (He)',
        name_en: 'Helium',
        mu_g: 19.8e-6,
        rho: 0.166,
        cp: 5193,
        R_specific: 2077,
        k: 0.152,
        T_max: 1000,
        desc: 'High heat dissipation',
        desc_fa: 'دفع حرارت بالا'
    },
    'argon': {
        name: 'آرگون (Ar)',
        name_en: 'Argon',
        mu_g: 22.6e-6,
        rho: 1.662,
        cp: 520,
        R_specific: 208.1,
        k: 0.017,
        T_max: 1000,
        desc: 'For vacuum processes',
        desc_fa: 'مناسب فرآیندهای خلأ'
    }
};

const SUTHERLAND_CONSTANTS = {
    'air': 110.4,
    'nitrogen': 111.0,
    'helium': 79.4,
    'argon': 142.0
};

function calculateGasViscosityAtTemperature(mu_ref, T_ref, T, S) {
    if (T <= 0) T = 20;
    const T_ref_K = T_ref + 273.15;
    const T_K = T + 273.15;
    return mu_ref * Math.pow(T_K / T_ref_K, 1.5) * (T_ref_K + S) / (T_K + S);
}

function getGasIcon(code) {
    const icons = {
        'air': '💨',
        'nitrogen': '🟣',
        'helium': '🎈',
        'argon': '🔵'
    };
    return icons[code] || '❓';
}

function getSuggestionReason(code, isEnglish) {
    if (isEnglish) {
        const reasons = {
            'air': 'Default selection for standard operating conditions.',
            'nitrogen': 'Recommended for explosive or oxidizing environments.',
            'helium': 'Recommended for high temperature applications requiring cooling.',
            'argon': 'Recommended for vacuum processes.'
        };
        return reasons[code] || '';
    } else {
        const reasons = {
            'air': 'انتخاب پیش‌فرض برای شرایط عملیاتی استاندارد.',
            'nitrogen': 'مناسب برای محیط‌های انفجاری یا اکسیداسیون‌زا.',
            'helium': 'مناسب برای کاربردهای دمای بالا نیازمند خنک‌کاری.',
            'argon': 'مناسب برای فرآیندهای خلأ.'
        };
        return reasons[code] || '';
    }
}

export function renderQuestion4_2(container) {
    const isEnglish = appState.language === 'en';
    const lubricantName = appState.getAnswer('4-1-lubricant-name') || (isEnglish ? 'Lubricant' : 'روانکار');
    const regime = appState.getAnswer('3-2')?.recommendedSystem;

    if (regime === 9) {
        showGreaseOptions(container);
        return;
    }

    if (regime === 7 || regime === 8) {
        showGasOptions(container);
        return;
    }

    container.innerHTML = `
        <div class="question-card">
            <div class="question-header">
                <span class="question-number">${isEnglish ? 'Question 4-2' : '۴-۲'}</span>
                <span class="question-tag tag-standard">${isEnglish ? 'Viscosity' : 'ویسکوزیته'}</span>
            </div>
            <h2 class="question-title">${isEnglish ? 'Lubricant Parameters — Viscosity Calculation' : 'پارامترهای روانکار — محاسبه ویسکوزیته'}</h2>
            <p class="question-description">
                ${isEnglish ? `Selected lubricant: <strong>${lubricantName}</strong><br>There are two methods for calculating dynamic viscosity (η₀) and pressure-viscosity coefficient (α):` : `روانکار انتخابی: <strong>${lubricantName}</strong><br>برای محاسبه ویسکوزیته دینامیکی (η₀) و ضریب فشار-ویسکوزیته (α)، دو روش وجود دارد:`}
            </p>
            <div class="options-list">
                <label class="option-card" data-value="precise">
                    <input type="radio" name="calc-method" value="precise">
                    <div class="option-content">
                        <div class="option-icon">🔬</div>
                        <div class="option-text">
                            <strong>${isEnglish ? 'Precise Calculation' : 'محاسبه دقیق'}</strong>
                            <span>${isEnglish ? 'Requires three viscosity-temperature points + density | High accuracy' : 'نیاز به سه نقطه ویسکوزیته-دما + چگالی | دقت بالا'}</span>
                        </div>
                    </div>
                    <div class="option-radio"></div>
                </label>
                <label class="option-card" data-value="estimated">
                    <input type="radio" name="calc-method" value="estimated">
                    <div class="option-content">
                        <div class="option-icon">📊</div>
                        <div class="option-text">
                            <strong>${isEnglish ? 'Estimation from ISO VG' : 'تخمین از گرید ISO VG'}</strong>
                            <span>${isEnglish ? 'Only needs ISO VG grade (on the barrel) | Approximate accuracy' : 'فقط نیاز به گرید ویسکوزیته (روی بشکه) | دقت تقریبی'}</span>
                        </div>
                    </div>
                    <div class="option-radio"></div>
                </label>
            </div>
            <div class="action-bar">
                <button id="back-btn" class="btn btn-secondary">${isEnglish ? 'Back' : 'بازگشت'}</button>
                <button id="next-btn" class="btn btn-primary" disabled>${isEnglish ? 'Continue' : 'ادامه'}</button>
            </div>
        </div>
    `;

    let selectedMethod = null;

    document.querySelectorAll('.option-card').forEach(card => {
        card.addEventListener('click', function() {
            document.querySelectorAll('.option-card').forEach(c => c.classList.remove('selected'));
            this.classList.add('selected');
            selectedMethod = this.dataset.value;
            document.getElementById('next-btn').disabled = false;
        });
    });

    document.getElementById('back-btn').addEventListener('click', () => {
        if (window.app && window.app.goBack) {
            window.app.goBack();
        } else {
            window.dispatchEvent(new CustomEvent('navigate', {
                detail: { question: '4-1' }
            }));
        }
    });

    document.getElementById('next-btn').addEventListener('click', () => {
        if (!selectedMethod) return;
        if (selectedMethod === 'precise') {
            showDataAvailabilityConfirm(container);
        } else {
            showEstimatedInputs(container);
        }
    });
}

function showDataAvailabilityConfirm(container) {
    const isEnglish = appState.language === 'en';

    container.innerHTML = `
        <div class="question-card">
            <div class="question-header">
                <span class="question-number">${isEnglish ? 'Question 4-2' : '۴-۲'}</span>
                <span class="question-tag tag-conditional">${isEnglish ? 'Data Confirmation' : 'تأیید داده‌ها'}</span>
            </div>
            <h2 class="question-title">${isEnglish ? 'Do you have viscosity data?' : 'آیا داده‌های ویسکوزیته را دارید؟'}</h2>
            <div class="alert alert-warning" style="margin-bottom: 20px;">
                ⚠️ ${isEnglish ? 'The precise method requires the following data:' : 'برای روش دقیق به داده‌های زیر نیاز دارید:'}
                <ul style="margin-top: 8px; padding-right: 20px;">
                    <li>${isEnglish ? 'Viscosity at three different temperatures (e.g., 40°C, 100°C, and 150°C)' : 'ویسکوزیته در سه دمای مختلف (مثلاً 40°C، 100°C، و 150°C)'}</li>
                    <li>${isEnglish ? 'Lubricant density at working temperature' : 'چگالی روانکار در دمای کاری'}</li>
                </ul>
            </div>
            <div class="options-list">
                <label class="option-card" data-value="yes">
                    <input type="radio" name="data-available" value="yes">
                    <div class="option-content">
                        <div class="option-icon">✅</div>
                        <div class="option-text">
                            <strong>${isEnglish ? 'Yes, I will enter the data' : 'بله، داده‌ها را وارد می‌کنم'}</strong>
                        </div>
                    </div>
                    <div class="option-radio"></div>
                </label>
                <label class="option-card" data-value="no">
                    <input type="radio" name="data-available" value="no">
                    <div class="option-content">
                        <div class="option-icon">⚠️</div>
                        <div class="option-text">
                            <strong>${isEnglish ? 'No, I will use the estimation method' : 'خیر، از روش تخمینی استفاده می‌کنم'}</strong>
                        </div>
                    </div>
                    <div class="option-radio"></div>
                </label>
            </div>
            <div class="action-bar">
                <button id="back-data-btn" class="btn btn-secondary">${isEnglish ? 'Back' : 'بازگشت'}</button>
                <button id="next-data-btn" class="btn btn-primary" disabled>${isEnglish ? 'Continue' : 'ادامه'}</button>
            </div>
        </div>
    `;

    let selected = null;

    document.querySelectorAll('.option-card').forEach(card => {
        card.addEventListener('click', () => {
            document.querySelectorAll('.option-card').forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');
            selected = card.dataset.value;
            document.getElementById('next-data-btn').disabled = false;
        });
    });

    document.getElementById('back-data-btn').addEventListener('click', () => {
        renderQuestion4_2(container);
    });

    document.getElementById('next-data-btn').addEventListener('click', () => {
        if (selected === 'yes') {
            showPreciseInputs(container);
        } else {
            showEstimatedInputs(container);
        }
    });
}

function showPreciseInputs(container) {
    const isEnglish = appState.language === 'en';

    container.innerHTML = `
        <div class="question-card">
            <div class="question-header">
                <span class="question-number">${isEnglish ? 'Question 4-2' : '۴-۲'}</span>
                <span class="question-tag tag-auto">${isEnglish ? 'Precise Calculation' : 'محاسبه دقیق'}</span>
            </div>
            <h2 class="question-title">${isEnglish ? 'Viscosity Data — Precise Method' : 'داده‌های ویسکوزیته — روش دقیق'}</h2>
            <div class="formula-panel">
                <h4>📐 ${isEnglish ? 'Vogel Equation (calculate η₀)' : 'معادله وگل (محاسبه η₀)'}</h4>
                <div class="numeric-inputs-container">
                    <div class="input-group">
                        <label><span class="input-label">η₁ — ${isEnglish ? 'Viscosity at T₁' : 'ویسکوزیته در T₁'}</span><span class="input-unit">Pa·s</span></label>
                        <input type="number" id="eta1" class="numeric-input" placeholder="${isEnglish ? 'Example: 0.05' : 'مثال: 0.05'}" step="any" min="0">
                    </div>
                    <div class="input-group">
                        <label><span class="input-label">T₁ — ${isEnglish ? 'Temperature point 1' : 'دمای نقطه ۱'}</span><span class="input-unit">°C</span></label>
                        <input type="number" id="T1" class="numeric-input" placeholder="${isEnglish ? 'Example: 40' : 'مثال: 40'}" step="any">
                    </div>
                    <div class="input-group">
                        <label><span class="input-label">η₂ — ${isEnglish ? 'Viscosity at T₂' : 'ویسکوزیته در T₂'}</span><span class="input-unit">Pa·s</span></label>
                        <input type="number" id="eta2" class="numeric-input" placeholder="${isEnglish ? 'Example: 0.008' : 'مثال: 0.008'}" step="any" min="0">
                    </div>
                    <div class="input-group">
                        <label><span class="input-label">T₂ — ${isEnglish ? 'Temperature point 2' : 'دمای نقطه ۲'}</span><span class="input-unit">°C</span></label>
                        <input type="number" id="T2" class="numeric-input" placeholder="${isEnglish ? 'Example: 100' : 'مثال: 100'}" step="any">
                    </div>
                    <div class="input-group">
                        <label><span class="input-label">η₃ — ${isEnglish ? 'Viscosity at T₃ (optional)' : 'ویسکوزیته در T₃ (اختیاری)'}</span><span class="input-unit">Pa·s</span></label>
                        <input type="number" id="eta3" class="numeric-input" placeholder="${isEnglish ? 'Optional' : 'اختیاری'}" step="any" min="0">
                    </div>
                    <div class="input-group">
                        <label><span class="input-label">T₃ — ${isEnglish ? 'Temperature point 3 (optional)' : 'دمای نقطه ۳ (اختیاری)'}</span><span class="input-unit">°C</span></label>
                        <input type="number" id="T3" class="numeric-input" placeholder="${isEnglish ? 'Optional' : 'اختیاری'}" step="any">
                    </div>
                </div>
            </div>
            <div class="formula-panel" style="margin-top: 20px;">
                <h4>📐 ${isEnglish ? 'So & Klaus Equation (calculate α)' : 'معادله سو و کلاوس (محاسبه α)'}</h4>
                <div class="numeric-inputs-container">
                    <div class="input-group">
                        <label><span class="input-label">ν₀ — ${isEnglish ? 'Kinematic viscosity at working temperature' : 'ویسکوزیته سینماتیکی در دمای کاری'}</span><span class="input-unit">cSt</span></label>
                        <input type="number" id="nu0" class="numeric-input" placeholder="${isEnglish ? 'Example: 32' : 'مثال: 32'}" step="any" min="0">
                    </div>
                    <div class="input-group">
                        <label><span class="input-label">m₀ — ${isEnglish ? 'Viscosity-temperature slope' : 'شیب ویسکوزیته-دما'}</span><span class="input-unit">—</span></label>
                        <input type="number" id="m0" class="numeric-input" placeholder="${isEnglish ? 'Example: 0.045' : 'مثال: 0.045'}" step="any">
                    </div>
                    <div class="input-group">
                        <label><span class="input-label">ρ₀ — ${isEnglish ? 'Density at working temperature' : 'چگالی در دمای کاری'}</span><span class="input-unit">kg/m³</span></label>
                        <input type="number" id="rho0" class="numeric-input" placeholder="${isEnglish ? 'Example: 850' : 'مثال: 850'}" step="any" min="0">
                    </div>
                </div>
            </div>
            <div class="action-bar">
                <button id="back-method-btn" class="btn btn-secondary">${isEnglish ? 'Back to Method Selection' : 'بازگشت به انتخاب روش'}</button>
                <button id="calculate-btn" class="btn btn-primary" disabled>${isEnglish ? 'Calculate' : 'محاسبه'}</button>
            </div>
        </div>
    `;

    const inputs = ['eta1', 'T1', 'eta2', 'T2', 'nu0', 'm0', 'rho0'];

    function checkInputs() {
        const allFilled = inputs.every(id => {
            const val = document.getElementById(id)?.value;
            return val !== '' && val !== null;
        });
        document.getElementById('calculate-btn').disabled = !allFilled;
    }

    inputs.forEach(id => {
        document.getElementById(id)?.addEventListener('input', checkInputs);
    });

    document.getElementById('back-method-btn').addEventListener('click', () => {
        renderQuestion4_2(container);
    });

    document.getElementById('calculate-btn').addEventListener('click', () => {
        const contactData = appState.getAnswer('3-0') || {};
        const T_working = contactData.T_C || 25;
        const eta1 = parseFloat(document.getElementById('eta1').value);
        const T1_val = parseFloat(document.getElementById('T1').value);
        const eta2 = parseFloat(document.getElementById('eta2').value);
        const T2_val = parseFloat(document.getElementById('T2').value);
        const eta3_val = parseFloat(document.getElementById('eta3')?.value || '');
        const T3_val = parseFloat(document.getElementById('T3')?.value || '');
        let eta0;

        if (eta3_val && T3_val) {
            const lnEta1 = Math.log(eta1), lnEta2 = Math.log(eta2), lnEta3 = Math.log(eta3_val);
            const B = (lnEta2 - lnEta1) / (1/(T2_val + 273) - 1/(T1_val + 273));
            eta0 = Math.exp(lnEta1 + B * (1/(T_working + 273) - 1/(T1_val + 273)));
        } else {
            const lnEta1 = Math.log(eta1), lnEta2 = Math.log(eta2);
            const B = (lnEta2 - lnEta1) / (1/(T2_val + 273) - 1/(T1_val + 273));
            eta0 = Math.exp(lnEta1 + B * (1/(T_working + 273) - 1/(T1_val + 273)));
        }

        const nu0 = parseFloat(document.getElementById('nu0').value);
        const rho0 = parseFloat(document.getElementById('rho0').value);
        const alpha = (0.6 + 0.965 * Math.log10(nu0)) * 1e-8;

        appState.setAnswer('4-2-eta0', eta0);
        appState.setAnswer('4-2-alpha', alpha);
        appState.setAnswer('4-2-rho0', rho0);
        appState.setAnswer('4-2-method-used', 'precise');

        const lubricantCode = appState.getAnswer('4-1-lubricant-code') || 'mineral';
        const lubeData = getLubricantDatabase(lubricantCode);
        showResults(container, eta0, alpha, rho0, 'precise', lubeData);
    });
}

function showEstimatedInputs(container) {
    const isEnglish = appState.language === 'en';
    const isoGrades = [2, 5, 7, 10, 15, 22, 32, 46, 56, 63, 68, 100, 150, 220, 320, 460, 680, 1000, 1500];

    container.innerHTML = `
        <div class="question-card">
            <div class="question-header">
                <span class="question-number">${isEnglish ? 'Question 4-2' : '۴-۲'}</span>
                <span class="question-tag tag-auto">${isEnglish ? 'Estimation from ISO VG' : 'تخمین از ISO VG'}</span>
            </div>
            <h2 class="question-title">${isEnglish ? 'Select ISO VG Grade' : 'انتخاب گرید ISO VG'}</h2>
            <p class="question-description">
                ${isEnglish ? 'Please select the viscosity grade of the lubricant (the number on the barrel).' : 'لطفاً گرید ویسکوزیته روانکار (عدد روی بشکه) را انتخاب کنید.'}
            </p>
            <div class="alert alert-warning" style="margin-bottom: 20px;">
                ⚠️ ${isEnglish ? 'The estimation method has lower accuracy. η₀ is converted from ISO VG to working temperature using the Walter equation.' : 'روش تخمینی دقت کمتری دارد. η₀ با معادله والتر از ISO VG به دمای کاری تبدیل می‌شود.'}
            </div>
            <div class="options-list" style="max-height: 400px; overflow-y: auto;">
                ${isoGrades.map(grade => `
                    <label class="option-card" data-value="${grade}">
                        <input type="radio" name="iso-grade" value="${grade}">
                        <div class="option-content">
                            <div class="option-icon" style="background: #E3F2FD; color: #1565C0; font-weight: 700; font-size: 1.1rem;">
                                ${grade}
                            </div>
                            <div class="option-text">
                                <strong>ISO VG ${grade}</strong>
                            </div>
                        </div>
                        <div class="option-radio"></div>
                    </label>
                `).join('')}
                <label class="option-card" data-value="other">
                    <input type="radio" name="iso-grade" value="other">
                    <div class="option-content">
                        <div class="option-icon">✏️</div>
                        <div class="option-text">
                            <strong>${isEnglish ? 'Other — Manual Entry' : 'سایر — وارد کردن دستی'}</strong>
                        </div>
                    </div>
                    <div class="option-radio"></div>
                </label>
            </div>
            <div id="custom-grade-form" style="display: none; margin-top: 16px;">
                <div class="input-group">
                    <label><span class="input-label">${isEnglish ? 'Kinematic viscosity at 40°C' : 'ویسکوزیته سینماتیکی در 40°C'}</span><span class="input-unit">cSt</span></label>
                    <input type="number" id="custom-viscosity" class="numeric-input" placeholder="${isEnglish ? 'Example: 46' : 'مثال: 46'}" step="any" min="0">
                </div>
            </div>
            <div id="calculation-preview" style="display: none; margin-top: 20px;"></div>
            <div class="action-bar">
                <button id="back-method-btn" class="btn btn-secondary">${isEnglish ? 'Back to Method Selection' : 'بازگشت به انتخاب روش'}</button>
                <button id="confirm-iso-btn" class="btn btn-primary" disabled>${isEnglish ? 'Confirm & Calculate' : 'تأیید و محاسبه'}</button>
            </div>
        </div>
    `;

    let selectedGrade = null;
    let isCustom = false;

    document.querySelectorAll('.option-card').forEach(card => {
        card.addEventListener('click', function() {
            if (this.dataset.value === 'other') {
                document.querySelectorAll('.option-card').forEach(c => c.classList.remove('selected'));
                this.classList.add('selected');
                isCustom = true;
                selectedGrade = null;
                document.getElementById('custom-grade-form').style.display = 'block';
                document.getElementById('confirm-iso-btn').disabled = true;
                document.getElementById('calculation-preview').style.display = 'none';
            } else {
                document.querySelectorAll('.option-card').forEach(c => c.classList.remove('selected'));
                this.classList.add('selected');
                isCustom = false;
                selectedGrade = parseInt(this.dataset.value);
                document.getElementById('custom-grade-form').style.display = 'none';
                document.getElementById('confirm-iso-btn').disabled = false;
                showEstimationPreview(selectedGrade);
            }
        });
    });

    document.getElementById('custom-viscosity')?.addEventListener('input', function() {
        const val = parseFloat(this.value);
        if (!isNaN(val) && val > 0) {
            selectedGrade = val;
            document.getElementById('confirm-iso-btn').disabled = false;
            showEstimationPreview(val);
        } else {
            document.getElementById('confirm-iso-btn').disabled = true;
        }
    });

    document.getElementById('back-method-btn').addEventListener('click', () => {
        renderQuestion4_2(container);
    });

    document.getElementById('confirm-iso-btn').addEventListener('click', () => {
        if (!selectedGrade) return;
        const contactData = appState.getAnswer('3-0') || {};
        const T_working = contactData.T_C || 25;
        const rho_typical = 850;
        const eta40 = selectedGrade * 1e-6 * rho_typical;
        const m_slope = 0.045;
        const T_working_K = T_working + 273.15;
        const T_40_K = 40 + 273.15;
        const eta0 = eta40 * Math.exp(m_slope * (1/T_working_K - 1/T_40_K) * 1e4);
        const alpha = (0.6 + 0.965 * Math.log10(selectedGrade)) * 1e-8;
        const lubricantCode = appState.getAnswer('4-1-lubricant-code') || 'mineral';
        const lubeData = getLubricantDatabase(lubricantCode);

        appState.setAnswer('4-2-eta0', eta0);
        appState.setAnswer('4-2-alpha', alpha);
        appState.setAnswer('4-2-iso-grade', selectedGrade);
        appState.setAnswer('4-2-rho0', rho_typical);
        appState.setAnswer('4-2-method-used', 'estimated');
        appState.setAnswer('4-2-vi', lubeData.vi);
        appState.setAnswer('4-2-t_max', lubeData.t_max);

        showResults(container, eta0, alpha, rho_typical, 'estimated', lubeData);
    });

    function showEstimationPreview(grade) {
        const isEnglish = appState.language === 'en';
        const contactData = appState.getAnswer('3-0') || {};
        const T_working = contactData.T_C || 25;
        const rho_typical = 850;
        const eta40 = grade * 1e-6 * rho_typical;
        const m_slope = 0.045;
        const T_working_K = T_working + 273.15;
        const T_40_K = 40 + 273.15;
        const eta0 = eta40 * Math.exp(m_slope * (1/T_working_K - 1/T_40_K) * 1e4);
        const alpha = (0.6 + 0.965 * Math.log10(grade)) * 1e-8;

        document.getElementById('calculation-preview').style.display = 'block';
        document.getElementById('calculation-preview').innerHTML = `
            <div class="result-panel" style="background: #f0f7ff;">
                <h4>📊 ${isEnglish ? 'Estimated Results' : 'نتایج تخمینی'}</h4>
                <div class="result-grid">
                    <div class="result-item">
                        <span class="label">η₀ (${isEnglish ? 'at' : 'در'} ${T_working}°C)</span>
                        <span class="value">${eta0.toExponential(3)} Pa·s</span>
                    </div>
                    <div class="result-item">
                        <span class="label">α (${isEnglish ? 'estimated' : 'تخمینی'})</span>
                        <span class="value">${alpha.toExponential(2)} Pa⁻¹</span>
                    </div>
                </div>
            </div>
        `;
    }
}

function showGreaseOptions(container) {
    const isEnglish = appState.language === 'en';

    container.innerHTML = `
        <div class="question-card">
            <div class="question-header">
                <span class="question-number">${isEnglish ? 'Question 4-2' : '۴-۲'}</span>
                <span class="question-tag tag-conditional">${isEnglish ? 'Grease' : 'گریس'}</span>
            </div>
            <h2 class="question-title">${isEnglish ? 'Grease Analysis' : 'تحلیل گریس'}</h2>
            <p class="question-description">
                ${isEnglish ? 'There are two methods for grease analysis:' : 'برای گریس، دو روش تحلیل وجود دارد:'}
            </p>
            <div class="options-list">
                <label class="option-card" data-value="simple">
                    <input type="radio" name="grease-method" value="simple">
                    <div class="option-content">
                        <div class="option-icon">📊</div>
                        <div class="option-text">
                            <strong>${isEnglish ? 'Simple Analysis (Newtonian approximation)' : 'تحلیل ساده (تقریب نیوتنی)'}</strong>
                            <span>${isEnglish ? 'τ_p = 0, n = 1 | Grease behaves like base oil | Accuracy ±20-30%' : 'τ_p = 0, n = 1 | گریس مانند روغن پایه رفتار می‌کند | دقت ±۲۰-۳۰٪'}</span>
                        </div>
                    </div>
                    <div class="option-radio"></div>
                </label>
                <label class="option-card" data-value="precise">
                    <input type="radio" name="grease-method" value="precise">
                    <div class="option-content">
                        <div class="option-icon">🔬</div>
                        <div class="option-text">
                            <strong>${isEnglish ? 'Precise Analysis (Herschel-Bulkley model)' : 'تحلیل دقیق (مدل هرشل-بالکلی)'}</strong>
                            <span>${isEnglish ? 'Requires τ_p and n from datasheet | FDM solution | High accuracy' : 'نیاز به τ_p و n از Datasheet | حل با FDM | دقت بالا'}</span>
                        </div>
                    </div>
                    <div class="option-radio"></div>
                </label>
            </div>
            <div class="action-bar">
                <button id="back-btn" class="btn btn-secondary">${isEnglish ? 'Back' : 'بازگشت'}</button>
                <button id="next-btn" class="btn btn-primary" disabled>${isEnglish ? 'Continue' : 'ادامه'}</button>
            </div>
        </div>
    `;

    let selectedMethod = null;

    document.querySelectorAll('.option-card').forEach(card => {
        card.addEventListener('click', function() {
            document.querySelectorAll('.option-card').forEach(c => c.classList.remove('selected'));
            this.classList.add('selected');
            selectedMethod = this.dataset.value;
            document.getElementById('next-btn').disabled = false;
        });
    });

    document.getElementById('back-btn').addEventListener('click', () => {
        if (window.app && window.app.goBack) {
            window.app.goBack();
        } else {
            window.dispatchEvent(new CustomEvent('navigate', {
                detail: { question: '4-1' }
            }));
        }
    });

    document.getElementById('next-btn').addEventListener('click', () => {
        appState.setAnswer('4-2-grease-method', selectedMethod);
        const lubricantCode = appState.getAnswer('4-1-lubricant-code') || 'lithium_grease';
        const lubeData = getLubricantDatabase(lubricantCode);

        appState.setAnswer('4-2-eta0', 0.05);
        appState.setAnswer('4-2-alpha', 2.2e-8);
        appState.setAnswer('4-2-method-used', 'grease_' + selectedMethod);
        appState.setAnswer('4-2-vi', lubeData.vi);
        appState.setAnswer('4-2-t_max', lubeData.t_max);

        window.dispatchEvent(new CustomEvent('navigate', {
            detail: { question: '4-3' }
        }));
    });
}

function showGasOptions(container) {
    const isEnglish = appState.language === 'en';

    const contaminants = appState.getAnswer('2-13') || [];
    const isExplosive = contaminants.includes('4') || contaminants.includes('6');
    const isVacuum = appState.getAnswer('3-1')?.includes(4) || false;
    const temperature = (appState.getAnswer('3-0') || {}).T_C || 25;
    const needsCooling = temperature > 200;

    let suggestedGas = 'air';
    if (isVacuum) suggestedGas = 'argon';
    else if (isExplosive) suggestedGas = 'nitrogen';
    else if (needsCooling) suggestedGas = 'helium';

    const selectedGas = appState.getAnswer('4-1-gas-code') || suggestedGas;
    const workingTemp = temperature;

    const gasOptions = Object.entries(GAS_PROPERTIES).map(([key, prop]) => {
        const isSelected = (key === selectedGas);
        const isSuggested = (key === suggestedGas);
        const name = isEnglish ? prop.name_en : prop.name;
        const desc = isEnglish ? prop.desc : prop.desc_fa;
        const S = SUTHERLAND_CONSTANTS[key] || 110.4;
        const mu_at_temp = calculateGasViscosityAtTemperature(prop.mu_g, 20, workingTemp, S);

        return `
            <label class="option-card ${isSuggested ? 'option-recommended' : ''} ${isSelected ? 'selected' : ''}" 
                   data-value="${key}">
                <input type="radio" name="gas-type" value="${key}" ${isSelected ? 'checked' : ''}>
                <div class="option-content">
                    <div class="option-icon" style="font-size: 1.5rem;">
                        ${getGasIcon(key)}
                    </div>
                    <div class="option-text">
                        <strong>${name}</strong>
                        <span>${desc}</span>
                        <small style="color: var(--text-secondary); font-size: 0.8rem;">
                            μ = ${mu_at_temp.toExponential(3)} Pa·s | 
                            ρ = ${prop.rho} kg/m³ | 
                            k = ${prop.k} W/m·K
                        </small>
                    </div>
                </div>
                ${isSuggested ? `<span class="recommended-badge">${isEnglish ? 'Recommended' : 'پیشنهادی'}</span>` : ''}
                <div class="option-radio"></div>
            </label>
        `;
    }).join('');

    const selectedData = GAS_PROPERTIES[selectedGas];
    const S_selected = SUTHERLAND_CONSTANTS[selectedGas] || 110.4;
    const mu_at_temp_selected = calculateGasViscosityAtTemperature(
        selectedData.mu_g, 20, workingTemp, S_selected
    );

    appState.setAnswer('4-2-eta0', mu_at_temp_selected);
    appState.setAnswer('4-2-alpha', 0.5e-8);
    appState.setAnswer('4-2-method-used', 'gas');
    appState.setAnswer('4-2-vi', null);
    appState.setAnswer('4-2-t_max', selectedData.T_max);
    appState.setAnswer('4-1-gas-code', selectedGas);
    appState.setAnswer('4-1-gas-name', isEnglish ? selectedData.name_en : selectedData.name);

    container.innerHTML = `
        <div class="question-card">
            <div class="question-header">
                <span class="question-number">${isEnglish ? 'Question 4-2' : '۴-۲'}</span>
                <span class="question-tag tag-auto">${isEnglish ? 'Gas Lubricant' : 'روانکار گازی'}</span>
            </div>
            <h2 class="question-title">${isEnglish ? 'Select Gas Type' : 'انتخاب نوع گاز'}</h2>
            <p class="question-description">
                ${isEnglish ? 
                    'Select the appropriate gas for the lubrication system. Based on operating conditions, a recommendation is provided.' :
                    'گاز مناسب برای سیستم روانکاری را انتخاب کنید. بر اساس شرایط عملیاتی، یک پیشنهاد ارائه شده است.'}
            </p>

            <div class="auto-detection-box highlight" style="margin: 16px 0;">
                <div class="auto-detection-icon">💡</div>
                <div class="auto-detection-text">
                    <strong>${isEnglish ? 'Suggestion based on conditions:' : 'پیشنهاد بر اساس شرایط:'}</strong>
                    <span style="font-weight: 600; color: var(--green-industrial);">
                        ${isEnglish ? GAS_PROPERTIES[suggestedGas].name_en : GAS_PROPERTIES[suggestedGas].name}
                    </span>
                    <p style="font-size: 0.85rem; margin-top: 4px;">
                        ${getSuggestionReason(suggestedGas, isEnglish)}
                    </p>
                </div>
            </div>

            <div class="options-list" id="gas-options">
                ${gasOptions}
            </div>

            <div class="result-panel" style="margin-top: 20px;">
                <h3>${isEnglish ? 'Gas Properties at Working Temperature' : 'خواص گاز در دمای کاری'}</h3>
                <div class="result-grid">
                    <div class="result-item highlight">
                        <span class="label">μ_g — ${isEnglish ? 'Dynamic Viscosity' : 'ویسکوزیته دینامیکی'}</span>
                        <span class="value">${mu_at_temp_selected.toExponential(3)} Pa·s</span>
                    </div>
                    <div class="result-item">
                        <span class="label">ρ — ${isEnglish ? 'Density' : 'چگالی'}</span>
                        <span class="value">${selectedData.rho} kg/m³</span>
                    </div>
                    <div class="result-item">
                        <span class="label">k — ${isEnglish ? 'Thermal Conductivity' : 'هدایت حرارتی'}</span>
                        <span class="value">${selectedData.k} W/m·K</span>
                    </div>
                    <div class="result-item">
                        <span class="label">T<sub>max</sub> — ${isEnglish ? 'Max Temperature' : 'حداکثر دما'}</span>
                        <span class="value">${selectedData.T_max} °C</span>
                    </div>
                </div>
            </div>

            <div class="alert alert-info" style="margin-top: 16px;">
                ℹ️ ${isEnglish ? 
                    'Gas lubricants do not require viscosity grade selection. The properties above are automatically calculated.' :
                    'روانکارهای گازی نیازی به انتخاب گرید ویسکوزیته ندارند. خواص بالا به صورت خودکار محاسبه می‌شوند.'}
            </div>

            <div style="margin-top: 20px; padding: 16px; background: #fff; border: 1px solid var(--border-light); border-radius: var(--radius-md);">
                <p style="font-weight: 600; margin-bottom: 12px;">
                    ${isEnglish ? 'Do you confirm this gas selection?' : 'آیا این انتخاب گاز را تأیید می‌کنید؟'}
                </p>
                <div style="display: flex; gap: 12px;">
                    <button id="btn-confirm-gas" class="btn btn-primary" style="flex: 1;">
                        ✅ ${isEnglish ? 'Yes, I confirm' : 'بله، تأیید می‌کنم'}
                    </button>
                    <button id="btn-edit-gas" class="btn btn-secondary" style="flex: 1;">
                        🔄 ${isEnglish ? 'No, I will correct it' : 'خیر، اصلاح می‌کنم'}
                    </button>
                </div>
            </div>

            <div class="action-bar">
                <button id="back-btn" class="btn btn-secondary">${isEnglish ? 'Back' : 'بازگشت'}</button>
            </div>
        </div>
    `;

    document.getElementById('back-btn')?.addEventListener('click', () => {
        if (window.app && window.app.goBack) {
            window.app.goBack();
        } else {
            window.dispatchEvent(new CustomEvent('navigate', {
                detail: { question: '4-1' }
            }));
        }
    });

    document.querySelectorAll('#gas-options .option-card').forEach(card => {
        card.addEventListener('click', function() {
            document.querySelectorAll('#gas-options .option-card').forEach(c => 
                c.classList.remove('selected')
            );
            this.classList.add('selected');
            const radio = this.querySelector('input[type="radio"]');
            if (radio) radio.checked = true;
            const newGas = this.dataset.value;
            updateGasCalculations(container, newGas);
        });
    });

    document.getElementById('btn-confirm-gas')?.addEventListener('click', () => {
        const selectedRadio = document.querySelector('input[name="gas-type"]:checked');
        if (!selectedRadio) {
            alert(isEnglish ? 'Please select a gas first.' : 'لطفاً ابتدا یک گاز انتخاب کنید.');
            return;
        }
        const selectedCode = selectedRadio.value;
        const gasData = GAS_PROPERTIES[selectedCode];
        const S = SUTHERLAND_CONSTANTS[selectedCode] || 110.4;
        const mu_at_temp = calculateGasViscosityAtTemperature(
            gasData.mu_g, 20, workingTemp, S
        );

        appState.setAnswer('4-1-gas-code', selectedCode);
        appState.setAnswer('4-1-gas-name', isEnglish ? gasData.name_en : gasData.name);
        appState.setAnswer('4-1-lubricant-code', selectedCode);
        appState.setAnswer('4-1-lubricant-name', isEnglish ? gasData.name_en : gasData.name);
        appState.setAnswer('4-2-eta0', mu_at_temp);
        appState.setAnswer('4-2-alpha', 0.5e-8);
        appState.setAnswer('4-2-method-used', 'gas');
        appState.setAnswer('4-2-t_max', gasData.T_max);

        appState.currentQuestion = '4-2';
        window.dispatchEvent(new CustomEvent('navigate', {
            detail: { question: '4-3-gas' }
        }));
    });

    document.getElementById('btn-edit-gas')?.addEventListener('click', () => {
        showGasEditForm(container);
    });
}

function showGasEditForm(container) {
    const isEnglish = appState.language === 'en';
    const currentEta0 = appState.getAnswer('4-2-eta0') || 1.8e-5;
    const currentAlpha = appState.getAnswer('4-2-alpha') || 0.5e-8;

    container.innerHTML = `
        <div class="question-card">
            <div class="question-header">
                <span class="question-number">${isEnglish ? 'Question 4-2' : '۴-۲'}</span>
                <span class="question-tag tag-conditional">${isEnglish ? 'Manual Edit' : 'ویرایش دستی'}</span>
            </div>
            <h2 class="question-title">${isEnglish ? 'Edit Gas Properties' : 'اصلاح خواص گاز'}</h2>
            <div class="numeric-inputs-container">
                <div class="input-group">
                    <label><span class="input-label">μ — ${isEnglish ? 'Dynamic Viscosity' : 'ویسکوزیته دینامیکی'}</span><span class="input-unit">Pa·s</span></label>
                    <input type="number" id="edit-eta0" class="numeric-input" value="${currentEta0}" step="1e-8" min="0">
                </div>
                <div class="input-group">
                    <label><span class="input-label">α — ${isEnglish ? 'Pressure-Viscosity Coefficient' : 'ضریب فشار-ویسکوزیته'}</span><span class="input-unit">Pa⁻¹</span></label>
                    <input type="number" id="edit-alpha" class="numeric-input" value="${currentAlpha}" step="1e-9" min="0">
                </div>
            </div>
            <div class="action-bar">
                <button id="cancel-edit-btn" class="btn btn-secondary">${isEnglish ? 'Cancel' : 'انصراف'}</button>
                <button id="save-edit-btn" class="btn btn-primary">${isEnglish ? 'Save' : 'ذخیره'}</button>
            </div>
        </div>
    `;

    document.getElementById('cancel-edit-btn')?.addEventListener('click', () => {
        showGasOptions(container);
    });

    document.getElementById('save-edit-btn')?.addEventListener('click', () => {
        const newEta0 = parseFloat(document.getElementById('edit-eta0').value);
        const newAlpha = parseFloat(document.getElementById('edit-alpha').value);

        if (isNaN(newEta0) || isNaN(newAlpha) || newEta0 <= 0 || newAlpha <= 0) {
            alert(isEnglish ? 'Please enter valid positive values.' : 'لطفاً مقادیر مثبت معتبر وارد کنید.');
            return;
        }

        appState.setAnswer('4-2-eta0', newEta0);
        appState.setAnswer('4-2-alpha', newAlpha);
        appState.setAnswer('4-2-method-used', 'gas_manual');

        showGasOptions(container);
    });
}

function updateGasCalculations(container, gasCode) {
    const isEnglish = appState.language === 'en';
    const gasData = GAS_PROPERTIES[gasCode];
    const workingTemp = (appState.getAnswer('3-0') || {}).T_C || 25;
    const S = SUTHERLAND_CONSTANTS[gasCode] || 110.4;
    const mu_at_temp = calculateGasViscosityAtTemperature(
        gasData.mu_g, 20, workingTemp, S
    );

    const resultPanel = container.querySelector('.result-panel');
    if (resultPanel) {
        resultPanel.innerHTML = `
            <h3>${isEnglish ? 'Gas Properties at Working Temperature' : 'خواص گاز در دمای کاری'}</h3>
            <div class="result-grid">
                <div class="result-item highlight">
                    <span class="label">μ_g — ${isEnglish ? 'Dynamic Viscosity' : 'ویسکوزیته دینامیکی'}</span>
                    <span class="value">${mu_at_temp.toExponential(3)} Pa·s</span>
                </div>
                <div class="result-item">
                    <span class="label">ρ — ${isEnglish ? 'Density' : 'چگالی'}</span>
                    <span class="value">${gasData.rho} kg/m³</span>
                </div>
                <div class="result-item">
                    <span class="label">k — ${isEnglish ? 'Thermal Conductivity' : 'هدایت حرارتی'}</span>
                    <span class="value">${gasData.k} W/m·K</span>
                </div>
                <div class="result-item">
                    <span class="label">T<sub>max</sub> — ${isEnglish ? 'Max Temperature' : 'حداکثر دما'}</span>
                    <span class="value">${gasData.T_max} °C</span>
                </div>
            </div>
        `;
    }

    appState.setAnswer('4-2-eta0', mu_at_temp);
    appState.setAnswer('4-2-t_max', gasData.T_max);
    appState.setAnswer('4-1-gas-code', gasCode);
    appState.setAnswer('4-1-gas-name', isEnglish ? gasData.name_en : gasData.name);
}

function showResults(container, eta0, alpha, rho0, method, lubeData) {
    const isEnglish = appState.language === 'en';

    const methodNames = {
        'precise': isEnglish ? '🔬 Precise (Vogel + So & Klaus)' : '🔬 دقیق (وگل + سو و کلاوس)',
        'estimated': isEnglish ? '📊 Estimated (ISO VG)' : '📊 تخمینی (ISO VG)',
        'manual': isEnglish ? '✏️ Manual' : '✏️ دستی'
    };

    container.innerHTML = `
        <div class="question-card">
            <div class="question-header">
                <span class="question-number">${isEnglish ? 'Question 4-2' : '۴-۲'}</span>
                <span class="question-tag tag-auto">${isEnglish ? 'Calculation Results' : 'نتایج محاسبات'}</span>
            </div>
            <h2 class="question-title">${isEnglish ? 'Lubricant Parameter Results' : 'نتایج پارامترهای روانکار'}</h2>
            <div class="result-panel">
                <h3>📊 ${isEnglish ? 'Calculated Parameters' : 'پارامترهای محاسبه‌شده'}</h3>
                <div class="result-grid">
                    <div class="result-item highlight">
                        <span class="label">η₀ — ${isEnglish ? 'Dynamic Viscosity' : 'ویسکوزیته دینامیکی'}</span>
                        <span class="value">${eta0.toExponential(3)} Pa·s</span>
                    </div>
                    <div class="result-item">
                        <span class="label">α — ${isEnglish ? 'Pressure-Viscosity Coefficient' : 'ضریب فشار-ویسکوزیته'}</span>
                        <span class="value">${alpha.toExponential(2)} Pa⁻¹</span>
                    </div>
                    <div class="result-item">
                        <span class="label">VI — ${isEnglish ? 'Viscosity Index' : 'شاخص ویسکوزیته'}</span>
                        <span class="value">${lubeData.vi || '—'}</span>
                    </div>
                    <div class="result-item">
                        <span class="label">T_max — ${isEnglish ? 'Maximum Allowable Temperature' : 'دمای حداکثر مجاز'}</span>
                        <span class="value">${lubeData.t_max || '—'} °C</span>
                    </div>
                    <div class="result-item">
                        <span class="label">ρ₀ — ${isEnglish ? 'Density' : 'چگالی'}</span>
                        <span class="value">${rho0.toFixed(0)} kg/m³</span>
                    </div>
                    <div class="result-item">
                        <span class="label">${isEnglish ? 'Calculation Method' : 'روش محاسبه'}</span>
                        <span class="value">${methodNames[method] || method}</span>
                    </div>
                </div>
            </div>
            <div style="margin-top: 20px; padding: 16px; background: #fff; border: 1px solid var(--border-light); border-radius: var(--radius-md);">
                <p style="font-weight: 600; margin-bottom: 12px;">${isEnglish ? 'Do you confirm these values?' : 'آیا این مقادیر را تأیید می‌کنید؟'}</p>
                <div style="display: flex; gap: 12px;">
                    <button id="btn-confirm-results" class="btn btn-primary" style="flex: 1;">
                        ✅ ${isEnglish ? 'Yes, I confirm' : 'بله، تأیید می‌کنم'}
                    </button>
                    <button id="btn-edit-results" class="btn btn-secondary" style="flex: 1;">
                        🔄 ${isEnglish ? 'No, I will correct it' : 'خیر، اصلاح می‌کنم'}
                    </button>
                </div>
            </div>
            <div class="action-bar">
                <button id="back-to-method-btn" class="btn btn-secondary">${isEnglish ? 'Back' : 'بازگشت'}</button>
            </div>
        </div>
    `;

    document.getElementById('back-to-method-btn').addEventListener('click', () => {
        renderQuestion4_2(container);
    });

    document.getElementById('btn-confirm-results').addEventListener('click', () => {
        appState.currentQuestion = '4-2';
        const regime = appState.getAnswer('3-2')?.recommendedSystem;

        if (regime === 5) {
            window.dispatchEvent(new CustomEvent('navigate', {
                detail: { question: '4-3-solid' }
            }));
        } else if ([7, 8].includes(regime)) {
            window.dispatchEvent(new CustomEvent('navigate', {
                detail: { question: '4-7' }
            }));
        } else {
            window.dispatchEvent(new CustomEvent('navigate', {
                detail: { question: '4-3' }
            }));
        }
    });

    document.getElementById('btn-edit-results').addEventListener('click', () => {
        showEditForm(container, eta0, alpha);
    });
}

function showEditForm(container, currentEta0, currentAlpha) {
    const isEnglish = appState.language === 'en';

    container.innerHTML = `
        <div class="question-card">
            <div class="question-header">
                <span class="question-number">${isEnglish ? 'Question 4-2' : '۴-۲'}</span>
                <span class="question-tag tag-conditional">${isEnglish ? 'Manual Edit' : 'ویرایش دستی'}</span>
            </div>
            <h2 class="question-title">${isEnglish ? 'Edit Viscosity Values' : 'اصلاح مقادیر ویسکوزیته'}</h2>
            <div class="numeric-inputs-container">
                <div class="input-group">
                    <label><span class="input-label">η₀ — ${isEnglish ? 'Dynamic Viscosity' : 'ویسکوزیته دینامیکی'}</span><span class="input-unit">Pa·s</span></label>
                    <input type="number" id="edit-eta0" class="numeric-input" value="${currentEta0}" step="any" min="0">
                </div>
                <div class="input-group">
                    <label><span class="input-label">α — ${isEnglish ? 'Pressure-Viscosity Coefficient' : 'ضریب فشار-ویسکوزیته'}</span><span class="input-unit">Pa⁻¹</span></label>
                    <input type="number" id="edit-alpha" class="numeric-input" value="${currentAlpha}" step="any" min="0">
                </div>
            </div>
            <div class="action-bar">
                <button id="cancel-edit-btn" class="btn btn-secondary">${isEnglish ? 'Cancel' : 'انصراف'}</button>
                <button id="save-edit-btn" class="btn btn-primary">${isEnglish ? 'Save' : 'ذخیره'}</button>
            </div>
        </div>
    `;

    document.getElementById('cancel-edit-btn').addEventListener('click', () => {
        const lubeData = {
            vi: appState.getAnswer('4-2-vi') || 100,
            t_max: appState.getAnswer('4-2-t_max') || 150
        };
        showResults(container, currentEta0, currentAlpha,
            appState.getAnswer('4-2-rho0') || 850,
            'manual',
            lubeData);
    });

    document.getElementById('save-edit-btn').addEventListener('click', () => {
        const newEta0 = parseFloat(document.getElementById('edit-eta0').value);
        const newAlpha = parseFloat(document.getElementById('edit-alpha').value);

        if (isNaN(newEta0) || isNaN(newAlpha)) {
            alert(isEnglish ? 'Please enter valid values.' : 'لطفاً مقادیر معتبر وارد کنید.');
            return;
        }

        appState.setAnswer('4-2-eta0', newEta0);
        appState.setAnswer('4-2-alpha', newAlpha);
        appState.setAnswer('4-2-method-used', 'manual');

        const lubeData = {
            vi: appState.getAnswer('4-2-vi') || 100,
            t_max: appState.getAnswer('4-2-t_max') || 150
        };
        showResults(container, newEta0, newAlpha,
            appState.getAnswer('4-2-rho0') || 850,
            'manual',
            lubeData);
    });
}

function getLubricantDatabase(code) {
    const database = {
        'mineral': { vi: 95, t_max: 120 },
        'pao': { vi: 135, t_max: 160 },
        'ester': { vi: 150, t_max: 220 },
        'pag': { vi: 200, t_max: 180 },
        'silicone': { vi: 250, t_max: 250 },
        'mos2': { vi: null, t_max: 400 },
        'graphite': { vi: null, t_max: 500 },
        'ptfe': { vi: null, t_max: 260 },
        'soft_metal': { vi: null, t_max: 300 },
        'air': { vi: null, t_max: 1000 },
        'nitrogen': { vi: null, t_max: 1000 },
        'helium': { vi: null, t_max: 1000 },
        'lithium_grease': { vi: null, t_max: 130 },
        'lithium_complex': { vi: null, t_max: 160 },
        'calcium_grease': { vi: null, t_max: 120 },
        'polyurea': { vi: null, t_max: 180 },
        'emulsion_ow': { vi: null, t_max: 80 },
        'emulsion_wo': { vi: null, t_max: 100 },
        'custom': { vi: 100, t_max: 150 }
    };
    return database[code] || { vi: 100, t_max: 150 };
}