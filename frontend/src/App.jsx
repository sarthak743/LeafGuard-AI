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
import ClickSpark from './components/effects/ClickSpark.jsx'
import placeholderResult from './data/placeholderResult.json'
import { uploadImage } from "./api/prediction.js"

export default function App() {
  const [analyzing, setAnalyzing] = useState(false)
  const [result, setResult] = useState(null)
  const resultsRef = useRef(null)
  const uploadKey = useRef(0)

  const handleAnalyze = async ({ file, weatherEnabled, coords }) => {
    console.log('[App] weatherToggle value:', weatherEnabled)
    console.log('[App] coords:', coords)

    setAnalyzing(true)
    setResult(null)

    const startTime = Date.now()
    const MIN_LOADING_TIME = 5000 // Enforce exactly 5.0 second loading duration

    let data = null

    try {
      const formData = new FormData()
      formData.append('file', file)
      if (weatherEnabled && coords?.latitude && coords?.longitude) {
        formData.append('latitude', coords.latitude)
        formData.append('longitude', coords.longitude)
      }

      data = await uploadImage(formData)

      console.log("FULL API RESPONSE:", data);
      console.log("Weather:", data.weather);
      console.log("Weather Advisory:", data.weather_advisory);

    } catch (err) {
      console.warn('[App] API fetch error (using fallback data):', err)
    }

    if (!data) {
      // Fallback data when backend is not running or request failed
      data = JSON.parse(JSON.stringify(placeholderResult))
      if (!weatherEnabled) {
        delete data.weather
        delete data.weather_advisory
      }
      console.log('[App] Fallback weather object:', data.weather)
      console.log('[App] Fallback weather_advisory object:', data.weather_advisory)
    }

    // Ensure total loading duration is approximately 6.5 seconds for a premium experience
    const elapsed = Date.now() - startTime
    const delay = Math.max(0, MIN_LOADING_TIME - elapsed)

    setTimeout(() => {
      setAnalyzing(false)
      setResult(data)
      requestAnimationFrame(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      })
    }, delay)
  }

  const handleReset = () => {
    setResult(null)
    uploadKey.current += 1
    document.getElementById('upload')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <ClickSpark>
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
    </ClickSpark>
  )
}

