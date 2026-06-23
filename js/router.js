import appState from './state.js';

class Router {
  constructor() {
    this.questionFlow = {
      step1: {
        '1-1': { next: null, type: 'routing' },
        '1-2-1': { next: '1-2-2', type: 'standard', condition: 'check1-2-1' },
        '1-2-1a': { next: '1-2-2', type: 'conditional', condition: 'isOtherContact' },
        '1-2-1b': { next: '1-2-2', type: 'conditional', condition: 'needsNumericParams' },
        '1-2-2': { next: '1-2-3', type: 'standard' },
        '1-2-3': { next: '1-2-4', type: 'standard', condition: 'isModification' },
        '1-2-4': { next: null, type: 'end_step1_design' },
        '1-3-1': { next: '1-3-2a', type: 'standard', condition: 'check1-3-1' },
        '1-3-1a': { next: '1-3-2a', type: 'conditional', condition: 'isOtherTroubleshooting' },
        '1-3-1b': { next: '1-3-2a', type: 'conditional', condition: 'needsNumericParamsTS' },
        '1-3-2a': { next: '1-3-2b', type: 'standard' },
        '1-3-2b': { next: '1-3-3', type: 'standard' },
        '1-3-3': { next: '1-3-4', type: 'standard' },
        '1-3-4': { next: '1-3-5', type: 'standard', condition: 'isRecurrent' },
        '1-3-5': { next: null, type: 'end_step1_troubleshooting' },
        '1-4-1': { next: '1-4-2', type: 'standard' },
        '1-4-2': { next: '1-4-3', type: 'standard', condition: 'checkMonitoringConditions' },
        '1-4-3': { next: null, type: 'end_step1_monitoring' }
      },
      step2: {
        '2-1': { next: '2-2', type: 'standard', condition: 'check2-1' },
        '2-1a': { next: '2-2', type: 'conditional' },
        '2-1b': { next: '2-2', type: 'conditional' },
        '2-2': { next: '2-3', type: 'standard', condition: 'check2-2' },
        '2-2a': { next: '2-3', type: 'conditional' },
        '2-3': { next: '2-5', type: 'standard' },
        '2-5': { next: '2-6', type: 'standard', condition: 'check2-5' },
        '2-5a': { next: '2-6', type: 'conditional' },
        '2-6': { next: '2-8', type: 'standard', condition: 'check2-6' },
        '2-8': { next: '2-8-detail', type: 'standard', condition: 'check2-8' },
        '2-8-detail': { next: '2-8b', type: 'info' },
        '2-8a': { next: '2-8b', type: 'conditional' },
        '2-8b': { next: '2-9', type: 'standard', condition: 'check2-8b' },
        '2-8c': { next: '2-9', type: 'conditional' },
        '2-9': { next: '2-13', type: 'standard', condition: 'check2-9' },
        '2-13': { next: '2-13a', type: 'standard', condition: 'check2-13' },
        '2-13a': { next: '2-13b', type: 'conditional' },
        '2-13b': { next: '2-13c', type: 'conditional' },
        '2-13c': { next: '2-13d', type: 'conditional' },
        '2-13d': { next: '2-13e', type: 'conditional' },
        '2-13e': { next: '2-13f', type: 'conditional' },
        '2-13f': { next: '2-13g', type: 'conditional' },
        '2-13g': { next: '2-14', type: 'conditional' },
        '2-13h': { next: '2-13i', type: 'conditional' },
        '2-13i': { next: '2-14', type: 'conditional' },
        '2-14': { next: '2-15', type: 'standard' },
        '2-15': { next: '2-16', type: 'standard', condition: 'check2-15' },
        '2-16': { next: '2-16a', type: 'conditional' },
        '2-16a': { next: '2-geometry', type: 'conditional' },
        '2-geometry': { next: null, type: 'end_step2' }
      },
      step3: {
        '3-0': { next: '3-1', type: 'standard' },
        '3-1': { next: '3-2', type: 'standard' },
        '3-2': { next: null, type: 'routing_step3' },
        '3-4': { next: null, type: 'routing_3-4' },
        '3-5': { next: '3-6', type: 'standard' },
        '3-6': { next: '3-7', type: 'standard' },
        '3-7': { next: null, type: 'routing_3-7' },
        '3-7a': { next: null, type: 'routing_3-7a' },
        '3-7b': { next: null, type: 'routing_3-7b' },
        '3-8': { next: '3-9', type: 'standard' },
        '3-8-design': { next: '3-13', type: 'standard' },
        '3-9': { next: '3-10', type: 'standard' },
        '3-10': { next: '3-11', type: 'standard' },
        '3-11': { next: '3-12', type: 'standard' },
        '3-12': { next: '3-13', type: 'standard' },
        '3-13': { next: 'report3', type: 'end_step3' }
      },
      step4: {
        '4-1': { next: '4-2', type: 'standard' },
        '4-2': { next: null, type: 'routing_4-2' },
        '4-2-estimated': { next: '4-3', type: 'conditional' },
        '4-2-precise': { next: '4-3', type: 'conditional' },
        '4-3': { next: null, type: 'routing_4-3' },
        '4-3-gas': { next: '4-7', type: 'standard' },
        '4-3-solid': { next: '4-7', type: 'conditional' },
        '4-4': { next: '4-5', type: 'standard' },
        '4-5': { next: '4-6', type: 'standard' },
        '4-6': { next: null, type: 'routing_4-6' },
        '4-6-results': { next: '4-7', type: 'standard' },
        '4-7': { next: '4-8', type: 'standard' },
        '4-8': { next: '4-9', type: 'standard' },
        '4-9': { next: '4-10', type: 'standard', condition: 'check4-9' },
        '4-10': { next: '4-11', type: 'standard', condition: 'check4-10' },
        '4-11': { next: '4-12', type: 'standard' },
        '4-12': { next: '4-13', type: 'standard' },
        '4-13': { next: '4-14', type: 'standard' },
        '4-14': { next: '4-15', type: 'standard' },
        '4-15': { next: '4-16', type: 'standard' },
        '4-16': { next: '4-17', type: 'standard' },
        '4-17': { next: null, type: 'conditional', condition: 'check4-17' },
        '4-18': { next: null, type: 'conditional', condition: 'check4-18' },
        '4-19': { next: null, type: 'conditional', condition: 'check4-19' },
        '4-20': { next: 'report4', type: 'end_step4' }
      }
    };
  }

