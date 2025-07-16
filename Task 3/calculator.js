const display = document.getElementById('display');
let current = '0';
let operator = null;
let operand = null;
let resetNext = false;

function updateDisplay(val) {
  display.textContent = val;
}

function clearAll() {
  current = '0';
  operator = null;
  operand = null;
  resetNext = false;
  updateDisplay(current);
}

function inputNum(num) {
  if (resetNext) {
    current = num === '.' ? '0.' : num;
    resetNext = false;
  } else if (num === '.' && current.includes('.')) {
    return;
  } else if (current === '0' && num !== '.') {
    current = num;
  } else {
    current += num;
  }
  updateDisplay(current);
}

function inputOp(op) {
  if (operator && !resetNext) {
    compute();
  }
  operand = parseFloat(current);
  operator = op;
  resetNext = true;
}

function compute() {
  if (operator && operand !== null) {
    let result;
    const curr = parseFloat(current);
    switch (operator) {
      case '+': result = operand + curr; break;
      case '-': result = operand - curr; break;
      case '*': result = operand * curr; break;
      case '/': result = curr === 0 ? 'Error' : operand / curr; break;
      case '%': result = operand % curr; break;
      default: result = curr;
    }
    current = (result === 'Error') ? 'Error' : parseFloat(result.toFixed(10)).toString();
    operator = null;
    operand = null;
    resetNext = true;
    updateDisplay(current);
  }
}

function backspace() {
  if (resetNext || current === 'Error') {
    clearAll();
    return;
  }
  if (current.length > 1) {
    current = current.slice(0, -1);
  } else {
    current = '0';
  }
  updateDisplay(current);
}

function handleButton(e) {
  const key = e.target.dataset.key;
  if (!key) return;
  pressKey(key);
}

function pressKey(key) {
  if (display.textContent === 'Error' && key !== 'Escape') {
    clearAll();
  }
  if (key >= '0' && key <= '9') {
    inputNum(key);
  } else if (key === '.') {
    inputNum('.');
  } else if (['+', '-', '*', '/', '%'].includes(key)) {
    inputOp(key);
  } else if (key === 'Enter' || key === '=') {
    compute();
  } else if (key === 'Escape') {
    clearAll();
  } else if (key === 'Backspace') {
    backspace();
  }
  highlightButton(key);
}

function highlightButton(key) {
  const btn = document.querySelector(`[data-key="${key}"]`);
  if (btn) {
    btn.classList.add('active');
    setTimeout(() => btn.classList.remove('active'), 120);
  }
}

document.querySelectorAll('button[data-key]').forEach(btn => {
  btn.addEventListener('click', handleButton);
});

document.addEventListener('keydown', e => {
  let key = e.key;
  if (key === 'x' || key === 'X') key = '*';
  if (key === 'c' || key === 'C') key = 'Escape';
  if (key === 'Enter' || key === '=' || key === 'Escape' || key === 'Backspace' || key === '.' || (key >= '0' && key <= '9') || ['+', '-', '*', '/', '%'].includes(key)) {
    pressKey(key);
    e.preventDefault();
  }
});

clearAll();