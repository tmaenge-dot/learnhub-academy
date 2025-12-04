export default function Logo({ className = "", size = 45 }: { className?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      className={className}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background Circle with Gradient */}
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#06b6d4" />
          <stop offset="50%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>
        <linearGradient id="capGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#f59e0b" />
        </linearGradient>
      </defs>
      
      {/* Main Circle Background */}
      <circle cx="50" cy="50" r="48" fill="url(#logoGradient)" />
      
      {/* Graduation Cap (Academic Focus) */}
      <path 
        d="M 50 22 L 78 32 L 78 42 L 50 52 L 22 42 L 22 32 Z" 
        fill="url(#capGradient)" 
        stroke="#f59e0b" 
        strokeWidth="1.5"
      />
      
      {/* Cap Tassel */}
      <rect x="48" y="52" width="4" height="10" fill="#f59e0b" rx="1" />
      <circle cx="50" cy="64" r="2.5" fill="#fbbf24" />
      
      {/* Letter "E" in Modern Style */}
      <text 
        x="32" 
        y="52" 
        fontSize="32" 
        fontWeight="bold" 
        fill="white" 
        fontFamily="Arial, sans-serif"
        style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}
      >
        E
      </text>
      
      {/* Gear Icon (TVET/Technical Focus) - Bottom Right */}
      <circle cx="72" cy="72" r="9" fill="#10b981" stroke="#059669" strokeWidth="2" />
      <circle cx="72" cy="72" r="4.5" fill="white" />
      {/* Gear teeth */}
      <rect x="70.5" y="63" width="3" height="4" fill="#059669" rx="0.5" />
      <rect x="70.5" y="77" width="3" height="4" fill="#059669" rx="0.5" />
      <rect x="63" y="70.5" width="4" height="3" fill="#059669" rx="0.5" />
      <rect x="77" y="70.5" width="4" height="3" fill="#059669" rx="0.5" />
      
      {/* Book/Deliverables Icon - Bottom Left */}
      <rect x="26" y="70" width="18" height="12" rx="1" fill="#ec4899" stroke="#db2777" strokeWidth="1.5" />
      <line x1="29" y1="73" x2="41" y2="73" stroke="white" strokeWidth="1" strokeLinecap="round" />
      <line x1="29" y1="76" x2="41" y2="76" stroke="white" strokeWidth="1" strokeLinecap="round" />
      <line x1="29" y1="79" x2="38" y2="79" stroke="white" strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}