  routeMainPath(answer1_1) {
    switch(answer1_1) {
      case '1':
        return { section: 'design', firstQuestion: '1-2-1' };
      case '2':
        return { section: 'troubleshooting', firstQuestion: '1-3-1' };
      case '3':
        return { section: 'monitoring', firstQuestion: '1-4-1' };
      default:
        return null;
    }
  }

  checkCondition(questionId) {
    const path = appState.getAnswer('1-1');
    
    switch(questionId) {
      case '1-2-1': {
        const answer = appState.getAnswer('1-2-1');
        if (answer === '14') {
          return { needQuestion: '1-2-1a', reason: 'other_contact' };
        } else if (['8', '9', '11'].includes(answer)) {
          return { needQuestion: '1-2-1b', reason: 'numeric_params' };
        }
        return null;
      }
      case '1-3-1': {
        const answer = appState.getAnswer('1-3-1');
        if (answer === '14') {
          return { needQuestion: '1-3-1a', reason: 'other_contact_ts' };
        } else if (['8', '9', '11'].includes(answer)) {
          return { needQuestion: '1-3-1b', reason: 'numeric_params_ts' };
        }
        return null;
      }
      case '1-2-3': {
        const answer = appState.getAnswer('1-2-3');
        return answer === '2' ? { needQuestion: '1-2-4' } : null;
      }
      case '1-3-4': {
        const answer = appState.getAnswer('1-3-4');
        return answer === '2' ? { needQuestion: '1-3-5' } : null;
      }
      case '1-4-2': {
        const oilNormal = appState.getAnswer('1-4-1') === '4';
        const vibrationNormal = appState.getAnswer('1-4-2') === '3';
        return (!oilNormal || !vibrationNormal) ? { needQuestion: '1-4-3' } : null;
      }
      case '2-1': {
        if (path === '1' || path === '2') return null;
        const answer = appState.getAnswer('2-1');
        if (answer === '14') return { needQuestion: '2-1a', reason: 'other_part1' };
        if (['8', '9', '11'].includes(answer)) return { needQuestion: '2-1b', reason: 'numeric_params' };
        return null;
      }
      case '2-2': {
        if (path === '1' || path === '3') return null;
        const answer = appState.getAnswer('2-2');
        if (answer === '16') return { needQuestion: '2-2a', reason: 'other_part2' };
        return null;
      }
      case '2-5': {
        const answer = appState.getAnswer('2-5');
        if (answer === '7') return { needQuestion: '2-5a', reason: 'other_geometry' };
        return null;
      }
      case '2-6': {
        if (path === '1') return { skipTo: '2-14', reason: 'design_no_damage' };
        return null;
      }
      case '2-8': {
        const family = appState.getAnswer('2-8-family');
        const pattern = appState.getAnswer('2-8-pattern');
        if (family === '1') {
          const nextQ = path === '2' ? '2-9' : '2-14';
          return { skipTo: nextQ, reason: 'no_damage' };
        }
        if (family === '5' || family === '9') {
          return { needQuestion: '2-8a', reason: 'needs_evidence' };
        }
        return null;
      }
      case '2-8b': {
        const mechanisms = appState.getAnswer('2-8-mechanisms') || [];
        if (mechanisms.includes('4')) return { needQuestion: '2-8c', reason: 'fatigue' };
        return null;
      }
      case '2-9': {
        if (path !== '2') return { skipTo: '2-13', reason: 'not_troubleshooting' };
        return null;
      }
      case '2-13': {
        const contaminants = appState.getAnswer('2-13') || [];
        const hasParticles = contaminants.includes('2') || contaminants.includes('5');
        if ((path === '2' || path === '3') && hasParticles) {
          return { needQuestion: '2-13a', reason: 'synergism' };
        }
        if (this.hasConditionalParams()) {
          return { needQuestion: '2-13b', reason: 'conditional_params' };
        }
        return { skipTo: '2-14', reason: 'no_conditional_params' };
      }
      case '2-15': {
        if (path === '1') return { skipTo: '2-geometry', reason: 'design_skip_microstructure' };
        return null;
      }
      case '2-16': {
        const answer = appState.getAnswer('2-16');
        if (answer === '2') return { needQuestion: '2-16a', reason: 'microstructure_defect' };
        return null;
      }
      case '3-2': {
        const analysisMode = appState.getAnswer('1-1');
        if (analysisMode === '1') {
          return { skipTo: '3-7', reason: 'design_path' };
        }
        return null;
      }
      case '3-4': {
        const hasProblem = appState.getAnswer('3-4');
        if (hasProblem === '1') {
          return null;
        } else {
          return { skipTo: '3-13', reason: 'no_problem' };
        }
      }
      case '3-7': {
        const systemCode = appState.getAnswer('3-2')?.recommendedSystem;
        const analysisMode = appState.getAnswer('1-1');
        if (systemCode === 9) {
          return { needQuestion: '3-7a', reason: 'grease_system' };
        }
        if (systemCode === 5) {
          return { needQuestion: '3-7b', reason: 'solid_lubricant' };
        }
        if (analysisMode === '1') {
          return { skipTo: '3-8-design', reason: 'design_path' };
        }
        return null;
      }
      case '3-7a': {
        const analysisMode = appState.getAnswer('1-1');
        if (analysisMode === '1') {
          return { skipTo: '3-8-design', reason: 'design_path' };
        }
        return { skipTo: '3-8', reason: 'existing_path' };
      }
      case '3-7b': {
        const analysisMode = appState.getAnswer('1-1');
        if (analysisMode === '1') {
          return { skipTo: '3-8-design', reason: 'design_path' };
        }
        return { skipTo: '3-8', reason: 'existing_path' };
      }
      case 'check4-2': {
        const regime = appState.getAnswer('3-2')?.recommendedSystem;
        if (regime === 5) {
          return { skipTo: '4-3-solid', reason: 'solid_lubricant' };
        }
        if ([7, 8].includes(regime)) {
          return { skipTo: '4-2', reason: 'gas_lubricant' };
        }
        return null;
      }
      case 'check4-6': {
        const deflectionNeeded = appState.getFlag('DEFLECTION_NEEDED');
        if (!deflectionNeeded) {
          return { skipTo: '4-7', reason: 'no_deflection_needed' };
        }
        return null;
      }
      case 'check4-9': {
        const regime = appState.getAnswer('3-2')?.recommendedSystem;
        if (regime === 2) {
          appState.setFlag('HYDROSTATIC_PARAMS_NEEDED', true);
        }
        return null;
      }
      case 'check4-10': {
        const regime = appState.getAnswer('3-2')?.recommendedSystem;
        if ([7, 8].includes(regime)) {
          return { skipTo: '4-11', reason: 'gas_lubricant_no_grade' };
        }
        return null;
      }
      case 'check4-11': {
        const regime = appState.getAnswer('3-2')?.recommendedSystem;
        if ([7, 8].includes(regime)) {
          return { skipTo: '4-12', reason: 'gas_lubricant_no_additives' };
        }
        return null;
      }
      case 'check4-13': {
        const regime = appState.getAnswer('3-2')?.recommendedSystem;
        if ([7, 8].includes(regime)) {
          return { skipTo: '4-14', reason: 'gas_lubricant_no_replacement' };
        }
        return null;
      }
      case 'check4-17': {
        const regime = appState.getAnswer('3-2')?.recommendedSystem;
        if ([7, 8].includes(regime)) {
          return { skipTo: '4-18', reason: 'gas_lubricant_seal_compatible' };
        }
        if ([1, 2, 3, 4, 6, 10].includes(regime)) {
          return null;
        }
        return { skipTo: '4-18', reason: 'not_oil_emulsion' };
      }
      case 'check4-18': {
        const regime = appState.getAnswer('3-2')?.recommendedSystem;
        if ([7, 8].includes(regime)) {
          return { skipTo: '4-19', reason: 'gas_lubricant_no_mixing' };
        }
        if ([1, 2, 3, 4, 6, 9, 10].includes(regime)) {
          return null;
        }
        return { skipTo: '4-19', reason: 'not_mixable' };
      }
      case 'check4-19': {
        const regime = appState.getAnswer('3-2')?.recommendedSystem;
        if ([7, 8].includes(regime)) {
          return { skipTo: '4-20', reason: 'gas_lubricant_no_quality_tests' };
        }
        if ([1, 2, 3, 4, 6, 10].includes(regime)) {
          return null;
        }
        return { skipTo: '4-20', reason: 'no_quality_tests' };
      }
      default:
        return null;
    }
  }

