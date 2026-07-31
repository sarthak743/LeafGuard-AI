import { useRef, useEffect, useCallback } from 'react'

const LEAFGUARD_GREENS = ['#2E7D32', '#4CAF50', '#81C784', '#66BB6A']

export default function ClickSpark({
  sparkColor = LEAFGUARD_GREENS,
  sparkSize = 9,
  sparkRadius = 15,
  sparkCount = 8,
  duration = 500,
  easing = 'ease-out',
  extraScale = 1.1,
  children,
}) {
  const canvasRef = useRef(null)
  const sparksRef = useRef([])
  const animationIdRef = useRef(null)
  const pointerDownPosRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const parent = canvas.parentElement
    if (!parent) return

    let resizeTimeout

    const resizeCanvas = () => {
      const { width, height } = parent.getBoundingClientRect()
      const dpr = window.devicePixelRatio || 1
      if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
        canvas.width = width * dpr
        canvas.height = height * dpr
      }
    }

    const handleResize = () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(resizeCanvas, 100)
    }

    const ro = new ResizeObserver(handleResize)
    ro.observe(parent)
    resizeCanvas()

    return () => {
      ro.disconnect()
      clearTimeout(resizeTimeout)
    }
  }, [])

  const easeFunc = useCallback(
    (t) => {
      switch (easing) {
        case 'linear':
          return t
        case 'ease-in':
          return t * t
        case 'ease-in-out':
          return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
        default:
          // ease-out
          return t * (2 - t)
      }
    },
    [easing]
  )

  const startAnimationIfNeeded = useCallback(() => {
    if (animationIdRef.current) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const draw = (timestamp) => {
      const dpr = window.devicePixelRatio || 1
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      sparksRef.current = sparksRef.current.filter((spark) => {
        const elapsed = timestamp - spark.startTime
        if (elapsed >= duration) {
          return false
        }

        const progress = elapsed / duration
        const eased = easeFunc(progress)

        const distance = eased * sparkRadius * extraScale * dpr
        const lineLength = sparkSize * (1 - eased) * dpr

        const x1 = spark.x * dpr + distance * Math.cos(spark.angle)
        const y1 = spark.y * dpr + distance * Math.sin(spark.angle)
        const x2 = spark.x * dpr + (distance + lineLength) * Math.cos(spark.angle)
        const y2 = spark.y * dpr + (distance + lineLength) * Math.sin(spark.angle)

        ctx.save()
        ctx.strokeStyle = spark.color
        ctx.lineWidth = 2 * dpr
        ctx.lineCap = 'round'
        ctx.globalAlpha = Math.max(0, (1 - progress) * 0.85)
        ctx.shadowColor = spark.color
        ctx.shadowBlur = 4 * dpr

        ctx.beginPath()
        ctx.moveTo(x1, y1)
        ctx.lineTo(x2, y2)
        ctx.stroke()
        ctx.restore()

        return true
      })

      if (sparksRef.current.length > 0) {
        animationIdRef.current = requestAnimationFrame(draw)
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        animationIdRef.current = null
      }
    }

    animationIdRef.current = requestAnimationFrame(draw)
  }, [duration, easeFunc, extraScale, sparkRadius, sparkSize])

  useEffect(() => {
    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current)
      }
    }
  }, [])

  const handlePointerDown = (e) => {
    pointerDownPosRef.current = { x: e.clientX, y: e.clientY, time: Date.now() }
  }

  const handleClick = (e) => {
    // Only trigger on primary click / tap
    if (e.button !== undefined && e.button !== 0) return

    // Prevent trigger if dragging, scrolling or long holding
    if (pointerDownPosRef.current) {
      const dx = Math.abs(e.clientX - pointerDownPosRef.current.x)
      const dy = Math.abs(e.clientY - pointerDownPosRef.current.y)
      const dt = Date.now() - pointerDownPosRef.current.time
      if (dx > 8 || dy > 8 || dt > 450) {
        return
      }
    }

    const canvas = canvasRef.current
    if (!canvas) return
    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const now = performance.now()
    const colors = Array.isArray(sparkColor) ? sparkColor : [sparkColor]

    const newSparks = Array.from({ length: sparkCount }, (_, i) => {
      // Pick random green variation per spark line for an organic feel
      const color = colors[Math.floor(Math.random() * colors.length)]
      const angle = (2 * Math.PI * i) / sparkCount + (Math.random() - 0.5) * 0.15
      return {
        x,
        y,
        angle,
        color,
        startTime: now,
      }
    })

    sparksRef.current.push(...newSparks)
    startAnimationIfNeeded()
  }

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
      }}
      onPointerDown={handlePointerDown}
      onClick={handleClick}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          display: 'block',
          userSelect: 'none',
          position: 'absolute',
          top: 0,
          left: 0,
          pointerEvents: 'none',
          zIndex: 35,
        }}
      />
      {children}
    </div>
  )
}
