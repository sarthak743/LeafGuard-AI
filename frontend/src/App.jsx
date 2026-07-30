import { useRef, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import Features from './components/Features.jsx'
import HowItWorks from './components/HowItWorks.jsx'
import UploadSection from './components/UploadSection.jsx'
import LoadingState from './components/LoadingState.jsx'
import ResultsSection from './components/results/ResultsSection.jsx'
import Footer from './components/Footer.jsx'
import VeinDivider from './components/ui/VeinDivider.jsx'
import placeholderResult from './data/placeholderResult.json'

export default function App() {
  const [analyzing, setAnalyzing] = useState(false)
  const [result, setResult] = useState(null)
  const resultsRef = useRef(null)
  const uploadKey = useRef(0)

  // Replace this with the real FastAPI request. Build a FormData with the
  // image file (+ lat/lng if weatherEnabled) and POST it to your backend,
  // then setResult(await response.json()).
  const handleAnalyze = ({ file, weatherEnabled }) => {
    setAnalyzing(true)
    setResult(null)

    setTimeout(() => {
      const data = JSON.parse(JSON.stringify(placeholderResult))
      if (!weatherEnabled) {
        delete data.weather
        delete data.weather_advisory
      }
      setAnalyzing(false)
      setResult(data)
      requestAnimationFrame(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      })
    }, 2600)
  }

  const handleReset = () => {
    setResult(null)
    uploadKey.current += 1
    document.getElementById('upload')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="relative">
      <Navbar />
      <main>
        <Hero />
        <VeinDivider />
        <Features />
        <HowItWorks />
        <VeinDivider flip />
        <UploadSection key={uploadKey.current} onAnalyze={handleAnalyze} analyzing={analyzing} />

        <AnimatePresence>{analyzing && <LoadingState />}</AnimatePresence>

        <AnimatePresence>
          {result && <ResultsSection ref={resultsRef} result={result} onReset={handleReset} />}
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  )
}
