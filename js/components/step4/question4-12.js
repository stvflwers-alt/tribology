import appState from '../../state.js';
import router from '../../router.js';

export function renderQuestion4_12(container) {
    const isEnglish = appState.language === 'en';
    const regime = appState.getAnswer('3-2')?.recommendedSystem;
    const isGas = [7, 8].includes(regime);
    const Q_Lmin = appState.getAnswer('4-9-Q') ? appState.getAnswer('4-9-Q') * 1000 * 60 : 10;
    const tankVolume = appState.getAnswer('4-9-tank-volume') || Q_Lmin * 4;
    const solidLubeMethod = appState.getAnswer('3-7b') || '1';
    let content;

    if ([1, 2, 3, 4, 6, 10].includes(regime)) {
        content = `
            <div class="result-panel">
                <h3>🛢️ ${isEnglish ? 'Liquid Lubricant Quantity' : 'مقدار روانکار مایع'}</h3>
                <div class="result-grid">
                    <div class="result-item highlight">
                        <span class="label">${isEnglish ? 'Required Flow Rate (Q)' : 'دبی مورد نیاز (Q)'}</span>
                        <span class="value">${Q_Lmin.toFixed(2)} L/min</span>
                    </div>
                    <div class="result-item">
                        <span class="label">${isEnglish ? 'Recommended Tank Volume' : 'حجم مخزن پیشنهادی'}</span>
                        <span class="value">≈ ${tankVolume.toFixed(0)} L</span>
                    </div>
                </div>
            </div>
        `;
    } else if (regime === 9) {
        content = `
            <div class="alert alert-info">
                <strong>🧴 ${isEnglish ? 'Grease' : 'گریس'}</strong>
                <p style="margin-top: 8px;">${isEnglish ? 
                    'The bearing should be completely filled. Excess grease acts as a seal against contamination and evaporation.' : 
                    'یاتاقان باید کاملاً پر شود. گریس اضافی به عنوان آب‌بند در برابر آلودگی و تبخیر عمل می‌کند.'}
                </p>
            </div>
        `;
    } else if (regime === 5) {
        const thicknessMap = { 
            '1': isEnglish ? '3-10' : '۳-۱۰', 
            '2': isEnglish ? '5-15' : '۵-۱۵', 
            '3': isEnglish ? '5-20' : '۵-۲۰', 
            '4': isEnglish ? '1-5' : '۱-۵', 
            '5': isEnglish ? '~0.2' : '~۰.۲', 
            '6': isEnglish ? '1-3' : '۱-۳' 
        };
        content = `
            <div class="alert alert-info">
                <strong>💎 ${isEnglish ? 'Solid Lubricant' : 'روانکار جامد'}</strong>
                <p style="margin-top: 8px;">${isEnglish ? 'Film thickness:' : 'ضخامت فیلم:'} ${thicknessMap[solidLubeMethod] || (isEnglish ? '3-10' : '۳-۱۰')} µm</p>
                <p style="margin-top: 4px; font-size: 0.85rem; color: var(--text-secondary);">
                    ${isEnglish ? 
                        'The durability of solid lubricant film strongly depends on its application method.' : 
                        'دوام فیلم روانکار جامد به شدت به روش اعمال آن بستگی دارد.'}
                </p>
            </div>
        `;
    } else if (isGas) {
        content = `
            <div class="alert alert-info" style="border: 2px solid var(--blue-standard); background: #E3F2FD;">
                <strong>💨 ${isEnglish ? 'Gas Lubricant' : 'روانکار گازی'}</strong>
                <p style="margin-top: 8px;">${isEnglish ? 
                    'Gas lubricants do not require a reservoir or flow rate calculation. The gas is supplied from an external source (compressor or gas cylinder).' : 
                    'روانکارهای گازی نیازی به مخزن یا محاسبه دبی ندارند. گاز از منبع خارجی (کمپرسور یا کپسول گاز) تأمین می‌شود.'}
                </p>
                ${regime === 7 ? `
                    <p style="margin-top: 4px; font-size: 0.85rem; color: var(--text-secondary);">
                        ${isEnglish ? 
                            'Gas dynamic bearings generate pressure through relative motion of surfaces.' : 
                            'یاتاقان‌های گاز دینامیک فشار را از طریق حرکت نسبی سطوح تولید می‌کنند.'}
                    </p>
                ` : ''}
                ${regime === 8 ? `
                    <p style="margin-top: 4px; font-size: 0.85rem; color: var(--text-secondary);">
                        ${isEnglish ? 
                            'Aerostatic bearings require an external compressed air/gas supply.' : 
                            'یاتاقان‌های ایرواستاتیک نیاز به تأمین هوای/گاز فشرده خارجی دارند.'}
                    </p>
                ` : ''}
            </div>
        `;
    } else {
        content = '';
    }

    container.innerHTML = `
        <div class="question-card">
            <div class="question-header">
                <span class="question-number">${isEnglish ? 'Question 4-12' : '۴-۱۲'}</span>
                <span class="question-tag tag-auto">${isEnglish ? 'Lubricant Quantity' : 'مقدار روانکار'}</span>
            </div>
            <h2 class="question-title">${isEnglish ? 'Lubricant Quantity Determination' : 'تعیین مقدار روانکار'}</h2>
            ${content}
            <div class="action-bar">
                <button id="back-btn" class="btn btn-secondary">${isEnglish ? 'Back' : 'بازگشت'}</button>
                <button id="next-btn" class="btn btn-primary">${isEnglish ? 'Continue' : 'ادامه'}</button>
            </div>
        </div>
    `;

    document.getElementById('back-btn').addEventListener('click', () => {
        window.dispatchEvent(new CustomEvent('navigate', { detail: { question: '4-11' } }));
    });

    document.getElementById('next-btn').addEventListener('click', () => {
        appState.currentQuestion = '4-12';
        window.dispatchEvent(new CustomEvent('navigate', { detail: { question: '4-13' } }));
    });
}