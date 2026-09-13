import type { SVGProps } from "react";

export function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...props}
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

/* Elegant thin diamond ornament used as a separator mark */
export function DiamondMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 10 10" aria-hidden {...props}>
      <rect
        x="2.2"
        y="2.2"
        width="5.6"
        height="5.6"
        transform="rotate(45 5 5)"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
      />
    </svg>
  );
}