  hasConditionalParams() {
    const motionType = appState.getAnswer('2-9');
    const part1 = appState.getAnswer('2-1') || appState.getAnswer('1-2-1');
    const contaminants = appState.getAnswer('2-13') || [];
    const path = appState.getAnswer('1-1');
    return (motionType === '5' || motionType === '6') ||
           ['13', '14'].includes(part1) ||
           path === '1' ||
           contaminants.includes('2') || contaminants.includes('5') ||
           part1 === '2';
  }

  getNextQuestion(currentQuestionId, answer) {
    let flow = this.questionFlow.step1[currentQuestionId];
    let step = 'step1';
    
    if (!flow) {
      flow = this.questionFlow.step2[currentQuestionId];
      step = 'step2';
    }
    if (!flow) {
      flow = this.questionFlow.step3[currentQuestionId];
      step = 'step3';
    }
    if (!flow) {
      flow = this.questionFlow.step4[currentQuestionId];
      step = 'step4';
    }
    if (!flow) return null;

    if (flow.type === 'routing') {
      const route = this.routeMainPath(answer);
      return route ? route.firstQuestion : null;
    }

    if (flow.type === 'routing_step3') {
      return this.routeStep3Path();
    }

    if (flow.type === 'routing_3-4') {
      return this.route3_4();
    }

    if (flow.type === 'routing_3-7') {
      return this.route3_7();
    }

    if (flow.type === 'routing_3-7a' || flow.type === 'routing_3-7b') {
      return this.route3_7_afterConditional();
    }

    if (flow.type === 'routing_4-2') {
      return this.route4_2();
    }

    if (flow.type === 'routing_4-3') {
      return this.route4_3();
    }

    if (flow.type === 'routing_4-6') {
      return this.route4_6();
    }

    if (flow.type === 'conditional') {
      const conditionResult = this.checkCondition(flow.condition);
      if (conditionResult && conditionResult.skipTo) {
        return conditionResult.skipTo;
      }
      if (conditionResult && conditionResult.needQuestion) {
        return conditionResult.needQuestion;
      }
      return flow.next;
    }

    if (flow.type === 'end_step1_design' || flow.type === 'end_step1_troubleshooting' || flow.type === 'end_step1_monitoring') {
      return 'report1';
    }

    if (flow.type === 'end_step2') {
      return 'report2';
    }

    if (flow.type === 'end_step3') {
      return 'report3';
    }

    if (flow.type === 'end_step4') {
      return 'report4';
    }

    if (flow.condition) {
      const conditionResult = this.checkCondition(flow.condition);
      if (!conditionResult) {
        return flow.next;
      }
      if (conditionResult.needQuestion) {
        return conditionResult.needQuestion;
      }
      if (conditionResult.skipTo) {
        return conditionResult.skipTo;
      }
    }

    return flow.next;
  }

