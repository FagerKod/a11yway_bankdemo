interface LogoProps {
  className?: string;
  showText?: boolean;
}

/**
 * Bank Logo Component
 * Swedish bank style - clean and professional
 */
export function Logo({ className = '', showText = true }: LogoProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Logo icon - simple bank building shape */}
      <div className="relative">
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          className="text-navy-700"
        >
          {/* Building base */}
          <rect x="6" y="16" width="28" height="20" rx="2" fill="currentColor" />
          {/* Roof/triangle */}
          <path d="M4 18L20 6L36 18H4Z" fill="currentColor" />
          {/* Pillars */}
          <rect x="10" y="20" width="4" height="12" rx="1" fill="white" />
          <rect x="18" y="20" width="4" height="12" rx="1" fill="white" />
          <rect x="26" y="20" width="4" height="12" rx="1" fill="white" />
          {/* Door */}
          <rect x="16" y="28" width="8" height="8" rx="1" fill="white" />
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col">
          <span className="text-xl font-semibold text-navy-900 leading-tight">
            Demobanken
          </span>
          <span className="text-xs text-gray-500">
            Sedan 1892
          </span>
        </div>
      )}
    </div>
  );
}
