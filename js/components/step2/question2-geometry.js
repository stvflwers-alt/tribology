import appState from '../../state.js';
import router from '../../router.js';

export function renderQuestion2_geometry(container) {
    const t = (key, params = {}) => appState.t(key, params);
    const part1 = appState.getAnswer('2-1') || appState.getAnswer('1-2-1');
    const part2 = appState.getAnswer('2-2') || appState.getAnswer('1-2-2');
    const geometryConfig = getGeometryConfig(part1, part2, t);
    
    if (!geometryConfig) {
        finishStep2();
        return;
    }
    
    const title = t('step2.question2_geometry.title');
    const description = t('step2.question2_geometry.description');
    const btnContinue = t('common.btnContinue');
    const btnBack = t('common.btnBack');
    
    container.innerHTML = `
        <div class="question-card">
            <div class="question-header">
                <span class="question-number">2-geometry</span>
                <span class="question-tag tag-standard">${t('step2.question2_geometry.tag')}</span>
            </div>
            <h2 class="question-title">${title}</h2>
            <p class="question-description">${description}</p>
            <div class="geometry-type-indicator">
                <span class="geometry-type-icon">${geometryConfig.icon}</span>
                <span class="geometry-type-name">${geometryConfig.typeName}</span>
            </div>
            <div class="geometry-params-container">
                ${geometryConfig.params.map(param => `
                    <div class="param-card geometry">
                        <div class="param-header">
                            <span class="param-symbol">${param.symbol}</span>
                            <span class="param-name">${param.name}</span>
                        </div>
                        ${param.desc ? `<p class="param-desc">${param.desc}</p>` : ''}
                        <div class="param-input-wrapper">
                            <input 
                                type="number" 
                                id="geom-${param.id}" 
                                class="numeric-input" 
                                placeholder="${param.symbol}"
                                step="any"
                                min="0"
                            >
                            <span class="param-unit">${param.unit}</span>
                        </div>
                    </div>
                `).join('')}
            </div>
            ${geometryConfig.note ? `
                <div class="info-box">
                    <span class="info-icon">💡</span>
                    <p>${geometryConfig.note}</p>
                </div>
            ` : ''}
            <div class="geometry-schematic" id="geometry-schematic">
                ${geometryConfig.schematic || ''}
            </div>
            <div class="validation-message" id="validation-geometry" style="display: none;">
                ⚠️ ${t('step2.question2_geometry.fill_all')}
            </div>
            <div class="action-bar">
                <button id="back-btn-geometry" class="btn btn-secondary">
                    <svg class="btn-arrow-back" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M9 18l6-6-6-6"/>
                    </svg>
                    ${btnBack}
                </button>
                <button id="next-btn-geometry" class="btn btn-primary" disabled>
                    ${t('step2.question2_geometry.finish_step2')}
                    <svg class="btn-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M9 18l6-6-6-6"/>
                    </svg>
                </button>
            </div>
        </div>
    `;
    
    const allInputs = container.querySelectorAll('.numeric-input');
    const nextBtn = container.querySelector('#next-btn-geometry');
    const backBtn = container.querySelector('#back-btn-geometry');
    const validationMsg = container.querySelector('#validation-geometry');
    
    function checkAllFilled() {
        let allFilled = true;
        allInputs.forEach(input => {
            if (input.value === '' || input.value === null) {
                allFilled = false;
            }
        });
        nextBtn.disabled = !allFilled;
        validationMsg.style.display = allFilled ? 'none' : 'block';
    }
    
    allInputs.forEach(input => {
        input.addEventListener('input', checkAllFilled);
    });
    
    nextBtn.addEventListener('click', () => {
        const data = {};
        geometryConfig.params.forEach(param => {
            const input = container.querySelector(`#geom-${param.id}`);
            data[param.id] = input.value ? parseFloat(input.value) : null;
        });
        appState.setAnswer('2-geometry', {
            type: geometryConfig.type,
            params: data
        });
        Object.entries(data).forEach(([key, value]) => {
            appState.setAnswer(`geom-${key}`, value);
        });
        finishStep2();
    });
    
    backBtn.addEventListener('click', () => {
        const path = appState.getAnswer('1-1');
        if (path !== '1') {
            const saved16 = appState.getAnswer('2-16');
            if (saved16 === '2') {
                window.dispatchEvent(new CustomEvent('navigate', { 
                    detail: { question: '2-16a' } 
                }));
            } else if (saved16) {
                window.dispatchEvent(new CustomEvent('navigate', { 
                    detail: { question: '2-16' } 
                }));
            } else {
                window.dispatchEvent(new CustomEvent('navigate', { 
                    detail: { question: '2-15' } 
                }));
            }
        } else {
            window.dispatchEvent(new CustomEvent('navigate', { 
                detail: { question: '2-15' } 
            }));
        }
    });
    
    const saved = appState.getAnswer('2-geometry');
    if (saved && saved.params) {
        geometryConfig.params.forEach(param => {
            if (saved.params[param.id]) {
                const input = container.querySelector(`#geom-${param.id}`);
                if (input) input.value = saved.params[param.id];
            }
        });
        checkAllFilled();
    }
}

