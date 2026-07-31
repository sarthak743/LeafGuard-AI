import { useCallback, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { UploadCloud, ImageUp, X, CloudSun, MapPin, ScanLine, Sparkles, Check } from 'lucide-react'
import SectionHeading from './ui/SectionHeading.jsx'

const SAMPLE_IMAGES = [
  {
    id: 'sample-tomato-healthy',
    plant: 'Tomato',
    condition: 'Healthy',
    badgeColor: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20',
    image: '/sample-images/tomato-healthy.jpg',
  },
  {
    id: 'sample-pepper-spot',
    plant: 'Pepper',
    condition: 'Bacterial Spot',
    badgeColor: 'bg-amber-50 text-amber-700 ring-amber-600/20',
    image: '/sample-images/pepper-bacterial-spot.jpg',
  },
  {
    id: 'sample-potato-blight',
    plant: 'Potato',
    condition: 'Early Blight',
    badgeColor: 'bg-orange-50 text-orange-700 ring-orange-600/20',
    image: '/sample-images/potato-early-blight.jpg',
  },
  {
    id: 'sample-apple-scab',
    plant: 'Apple',
    condition: 'Apple Scab',
    badgeColor: 'bg-red-50 text-red-700 ring-red-600/20',
    image: '/sample-images/apple-scab.jpg',
  },
]

export default function UploadSection({ onAnalyze, analyzing }) {
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [selectedSampleId, setSelectedSampleId] = useState(null)
  const [dragging, setDragging] = useState(false)
  const [weatherEnabled, setWeatherEnabled] = useState(false)
  const [locationStatus, setLocationStatus] = useState('idle') // idle | requesting | granted | denied
  const [coords, setCoords] = useState(null)
  const inputRef = useRef(null)

  const handleFiles = useCallback((files) => {
    const f = files?.[0]
    if (!f || !f.type.startsWith('image/')) return
    setSelectedSampleId(null)
    setFile(f)
    setPreview(URL.createObjectURL(f))
  }, [])

  const selectSampleImage = async (sample) => {
    setSelectedSampleId(sample.id)
    setPreview(sample.image)
    try {
      const res = await fetch(sample.image)
      const blob = await res.blob()
      const sampleFile = new File([blob], `${sample.id}.jpg`, { type: 'image/jpeg' })
      setFile(sampleFile)
    } catch (err) {
      console.error('[UploadSection] Error converting sample image to File:', err)
    }
  }

  const onDrop = (e) => {
    e.preventDefault()
    setDragging(false)
    handleFiles(e.dataTransfer.files)
  }

  const removeImage = () => {
    setSelectedSampleId(null)
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
        (pos) => {
          setLocationStatus('granted')
          setCoords({
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
          })
        },
        () => setLocationStatus('denied'),
        { timeout: 8000 }
      )
    }
  }

  const canAnalyze = !!file && !analyzing

  return (
    <section id="upload" className="relative py-24 md:py-32 bg-canopy/50">
      <div className="mx-auto max-w-5xl px-6 md:px-10">
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
            onClick={() => {
              console.log('[UploadSection] weatherToggle value:', weatherEnabled)
              console.log('[UploadSection] locationStatus:', locationStatus)
              console.log('[UploadSection] coords:', coords)
              onAnalyze({
                file,
                weatherEnabled,
                coords,
              })
            }}
            className="group mt-8 w-full inline-flex items-center justify-center gap-2 rounded-full bg-primary py-4 text-base font-semibold text-white shadow-soft hover:shadow-lift hover:bg-primary-dark disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:shadow-soft transition-all duration-300"
          >
            <ScanLine size={20} className="group-hover:rotate-6 transition-transform" />
            {analyzing ? 'Analyzing…' : 'Analyze Leaf'}
          </motion.button>
        </motion.div>

        {/* Try Sample Images Section */}
        <AnimatePresence>
          {!preview && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="mt-16 w-full"
            >
              <div className="text-center mb-10">
                <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wide text-primary mb-2">
                  <Sparkles size={14} /> Quick Test
                </div>
                <h3 className="text-2xl md:text-3xl font-semibold text-ink">Try Sample Images</h3>
                <p className="text-sm md:text-base text-ink/60 mt-1.5 max-w-md mx-auto leading-relaxed">
                  Don't have a leaf photo? Explore LeafGuard using these sample images.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
                {SAMPLE_IMAGES.map((sample) => {
                  const isSelected = selectedSampleId === sample.id
                  return (
                    <motion.div
                      key={sample.id}
                      whileHover={{ y: -8, scale: 1.015 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      onClick={() => selectSampleImage(sample)}
                      className={`group cursor-pointer overflow-hidden rounded-2xl bg-white border border-black/5 ${
                        isSelected ? 'border-primary ring-2 ring-primary/20' : ''
                      } shadow-card hover:shadow-lift transition-all duration-300 relative flex flex-col transform-gpu`}
                    >
                      {/* Image container */}
                      <div className="relative aspect-[4/3] w-full overflow-hidden bg-bg">
                        <img
                          src={sample.image}
                          alt={`${sample.plant} - ${sample.condition}`}
                          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                        />
                        {isSelected && (
                          <div className="absolute top-3 right-3 grid place-items-center h-6 w-6 rounded-full bg-primary text-white shadow">
                            <Check size={13} strokeWidth={3} />
                          </div>
                        )}
                      </div>

                      {/* Label */}
                      <div className="p-4 flex flex-col gap-1.5">
                        <p className="text-base md:text-lg font-display font-semibold text-ink group-hover:text-primary transition-colors">
                          {sample.plant}
                        </p>
                        <span className={`inline-flex items-center self-start rounded-full px-3 py-0.5 text-xs font-semibold ring-1 ring-inset ${sample.badgeColor}`}>
                          {sample.condition}
                        </span>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
