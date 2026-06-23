import { renderReport1 } from './js/components/reports/report1.js';
import { renderReport2 } from './js/components/reports/report2.js';
import { renderReport3 } from './js/components/reports/report3.js';
import { renderReport4 } from './js/components/reports/report4.js';
import appState from './js/state.js';
import router from './js/router.js';
import Calculations from './js/calculations.js';
import { showResumeModal } from './js/components/resume-modal.js';
import { renderQuestion1_1 } from './js/components/step1/question1-1.js';
import { renderQuestion1_2_1 } from './js/components/step1/question1-2-1.js';
import { renderQuestion1_2_1a } from './js/components/step1/question1-2-1a.js';
import { renderQuestion1_2_1b } from './js/components/step1/question1-2-1b.js';
import { renderQuestion1_2_2 } from './js/components/step1/question1-2-2.js';
import { renderQuestion1_2_3 } from './js/components/step1/question1-2-3.js';
import { renderQuestion1_2_4 } from './js/components/step1/question1-2-4.js';
import { renderQuestion1_3_1 } from './js/components/step1/question1-3-1.js';
import { renderQuestion1_3_1a } from './js/components/step1/question1-3-1a.js';
import { renderQuestion1_3_1b } from './js/components/step1/question1-3-1b.js';
import { renderQuestion1_3_2a } from './js/components/step1/question1-3-2a.js';
import { renderQuestion1_3_2b } from './js/components/step1/question1-3-2b.js';
import { renderQuestion1_3_3 } from './js/components/step1/question1-3-3.js';
import { renderQuestion1_3_4 } from './js/components/step1/question1-3-4.js';
import { renderQuestion1_3_5 } from './js/components/step1/question1-3-5.js';
import { renderQuestion1_4_1 } from './js/components/step1/question1-4-1.js';
import { renderQuestion1_4_2 } from './js/components/step1/question1-4-2.js';
import { renderQuestion1_4_3 } from './js/components/step1/question1-4-3.js';
import { renderQuestion2_1 } from './js/components/step2/question2-1.js';
import { renderQuestion2_1a } from './js/components/step2/question2-1a.js';
import { renderQuestion2_1b } from './js/components/step2/question2-1b.js';
import { renderQuestion2_2 } from './js/components/step2/question2-2.js';
import { renderQuestion2_2a } from './js/components/step2/question2-2a.js';
import { renderQuestion2_3 } from './js/components/step2/question2-3.js';
import { renderQuestion2_5 } from './js/components/step2/question2-5.js';
import { renderQuestion2_5a } from './js/components/step2/question2-5a.js';
import { renderQuestion2_6 } from './js/components/step2/question2-6.js';
import { renderQuestion2_8 } from './js/components/step2/question2-8.js';
import { renderQuestion2_8_detail } from './js/components/step2/question2-8-detail.js';
import { renderQuestion2_8a } from './js/components/step2/question2-8a.js';
import { renderQuestion2_8b } from './js/components/step2/question2-8b.js';
import { renderQuestion2_8c } from './js/components/step2/question2-8c.js';
import { renderQuestion2_9 } from './js/components/step2/question2-9.js';
import { renderQuestion2_13 } from './js/components/step2/question2-13.js';
import { renderQuestion2_13a } from './js/components/step2/question2-13a.js';
import { renderQuestion2_13b } from './js/components/step2/question2-13b.js';
import { renderQuestion2_13c } from './js/components/step2/question2-13c.js';
import { renderQuestion2_13d } from './js/components/step2/question2-13d.js';
import { renderQuestion2_13e } from './js/components/step2/question2-13e.js';
import { renderQuestion2_13f } from './js/components/step2/question2-13f.js';
import { renderQuestion2_13g } from './js/components/step2/question2-13g.js';
import { renderQuestion2_13h } from './js/components/step2/question2-13h.js';
import { renderQuestion2_13i } from './js/components/step2/question2-13i.js';
import { renderQuestion2_14 } from './js/components/step2/question2-14.js';
import { renderQuestion2_15 } from './js/components/step2/question2-15.js';
import { renderQuestion2_16 } from './js/components/step2/question2-16.js';
import { renderQuestion2_16a } from './js/components/step2/question2-16a.js';
import { renderQuestion2_geometry } from './js/components/step2/question2-geometry.js';
import { renderQuestion3_0 } from './js/components/step3/question3-0.js';
import { renderQuestion3_1 } from './js/components/step3/question3-1.js';
import { renderQuestion3_2 } from './js/components/step3/question3-2.js';
import { renderQuestion3_4 } from './js/components/step3/question3-4.js';
import { renderQuestion3_5 } from './js/components/step3/question3-5.js';
import { renderQuestion3_6 } from './js/components/step3/question3-6.js';
import { renderQuestion3_7 } from './js/components/step3/question3-7.js';
import { renderQuestion3_7a } from './js/components/step3/question3-7a.js';
import { renderQuestion3_7b } from './js/components/step3/question3-7b.js';
import { renderQuestion3_8 } from './js/components/step3/question3-8.js';
import { renderQuestion3_8_design } from './js/components/step3/question3-8-design.js';
import { renderQuestion3_9 } from './js/components/step3/question3-9.js';
import { renderQuestion3_10 } from './js/components/step3/question3-10.js';
import { renderQuestion3_11 } from './js/components/step3/question3-11.js';
import { renderQuestion3_12 } from './js/components/step3/question3-12.js';
import { renderQuestion3_13 } from './js/components/step3/question3-13.js';
import { renderQuestion4_1 } from './js/components/step4/question4-1.js';
import { renderQuestion4_1a } from './js/components/step4/question4-1a.js';
import { renderQuestion4_2 } from './js/components/step4/question4-2.js';
import { renderQuestion4_2_estimated } from './js/components/step4/question4-2-estimated.js';
import { renderQuestion4_2_precise } from './js/components/step4/question4-2-precise.js';
import { renderQuestion4_3 } from './js/components/step4/question4-3.js';
import { renderQuestion4_3_gas } from './js/components/step4/question4-3-gas.js';
import { renderQuestion4_3_solid } from './js/components/step4/question4-3-solid.js';
import { renderQuestion4_4 } from './js/components/step4/question4-4.js';
import { renderQuestion4_5 } from './js/components/step4/question4-5.js';
import { renderQuestion4_6 } from './js/components/step4/question4-6.js';
import { renderQuestion4_6_results } from './js/components/step4/question4-6-results.js';
import { renderQuestion4_7 } from './js/components/step4/question4-7.js';
import { renderQuestion4_8 } from './js/components/step4/question4-8.js';
import { renderQuestion4_9 } from './js/components/step4/question4-9.js';
import { renderQuestion4_10 } from './js/components/step4/question4-10.js';
import { renderQuestion4_11 } from './js/components/step4/question4-11.js';
import { renderQuestion4_12 } from './js/components/step4/question4-12.js';
import { renderQuestion4_13 } from './js/components/step4/question4-13.js';
import { renderQuestion4_14 } from './js/components/step4/question4-14.js';
import { renderQuestion4_15 } from './js/components/step4/question4-15.js';
import { renderQuestion4_16 } from './js/components/step4/question4-16.js';
import { renderQuestion4_17 } from './js/components/step4/question4-17.js';
import { renderQuestion4_18 } from './js/components/step4/question4-18.js';
import { renderQuestion4_19 } from './js/components/step4/question4-19.js';
import { renderQuestion4_20 } from './js/components/step4/question4-20.js';

