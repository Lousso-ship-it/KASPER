import * as React from "react"

export function useWorldBankIndicator(country, code) {
  const [data, setData] = React.useState(null)
  const [error, setError] = React.useState(null)
  const [loading, setLoading] = React.useState(false)

  React.useEffect(() => {
    if (!country || !code) return
    const controller = new AbortController()
    const fetchData = async () => {
      setLoading(true)
      setError(null)
      try {
        const url = `https://api.worldbank.org/v2/country/${country}/indicator/${code}?format=json`
        const res = await fetch(url, { signal: controller.signal })
        if (!res.ok) throw new Error("Network response was not ok")
        const json = await res.json()
        setData(json[1] || [])
      } catch (err) {
        if (err.name !== "AbortError") setError(err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
    return () => controller.abort()
  }, [country, code])

  return { data, error, loading }
}
