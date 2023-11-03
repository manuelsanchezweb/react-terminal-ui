import Terminal, {
  ColorMode,
  TerminalInput,
  TerminalOutput,
} from 'react-terminal-ui'
import confetti from 'canvas-confetti'
import { useCallback, useEffect, useState } from 'react'
import {
  TerminalOutputColored,
  TerminalOutputPartiallyColored,
} from './TerminalOutputColored'
import {
  files,
  fileContents,
  INITIAL_STATE,
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

/**
 * The TerminalController component provides an interactive terminal interface.
 * It supports commands for navigating a virtual file system and external links.
 */
export const TerminalUI = () => {
  const [colorMode, setColorMode] = useState(ColorMode.Dark)
  const [lineData, setLineData] = useState(INITIAL_STATE)
  const [flags, setFlags] = useState<string[]>([])

  // Initialize FLAGS from localStorage and set up a listener
  useEffect(() => {
    try {
      const savedFlags = localStorage.getItem('FLAGS')
      if (savedFlags) {
        setFlags(JSON.parse(savedFlags))
      }
    } catch (e) {
      console.error('Failed to parse flags from localStorage:', e)
    }
  }, [])

  useEffect(() => {
    if (flags.length === 0) return
    localStorage.setItem('FLAGS', JSON.stringify(flags))
  }, [flags])

  /**
   * Toggles the color mode between light and dark.
   */
  const toggleColorMode = useCallback(() => {
    setColorMode((prevMode) =>
      prevMode === ColorMode.Light ? ColorMode.Dark : ColorMode.Light
    )
  }, [])

  // Function to handle the submission of an answer
  const handleSubmission = useCallback(
    ({ answer, lineData }: { answer: string; lineData: JSX.Element[] }) => {
      console.log('these are the flags', flags)
      if (answer === 'manuel') {
        if (flags.includes('manuel')) {
          confetti()
          lineData.push(
            <TerminalOutput>
              Esta respuesta ya la habías acertado antes, pero toma un poquito
              de confetti.
            </TerminalOutput>
          )
        } else {
          confetti()
          lineData.push(
            <TerminalOutput>
              ¡Felicidades! Respuesta correcta enviada. &#128075;
            </TerminalOutput>
          )

          setFlags((prevFlags) => Array.from(new Set([...prevFlags, 'manuel'])))
        }
      } else if (answer === 'mark zuckerberg') {
        if (flags.includes('mark zuckerberg')) {
          confetti()
          lineData.push(
            <TerminalOutput>
              Esta respuesta ya la habías acertado antes, pero toma un poquito
              de confetti.
            </TerminalOutput>
          )
        } else {
          confetti()
          lineData.push(
            <TerminalOutputColored
              message="¡Felicidades, Facebookero! Respuesta correcta enviada."
              color="#ffce00"
            />
          )
          setFlags((prevFlags) =>
            Array.from(new Set([...prevFlags, 'mark zuckerberg']))
          )
        }
      } else {
        lineData.push(
          <TerminalOutput>
            Esa no es la respuesta correcta. Inténtalo de nuevo.
          </TerminalOutput>
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
        ld.push(
          <TerminalOutput>Estos son los comandos disponibles:</TerminalOutput>
        )
        ld.push(<TerminalOutput></TerminalOutput>)
        ld.push(
          TerminalOutputPartiallyColored({
            command: COMMAND_YB,
            description: ' abre mi canal de YouTube.',
            color: '#ce5023',
          }) as JSX.Element
        )
        ld.push(
          TerminalOutputPartiallyColored({
            command: COMMAND_GAME,
            description: ' abre el último juego que estoy desarrollando.',
            color: '#ce5023',
          }) as JSX.Element
        )
        ld.push(<TerminalOutput>---</TerminalOutput>)
        ld.push(
          TerminalOutputPartiallyColored({
            command: COMMAND_LS,
            description: ' lista los archivos en el directorio.',
            color: '#ce5023',
          }) as JSX.Element
        )
        ld.push(
          TerminalOutputPartiallyColored({
            command: 'ls -l',
            description: ' lista archivos uno a uno.',
            color: '#ce5023',
          }) as JSX.Element
        )
        ld.push(
          TerminalOutputPartiallyColored({
            command: COMMAND_LSLA,
            description: ' lista archivos uno a uno (también los ocultos).',
            color: '#ce5023',
          }) as JSX.Element
        )
        ld.push(
          TerminalOutputPartiallyColored({
            command: COMMAND_CAT,
            description: ' muestra el contenido de un archivo.',
            color: '#ce5023',
          }) as JSX.Element
        )
        ld.push(
          TerminalOutputPartiallyColored({
            command: COMMAND_CLEAR,
            description: ' limpia todo lo anterior.',
            color: '#ce5023',
          }) as JSX.Element
        )
        ld.push(
          TerminalOutputPartiallyColored({
            command: COMMAND_SUBMIT,
            description: ' envía una respuesta.',
            color: '#ce5023',
          }) as JSX.Element
        )
        ld.push(
          TerminalOutputPartiallyColored({
            command: COMMAND_SCORE,
            description: ' descubre tu puntuación actual.',
            color: '#ce5023',
          }) as JSX.Element
        )
        ld.push(
          TerminalOutputPartiallyColored({
            command: COMMAND_HELP,
            description: ' muestra los comandos disponibles.',
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
        ld.push(
          <TerminalOutput>
            Escribe help para ver los comandos disponibles.
          </TerminalOutput>
        )
        break
      case COMMAND_SCORE:
        // Display the current score based on the number of flags
        ld.push(
          <TerminalOutput>{`Total de puntos: ${flags.length}`}</TerminalOutput>
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
                message="¿Quién es esta persona? Escribe submit con tu respuesta."
                color="#fae89c"
              />
            )
          } else if (files.map((f) => f.toLowerCase()).includes(filename)) {
            // Check against normalized file names

            console.log('filename', filename)
            ld.push(
              <TerminalOutput>{`Mostrando el contenido de ${filename}:`}</TerminalOutput>
            )
            ld.push(
              // @ts-ignore
              <TerminalOutput>{fileContents[filename]}</TerminalOutput> // Display the content of the file
            )
          } else {
            ld.push(
              <TerminalOutput>{`Archivo no encontrado: ${filename}`}</TerminalOutput>
            )
          }
        } else {
          ld.push(
            <TerminalOutput>
              Este comando no es reconocido. Escribe 'help' para ver todos los
              comandos disponibles.
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
      <div className="flex flex-row-reverse p-2">
        <button
          className={btnClasses.join(' ')}
          onClick={() => toggleColorMode()}
        >
          Toggle {colorMode === ColorMode.Light ? 'Dark' : 'Light'} Mode
        </button>
      </div>
    </div>
  )
}
