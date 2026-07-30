# LeafGuard

A single-page, premium frontend for an AI plant disease detection product.

## Stack
React 18 + Vite + Tailwind CSS + Framer Motion + lucide-react.

## Getting started
```bash
npm install
npm run dev
```
Then open the printed local URL. `npm run build` creates a production build in `dist/`.

## Project structure
```
src/
  App.jsx                     orchestrates state: upload → weather → analyze → results
  components/
    Navbar.jsx
    Hero.jsx
    Features.jsx
    HowItWorks.jsx
    UploadSection.jsx         drag & drop, weather geolocation toggle, analyze button
    LoadingState.jsx
    Footer.jsx
    ui/                       Card, SectionHeading, SeverityBadge, VeinDivider (signature motif)
    results/                  one component per result block, each hides itself if its data is absent
  data/placeholderResult.json exact shape of the FastAPI response, used until you wire the real API
```

## Wiring up your FastAPI backend
Everything currently runs on `src/data/placeholderResult.json` and a 2.6s `setTimeout` in
`App.jsx`'s `handleAnalyze`. To connect the real backend, replace that function with something like:

```js
const handleAnalyze = async ({ file, weatherEnabled, coords }) => {
  setAnalyzing(true)
  setResult(null)

  const form = new FormData()
  form.append('file', file)
  if (weatherEnabled && coords) {
    form.append('lat', coords.latitude)
    form.append('lon', coords.longitude)
  }

  const res = await fetch('https://your-api.example.com/analyze', {
    method: 'POST',
    body: form,
  })
  const data = await res.json()

  setAnalyzing(false)
  setResult(data)
  requestAnimationFrame(() => resultsRef.current?.scrollIntoView({ behavior: 'smooth' }))
}
```

`UploadSection` already requests browser geolocation permission when the weather toggle is
switched on, and degrades gracefully (image-only analysis) if the user denies it. Pass the
resolved `{ latitude, longitude }` up through `onAnalyze` the same way `file` is passed today —
capture it in the `navigator.geolocation.getCurrentPosition` success callback in
`UploadSection.jsx` and store it in state next to `locationStatus`.

Every card in `src/components/results/` only renders when its corresponding field exists in the
API response (e.g. `WeatherAdvisory` returns `null` if there's no `weather` or `weather_advisory`),
so you can drop in the real payload — with real fields, missing or present — with no other changes.

## Design tokens
Colors, type and radii live in `tailwind.config.js`:
- `primary` #2E7D32, `secondary` #66BB6A, `accent` #A5D6A7, `canopy` #E8F5E9, `bg` #F8FBF6, `clay` #C17A4B (used for the recommended-action highlight)
- Display face: Fraunces · Body: Plus Jakarta Sans · Data/mono: JetBrains Mono
- Signature element: the leaf-vein `VeinDivider` threading between major sections, and vein-patterned illustration in the hero
