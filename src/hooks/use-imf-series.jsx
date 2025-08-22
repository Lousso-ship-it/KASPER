import * as React from "react"

export function useIMFSeries(dataset, params = {}) {
  const [data, setData] = React.useState(null)
  const [error, setError] = React.useState(null)
  const [loading, setLoading] = React.useState(false)

  React.useEffect(() => {
    if (!dataset) return
    const controller = new AbortController()
    const fetchData = async () => {
      setLoading(true)
      setError(null)
      try {
        const search = new URLSearchParams(params).toString()
        const url = `https://dataservices.imf.org/REST/SDMX_JSON.svc/CompactData/${dataset}?${search}`
        const res = await fetch(url, { signal: controller.signal })
        if (!res.ok) throw new Error("Network response was not ok")
        const json = await res.json()
        setData(json)
      } catch (err) {
        if (err.name !== "AbortError") setError(err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
    return () => controller.abort()
  }, [dataset, JSON.stringify(params)])

  return { data, error, loading }
}
