function StatsCard({
  title,
  value
}) {
  return (
    <div className="analyst-stat-card">
      <p className="analyst-stat-title">
        {title}
      </p>

      <h1 className="analyst-stat-value">
        {value}
      </h1>
    </div>
  )
}

export default StatsCard