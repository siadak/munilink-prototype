export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-baseline font-semibold tracking-tight ${className}`}>
      <span className="text-brand-orange">m</span>
      <span className="text-navy">Unilink</span>
    </span>
  );
}
