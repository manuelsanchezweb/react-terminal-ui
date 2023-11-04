// @ts-nocheck
import { TerminalOutput } from 'react-terminal-ui'

// Type for the terminal output with colored command
type TerminalOutputColoredProps = {
  command: string
  description: string
  color: string
}
// Component for colored terminal outputs
export const TerminalOutputPartiallyColored: React.FC<
  TerminalOutputColoredProps
> = ({ command, description, color }) => (
  // tslint:disable-next-line
  <TerminalOutput>
    <span style={{ color }}>{`${command}`}</span> {description}
  </TerminalOutput>
)

/**
 *
 * @param message  - The message to be displayed in the terminal.
 * @param color - The color of the message.
 * @returns  A terminal output with the message in the specified color.
 */
export const TerminalOutputColored = ({
  message,
  color,
}: {
  message: string
  color: string
}) => {
  return (
    <TerminalOutput>
      <span style={{ color }}>{message}</span>
    </TerminalOutput>
  )
}
