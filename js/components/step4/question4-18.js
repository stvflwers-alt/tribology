import appState from '../../state.js';

export function renderQuestion4_18(container) {
    const t = (key, params = {}) => appState.t(key, params);
    const isEnglish = appState.language === 'en';
    const regime = appState.getAnswer('3-2')?.recommendedSystem;
    const isGas = [7, 8].includes(regime);

    if (isGas) {
        container.innerHTML = `
            <div class="question-card">
                <div class="question-header">
                    <span class="question-number">${isEnglish ? 'Question 4-18' : '۴-۱۸'}</span>
                    <span class="question-tag tag-info">${isEnglish ? 'Not Applicable' : 'قابل اجرا نیست'}</span>
                </div>
                <h2 class="question-title">${isEnglish ? 'Lubricant Mixing?' : 'اختلاط روانکارها؟'}</h2>
                <div class="alert alert-info" style="margin: 16px 0;">
                    ℹ️ ${isEnglish ? 
                        'Lubricant mixing is not applicable for gas bearings. Gas lubricants are supplied from an external source and do not require mixing with previous lubricants.' :
                        'اختلاط روانکارها برای یاتاقان‌های گازی کاربرد ندارد. روانکارهای گازی از منبع خارجی تأمین می‌شوند و نیازی به اختلاط با روانکارهای قبلی ندارند.'}
                </div>
                <div class="result-panel" style="border: 2px solid var(--blue-standard); background: #E3F2FD;">
                    <h3>✅ ${isEnglish ? 'Skipped' : 'رد شد'}</h3>
                    <p>${isEnglish ? 
                        'Gas lubricants are used in open-loop systems and do not require mixing or flushing.' :
                        'روانکارهای گازی در سیستم‌های open-loop استفاده می‌شوند و نیازی به اختلاط یا شستشو ندارند.'}
                    </p>
                </div>
                <div class="action-bar">
                    <button id="back-btn" class="btn btn-secondary">${isEnglish ? 'Back' : 'بازگشت'}</button>
                    <button id="next-btn" class="btn btn-primary">${isEnglish ? 'Continue' : 'ادامه'}</button>
                </div>
            </div>
        `;

        document.getElementById('back-btn')?.addEventListener('click', () => {
            window.dispatchEvent(new CustomEvent('navigate', { detail: { question: '4-17' } }));
        });

        document.getElementById('next-btn')?.addEventListener('click', () => {
            appState.currentQuestion = '4-18';
            window.dispatchEvent(new CustomEvent('navigate', { detail: { question: '4-19' } }));
        });

        return;
    }

    container.innerHTML = `
        <div class="question-card">
            <div class="question-header">
                <span class="question-number">${isEnglish ? 'Question 4-18' : '۴-۱۸'}</span>
                <span class="question-tag tag-warning">${isEnglish ? 'Mixing' : 'اختلاط'}</span>
            </div>
            <h2 class="question-title">${isEnglish ? 'Lubricant Mixing?' : 'اختلاط روانکارها؟'}</h2>
            <p class="question-description">
                ${isEnglish ? 'Will the new lubricant be mixed with the previous one?' : 'آیا روانکار جدید با روانکار قبلی مخلوط می‌شود؟'}
            </p>
            <div class="options-list">
                <label class="option-card" data-value="mix">
                    <input type="radio" name="q4-18" value="mix">
                    <div class="option-content">
                        <div class="option-icon">🔀</div>
                        <div class="option-text">
                            <strong>${isEnglish ? 'Yes, it will be mixed' : 'بله، مخلوط می‌شود'}</strong>
                            <span>${isEnglish ? 'New lubricant is added to the system' : 'روانکار جدید به سیستم اضافه می‌شود'}</span>
                        </div>
                    </div>
                    <div class="option-radio"></div>
                </label>
                <label class="option-card" data-value="flush">
                    <input type="radio" name="q4-18" value="flush">
                    <div class="option-content">
                        <div class="option-icon">🧹</div>
                        <div class="option-text">
                            <strong>${isEnglish ? 'No, system will be flushed' : 'خیر، شستشو می‌شود'}</strong>
                            <span>${isEnglish ? 'The system is thoroughly cleaned before refilling' : 'سیستم قبل از شارژ کاملاً تمیز می‌شود'}</span>
                        </div>
                    </div>
                    <div class="option-radio"></div>
                </label>
                <label class="option-card" data-value="new">
                    <input type="radio" name="q4-18" value="new">
                    <div class="option-content">
                        <div class="option-icon">🆕</div>
                        <div class="option-text">
                            <strong>${isEnglish ? 'Not applicable' : 'موضوعیت ندارد'}</strong>
                            <span>${isEnglish ? 'New system or no previous lubricant exists' : 'سیستم جدید است یا روانکار قبلی وجود ندارد'}</span>
                        </div>
                    </div>
                    <div class="option-radio"></div>
                </label>
            </div>
            <div class="alert alert-warning" style="margin-top: 16px;">
                ⚠️ <strong>${isEnglish ? 'Important Warning:' : 'هشدار مهم:'}</strong>
                <ul style="margin-top: 8px; padding-right: 20px;">
                    <li>${isEnglish ? 'Not all lubricants can be safely mixed' : 'اختلاط همه روانکارها ایمن نیست'}</li>
                    <li>${isEnglish ? 'Mineral oils with PAO or ester may be incompatible' : 'روغن‌های معدنی با PAO یا استر ممکن است سازگار نباشند'}</li>
                    <li>${isEnglish ? 'Mixing can cause phase separation, viscosity index reduction, and seal damage' : 'اختلاط می‌تواند باعث جدایش فاز، کاهش شاخص ویسکوزیته، و خرابی آب‌بندها شود'}</li>
                    <li>${isEnglish ? 'Compatibility testing is recommended before mixing' : 'قبل از اختلاط، تست سازگاری توصیه می‌شود'}</li>
                </ul>
            </div>
            <div class="action-bar">
                <button id="back-btn" class="btn btn-secondary">${isEnglish ? 'Back' : 'بازگشت'}</button>
                <button id="next-btn" class="btn btn-primary" disabled>${isEnglish ? 'Continue' : 'ادامه'}</button>
            </div>
        </div>
    `;

    let selected = null;

    document.querySelectorAll('.option-card').forEach(card => {
        card.addEventListener('click', function() {
            document.querySelectorAll('.option-card').forEach(c => c.classList.remove('selected'));
            this.classList.add('selected');
            selected = this.dataset.value;
            document.getElementById('next-btn').disabled = false;
        });
    });

    document.getElementById('back-btn').addEventListener('click', () => {
        window.dispatchEvent(new CustomEvent('navigate', {
            detail: { question: '4-17' }
        }));
    });

    document.getElementById('next-btn').addEventListener('click', () => {
        appState.setAnswer('4-18', selected);
        appState.currentQuestion = '4-18';
        window.dispatchEvent(new CustomEvent('navigate', {
            detail: { question: '4-19' }
        }));
    });
}