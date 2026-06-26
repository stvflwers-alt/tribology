class AppState {
    constructor() {
        this.currentStep = 1;
        this.currentQuestion = null;
        this.language = 'en';
        this.translations = {};
        this.answers = {};
        this.flags = {};
        this.route = null;
        this.analysisStarted = false;
        this.analysisCompleted = false;
        this.questionHistory = [];
        this.actualHistory = [];
        this.maxHistoryLength = 50;
        this.initializeFlags();
        this.storageKey = 'wearFailureExpertSystem';
        this.langStorageKey = 'wearFailureExpertSystem_lang';
    }
    getAnsweredCount() {
        return Object.keys(this.answers).length;
    }
    initializeFlags() {
        this.flags = {
            ANALYSIS_MODE: null,
            PRIORITY: null,
            PRIORITY_NEEDS_REVIEW: false,
            PATTERN: null,
            OIL_ANALYSIS_AVAILABLE: false,
            VIBRATION_AVAILABLE: false,
            CHANGE_DETECTED: false,
            CHANGE_TYPES: [],
            OPERATIONAL_CHANGE: false,
            MATERIAL_CHANGE: false,
            LUBRICATION_SYSTEM: null,
            CONTAMINATION_SUSPECTED: false,
            FATIGUE_SUSPECTED: false,
            CORROSION_SUSPECTED: false,
            DATA_SAVED: false,
            LAST_SAVED: null,
        };
    }
    setAnswer(questionId, value) {
        if (!questionId) return;
        this.answers[questionId] = value;
        this.addToHistory(questionId);
        if (!this.analysisStarted) this.analysisStarted = true;
        this.saveToLocalStorage();
    }
    getAnswer(questionId) {
        return this.answers.hasOwnProperty(questionId) ? this.answers[questionId] : null;
    }
    hasAnswer(questionId) {
        return this.answers.hasOwnProperty(questionId) && this.answers[questionId] !== null;
    }
    setFlag(flagName, value) {
        if (this.flags.hasOwnProperty(flagName)) {
            this.flags[flagName] = value;
            this.saveToLocalStorage();
        }
    }
    getFlag(flagName) {
        return this.flags.hasOwnProperty(flagName) ? this.flags[flagName] : null;
    }
    getActiveFlags() {
        const active = {};
        for (const [key, value] of Object.entries(this.flags)) {
            if (value !== null && value !== false && value !== undefined) {
                active[key] = value;
            }
        }
        return active;
    }
    getDisplayFlags() {
        const displayFlags = [];
        const f = this.flags;
        if (f.ANALYSIS_MODE === 'CONSERVATIVE') displayFlags.push({ key: 'conservativeAnalysis', type: '' });
        if (f.PRIORITY === 'CRITICAL') displayFlags.push({ key: 'criticalPriority', type: 'flag-warning' });
        else if (f.PRIORITY === 'URGENT') displayFlags.push({ key: 'urgentPriority', type: 'flag-warning' });
        else if (f.PRIORITY === 'HIGH') displayFlags.push({ key: 'highPriority', type: '' });
        if (f.PATTERN === 'RECURRENT') displayFlags.push({ key: 'recurrentFailure', type: '' });
        else if (f.PATTERN === 'NEW') displayFlags.push({ key: 'newFailure', type: '' });
        if (f.CHANGE_DETECTED) displayFlags.push({ key: 'conditionChanged', type: '' });
        if (this.hasAnswer('1-4-1') && !f.OIL_ANALYSIS_AVAILABLE) displayFlags.push({ key: 'noOilAnalysis', type: 'flag-warning' });
        if (this.hasAnswer('1-4-2') && !f.VIBRATION_AVAILABLE) displayFlags.push({ key: 'noVibration', type: 'flag-warning' });
        if (f.OPERATIONAL_CHANGE) displayFlags.push({ key: 'operatorChanged', type: '' });
        if (f.MATERIAL_CHANGE) displayFlags.push({ key: 'materialChanged', type: '' });
        if (f.CONTAMINATION_SUSPECTED) displayFlags.push({ key: 'contaminationSuspected', type: 'flag-warning' });
        if (f.FATIGUE_SUSPECTED) displayFlags.push({ key: 'fatigueSuspected', type: 'flag-warning' });
        if (f.CORROSION_SUSPECTED) displayFlags.push({ key: 'corrosionSuspected', type: 'flag-warning' });
        return displayFlags;
    }
    addToHistory(questionId) {
        this.questionHistory.push({ questionId, timestamp: new Date().toISOString() });
        if (this.questionHistory.length > this.maxHistoryLength) {
            this.questionHistory = this.questionHistory.slice(-this.maxHistoryLength);
        }
    }
    addToActualHistory(questionId) {
        if (!questionId) return;
        if (this.actualHistory[this.actualHistory.length - 1] !== questionId) {
            this.actualHistory.push(questionId);
        }
        if (this.actualHistory.length > this.maxHistoryLength) {
            this.actualHistory = this.actualHistory.slice(-this.maxHistoryLength);
        }
        this.saveToLocalStorage();
    }
    getPreviousActualQuestion() {
        if (this.actualHistory.length >= 2) {
            return this.actualHistory[this.actualHistory.length - 2];
        }
        return null;
    }
    getActualHistory() {
        return [...this.actualHistory];
    }
    goBackToActualQuestion() {
        const prev = this.getPreviousActualQuestion();
        if (prev) {
            this.actualHistory.pop();
            return prev;
        }
        return null;
    }
    resetActualHistory() {
        this.actualHistory = [];
    }
    async setLanguage(lang) {
        if (this.language === lang) return;
        const allowedLangs = ['en'];
        if (!allowedLangs.includes(lang)) {
            console.warn(`Language '${lang}' is not supported. Falling back to 'en'.`);
            lang = 'en';
        }
        this.language = lang;
        localStorage.setItem(this.langStorageKey, lang);
        document.documentElement.dir = 'ltr';
        document.documentElement.lang = lang;
        await this.loadTranslations();
        this.saveToLocalStorage();
        window.dispatchEvent(new CustomEvent('languageChanged', { 
            detail: { language: lang } 
        }));
    }
    async loadTranslations() {
        try {
            const response = await fetch(`./locales/en.json`);
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            this.translations = await response.json();
        } catch (error) {
            console.error('Failed to load translations:', error);
            this.translations = {};
        }
    }
    t(key, params = {}) {
        if (!key) return '';
        const keys = key.split('.');
        let value = this.translations;
        for (const k of keys) {
            if (value && typeof value === 'object' && k in value) {
                value = value[k];
            } else {
                return key;
            }
        }
        if (typeof value === 'object' && !Array.isArray(value)) return JSON.stringify(value);
        if (typeof value === 'string' && params) {
            Object.entries(params).forEach(([paramKey, paramValue]) => {
                value = value.replace(new RegExp(`\\{${paramKey}\\}`, 'g'), paramValue);
            });
        }
        return value || key;
    }
    tFlag(flagKey) {
        return this.t(`flags.${flagKey}`) || flagKey;
    }
    saveToLocalStorage() {
        try {
            const data = {
                currentStep: this.currentStep,
                currentQuestion: this.currentQuestion,
                language: this.language,
                answers: this.answers,
                flags: this.flags,
                route: this.route,
                analysisStarted: this.analysisStarted,
                analysisCompleted: this.analysisCompleted,
                questionHistory: this.questionHistory.slice(-20),
                actualHistory: this.actualHistory.slice(-20),
                timestamp: new Date().toISOString(),
                version: '1.0.0'
            };
            localStorage.setItem(this.storageKey, JSON.stringify(data));
            this.flags.DATA_SAVED = true;
            this.flags.LAST_SAVED = data.timestamp;
        } catch (error) {
            console.error('Failed to save to localStorage:', error);
        }
    }
    loadFromLocalStorage() {
        try {
            const saved = localStorage.getItem(this.storageKey);
            if (!saved) return false;
            const data = JSON.parse(saved);
            this.language = 'en';
            this.currentStep = data.currentStep || 1;
            this.currentQuestion = data.currentQuestion || null;
            this.answers = data.answers || {};
            this.flags = data.flags || {};
            this.route = data.route || null;
            this.analysisStarted = data.analysisStarted || false;
            this.analysisCompleted = data.analysisCompleted || false;
            this.questionHistory = data.questionHistory || [];
            this.actualHistory = data.actualHistory || [];
            this.ensureAllFlags();
            return true;
        } catch (error) {
            console.error('Failed to load from localStorage:', error);
            return false;
        }
    }
    ensureAllFlags() {
        const defaultFlags = {
            ANALYSIS_MODE: null, PRIORITY: null, PRIORITY_NEEDS_REVIEW: false,
            PATTERN: null, OIL_ANALYSIS_AVAILABLE: false, VIBRATION_AVAILABLE: false,
            CHANGE_DETECTED: false, CHANGE_TYPES: [], OPERATIONAL_CHANGE: false,
            MATERIAL_CHANGE: false, LUBRICATION_SYSTEM: null,
            CONTAMINATION_SUSPECTED: false, FATIGUE_SUSPECTED: false,
            CORROSION_SUSPECTED: false, DATA_SAVED: false, LAST_SAVED: null,
        };
        for (const [key, defaultValue] of Object.entries(defaultFlags)) {
            if (!(key in this.flags)) this.flags[key] = defaultValue;
        }
    }
    hasSavedData() {
        try {
            const saved = localStorage.getItem(this.storageKey);
            if (!saved) return false;
            const data = JSON.parse(saved);
            return !!(data.currentQuestion && Object.keys(data.answers || {}).length > 0);
        } catch { return false; }
    }
    getSavedDataAge() {
        try {
            const saved = localStorage.getItem(this.storageKey);
            if (!saved) return null;
            const data = JSON.parse(saved);
            if (!data.timestamp) return null;
            return (new Date() - new Date(data.timestamp)) / (1000 * 60 * 60);
        } catch { return null; }
    }
    isSavedDataStale() {
        const age = this.getSavedDataAge();
        return age !== null && age > 24;
    }
    resetAll(keepLanguage = true) {
        const currentLang = this.language;
        this.currentStep = 1;
        this.currentQuestion = null;
        this.answers = {};
        this.route = null;
        this.analysisStarted = false;
        this.analysisCompleted = false;
        this.questionHistory = [];
        this.actualHistory = [];
        this.initializeFlags();
        if (keepLanguage) {
            this.language = 'en';
        }
        localStorage.removeItem(this.storageKey);
    }
    debug() {
        console.group('AppState Debug');
        console.log('Language:', this.language);
        console.log('Direction:', document.documentElement.dir);
        console.log('Current Question:', this.currentQuestion);
        console.log('Answers:', Object.keys(this.answers).length);
        console.log('Flags:', this.getActiveFlags());
        console.log('Actual History:', this.actualHistory);
        console.groupEnd();
    }
}
const appState = new AppState();
export default appState;