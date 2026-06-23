import appState from '../../state.js';
import router from '../../router.js';
import Calculations from '../../calculations.js';
export function renderQuestion4_6(container) {
    const t = (key, params = {}) => appState.t(key, params);
    const isEnglish = appState.language === 'en';
    const contactData = appState.getAnswer('3-0') || {};
    const p_max = contactData.p_max_MPa || 100;
    const sigma_y = contactData.sigma_y_MPa || 250;
    const E_prime = (contactData.E_prime_GPa || 210) * 1e9;
    const materialData = appState.getAnswer('2-3') || {};
    const H = Math.min(materialData.part1?.H || 200, materialData.part2?.H || 200);
    const t1 = materialData.part1?.t || 10;
    const t2 = materialData.part2?.t || 10;
    const t_min = Math.min(t1, t2);
    const geometryData = appState.getAnswer('2-geometry') || {};
    let L_structure = 100;
    if (geometryData.params?.L_bearing) L_structure = geometryData.params.L_bearing;
    else if (geometryData.params?.L) L_structure = geometryData.params.L;
    const sigma_micron = appState.getAnswer('2-6-sigma') || 0.5;
    const sigma_star_m = sigma_micron * 1e-6;
    container.innerHTML = `
        <div class="question-card">
            <div class="question-header">
                <span class="question-number">${isEnglish ? 'Question 4-6' : '۴-۶'}</span>
                <span class="question-tag tag-auto">${isEnglish ? 'Auto Analysis' : 'تحلیل خودکار'}</span>
            </div>
            <h2 class="question-title">${isEnglish ? 'Elastic/Plastic Deformation Analysis' : 'تحلیل نیاز به تغییر شکل الاستیک/پلاستیک'}</h2>
            <p class="question-description">
                ${isEnglish ? 'To estimate the plasticity index, select the surface machining method of the contact:' : 'برای تخمین شاخص پلاستیسیته، روش ماشین‌کاری سطح تماس را انتخاب کنید:'}
            </p>
            <div class="options-list">
                <label class="option-card" data-value="75">
                    <input type="radio" name="machining" value="75">
                    <div class="option-content">
                        <div class="option-icon">✨</div>
                        <div class="option-text">
                            <strong>${isEnglish ? 'Polished' : 'پولیش (Polished)'}</strong>
                            <span>r ≈ 75 µm</span>
                        </div>
                    </div>
                    <div class="option-radio"></div>
                </label>
                <label class="option-card" data-value="30">
                    <input type="radio" name="machining" value="30">
                    <div class="option-content">
                        <div class="option-icon">⚙️</div>
                        <div class="option-text">
                            <strong>${isEnglish ? 'Ground' : 'سنگ‌زنی (Ground)'}</strong>
                            <span>r ≈ 30 µm</span>
                        </div>
                    </div>
                    <div class="option-radio"></div>
                </label>
                <label class="option-card" data-value="10">
                    <input type="radio" name="machining" value="10">
                    <div class="option-content">
                        <div class="option-icon">🔧</div>
                        <div class="option-text">
                            <strong>${isEnglish ? 'Turned' : 'تراش‌کاری (Turned)'}</strong>
                            <span>r ≈ 10 µm</span>
                        </div>
                    </div>
                    <div class="option-radio"></div>
                </label>
                <label class="option-card" data-value="15">
                    <input type="radio" name="machining" value="15">
                    <div class="option-content">
                        <div class="option-icon">🔩</div>
                        <div class="option-text">
                            <strong>${isEnglish ? 'Milled' : 'فرزکاری (Milled)'}</strong>
                            <span>r ≈ 15 µm</span>
                        </div>
                    </div>
                    <div class="option-radio"></div>
                </label>
                <label class="option-card" data-value="5">
                    <input type="radio" name="machining" value="5">
                    <div class="option-content">
                        <div class="option-icon">🏗️</div>
                        <div class="option-text">
                            <strong>${isEnglish ? 'As-cast/Forged' : 'ریخته‌گری/فورج (As-cast/Forged)'}</strong>
                            <span>r ≈ 5 µm</span>
                        </div>
                    </div>
                    <div class="option-radio"></div>
                </label>
                <label class="option-card" data-value="auto">
                    <input type="radio" name="machining" value="auto">
                    <div class="option-content">
                        <div class="option-icon">❓</div>
                        <div class="option-text">
                            <strong>${isEnglish ? 'I don\'t know' : 'نمی‌دانم'}</strong>
                            <span>${isEnglish ? 'r = 100 × Rq (auto estimate)' : 'r = 100 × Rq (تخمین خودکار)'}</span>
                        </div>
                    </div>
                    <div class="option-radio"></div>
                </label>
            </div>
            <div id="results-container" style="display: none; margin-top: 20px;"></div>
            <div class="action-bar">
                <button id="back-btn" class="btn btn-secondary">${isEnglish ? 'Back' : 'بازگشت'}</button>
                <button id="calculate-btn" class="btn btn-primary" disabled>${isEnglish ? 'Calculate' : 'محاسبه'}</button>
                <button id="next-btn" class="btn btn-primary" style="display: none;">${isEnglish ? 'Continue' : 'ادامه'}</button>
            </div>
        </div>
    `;
    let selectedR = null;
    let deflectionNeeded = false;
    document.querySelectorAll('.option-card').forEach(card => {
        card.addEventListener('click', function() {
            document.querySelectorAll('.option-card').forEach(c => c.classList.remove('selected'));
            this.classList.add('selected');
            document.getElementById('calculate-btn').disabled = false;
        });
    });
    document.getElementById('calculate-btn').addEventListener('click', () => {
        const selectedCard = document.querySelector('.option-card.selected');
        if (!selectedCard) return;
        let r_micron;
        if (selectedCard.dataset.value === 'auto') {
            r_micron = 100 * sigma_micron;
        } else {
            r_micron = parseFloat(selectedCard.dataset.value);
        }
        const r_m = r_micron * 1e-6;
        const H_Pa = H * 9.81 * 1e6;
        const psi = Calculations.calculatePlasticityIndex(E_prime, H_Pa, sigma_star_m, r_m);
        const tL_ratio = t_min / L_structure;
        const condition1 = tL_ratio < 0.1;
        const condition2 = L_structure > 500;
        const condition3 = psi > 0.6;
        const condition4 = (p_max / sigma_y) > 1.6;
        deflectionNeeded = condition1 || condition2 || condition3 || condition4;
        appState.setAnswer('4-6-psi', psi);
        appState.setAnswer('4-6-r_micron', r_micron);
        appState.setFlag('DEFLECTION_NEEDED', deflectionNeeded);
        const resultColor = deflectionNeeded ? '#EF6C00' : '#2E7D32';
        const resultBg = deflectionNeeded ? '#FFF3E0' : '#E8F5E9';
        const resultText = deflectionNeeded 
            ? (isEnglish ? '⚠️ Elastic deformation analysis <strong>required</strong>' : '⚠️ تحلیل تغییر شکل الاستیک <strong>لازم است</strong>')
            : (isEnglish ? '✅ Elastic deformation analysis <strong>not required</strong>' : '✅ تحلیل تغییر شکل الاستیک <strong>لازم نیست</strong>');
        document.getElementById('results-container').style.display = 'block';
        document.getElementById('results-container').innerHTML = `
            <div class="result-panel">
                <h3>📊 ${isEnglish ? 'Deformation Analysis Results' : 'نتایج تحلیل نیاز به تغییر شکل'}</h3>
                <div class="result-grid">
                    <div class="result-item">
                        <span class="label">ψ — ${isEnglish ? 'Plasticity Index' : 'شاخص پلاستیسیته'}</span>
                        <span class="value">${psi ? psi.toFixed(3) : '—'}</span>
                    </div>
                    <div class="result-item ${condition1 ? 'danger' : 'success'}">
                        <span class="label">t/L = ${tL_ratio.toFixed(3)}</span>
                        <span class="value">${condition1 ? (isEnglish ? '⚠️ < 0.1' : '⚠️ < 0.1') : (isEnglish ? '✅ ≥ 0.1' : '✅ ≥ 0.1')}</span>
                    </div>
                    <div class="result-item ${condition2 ? 'danger' : 'success'}">
                        <span class="label">L = ${L_structure.toFixed(0)} mm</span>
                        <span class="value">${condition2 ? (isEnglish ? '⚠️ > 500' : '⚠️ > 500') : (isEnglish ? '✅ ≤ 500' : '✅ ≤ 500')}</span>
                    </div>
                    <div class="result-item ${condition3 ? 'danger' : 'success'}">
                        <span class="label">ψ > 0.6</span>
                        <span class="value">${condition3 ? (isEnglish ? '⚠️ True' : '⚠️ برقرار') : (isEnglish ? '✅ False' : '✅ برقرار نیست')}</span>
                    </div>
                    <div class="result-item ${condition4 ? 'danger' : 'success'}">
                        <span class="label">p<sub>max</sub>/σ<sub>y</sub> = ${(p_max/sigma_y).toFixed(3)}</span>
                        <span class="value">${condition4 ? (isEnglish ? '⚠️ > 1.6' : '⚠️ > 1.6') : (isEnglish ? '✅ ≤ 1.6' : '✅ ≤ 1.6')}</span>
                    </div>
                </div>
                <div style="margin-top: 16px; padding: 12px; background: ${resultBg}; border-radius: var(--radius-sm); text-align: center;">
                    <strong style="color: ${resultColor}; font-size: 1.1rem;">${resultText}</strong>
                </div>
            </div>
        `;
        document.getElementById('calculate-btn').style.display = 'none';
        document.getElementById('next-btn').style.display = 'inline-flex';
    });
    document.getElementById('back-btn').addEventListener('click', () => {
        window.dispatchEvent(new CustomEvent('navigate', { detail: { question: '4-5' } }));
    });
    document.getElementById('next-btn').addEventListener('click', () => {
        appState.currentQuestion = '4-6';
        const nextQuestion = router.getNextQuestion('4-6', null);
        window.dispatchEvent(new CustomEvent('navigate', { 
            detail: { question: nextQuestion || '4-7' } 
        }));
    });
}