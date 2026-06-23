import appState from '../../state.js';
import router from '../../router.js';
export function renderQuestion2_8_detail(container) {
    const t = (key, params = {}) => appState.t(key, params);
    const damageData = appState.getAnswer('2-8');
    if (!damageData) {
        window.dispatchEvent(new CustomEvent('navigate', { 
            detail: { question: '2-8' } 
        }));
        return;
    }
    const { family, pattern } = damageData;
    const title = t('step2.question2_8_detail.title');
    const btnContinue = t('common.btnContinue');
    const btnBack = t('common.btnBack');
    const detailInfo = getDetailInfo(family, pattern, t);
    container.innerHTML = `
        <div class="question-card">
            <div class="question-header">
                <span class="question-number">2-8-detail</span>
                <span class="question-tag tag-info">${t('step2.question2_8_detail.tag')}</span>
            </div>
            <h2 class="question-title">${title}</h2>
            <div class="damage-summary-box">
                <div class="summary-row">
                    <span class="summary-label">${t('step2.question2_8_detail.family')}:</span>
                    <span class="summary-value">${detailInfo.familyName}</span>
                </div>
                <div class="summary-row">
                    <span class="summary-label">${t('step2.question2_8_detail.pattern')}:</span>
                    <span class="summary-value">${detailInfo.patternName}</span>
                </div>
            </div>
            <div class="detail-sections">
                <!-- مشخصات ظاهری -->
                <div class="detail-section">
                    <h4>🔍 ${t('step2.question2_8_detail.characteristics')}</h4>
                    <ul class="detail-list">
                        ${detailInfo.characteristics.map(c => `<li>${c}</li>`).join('')}
                    </ul>
                </div>
                <!-- علل محتمل -->
                <div class="detail-section">
                    <h4>⚠️ ${t('step2.question2_8_detail.possible_causes')}</h4>
                    <ul class="detail-list">
                        ${detailInfo.causes.map(c => `<li>${c}</li>`).join('')}
                    </ul>
                </div>
                <!-- شرایط تشدید کننده -->
                <div class="detail-section">
                    <h4>📈 ${t('step2.question2_8_detail.aggravating_factors')}</h4>
                    <ul class="detail-list">
                        ${detailInfo.aggravating.map(a => `<li>${a}</li>`).join('')}
                    </ul>
                </div>
                <!-- پارامترهای بحرانی -->
                ${detailInfo.criticalParams ? `
                <div class="detail-section highlight">
                    <h4>🎯 ${t('step2.question2_8_detail.critical_params')}</h4>
                    <ul class="detail-list">
                        ${detailInfo.criticalParams.map(p => `<li><strong>${p}</strong></li>`).join('')}
                    </ul>
                </div>
                ` : ''}
                <!-- تصویر شماتیک -->
                <div class="detail-section schematic">
                    <h4>📷 ${t('step2.question2_8_detail.typical_image')}</h4>
                    <div class="schematic-placeholder">
                        <span class="schematic-icon">${detailInfo.icon}</span>
                        <p>${detailInfo.imageDesc}</p>
                    </div>
                </div>
                <!-- اقدامات پیشنهادی -->
                <div class="detail-section">
                    <h4>💡 ${t('step2.question2_8_detail.recommendations')}</h4>
                    <ul class="detail-list recommendations">
                        ${detailInfo.recommendations.map(r => `<li>✅ ${r}</li>`).join('')}
                    </ul>
                </div>
            </div>
            <div class="action-bar">
                <button id="back-detail-btn" class="btn btn-secondary">
                    <svg class="btn-arrow-back" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M9 18l6-6-6-6"/>
                    </svg>
                    ${btnBack}
                </button>
                <button id="next-detail-btn" class="btn btn-primary">
                    ${btnContinue}
                    <svg class="btn-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M9 18l6-6-6-6"/>
                    </svg>
                </button>
            </div>
        </div>
    `;
    container.querySelector('#next-detail-btn').addEventListener('click', () => {
        window.dispatchEvent(new CustomEvent('navigate', { 
            detail: { question: '2-8b' } 
        }));
    });
    container.querySelector('#back-detail-btn').addEventListener('click', () => {
        window.dispatchEvent(new CustomEvent('navigate', { 
            detail: { question: '2-8' } 
        }));
    });
}
function getDetailInfo(family, pattern, t) {
    const infoMap = {
        '2-1': { // سایش خراشان - خراش‌های موازی
            familyName: t('step2.question2_8.family2'),
            patternName: t('step2.question2_8.pattern2_1'),
            icon: '🔪',
            imageDesc: t('step2.question2_8_detail.desc_2_1'),
            characteristics: [
                t('step2.question2_8_detail.char_2_1_1'),
                t('step2.question2_8_detail.char_2_1_2'),
                t('step2.question2_8_detail.char_2_1_3')
            ],
            causes: [
                t('step2.question2_8_detail.cause_2_1_1'),
                t('step2.question2_8_detail.cause_2_1_2'),
                t('step2.question2_8_detail.cause_2_1_3')
            ],
            aggravating: [
                t('step2.question2_8_detail.aggr_2_1_1'),
                t('step2.question2_8_detail.aggr_2_1_2')
            ],
            criticalParams: [
                t('step2.question2_8_detail.param_hardness'),
                t('step2.question2_8_detail.param_load'),
                t('step2.question2_8_detail.param_contamination')
            ],
            recommendations: [
                t('step2.question2_8_detail.rec_2_1_1'),
                t('step2.question2_8_detail.rec_2_1_2'),
                t('step2.question2_8_detail.rec_2_1_3')
            ]
        },
        '3-2': { // سایش چسبان - گالینگ
            familyName: t('step2.question2_8.family3'),
            patternName: t('step2.question2_8.pattern3_2'),
            icon: '🔥',
            imageDesc: t('step2.question2_8_detail.desc_3_2'),
            characteristics: [
                t('step2.question2_8_detail.char_3_2_1'),
                t('step2.question2_8_detail.char_3_2_2'),
                t('step2.question2_8_detail.char_3_2_3')
            ],
            causes: [
                t('step2.question2_8_detail.cause_3_2_1'),
                t('step2.question2_8_detail.cause_3_2_2'),
                t('step2.question2_8_detail.cause_3_2_3')
            ],
            aggravating: [
                t('step2.question2_8_detail.aggr_3_2_1'),
                t('step2.question2_8_detail.aggr_3_2_2')
            ],
            criticalParams: [
                t('step2.question2_8_detail.param_lubrication'),
                t('step2.question2_8_detail.param_speed'),
                t('step2.question2_8_detail.param_temperature')
            ],
            recommendations: [
                t('step2.question2_8_detail.rec_3_2_1'),
                t('step2.question2_8_detail.rec_3_2_2'),
                t('step2.question2_8_detail.rec_3_2_3'),
                t('step2.question2_8_detail.rec_3_2_4')
            ]
        },
        '4-1': { // خستگی تماسی - پیتینگ
            familyName: t('step2.question2_8.family4'),
            patternName: t('step2.question2_8.pattern4_1'),
            icon: '💥',
            imageDesc: t('step2.question2_8_detail.desc_4_1'),
            characteristics: [
                t('step2.question2_8_detail.char_4_1_1'),
                t('step2.question2_8_detail.char_4_1_2'),
                t('step2.question2_8_detail.char_4_1_3')
            ],
            causes: [
                t('step2.question2_8_detail.cause_4_1_1'),
                t('step2.question2_8_detail.cause_4_1_2'),
                t('step2.question2_8_detail.cause_4_1_3')
            ],
            aggravating: [
                t('step2.question2_8_detail.aggr_4_1_1'),
                t('step2.question2_8_detail.aggr_4_1_2')
            ],
            criticalParams: [
                t('step2.question2_8_detail.param_contact_stress'),
                t('step2.question2_8_detail.param_cycles'),
                t('step2.question2_8_detail.param_material_quality')
            ],
            recommendations: [
                t('step2.question2_8_detail.rec_4_1_1'),
                t('step2.question2_8_detail.rec_4_1_2'),
                t('step2.question2_8_detail.rec_4_1_3')
            ]
        }
    };
    const key = `${family}-${pattern}`;
    return infoMap[key] || getDefaultInfo(family, pattern, t);
}
function getDefaultInfo(family, pattern, t) {
    const familyNames = {
        '2': t('step2.question2_8.family2'),
        '3': t('step2.question2_8.family3'),
        '4': t('step2.question2_8.family4'),
        '5': t('step2.question2_8.family5'),
        '6': t('step2.question2_8.family6'),
        '7': t('step2.question2_8.family7'),
        '8': t('step2.question2_8.family8'),
        '9': t('step2.question2_8.family9')
    };
    return {
        familyName: familyNames[family] || t('common.unknown'),
        patternName: t('step2.question2_8_detail.pattern_generic'),
        icon: '❓',
        imageDesc: t('step2.question2_8_detail.desc_generic'),
        characteristics: [
            t('step2.question2_8_detail.char_generic_1'),
            t('step2.question2_8_detail.char_generic_2')
        ],
        causes: [
            t('step2.question2_8_detail.cause_generic_1'),
            t('step2.question2_8_detail.cause_generic_2')
        ],
        aggravating: [
            t('step2.question2_8_detail.aggr_generic_1')
        ],
        criticalParams: [
            t('step2.question2_8_detail.param_load'),
            t('step2.question2_8_detail.param_environment')
        ],
        recommendations: [
            t('step2.question2_8_detail.rec_generic_1'),
            t('step2.question2_8_detail.rec_generic_2'),
            t('step2.question2_8_detail.rec_generic_3')
        ]
    };
}