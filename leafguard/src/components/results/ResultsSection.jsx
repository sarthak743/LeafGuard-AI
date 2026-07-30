import { forwardRef } from 'react'
import { motion } from 'framer-motion'
import { RotateCcw } from 'lucide-react'
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
            idealConditions={details?.weather_conditions}
          />

          <div className="flex justify-center pt-6">
            <button
              onClick={onReset}
              className="group inline-flex items-center gap-2 rounded-full border border-primary/30 px-7 py-3.5 font-semibold text-primary hover:bg-primary hover:text-white transition-colors duration-300"
            >
              <RotateCcw size={17} className="group-hover:-rotate-180 transition-transform duration-500" />
              Analyze another leaf
            </button>
          </div>
        </div>
      </div>
    </motion.section>
  )
})

export default ResultsSection
