const Logo = ({ className }) => {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 160 160"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* === Background (square with soft corners) === */}
      <rect x="20" y="20" width="120" height="120" rx="20" fill="#ecaf11" />

      {/* === Background === */}
      <circle cx="80" cy="80" r="70" fill="#ecaf11" />

      {/* === Open Book === */}
      <path
        d="M45 50 C55 45, 75 45, 80 55 C85 45, 105 45, 115 50 L115 110 C105 105, 85 105, 80 115 C75 105, 55 105, 45 110 Z"
        fill="#fff"
        stroke="#0F172A"
        strokeWidth="3"
        strokeLinejoin="round"
      />

      {/* === Book spine shadow === */}
      <line
        x1="80"
        y1="55"
        x2="80"
        y2="115"
        stroke="#0F172A"
        strokeWidth="2"
        opacity="0.4"
      />

      {/* === Spark / digital touch === */}
      <circle cx="100" cy="38" r="5" fill="#0F172A" />
      <circle cx="110" cy="30" r="3" fill="#0F172A" opacity="0.8" />
    </svg>
  );
};
export default Logo;
