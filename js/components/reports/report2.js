import appState from '../../state.js';
import Calculations from '../../calculations.js';
export function renderReport2(container) {
    const t = (key, params = {}) => appState.t(key, params);
    const route = appState.getAnswer('1-1');
    const routeNames = {
        '1': t('summary.routeDesign'),
        '2': t('summary.routeTroubleshooting'),
        '3': t('summary.routeMonitoring')
    };
    const routeIcons = { '1': '✏️', '2': '🔧', '3': '📊' };
    const routeColors = { '1': '#1565C0', '2': '#EF6C00', '3': '#2E7D32' };
    const part1Code = appState.getAnswer('2-1') || appState.getAnswer('1-2-1');
    const part2Code = appState.getAnswer('2-2') || appState.getAnswer('1-2-2');
    const part1Name = t(`step2.question2_1.options.${parseInt(part1Code)-1}.title`) || t('common.unknown');
    const part2Name = getPart2Name(part2Code, t);
    const geometryCode = appState.getAnswer('2-5');
    const geometryNames = {
        '1': t('step2.question2_5.geo1'),
        '2': t('step2.question2_5.geo2'),
        '3': t('step2.question2_5.geo3'),
        '4': t('step2.question2_5.geo4'),
        '5': t('step2.question2_5.geo5'),
        '6': t('step2.question2_5.geo6'),
        '7': t('step2.question2_5.geo7')
    };
    const mechanisms = appState.getAnswer('2-8-mechanisms') || [];
    const mechanismNames = {
        '1': t('step2.question2_8b.mechanism_1'),
        '2': t('step2.question2_8b.mechanism_2'),
        '3': t('step2.question2_8b.mechanism_3'),
        '4': t('step2.question2_8b.mechanism_4'),
        '5': t('step2.question2_8b.mechanism_5'),
        '6': t('step2.question2_8b.mechanism_6'),
        '7': t('step2.question2_8b.mechanism_7'),
        '8': t('step2.question2_8b.mechanism_8'),
        '9': t('step2.question2_8b.mechanism_9'),
        '10': t('step2.question2_8b.mechanism_10'),
        '11': t('step2.question2_8b.mechanism_11'),
        '12': t('step2.question2_8b.mechanism_12'),
        '13': t('step2.question2_8b.mechanism_13')
    };
    const coatingNames = {
        '1': t('step2.question2_14.opt1'),
        '2': t('step2.question2_14.opt2'),
        '3': t('step2.question2_14.opt3'),
        '4': t('step2.question2_14.opt4'),
        '5': t('step2.question2_14.opt5'),
        '6': t('step2.question2_14.opt6'),
        '7': t('step2.question2_14.opt7')
    };
    const coating1 = appState.getAnswer('2-14') || '1';
    const coating2 = appState.getAnswer('2-15') || '1';
    const now = new Date();
    const dateStr = now.toLocaleDateString(appState.language === 'fa' ? 'fa-IR' : 'en-US', {
        year: 'numeric', month: 'long', day: 'numeric',
        hour: '2-digit', minute: '2-digit'
    });
    const answeredCount = appState.getAnsweredCount();
    container.innerHTML = `
        <div class="report-container" id="report2-printable">
            <div style="text-align: center; margin-bottom: 32px; padding-bottom: 24px; border-bottom: 2px solid var(--border-light);">
                <div style="font-size: 2.5rem; margin-bottom: 8px;">⚙️</div>
                <h1 style="font-size: 1.6rem; color: var(--primary-navy); margin-bottom: 4px;">
                    ${t('step2.completed_title')}
                </h1>
                <p class="report-subtitle" style="color: ${routeColors[route] || '#666'}; font-size: 1.1rem;">
                    ${routeIcons[route] || '📌'} ${routeNames[route] || t('common.unknown')}
                </p>
                <div class="report-meta" style="justify-content: center; gap: 24px;">
                    <span>📅 ${dateStr}</span>
                    <span>❓ ${answeredCount} ${t('modal.questionsUnit')}</span>
                    <span>🏷️ ${t('step2.summary.questions')}: ${getStep2AnsweredCount()}</span>
                </div>
            </div>
            <div class="report-section">
                <h3>🔍 ${t('step2.summary.parts')}</h3>
                <table class="report-table">
                    <tbody>
                        <tr>
                            <td style="width: 40%;"><strong>${t('step2.question2_1.title')}</strong></td>
                            <td>🔵 ${part1Name}</td>
                        </tr>
                        <tr>
                            <td><strong>${t('step2.question2_2.title')}</strong></td>
                            <td>🟠 ${part2Name}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="report-section">
                <h3>📐 ${t('step2.summary.geometry')}</h3>
                <table class="report-table">
                    <tbody>
                        <tr>
                            <td style="width: 40%;"><strong>${t('step2.question2_5.title')}</strong></td>
                            <td>${geometryNames[geometryCode] || t('common.notDetermined')}</td>
                        </tr>
                        ${renderGeometryDetails()}
                    </tbody>
                </table>
            </div>
            ${renderMaterialSection()}
            ${renderSurfaceParamsSection()}
            ${route !== '1' ? renderDamageSection() : ''}
            ${renderMotionSection()}
            ${renderContaminantsSection()}
            ${renderShaftParamsSection()}
            <div class="report-section">
                <h3>🎨 ${t('step2.summary.coatings')}</h3>
                <table class="report-table">
                    <tbody>
                        <tr>
                            <td style="width: 40%;"><strong>${part1Name}</strong></td>
                            <td>${coatingNames[coating1] || t('common.notDetermined')}</td>
                        </tr>
                        <tr>
                            <td><strong>${part2Name}</strong></td>
                            <td>${coatingNames[coating2] || t('common.notDetermined')}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            ${renderMicrostructureSection()}
            ${renderFlagsSection()}
            ${renderStep1MiniSummary()}
            <div style="text-align: center; margin-top: 32px; padding-top: 20px; border-top: 1px solid var(--border-light); color: var(--text-secondary); font-size: 0.85rem;">
                <p>${t('app.title')} © 2026</p>
                <p style="margin-top: 4px;">${t('step2.completed_title')} – ${dateStr}</p>
            </div>
        </div>
        <div class="report-action no-print" style="margin-top: 24px;">
            <button id="btn-back-step2" class="btn btn-secondary">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M9 18l6-6-6-6"/>
                </svg>
                ${t('common.btnBack')}
            </button>
            <button id="btn-print-report2" class="btn btn-secondary">
                🖨️ Print
            </button>
            <button id="btn-restart-analysis2" class="btn btn-secondary">
                ${t('summary.btnRestart')}
            </button>
            <button id="btn-continue-step3" class="btn btn-primary btn-large">
                ${t('common.gotoStep3')}
                <svg class="btn-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M9 18l6-6-6-6"/>
                </svg>
            </button>
        </div>
    `;
    document.getElementById('btn-print-report2')?.addEventListener('click', () => {
        window.print();
    });
    document.getElementById('btn-restart-analysis2')?.addEventListener('click', () => {
        if (confirm(t('modal.confirmReset'))) {
            appState.resetAll(true);
            window.dispatchEvent(new CustomEvent('navigate', { detail: { question: '1-1' } }));
        }
    });
    document.getElementById('btn-continue-step3')?.addEventListener('click', () => {
        appState.currentStep = 3;
        window.dispatchEvent(new CustomEvent('stepComplete', { 
            detail: { step: 2, nextStep: 3 } 
        }));
    });
    document.getElementById('btn-back-step2')?.addEventListener('click', () => {
        if (appState.currentQuestion) {
            window.dispatchEvent(new CustomEvent('navigate', { 
                detail: { question: appState.currentQuestion } 
            }));
        } else {
            window.dispatchEvent(new CustomEvent('navigate', { 
                detail: { question: '2-geometry' } 
            }));
        }
    });
    function getStep2AnsweredCount() {
        return Object.keys(appState.answers).filter(k => k.startsWith('2-')).length;
    }
    function getPart2Name(code, t) {
        const part2Names = {
            '1': t('step2.question2_2.opt1_title'),
            '2': t('step2.question2_2.opt2_title'),
            '3': t('step2.question2_2.opt3_title'),
            '4': t('step2.question2_2.opt4_title'),
            '5': t('step2.question2_2.opt5_title'),
            '6': t('step2.question2_2.opt6_title'),
            '7': t('step2.question2_2.opt7_title'),
            '8': t('step2.question2_2.opt8_title'),
            '9': t('step2.question2_2.opt9_title'),
            '10': t('step2.question2_2.opt10_title'),
            '11': t('step2.question2_2.opt11_title'),
            '12': t('step2.question2_2.opt12_title'),
            '13': t('step2.question2_2.opt13_title'),
            '14': t('step2.question2_2.opt14_title'),
            '15': t('step2.question2_2.opt15_title'),
            '16': t('step2.question2_2.opt16_title')
        };
        return part2Names[code] || t('common.unknown');
    }
    function renderGeometryDetails() {
        const geomData = appState.getAnswer('2-geometry');
        if (!geomData || !geomData.params) return '';
        const unitMap = {
            'D_shaft': 'mm', 'D_bush': 'mm', 'L_bearing': 'mm', 'c': 'mm',
            'R_ball': 'mm', 'R_inner': 'mm', 'R_outer': 'mm', 'L_roller': 'mm',
            'R_pinion': 'mm', 'R_gear': 'mm', 'width_gear': 'mm',
            'R_cam_base': 'mm', 'R_follower': 'mm', 'width_cam': 'mm',
            'R_wheel': 'mm', 'R_rail_x': 'mm', 'R_rail_y': 'mm',
            'R_seal': 'mm', 'width_seal': 'mm', 'A_seal': 'mm²',
            'D_piston': 'mm', 'D_cylinder': 'mm', 'L_piston': 'mm', 'c_ring': 'mm',
            'R1x': 'mm', 'R1y': 'mm', 'R2x': 'mm', 'R2y': 'mm', 'L': 'mm'
        };
        return Object.entries(geomData.params)
            .filter(([_, value]) => value !== null && value !== undefined)
            .map(([key, value]) => `
                <tr>
                    <td><strong>${key.replace(/_/g, ' ')}</strong></td>
                    <td>${value} ${unitMap[key] || ''}</td>
                </tr>
            `).join('');
    }
    function renderMaterialSection() {
        const matData = appState.getAnswer('2-3');
        if (!matData) return '';
        const part1Name = t(`step2.question2_1.options.${parseInt(part1Code)-1}.title`) || t('common.unknown');
        const part2Name = getPart2Name(part2Code, t);
        let html = '<div class="report-section"><h3>🔬 ' + t('step2.question2_3.title') + '</h3>';
        html += `<h4 style="color: #1565C0; margin: 12px 0 8px;">🔵 ${part1Name}</h4>`;
        html += '<table class="report-table"><tbody>';
        if (matData.part1) {
            Object.entries(matData.part1).forEach(([key, value]) => {
                if (value !== null && value !== undefined) {
                    html += `<tr><td style="width: 50%;"><strong>${t(`step2.question2_3.labels.${key}`)}</strong></td><td>${value} ${getUnit(key)}</td></tr>`;
                }
            });
        }
        html += '</tbody></table>';
        html += `<h4 style="color: #EF6C00; margin: 12px 0 8px;">🟠 ${part2Name}</h4>`;
        html += '<table class="report-table"><tbody>';
        if (matData.part2) {
            Object.entries(matData.part2).forEach(([key, value]) => {
                if (value !== null && value !== undefined) {
                    html += `<tr><td style="width: 50%;"><strong>${t(`step2.question2_3.labels.${key}`)}</strong></td><td>${value} ${getUnit(key)}</td></tr>`;
                }
            });
        }
        html += '</tbody></table></div>';
        return html;
    }
    function getUnit(key) {
        const units = {
            'E': 'GPa', 'nu': '', 'sigma_y': 'MPa', 'H': 'HB', 'KIC': 'MPa√m',
            'k': 'W/m·K', 'rho': 'kg/m³', 'c': 'J/kg·K', 'T_melt': '°C', 't': 'mm'
        };
        return units[key] || '';
    }
    function renderSurfaceParamsSection() {
        const params2_6 = appState.getAnswer('2-6');
        if (!params2_6) return '';
        let html = '<div class="report-section"><h3>📊 ' + t('step2.question2_6.title') + '</h3>';
        html += '<table class="report-table"><tbody>';
        Object.entries(params2_6).forEach(([key, value]) => {
            if (value !== null && value !== undefined && key !== 'sigma') {
                const labelKey = key;
                html += `<tr><td style="width: 40%;"><strong>${t(`step2.question2_6.desc.${labelKey}`) || labelKey}</strong></td><td>${value} ${getUnitParam(key)}</td></tr>`;
            }
        });
        if (params2_6.sigma) {
            html += `<tr style="background: #E8F5E9;">
                <td><strong>σ = √(Rq₁² + Rq₂²) - ${t('step2.question2_6.sigma_calculated')}</strong></td>
                <td><strong>${params2_6.sigma} µm</strong></td>
            </tr>`;
        }
        html += '</tbody></table></div>';
        return html;
    }
    function getUnitParam(key) {
        const units = {
            'Ra1': 'µm', 'Rz1': 'µm', 'Rq1': 'µm', 'Rsk1': '', 'Rku1': '',
            'Ra2': 'µm', 'Rz2': 'µm', 'Rq2': 'µm', 'Rsk2': '', 'Rku2': '',
            'F': 'N', 'U': 'm/s', 'T': '°C'
        };
        return units[key] || '';
    }
    function renderDamageSection() {
        const damageData = appState.getAnswer('2-8');
        if (!damageData) return '';
        const familyNames = {
            '1': t('step2.question2_8.family1'), '2': t('step2.question2_8.family2'),
            '3': t('step2.question2_8.family3'), '4': t('step2.question2_8.family4'),
            '5': t('step2.question2_8.family5'), '6': t('step2.question2_8.family6'),
            '7': t('step2.question2_8.family7'), '8': t('step2.question2_8.family8'),
            '9': t('step2.question2_8.family9')
        };
        const patternKeys = {
            '2': `pattern2_${damageData.pattern}`,
            '3': `pattern3_${damageData.pattern}`,
            '4': `pattern4_${damageData.pattern}`,
            '5': `pattern5_${damageData.pattern}`,
            '6': `pattern6_${damageData.pattern}`,
            '7': `pattern7_${damageData.pattern}`,
            '8': `pattern8_${damageData.pattern}`,
            '9': `pattern9_${damageData.pattern}`
        };
        const patternName = t(`step2.question2_8.${patternKeys[damageData.family]}`) || damageData.pattern;
        const mechanisms = appState.getAnswer('2-8-mechanisms') || [];
        const mechanismNames = {
            '1': t('step2.question2_8b.mechanism_1'),
            '2': t('step2.question2_8b.mechanism_2'),
            '3': t('step2.question2_8b.mechanism_3'),
            '4': t('step2.question2_8b.mechanism_4'),
            '5': t('step2.question2_8b.mechanism_5'),
            '6': t('step2.question2_8b.mechanism_6'),
            '7': t('step2.question2_8b.mechanism_7'),
            '8': t('step2.question2_8b.mechanism_8'),
            '9': t('step2.question2_8b.mechanism_9'),
            '10': t('step2.question2_8b.mechanism_10'),
            '11': t('step2.question2_8b.mechanism_11'),
            '12': t('step2.question2_8b.mechanism_12'),
            '13': t('step2.question2_8b.mechanism_13')
        };
        const mechText = mechanisms.length > 0 
            ? mechanisms.map(m => mechanismNames[m] || m).join(' + ')
            : t('common.notDetermined');
        const isCombined = appState.getFlag('COMBINED_MECHANISMS');
        const hasSubsurface = appState.getFlag('SUBSURFACE_CRACK');
        const hasThermal = appState.getFlag('THERMAL_DAMAGE');
        return `
            <div class="report-section">
                <h3>⚠️ ${t('step2.summary.mechanism')}</h3>
                <table class="report-table">
                    <tbody>
                        <tr>
                            <td style="width: 40%;"><strong>${t('step2.question2_8_detail.family')}</strong></td>
                            <td>${familyNames[damageData.family] || '—'}</td>
                        </tr>
                        <tr>
                            <td><strong>${t('step2.question2_8_detail.pattern')}</strong></td>
                            <td>${patternName || '—'}</td>
                        </tr>
                        <tr>
                            <td><strong>${t('step2.question2_8b.title')}</strong></td>
                            <td style="color: ${isCombined ? '#EF6C00' : '#C62828'}; font-weight: 600;">
                                ${mechText}
                                ${isCombined ? ' ⚠️ ' + t('flags.combinedMechanisms') : ''}
                            </td>
                        </tr>
                        ${hasSubsurface ? `
                        <tr>
                            <td><strong>${t('step2.question2_8c.opt1')}</strong></td>
                            <td style="color: #C62828;">✅ ${t('step2.question2_8c.opt1')}</td>
                        </tr>
                        ` : ''}
                        ${hasThermal ? `
                        <tr>
                            <td><strong>${t('flags.thermalDamage')}</strong></td>
                            <td style="color: #EF6C00;">⚠️ ${t('flags.thermalDamage')}</td>
                        </tr>
                        ` : ''}
                    </tbody>
                </table>
            </div>
        `;
    }
    function renderMotionSection() {
        const motionType = appState.getAnswer('2-9');
        if (!motionType) return '';
        const motionNames = {
            '1': t('step2.question2_9.opt1'), '2': t('step2.question2_9.opt2'),
            '3': t('step2.question2_9.opt3'), '4': t('step2.question2_9.opt4'),
            '5': t('step2.question2_9.opt5'), '6': t('step2.question2_9.opt6'),
            '7': t('step2.question2_9.opt7'), '8': t('step2.question2_9.opt8')
        };
        let html = `
            <div class="report-section">
                <h3>🔄 ${t('step2.question2_9.title')}</h3>
                <table class="report-table">
                    <tbody>
                        <tr>
                            <td style="width: 40%;"><strong>${t('step2.question2_9.title')}</strong></td>
                            <td>${motionNames[motionType] || '—'}</td>
                        </tr>
        `;
        const freq = appState.getAnswer('2-13b');
        const amp = appState.getAnswer('2-13c');
        const press = appState.getAnswer('2-13d');
        const cycles = appState.getAnswer('2-13e');
        if (freq) html += `<tr><td><strong>${t('step2.question2_13b.frequency')}</strong></td><td>${freq} Hz</td></tr>`;
        if (amp) html += `<tr><td><strong>${t('step2.question2_13c.amplitude')}</strong></td><td>${amp} mm</td></tr>`;
        if (press) html += `<tr><td><strong>${t('step2.question2_13d.pressure')}</strong></td><td>${press} bar</td></tr>`;
        if (cycles) html += `<tr><td><strong>${t('step2.question2_13e.cycles')}</strong></td><td>${cycles}</td></tr>`;
        html += '</tbody></table></div>';
        return html;
    }
    function renderContaminantsSection() {
        const contaminants = appState.getAnswer('2-13');
        if (!contaminants || contaminants.length === 0) return '';
        const contaminantNames = {
            '1': t('step2.question2_13.opt1'), '2': t('step2.question2_13.opt2'),
            '3': t('step2.question2_13.opt3'), '4': t('step2.question2_13.opt4'),
            '5': t('step2.question2_13.opt5'), '6': t('step2.question2_13.opt6')
        };
        const hasSynergism = appState.getFlag('WEAR_SYNERGISM_DETECTED');
        const impactAngle = appState.getAnswer('2-13f');
        const particleFlux = appState.getAnswer('2-13g');
        return `
            <div class="report-section">
                <h3>🏜️ ${t('step2.question2_13.title')}</h3>
                <table class="report-table">
                    <tbody>
                        <tr>
                            <td style="width: 40%;"><strong>${t('step2.question2_13.title')}</strong></td>
                            <td>${contaminants.map(c => contaminantNames[c] || c).join(', ')}</td>
                        </tr>
                        ${hasSynergism ? `
                        <tr>
                            <td><strong>${t('flags.wearSynergismDetected')}</strong></td>
                            <td style="color: #C62828; font-weight: 600;">⚠️ ${t('flags.wearSynergismDetected')}</td>
                        </tr>
                        ` : ''}
                        ${impactAngle ? `<tr><td><strong>${t('step2.question2_13f.angle')}</strong></td><td>${impactAngle}°</td></tr>` : ''}
                        ${particleFlux ? `<tr><td><strong>${t('step2.question2_13g.flux')}</strong></td><td>${particleFlux} kg/m²·s</td></tr>` : ''}
                    </tbody>
                </table>
            </div>
        `;
    }
    function renderShaftParamsSection() {
        const part1 = appState.getAnswer('2-1') || appState.getAnswer('1-2-1');
        if (part1 !== '2') return '';
        const shaftMass = appState.getAnswer('2-13h');
        const shaftStiffness = appState.getAnswer('2-13i');
        if (!shaftMass && !shaftStiffness) return '';
        let html = '<div class="report-section"><h3>🔩 ' + t('step2.question2_13h.title') + '</h3>';
        html += '<table class="report-table"><tbody>';
        if (shaftMass !== null && shaftMass !== undefined) {
            html += `<tr><td style="width: 40%;"><strong>${t('step2.question2_13h.mass')}</strong></td><td>${shaftMass} kg</td></tr>`;
        }
        if (shaftStiffness !== null && shaftStiffness !== undefined) {
            html += `<tr><td><strong>${t('step2.question2_13i.stiffness')}</strong></td><td>${shaftStiffness} N/m</td></tr>`;
        }
        html += '</tbody></table></div>';
        return html;
    }
    function renderMicrostructureSection() {
        const microAnswer = appState.getAnswer('2-16');
        if (!microAnswer) return '';
        const microTexts = {
            '1': '✅ ' + t('step2.question2_16.opt1'),
            '2': '⚠️ ' + t('step2.question2_16.opt2'),
            '3': '❓ ' + t('step2.question2_16.opt3')
        };
        let html = `
            <div class="report-section">
                <h3>🔬 ${t('step2.question2_16.title')}</h3>
                <table class="report-table">
                    <tbody>
                        <tr>
                            <td style="width: 40%;"><strong>${t('step2.question2_16.title')}</strong></td>
                            <td>${microTexts[microAnswer] || '—'}</td>
                        </tr>
        `;
        if (microAnswer === '2') {
            const defectCode = appState.getAnswer('2-16a');
            const defectKey = `opt${defectCode}`;
            const defectName = t(`step2.question2_16a.${defectKey}`);
            html += `<tr><td><strong>${t('step2.question2_16a.title')}</strong></td><td style="color: #C62828;">${defectName || defectCode}</td></tr>`;
        }
        html += '</tbody></table></div>';
        return html;
    }
    function renderFlagsSection() {
        const allFlags = [];
        if (appState.getFlag('WEAR_SYNERGISM_DETECTED')) allFlags.push('wearSynergismDetected');
        if (appState.getFlag('COMBINED_MECHANISMS')) allFlags.push('combinedMechanisms');
        if (appState.getFlag('SUBSURFACE_CRACK')) allFlags.push('subsurfaceCrack');
        if (appState.getFlag('THERMAL_DAMAGE')) allFlags.push('thermalDamage');
        if (appState.getFlag('PARTICLE_CONTAMINATION')) allFlags.push('particleContamination');
        if (appState.getFlag('CORROSIVE_ENVIRONMENT')) allFlags.push('corrosiveEnvironment');
        if (appState.getFlag('MICROSTRUCTURE_DEFECT')) allFlags.push('microstructureDefect');
        if (allFlags.length === 0) return '';
        return `
            <div class="report-section">
                <h3>🚩 ${t('app.activeFlags')}</h3>
                <ul class="report-flags-list">
                    ${allFlags.map(flag => `
                        <li class="flag-warning">${t(`flags.${flag}`)}</li>
                    `).join('')}
                </ul>
            </div>
        `;
    }
    function renderStep1MiniSummary() {
        const route1 = appState.getAnswer('1-1');
        if (!route1) return '';
        const priority = appState.getFlag('PRIORITY');
        const priorityLabels = {
            'CRITICAL': '🔴 ' + t('summary.priorityCritical'),
            'URGENT': '🟠 ' + t('summary.priorityUrgent'),
            'HIGH': '🟡 ' + t('summary.priorityHigh'),
            'STANDARD': '🔵 ' + t('summary.priorityStandard')
        };
        return `
            <div class="report-section" style="opacity: 0.85;">
                <h3>📋 ${t('summary.title')}</h3>
                <table class="report-table">
                    <tbody>
                        <tr>
                            <td style="width: 40%;"><strong>${t('summary.route')}</strong></td>
                            <td>${routeIcons[route1]} ${routeNames[route1]}</td>
                        </tr>
                        ${priority ? `
                        <tr>
                            <td><strong>${t('summary.priorityLevel')}</strong></td>
                            <td>${priorityLabels[priority] || priority}</td>
                        </tr>
                        ` : ''}
                    </tbody>
                </table>
            </div>
        `;
    }
}