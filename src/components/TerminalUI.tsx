import Terminal, {
  ColorMode,
  TerminalInput,
  TerminalOutput,
} from 'react-terminal-ui'
import confetti from 'canvas-confetti'
import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  TerminalOutputColored,
  TerminalOutputPartiallyColored,
} from './TerminalOutputColored'
import {
  files,
  COMMAND_HELP,
  COMMAND_YB,
  COMMAND_GAME,
  COMMAND_LS,
  COMMAND_CAT,
  COMMAND_CLEAR,
  COMMAND_SUBMIT,
  COMMAND_LSLA,
  COMMAND_SCORE,
  filesPlusSecret,
} from './data'
import { greenBtnClick, redBtnClick, yellowBtnClick } from './buttons'
import { LanguageSelector } from './LanguageSelector'
import { useLanguageContext } from '../ctx/LanguageContext'
import { useColorMode } from '../hooks/useColorMode'
import { useFlags } from '../hooks/useFlags'

const MAX_NUMBER_SECRETS = 3

/**
 * The TerminalController component provides an interactive terminal interface.
 * It supports commands for navigating a virtual file system and external links.
 */
export const TerminalUI = () => {
  const { data, language } = useLanguageContext()
  const { colorMode, toggleColorMode } = useColorMode()
  const [flags, setFlags] = useFlags()

  const fileContents = {
    'test_01.txt': data.challenges.challenge2,
    'readme.md': data.challenges.challenge3,
  }

  /**
   * Initial state for the terminal which includes the welcome message and available commands.
   */
  const initialState = useMemo(
    () => [
      <TerminalOutput>{data.terminal.welcome}</TerminalOutput>,
      <TerminalOutput></TerminalOutput>,
      <TerminalOutput>{data.terminal.help}</TerminalOutput>,
    ],
    [language]
  )

  const [lineData, setLineData] = useState<JSX.Element[]>(initialState)

  // Update the lineData state whenever the initialState changes
  useEffect(() => {
    setLineData(initialState)
  }, [initialState])

  // Function to handle the submission of an answer
  const handleSubmission = useCallback(
    ({ answer, lineData }: { answer: string; lineData: JSX.Element[] }) => {
      console.log('these are the flags', flags)
      if (answer === 'manuel') {
        if (flags.includes('manuel')) {
          confetti()
          lineData.push(
            <TerminalOutput>
              {data.terminal.answers.alreadyRight}
            </TerminalOutput>
          )
        } else {
          confetti()
          lineData.push(
            <TerminalOutputColored
              message={data.terminal.answers.right}
              color="#ffce00"
            />
          )

          setFlags((prevFlags) => Array.from(new Set([...prevFlags, 'manuel'])))
        }
      } else if (answer === 'mark zuckerberg') {
        if (flags.includes('mark zuckerberg')) {
          confetti()
          lineData.push(
            <TerminalOutput>
              {data.terminal.answers.alreadyRight}
            </TerminalOutput>
          )
        } else {
          confetti()
          lineData.push(
            <TerminalOutputColored
              message={data.terminal.answers.right}
              color="#ffce00"
            />
          )
          setFlags((prevFlags) =>
            Array.from(new Set([...prevFlags, 'mark zuckerberg']))
          )
        }
      } else if (answer === 'alemania') {
        if (flags.includes('alemania')) {
          confetti()
          lineData.push(
            <TerminalOutput>
              {data.terminal.answers.alreadyRight}
            </TerminalOutput>
          )
        } else {
          confetti()
          lineData.push(
            <TerminalOutputColored
              message={data.terminal.answers.right}
              color="#ffce00"
            />
          )
          setFlags((prevFlags) =>
            Array.from(new Set([...prevFlags, 'alemania']))
          )
        }
      } else {
        lineData.push(
          <TerminalOutput>{data.terminal.answers.wrong}</TerminalOutput>
        )
      }
    },
    [flags]
  )

  /**
  /**
   * Handles the input command from the terminal and updates the output.
   * @param input - The command input by the user.
   */
  function onInput(input: string) {
    let ld = [...lineData]
    ld.push(<TerminalInput>{input}</TerminalInput>)
    const trimmedInput = input.toLocaleLowerCase().trim()

    const [command, ...params] = trimmedInput.split(' ')

    console.log(`Command: ${command}, Params: ${params}`)

    // Match the input with known commands and perform actions
    switch (command) {
      case 'submit':
        // Check if the answer parameter is 'sanchez'
        handleSubmission({
          answer: params.join(' '),
          lineData: ld as JSX.Element[],
        })
        break
      case COMMAND_HELP:
        // Append a help message to the terminal output
        ld.push(<TerminalOutput>{data.terminal.commands}</TerminalOutput>)
        ld.push(<TerminalOutput></TerminalOutput>)
        ld.push(
          TerminalOutputPartiallyColored({
            command: COMMAND_YB,
            description: data.terminal.commandList.yb,
            color: '#ce5023',
          }) as JSX.Element
        )
        ld.push(
          TerminalOutputPartiallyColored({
            command: COMMAND_GAME,
            description: data.terminal.commandList.game,
            color: '#ce5023',
          }) as JSX.Element
        )
        ld.push(<TerminalOutput>---</TerminalOutput>)
        ld.push(
          TerminalOutputPartiallyColored({
            command: COMMAND_LS,
            description: data.terminal.commandList.ls,
            color: '#ce5023',
          }) as JSX.Element
        )
        ld.push(
          TerminalOutputPartiallyColored({
            command: 'ls -l',
            description: data.terminal.commandList.lsl,
            color: '#ce5023',
          }) as JSX.Element
        )
        ld.push(
          TerminalOutputPartiallyColored({
            command: COMMAND_LSLA,
            description: data.terminal.commandList.lsla,
            color: '#ce5023',
          }) as JSX.Element
        )
        ld.push(
          TerminalOutputPartiallyColored({
            command: COMMAND_CAT,
            description: data.terminal.commandList.cat,
            color: '#ce5023',
          }) as JSX.Element
        )
        ld.push(
          TerminalOutputPartiallyColored({
            command: COMMAND_CLEAR,
            description: data.terminal.commandList.clear,
            color: '#ce5023',
          }) as JSX.Element
        )
        ld.push(
          TerminalOutputPartiallyColored({
            command: COMMAND_SUBMIT,
            description: data.terminal.commandList.submit,
            color: '#ce5023',
          }) as JSX.Element
        )
        ld.push(
          TerminalOutputPartiallyColored({
            command: COMMAND_SCORE,
            description: data.terminal.commandList.score,
            color: '#ce5023',
          }) as JSX.Element
        )
        ld.push(
          TerminalOutputPartiallyColored({
            command: COMMAND_HELP,
            description: data.terminal.commandList.help,
            color: '#ce5023',
          }) as JSX.Element
        )
        break
      case COMMAND_YB:
        window.open(
          'https://www.youtube.com/channel/UCX3IE_OjG20p_AwbX06YAEg',
          '_blank'
        )
        break
      case COMMAND_GAME:
        window.open('https://ts-rpg-game.vercel.app/', '_blank')
        break
      case COMMAND_CLEAR:
        ld = []
        ld.push(<TerminalOutput>{data.terminal.help}</TerminalOutput>)
        break
      case COMMAND_SCORE:
        // Display the current score based on the number of flags
        ld.push(
          <TerminalOutput>{`${flags.length}/${MAX_NUMBER_SECRETS} ${data.terminal.messages.secretsFound}`}</TerminalOutput>
        )
        break
      case COMMAND_LS:
        if (params[0] === '-l') {
          files.forEach((file) => {
            ld.push(<TerminalOutput>{file}</TerminalOutput>)
          })
          break
        }

        if (params[0] === '-la') {
          filesPlusSecret.forEach((file) => {
            ld.push(<TerminalOutput>{file}</TerminalOutput>)
          })
          break
        }

        if (!params[0]) {
          ld.push(<TerminalOutput>{files.join(' ')}</TerminalOutput>)
          break
        }

      default:
        // Handle 'cat' command or unknown commands
        if (trimmedInput.startsWith('cat')) {
          console.log('trimmedInput', trimmedInput)
          const filename = trimmedInput.split(' ')[1].toLowerCase() // Normalize the case

          if (filename === '.secret.png') {
            // Simulate displaying an image in the terminal
            ld.push(
              <TerminalOutput>
                <img src="/secret.png" alt="Secret Image" />
              </TerminalOutput>
            )
            ld.push(<TerminalOutput></TerminalOutput>)
            ld.push(
              <TerminalOutputColored
                message={data.challenges.challenge1}
                color="#fae89c"
              />
            )
          } else if (files.map((f) => f.toLowerCase()).includes(filename)) {
            // Check against normalized file names

            console.log('filename', filename)
            ld.push(
              <TerminalOutput>{`${data.terminal.messages.showing}${filename}:`}</TerminalOutput>
            )
            ld.push(
              // @ts-ignore
              <TerminalOutput>{fileContents[filename]}</TerminalOutput>
            )
          } else {
            ld.push(
              <TerminalOutput>{`${data.terminal.messages.notFound} ${filename}`}</TerminalOutput>
            )
          }
        } else {
          ld.push(
            <TerminalOutput>
              {`Comando no reconocido: '${command}'. ${data.terminal.help}`}
            </TerminalOutput>
          )
        }
        break
    }
    setLineData(ld)
  }

  // Determine button classes based on the current color mode
  const btnClasses = [
    'btn',
    colorMode === ColorMode.Light ? 'btn-dark' : 'btn-light',
  ]

  return (
    <>
      <div className="w-screen lg:max-w-[750px] px-5">
        <div className="text-left">
          <Terminal
            name="React Terminal UI"
            colorMode={colorMode}
            onInput={onInput}
            redBtnCallback={redBtnClick}
            yellowBtnCallback={yellowBtnClick}
            greenBtnCallback={greenBtnClick}
          >
            {lineData}
          </Terminal>
        </div>
        <div className="flex flex-row-reverse w-full justify-between p-2">
          <LanguageSelector />
          <button
            className={btnClasses.join(' ')}
            onClick={() => toggleColorMode()}
          >
            {data.settings.switcherMode}
          </button>
        </div>
      </div>
    </>
  )
}
