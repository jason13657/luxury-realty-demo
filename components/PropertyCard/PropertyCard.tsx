"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Property } from "@/lib/types";
import styles from "./PropertyCard.module.css";

interface PropertyCardProps {
  property: Property;
  index?: number;
}

const categoryLabels: Record<string, string> = {
  luxury: "Luxury",
  residential: "Residential",
  commercial: "Commercial",
  land: "Land",
};

const statusLabels: Record<string, string> = {
  "for-sale": "For Sale",
  "for-rent": "For Rent",
  sold: "Sold",
};

export default function PropertyCard({ property, index = 0 }: PropertyCardProps) {
  const formattedPrice =
    property.category === "commercial" || property.status === "for-rent"
      ? `$${property.price.toLocaleString()}/mo`
      : `$${(property.price / 1000000).toFixed(1)}M`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <Link href={`/properties/${property.id}`} className={styles.card}>
        <div className={styles.imageWrap}>
          <Image
            src={property.images[0]}
            alt={property.title}
            fill
            className={styles.image}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className={styles.overlay} />
          <div className={styles.badges}>
            <span className={`${styles.badge} ${styles[property.status.replace("-", "")]}`}>
              {statusLabels[property.status]}
            </span>
            <span className={`${styles.badge} ${styles.category}`}>{categoryLabels[property.category]}</span>
          </div>
          <div className={styles.price}>{formattedPrice}</div>
        </div>

        <div className={styles.body}>
          <h3 className={styles.title}>{property.title}</h3>
          <p className={styles.address}>
            <svg width="12" height="14" viewBox="0 0 12 14" fill="none">
              <path d="M6 0C3.24 0 1 2.24 1 5c0 3.75 5 9 5 9s5-5.25 5-9c0-2.76-2.24-5-5-5z" fill="currentColor" />
            </svg>
            {property.address}, {property.city}
          </p>

          {property.beds > 0 && (
            <div className={styles.specs}>
              <span className={styles.spec}>
                <BedIcon /> {property.beds} Beds
              </span>
              <span className={styles.spec}>
                <BathIcon /> {property.baths} Baths
              </span>
              <span className={styles.spec}>
                <SqftIcon /> {property.sqft.toLocaleString()} ft²
              </span>
            </div>
          )}

          <div className={styles.footer}>
            <span className={styles.viewBtn}>View Property →</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

function BedIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M2 20v-8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v8" />
      <path d="M4 10V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4" />
      <path d="M12 4v6" />
      <path d="M2 18h20" />
    </svg>
  );
}

function BathIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M9 6 6.5 3.5a1.5 1.5 0 0 0-1-.4 2 2 0 0 0-2 2 .4.4 0 0 0 .1.3L4.5 6.5" />
      <path d="M7 8l-2 2" />
      <path d="M20 12H4v1a6 6 0 0 0 6 6h4a6 6 0 0 0 6-6v-1z" />
      <path d="M12 20v2" />
    </svg>
  );
}

function SqftIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 9h18" />
      <path d="M9 21V9" />
    </svg>
  );
}
