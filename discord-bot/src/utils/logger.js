/**
 * Logger Utility
 * Színes konzol naplózás
 */

const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  
  // Színek
  black: '\x1b[30m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
  
  // Background
  bgBlack: '\x1b[40m',
  bgRed: '\x1b[41m',
  bgGreen: '\x1b[42m',
  bgYellow: '\x1b[43m',
  bgBlue: '\x1b[44m',
  bgMagenta: '\x1b[45m',
  bgCyan: '\x1b[46m',
  bgWhite: '\x1b[47m',
};

class Logger {
  getTimestamp() {
    return new Date().toISOString().replace('T', ' ').split('.')[0];
  }

  info(message, ...args) {
    console.log(
      `${colors.cyan}[INFO]${colors.reset} ${colors.white}[${this.getTimestamp()}]${colors.reset} ${message}`,
      ...args
    );
  }

  success(message, ...args) {
    console.log(
      `${colors.green}[SUCCESS]${colors.reset} ${colors.white}[${this.getTimestamp()}]${colors.reset} ${message}`,
      ...args
    );
  }

  warn(message, ...args) {
    console.log(
      `${colors.yellow}[WARN]${colors.reset} ${colors.white}[${this.getTimestamp()}]${colors.reset} ${message}`,
      ...args
    );
  }

  error(message, ...args) {
    console.log(
      `${colors.red}[ERROR]${colors.reset} ${colors.white}[${this.getTimestamp()}]${colors.reset} ${message}`,
      ...args
    );
  }

  debug(message, ...args) {
    console.log(
      `${colors.magenta}[DEBUG]${colors.reset} ${colors.white}[${this.getTimestamp()}]${colors.reset} ${message}`,
      ...args
    );
  }

  bot(message, ...args) {
    console.log(
      `${colors.bright}${colors.magenta}[BOT]${colors.reset} ${colors.white}[${this.getTimestamp()}]${colors.reset} ${message}`,
      ...args
    );
  }

  command(commandName, user) {
    console.log(
      `${colors.cyan}[COMMAND]${colors.reset} ${colors.white}[${this.getTimestamp()}]${colors.reset} ${colors.yellow}${commandName}${colors.reset} executed by ${colors.magenta}${user}${colors.reset}`
    );
  }
}

export default new Logger();
