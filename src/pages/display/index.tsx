import { useGoogleReviews } from '@/pages/landing/components/useGoogleReviews'
import { ContactoSlide } from './components/ContactoSlide'
import { DisplayFooter } from './components/DisplayFooter'
import { DisplayHeader } from './components/DisplayHeader'
import { ReviewsColumn } from './components/ReviewsColumn'
import { StatsSlide } from './components/StatsSlide'
import { useAutoSlide } from './useAutoSlide'

const SLIDE_INTERVAL_MS = 8000
const SLIDE_COUNT = 2

const DisplayPage = () => {
  const placeData = useGoogleReviews()
  const slideIndex = useAutoSlide(SLIDE_COUNT, SLIDE_INTERVAL_MS)

  return (
    <div className="flex h-dvh flex-col bg-ink font-sans text-mist">
      <DisplayHeader />
      <div className="grid min-h-0 flex-1 grid-cols-[1fr_1.2fr]">
        <div className="h-full overflow-hidden">
          <div
            className="flex h-full flex-col transition-transform duration-700 ease-in-out"
            style={{ transform: `translateY(-${slideIndex * 100}%)` }}
          >
            <div className="h-full shrink-0">
              <ContactoSlide />
            </div>
            <div className="h-full shrink-0">
              <StatsSlide placeData={placeData} />
            </div>
          </div>
        </div>
        <ReviewsColumn placeData={placeData} />
      </div>
      <DisplayFooter />
    </div>
  )
}

export default DisplayPage
