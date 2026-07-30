import { forwardRef } from 'react'
import { motion } from 'framer-motion'
import { RotateCcw, Download } from 'lucide-react'
import DiagnosisCard from './DiagnosisCard.jsx'
import TopPredictions from './TopPredictions.jsx'
import DescriptionCard from './DescriptionCard.jsx'
import SymptomsCard from './SymptomsCard.jsx'
import CausesCard from './CausesCard.jsx'
import PreventionCard from './PreventionCard.jsx'
import TreatmentCard from './TreatmentCard.jsx'
import RecommendedAction from './RecommendedAction.jsx'
import WeatherAdvisory from './WeatherAdvisory.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'

const ResultsSection = forwardRef(function ResultsSection({ result, onReset }, ref) {
  if (!result) return null

  const { prediction, top_predictions, weather, weather_advisory } = result
  const details = prediction?.details

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      id="results"
      className="relative py-24 md:py-32"
    >
      <div className="mx-auto max-w-5xl px-6 md:px-10">
        <SectionHeading eyebrow="Report" title="Your diagnosis" align="center" />

        <div className="flex flex-col gap-6">
          <DiagnosisCard
            plant={details?.plant}
            disease={prediction?.display_name}
            confidence={prediction?.confidence}
            severity={details?.severity}
          />

          <div className="grid md:grid-cols-2 gap-6">
            <TopPredictions predictions={top_predictions} />
            <DescriptionCard description={details?.description} />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <SymptomsCard symptoms={details?.symptoms} />
            <CausesCard causes={details?.causes} />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <PreventionCard prevention={details?.prevention} />
            <TreatmentCard treatment={details?.treatment} />
          </div>

          <RecommendedAction action={details?.recommended_action} />

          <WeatherAdvisory
            weather={weather}
            advisory={weather_advisory}
          />

          <div className="flex flex-wrap items-center justify-center gap-4 pt-6">
            <button
              onClick={onReset}
              className="group inline-flex items-center gap-2 rounded-full border border-primary/30 px-7 py-3.5 font-semibold text-primary hover:bg-primary hover:text-white transition-colors duration-300"
            >
              <RotateCcw size={17} className="group-hover:-rotate-180 transition-transform duration-500" />
              Analyze another leaf
            </button>

            <div className="group relative">
              <button
                disabled
                aria-label="Download PDF (Coming Soon)"
                className="group inline-flex items-center gap-2 rounded-full border border-primary/30 px-7 py-3.5 font-semibold text-primary hover:bg-primary hover:text-white transition-colors duration-300 opacity-90 cursor-not-allowed"
              >
                <Download size={17} className="group-hover:translate-y-0.5 transition-transform duration-300" />
                Download PDF
              </button>
              {/* Tooltip */}
              <div className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-ink text-white text-xs font-mono px-2.5 py-1 rounded-md shadow-md whitespace-nowrap z-10">
                Coming Soon
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  )
})

export default ResultsSection
