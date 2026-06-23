import appState from '../../state.js';
import router from '../../router.js';
export function renderQuestion2_5a(container) {
    const translate = (text) => {
        if (appState.language !== 'en') return text;
        const translations = {
            // عنوان‌ها
            'پارامترهای هندسه تماس': 'Contact Geometry Parameters',
            'مشخصات دقیق هندسه تماس': 'Precise Contact Geometry Specification',
            'لطفاً پارامترهای هندسی زیر را وارد کنید': 'Please enter the following geometric parameters',
            'همه پارامترها را وارد کنید': 'Please enter all parameters',
            'پارامتر باقی مانده': 'parameter(s) remaining',
            'بازگشت': 'Back',
            'ادامه': 'Continue',
            // برچسب فیلدها
            'شعاع انحنای قطعه اول (x)': 'Radius of curvature of first part (x)',
            'شعاع انحنای قطعه اول (y)': 'Radius of curvature of first part (y)',
            'شعاع انحنای قطعه دوم (x)': 'Radius of curvature of second part (x)',
            'شعاع انحنای قطعه دوم (y)': 'Radius of curvature of second part (y)',
            'طول مشخصه تماس': 'Characteristic contact length',
            'مساحت اسمی تماس': 'Nominal contact area',
            'زاویه بین محورهای اصلی': 'Angle between principal axes',
            // توضیحات
            'R₁ₓ - شعاع انحنای قطعه اول در جهت x': 'R₁ₓ - Radius of curvature of first part in x direction',
            'R₁ᵧ - شعاع انحنای قطعه اول در جهت y': 'R₁ᵧ - Radius of curvature of first part in y direction',
            'R₂ₓ - شعاع انحنای قطعه دوم در جهت x': 'R₂ₓ - Radius of curvature of second part in x direction',
            'R₂ᵧ - شعاع انحنای قطعه دوم در جهت y': 'R₂ᵧ - Radius of curvature of second part in y direction',
            'L - طول تماس در امتداد حرکت': 'L - Contact length along motion direction',
            'A - مساحت ظاهری تماس': 'A - Apparent contact area',
            'α - زاویه بین محورهای انحنا': 'α - Angle between curvature axes',
            // Placeholders (مثال‌ها)
            'مثال: ۲۵': 'Example: 25',
            'مثال: ۲۵ (یا ∞ برای تخت)': 'Example: 25 (or ∞ for flat)',
            'مثال: ۱۰۰': 'Example: 100',
            'مثال: ۱۰۰ (یا ∞ برای تخت)': 'Example: 100 (or ∞ for flat)',
            'مثال: ۵۰': 'Example: 50',
            'مثال: ۱۰۰۰': 'Example: 1000',
            'مثال: ۹۰': 'Example: 90',
            // واحدها
            'mm': 'mm',
            'mm²': 'mm²',
            '°': '°'
        };
        return translations[text] || text;
    };
    const title = 'مشخصات دقیق هندسه تماس';
    const description = 'لطفاً پارامترهای هندسی زیر را وارد کنید';
    const btnContinue = translate('ادامه');
    const btnBack = translate('بازگشت');
    const fields = [
        { id: 'R1x', label: translate('شعاع انحنای قطعه اول (x)'), desc: translate('R₁ₓ - شعاع انحنای قطعه اول در جهت x'), unit: 'mm', icon: '📐', placeholder: translate('مثال: ۲۵') },
        { id: 'R1y', label: translate('شعاع انحنای قطعه اول (y)'), desc: translate('R₁ᵧ - شعاع انحنای قطعه اول در جهت y'), unit: 'mm', icon: '📐', placeholder: translate('مثال: ۲۵ (یا ∞ برای تخت)') },
        { id: 'R2x', label: translate('شعاع انحنای قطعه دوم (x)'), desc: translate('R₂ₓ - شعاع انحنای قطعه دوم در جهت x'), unit: 'mm', icon: '📏', placeholder: translate('مثال: ۱۰۰') },
        { id: 'R2y', label: translate('شعاع انحنای قطعه دوم (y)'), desc: translate('R₂ᵧ - شعاع انحنای قطعه دوم در جهت y'), unit: 'mm', icon: '📏', placeholder: translate('مثال: ۱۰۰ (یا ∞ برای تخت)') },
        { id: 'L', label: translate('طول مشخصه تماس'), desc: translate('L - طول تماس در امتداد حرکت'), unit: 'mm', icon: '↔️', placeholder: translate('مثال: ۵۰') },
        { id: 'A', label: translate('مساحت اسمی تماس'), desc: translate('A - مساحت ظاهری تماس'), unit: 'mm²', icon: '⬜', placeholder: translate('مثال: ۱۰۰۰') },
        { id: 'alpha', label: translate('زاویه بین محورهای اصلی'), desc: translate('α - زاویه بین محورهای انحنا'), unit: '°', icon: '📐', placeholder: translate('مثال: ۹۰') }
    ];
    container.innerHTML = `
        <div class="question-card">
            <div class="question-header">
                <span class="question-number">2-5a</span>
                <span class="question-tag tag-conditional">${translate('پارامترهای هندسه تماس')}</span>
            </div>
            <h2 class="question-title">${translate(title)}</h2>
            <p class="question-description">${translate(description)}</p>
            <div class="geometry-params-grid">
                ${fields.map(field => `
                    <div class="geometry-param-card">
                        <div class="param-header">
                            <span class="param-icon">${field.icon}</span>
                            <span class="param-label">${field.label}</span>
                        </div>
                        <p class="param-desc">${field.desc}</p>
                        <div class="param-input-wrapper">
                            <input 
                                type="number" 
                                id="param-${field.id}" 
                                class="numeric-input" 
                                placeholder="${field.placeholder}"
                                step="any"
                                min="0"
                            >
                            <span class="param-unit">${field.unit}</span>
                        </div>
                    </div>
                `).join('')}
            </div>
            <div class="validation-message" id="validation-2-5a" style="display: none;">
                ⚠️ ${translate('همه پارامترها را وارد کنید')}
            </div>
            <div class="action-bar">
                <button id="back-btn-2-5a" class="btn btn-secondary">
                    <svg class="btn-arrow-back" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M9 18l6-6-6-6"/>
                    </svg>
                    ${btnBack}
                </button>
                <button id="next-btn-2-5a" class="btn btn-primary" disabled>
                    ${btnContinue}
                    <svg class="btn-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M9 18l6-6-6-6"/>
                    </svg>
                </button>
            </div>
        </div>
    `;
    const allInputs = container.querySelectorAll('.numeric-input');
    const nextBtn = container.querySelector('#next-btn-2-5a');
    const backBtn = container.querySelector('#back-btn-2-5a');
    const validationMsg = container.querySelector('#validation-2-5a');
    function checkAllFilled() {
        let allFilled = true;
        allInputs.forEach(input => {
            if (input.value === '' || input.value === null) {
                allFilled = false;
            }
        });
        if (allFilled) {
            nextBtn.disabled = false;
            validationMsg.style.display = 'none';
        } else {
            nextBtn.disabled = true;
            const emptyCount = Array.from(allInputs).filter(inp => !inp.value).length;
            validationMsg.innerHTML = `⚠️ ${emptyCount} ${translate('پارامتر باقی مانده')}`;
            validationMsg.style.display = 'block';
        }
    }
    allInputs.forEach(input => {
        input.addEventListener('input', checkAllFilled);
    });
    nextBtn.addEventListener('click', () => {
        const data = {};
        fields.forEach(field => {
            const input = container.querySelector(`#param-${field.id}`);
            data[field.id] = input.value ? parseFloat(input.value) : null;
        });
        appState.setAnswer('2-5a', data);
        window.dispatchEvent(new CustomEvent('navigate', { 
            detail: { question: '2-6' } 
        }));
    });
    backBtn.addEventListener('click', () => {
        window.dispatchEvent(new CustomEvent('navigate', { 
            detail: { question: '2-5' } 
        }));
    });
    const saved = appState.getAnswer('2-5a');
    if (saved) {
        fields.forEach(field => {
            if (saved[field.id]) {
                const input = container.querySelector(`#param-${field.id}`);
                if (input) input.value = saved[field.id];
            }
        });
        checkAllFilled();
    }
}