function getGeometryConfig(part1, part2, t) {
    const configs = {
        '2-2': {
            type: 'journal_bearing',
            typeName: t('step2.question2_geometry.type_journal'),
            icon: '🔩',
            note: t('step2.question2_geometry.note_journal'),
            params: [
                { id: 'D_shaft', symbol: 'D_shaft', name: t('step2.question2_geometry.d_shaft'), desc: t('step2.question2_geometry.d_shaft_desc'), unit: 'mm' },
                { id: 'D_bush', symbol: 'D_bush', name: t('step2.question2_geometry.d_bush'), desc: t('step2.question2_geometry.d_bush_desc'), unit: 'mm' },
                { id: 'L_bearing', symbol: 'L', name: t('step2.question2_geometry.l_bearing'), desc: t('step2.question2_geometry.l_bearing_desc'), unit: 'mm' },
                { id: 'c', symbol: 'c', name: t('step2.question2_geometry.clearance'), desc: t('step2.question2_geometry.clearance_desc'), unit: 'mm' },
                { id: 'alpha', symbol: 'α', name: t('step2.question2_geometry.alpha'), desc: t('step2.question2_geometry.alpha_desc'), unit: '°' }
            ],
            schematic: `<div class="schematic-placeholder"><span class="schematic-icon">🔩</span><p>Journal Bearing Schematic</p></div>`
        },
        '3-3': {
            type: 'ball_bearing',
            typeName: t('step2.question2_geometry.type_bearing'),
            icon: '🔴',
            params: [
                { id: 'R_ball', symbol: 'R_ball', name: t('step2.question2_geometry.r_ball'), unit: 'mm' },
                { id: 'R_inner', symbol: 'R_inner', name: t('step2.question2_geometry.r_inner'), unit: 'mm' },
                { id: 'R_outer', symbol: 'R_outer', name: t('step2.question2_geometry.r_outer'), unit: 'mm' },
                { id: 'L_roller', symbol: 'L_roller', name: t('step2.question2_geometry.l_roller'), unit: 'mm' }
            ]
        },
        '1-1': {
            type: 'gear',
            typeName: t('step2.question2_geometry.type_gear'),
            icon: '⚙️',
            params: [
                { id: 'R_pinion', symbol: 'R_pinion', name: t('step2.question2_geometry.r_pinion'), unit: 'mm' },
                { id: 'R_gear', symbol: 'R_gear', name: t('step2.question2_geometry.r_gear'), unit: 'mm' },
                { id: 'width_gear', symbol: 'b', name: t('step2.question2_geometry.width_gear'), unit: 'mm' },
                { id: 'phi', symbol: 'φ', name: t('step2.question2_geometry.phi'), desc: t('step2.question2_geometry.phi_desc'), unit: '°' }
            ]
        },
        '4-4': {
            type: 'cam',
            typeName: t('step2.question2_geometry.type_cam'),
            icon: '🔧',
            params: [
                { id: 'R_cam_base', symbol: 'R_base', name: t('step2.question2_geometry.r_cam_base'), unit: 'mm' },
                { id: 'R_follower', symbol: 'R_follower', name: t('step2.question2_geometry.r_follower'), unit: 'mm' },
                { id: 'width_cam', symbol: 'b', name: t('step2.question2_geometry.width_cam'), unit: 'mm' }
            ]
        },
        '9-7': {
            type: 'wheel_rail',
            typeName: t('step2.question2_geometry.type_wheel_rail'),
            icon: '🚂',
            params: [
                { id: 'R_wheel', symbol: 'R_wheel', name: t('step2.question2_geometry.r_wheel'), unit: 'mm' },
                { id: 'R_rail_x', symbol: 'R_rail_x', name: t('step2.question2_geometry.r_rail_x'), unit: 'mm' },
                { id: 'R_rail_y', symbol: 'R_rail_y', name: t('step2.question2_geometry.r_rail_y'), unit: 'mm' }
            ]
        },
        '10-8': {
            type: 'mechanical_seal',
            typeName: t('step2.question2_geometry.type_seal'),
            icon: '💧',
            params: [
                { id: 'R_seal', symbol: 'R_seal', name: t('step2.question2_geometry.r_seal'), unit: 'mm' },
                { id: 'width_seal', symbol: 'b', name: t('step2.question2_geometry.width_seal'), unit: 'mm' },
                { id: 'A_seal', symbol: 'A', name: t('step2.question2_geometry.a_seal'), unit: 'mm²' }
            ]
        },
        '7-5': {
            type: 'piston_cylinder',
            typeName: t('step2.question2_geometry.type_piston'),
            icon: '💨',
            params: [
                { id: 'D_piston', symbol: 'D_piston', name: t('step2.question2_geometry.d_piston'), unit: 'mm' },
                { id: 'D_cylinder', symbol: 'D_cylinder', name: t('step2.question2_geometry.d_cylinder'), unit: 'mm' },
                { id: 'L_piston', symbol: 'L', name: t('step2.question2_geometry.l_piston'), unit: 'mm' },
                { id: 'c_ring', symbol: 'c_ring', name: t('step2.question2_geometry.c_ring'), unit: 'mm' }
            ]
        },
        '12-17': {
            type: 'pulley_wire_rope',
            typeName: t('step2.question2_geometry.type_pulley'),
            icon: '⭕',
            params: [
                { id: 'R_pulley', symbol: 'R_pulley', name: t('step2.question2_geometry.r_pulley'), unit: 'mm' },
                { id: 'R_wire', symbol: 'R_wire', name: t('step2.question2_geometry.r_wire'), unit: 'mm' },
                { id: 'width_pulley', symbol: 'b', name: t('step2.question2_geometry.width_pulley'), unit: 'mm' }
            ]
        }
    };
    
    const key = `${part1}-${part2}`;
    
    if (configs[key]) {
        return configs[key];
    }
    
    if (part1 === '14' || part2 === '16') {
        return {
            type: 'other',
            typeName: t('step2.question2_geometry.type_other'),
            icon: '❓',
            note: t('step2.question2_geometry.note_other'),
            params: [
                { id: 'R1x', symbol: 'R₁ₓ', name: t('step2.question2_geometry.r1x'), unit: 'mm' },
                { id: 'R1y', symbol: 'R₁ᵧ', name: t('step2.question2_geometry.r1y'), unit: 'mm' },
                { id: 'R2x', symbol: 'R₂ₓ', name: t('step2.question2_geometry.r2x'), unit: 'mm' },
                { id: 'R2y', symbol: 'R₂ᵧ', name: t('step2.question2_geometry.r2y'), unit: 'mm' },
                { id: 'L', symbol: 'L', name: t('step2.question2_geometry.l'), unit: 'mm' }
            ]
        };
    }
    
    return null;
}

function finishStep2() {
    appState.setFlag('STEP2_COMPLETED', true);
    appState.currentStep = 2;
    appState.setAnswer('step2_completed_at', new Date().toISOString());
    appState.saveToLocalStorage();
    window.dispatchEvent(new CustomEvent('navigate', { 
        detail: { question: 'report2' } 
    }));
}