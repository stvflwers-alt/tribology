import appState from '../../state.js';
import router from '../../router.js';
export function renderQuestion4_8(container) {
    const isEnglish = appState.language === 'en';
    const lambda = appState.getAnswer('4-3-lambda');
    const filmRegime = appState.getAnswer('4-3-regime');
    const idealRegime = appState.getAnswer('3-2')?.recommendedSystem;
    let actualMechanism;
    if (lambda === null) {
        actualMechanism = isEnglish ? 'Solid Lubricant' : 'روانکار جامد';
    } else if (lambda > 3 && filmRegime === 'PE') {
        actualMechanism = isEnglish ? 'Elastohydrodynamic (EHL)' : 'الاستوهیدرودینامیک (EHL)';
    } else if (lambda > 3) {
        actualMechanism = isEnglish ? 'Hydrodynamic' : 'هیدرودینامیک';
    } else if (lambda < 1) {
        actualMechanism = isEnglish ? 'Boundary' : 'مرزی (Boundary)';
    } else {
        actualMechanism = isEnglish ? 'Mixed' : 'مختلط (Mixed)';
    }
    const idealNames = {
        1: isEnglish ? 'Hydrodynamic' : 'هیدرودینامیک',
        2: isEnglish ? 'Hydrostatic' : 'هیدرواستاتیک',
        3: isEnglish ? 'Elastohydrodynamic (EHL)' : 'الاستوهیدرودینامیک (EHL)',
        4: isEnglish ? 'Boundary Lubrication' : 'روانکاری مرزی',
        5: isEnglish ? 'Solid Lubricant' : 'روانکار جامد',
        6: isEnglish ? 'Hybrid' : 'هیبریدی',
        7: isEnglish ? 'Gas Dynamic' : 'گاز دینامیک',
        8: isEnglish ? 'Aerostatic' : 'ایرواستاتیک',
        9: isEnglish ? 'Grease' : 'گریس',
        10: isEnglish ? 'Emulsion' : 'امولسیون'
    };
    const idealName = idealNames[idealRegime] || (isEnglish ? 'Unknown' : 'نامشخص');
    const isMismatch = !actualMechanism.includes(idealName) && idealRegime !== 5;
    if (isMismatch) appState.setFlag('MISMATCH_REGIME', true);
    container.innerHTML = `
        <div class="question-card">
            <div class="question-header">
                <span class="question-number">${isEnglish ? 'Question 4-8' : '۴-۸'}</span>
                <span class="question-tag tag-auto">${isEnglish ? 'Mechanism Comparison' : 'مقایسه مکانیزم'}</span>
            </div>
            <h2 class="question-title">${isEnglish ? 'Comparison of Actual Mechanism with Ideal System' : 'مقایسه مکانیزم واقعی با سیستم ایده‌آل'}</h2>
            <div class="result-panel">
                <h3>🔄 ${isEnglish ? 'Comparison' : 'مقایسه'}</h3>
                <div class="result-grid">
                    <div class="result-item">
                        <span class="label">${isEnglish ? 'Active Actual Mechanism' : 'مکانیزم واقعی فعال'}</span>
                        <span class="value" style="font-size: 1rem;">${actualMechanism}</span>
                    </div>
                    <div class="result-item">
                        <span class="label">${isEnglish ? 'Ideal System (Step 3)' : 'سیستم ایده‌آل (گام ۳)'}</span>
                        <span class="value" style="font-size: 1rem;">${idealName}</span>
                    </div>
                </div>
                <div style="margin-top: 16px; padding: 12px; background: ${isMismatch ? '#FFF3E0' : '#E8F5E9'}; border-radius: var(--radius-sm); text-align: center;">
                    <strong style="color: ${isMismatch ? '#EF6C00' : '#2E7D32'}; font-size: 1.1rem;">
                        ${isMismatch 
                            ? (isEnglish ? '⚠️ Mismatch — Current lubrication system does not match optimal conditions' : '⚠️ عدم تطابق — سیستم روانکاری فعلی با شرایط بهینه مطابقت ندارد') 
                            : (isEnglish ? '✅ Match' : '✅ تطابق دارد')}
                    </strong>
                </div>
            </div>
            <div class="action-bar">
                <button id="back-btn" class="btn btn-secondary">${isEnglish ? 'Back' : 'بازگشت'}</button>
                <button id="next-btn" class="btn btn-primary">${isEnglish ? 'Continue' : 'ادامه'}</button>
            </div>
        </div>
    `;
    document.getElementById('back-btn').addEventListener('click', () => {
        window.dispatchEvent(new CustomEvent('navigate', { detail: { question: '4-7' } }));
    });
    document.getElementById('next-btn').addEventListener('click', () => {
        appState.currentQuestion = '4-8';
        window.dispatchEvent(new CustomEvent('navigate', { detail: { question: '4-9' } }));
    });
}