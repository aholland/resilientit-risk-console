import type { Control } from './Control';

export class RiskScore {
  scale: number;
  likelihood: number;
  impact: number;

  constructor(likelihood: number, impact: number, scale: number) {
    this.scale = scale;
    this.likelihood = likelihood;
    this.impact = impact;
  }

  static score(likelihood: number, impact: number, scale: number): number {
    const n = scale;
    const x = impact;
    const y = likelihood;
    const diag = (x:number, y:number): number => x + y -1;
    const s = (x:number, y:number, d?: number): number => {
      const di = d ?? diag(x, y);
      return (di * (di - 1)) / 2 + x
    }
    const d = diag(x, y);
    return (d <= n) ? s(x,y,d) : n*n +1 - s(n+1-x,n+1-y);
  }

  value(): number {
    return this.isIncomplete() ? 0 : RiskScore.score(this.likelihood, this.impact, this.scale);
  }

  #upperBoundInclusive1(n: number): number {
    return n;
  }

  #upperBoundInclusive2(n: number): number {
    return Math.ceil((n * n) / 2);
  }

  #upperBoundInclusive3(n: number): number {
    return Math.ceil(n * n - n);
  }

  scoreInRange(lowerBoundInclusive: number, upperBoundInclusive: number): boolean {
    const score = this.value();
    return score ? (lowerBoundInclusive <= score && score <= upperBoundInclusive) : false;
  }

  isIncomplete(): boolean {
    return this.likelihood < 1  || this.impact < 1;
  }

  isLow(): boolean {
    return this.scoreInRange(Number.NEGATIVE_INFINITY, this.#upperBoundInclusive1(this.scale));
  }

  isModerate(): boolean {
    return this.scoreInRange(
      this.#upperBoundInclusive1(this.scale) + 1,
      this.#upperBoundInclusive2(this.scale)
    );
  }

  isHigh(): boolean {
    return this.scoreInRange(
      this.#upperBoundInclusive2(this.scale) + 1,
      this.#upperBoundInclusive3(this.scale)
    );
  }

  isSevere(): boolean {
    return this.scoreInRange(
      this.#upperBoundInclusive3(this.scale) + 1,
      Number.POSITIVE_INFINITY
    );
  }

  maxValue(): number {
    return this.scale^2;
  }
}