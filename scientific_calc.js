// Scientific Calculator Logic

const display = document.getElementById('display');
const history = document.getElementById('history');
const buttons = document.querySelectorAll('.btn');
const powerButton = document.querySelector('[data-action="power"]');

// Degree/Radian mode via radio buttons
let isDegree = true;
const degRadio = document.getElementById('deg-radio');
const radRadio = document.getElementById('rad-radio');
if (degRadio && radRadio) {
	isDegree = degRadio.checked;
	const syncRadios = () => { degRadio.checked = isDegree; radRadio.checked = !isDegree; };
	degRadio.addEventListener('change', () => {
		if (!powered) { syncRadios(); return; }
		if (degRadio.checked) isDegree = true;
	});
	radRadio.addEventListener('change', () => {
		if (!powered) { syncRadios(); return; }
		if (radRadio.checked) isDegree = false;
	});
}

let current = '';
let memory = 0;
let lastResult = '';
let error = false;
let powered = true;

function updateDisplay(val) {
	if (!powered) { display.textContent = ''; return; }
	display.textContent = (val === '' || val == null) ? '0' : String(val);
}

function updateHistory(val) {
	history.textContent = val || '';
}

function safeEval(expr) {
	// Replace constants
	expr = expr.replace(/π/g, Math.PI)
			   .replace(/e/g, Math.E);
    // Pretty inverse trig tokens to canonical names before reciprocal mapping
    expr = expr.replace(/sin⁻¹/g, 'arcsin')
	    .replace(/cos⁻¹/g, 'arccos')
	    .replace(/tan⁻¹/g, 'arctan');
	// Pretty reciprocal token to evaluable form
	expr = expr.replace(/⁻¹/g, '^(-1)');
	// Normalize Unicode minus (U+2212) to ASCII hyphen
	expr = expr.replace(/\u2212/g, '-');
	// Remove all whitespace to avoid parsing issues (e.g., 2 ^ ( -1 ))
	expr = expr.replace(/\s+/g, '');
	// If functions are written without parentheses (e.g., sin30, log10), wrap immediate numeric/constant arg
	expr = expr.replace(/\b(sin|cos|tan|arcsin|arccos|arctan|log|ln)(π|e|-?\d*\.?\d+)/g,
		(m, fn, arg) => `${fn}(${arg})`);
	// Replace trigonometric functions with degree/radian support
	expr = expr.replace(/(sin|cos|tan)\(([^\)]+)\)/g, (m, fn, arg) => {
		if (isDegree) {
			return `Math.${fn}((${arg})*Math.PI/180)`;
		} else {
			return `Math.${fn}(${arg})`;
		}
	});
	expr = expr.replace(/(arcsin|arccos|arctan)\(([^\)]+)\)/g, (m, fn, arg) => {
		let jsFn = fn.replace('arcsin', 'asin').replace('arccos', 'acos').replace('arctan', 'atan');
		if (isDegree) {
			return `(Math.${jsFn}(${arg})*180/Math.PI)`;
		} else {
			return `Math.${jsFn}(${arg})`;
		}
	});
	// Fix for cbrt and sqrt with possible whitespace or nested expressions
	expr = expr.replace(/³√\s*(\([^)]*\)|\d+(\.\d+)?)/g, (m, arg) => `Math.cbrt(${arg})`);
	expr = expr.replace(/√\s*(\([^)]*\)|\d+(\.\d+)?)/g, (m, arg) => `Math.sqrt(${arg})`);
	// Log replacements
	expr = expr.replace(/log\(/g, 'Math.log10(');
	expr = expr.replace(/ln\(/g, 'Math.log(');
	// Factorial
	expr = expr.replace(/(\d+)!/g, (m, n) => factorial(Number(n)));
	// Powers: convert a^b to Math.pow(a,b), supporting parentheses/decimals/negatives
	// Do multiple passes to catch nested patterns
	for (let i = 0; i < 3; i++) {
		expr = expr.replace(/(\([^()]+\)|[\d.]+)\^(-?\d*\.?\d+|\([^()]+\))/g,
			(m, base, exp) => `Math.pow(${base},${exp})`);
	}
	return expr;
}

function factorial(n) {
	if (n < 0) return NaN;
	if (n === 0 || n === 1) return 1;
	let res = 1;
	for (let i = 2; i <= n; i++) res *= i;
	return res;
}

function handleButton(action) {
	if (!powered && action !== 'power') return;
	if (error) {
		current = '';
		error = false;
		updateDisplay(current);
	}
	switch(action) {
		case 'power': {
			powered = !powered;
			if (!powered) {
				current = '';
				updateHistory('');
				updateDisplay(''); // blank while off
			} else {
				updateDisplay(current || '0');
			}
			break;
		}
		case 'AC':
			current = '';
			lastResult = '';
			updateDisplay(current);
			updateHistory('');
			break;
		case 'C':
			current = current.slice(0, -1);
			updateDisplay(current);
			break;
		case '=':
			try {
				let expr = safeEval(current);
				let result = eval(expr);
				if (!isFinite(result)) throw new Error('Invalid');
				lastResult = result;
				updateDisplay(result);
				updateHistory(current + ' = ' + result);
				current = '' + result;
			} catch {
				updateDisplay('Error');
				error = true;
			}
			break;
		case 'MC':
			memory = 0;
			break;
		case 'MR':
			current += memory;
			updateDisplay(current);
			break;
		case 'M+':
			try {
				memory += Number(eval(safeEval(current)));
			} catch {}
			break;
		case 'M-':
			try {
				memory -= Number(eval(safeEval(current)));
			} catch {}
			break;
		case 'pi':
			current += 'π';
			updateDisplay(current);
			break;
		case 'e':
			current += 'e';
			updateDisplay(current);
			break;
		case 'sin': case 'cos': case 'tan':
		case 'log': case 'ln':
			current += action + ' ';
			updateDisplay(current);
			break;
		case 'arcsin':
			current += 'sin⁻¹ ';
			updateDisplay(current);
			break;
		case 'arccos':
			current += 'cos⁻¹ ';
			updateDisplay(current);
			break;
		case 'arctan':
			current += 'tan⁻¹ ';
			updateDisplay(current);
			break;
		case 'sqrt':
			current += '√';
			updateDisplay(current);
			break;
		case 'cbrt':
			current += '³√';
			updateDisplay(current);
			break;
		case 'pow2':
			current += '^2';
			updateDisplay(current);
			break;
		case 'pow3':
			current += '^3';
			updateDisplay(current);
			break;
		case 'pow':
			current += '^';
			updateDisplay(current);
			break;
		case 'inv':
			current += '⁻¹';
			updateDisplay(current);
			break;
		case 'fact':
			current += '!';
			updateDisplay(current);
			break;
		case 'percent':
			current += '/100';
			updateDisplay(current);
			break;
		case 'exp': {
			const needsMul = current && /[\d)πe!]$/.test(current);
			current += (needsMul ? '*10^' : '10^');
			updateDisplay(current);
			break;
		}
		case 'ans': {
			const ansVal = (lastResult === '' ? '0' : String(lastResult));
			const needsMul = current && /[\d)πe!]$/.test(current);
			current += (needsMul ? '*' : '') + ansVal;
			updateDisplay(current);
			break;
		}
		
		default:
			current += action;
			updateDisplay(current);
	}
}

buttons.forEach(btn => {
	btn.addEventListener('click', e => {
		handleButton(btn.getAttribute('data-action'));
	});
});

// Keyboard support
document.addEventListener('keydown', e => {
	if (!powered) {
		// Allow turning back on via Enter or 'o'/'O'
		if (e.key === 'Enter' || e.key.toLowerCase() === 'o') {
			handleButton('power');
		}
		return;
	}
	const keyMap = {
		'+': '+', '-': '-', '*': '*', '/': '/', '.': '.',
		'Enter': '=', '=': '=', 'Backspace': 'C', 'Delete': 'AC',
		'(': '(', ')': ')'
	};
	if (keyMap[e.key]) {
		handleButton(keyMap[e.key]);
	} else if (!isNaN(e.key)) {
		handleButton(e.key);
	}
});

// No disabling of buttons; interactions are ignored while powered off.
