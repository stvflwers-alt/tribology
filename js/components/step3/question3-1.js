import appState from '../../state.js';
import router from '../../router.js';
export function renderQuestion3_1(container) {
    // تابع ساده ترجمه
    const translate = (text) => {
        if (appState.language !== 'en') return text;
        const translations = {
            // عنوان‌ها
            'سوال ۳-۱': 'Question 3-1',
            'شرایط ویژه': 'Special Conditions',
            'شرایط ویژه سیستم روانکاری': 'Special Conditions for Lubrication System',
            'شرایط ویژه زیر می‌توانند انتخاب سیستم روانکاری را تحت تأثیر قرار دهند. منطق اصلی (سرعت، بار، دما، تنش تماسی) همچنان در تصمیم‌گیری نهایی لحاظ خواهد شد.': 'The following special conditions can affect the selection of the lubrication system. The main logic (speed, load, temperature, contact stress) will still be considered in the final decision.',
            'گزینه ۶ («هیچ‌کدام») با سایر گزینه‌ها ناسازگار است. گزینه‌های ۱ تا ۵ می‌توانند همزمان انتخاب شوند.': 'Option 6 ("None of the above") is incompatible with other options. Options 1 to 5 can be selected simultaneously.',
            'شرایط انتخاب‌شده:': 'Selected Conditions:',
            'هیچ‌کدام': 'None',
            'هیچ‌کدام (تحلیل بر اساس منطق اصلی)': 'None of the above (analysis based on main logic)',
            'بازگشت': 'Back',
            'ادامه': 'Continue',
            // گزینه‌ها
            'ریسک آتش‌سوزی بالا': 'High Fire Risk',
            'حذف روغن معدنی و هیدروکربنی. اولویت با امولسیون یا روانکار جامد': 'Remove mineral oil and hydrocarbons. Priority with emulsion or solid lubricant',
            'نیاز به دقت بسیار بالا (µm)': 'Very High Precision (µm)',
            'حذف هیدرودینامیک (لرزش) و گریس (نویز). اولویت با ایرواستاتیک': 'Remove hydrodynamic (vibration) and grease (noise). Priority with aerostatic',
            'استارت-استاپ مکرر': 'Frequent Start-Stop',
            'حذف هیدرودینامیک و EHL خالص. اولویت با هیبریدی یا هیدرواستاتیک': 'Remove pure hydrodynamic and EHL. Priority with hybrid or hydrostatic',
            'خلأ یا محیط خورنده': 'Vacuum or Corrosive Environment',
            'حذف تمام روغن‌ها و گریس. فقط روانکار جامد': 'Remove all oils and grease. Only solid lubricant',
            'نیاز به نگهداری کم (Maintenance-free)': 'Low Maintenance (Maintenance-free)',
            'اولویت با گریس یا روانکار جامد': 'Priority with grease or solid lubricant',
            'هیچ‌کدام از موارد بالا': 'None of the above',
            'فقط منطق اصلی (سرعت، بار، دما، p_max)': 'Only main logic (speed, load, temperature, p_max)'
        };
        return translations[text] || text;
    };
    const savedAnswer = appState.getAnswer('3-1') || [];
    const conditions = [
        { code: 1, icon: '🔥', title: translate('ریسک آتش‌سوزی بالا'), desc: translate('حذف روغن معدنی و هیدروکربنی. اولویت با امولسیون یا روانکار جامد') },
        { code: 2, icon: '🎯', title: translate('نیاز به دقت بسیار بالا (µm)'), desc: translate('حذف هیدرودینامیک (لرزش) و گریس (نویز). اولویت با ایرواستاتیک') },
        { code: 3, icon: '🔄', title: translate('استارت-استاپ مکرر'), desc: translate('حذف هیدرودینامیک و EHL خالص. اولویت با هیبریدی یا هیدرواستاتیک') },
        { code: 4, icon: '🧪', title: translate('خلأ یا محیط خورنده'), desc: translate('حذف تمام روغن‌ها و گریس. فقط روانکار جامد') },
        { code: 5, icon: '🛡️', title: translate('نیاز به نگهداری کم (Maintenance-free)'), desc: translate('اولویت با گریس یا روانکار جامد') },
        { code: 6, icon: '📋', title: translate('هیچ‌کدام از موارد بالا'), desc: translate('فقط منطق اصلی (سرعت، بار، دما، p_max)') }
    ];
    container.innerHTML = `
        <div class="question-card">
            <div class="question-header">
                <span class="question-number">${translate('سوال ۳-۱')}</span>
                <span class="question-tag tag-step3">${translate('شرایط ویژه')}</span>
            </div>
            <h2 class="question-title">${translate('شرایط ویژه سیستم روانکاری')}</h2>
            <p class="question-description">
                ${translate('شرایط ویژه زیر می‌توانند انتخاب سیستم روانکاری را تحت تأثیر قرار دهند. منطق اصلی (سرعت، بار، دما، تنش تماسی) همچنان در تصمیم‌گیری نهایی لحاظ خواهد شد.')}
            </p>
            <div class="alert alert-info">
                📌 ${translate('گزینه ۶ («هیچ‌کدام») با سایر گزینه‌ها ناسازگار است. گزینه‌های ۱ تا ۵ می‌توانند همزمان انتخاب شوند.')}
            </div>
            <div class="conditions-grid" id="conditions-grid">
                ${conditions.map(cond => `
                    <div class="condition-card ${savedAnswer.includes(cond.code) ? 'selected' : ''}" 
                         data-code="${cond.code}" id="cond-${cond.code}">
                        <div class="condition-icon">${cond.icon}</div>
                        <div class="condition-info">
                            <strong>${cond.title}</strong>
                            <small>${cond.desc}</small>
                        </div>
                        <div class="condition-check">${savedAnswer.includes(cond.code) ? '✓' : ''}</div>
                    </div>
                `).join('')}
            </div>
            <div id="selection-summary" style="margin-top: 16px; ${savedAnswer.length === 0 ? 'display: none;' : ''}">
                <div class="auto-detection-box highlight">
                    <div class="auto-detection-icon">📋</div>
                    <div class="auto-detection-text">
                        <strong>${translate('شرایط انتخاب‌شده:')}</strong>
                        <span id="selected-conditions-text">
                            ${getSelectedText(savedAnswer, conditions, translate)}
                        </span>
                    </div>
                </div>
            </div>
            <div class="action-bar">
                <button id="back-btn-3-1" class="btn btn-secondary">${translate('بازگشت')}</button>
                <button id="next-btn-3-1" class="btn btn-primary" ${savedAnswer.length === 0 ? 'disabled' : ''}>${translate('ادامه')}</button>
            </div>
        </div>
    `;
    let selectedConditions = [...savedAnswer];
    const nextBtn = document.getElementById('next-btn-3-1');
    const summaryDiv = document.getElementById('selection-summary');
    const summaryText = document.getElementById('selected-conditions-text');
    document.getElementById('conditions-grid').addEventListener('click', (e) => {
        const card = e.target.closest('.condition-card');
        if (!card) return;
        const code = parseInt(card.dataset.code);
        if (code === 6) {
            if (selectedConditions.includes(6)) {
                selectedConditions = [];
            } else {
                selectedConditions = [6];
            }
            document.querySelectorAll('.condition-card').forEach(c => {
                c.classList.remove('selected');
                c.querySelector('.condition-check').textContent = '';
            });
            if (selectedConditions.includes(6)) {
                card.classList.add('selected');
                card.querySelector('.condition-check').textContent = '✓';
            }
        } else {
            const hadNone = selectedConditions.includes(6);
            selectedConditions = selectedConditions.filter(c => c !== 6);
            const index = selectedConditions.indexOf(code);
            if (index === -1) {
                selectedConditions.push(code);
                card.classList.add('selected');
                card.querySelector('.condition-check').textContent = '✓';
            } else {
                selectedConditions.splice(index, 1);
                card.classList.remove('selected');
                card.querySelector('.condition-check').textContent = '';
            }
            if (hadNone) {
                const noneCard = document.getElementById('cond-6');
                if (noneCard) {
                    noneCard.classList.remove('selected');
                    noneCard.querySelector('.condition-check').textContent = '';
                }
            }
        }
        nextBtn.disabled = selectedConditions.length === 0;
        if (selectedConditions.length === 0) {
            summaryDiv.style.display = 'none';
        } else {
            summaryDiv.style.display = 'block';
            summaryText.textContent = getSelectedText(selectedConditions, conditions, translate);
        }
    });
    document.getElementById('back-btn-3-1').addEventListener('click', () => {
        window.dispatchEvent(new CustomEvent('navigate', { detail: { question: '3-0' } }));
    });
    nextBtn.addEventListener('click', () => {
        if (selectedConditions.length === 0) return;
        appState.setAnswer('3-1', selectedConditions);
        appState.currentQuestion = '3-1';
        const nextQuestion = router.getNextQuestion('3-1', null);
        if (nextQuestion) {
            window.dispatchEvent(new CustomEvent('navigate', { detail: { question: nextQuestion } }));
        }
    });
}
function getSelectedText(codes, conditions, translate) {
    if (codes.length === 0) return translate('هیچ‌کدام');
    if (codes.includes(6)) return translate('هیچ‌کدام (تحلیل بر اساس منطق اصلی)');
    return codes
        .map(code => {
            const cond = conditions.find(c => c.code === code);
            return cond ? cond.title : '';
        })
        .filter(Boolean)
        .join('، ');
}