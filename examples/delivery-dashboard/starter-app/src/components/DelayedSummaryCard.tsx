type DelayedSummaryCardProps = {
  delayedCount: number
}

export function DelayedSummaryCard({ delayedCount }: DelayedSummaryCardProps) {
  const summary =
    delayedCount === 1
      ? '1 delayed delivery needs immediate attention.'
      : `${delayedCount} delayed deliveries need immediate attention.`

  return (
    <section className="summary-card">
      <p className="eyebrow">Delayed deliveries</p>
      <h2>{delayedCount}</h2>
      <p>{summary}</p>
    </section>
  )
}