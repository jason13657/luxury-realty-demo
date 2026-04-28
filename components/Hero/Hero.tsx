"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero}>
      {/* Animated background */}
      <div className={styles.bg}>
        <div className={styles.bgGradient} />
        <div className={styles.bgVideo}>
          <video
            autoPlay
            muted
            loop
            playsInline
            className={styles.video}
            poster="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1920&q=80"
          >
            {/* In production, real video file would be here */}
          </video>
          {/* Fallback image when no video */}
          <div
            className={styles.videoFallback}
            style={{
              backgroundImage: "url(https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80)",
            }}
          />
        </div>
        <div className={styles.overlay} />
      </div>

      {/* Content */}
      <div className={styles.content}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={styles.eyebrow}
        >
          <span className={styles.line} />
          South Florida&apos;s Premier Luxury Real Estate
          <span className={styles.line} />
        </motion.div>

        <motion.h1
          className={styles.title}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          Discover Extraordinary
          <br />
          <em className={styles.titleItalic}>Properties</em>
        </motion.h1>

        <motion.p
          className={styles.subtitle}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.65 }}
        >
          From waterfront estates to sky-high penthouses, we curate Miami&apos;s most exclusive real estate for
          discerning buyers and investors.
        </motion.p>

        <motion.div
          className={styles.actions}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.85 }}
        >
          <Link href="/properties" className={styles.btnPrimary}>
            Explore Properties
          </Link>
          <Link href="/map" className={styles.btnOutline}>
            View on Map
          </Link>
        </motion.div>

        {/* Quick search */}
        <motion.div
          className={styles.searchBar}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.05 }}
        >
          {["All", "Residential", "Luxury", "Commercial", "Land"].map((cat) => (
            <Link
              key={cat}
              href={cat === "All" ? "/properties" : `/properties?category=${cat.toLowerCase()}`}
              className={styles.searchTab}
            >
              {cat}
            </Link>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className={styles.scrollHint}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
      >
        <motion.div
          className={styles.scrollDot}
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        />
        <span>Scroll</span>
      </motion.div>
    </section>
  );
}
