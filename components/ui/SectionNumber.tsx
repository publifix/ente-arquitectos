type SectionNumberProps = {
  value: number;
  label?: string;
  className?: string;
};

export function SectionNumber({ value, label, className = "" }: SectionNumberProps) {
  const padded = String(value).padStart(2, "0");

  return (
    <div className={`flex items-center gap-3 font-sans text-sm ${className}`}>
      <span className="text-ink">{padded}</span>
      {label ? (
        <>
          <span className="h-px w-8 bg-mist" aria-hidden="true" />
          <span className="uppercase tracking-widest text-ink/60">
            {label}
          </span>
        </>
      ) : null}
    </div>
  );
}
