import appState from '../../state.js';
import Calculations from '../../calculations.js';
export function renderReport1(container) {
    const t = (key, params = {}) => appState.t(key, params);
    const summary = Calculations.generateStep1Summary();
    const route = appState.getAnswer('1-1');
    const routeNames = {
        '1': t('summary.routeDesign'),
        '2': t('summary.routeTroubleshooting'),
        '3': t('summary.routeMonitoring')
    };
    const routeIcons = { '1': '✏️', '2': '🔧', '3': '📊' };
    const routeColors = { '1': '#1565C0', '2': '#EF6C00', '3': '#2E7D32' };
    const priority = appState.getFlag('PRIORITY');
    const priorityLabels = {
        'CRITICAL': { text: t('summary.priorityCritical'), color: '#C62828', bg: '#FFEBEE', icon: '🔴' },
        'URGENT': { text: t('summary.priorityUrgent'), color: '#EF6C00', bg: '#FFF3E0', icon: '🟠' },
        'HIGH': { text: t('summary.priorityHigh'), color: '#F57F17', bg: '#FFFDE7', icon: '🟡' },
        'STANDARD': { text: t('summary.priorityStandard'), color: '#1565C0', bg: '#E3F2FD', icon: '🔵' }
    };
    const now = new Date();
    const dateStr = now.toLocaleDateString(appState.language === 'fa' ? 'fa-IR' : 'en-US', {
        year: 'numeric', month: 'long', day: 'numeric',
        hour: '2-digit', minute: '2-digit'
    });
    const answeredCount = appState.getAnsweredCount();
    container.innerHTML = `
        <div class="report-container" id="report1-printable">
            <!-- HEADER -->
            <div style="text-align: center; margin-bottom: 32px; padding-bottom: 24px; border-bottom: 2px solid var(--border-light);">
                <div style="font-size: 2rem; margin-bottom: 8px;">📋</div>
                <h1 style="font-size: 1.6rem; color: var(--primary-navy); margin-bottom: 4px;">
                    ${t('summary.title')}
                </h1>
                <p class="report-subtitle" style="color: ${routeColors[route] || '#666'}; font-size: 1.1rem;">
                    ${routeIcons[route] || '📌'} ${routeNames[route] || t('common.unknown')}
                </p>
                <div class="report-meta" style="justify-content: center; gap: 24px;">
                    <span>📅 ${dateStr}</span>
                    <span>❓ ${answeredCount} ${t('modal.questionsUnit')}</span>
                    <span>🏷️ v1.0.0</span>
                </div>
            </div>
            <!-- PRIORITY BANNER -->
            ${priority && priorityLabels[priority] ? `
                <div style="
                    background: ${priorityLabels[priority].bg};
                    border-right: 4px solid ${priorityLabels[priority].color};
                    padding: 16px 20px;
                    border-radius: var(--radius-md);
                    margin-bottom: 24px;
                    display: flex;
                    align-items: center;
                    gap: 12px;
                ">
                    <span style="font-size: 1.5rem;">${priorityLabels[priority].icon}</span>
                    <div>
                        <strong style="color: ${priorityLabels[priority].color}; font-size: 1rem;">
                            ${t('summary.priorityLevel')}: ${priorityLabels[priority].text}
                        </strong>
                    </div>
                </div>
            ` : ''}
            <!-- ROUTE INFO -->
            <div class="report-section">
                <h3>🗺️ ${t('summary.routeInfo')}</h3>
                <table class="report-table">
                    <tbody>
                        <tr><td style="width: 40%;"><strong>${t('summary.route')}</strong></td><td>${routeIcons[route] || ''} ${routeNames[route] || '—'}</td></tr>
                        <tr><td><strong>${t('summary.analysisMode')}</strong></td><td>${summary.analysisMode === 'CONSERVATIVE' ? `🛡️ ${t('summary.conservative')}` : `📐 ${t('summary.standard')}`}</td></tr>
                    </tbody>
                </table>
            </div>
            <!-- CONTACT DETAILS -->
            ${renderContactSection()}
            <!-- ACTIVE FLAGS -->
            ${renderFlagsSection()}
            <!-- FOOTER -->
            <div style="text-align: center; margin-top: 32px; padding-top: 20px; border-top: 1px solid var(--border-light); color: var(--text-secondary); font-size: 0.85rem;">
                <p>${t('app.title')} © 2026</p>
                <p style="margin-top: 4px;">Report generated: ${dateStr}</p>
            </div>
        </div>
        <!-- ACTION BUTTONS -->
        <div class="report-action no-print" style="margin-top: 24px;">
            <button id="btn-back-to-questions" class="btn btn-secondary">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M9 18l6-6-6-6"/>
                </svg>
                ${t('common.btnBack')}
            </button>
            <button id="btn-print-report" class="btn btn-secondary">
                🖨️ Print
            </button>
            <button id="btn-restart-analysis" class="btn btn-secondary">
                ${t('summary.btnRestart')}
            </button>
            <button id="btn-continue-step2" class="btn btn-primary btn-large">
                ${t('summary.btnNext')}
                <svg class="btn-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M9 18l6-6-6-6"/>
                </svg>
            </button>
        </div>
    `;
    document.getElementById('btn-print-report')?.addEventListener('click', () => {
        window.print();
    });
    document.getElementById('btn-restart-analysis')?.addEventListener('click', () => {
        appState.resetAll(true);
        window.dispatchEvent(new CustomEvent('navigate', { detail: { question: '1-1' } }));
    });
    document.getElementById('btn-continue-step2')?.addEventListener('click', () => {
        appState.currentStep = 2;
        appState.saveToLocalStorage();
        window.dispatchEvent(new CustomEvent('navigate', { 
            detail: { question: '2-1' } 
        }));
    });
    document.getElementById('btn-back-to-questions')?.addEventListener('click', () => {
        if (appState.currentQuestion) {
            window.dispatchEvent(new CustomEvent('navigate', { 
                detail: { question: appState.currentQuestion } 
            }));
        } else {
            window.dispatchEvent(new CustomEvent('navigate', { 
                detail: { question: '1-1' } 
            }));
        }
    });
    function renderContactSection() {
        const contactAnswer = appState.getAnswer('1-2-1') || appState.getAnswer('1-3-1');
        if (!contactAnswer) return '';
        let contactName = '';
        const idx = parseInt(contactAnswer) - 1;
        if (idx >= 0 && idx < 14) {
            contactName = t(`step1.question1_2_1.options.${idx}.title`);
        }
        const motionAnswer = appState.getAnswer('1-2-2');
        const motionText = motionAnswer ? t(`step1.question1_2_2.options.${parseInt(motionAnswer) - 1}`) : '';
        return `
            <div class="report-section">
                <h3>🔗 Contact Details</h3>
                <table class="report-table">
                    <tbody>
                        <tr><td style="width: 40%;"><strong>Contact Type</strong></td><td>${contactName || '—'}</td></tr>
                        ${motionText ? `<tr><td><strong>Motion Type</strong></td><td>${motionText}</td></tr>` : ''}
                    </tbody>
                </table>
            </div>
        `;
    }
    function renderFlagsSection() {
        const displayFlags = appState.getDisplayFlags();
        if (displayFlags.length === 0) return '';
        return `
            <div class="report-section">
                <h3>🚩 ${t('app.activeFlags')}</h3>
                <ul class="report-flags-list">
                    ${displayFlags.map(flag => `
                        <li class="${flag.type === 'flag-warning' ? 'flag-warning' : ''}">
                            ${appState.tFlag(flag.key)}
                        </li>
                    `).join('')}
                </ul>
            </div>
        `;
    }
}