/**
 * Numbers of decimal digits to round to
 */
const scale = 3;

/**
 * Calculate the score awarded when having a certain percentage on a list level
 * @param {Number} rank Position on the list
 * @param {Number} percent Percentage of completion
 * @param {Number} minPercent Minimum percentage required
 * @returns {Number}
 */
export function score(rank, percent, minPercent) {
    if (rank > 150) {
        return 0;
    }
    if (rank > 75 && percent < 100) {
        return 0;
    }

    // Old formula
    /*
    let score = (100 / Math.sqrt((rank - 1) / 50 + 0.444444) - 50) *
        ((percent - (minPercent - 1)) / (100 - (minPercent - 1)));
    */
    // New formula
const r = Number(rank);
const p = Number.isFinite(Number(percent)) ? Number(percent) : 100;
const m = Number.isFinite(Number(minPercent)) ? Number(minPercent) : 100;

if (!Number.isFinite(r)) {
  return 0;
}

// Evita valores negativos e divisão inválida
const base = -24.9975 * Math.pow(Math.max(0, r - 1), 0.4) + 200;
const denom = 100 - (m - 1);

if (denom <= 0) {
  return 0;
}

let rawScore = base * ((p - (m - 1)) / denom);

if (!Number.isFinite(rawScore)) {
    return 0;
}

// Se não for 100%, aplica penalidade
if (p !== 100) {
    return Math.max(round(rawScore - rawScore / 3), 0);
}

// 100% → score cheio
return Math.max(round(rawScore), 0);
}

export function round(num) {
    if (!('' + num).includes('e')) {
        return +(Math.round(num + 'e+' + scale) + 'e-' + scale);
    } else {
        var arr = ('' + num).split('e');
        var sig = '';
        if (+arr[1] + scale > 0) {
            sig = '+';
        }
        return +(
            Math.round(+arr[0] + 'e' + sig + (+arr[1] + scale)) +
            'e-' +
            scale
        );
    }
}
