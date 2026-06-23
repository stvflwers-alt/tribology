import appState from '../../state.js';
import router from '../../router.js';

export function renderQuestion4_11(container) {
    const isEnglish = appState.language === 'en';
    const regime = appState.getAnswer('3-2')?.recommendedSystem;
    const isGas = [7, 8].includes(regime);

    if (isGas) {
        container.innerHTML = `
            <div class="question-card">
                <div class="question-header">
                    <span class="question-number">${isEnglish ? 'Question 4-11' : '۴-۱۱'}</span>
                    <span class="question-tag tag-info">${isEnglish ? 'Not Applicable' : 'قابل اجرا نیست'}</span>
                </div>
                <h2 class="question-title">${isEnglish ? 'Additive Package' : 'بسته افزودنی'}</h2>
                <div class="alert alert-info" style="margin: 16px 0;">
                    ℹ️ ${isEnglish ? 
                        'Additives are not required for gas lubricants. Gas bearings operate with clean, dry gas as the working fluid.' :
                        'افزودنی‌ها برای روانکارهای گازی مورد نیاز نیستند. یاتاقان‌های گازی با گاز تمیز و خشک به عنوان سیال کاری کار می‌کنند.'}
                </div>
                <div class="result-panel" style="border: 2px solid var(--blue-standard); background: #E3F2FD;">
                    <h3>✅ ${isEnglish ? 'No Additives Required' : 'نیازی به افزودنی نیست'}</h3>
                    <p>${isEnglish ? 
                        'Gas lubricants do not require anti-oxidants, anti-wear (AW), extreme pressure (EP), or anti-foam additives.' :
                        'روانکارهای گازی نیازی به آنتی‌اکسیدان، ضدسایش (AW)، فشار فوق‌العاده (EP)، یا ضدکف ندارند.'}
                    </p>
                </div>
                <div class="action-bar">
                    <button id="back-btn" class="btn btn-secondary">${isEnglish ? 'Back' : 'بازگشت'}</button>
                    <button id="next-btn" class="btn btn-primary">${isEnglish ? 'Continue' : 'ادامه'}</button>
                </div>
            </div>
        `;

        document.getElementById('back-btn')?.addEventListener('click', () => {
            window.dispatchEvent(new CustomEvent('navigate', { detail: { question: '4-10' } }));
        });

        document.getElementById('next-btn')?.addEventListener('click', () => {
            appState.currentQuestion = '4-11';
            window.dispatchEvent(new CustomEvent('navigate', { detail: { question: '4-12' } }));
        });

        return;
    }

    const lambda = appState.getAnswer('4-3-lambda');
    const flashData = appState.getAnswer('4-5-flash-data') || {};
    const T_contact = flashData.T_contact || 25;
    const T_max_lube = flashData.T_max_lube || 150;
    const contaminants = appState.getAnswer('2-13') || [];
    const hasWater = contaminants.includes('3');
    const hasParticles = contaminants.includes('2') || contaminants.includes('5');
    const hasCorrosive = contaminants.includes('4');
    const additives = [];

    if (lambda > 3) {
        additives.push({ 
            name: isEnglish ? 'Antioxidant, Rust Inhibitor, Anti-foam' : 'آنتی‌اکسیدان، ضدزنگ، ضدکف', 
            reason: isEnglish ? 'Full film' : 'فیلم کامل', 
            page: '81-96' 
        });
    } else if (lambda >= 1) {
        additives.push({ 
            name: isEnglish ? 'Antioxidant, AW, Anti-foam' : 'آنتی‌اکسیدان، AW، ضدکف', 
            reason: isEnglish ? 'Mixed film' : 'فیلم مختلط', 
            page: '81-96' 
        });
    } else {
        additives.push({ 
            name: isEnglish ? 'Antioxidant, EP, AW, Anti-foam' : 'آنتی‌اکسیدان، EP، AW، ضدکف', 
            reason: isEnglish ? 'Boundary film' : 'فیلم مرزی', 
            page: '81-96' 
        });
    }

    if (T_contact > T_max_lube * 0.8) {
        additives.push({ 
            name: isEnglish ? 'Enhanced Antioxidant' : 'آنتی‌اکسیدان تقویت‌شده', 
            reason: isEnglish ? 'High temperature' : 'دمای بالا', 
            page: '88-89' 
        });
    }

    if (hasWater) {
        additives.push({ 
            name: isEnglish ? 'Rust Inhibitor, Demulsifier' : 'ضدزنگ، دمولسیفایر', 
            reason: isEnglish ? 'Water presence' : 'حضور آب', 
            page: '87-88' 
        });
    }

    if (hasParticles) {
        additives.push({ 
            name: isEnglish ? 'Detergent, Dispersant' : 'پاک‌کننده، دیسپرسانت', 
            reason: isEnglish ? 'Particle contamination' : 'آلودگی ذرات', 
            page: '90-91' 
        });
    }

    if (hasCorrosive) {
        additives.push({ 
            name: isEnglish ? 'Corrosion Inhibitor' : 'بازدارنده خوردگی', 
            reason: isEnglish ? 'Corrosive environment' : 'محیط خورنده', 
            page: '87-88' 
        });
    }

    appState.setAnswer('4-11-additives', additives);

    container.innerHTML = `
        <div class="question-card">
            <div class="question-header">
                <span class="question-number">${isEnglish ? 'Question 4-11' : '۴-۱۱'}</span>
                <span class="question-tag tag-auto">${isEnglish ? 'Additive Package' : 'بسته افزودنی'}</span>
            </div>
            <h2 class="question-title">${isEnglish ? 'Recommended Additive Package' : 'بسته افزودنی پیشنهادی'}</h2>
            <div class="formula-panel">
                <h4>🧪 ${isEnglish ? 'Recommended Additives' : 'افزودنی‌های توصیه‌شده'}</h4>
                ${additives.map((a, i) => `
                    <div class="equipment-item">
                        <div class="equipment-icon">🧪</div>
                        <div class="equipment-info">
                            <strong>${a.name}</strong>
                            <small>${isEnglish ? 'Reason:' : 'دلیل:'} ${a.reason}</small>
                        </div>
                    </div>
                `).join('')}
            </div>
            <div class="action-bar">
                <button id="back-btn" class="btn btn-secondary">${isEnglish ? 'Back' : 'بازگشت'}</button>
                <button id="next-btn" class="btn btn-primary">${isEnglish ? 'Continue' : 'ادامه'}</button>
            </div>
        </div>
    `;

    document.getElementById('back-btn').addEventListener('click', () => {
        window.dispatchEvent(new CustomEvent('navigate', { detail: { question: '4-10' } }));
    });

    document.getElementById('next-btn').addEventListener('click', () => {
        appState.currentQuestion = '4-11';
        window.dispatchEvent(new CustomEvent('navigate', { detail: { question: '4-12' } }));
    });
}