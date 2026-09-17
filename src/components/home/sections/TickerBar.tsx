import { tickerItems } from '@/lib/data';

/** Moving stats strip under the hero. Styles live in home.css (.ticker). */
export function TickerBar() {
  return (
    <>
      <div className="ticker" aria-hidden="true">
        <div className="ticker-track">
          {[0, 1].map((copy) => (
            <div key={copy} style={{ display: 'flex' }}>
              {tickerItems.map((item) => (
                <span className="ticker-item" key={`${copy}-${item.label}`}>
                  <i />
                  <b>{item.value}</b>
                  {item.label}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
      <p className="sr-only">
        54,056 active listings across the Greater Toronto Area, refreshed every fifteen minutes.
      </p>
    </>
  );
}
