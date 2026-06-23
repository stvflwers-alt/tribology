import appState from '../../state.js';
import router from '../../router.js';

export function renderQuestion4_7(container) {
    const isEnglish = appState.language === 'en';
    const lambda = appState.getAnswer('4-3-lambda');
    const psi = appState.getAnswer('4-6-psi');
    const filmData = appState.getAnswer('4-3-film-data') || {};
    const gasResults = appState.getAnswer('4-3-gas-results') || {};
    const regime = appState.getAnswer('3-2')?.recommendedSystem;
    const tL_ratio = appState.getAnswer('4-6-tL-ratio') || 0.05;
    const isGasDynamic = (regime === 7);

    let needExperimental = (psi > 0.6) || (tL_ratio < 0.1) || (lambda !== null && lambda < 3);
    let reasons = [];

    if (isGasDynamic) {
        const U_actual = gasResults.U_actual || 1;
        const U_lift = gasResults.U_lift || 1.5;
        const liftMargin = gasResults.liftMargin || 1;

        if (liftMargin < 1.5) {
            needExperimental = true;
            reasons.push(isEnglish ?
                `U_actual / U_lift = ${liftMargin.toFixed(2)} < 1.5 — Risk of contact at start` :
                `نسبت سرعت واقعی به سرعت بلند شدن = ${liftMargin.toFixed(2)} < 1.5 — خطر تماس در استارت`
            );
        }

        const Lambda = gasResults.Lambda || 0.3;
        if (Lambda < 0.5) {
            needExperimental = true;
            reasons.push(isEnglish ?
                `Lambda = ${Lambda.toFixed(3)} < 0.5 — Film instability` :
                `عدد یاتاقان = ${Lambda.toFixed(3)} < 0.5 — ناپایداری فیلم`
            );
        }
    }

    appState.setFlag('NEED_EXPERIMENTAL', needExperimental);

    container.innerHTML = needExperimental ? renderNeedExperimental(isEnglish, reasons) : renderNoNeed(isEnglish);

    document.getElementById('back-btn')?.addEventListener('click', () => {
        window.dispatchEvent(new CustomEvent('navigate', { detail: { question: '4-6' } }));
    });

    document.getElementById('next-btn')?.addEventListener('click', () => {
        appState.currentQuestion = '4-7';
        window.dispatchEvent(new CustomEvent('navigate', { detail: { question: '4-8' } }));
    });
}

