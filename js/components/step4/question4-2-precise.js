import appState from '../../state.js';
import router from '../../router.js';
export function renderQuestion4_2_precise(container) {
    const t = (key, params = {}) => appState.t(key, params);
    const lubricantName = appState.getAnswer('4-1-lubricant-name') || 'روانکار';
    container.innerHTML = `
        <div class="question-card">
            <div class="question-header">
                <span class="question-number">۴-۲</span>
                <span class="question-tag tag-auto">محاسبه دقیق</span>
            </div>
            <h2 class="question-title">داده‌های ویسکوزیته — روش دقیق</h2>
            <p class="question-description">
                روانکار: <strong>${lubricantName}</strong>
            </p>
            <div class="alert alert-warning" style="margin-bottom: 20px;">
                ⚠️ برای استفاده از روش دقیق، به داده‌های زیر نیاز دارید:<br><br>
                <strong>برای معادله وگل (محاسبه η₀):</strong><br>
                • ویسکوزیته در سه دمای مختلف (مثلاً 40°C، 100°C، و 150°C)<br>
                <strong>برای معادله سو و کلاوس (محاسبه α):</strong><br>
                • ν₀: ویسکوزیته سینماتیکی در دمای کاری [cSt]<br>
                • m₀: شیب تغییرات ویسکوزیته با دما<br>
                • ρ₀: چگالی روانکار در دمای کاری [kg/m³]
            </div>
            <!-- بخش معادله وگل -->
            <div class="formula-panel">
                <h4>📐 معادله وگل — محاسبه η₀</h4>
                <p style="color: var(--text-secondary); font-size: 0.85rem; margin-bottom: 16px;">
                    η(T) = A × exp(B / (T + C))
                </p>
                <div class="numeric-inputs-container">
                    <div class="input-group">
                        <label>
                            <span class="input-label">η₁ — ویسکوزیته در T₁</span>
                            <span class="input-unit">Pa·s</span>
                        </label>
                        <input type="number" id="eta1" class="numeric-input" placeholder="مثال: 0.05" step="any" min="0">
                    </div>
                    <div class="input-group">
                        <label>
                            <span class="input-label">T₁ — دمای نقطه ۱</span>
                            <span class="input-unit">°C</span>
                        </label>
                        <input type="number" id="T1" class="numeric-input" placeholder="مثال: 40" step="any">
                    </div>
                    <div class="input-group">
                        <label>
                            <span class="input-label">η₂ — ویسکوزیته در T₂</span>
                            <span class="input-unit">Pa·s</span>
                        </label>
                        <input type="number" id="eta2" class="numeric-input" placeholder="مثال: 0.008" step="any" min="0">
                    </div>
                    <div class="input-group">
                        <label>
                            <span class="input-label">T₂ — دمای نقطه ۲</span>
                            <span class="input-unit">°C</span>
                        </label>
                        <input type="number" id="T2" class="numeric-input" placeholder="مثال: 100" step="any">
                    </div>
                    <div class="input-group">
                        <label>
                            <span class="input-label">η₃ — ویسکوزیته در T₃</span>
                            <span class="input-unit">Pa·s</span>
                        </label>
                        <input type="number" id="eta3" class="numeric-input" placeholder="اختیاری — مثال: 0.002" step="any" min="0">
                    </div>
                    <div class="input-group">
                        <label>
                            <span class="input-label">T₃ — دمای نقطه ۳</span>
                            <span class="input-unit">°C</span>
                        </label>
                        <input type="number" id="T3" class="numeric-input" placeholder="اختیاری — مثال: 150" step="any">
                    </div>
                </div>
            </div>
            <!-- بخش معادله سو و کلاوس -->
            <div class="formula-panel" style="margin-top: 20px;">
                <h4>📐 معادله سو و کلاوس — محاسبه α</h4>
                <p style="color: var(--text-secondary); font-size: 0.85rem; margin-bottom: 16px;">
                    α = (0.6 + 0.965 × log₁₀(ν₀)) × 10⁻⁸ [Pa⁻¹]
                </p>
                <div class="numeric-inputs-container">
                    <div class="input-group">
                        <label>
                            <span class="input-label">ν₀ — ویسکوزیته سینماتیکی در دمای کاری</span>
                            <span class="input-unit">cSt</span>
                        </label>
                        <input type="number" id="nu0" class="numeric-input" placeholder="مثال: 32" step="any" min="0">
                    </div>
                    <div class="input-group">
                        <label>
                            <span class="input-label">m₀ — شیب ویسکوزیته-دما</span>
                            <span class="input-unit">—</span>
                        </label>
                        <input type="number" id="m0" class="numeric-input" placeholder="مثال: 0.045" step="any">
                    </div>
                    <div class="input-group">
                        <label>
                            <span class="input-label">ρ₀ — چگالی در دمای کاری</span>
                            <span class="input-unit">kg/m³</span>
                        </label>
                        <input type="number" id="rho0" class="numeric-input" placeholder="مثال: 850" step="any" min="0">
                    </div>
                </div>
            </div>
            <!-- پیش‌نمایش -->
            <div id="calculation-preview" style="display: none; margin-top: 20px;"></div>
            <div class="action-bar">
                <button id="back-btn" class="btn btn-secondary">بازگشت به انتخاب روش</button>
                <button id="calculate-btn" class="btn btn-primary" disabled>محاسبه و ادامه</button>
            </div>
        </div>
    `;
    const requiredInputs = ['eta1', 'T1', 'eta2', 'T2', 'nu0', 'm0', 'rho0'];
    function checkInputs() {
        const allFilled = requiredInputs.every(id => {
            const val = document.getElementById(id)?.value;
            return val !== '' && val !== null && !isNaN(parseFloat(val));
        });
        document.getElementById('calculate-btn').disabled = !allFilled;
    }
    document.querySelectorAll('.numeric-input').forEach(input => {
        input.addEventListener('input', () => {
            checkInputs();
            const eta1 = parseFloat(document.getElementById('eta1')?.value);
            const T1_val = parseFloat(document.getElementById('T1')?.value);
            const eta2 = parseFloat(document.getElementById('eta2')?.value);
            const T2_val = parseFloat(document.getElementById('T2')?.value);
            if (!isNaN(eta1) && !isNaN(T1_val) && !isNaN(eta2) && !isNaN(T2_val)) {
                showPreview(eta1, T1_val, eta2, T2_val);
            }
        });
    });
    document.getElementById('back-btn').addEventListener('click', () => {
        window.dispatchEvent(new CustomEvent('navigate', { 
            detail: { question: '4-2' } 
        }));
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
        if (!isNaN(eta3_val) && !isNaN(T3_val)) {
            const lnEta1 = Math.log(eta1);
            const lnEta2 = Math.log(eta2);
            const lnEta3 = Math.log(eta3_val);
            const B = (lnEta2 - lnEta1) / (1/(T2_val + 273.15) - 1/(T1_val + 273.15));
            eta0 = Math.exp(lnEta1 + B * (1/(T_working + 273.15) - 1/(T1_val + 273.15)));
        } else {
            const lnEta1 = Math.log(eta1);
            const lnEta2 = Math.log(eta2);
            const B = (lnEta2 - lnEta1) / (1/(T2_val + 273.15) - 1/(T1_val + 273.15));
            eta0 = Math.exp(lnEta1 + B * (1/(T_working + 273.15) - 1/(T1_val + 273.15)));
        }
        const nu0 = parseFloat(document.getElementById('nu0').value);
        const m0 = parseFloat(document.getElementById('m0').value);
        const rho0 = parseFloat(document.getElementById('rho0').value);
        const alpha = (0.6 + 0.965 * Math.log10(nu0)) * 1e-8;
        appState.setAnswer('4-2-eta0', eta0);
        appState.setAnswer('4-2-alpha', alpha);
        appState.setAnswer('4-2-rho0', rho0);
        appState.setAnswer('4-2-nu0', nu0);
        appState.setAnswer('4-2-m0', m0);
        appState.setAnswer('4-2-method-used', 'precise');
        appState.currentQuestion = '4-2-precise';
        const nextQuestion = router.getNextQuestion('4-2-precise', null);
        window.dispatchEvent(new CustomEvent('navigate', { 
            detail: { question: nextQuestion || '4-3' } 
        }));
    });
    function showPreview(eta1, T1_val, eta2, T2_val) {
        const contactData = appState.getAnswer('3-0') || {};
        const T_working = contactData.T_C || 25;
        const lnEta1 = Math.log(eta1);
        const lnEta2 = Math.log(eta2);
        const B = (lnEta2 - lnEta1) / (1/(T2_val + 273.15) - 1/(T1_val + 273.15));
        const eta0 = Math.exp(lnEta1 + B * (1/(T_working + 273.15) - 1/(T1_val + 273.15)));
        document.getElementById('calculation-preview').style.display = 'block';
        document.getElementById('calculation-preview').innerHTML = `
            <div class="result-panel" style="background: #f0f7ff;">
                <h4>📊 پیش‌نمایش η₀ در دمای کاری (${T_working}°C)</h4>
                <div class="result-grid">
                    <div class="result-item highlight">
                        <span class="label">η₀ تخمینی در ${T_working}°C</span>
                        <span class="value">${eta0.toExponential(3)} Pa·s</span>
                    </div>
                    <div class="result-item">
                        <span class="label">ثابت B معادله وگل</span>
                        <span class="value">${B.toFixed(1)}</span>
                    </div>
                </div>
            </div>
        `;
    }
}