  routeStep3Path() {
    const analysisMode = appState.getAnswer('1-1');
    if (analysisMode === '1') {
      return '3-7';
    } else {
      return '3-4';
    }
  }

  route3_4() {
    const hasProblem = appState.getAnswer('3-4');
    if (hasProblem === '1') {
      return '3-5';
    }
    return '3-13';
  }

  route3_7() {
    const systemCode = appState.getAnswer('3-2')?.recommendedSystem;
    const analysisMode = appState.getAnswer('1-1');
    if (systemCode === 9) {
      return '3-7a';
    }
    if (systemCode === 5) {
      return '3-7b';
    }
    if (analysisMode === '1') {
      return '3-8-design';
    }
    return '3-8';
  }

  route3_7_afterConditional() {
    const analysisMode = appState.getAnswer('1-1');
    if (analysisMode === '1') {
      return '3-8-design';
    }
    return '3-8';
  }

  route4_2() {
    const regime = appState.getAnswer('3-2')?.recommendedSystem;
    
    if (regime === 9) {
      return '4-2';
    }
    
    if ([7, 8].includes(regime)) {
      return '4-2';
    }
    
    const method = appState.getAnswer('4-2-method-used');
    if (method === 'precise') {
      return '4-2-precise';
    } else if (method === 'estimated') {
      return '4-2-estimated';
    }
    
    return '4-2';
  }

  route4_3() {
    const lambdaValue = appState.getAnswer('4-3-lambda');
    const regime = appState.getAnswer('3-2')?.recommendedSystem;

    if (regime === 5) {
      return '4-3-solid';
    }

    if ([7, 8].includes(regime)) {
      return '4-3-gas';
    }

    if (lambdaValue >= 3 && [1, 2, 3, 4, 6, 10].includes(regime)) {
      return '4-4';
    }

    return '4-5';
  }

  route4_6() {
    const deflectionNeeded = appState.getFlag('DEFLECTION_NEEDED');
    if (deflectionNeeded) {
      return '4-6-results';
    }
    return '4-7';
  }
}

const router = new Router();
export default router;