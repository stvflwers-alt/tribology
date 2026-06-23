import appState from '../../state.js';
export function renderQuestion4_2_gas(container) {
    const isEnglish = appState.language === 'en';
    const lubricantName = appState.getAnswer('4-1-lubricant-name') || (isEnglish ? 'Gas' : 'گاز');
    const contactData = appState.getAnswer('3-0') || {};
    const T_working = contactData.T_C || 25;
    // مقادیر استاندارد برای گازها
    const eta0 = 1.8e-5;  // Pa·s
    const alpha = 0.5e-8;  // Pa⁻¹
    appState.setAnswer('4-2-eta0', eta0);
    appState.setAnswer('4-2-alpha', alpha);
    appState.setAnswer('4-2-method-used', 'gas');
    appState.setAnswer('4-2-vi', null);
    appState.setAnswer('4-2-t_max', 1000);
    container.innerHTML = `
        <div class="question-card">
            <div class="question-header">
                <span class="question-number">${isEnglish ? 'Question 4-2' : '۴-۲'}</span>
                <span class="question-tag tag-auto">${isEnglish ? 'Gas Lubricant' : 'روانکار گازی'}</span>
            </div>
            <h2 class="question-title">${isEnglish ? 'Gas Lubricant Parameters' : 'پارامترهای روانکار گازی'}</h2>
            <p class="question-description">
                ${isEnglish ? `Selected lubricant: <strong>${lubricantName}</strong><br>For gas lubricants, standard properties are automatically applied.` : `روانکار انتخابی: <strong>${lubricantName}</strong><br>برای روانکارهای گازی، خواص استاندارد به طور خودکار اعمال می‌شود.`}
            </p>
            <div class="result-panel">
                <h3>📊 ${isEnglish ? 'Gas Properties' : 'خواص گاز'}</h3>
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
                        <span class="label">T_max — ${isEnglish ? 'Maximum Temperature' : 'دمای حداکثر'}</span>
                        <span class="value">> 1000 °C</span>
                    </div>
                </div>
            </div>
            <div class="alert alert-info">
                ℹ️ ${isEnglish ? 'Gas lubricants do not require viscosity grade selection or additive packages. The system will proceed with simplified analysis.' : 'روانکارهای گازی نیازی به انتخاب گرید ویسکوزیته یا بسته افزودنی ندارند. سیستم با تحلیل ساده‌شده ادامه می‌دهد.'}
            </div>
            <div class="action-bar">
                <button id="next-btn" class="btn btn-primary">${isEnglish ? 'Continue' : 'ادامه'}</button>
            </div>
        </div>
    `;
    document.getElementById('next-btn').addEventListener('click', () => {
        appState.currentQuestion = '4-2-gas';
        window.dispatchEvent(new CustomEvent('navigate', { 
            detail: { question: '4-3-gas' } 
        }));
    });
}