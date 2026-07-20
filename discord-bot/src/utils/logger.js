/**
 * Logger Utility - Colored console output
 */

const c = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
};

function ts() {
  return new Date().toISOString().replace('T', ' ').split('.')[0];
}

export default {
  info: (msg, ...a) => console.log(`${c.cyan}[INFO]${c.reset} [${ts()}] ${msg}`, ...a),
  success: (msg, ...a) => console.log(`${c.green}[OK]${c.reset} [${ts()}] ${msg}`, ...a),
  warn: (msg, ...a) => console.log(`${c.yellow}[WARN]${c.reset} [${ts()}] ${msg}`, ...a),
  error: (msg, ...a) => console.log(`${c.red}[ERROR]${c.reset} [${ts()}] ${msg}`, ...a),
  bot: (msg, ...a) => console.log(`${c.magenta}[BOT]${c.reset} [${ts()}] ${msg}`, ...a),
  cmd: (name, user) => console.log(`${c.cyan}[CMD]${c.reset} [${ts()}] /${name} by ${user}`),
};