const questionRenderers = {
    '1-1': { render: renderQuestion1_1, step: 1 },
    '1-2-1': { render: renderQuestion1_2_1, step: 1 },
    '1-2-1a': { render: renderQuestion1_2_1a, step: 1 },
    '1-2-1b': { render: renderQuestion1_2_1b, step: 1 },
    '1-2-2': { render: renderQuestion1_2_2, step: 1 },
    '1-2-3': { render: renderQuestion1_2_3, step: 1 },
    '1-2-4': { render: renderQuestion1_2_4, step: 1 },
    '1-3-1': { render: renderQuestion1_3_1, step: 1 },
    '1-3-1a': { render: renderQuestion1_3_1a, step: 1 },
    '1-3-1b': { render: renderQuestion1_3_1b, step: 1 },
    '1-3-2a': { render: renderQuestion1_3_2a, step: 1 },
    '1-3-2b': { render: renderQuestion1_3_2b, step: 1 },
    '1-3-3': { render: renderQuestion1_3_3, step: 1 },
    '1-3-4': { render: renderQuestion1_3_4, step: 1 },
    '1-3-5': { render: renderQuestion1_3_5, step: 1 },
    '1-4-1': { render: renderQuestion1_4_1, step: 1 },
    '1-4-2': { render: renderQuestion1_4_2, step: 1 },
    '1-4-3': { render: renderQuestion1_4_3, step: 1 },
    '2-1': { render: renderQuestion2_1, step: 2 },
    '2-1a': { render: renderQuestion2_1a, step: 2 },
    '2-1b': { render: renderQuestion2_1b, step: 2 },
    '2-2': { render: renderQuestion2_2, step: 2 },
    '2-2a': { render: renderQuestion2_2a, step: 2 },
    '2-3': { render: renderQuestion2_3, step: 2 },
    '2-5': { render: renderQuestion2_5, step: 2 },
    '2-5a': { render: renderQuestion2_5a, step: 2 },
    '2-6': { render: renderQuestion2_6, step: 2 },
    '2-8': { render: renderQuestion2_8, step: 2 },
    '2-8-detail': { render: renderQuestion2_8_detail, step: 2 },
    '2-8a': { render: renderQuestion2_8a, step: 2 },
    '2-8b': { render: renderQuestion2_8b, step: 2 },
    '2-8c': { render: renderQuestion2_8c, step: 2 },
    '2-9': { render: renderQuestion2_9, step: 2 },
    '2-13': { render: renderQuestion2_13, step: 2 },
    '2-13a': { render: renderQuestion2_13a, step: 2 },
    '2-13b': { render: renderQuestion2_13b, step: 2 },
    '2-13c': { render: renderQuestion2_13c, step: 2 },
    '2-13d': { render: renderQuestion2_13d, step: 2 },
    '2-13e': { render: renderQuestion2_13e, step: 2 },
    '2-13f': { render: renderQuestion2_13f, step: 2 },
    '2-13g': { render: renderQuestion2_13g, step: 2 },
    '2-13h': { render: renderQuestion2_13h, step: 2 },
    '2-13i': { render: renderQuestion2_13i, step: 2 },
    '2-14': { render: renderQuestion2_14, step: 2 },
    '2-15': { render: renderQuestion2_15, step: 2 },
    '2-16': { render: renderQuestion2_16, step: 2 },
    '2-16a': { render: renderQuestion2_16a, step: 2 },
    '2-geometry': { render: renderQuestion2_geometry, step: 2 },
    '3-0': { render: renderQuestion3_0, step: 3 },
    '3-1': { render: renderQuestion3_1, step: 3 },
    '3-2': { render: renderQuestion3_2, step: 3 },
    '3-4': { render: renderQuestion3_4, step: 3 },
    '3-5': { render: renderQuestion3_5, step: 3 },
    '3-6': { render: renderQuestion3_6, step: 3 },
    '3-7': { render: renderQuestion3_7, step: 3 },
    '3-7a': { render: renderQuestion3_7a, step: 3 },
    '3-7b': { render: renderQuestion3_7b, step: 3 },
    '3-8': { render: renderQuestion3_8, step: 3 },
    '3-8-design': { render: renderQuestion3_8_design, step: 3 },
    '3-9': { render: renderQuestion3_9, step: 3 },
    '3-10': { render: renderQuestion3_10, step: 3 },
    '3-11': { render: renderQuestion3_11, step: 3 },
    '3-12': { render: renderQuestion3_12, step: 3 },
    '3-13': { render: renderQuestion3_13, step: 3 },
    '4-1': { render: renderQuestion4_1, step: 4 },
    '4-1a': { render: renderQuestion4_1a, step: 4 },
    '4-2': { render: renderQuestion4_2, step: 4 },
    '4-2-estimated': { render: renderQuestion4_2_estimated, step: 4 },
    '4-2-precise': { render: renderQuestion4_2_precise, step: 4 },
    '4-3': { render: renderQuestion4_3, step: 4 },
    '4-3-gas': { render: renderQuestion4_3_gas, step: 4 },
    '4-3-solid': { render: renderQuestion4_3_solid, step: 4 },
    '4-4': { render: renderQuestion4_4, step: 4 },
    '4-5': { render: renderQuestion4_5, step: 4 },
    '4-6': { render: renderQuestion4_6, step: 4 },
    '4-6-results': { render: renderQuestion4_6_results, step: 4 },
    '4-7': { render: renderQuestion4_7, step: 4 },
    '4-8': { render: renderQuestion4_8, step: 4 },
    '4-9': { render: renderQuestion4_9, step: 4 },
    '4-10': { render: renderQuestion4_10, step: 4 },
    '4-11': { render: renderQuestion4_11, step: 4 },
    '4-12': { render: renderQuestion4_12, step: 4 },
    '4-13': { render: renderQuestion4_13, step: 4 },
    '4-14': { render: renderQuestion4_14, step: 4 },
    '4-15': { render: renderQuestion4_15, step: 4 },
    '4-16': { render: renderQuestion4_16, step: 4 },
    '4-17': { render: renderQuestion4_17, step: 4 },
    '4-18': { render: renderQuestion4_18, step: 4 },
    '4-19': { render: renderQuestion4_19, step: 4 },
    '4-20': { render: renderQuestion4_20, step: 4 },
    'report1': { render: renderReport1, step: 1 },
    'report2': { render: renderReport2, step: 2 },
    'report3': { render: renderReport3, step: 3 },
    'report4': { render: renderReport4, step: 4 },
};

