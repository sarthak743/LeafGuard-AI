export default function LeafGuardLogo({ size = 36, className = '' }) {
  return (
    <img
      src="/logo.png"
      alt="LeafGuard Logo"
      width={size}
      height={size}
      style={{ width: `${size}px`, height: `${size}px` }}
      className={`object-contain rounded-full shrink-0 ${className}`}
    />
  )
}
