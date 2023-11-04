import GitHubCorner from './components/GitHubCorner'
import { TerminalUI } from './components/TerminalUI'
import { useLanguageContext } from './ctx/LanguageContext'

function App() {
  const { data } = useLanguageContext()

  return (
    <>
      <GitHubCorner />
      <main className="flex flex-col items-center gap-6 justify-center mx-auto">
        <div className="max-w-[850px] w-full">
          <h1>{data.intro.title}</h1>
          <a
            href="https://codember.dev/"
            rel="nofollow noopener"
            target="_blank"
          >
            {data.intro.subtitle}
          </a>
        </div>
        <TerminalUI />
      </main>
    </>
  )
}

export default App
