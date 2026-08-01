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
  const [loadingComplete, setLoadingComplete] = useState(false)
  const [result, setResult] = useState(null)
  const [uploadedImage, setUploadedImage] = useState(null)
  const resultsRef = useRef(null)
  const uploadKey = useRef(0)

  const handleAnalyze = async ({ file, preview, weatherEnabled, coords }) => {
    console.log('[App] weatherToggle value:', weatherEnabled)
    console.log('[App] coords:', coords)

    setAnalyzing(true)
    setLoadingComplete(false)
    setResult(null)
    setUploadedImage(preview || null)

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

    // Trigger 100% completion fill on progress bar as soon as API response is ready
    setLoadingComplete(true)

    // Allow 300ms for progress bar to hit 100% smoothly before dismissing modal
    setTimeout(() => {
      setAnalyzing(false)
      setResult(data)
      requestAnimationFrame(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      })
    }, 300)
  }

  const handleReset = () => {
    setResult(null)
    setUploadedImage(null)
    setLoadingComplete(false)
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
          <VeinDivider flip />
          <HowItWorks />
          <VeinDivider />
          <UploadSection key={uploadKey.current} onAnalyze={handleAnalyze} analyzing={analyzing} />

          <AnimatePresence>
            {analyzing && <LoadingState isComplete={loadingComplete} />}
          </AnimatePresence>

          <AnimatePresence>
            {result && (
              <>
                <VeinDivider flip />
                <ResultsSection
                  ref={resultsRef}
                  result={result}
                  uploadedImage={uploadedImage}
                  onReset={handleReset}
                />
              </>
            )}
          </AnimatePresence>
        </main>
        <Footer />
      </div>
    </ClickSpark>
  )
}
