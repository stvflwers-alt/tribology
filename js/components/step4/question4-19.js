import appState from '../../state.js';
import router from '../../router.js';

export function renderQuestion4_19(container) {
    const isEnglish = appState.language === 'en';
    const regime = appState.getAnswer('3-2')?.recommendedSystem;
    const isGas = [7, 8].includes(regime);

    if (isGas) {
        container.innerHTML = `
            <div class="question-card">
                <div class="question-header">
                    <span class="question-number">${isEnglish ? 'Question 4-19' : '۴-۱۹'}</span>
                    <span class="question-tag tag-info">${isEnglish ? 'Not Applicable' : 'قابل اجرا نیست'}</span>
                </div>
                <h2 class="question-title">${isEnglish ? 'Quality Control Tests' : 'آزمایش‌های کنترل کیفی'}</h2>
                <div class="alert alert-info" style="margin: 16px 0;">
                    ℹ️ ${isEnglish ? 
                        'Quality control tests for lubricants are not applicable for gas bearings. Gas lubricants do not require viscosity, TAN, TBN, or other oil-specific tests.' :
                        'آزمایش‌های کنترل کیفی برای روانکارهای گازی کاربرد ندارد. روانکارهای گازی نیازی به آزمایش ویسکوزیته، TAN، TBN یا سایر آزمایش‌های مخصوص روغن ندارند.'}
                </div>
                <div class="result-panel" style="border: 2px solid var(--blue-standard); background: #E3F2FD;">
                    <h3>✅ ${isEnglish ? 'Skipped' : 'رد شد'}</h3>
                    <p>${isEnglish ? 
                        'Gas lubricants are used in open-loop systems. Focus on gas quality monitoring (dew point, particle content, pressure stability).' :
                        'روانکارهای گازی در سیستم‌های open-loop استفاده می‌شوند. بر پایش کیفیت گاز (نقطه شبنم، میزان ذرات، پایداری فشار) متمرکز شوید.'}
                    </p>
                </div>
                <div class="action-bar">
                    <button id="back-btn" class="btn btn-secondary">${isEnglish ? 'Back' : 'بازگشت'}</button>
                    <button id="next-btn" class="btn btn-primary">${isEnglish ? 'Continue' : 'ادامه'}</button>
                </div>
            </div>
        `;

        document.getElementById('back-btn')?.addEventListener('click', () => {
            window.dispatchEvent(new CustomEvent('navigate', { detail: { question: '4-18' } }));
        });

        document.getElementById('next-btn')?.addEventListener('click', () => {
            appState.currentQuestion = '4-19';
            window.dispatchEvent(new CustomEvent('navigate', { detail: { question: '4-20' } }));
        });

        return;
    }

    container.innerHTML = `
        <div class="question-card">
            <div class="question-header">
                <span class="question-number">${isEnglish ? 'Question 4-19' : '۴-۱۹'}</span>
                <span class="question-tag tag-standard">${isEnglish ? 'Quality Control' : 'کنترل کیفی'}</span>
            </div>
            <h2 class="question-title">${isEnglish ? 'Quality Control Tests' : 'آزمایش‌های کنترل کیفی'}</h2>
            <div class="formula-panel">
                <h4>🧪 ${isEnglish ? 'For Fresh Lubricant' : 'برای روانکار تازه'}</h4>
                <table class="report-table">
                    <thead>
                        <tr>
                            <th>${isEnglish ? 'Test' : 'آزمایش'}</th>
                            <th>${isEnglish ? 'Standard' : 'استاندارد'}</th>
                            <th>${isEnglish ? 'Priority' : 'اولویت'}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>${isEnglish ? 'Viscosity' : 'ویسکوزیته'}</td>
                            <td>ASTM D445</td>
                            <td>✅ ${isEnglish ? 'Essential' : 'ضروری'}</td>
                        </tr>
                        <tr>
                            <td>VI</td>
                            <td>ASTM D2270</td>
                            <td>✅ ${isEnglish ? 'Essential' : 'ضروری'}</td>
                        </tr>
                        <tr>
                            <td>TAN</td>
                            <td>ASTM D664</td>
                            <td>✅ ${isEnglish ? 'Essential' : 'ضروری'}</td>
                        </tr>
                        <tr>
                            <td>TBN</td>
                            <td>ASTM D2896</td>
                            <td>✅ ${isEnglish ? 'Essential' : 'ضروری'}</td>
                        </tr>
                        <tr>
                            <td>${isEnglish ? 'Density' : 'چگالی'}</td>
                            <td>ASTM D1298</td>
                            <td>${isEnglish ? 'Recommended' : 'پیشنهادی'}</td>
                        </tr>
                        <tr>
                            <td>${isEnglish ? 'Flash Point' : 'نقطه اشتعال'}</td>
                            <td>ASTM D92</td>
                            <td>${isEnglish ? 'Recommended' : 'پیشنهادی'}</td>
                        </tr>
                        <tr>
                            <td>${isEnglish ? 'Pour Point' : 'نقطه ریزش'}</td>
                            <td>ASTM D97</td>
                            <td>${isEnglish ? 'Recommended' : 'پیشنهادی'}</td>
                        </tr>
                        <tr>
                            <td>ICP</td>
                            <td>ASTM D5185</td>
                            <td>${isEnglish ? 'Recommended' : 'پیشنهادی'}</td>
                        </tr>
                        <tr>
                            <td>${isEnglish ? 'Foaming Tendency' : 'کف‌کنندگی'}</td>
                            <td>ASTM D892</td>
                            <td>${isEnglish ? 'For circulation systems' : 'برای گردش بالا'}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="formula-panel" style="margin-top: 20px;">
                <h4>🔬 ${isEnglish ? 'For Used Lubricant (Condition Monitoring)' : 'برای روانکار کارکرده (پایش وضعیت)'}</h4>
                <table class="report-table">
                    <thead>
                        <tr>
                            <th>${isEnglish ? 'Test' : 'آزمایش'}</th>
                            <th>${isEnglish ? 'Warning' : 'هشدار'}</th>
                            <th>${isEnglish ? 'Critical' : 'بحرانی'}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>${isEnglish ? 'Viscosity' : 'ویسکوزیته'}</td>
                            <td>±10%</td>
                            <td>±15%</td>
                        </tr>
                        <tr>
                            <td>TAN</td>
                            <td>+2</td>
                            <td>+4</td>
                        </tr>
                        <tr>
                            <td>TBN</td>
                            <td>50%</td>
                            <td>30%</td>
                        </tr>
                        <tr>
                            <td>${isEnglish ? 'Water' : 'آب'}</td>
                            <td>500 ppm</td>
                            <td>1000 ppm</td>
                        </tr>
                        <tr>
                            <td>Fe</td>
                            <td>100 ppm</td>
                            <td>200 ppm</td>
                        </tr>
                        <tr>
                            <td>Cu</td>
                            <td>50 ppm</td>
                            <td>100 ppm</td>
                        </tr>
                        <tr>
                            <td>Si</td>
                            <td>20 ppm</td>
                            <td>50 ppm</td>
                        </tr>
                        <tr>
                            <td>ISO 4406</td>
                            <td>20/18/15</td>
                            <td>22/20/17</td>
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

    document.getElementById('back-btn').addEventListener('click', () => {
        window.dispatchEvent(new CustomEvent('navigate', { detail: { question: '4-18' } }));
    });

    document.getElementById('next-btn').addEventListener('click', () => {
        appState.currentQuestion = '4-19';
        window.dispatchEvent(new CustomEvent('navigate', { detail: { question: '4-20' } }));
    });
}