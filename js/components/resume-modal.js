import appState from '../state.js';
export function showResumeModal() {
    const savedData = localStorage.getItem('wearFailureExpertSystem');
    if (!savedData) {
        return { action: 'new' };
    }
    try {
        const parsed = JSON.parse(savedData);
        const savedTime = new Date(parsed.timestamp);
        const now = new Date();
        const hoursDiff = (now - savedTime) / (1000 * 60 * 60);
        if (!parsed.currentQuestion || hoursDiff > 24) {
            return { action: 'new' };
        }
        return new Promise((resolve) => {
            showModalUI(parsed, resolve);
        });
    } catch (error) {
        console.error('Error parsing saved data:', error);
        return { action: 'new' };
    }
}
function showModalUI(savedData, resolve) {
    const t = (key, params = {}) => appState.t(key, params);
    const questionTitles = {
        '1-1': t('step1.question1_1.title'),
        '1-2-1': t('step1.question1_2_1.title'),
        '1-2-1a': t('step1.question1_2_1a.title'),
        '1-2-1b': t('step1.question1_2_1b.title'),
        '1-2-2': t('step1.question1_2_2.title'),
        '1-2-3': t('step1.question1_2_3.title'),
        '1-2-4': t('step1.question1_2_4.title'),
        '1-3-1': t('step1.question1_3_1.title'),
        '1-3-1a': t('step1.question1_3_1a.title'),
        '1-3-1b': t('step1.question1_3_1b.title'),
        '1-3-2a': t('step1.question1_3_2a.title'),
        '1-3-2b': t('step1.question1_3_2b.title'),
        '1-3-3': t('step1.question1_3_3.title'),
        '1-3-4': t('step1.question1_3_4.title'),
        '1-3-5': t('step1.question1_3_5.title'),
        '1-4-1': t('step1.question1_4_1.title'),
        '1-4-2': t('step1.question1_4_2.title'),
        '1-4-3': t('step1.question1_4_3.title'),
        '2-1': t('step2.question2_1.title'),
        '2-2': t('step2.question2_2.title'),
        '2-3': t('step2.question2_3.title'),
        '2-5': t('step2.question2_5.title'),
        '2-6': t('step2.question2_6.title'),
        '2-8': t('step2.question2_8.title'),
        '2-9': t('step2.question2_9.title'),
        '2-13': t('step2.question2_13.title'),
        '2-14': t('step2.question2_14.title'),
        '2-15': t('step2.question2_15.title'),
        '2-16': t('step2.question2_16.title'),
        '2-geometry': t('step2.question2_geometry.title'),
        '3-0': t('step3.question3_0.title'),
        '3-1': t('step3.question3_1.title'),
        '3-2': t('step3.question3_2.title'),
        '3-4': t('step3.question3_4.title'),
        '3-5': t('step3.question3_5.title'),
        '3-6': t('step3.question3_6.title'),
        '3-7': t('step3.question3_7.title'),
        '3-8': t('step3.question3_8.title'),
        '3-9': t('step3.question3_9.title'),
        '3-10': t('step3.question3_10.title'),
        '3-11': t('step3.question3_11.title'),
        '3-12': t('step3.question3_12.title'),
        '3-13': t('step3.question3_13.title'),
        '4-1': t('step4.question4_1.title'),
        '4-2': t('step4.question4_2.title'),
        '4-3': t('step4.question4_3.title'),
        '4-4': t('step4.question4_4.title'),
        '4-5': t('step4.question4_5.title'),
        '4-6': t('step4.question4_6.title'),
        '4-7': t('step4.question4_7.title'),
        '4-8': t('step4.question4_8.title'),
        '4-9': t('step4.question4_9.title'),
        '4-10': t('step4.question4_10.title'),
        '4-11': t('step4.question4_11.title'),
        '4-12': t('step4.question4_12.title'),
        '4-13': t('step4.question4_13.title'),
        '4-14': t('step4.question4_14.title'),
        '4-15': t('step4.question4_15.title'),
        '4-16': t('step4.question4_16.title'),
        '4-17': t('step4.question4_17.title'),
        '4-18': t('step4.question4_18.title'),
        '4-19': t('step4.question4_19.title'),
        '4-20': t('step4.question4_20.title'),
    };
    const currentQuestionTitle = questionTitles[savedData.currentQuestion] || savedData.currentQuestion || t('common.unknown');
    const totalAnswered = Object.keys(savedData.answers || {}).length;
    const savedDate = new Date(savedData.timestamp);
    const timeAgo = getTimeAgo(savedDate, t);
    const modalHTML = `
        <div class="modal-overlay" id="resume-modal">
            <div class="modal-container">
                <div class="modal-header">
                    <div class="modal-icon">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="12" cy="12" r="10"/>
                            <polyline points="12 6 12 12 16 14"/>
                        </svg>
                    </div>
                    <h2>${t('modal.title')}</h2>
                </div>
                <div class="modal-body">
                    <p class="modal-description">
                        ${t('modal.description')}
                    </p>
                    <div class="saved-info">
                        <div class="saved-info-item">
                            <span class="saved-info-label">${t('modal.lastStatus')}:</span>
                            <span class="saved-info-value">${currentQuestionTitle}</span>
                        </div>
                        <div class="saved-info-item">
                            <span class="saved-info-label">${t('modal.questionsAnswered')}:</span>
                            <span class="saved-info-value">${totalAnswered} ${t('modal.questionsUnit')}</span>
                        </div>
                        <div class="saved-info-item">
                            <span class="saved-info-label">${t('modal.savedAt')}:</span>
                            <span class="saved-info-value">${timeAgo}</span>
                        </div>
                        ${savedData.flags && savedData.flags.PRIORITY ? `
                            <div class="saved-info-item">
                                <span class="saved-info-label">${t('modal.priority')}:</span>
                                <span class="saved-info-value priority-badge priority-${savedData.flags.PRIORITY.toLowerCase()}">
                                    ${getPriorityLabel(savedData.flags.PRIORITY, t)}
                                </span>
                            </div>
                        ` : ''}
                    </div>
                </div>
                <div class="modal-actions">
                    <button class="btn btn-secondary" id="btn-start-new">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M12 5v14M5 12h14"/>
                        </svg>
                        ${t('modal.btnNew')}
                    </button>
                    <button class="btn btn-primary btn-large" id="btn-resume">
                        ${t('modal.btnResume')}
                        <svg class="btn-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M9 18l6-6-6-6"/>
                        </svg>
                    </button>
                </div>
                <div class="modal-footer">
                    <button class="btn-text" id="btn-review-answers">
                        ${t('modal.btnReview')}
                    </button>
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    addModalStyles();
    const modal = document.getElementById('resume-modal');
    document.getElementById('btn-start-new')?.addEventListener('click', () => {
        closeModal();
        resolve({ action: 'new' });
    });
    document.getElementById('btn-resume')?.addEventListener('click', () => {
        closeModal();
        resolve({ 
            action: 'resume', 
            question: savedData.currentQuestion,
            data: savedData 
        });
    });
    document.getElementById('btn-review-answers')?.addEventListener('click', () => {
        closeModal();
        resolve({ 
            action: 'review',
            data: savedData 
        });
    });
}
function closeModal() {
    const modal = document.getElementById('resume-modal');
    if (modal) {
        modal.classList.add('closing');
        setTimeout(() => {
            modal.remove();
        }, 300);
    }
}
function getTimeAgo(date, t) {
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    if (diffMins < 1) return t('modal.timeJustNow');
    if (diffMins < 60) return t('modal.timeMinutesAgo', { minutes: diffMins });
    if (diffHours < 24) return t('modal.timeHoursAgo', { hours: diffHours });
    if (diffDays < 7) return t('modal.timeDaysAgo', { days: diffDays });
    return date.toLocaleDateString(appState.language === 'fa' ? 'fa-IR' : 'en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}
function getPriorityLabel(priority, t) {
    const priorityMap = {
        'CRITICAL': { icon: '🔴', text: t('summary.priorityCritical') },
        'URGENT': { icon: '🟠', text: t('summary.priorityUrgent') },
        'HIGH': { icon: '🟡', text: t('summary.priorityHigh') },
        'STANDARD': { icon: '🔵', text: t('summary.priorityStandard') }
    };
    const p = priorityMap[priority] || { icon: '⚪', text: priority };
    return `${p.icon} ${p.text}`;
}
function addModalStyles() {
    if (document.getElementById('modal-styles')) return;
    const styles = `
        <style id="modal-styles">
            .modal-overlay {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.6);
                backdrop-filter: blur(4px);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 1000;
                animation: modalFadeIn 0.3s ease;
            }
            .modal-overlay.closing {
                animation: modalFadeOut 0.3s ease forwards;
            }
            @keyframes modalFadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            @keyframes modalFadeOut {
                from { opacity: 1; }
                to { opacity: 0; }
            }
            .modal-container {
                background: var(--white);
                border-radius: var(--radius-lg);
                padding: 32px;
                max-width: 520px;
                width: 90%;
                box-shadow: var(--shadow-lg);
                animation: modalSlideIn 0.3s ease;
            }
            @keyframes modalSlideIn {
                from { 
                    opacity: 0; 
                    transform: translateY(20px) scale(0.95); 
                }
                to { 
                    opacity: 1; 
                    transform: translateY(0) scale(1); 
                }
            }
            .modal-header {
                display: flex;
                align-items: center;
                gap: 12px;
                margin-bottom: 20px;
                padding-bottom: 16px;
                border-bottom: 1px solid var(--border-light);
            }
            .modal-icon {
                width: 48px;
                height: 48px;
                border-radius: 50%;
                background: #E3F2FD;
                color: var(--blue-standard);
                display: flex;
                align-items: center;
                justify-content: center;
                flex-shrink: 0;
            }
            .modal-header h2 {
                font-size: 1.2rem;
                font-weight: 700;
                color: var(--text-primary);
            }
            .modal-body {
                margin-bottom: 24px;
            }
            .modal-description {
                color: var(--text-secondary);
                font-size: 0.95rem;
                margin-bottom: 16px;
                line-height: 1.6;
            }
            .saved-info {
                background: var(--bg-main);
                border-radius: var(--radius-md);
                padding: 16px;
                display: flex;
                flex-direction: column;
                gap: 10px;
            }
            .saved-info-item {
                display: flex;
                justify-content: space-between;
                align-items: center;
                font-size: 0.9rem;
            }
            .saved-info-label {
                color: var(--text-secondary);
                font-weight: 500;
            }
            .saved-info-value {
                color: var(--text-primary);
                font-weight: 600;
            }
            .priority-badge {
                padding: 2px 10px;
                border-radius: 12px;
                font-size: 0.8rem;
                font-weight: 600;
            }
            .priority-critical {
                background: #FFEBEE;
                color: var(--red-critical);
            }
            .priority-urgent {
                background: #FFF3E0;
                color: var(--orange-warning);
            }
            .priority-high {
                background: #FFFDE7;
                color: #F57F17;
            }
            .priority-standard {
                background: #E3F2FD;
                color: var(--blue-standard);
            }
            .modal-actions {
                display: flex;
                gap: 12px;
                flex-wrap: wrap;
            }
            .modal-actions .btn {
                flex: 1;
                min-width: 150px;
                justify-content: center;
            }
            .modal-footer {
                margin-top: 16px;
                padding-top: 16px;
                border-top: 1px solid var(--border-light);
                text-align: center;
            }
            .btn-text {
                background: none;
                border: none;
                color: var(--blue-standard);
                cursor: pointer;
                font-family: var(--font-fa);
                font-size: 0.9rem;
                font-weight: 500;
                text-decoration: underline;
                transition: var(--transition);
            }
            .btn-text:hover {
                color: #0D47A1;
            }
            @media (max-width: 600px) {
                .modal-container {
                    padding: 24px 20px;
                    margin: 16px;
                }
                .modal-actions {
                    flex-direction: column;
                }
                .modal-actions .btn {
                    width: 100%;
                }
            }
        </style>
    `;
    document.head.insertAdjacentHTML('beforeend', styles);
}