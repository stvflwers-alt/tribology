import appState from '../../state.js';
import router from '../../router.js';

export function renderQuestion4_4(container) {
    const t = (key, params = {}) => appState.t(key, params);
    const isEnglish = appState.language === 'en';
    const lambda = appState.getAnswer('4-3-lambda');
    const filmData = appState.getAnswer('4-3-film-data') || {};
    const regime = appState.getAnswer('3-2')?.recommendedSystem;

    if ([7, 8].includes(regime)) {
        container.innerHTML = `
            <div class="question-card">
                <div class="question-header">
                    <span class="question-number">${isEnglish ? 'Question 4-4' : '۴-۴'}</span>
                    <span class="question-tag tag-info">${isEnglish ? 'Skipped' : 'رد شده'}</span>
                </div>
                <h2 class="question-title">${isEnglish ? 'Cavitation / Oil Whirl' : 'کاویتاسیون / گرداب روغن'}</h2>
                <div class="alert alert-info" style="margin: 16px 0;">
                    ℹ️ ${isEnglish ? 
                        'Cavitation and oil whirl are not defined for gas bearings. Gas is compressible and does not form bubbles or whirl phenomena.' :
                        'کاویتاسیون و گرداب روغن برای یاتاقان‌های گازی تعریف نمی‌شوند. گاز تراکم‌پذیر است و پدیده حباب یا گرداب تشکیل نمی‌دهد.'}
                </div>
                <div class="action-bar">
                    <button id="next-btn" class="btn btn-primary">${isEnglish ? 'Continue' : 'ادامه'}</button>
                </div>
            </div>
        `;

        document.getElementById('next-btn')?.addEventListener('click', () => {
            appState.currentQuestion = '4-4';
            window.dispatchEvent(new CustomEvent('navigate', {
                detail: { question: '4-5' }
            }));
        });
        return;
    }

    container.innerHTML = `
        <div class="question-card">
            <div class="question-header">
                <span class="question-number">${isEnglish ? 'Question 4-4' : '۴-۴'}</span>
                <span class="question-tag tag-important">${isEnglish ? 'Destructive Phenomena' : 'پدیده‌های مخرب'}</span>
            </div>
            <h2 class="question-title">${isEnglish ? 'Cavitation or Oil Whirl?' : 'کاویتاسیون یا گرداب روغن؟'}</h2>
            <p class="question-description">
                ${isEnglish ? 
                    `With a full film (λ = ${lambda ? lambda.toFixed(2) : '—'} ≥ 3), the following phenomena may occur. Please check the part surface and device behavior:` :
                    `با توجه به فیلم کامل (λ = ${lambda ? lambda.toFixed(2) : '—'} ≥ 3)، پدیده‌های زیر ممکن است رخ دهند. لطفاً سطح قطعه و رفتار دستگاه را بررسی کنید:`}
            </p>
            <div class="options-list">
                <label class="option-card" data-value="cavitation">
                    <input type="radio" name="q4-4" value="cavitation">
                    <div class="option-content">
                        <div class="option-icon">🕳️</div>
                        <div class="option-text">
                            <strong>${isEnglish ? 'Cavitation' : 'کاویتاسیون'}</strong>
                            <span>${isEnglish ? 'Honeycomb holes on surface, unusual noise, surface erosion' : 'حفره‌های کندویی روی سطح، نویز/صدای غیرعادی، فرسایش سطح'}</span>
                        </div>
                    </div>
                    <div class="option-radio"></div>
                </label>
                <label class="option-card" data-value="oil_whirl">
                    <input type="radio" name="q4-4" value="oil_whirl">
                    <div class="option-content">
                        <div class="option-icon">🌀</div>
                        <div class="option-text">
                            <strong>${isEnglish ? 'Oil Whirl' : 'گرداب روغن'}</strong>
                            <span>${isEnglish ? 'Shaft vibration at 0.42-0.48× rotational speed, whining noise, load fluctuation' : 'لرزش شفت با فرکانس 0.42-0.48× دور شفت، نویز/صدای زوزه، نوسان بار روی گیج'}</span>
                        </div>
                    </div>
                    <div class="option-radio"></div>
                </label>
                <label class="option-card" data-value="both">
                    <input type="radio" name="q4-4" value="both">
                    <div class="option-content">
                        <div class="option-icon">⚠️</div>
                        <div class="option-text">
                            <strong>${isEnglish ? 'Both' : 'هر دو'}</strong>
                            <span>${isEnglish ? 'Combination of signs from both phenomena' : 'ترکیبی از علائم بالا'}</span>
                        </div>
                    </div>
                    <div class="option-radio"></div>
                </label>
                <label class="option-card option-recommended" data-value="none">
                    <input type="radio" name="q4-4" value="none">
                    <div class="option-content">
                        <div class="option-icon">✅</div>
                        <div class="option-text">
                            <strong>${isEnglish ? 'None' : 'هیچ‌کدام'}</strong>
                            <span>${isEnglish ? 'Healthy surface, no vibration or unusual noise' : 'سطح سالم، بدون لرزش و صدای غیرعادی'}</span>
                        </div>
                    </div>
                    <div class="option-radio"></div>
                </label>
            </div>
            <div id="info-box" style="margin-top: 16px;"></div>
            <div class="action-bar">
                <button id="back-btn" class="btn btn-secondary">${isEnglish ? 'Back' : 'بازگشت'}</button>
                <button id="next-btn" class="btn btn-primary" disabled>${isEnglish ? 'Continue' : 'ادامه'}</button>
            </div>
        </div>
    `;

    let selected = null;
    const infoBox = document.getElementById('info-box');

    const infoContent = {
        'cavitation': `
            <div class="alert alert-warning">
                <strong>🕳️ ${isEnglish ? 'Cavitation Detected' : 'کاویتاسیون تشخیص داده شد'}</strong>
                <p style="margin-top: 8px;">
                    <strong>${isEnglish ? 'Cause:' : 'علت:'}</strong> ${isEnglish ? 'Local pressure drop below fluid vapor pressure' : 'کاهش فشار موضعی زیر فشار بخار سیال'}<br>
                    <strong>${isEnglish ? 'Solution:' : 'راه حل:'}</strong> ${isEnglish ? 'Increase inlet pressure, modify groove geometry, use oil with lower vapor pressure' : 'افزایش فشار ورودی، اصلاح هندسه شیارها، استفاده از روغن با فشار بخار پایین‌تر'}<br>
                </p>
            </div>
        `,
        'oil_whirl': `
            <div class="alert alert-warning">
                <strong>🌀 ${isEnglish ? 'Oil Whirl Detected' : 'گرداب روغن تشخیص داده شد'}</strong>
                <p style="margin-top: 8px;">
                    <strong>${isEnglish ? 'Cause:' : 'علت:'}</strong> ${isEnglish ? 'Hydrodynamic instability at high speeds' : 'ناپایداری هیدرودینامیکی در سرعت‌های بالا'}<br>
                    <strong>${isEnglish ? 'Solution:' : 'راه حل:'}</strong> ${isEnglish ? 'Reduce clearance, use multi-lobe bearings, increase load' : 'کاهش لقی، استفاده از یاتاقان چندلوب، افزایش بار'}<br>
                </p>
            </div>
        `,
        'both': `
            <div class="alert alert-danger">
                <strong>⚠️ ${isEnglish ? 'Both Phenomena Observed' : 'هر دو پدیده مشاهده شده است'}</strong>
                <p style="margin-top: 8px;">
                    ${isEnglish ? 'Needs detailed investigation and possibly redesign of the lubrication system' : 'نیاز به بررسی دقیق‌تر و احتمالاً طراحی مجدد سیستم روانکاری'}
                </p>
            </div>
        `
    };

    document.querySelectorAll('.option-card').forEach(card => {
        card.addEventListener('click', function() {
            document.querySelectorAll('.option-card').forEach(c => c.classList.remove('selected'));
            this.classList.add('selected');
            selected = this.dataset.value;
            document.getElementById('next-btn').disabled = false;
            infoBox.innerHTML = infoContent[selected] || '';
        });
    });

    document.getElementById('back-btn').addEventListener('click', () => {
        window.dispatchEvent(new CustomEvent('navigate', {
            detail: { question: '4-3' }
        }));
    });

    document.getElementById('next-btn').addEventListener('click', () => {
        appState.setAnswer('4-4', selected);
        if (selected === 'cavitation') appState.setFlag('CAVITATION_DETECTED', true);
        if (selected === 'oil_whirl') appState.setFlag('OIL_WHIRL_DETECTED', true);
        if (selected === 'both') {
            appState.setFlag('CAVITATION_DETECTED', true);
            appState.setFlag('OIL_WHIRL_DETECTED', true);
        }
        appState.currentQuestion = '4-4';
        window.dispatchEvent(new CustomEvent('navigate', {
            detail: { question: '4-5' }
        }));
    });
}