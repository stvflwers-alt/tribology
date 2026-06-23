import appState from '../../state.js';
import router from '../../router.js';
export function renderQuestion4_2_estimated(container) {
    const t = (key, params = {}) => appState.t(key, params);
    const isoGrades = [
        { grade: 2, desc: 'بسیار رقیق — کاربردهای خاص' },
        { grade: 5, desc: 'روغن اسپیندل' },
        { grade: 7, desc: 'روغن اسپیندل سبک' },
        { grade: 10, desc: 'روغن هیدرولیک سبک' },
        { grade: 15, desc: 'روغن هیدرولیک' },
        { grade: 22, desc: 'روغن هیدرولیک — یاتاقان سریع' },
        { grade: 32, desc: 'روغن هیدرولیک استاندارد' },
        { grade: 46, desc: 'روغن هیدرولیک — پرکاربرد' },
        { grade: 56, desc: 'روغن هیدرولیک سنگین' },
        { grade: 63, desc: 'روغن دنده سبک' },
        { grade: 68, desc: 'روغن هیدرولیک سنگین — توربین' },
        { grade: 100, desc: 'روغن دنده — کمپرسور' },
        { grade: 150, desc: 'روغن دنده صنعتی' },
        { grade: 220, desc: 'روغن دنده سنگین' },
        { grade: 320, desc: 'روغن دنده بسیار سنگین' },
        { grade: 460, desc: 'روغن یاتاقان سنگین' },
        { grade: 680, desc: 'روغن سیلندر — بسیار غلیظ' },
        { grade: 1000, desc: 'روغن دنده باز' },
        { grade: 1500, desc: 'بسیار غلیظ — گریس پایه' }
    ];
    const lubricantName = appState.getAnswer('4-1-lubricant-name') || 'روانکار';
    container.innerHTML = `
        <div class="question-card">
            <div class="question-header">
                <span class="question-number">۴-۲</span>
                <span class="question-tag tag-auto">تخمین از ISO VG</span>
            </div>
            <h2 class="question-title">انتخاب گرید ISO VG</h2>
            <p class="question-description">
                روانکار: <strong>${lubricantName}</strong><br>
                لطفاً گرید ویسکوزیته (عدد روی بشکه) را انتخاب کنید.
            </p>
            <div class="alert alert-warning" style="margin-bottom: 20px;">
                ⚠️ <strong>هشدار:</strong> روش تخمینی دقت کمتری دارد.<br>
                • η₀ با معادله والتر از ISO VG به دمای کاری تبدیل می‌شود<br>
                • VI و T_max از پایگاه داده خوانده می‌شوند
            </div>
            <div class="options-list" style="max-height: 450px; overflow-y: auto;">
                ${isoGrades.map(item => `
                    <label class="option-card" data-value="${item.grade}">
                        <input type="radio" name="iso-grade" value="${item.grade}">
                        <div class="option-content">
                            <div class="option-icon" style="background: #E3F2FD; color: #1565C0; font-weight: 700; font-size: 1.1rem;">
                                ${item.grade}
                            </div>
                            <div class="option-text">
                                <strong>ISO VG ${item.grade}</strong>
                                <span>${item.desc}</span>
                            </div>
                        </div>
                        <div class="option-radio"></div>
                    </label>
                `).join('')}
                <label class="option-card" data-value="custom" style="border: 2px dashed var(--border-medium);">
                    <input type="radio" name="iso-grade" value="custom">
                    <div class="option-content">
                        <div class="option-icon">✏️</div>
                        <div class="option-text">
                            <strong>سایر — وارد کردن دستی</strong>
                            <span>گرید ویسکوزیته دیگری دارم</span>
                        </div>
                    </div>
                    <div class="option-radio"></div>
                </label>
            </div>
            <!-- فرم ورود دستی (مخفی در ابتدا) -->
            <div id="custom-grade-form" style="display: none; margin-top: 16px;">
                <div class="input-group">
                    <label>
                        <span class="input-label">ویسکوزیته سینماتیکی در 40°C</span>
                        <span class="input-unit">cSt</span>
                    </label>
                    <input type="number" id="custom-viscosity" class="numeric-input" placeholder="مثال: 46" step="any" min="0">
                </div>
            </div>
            <div id="calculation-preview" style="display: none; margin-top: 20px;"></div>
            <div class="action-bar">
                <button id="back-btn" class="btn btn-secondary">بازگشت</button>
                <button id="confirm-btn" class="btn btn-primary" disabled>تأیید و ادامه</button>
            </div>
        </div>
    `;
    let selectedGrade = null;
    let isCustom = false;
    document.querySelectorAll('.option-card').forEach(card => {
        card.addEventListener('click', function() {
            if (this.dataset.value === 'custom') {
                document.querySelectorAll('.option-card').forEach(c => c.classList.remove('selected'));
                this.classList.add('selected');
                isCustom = true;
                selectedGrade = null;
                document.getElementById('custom-grade-form').style.display = 'block';
                document.getElementById('confirm-btn').disabled = true;
                document.getElementById('calculation-preview').style.display = 'none';
            } else {
                document.querySelectorAll('.option-card').forEach(c => c.classList.remove('selected'));
                this.classList.add('selected');
                isCustom = false;
                selectedGrade = parseInt(this.dataset.value);
                document.getElementById('custom-grade-form').style.display = 'none';
                document.getElementById('confirm-btn').disabled = false;
                showCalculationPreview(selectedGrade);
            }
        });
    });
    document.getElementById('custom-viscosity')?.addEventListener('input', function() {
        const val = parseFloat(this.value);
        if (!isNaN(val) && val > 0) {
            selectedGrade = val;
            document.getElementById('confirm-btn').disabled = false;
            showCalculationPreview(val);
        } else {
            document.getElementById('confirm-btn').disabled = true;
        }
    });
    document.getElementById('back-btn').addEventListener('click', () => {
        window.dispatchEvent(new CustomEvent('navigate', { 
            detail: { question: '4-2' } 
        }));
    });
    document.getElementById('confirm-btn').addEventListener('click', () => {
        if (!selectedGrade) return;
        const contactData = appState.getAnswer('3-0') || {};
        const T_working = contactData.T_C || 25;
        const rho_typical = 850;
        const eta40 = selectedGrade * 1e-6 * rho_typical;
        const m_slope = 0.045; // شیب典型 برای روغن معدنی
        const T_working_K = T_working + 273.15;
        const T_40_K = 40 + 273.15;
        const eta0 = eta40 * Math.exp(m_slope * (1/T_working_K - 1/T_40_K) * 1e4);
        const alpha = (0.6 + 0.965 * Math.log10(selectedGrade)) * 1e-8;
        appState.setAnswer('4-2-eta0', eta0);
        appState.setAnswer('4-2-alpha', alpha);
        appState.setAnswer('4-2-iso-grade', selectedGrade);
        appState.setAnswer('4-2-rho0', rho_typical);
        appState.setAnswer('4-2-method-used', 'estimated');
        appState.currentQuestion = '4-2-estimated';
        const nextQuestion = router.getNextQuestion('4-2-estimated', null);
        window.dispatchEvent(new CustomEvent('navigate', { 
            detail: { question: nextQuestion || '4-3' } 
        }));
    });
    function showCalculationPreview(grade) {
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
                <h4>📊 پیش‌نمایش محاسبات</h4>
                <div class="result-grid">
                    <div class="result-item">
                        <span class="label">η₄₀ (در 40°C)</span>
                        <span class="value">${eta40.toExponential(3)} Pa·s</span>
                    </div>
                    <div class="result-item highlight">
                        <span class="label">η₀ (در ${T_working}°C)</span>
                        <span class="value">${eta0.toExponential(3)} Pa·s</span>
                    </div>
                    <div class="result-item">
                        <span class="label">α (تخمینی)</span>
                        <span class="value">${alpha.toExponential(2)} Pa⁻¹</span>
                    </div>
                </div>
            </div>
        `;
    }
}