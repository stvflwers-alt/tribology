import appState from '../../state.js';
export function renderQuestion4_1a(container) {
    const t = (key, params = {}) => appState.t(key, params);
    const btnContinue = t('common.btnContinue');
    const btnBack = t('common.btnBack');
    container.innerHTML = `
        <div class="question-card">
            <div class="question-header">
                <span class="question-number">۴-۱-الف</span>
                <span class="question-tag tag-conditional">ثبت روانکار جدید</span>
            </div>
            <h2 class="question-title">ثبت روانکار جدید</h2>
            <p class="question-description">لطفاً نام روانکار جدید را وارد کنید.</p>
            <div class="conditional-form">
                <div class="form-group">
                    <label class="form-label" for="new-lubricant-name">نام روانکار</label>
                    <input type="text" id="new-lubricant-name" class="form-input" 
                           placeholder="مثال: روغن مصنوعی XYZ" autocomplete="off">
                </div>
            </div>
            <div class="action-bar">
                <button id="back-btn-4-1a" class="btn btn-secondary">
                    <svg class="btn-arrow-back" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M9 18l6-6-6-6"/>
                    </svg>
                    ${btnBack}
                </button>
                <button id="next-btn-4-1a" class="btn btn-primary" disabled>
                    ${btnContinue}
                    <svg class="btn-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M9 18l6-6-6-6"/>
                    </svg>
                </button>
            </div>
        </div>
    `;
    const nameInput = document.getElementById('new-lubricant-name');
    const nextBtn = document.getElementById('next-btn-4-1a');
    const backBtn = document.getElementById('back-btn-4-1a');
    nameInput.addEventListener('input', () => {
        nextBtn.disabled = nameInput.value.trim() === '';
    });
    nextBtn.addEventListener('click', () => {
        const newName = nameInput.value.trim();
        if (newName) {
            appState.setAnswer('4-1-lubricant-code', 'custom');
            appState.setAnswer('4-1-lubricant-name', newName);
            appState.setAnswer('4-1-custom', true);
            window.dispatchEvent(new CustomEvent('navigate', { 
                detail: { question: '4-2' } 
            }));
        }
    });
    backBtn.addEventListener('click', () => {
        window.dispatchEvent(new CustomEvent('navigate', { 
            detail: { question: '4-1' } 
        }));
    });
}