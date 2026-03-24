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
  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: false }))

  return (
    <>
      <Carousel opts={{ loop: true }} plugins={[plugin.current]}>
        <CarouselContent>
          {images.map((img, i) => <CarouselItem key={i}>
            <Image
              src={img}
              priority
              alt={title}
              width={500}
              height={300}
              className="z-20 object-cover"
            /></CarouselItem>)}

        </CarouselContent>

      </Carousel>
    </>
  )
}
