import { useCallback, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { UploadCloud, ImageUp, X, CloudSun, MapPin, ScanLine } from 'lucide-react'
import SectionHeading from './ui/SectionHeading.jsx'

export default function UploadSection({ onAnalyze, analyzing }) {
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [dragging, setDragging] = useState(false)
  const [weatherEnabled, setWeatherEnabled] = useState(false)
  const [locationStatus, setLocationStatus] = useState('idle') // idle | requesting | granted | denied
  const inputRef = useRef(null)

  const handleFiles = useCallback((files) => {
    const f = files?.[0]
    if (!f || !f.type.startsWith('image/')) return
    setFile(f)
    setPreview(URL.createObjectURL(f))
  }, [])

  const onDrop = (e) => {
    e.preventDefault()
    setDragging(false)
    handleFiles(e.dataTransfer.files)
  }

  const removeImage = () => {
    setFile(null)
    setPreview(null)
  }

  const toggleWeather = () => {
    const next = !weatherEnabled
    setWeatherEnabled(next)
    if (next && locationStatus === 'idle') {
      setLocationStatus('requesting')
      if (!navigator.geolocation) {
        setLocationStatus('denied')
        return
      }
      navigator.geolocation.getCurrentPosition(
        () => setLocationStatus('granted'),
        () => setLocationStatus('denied'),
        { timeout: 8000 }
      )
    }
  }

  const canAnalyze = !!file && !analyzing

  return (
    <section id="upload" className="relative py-24 md:py-32 bg-canopy/50">
      <div className="mx-auto max-w-4xl px-6 md:px-10">
        <SectionHeading
          eyebrow="Diagnose"
          title="Upload your leaf photo"
          description="Clear, well-lit, close-up shots of the affected area give the most accurate diagnosis."
        />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="rounded-xl2 bg-white shadow-card border border-black/5 p-6 md:p-10"
        >
          <AnimatePresence mode="wait">
            {!preview ? (
              <motion.div
                key="dropzone"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onDragOver={(e) => {
                  e.preventDefault()
                  setDragging(true)
                }}
                onDragLeave={() => setDragging(false)}
                onDrop={onDrop}
                className={`relative flex flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed px-6 py-16 text-center transition-colors duration-300 ${
                  dragging ? 'border-primary bg-canopy' : 'border-primary/25 bg-bg'
                }`}
              >
                <motion.div
                  animate={{ y: dragging ? -6 : 0 }}
                  className="grid place-items-center h-16 w-16 rounded-full bg-canopy text-primary"
                >
                  <UploadCloud size={28} />
                </motion.div>
                <div>
                  <p className="font-semibold text-ink">Drag & drop your leaf image here</p>
                  <p className="text-sm text-ink/50 mt-1">PNG or JPG, up to 10MB</p>
                </div>
                <button
                  onClick={() => inputRef.current?.click()}
                  className="inline-flex items-center gap-2 rounded-full border border-primary/30 px-5 py-2.5 text-sm font-semibold text-primary hover:bg-primary hover:text-white transition-colors duration-300"
                >
                  <ImageUp size={16} /> Browse files
                </button>
                <input
                  ref={inputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleFiles(e.target.files)}
                />
              </motion.div>
            ) : (
              <motion.div
                key="preview"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                className="relative"
              >
                <div className="relative overflow-hidden rounded-2xl bg-bg">
                  <img src={preview} alt="Leaf preview" className="w-full max-h-96 object-contain" />
                  {analyzing && (
                    <motion.div
                      initial={{ y: '-100%' }}
                      animate={{ y: '100%' }}
                      transition={{ duration: 1.8, repeat: Infinity, ease: 'linear' }}
                      className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-primary/0 via-primary/25 to-primary/0"
                    />
                  )}
                  <button
                    onClick={removeImage}
                    disabled={analyzing}
                    className="absolute top-3 right-3 grid place-items-center h-9 w-9 rounded-full bg-white/90 text-ink shadow-soft hover:bg-white disabled:opacity-40 transition-colors"
                    aria-label="Remove image"
                  >
                    <X size={16} />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Weather toggle */}
          <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-2xl bg-bg border border-black/5 px-5 py-4">
            <div className="flex items-start gap-3">
              <span className="grid place-items-center h-10 w-10 rounded-full bg-canopy text-primary shrink-0">
                <CloudSun size={18} />
              </span>
              <div>
                <p className="font-medium text-ink text-sm">Include weather-based disease advisory</p>
                <p className="text-xs text-ink/50 mt-0.5 flex items-center gap-1">
                  {locationStatus === 'requesting' && 'Requesting location permission…'}
                  {locationStatus === 'granted' && (
                    <>
                      <MapPin size={12} className="text-primary" /> Location shared — advisory will be included
                    </>
                  )}
                  {locationStatus === 'denied' && 'Location denied — continuing with image analysis only'}
                  {locationStatus === 'idle' && 'Uses your device location, nothing typed by hand'}
                </p>
              </div>
            </div>

            <button
              role="switch"
              aria-checked={weatherEnabled}
              onClick={toggleWeather}
              className={`relative h-7 shrink-0 rounded-full transition-colors duration-300 ${
                weatherEnabled ? 'bg-primary' : 'bg-black/15'
              }`}
              style={{ width: '52px' }}
            >
              <motion.span
                layout
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                className="absolute top-1 h-5 w-5 rounded-full bg-white shadow"
                style={{ left: weatherEnabled ? '28px' : '4px' }}
              />
            </button>
          </div>

          <motion.button
            whileTap={{ scale: 0.97 }}
            disabled={!canAnalyze}
            onClick={() =>
              onAnalyze({
                file,
                weatherEnabled: weatherEnabled && locationStatus === 'granted',
              })
            }
            className="group mt-8 w-full inline-flex items-center justify-center gap-2 rounded-full bg-primary py-4 text-base font-semibold text-white shadow-soft hover:shadow-lift hover:bg-primary-dark disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:shadow-soft transition-all duration-300"
          >
            <ScanLine size={20} className="group-hover:rotate-6 transition-transform" />
            {analyzing ? 'Analyzing…' : 'Analyze Leaf'}
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
