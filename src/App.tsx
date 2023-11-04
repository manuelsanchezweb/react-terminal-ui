import GitHubCorner from './components/GitHubCorner'
import SVGPC from './components/SVGPC'
import { TerminalUI } from './components/TerminalUI'
import { useLanguageContext } from './ctx/LanguageContext'

function App() {
  const { data } = useLanguageContext()

  return (
    <div className="flex flex-col min-h-screen py-12">
      <GitHubCorner />
      <main className="flex flex-col items-center gap-6 justify-center mx-auto px-7 md:px-10 mt-auto">
        <div className="flex flex-col gap-4 max-w-[850px] w-full">
          <h1 className="text-3xl md:text-5xl font-semibold">
            {data.intro.title}
          </h1>

          <p>{data.intro.description}</p>
          <a
            href="https://codember.dev/"
            rel="nofollow noopener"
            target="_blank"
          >
            {data.intro.subtitle}
          </a>
        </div>
        <div className="hidden md:block">
          <TerminalUI />
        </div>
        <div className="flex flex-col items-center gap-4 md:hidden">
          <p> {data.intro.appResponsiveness}</p>
          <SVGPC classExtra="w-52 h-52" />
        </div>
      </main>
      <footer className="flex mx-auto px-5 md:px-10 mt-auto">
        <a href="https://www.manuelsanchezweb.com"></a>
        {data.footer} manuelsanchezweb
      </footer>
    </div>
  )
}

export default App
