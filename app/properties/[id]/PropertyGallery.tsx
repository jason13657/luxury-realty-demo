"use client";

import { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Thumbs } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";
import { Property } from "@/lib/types";
import styles from "./PropertyGallery.module.css";

interface PropertyGalleryProps {
  property: Property;
}

export default function PropertyGallery({ property }: PropertyGalleryProps) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

  return (
    <div className={styles.wrap}>
      <Swiper
        modules={[Navigation, Pagination, Thumbs]}
        navigation
        pagination={{ clickable: true }}
        thumbs={{ swiper: thumbsSwiper }}
        className={styles.mainSwiper}
      >
        {property.images.map((src, i) => (
          <SwiperSlide key={i} className={styles.slide}>
            <Image
              src={src}
              alt={`${property.title} — image ${i + 1}`}
              fill
              className={styles.image}
              sizes="100vw"
              priority={i === 0}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <Swiper
        modules={[Thumbs]}
        onSwiper={setThumbsSwiper}
        slidesPerView={4}
        spaceBetween={8}
        watchSlidesProgress
        className={styles.thumbSwiper}
      >
        {property.images.map((src, i) => (
          <SwiperSlide key={i} className={styles.thumbSlide}>
            <Image src={src} alt={`Thumb ${i + 1}`} fill className={styles.thumbImage} sizes="200px" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
