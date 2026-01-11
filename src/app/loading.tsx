export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-dark-950">
      <div className="relative">
        {/* Outer ring */}
        <div className="w-16 h-16 border-4 border-dark-700 rounded-full animate-pulse" />
        {/* Inner spinning ring */}
        <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-primary-500 rounded-full animate-spin" />
        {/* Center dot */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse" />
        </div>
      </div>
    </div>
  )
}
