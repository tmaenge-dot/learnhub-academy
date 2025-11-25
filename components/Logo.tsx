export default function Logo({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Graduation cap */}
      <path
        d="M100 40L20 80L100 120L180 80L100 40Z"
        fill="url(#gradient1)"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path
        d="M180 80V120C180 130 150 145 100 145C50 145 20 130 20 120V80"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Book */}
      <rect
        x="60"
        y="100"
        width="80"
        height="60"
        rx="4"
        fill="url(#gradient2)"
        stroke="currentColor"
        strokeWidth="2"
      />
      <line x1="100" y1="100" x2="100" y2="160" stroke="currentColor" strokeWidth="2" />
      <line x1="70" y1="120" x2="90" y2="120" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="110" y1="120" x2="130" y2="120" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="70" y1="135" x2="90" y2="135" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="110" y1="135" x2="130" y2="135" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      
      {/* Gradients */}
      <defs>
        <linearGradient id="gradient1" x1="20" y1="40" x2="180" y2="120">
          <stop offset="0%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#f59e0b" />
        </linearGradient>
        <linearGradient id="gradient2" x1="60" y1="100" x2="140" y2="160">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#10b981" />
        </linearGradient>
      </defs>
    </svg>
  );
}