function renderNeedExperimental(isEnglish, reasons) {
    return `
        <div class="question-card">
            <div class="question-header">
                <span class="question-number">${isEnglish ? 'Question 4-7' : '۴-۷'}</span>
                <span class="question-tag tag-warning">${isEnglish ? 'Measurement Required' : 'نیاز به اندازه‌گیری'}</span>
            </div>
            <h2 class="question-title">${isEnglish ? 'Need for Experimental Measurement' : 'نیاز به اندازه‌گیری تجربی'}</h2>
            <div class="alert alert-warning">
                ⚠️ ${isEnglish ? 'Based on analysis results, experimental measurement is <strong>recommended</strong> for validation' : 'بر اساس نتایج تحلیل، اندازه‌گیری تجربی برای اعتبارسنجی <strong>توصیه می‌شود</strong>'}
            </div>
            ${reasons.length > 0 ? `
                <div class="formula-panel">
                    <h4>📊 ${isEnglish ? 'Reasons for Measurement' : 'دلایل نیاز به اندازه‌گیری'}</h4>
                    <ul style="padding-right: 20px; margin: 8px 0;">
                        ${reasons.map(r => `<li style="margin-bottom: 4px;">${r}</li>`).join('')}
                    </ul>
                </div>
            ` : ''}
            <div class="formula-panel">
                <h4>🔬 ${isEnglish ? 'Recommended Measurement Methods' : 'روش‌های اندازه‌گیری پیشنهادی'}</h4>
                <table class="report-table">
                    <thead>
                        <tr>
                            <th>${isEnglish ? 'Method' : 'روش'}</th>
                            <th>${isEnglish ? 'Measured Parameter' : 'پارامتر اندازه‌گیری'}</th>
                            <th>${isEnglish ? 'Note' : 'توضیح'}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>${isEnglish ? 'Optical Interferometry' : 'تداخل‌سنجی نوری'}</td>
                            <td>${isEnglish ? 'Film thickness (h₀)' : 'ضخامت فیلم (h₀)'}</td>
                            <td>${isEnglish ? 'One surface must be transparent' : 'یک سطح باید شفاف باشد'}</td>
                        </tr>
                        <tr>
                            <td>${isEnglish ? 'Thin-film Thermocouple' : 'ترموکوپل لایه نازک'}</td>
                            <td>${isEnglish ? 'Flash temperature' : 'دمای فلش'}</td>
                            <td>${isEnglish ? 'Difficult to manufacture, low durability' : 'ساخت دشوار، دوام پایین'}</td>
                        </tr>
                        <tr>
                            <td>${isEnglish ? 'Infrared Spectroscopy' : 'طیف‌نگاری مادون قرمز'}</td>
                            <td>${isEnglish ? 'Contact temperature' : 'دمای تماس'}</td>
                            <td>${isEnglish ? 'Requires transparent surface' : 'نیاز به سطح شفاف'}</td>
                        </tr>
                        ${isEnglish ? '' : `
                        <tr>
                            <td>${isEnglish ? 'Proximity Probe' : 'پروب مجاورتی'}</td>
                            <td>${isEnglish ? 'Shaft position & vibration' : 'موقعیت و لرزش شفت'}</td>
                            <td>${isEnglish ? 'Lift-off speed verification' : 'تأیید سرعت بلند شدن'}</td>
                        </tr>
                        `}
                        <tr>
                            <td>${isEnglish ? 'Combined' : 'ترکیبی'}</td>
                            <td>${isEnglish ? 'Thickness + Temperature' : 'ضخامت + دما'}</td>
                            <td>—</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="action-bar">
                <button id="back-btn" class="btn btn-secondary">${isEnglish ? 'Back' : 'بازگشت'}</button>
                <button id="next-btn" class="btn btn-primary">${isEnglish ? 'Continue' : 'ادامه'}</button>
            </div>
        </div>
    `;
}

function renderNoNeed(isEnglish) {
    return `
        <div class="question-card">
            <div class="question-header">
                <span class="question-number">${isEnglish ? 'Question 4-7' : '۴-۷'}</span>
                <span class="question-tag tag-auto">${isEnglish ? 'Measurement Required' : 'نیاز به اندازه‌گیری'}</span>
            </div>
            <h2 class="question-title">${isEnglish ? 'Need for Experimental Measurement' : 'نیاز به اندازه‌گیری تجربی'}</h2>
            <div class="alert alert-success">
                ✅ ${isEnglish ? 'Based on analysis results, experimental measurement is <strong>not necessary</strong>.' : 'بر اساس نتایج تحلیل، اندازه‌گیری تجربی <strong>ضروری نیست</strong>.'}
            </div>
            <div class="formula-panel">
                <h4>📊 ${isEnglish ? 'Verification Criteria' : 'معیارهای تأیید'}</h4>
                <table class="report-table">
                    <tbody>
                        <tr>
                            <td style="width: 40%;"><strong>ψ</strong></td>
                            <td>${psi ? psi.toFixed(3) : '—'} ${psi <= 0.6 ? '✅' : '❌'}</td>
                        </tr>
                        <tr>
                            <td><strong>t/L</strong></td>
                            <td>${tL_ratio.toFixed(3)} ${tL_ratio >= 0.1 ? '✅' : '❌'}</td>
                        </tr>
                        <tr>
                            <td><strong>λ</strong></td>
                            <td>${lambda ? lambda.toFixed(2) : '—'} ${lambda >= 3 ? '✅' : '❌'}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="action-bar">
                <button id="back-btn" class="btn btn-secondary">${isEnglish ? 'Back' : 'بازگشت'}</button>
                <button id="next-btn" class="btn btn-primary">${isEnglish ? 'Continue' : 'ادامه'}</button>
            </div>
        </div>
    `;
}