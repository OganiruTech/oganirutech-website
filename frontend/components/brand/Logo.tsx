import Link from "next/link";

/* ---------------------------------------------------------------------------
   OGANIRU MARK
   An "O" ring broken open in the upper right by an ascending arrow — the
   monogram of the name, and the idea of progress breaking through. Built as
   strokes on a 32x32 grid so it stays legible down to 16px (favicon) and
   inherits colour from its container for light/dark surfaces.
--------------------------------------------------------------------------- */

export function LogoMark({
  className = "",
  ringClassName = "text-navy-800",
  arrowClassName = "text-emerald-500",
}: {
  className?: string;
  ringClassName?: string;
  arrowClassName?: string;
}) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <path
        d="M26.97 15.23 A11 11 0 1 1 16.38 5.01"
        stroke="currentColor"
        strokeWidth="4.2"
        strokeLinecap="round"
        className={ringClassName}
      />
      <g stroke="currentColor" strokeWidth="4.2" strokeLinecap="round" strokeLinejoin="round" className={arrowClassName}>
        <path d="M14.8 17.2 L27.2 4.8" />
        <path d="M22.2 4.8 H27.2 V9.8" />
      </g>
    </svg>
  );
}

/* ---------------------------------------------------------------------------
   LOCKUP
   Mark + wordmark. The old header stacked "OGANIRU" over "TECHNOLOGIES" in
   two identical tiny uppercase lines, which read as a label rather than a
   brand. This gives the name real presence and demotes the descriptor.
--------------------------------------------------------------------------- */

export default function Logo({
  href = "/",
  tone = "dark",
  className = "",
  onClick,
}: {
  href?: string | null;
  /** "dark" = sitting on a dark surface. "light" = sitting on a light surface. */
  tone?: "dark" | "light";
  className?: string;
  onClick?: () => void;
}) {
  const isDark = tone === "dark";

  const inner = (
    <>
      <LogoMark
        className="h-9 w-9 shrink-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-px"
        ringClassName={isDark ? "text-white" : "text-navy-800"}
        arrowClassName={isDark ? "text-emerald-400" : "text-emerald-500"}
      />
      <span className="flex flex-col leading-none">
        <span
          className={`font-display text-[1.0625rem] font-bold tracking-[-0.02em] ${
            isDark ? "text-white" : "text-navy-800"
          }`}
        >
          Oganiru
        </span>
        <span
          className={`mt-1 text-[0.5625rem] font-semibold uppercase tracking-[0.22em] ${
            isDark ? "text-navy-300" : "text-navy-400"
          }`}
        >
          Technologies
        </span>
      </span>
    </>
  );

  const classes = `group inline-flex items-center gap-2.5 ${className}`;

  if (href === null) {
    return <span className={classes}>{inner}</span>;
  }

  return (
    <Link href={href} onClick={onClick} className={classes} aria-label="Oganiru Technologies — home">
      {inner}
    </Link>
  );
}
