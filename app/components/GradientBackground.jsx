export default function GradientBackground({ children, className = "" }) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-br from-gray-700/30 via-gray-800/15 to-gray-900/30 pointer-events-none"></div>
      <div className="relative z-10">{children}</div>
    </div>
  );
}
