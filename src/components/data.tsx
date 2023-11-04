export const files = ['test_01.txt', 'README.md']
export const filesPlusSecret = [...files, '.secret.png 🔓']

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