class App {
    constructor() {
        this.contentContainer = document.getElementById('app-container');
        this.sidebarSteps = document.getElementById('steps-container');
        this.flagsContainer = document.getElementById('flags-container');
        this.headerBadge = document.getElementById('header-step-badge');
        this.languageSelect = document.getElementById('language-select');
        this.loadingIndicator = document.getElementById('loading-indicator');
        this.headerResetBtn = document.getElementById('btn-header-reset');
        this.init();
    }

    async init() {
        await this.setupLanguage();
        this.setupEventListeners();
        this.updateI18nElements();
        this.updateI18nAttributes();
        this.updateSidebar();
        this.updateFlags();
        this.hideLoading();
        await this.checkResume();
        this.setupStepClickHandlers();
    }

    setupStepClickHandlers() {
        if (!this.sidebarSteps) return;
        this.sidebarSteps.querySelectorAll('.step').forEach(stepEl => {
            stepEl.addEventListener('click', (e) => {
                e.stopPropagation();
                const stepNum = parseInt(stepEl.dataset.step);
                if (isNaN(stepNum)) return;
                if (stepNum === appState.currentStep) return;

                const isEnglish = appState.language === 'en';

                if (stepNum === 1) {
                    const confirmMsg = isEnglish ? 'Going to Step 1 will delete all saved answers. Continue?' : 'با رفتن به گام ۱، تمام پاسخ‌های ذخیره شده از بین می‌روند. ادامه می‌دهید؟';
                    if (confirm(confirmMsg)) {
                        appState.resetAll(true);
                        this.updateSidebar();
                        this.updateFlags();
                        this.renderQuestion('1-1');
                    }
                    return;
                }

                if (stepNum === 2 && appState.currentStep < 2) {
                    const alertMsg = isEnglish ? 'Please complete Step 1 first.' : 'لطفاً ابتدا گام ۱ را کامل کنید.';
                    alert(alertMsg);
                    return;
                }

                if (stepNum === 3 && appState.currentStep < 3) {
                    const alertMsg = isEnglish ? 'Please complete Step 2 first.' : 'لطفاً ابتدا گام ۲ را کامل کنید.';
                    alert(alertMsg);
                    return;
                }

                if (stepNum === 4 && appState.currentStep < 4) {
                    const alertMsg = isEnglish ? 'Please complete Step 3 first.' : 'لطفاً ابتدا گام ۳ را کامل کنید.';
                    alert(alertMsg);
                    return;
                }

                if (stepNum === 2 && appState.currentStep > 2) {
                    const confirmMsg = isEnglish ? 'Going back to Step 2 may affect some data in later steps. Continue?' : 'بازگشت به گام ۲ ممکن است برخی داده‌های گام‌های بعدی را تحت تأثیر قرار دهد. ادامه می‌دهید؟';
                    if (confirm(confirmMsg)) {
                        appState.currentStep = 2;
                        this.renderQuestion('report2');
                    }
                    return;
                }

                if (stepNum === 3 && appState.currentStep > 3) {
                    const confirmMsg = isEnglish ? 'Going back to Step 3 may affect some data in later steps. Continue?' : 'بازگشت به گام ۳ ممکن است برخی داده‌های گام بعدی را تحت تأثیر قرار دهد. ادامه می‌دهید؟';
                    if (confirm(confirmMsg)) {
                        appState.currentStep = 3;
                        this.renderQuestion('report3');
                    }
                    return;
                }

                if (stepNum === 4 && appState.currentStep > 4) {
                    appState.currentStep = 4;
                    this.renderQuestion('report4');
                    return;
                }

                if (stepNum === 2 && appState.currentStep === 1) {
                    const confirmMsg = isEnglish ? 'To go to Step 2, Step 1 must be completed. Start Step 1 now?' : 'برای رفتن به گام ۲ باید گام ۱ کامل شود. اکنون گام ۱ شروع می‌شود.';
                    if (confirm(confirmMsg)) {
                        this.renderQuestion('1-1');
                    }
                    return;
                }

                if (stepNum === 3 && appState.currentStep === 2) {
                    const confirmMsg = isEnglish ? 'To go to Step 3, Step 2 must be completed. Start Step 2 now?' : 'برای رفتن به گام ۳ باید گام ۲ کامل شود. اکنون گام ۲ شروع می‌شود.';
                    if (confirm(confirmMsg)) {
                        this.renderQuestion('2-1');
                    }
                    return;
                }

                if (stepNum === 4 && appState.currentStep === 3) {
                    const confirmMsg = isEnglish ? 'To go to Step 4, Step 3 must be completed. Start Step 3 now?' : 'برای رفتن به گام ۴ باید گام ۳ کامل شود. اکنون گام ۳ شروع می‌شود.';
                    if (confirm(confirmMsg)) {
                        this.renderQuestion('3-0');
                    }
                    return;
                }
            });
        });
    }

