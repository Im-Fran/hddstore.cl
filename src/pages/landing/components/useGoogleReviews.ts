import { useEffect, useState } from 'react'
import { FALLBACK_DATA, normalizePlaceData, type PlaceData, type PlacesResponse } from './reviews'

export function useGoogleReviews(): PlaceData {
  const [placeData, setPlaceData] = useState(FALLBACK_DATA)

  useEffect(() => {
    fetch('/api/reviews')
      .then((res) => res.json())
      .then((data: PlacesResponse) => {
        const normalized = normalizePlaceData(data)
        if (normalized.reviews.length > 0) setPlaceData(normalized)
      })
      .catch(() => {})
  }, [])

  return placeData
}
