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

let score = base * ((p - (m - 1)) / denom);

// Garante número válido
if (!Number.isFinite(score)) {
  return 0;
}

return Math.max(0, score);


    if (percent != 100) {
        return round(score - score / 3);
    }

    return Math.max(round(score), 0);
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