    updateI18nElements() {
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            const paramsAttr = element.getAttribute('data-i18n-params');
            let params = {};
            if (paramsAttr) {
                try { params = JSON.parse(paramsAttr); } catch (e) {}
            }
            const translation = appState.t(key, params);
            if (translation && typeof translation === 'string') {
                element.textContent = translation;
            }
        });
    }

    updateI18nAttributes() {
        document.querySelectorAll('[data-i18n-title]').forEach(el => {
            el.title = appState.t(el.getAttribute('data-i18n-title'));
        });
        document.querySelectorAll('[data-i18n-aria]').forEach(el => {
            el.setAttribute('aria-label', appState.t(el.getAttribute('data-i18n-aria')));
        });
    }

    async updateUILanguage() {
        const content = document.getElementById('app-container');
        if (content) content.classList.add('language-changing');
        this.updateI18nElements();
        this.updateI18nAttributes();
        this.updateHeaderI18n();
        this.updateTitleI18n();
        this.updateSidebarI18n();
        this.updateFlagsI18n();
        if (appState.currentQuestion) {
            this.renderCurrentQuestion();
        }
        setTimeout(() => {
            if (content) content.classList.remove('language-changing');
        }, 200);
    }

    updateHeaderI18n() {
        const titleEl = document.querySelector('.logo h1');
        if (titleEl) {
            titleEl.textContent = appState.t('app.title');
        }
        const badgeEl = document.getElementById('header-step-badge');
        if (badgeEl) {
            badgeEl.textContent = appState.t('header.badge', { step: appState.currentStep || 1, total: 4 });
        }
        if (this.headerResetBtn && appState.analysisStarted) {
            this.headerResetBtn.innerHTML = `
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M1 4v6h6M23 20v-6h-6"/>
                    <path d="M20.49 9A9 9 0 005.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 013.51 15"/>
                </svg>
                ${appState.t('summary.btnRestart')}`;
        }
    }

    updateSidebarI18n() {
        const progressTitle = document.querySelector('.progress-tracker > h3');
        if (progressTitle && !progressTitle.hasAttribute('data-i18n')) {
            progressTitle.textContent = appState.t('app.progress');
        } else if (progressTitle) {
            progressTitle.textContent = appState.t('app.progress');
        }
        const flagsTitle = document.querySelector('.flags-panel > h3');
        if (flagsTitle && !flagsTitle.hasAttribute('data-i18n')) {
            flagsTitle.textContent = appState.t('app.activeFlags');
        } else if (flagsTitle) {
            flagsTitle.textContent = appState.t('app.activeFlags');
        }
        const statusMap = {
            'در حال انجام': 'app.inProgress',
            'در انتظار': 'app.waiting',
            'تکمیل شده': 'app.completed',
            'In Progress': 'app.inProgress',
            'Waiting': 'app.waiting',
            'Completed': 'app.completed'
        };
        document.querySelectorAll('.step').forEach(stepEl => {
            const stepNum = parseInt(stepEl.getAttribute('data-step'));
            if (stepNum) {
                const titleEl = stepEl.querySelector('.step-title');
                if (titleEl) titleEl.textContent = appState.t(`sidebar.step${stepNum}`);
                const statusEl = stepEl.querySelector('.step-status');
                if (statusEl) {
                    const currentText = statusEl.textContent.trim();
                    const key = statusMap[currentText] || 'app.waiting';
                    statusEl.textContent = appState.t(key);
                }
            }
        });
        const noFlagsEl = document.querySelector('.no-flags');
        if (noFlagsEl) noFlagsEl.textContent = appState.t('app.noFlags');
    }

    updateFlagsI18n() {
        document.querySelectorAll('.flag-item[data-flag-key]').forEach(item => {
            const flagKey = item.getAttribute('data-flag-key');
            if (flagKey) item.textContent = appState.tFlag(flagKey);
        });
    }

    updateTitleI18n() {
        const titleEl = document.querySelector('title');
        if (titleEl) {
            titleEl.textContent = appState.t('app.title');
        }
    }

    async setupLanguage() {
        let savedLang = window.__APP_LANG__;
        if (!savedLang) {
            savedLang = localStorage.getItem('wearFailureExpertSystem_lang');
        }
        if (!savedLang) {
            try {
                const savedData = localStorage.getItem('wearFailureExpertSystem');
                if (savedData) {
                    const data = JSON.parse(savedData);
                    savedLang = data.language;
                }
            } catch(e) {}
        }
        if (savedLang === 'en') {
            appState.language = 'en';
            document.documentElement.setAttribute('lang', 'en');
            document.documentElement.setAttribute('dir', 'ltr');
        } else {
            appState.language = 'fa';
            document.documentElement.setAttribute('lang', 'fa');
            document.documentElement.setAttribute('dir', 'rtl');
        }
        localStorage.setItem('wearFailureExpertSystem_lang', appState.language);
        if (this.languageSelect) {
            this.languageSelect.value = appState.language;
        }
        await appState.loadTranslations();
        this.updateI18nElements();
        this.updateI18nAttributes();
        this.updateHeaderI18n();
        this.updateSidebarI18n();
        this.updateFlagsI18n();
    }

    async changeLanguage(newLang) {
        if (appState.language === newLang) return;
        const previousLang = appState.language;
        try {
            await appState.setLanguage(newLang);
            this.setDocumentDirection(newLang);
            if (this.languageSelect) {
                this.languageSelect.value = newLang;
            }
            await this.updateUILanguage();
            localStorage.setItem(appState.langStorageKey, newLang);
        } catch (error) {
            console.error('Failed to change language:', error);
            appState.language = previousLang;
            if (this.languageSelect) {
                this.languageSelect.value = previousLang;
            }
        }
    }

    setDocumentDirection(lang) {
        const rtlLanguages = ['fa', 'ar', 'he', 'ur', 'ps', 'sd', 'ug', 'yi'];
        if (rtlLanguages.includes(lang)) {
            document.documentElement.dir = 'rtl';
        } else {
            document.documentElement.dir = 'ltr';
        }
        document.documentElement.lang = lang;
    }

    setupEventListeners() {
        if (this.languageSelect) {
            this.languageSelect.addEventListener('change', async (e) => {
                await this.changeLanguage(e.target.value);
            });
        }
        window.addEventListener('navigate', (e) => {
            const question = e.detail.question;
            if (question === 'end-step1') {
                this.showStep1Summary();
                this.updateSidebar();
                this.updateFlags();
                return;
            }
            if (question === 'end-step2') {
                this.showStep2Summary();
                this.updateSidebar();
                this.updateFlags();
                return;
            }
            if (question === 'end-step3' || question === '3-14') {
                this.showStep3Summary();
                this.updateSidebar();
                this.updateFlags();
                return;
            }
            this.renderQuestion(question);
        });
        window.addEventListener('stepComplete', (e) => {
            const { step, nextStep } = e.detail;
            if (step === 1) {
                this.showStep1Summary();
                this.updateSidebar();
                this.updateFlags();
            }
            if (step === 2 && nextStep === 3) {
                appState.setFlag('STEP2_COMPLETED', true);
                appState.currentStep = 3;
                appState.saveToLocalStorage();
                this.updateSidebar();
                this.updateFlags();
                this.renderQuestion('3-0');
            }
            if (step === 3 && nextStep === 4) {
                appState.setFlag('step3Completed', true);
                appState.currentStep = 4;
                appState.saveToLocalStorage();
                this.updateSidebar();
                this.updateFlags();
                this.renderQuestion('4-1');
            }
        });
        window.addEventListener('languageChanged', () => {
            this.updateUILanguage();
        });
        if (this.headerResetBtn) {
            this.headerResetBtn.addEventListener('click', () => {
                this.confirmReset();
            });
        }
        window.addEventListener('beforeunload', () => {
            appState.saveToLocalStorage();
        });
    }

    hideLoading() {
        if (this.loadingIndicator) {
            this.loadingIndicator.style.opacity = '0';
            this.loadingIndicator.style.transition = 'opacity 0.3s ease';
            setTimeout(() => {
                if (this.loadingIndicator && this.loadingIndicator.parentNode) {
                    this.loadingIndicator.remove();
                }
            }, 300);
        }
    }

    async checkResume() {
        if (!appState.hasSavedData()) {
            appState.resetAll();
            this.updateSidebar();
            this.updateFlags();
            this.renderQuestion('1-1');
            return;
        }
        if (appState.isSavedDataStale()) {
            appState.resetAll();
            this.updateSidebar();
            this.updateFlags();
            this.renderQuestion('1-1');
            return;
        }
        const result = await showResumeModal();
        if (result.action === 'resume') {
            appState.loadFromLocalStorage();
            this.showHeaderResetButton();
            this.updateSidebar();
            this.updateFlags();
            this.renderQuestion(result.question);
        } else if (result.action === 'review') {
            this.showReviewMode(result.data);
        } else {
            appState.resetAll();
            this.updateSidebar();
            this.updateFlags();
            this.renderQuestion('1-1');
        }
    }

    renderQuestion(questionId) {
        const rendererInfo = questionRenderers[questionId];
        if (!rendererInfo) {
            this.contentContainer.innerHTML = `
                <div class="question-card">
                    <h2>❌ ${appState.t('error.questionNotFound') || 'Question not found'}: ${questionId}</h2>
                    <p>${appState.t('error.checkConsole') || 'Please check the console for details.'}</p>
                    <button class="btn btn-primary" id="btn-go-start">
                        ${appState.t('error.backToStart') || 'Back to start'}
                    </button>
                </div>`;
            document.getElementById('btn-go-start')?.addEventListener('click', () => {
                window.dispatchEvent(new CustomEvent('navigate', { detail: { question: '1-1' } }));
            });
            return;
        }
        rendererInfo.render(this.contentContainer);
        appState.currentQuestion = questionId;
        appState.currentStep = rendererInfo.step;
        this.showHeaderResetButton();
        this.updateSidebar();
        this.updateFlags();
        this.updateHeaderBadge(rendererInfo.step);
        this.contentContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    renderCurrentQuestion() {
        if (appState.currentQuestion) {
            const rendererInfo = questionRenderers[appState.currentQuestion];
            if (rendererInfo) {
                rendererInfo.render(this.contentContainer);
            }
        }
    }

    showHeaderResetButton() {
        if (this.headerResetBtn && appState.analysisStarted) {
            this.headerResetBtn.style.display = 'inline-flex';
            this.headerResetBtn.innerHTML = `
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M1 4v6h6M23 20v-6h-6"/>
                    <path d="M20.49 9A9 9 0 005.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 013.51 15"/>
                </svg>
                ${appState.t('summary.btnRestart')}`;
        }
    }

    confirmReset() {
        const isEnglish = appState.language === 'en';
        const confirmMsg = isEnglish ? 'Are you sure you want to restart? All progress will be lost.' : 'آیا مطمئن هستید که می‌خواهید از اول شروع کنید؟ تمام پیشرفت‌ها از بین خواهد رفت.';
        if (confirm(confirmMsg)) {
            appState.resetAll(true);
            this.updateSidebar();
            this.updateFlags();
            if (this.headerResetBtn) this.headerResetBtn.style.display = 'none';
            this.renderQuestion('1-1');
        }
    }

    updateSidebar() {
        if (!this.sidebarSteps) return;
        const currentStep = appState.currentStep || 1;
        this.sidebarSteps.innerHTML = [1, 2, 3, 4].map(stepId => {
            let statusKey = 'app.waiting';
            let isActive = false;
            let isStepCompleted = false;
            if (stepId < currentStep) {
                statusKey = 'app.completed';
                isStepCompleted = true;
            } else if (stepId === currentStep) {
                statusKey = 'app.inProgress';
                isActive = true;
            }
            return `
                <div class="step ${isActive ? 'active' : ''} ${isStepCompleted ? 'completed' : ''}" data-step="${stepId}">
                    <div class="step-indicator">${isStepCompleted ? '✓' : stepId}</div>
                    <div class="step-content">
                        <span class="step-title">${appState.t(`sidebar.step${stepId}`)}</span>
                        <span class="step-status">${appState.t(statusKey)}</span>
                    </div>
                </div>`;
        }).join('');
        this.setupStepClickHandlers();
    }

    updateFlags() {
        if (!this.flagsContainer) return;
        const displayFlags = appState.getDisplayFlags();
        const step2Flags = [];
        if (appState.getFlag('WEAR_SYNERGISM_DETECTED')) step2Flags.push({ key: 'wearSynergismDetected', type: 'flag-warning' });
        if (appState.getFlag('COMBINED_MECHANISMS')) step2Flags.push({ key: 'combinedMechanisms', type: 'flag-warning' });
        if (appState.getFlag('SUBSURFACE_CRACK')) step2Flags.push({ key: 'subsurfaceCrack', type: 'flag-warning' });
        if (appState.getFlag('THERMAL_DAMAGE')) step2Flags.push({ key: 'thermalDamage', type: 'flag-warning' });
        if (appState.getFlag('PARTICLE_CONTAMINATION')) step2Flags.push({ key: 'particleContamination', type: 'flag-warning' });
        if (appState.getFlag('CORROSIVE_ENVIRONMENT')) step2Flags.push({ key: 'corrosiveEnvironment', type: 'flag-warning' });
        if (appState.getFlag('MICROSTRUCTURE_DEFECT')) step2Flags.push({ key: 'microstructureDefect', type: 'flag-warning' });
        if (appState.getFlag('STEP2_COMPLETED')) step2Flags.push({ key: 'step2Completed', type: '' });
        const step3Flags = [];
        if (appState.getFlag('AERATION_DETECTED')) step3Flags.push({ key: 'AERATION_DETECTED', type: 'flag-warning' });
        if (appState.getFlag('OVERHEATING_CRITICAL')) step3Flags.push({ key: 'OVERHEATING_CRITICAL', type: 'flag-warning' });
        if (appState.getFlag('step3Completed')) step3Flags.push({ key: 'step3Completed', type: '' });
        const allFlags = [...displayFlags, ...step2Flags, ...step3Flags];
        if (allFlags.length === 0) {
            this.flagsContainer.innerHTML = `<span class="no-flags">${appState.t('app.noFlags')}</span>`;
        } else {
            this.flagsContainer.innerHTML = allFlags.map(flag => `
                <div class="flag-item ${flag.type || ''}" data-flag-key="${flag.key}">
                    ${appState.tFlag(flag.key)}
                </div>`).join('');
        }
    }

    updateHeaderBadge(step) {
        if (this.headerBadge) {
            this.headerBadge.textContent = appState.t('header.badge', { step: step || 1, total: 4 });
        }
    }

    showReviewMode(data) {
        const answers = data.answers || {};
        const questionCount = Object.keys(answers).length;
        if (questionCount === 0) { this.renderQuestion('1-1'); return; }
        this.contentContainer.innerHTML = `
            <div class="question-card">
                <div class="question-header">
                    <span class="question-number">${appState.t('review.title')}</span>
                    <span class="question-tag tag-path">${appState.t('app.inProgress')}</span>
                </div>
                <h2 class="question-title">📋 ${appState.t('review.title')}</h2>
                <p class="question-description">${appState.t('review.description', { count: questionCount })}</p>
                <div class="conditional-form">
                    <div class="report-section">
                        <h3>${appState.t('review.title')}</h3>
                        <div style="max-height: 400px; overflow-y: auto;">
                            <table class="report-table">
                                <thead><tr>
                                    <th>${appState.t('review.columnQuestion')}</th>
                                    <th>${appState.t('review.columnAnswer')}</th>
                                </tr></thead>
                                <tbody>
                                    ${Object.entries(answers).map(([key, value]) => `
                                        <tr>
                                            <td><strong>${key}</strong></td>
                                            <td><pre style="margin:0;font-size:0.85rem;">${typeof value === 'object' ? JSON.stringify(value, null, 2) : String(value)}</pre></td>
                                        </tr>`).join('')}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div class="action-bar">
                    <button id="btn-start-fresh" class="btn btn-secondary">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg>
                        ${appState.t('review.btnStartFresh')}
                    </button>
                    <button id="btn-continue-review" class="btn btn-primary">
                        ${appState.t('review.btnContinue')}
                        <svg class="btn-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
                    </button>
                </div>
            </div>`;
        document.getElementById('btn-start-fresh')?.addEventListener('click', () => {
            appState.resetAll(true);
            this.updateSidebar();
            this.updateFlags();
            this.renderQuestion('1-1');
        });
        document.getElementById('btn-continue-review')?.addEventListener('click', () => {
            appState.loadFromLocalStorage();
            this.showHeaderResetButton();
            this.updateSidebar();
            this.updateFlags();
            this.renderQuestion(data.currentQuestion || '1-1');
        });
        this.showHeaderResetButton();
    }

    showStep1Summary() {
        this.renderQuestion('report1');
    }

    showStep2Summary() {
        appState.setFlag('STEP2_COMPLETED', true);
        appState.currentStep = 2;
        appState.saveToLocalStorage();
        this.renderQuestion('report2');
    }

    showStep3Summary() {
        appState.setFlag('step3Completed', true);
        appState.currentStep = 3;
        appState.saveToLocalStorage();
        this.renderQuestion('report3');
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    window.app = new App();
    if (window.location.hostname === 'localhost') {
        window.appState = appState;
        console.log('🟢 App initialized with Step 1, Step 2 & Step 3');
    }
});

function removeBookReferences() {
    const elementsWithBookRef = document.querySelectorAll(
        '.page-ref-badge, .equipment-page, .solution-page, ' +
        '[class*="page-ref"], [class*="book-ref"], ' +
        'span[class*="page"], small[class*="page"]'
    );
    elementsWithBookRef.forEach(el => {
        if (el) el.remove();
    });
    const allElements = document.querySelectorAll('*');
    allElements.forEach(el => {
        if (el.children.length === 0 && el.textContent) {
            const text = el.textContent;
            if (text.includes('کتاب، صفحه') || 
                text.includes('(کتاب، ص') || 
                text.includes('📖 کتاب') ||
                text.match(/صفحه\s*\d+/)) {
                el.remove();
            }
        }
    });
}

const originalRender = App.prototype.renderQuestion;
App.prototype.renderQuestion = function(questionId) {
    originalRender.call(this, questionId);
    setTimeout(removeBookReferences, 50);
};

export { questionRenderers };