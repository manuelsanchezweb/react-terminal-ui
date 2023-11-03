import { TerminalOutput } from 'react-terminal-ui'

export const files = ['test_01.txt', 'README.md']
export const filesPlusSecret = [...files, '.secret.png 🔓']
export const fileContents = {
  'test_01.txt':
    '¿Cómo se llama el creador de esta app? Escribe "submit <respuesta>" para enviar tu respuesta.',
  'readme.md': 'This is the fake content of README.md.',
}

// Constants for terminal commands
/** Command to view the YouTube channel */
export const COMMAND_YB = 'view-yb'
/** Command to view the game */
export const COMMAND_GAME = 'view-game'
/** Command to clear the terminal */
export const COMMAND_CLEAR = 'clear'
/** Command to list files in the directory */
export const COMMAND_LS = 'ls'
/** Command to list files in the directory one per line */
export const COMMAND_LSLA = 'ls -la'
/** Command to show the content of a file */
export const COMMAND_CAT = 'cat <file>'
/** Command to display available commands */
export const COMMAND_HELP = 'help'
/** Command to display available commands */
export const COMMAND_SUBMIT = 'submit <answer>'
/** Command to retrieve amount of points */
export const COMMAND_SCORE = 'score'

/**
 * Initial state for the terminal which includes the welcome message and available commands.
 */
export const INITIAL_STATE = [
  <TerminalOutput>
    Bievenido a la terminal interactiva de msweb! &#128075;
  </TerminalOutput>,
  ,
  <TerminalOutput></TerminalOutput>,
  <TerminalOutput>
    Escribe 'help' para ver los comandos disponibles.
  </TerminalOutput>,
]
