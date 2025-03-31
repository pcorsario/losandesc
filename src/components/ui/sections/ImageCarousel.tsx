import { useEffect, useCallback } from "react"
import useEmblaCarousel from "embla-carousel-react"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import banner1 from "../../../images/banners/banner1.png"
import banner2 from "../../../images/banners/banner2.png"
import banner3 from "../../../images/banners/banner3.png"
import banner4 from "../../../images/banners/banner4.png"
import banner5 from "../../../images/banners/banner5.png"
  
const images = [
  {
    src: banner1.src,
    alt: "Banner 1",
  },
  {
    src: banner2.src,
    alt: "Banner 2",
  },
  {
    src: banner3.src,
    alt: "Banner 3",
  },
  {
    src: banner4.src,
    alt: "Banner 4",
  },
  {
    src: banner5.src,
    alt: "Banner 5",
  },
]

export function ImageCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
  })

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return

    const interval = setInterval(() => {
      emblaApi.scrollNext()
    }, 6000)

    return () => {
      clearInterval(interval)
    }
  }, [emblaApi])

  return (
    <div className="w-screen relative left-[50%] right-[50%] mx-[-50vw]">
      <div className="relative">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {images.map((image, index) => (
              <div key={index} className="flex-[0_0_100%] min-w-0">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-[60vh] object-cover"
                />
              </div>
            ))}
          </div>
        </div>
        <Button
          variant="outline"
          size="icon"
          className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full"
          onClick={scrollPrev}
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="sr-only">Previous slide</span>
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full"
          onClick={scrollNext}
        >
          <ArrowRight className="h-4 w-4" />
          <span className="sr-only">Next slide</span>
        </Button>
      </div>
    </div>
  )
} 