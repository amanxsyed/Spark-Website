export function Logo({ sub = true }: { sub?: boolean }) {
  return (
    <span className="wordmark" aria-hidden="true">
      <span className="wordmark-name">
        SPARK
        <svg className="wordmark-star" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0c.9 6.6 4.5 10.2 12 12-7.5 1.8-11.1 5.4-12 12-.9-6.6-4.5-10.2-12-12C7.5 10.2 11.1 6.6 12 0Z" />
        </svg>
      </span>
      {sub ? <span className="wordmark-sub">Realty Inc., Brokerage</span> : null}
    </span>
  );
}
