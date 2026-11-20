"use client"
import React, { useRef } from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import Image from 'next/image'
import Autoplay from 'embla-carousel-autoplay'

export default function Slider({ images, title }: { images: string[], title: string }) {
  // stopOnInteraction: لو المستخدم لمس الصور أو سحبها، العرض التلقائي يقف (مهم للـ accessibility)
  // stopOnMouseEnter: لما الماوس يقف على الصورة، العرض يقف لحد ما يمشي
  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true, stopOnMouseEnter: true }))

  return (
    <Carousel opts={{ loop: true }} plugins={[plugin.current]}>
      <CarouselContent>
        {images.map((img, i) => (
          <CarouselItem key={i}>
            {/* aspect-[11/15]: نفس مقاس صور الـ API، فالمكان محجوز من الأول والصفحة متتنططش لما الصورة تحمّل */}
            <div className="relative aspect-[11/15]">
              <Image
                src={img}
                // priority: أول صورة بس هي اللي بتظهر أول ما الصفحة تفتح
                priority={i === 0}
                alt={`${title} - image ${i + 1}`}
                fill
                sizes="(max-width: 1024px) 100vw, 33vw"
                className="z-20 object-cover"
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}
