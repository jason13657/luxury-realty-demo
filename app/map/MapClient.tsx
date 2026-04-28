"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { properties } from "@/lib/data";
import { PropertyCategory } from "@/lib/types";
import AnimatedSection from "@/components/AnimatedSection/AnimatedSection";
import styles from "./MapClient.module.css";

const MapView = dynamic(() => import("./MapView"), {
  ssr: false,
  loading: () => <div className={styles.mapLoading}>Loading map…</div>,
});

const categories: { value: string; label: string; color: string }[] = [
  { value: "all", label: "All Properties", color: "#c9a84c" },
  { value: "luxury", label: "Luxury", color: "#e8c97a" },
  { value: "residential", label: "Residential", color: "#60a5fa" },
  { value: "commercial", label: "Commercial", color: "#34d399" },
  { value: "land", label: "Land", color: "#f87171" },
];

export default function MapClient() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const filtered = properties.filter(
    (p) => activeCategory === "all" || p.category === (activeCategory as PropertyCategory),
  );

  const selected = properties.find((p) => p.id === selectedId) ?? null;

  return (
    <div className={styles.wrap}>
      {/* Controls */}
      <AnimatedSection className={styles.controls}>
        <div className={styles.filterRow}>
          {categories.map((cat) => (
            <button
              key={cat.value}
              className={`${styles.filterBtn} ${activeCategory === cat.value ? styles.filterBtnActive : ""}`}
              style={activeCategory === cat.value ? { borderColor: cat.color, color: cat.color } : {}}
              onClick={() => {
                setActiveCategory(cat.value);
                setSelectedId(null);
              }}
            >
              <span className={styles.dot} style={{ background: cat.color }} />
              {cat.label}
              <span className={styles.count}>
                {cat.value === "all" ? properties.length : properties.filter((p) => p.category === cat.value).length}
              </span>
            </button>
          ))}
        </div>
      </AnimatedSection>

      <div className={styles.mapLayout}>
        {/* Map */}
        <div className={styles.mapWrap}>
          <MapView properties={filtered} selectedId={selectedId} onSelect={setSelectedId} categories={categories} />
        </div>

        {/* Sidebar list */}
        <div className={styles.listPanel}>
          <div className={styles.listHeader}>
            <span className={styles.listCount}>{filtered.length} properties</span>
          </div>
          <div className={styles.list}>
            {filtered.map((p) => (
              <button
                key={p.id}
                className={`${styles.listItem} ${selectedId === p.id ? styles.listItemActive : ""}`}
                onClick={() => setSelectedId(selectedId === p.id ? null : p.id)}
              >
                <div className={styles.listItemTop}>
                  <span className={styles.listItemTitle}>{p.title}</span>
                  <span
                    className={styles.listItemCat}
                    style={{
                      color: categories.find((c) => c.value === p.category)?.color,
                    }}
                  >
                    {p.category}
                  </span>
                </div>
                <div className={styles.listItemAddr}>
                  {p.address}, {p.city}
                </div>
                <div className={styles.listItemPrice}>
                  {p.status === "for-rent" || p.category === "commercial"
                    ? `$${p.price.toLocaleString()}/mo`
                    : `$${(p.price / 1000000).toFixed(1)}M`}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
