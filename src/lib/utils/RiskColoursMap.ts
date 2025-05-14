// src/lib/RiskColoursMap.ts
import type {Risk} from '../types/Risk';
import type {RiskScore} from "$lib/types/RiskScore";

export class RiskColoursMap {
  private static readonly STATUS_COLOURS = {
    empty: '#3B75B0',
    not: '#FFC7CD',
    partial: '#FFEB9C',
    fully: '#C6EFCD',
  };

  private static readonly COLOURS = {
    empty: '#3B75B0',
    low: '#41AC94',
    mid: '#FEBC03',
    high: '#EA5265',
    severe: '#494854',
  };

  static getScoreColour(score: RiskScore): string {
    if (score.isIncomplete()) return this.COLOURS.empty;
    if (score.isLow()) return this.COLOURS.low;
    if (score.isModerate()) return this.COLOURS.mid;
    if (score.isHigh()) return this.COLOURS.high;
    if (score.isSevere()) return this.COLOURS.severe;
    return this.COLOURS.empty;
  }

  static getStatusColour(risk: Risk): string {
    if (risk.status === null || risk.status === 'Not Implemented') return this.STATUS_COLOURS.not;
    if (risk.status === 'Partially Implemented') return this.STATUS_COLOURS.partial;
    if (risk.status === 'Fully Implemented') return this.STATUS_COLOURS.fully;
    return this.COLOURS.empty;
  }

  static getAxisColour(grade: number): string {
    if (grade == 0) return this.COLOURS.empty;
    // Clamp grade to 1-5 range
    const clampedGrade = Math.max(1, Math.min(5, grade));

    // Define control points
    const points = [
      {value: 1, color: [180, 216, 169]}, // #B6D8A9
      {value: 2.5, color: [254, 242, 203]}, // #FEF2CB
      {value: 5, color: [244, 119, 117]}, // #F47775
    ];

    // Find the segment
    let start = points[0];
    let end = points[points.length - 1];
    for (let i = 1; i < points.length; i++) {
      if (clampedGrade <= points[i].value) {
        start = points[i - 1];
        end = points[i];
        break;
      }
    }

    // Linear interpolation
    const t = (clampedGrade - start.value) / (end.value - start.value);
    const r = Math.round(start.color[0] + t * (end.color[0] - start.color[0]));
    const g = Math.round(start.color[1] + t * (end.color[1] - start.color[1]));
    const b = Math.round(start.color[2] + t * (end.color[2] - start.color[2]));

    // Convert to hex
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).padStart(6, '0')}`;
  }

  // Function to compute luminance and determine font color
  static getContrastColorBW(hexColor: string): string {
    // Remove # if present
    const hex = hexColor.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    // Relative luminance formula
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    // Use white for dark backgrounds, black for light
    return luminance > 0.5 ? '#000000' : '#ffffff';
  }

  // Function to compute luminance and determine font color
  static getContrastColor(hexColor: string): string {
    const hex = hexColor.replace('#', '');
    if (hex.toUpperCase() === 'EA5265') {
      console.log(`inputColour: #${hex} -> outputColour: #000000`);
      return '#000000';
    }
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    const rN = r / 255, gN = g / 255, bN = b / 255;
    const max = Math.max(rN, gN, bN);
    const min = Math.min(rN, gN, bN);
    let h = 0, s = 0, l = (max + min) / 2;
    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case rN: h = (gN - bN) / d + (gN < bN ? 6 : 0); break;
        case gN: h = (bN - rN) / d + 2; break;
        case bN: h = (rN - gN) / d + 4; break;
      }
      h /= 6;
    }
    const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
    h = (h * 360 + (luminance > 128 ? 150 : 210)) % 360;
    s = Math.min(1, s + 0.4);
    l = luminance > 128 ? 0.2 : 0.8;
    s *= 100;
    l *= 100;
    const c = (1 - Math.abs(2 * (l / 100) - 1)) * (s / 100);
    const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
    const m = (l / 100) - (c / 2);
    let rF = 0, gF = 0, bF = 0;
    if (h < 60) { rF = c; gF = x; bF = 0; }
    else if (h < 120) { rF = x; gF = c; bF = 0; }
    else if (h < 180) { rF = 0; gF = c; bF = x; }
    else if (h < 240) { rF = 0; gF = x; bF = c; }
    else if (h < 300) { rF = x; gF = 0; bF = c; }
    else { rF = c; gF = 0; bF = x; }
    rF = Math.round((rF + m) * 255);
    gF = Math.round((gF + m) * 255);
    bF = Math.round((bF + m) * 255);
    const outputColour = `#${rF.toString(16).padStart(2, '0')}${gF.toString(16).padStart(2, '0')}${bF.toString(16).padStart(2, '0')}`;
    console.log(`inputColour: #${hex} -> outputColour: ${outputColour}`);
    return outputColour;
  }
}

