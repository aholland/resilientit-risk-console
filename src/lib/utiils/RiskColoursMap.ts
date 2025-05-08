// src/lib/RiskColoursMap.ts
import type { Risk } from '../types/Risk';

export class RiskColoursMap {
  private static readonly STATUS_COLOURS = {
    empty: '#3B75B0',
    not: '#FFC7CD',
    partial: '#FFEB9C',
    fully: '#C6EFCD',
  };

  private static readonly COLOURS = {
    empty: '#3B75B0',
    low: '#6FAA45',
    mid: '#EE8830',
    high: '#FF0200',
  };

  static getColour(risk: Risk): string {
    if (risk.scoreEmpty()) return this.COLOURS.empty;
    if (risk.scoreIsHigh()) return this.COLOURS.high;
    if (risk.scoreIsMid()) return this.COLOURS.mid;
    if (risk.scoreIsLow()) return this.COLOURS.low;
    return this.COLOURS.empty;
  }

  static getStatusColour(risk: Risk): string {
    if (risk.status === null || risk.status === 'Not Implemented') return this.STATUS_COLOURS.not;
    if (risk.status === 'Partially Implemented') return this.STATUS_COLOURS.partial;
    if (risk.status === 'Fully Implemented') return this.STATUS_COLOURS.fully;
    return this.COLOURS.empty;
  }

  static getAxisColour(grade: number | null): string {
    if (grade === null) return this.COLOURS.empty;
    // Clamp grade to 1-5 range
    const clampedGrade = Math.max(1, Math.min(5, grade));

    // Define control points
    const points = [
      { value: 1, color: [180, 216, 169] }, // #B6D8A9
      { value: 2.5, color: [254, 242, 203] }, // #FEF2CB
      { value: 5, color: [244, 119, 117] }, // #F47775
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
}