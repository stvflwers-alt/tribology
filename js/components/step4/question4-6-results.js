import appState from '../../state.js';
import router from '../../router.js';
export function renderQuestion4_6_results(container) {
    const filmData = appState.getAnswer('4-3-film-data') || {};
    const eta0 = appState.getAnswer('4-2-eta0') || 0.05;
    const U = (appState.getAnswer('3-0') || {}).U_ms || 1;
    const E_prime = ((appState.getAnswer('3-0') || {}).E_prime_GPa || 210);
    const h0_um = filmData.h0_um || 1;
    container.innerHTML = `
        <div class="question-card">
            <div class="question-header">
                <span class="question-number">۴-۶</span>
                <span class="question-tag tag-conditional">نتایج تغییر شکل</span>
            </div>
            <h2 class="question-title">نتایج تحلیل تغییر شکل</h2>
            <div class="alert alert-info" style="margin-bottom: 20px;">
            </div>
            <div class="formula-panel">
                <h4>پارامترهای ورودی برنامه DEFLECTION</h4>
                <table class="report-table">
                    <tbody>
                        <tr><td><strong>padth [t]</strong></td><td>ضخامت قطعه</td></tr>
                        <tr><td><strong>length0 [L]</strong></td><td>طول سازه (m)</td></tr>
                        <tr><td><strong>hmax</strong></td><td>h₀ + c (mm)</td></tr>
                        <tr><td><strong>hmin</strong></td><td>h₀ = ${h0_um.toFixed(2)} µm</td></tr>
                        <tr><td><strong>visc [η₀]</strong></td><td>${eta0.toExponential(2)} Pa·s</td></tr>
                        <tr><td><strong>u0 [U]</strong></td><td>${U.toFixed(2)} m/s</td></tr>
                        <tr><td><strong>emod [E]</strong></td><td>${E_prime.toFixed(0)} GPa</td></tr>
                    </tbody>
                </table>
            </div>
            <div class="action-bar">
                <button id="back-btn" class="btn btn-secondary">بازگشت</button>
                <button id="next-btn" class="btn btn-primary">ادامه (رد شدن از این بخش)</button>
            </div>
        </div>
    `;
    document.getElementById('back-btn').addEventListener('click', () => {
        window.dispatchEvent(new CustomEvent('navigate', { detail: { question: '4-6' } }));
    });
    document.getElementById('next-btn').addEventListener('click', () => {
        appState.currentQuestion = '4-6-results';
        window.dispatchEvent(new CustomEvent('navigate', { detail: { question: '4-7' } }));
    });
}