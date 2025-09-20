// Scientific Calculator Logic

const display = document.getElementById('display');
const history = document.getElementById('history');
const buttons = document.querySelectorAll('.btn');

// Degree/Radian mode
let isDegree = true;
// Add a toggle button dynamically if not present
let modeBtn = document.getElementById('mode-toggle');
if (!modeBtn) {
	// Create a wrapper for better alignment
	const toggleWrapper = document.createElement('div');
	toggleWrapper.className = 'calculator-toggle';
	modeBtn = document.createElement('button');
	modeBtn.id = 'mode-toggle';
	modeBtn.textContent = 'DEG';
	toggleWrapper.appendChild(modeBtn);
	document.querySelector('.calculator').insertBefore(toggleWrapper, document.querySelector('.calculator-display').nextSibling);
}
modeBtn.addEventListener('click', () => {
	isDegree = !isDegree;
	modeBtn.textContent = isDegree ? 'DEG' : 'RAD';
});

let current = '';
let memory = 0;
let lastResult = '';
let error = false;

function updateDisplay(val) {
	display.textContent = val || '0';
}

function updateHistory(val) {
	history.textContent = val || '';
}

function safeEval(expr) {
	// Replace constants
	expr = expr.replace(/π/g, Math.PI)
			   .replace(/e/g, Math.E);
	// Pretty reciprocal token to evaluable form
	expr = expr.replace(/⁻¹/g, '^(-1)');
	// Normalize Unicode minus (U+2212) to ASCII hyphen
	expr = expr.replace(/\u2212/g, '-');
	// Remove all whitespace to avoid parsing issues (e.g., 2 ^ ( -1 ))
	expr = expr.replace(/\s+/g, '');
	// Replace trigonometric functions with degree/radian support
	expr = expr.replace(/(sin|cos|tan)\(([^\)]+)\)/g, (m, fn, arg) => {
		if (isDegree) {
			return `Math.${fn}((${arg})*Math.PI/180)`;
		} else {
			return `Math.${fn}(${arg})`;
		}
	});
	expr = expr.replace(/(arcsin|arccos|arctan)\(([^\)]+)\)/g, (m, fn, arg) => {
		let jsFn = fn.replace('arc', 'a');
		if (isDegree) {
			return `(Math.${jsFn}(${arg})*180/Math.PI)`;
		} else {
			return `Math.${jsFn}(${arg})`;
		}
	});
	// Nth-root parsing: nⁿ√x => Math.pow(x,1/n)
	// Supports n as number/decimal/negatives or parenthesized; x as number or parenthesized expr
	expr = expr.replace(/(\([^()]+\)|-?\d*\.?\d+)ⁿ√\s*(\([^()]*\)|-?\d*\.?\d+)/g, (m, n, x) => {
		return `Math.pow(${x},1/${n})`;
	});
	// If user typed just ⁿ√x without a leading n, treat as square root by default
	expr = expr.replace(/ⁿ√\s*(\([^()]*\)|-?\d*\.?\d+)/g, (m, x) => `Math.sqrt(${x})`);
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
	if (error) {
		current = '';
		error = false;
		updateDisplay(current);
	}
	switch(action) {
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
		case 'sin': case 'cos': case 'tan': case 'arcsin': case 'arccos': case 'arctan':
		case 'log': case 'ln':
			current += action + '(';
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
        case 'nthroot':
			current += 'ⁿ√';
			updateDisplay(current);
			break;    
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
