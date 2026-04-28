"use client";

import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import PropertyCard from "@/components/PropertyCard/PropertyCard";
import AnimatedSection from "@/components/AnimatedSection/AnimatedSection";
import { properties } from "@/lib/data";
import { PropertyCategory } from "@/lib/types";
import styles from "./PropertiesClient.module.css";

const categories: { value: string; label: string }[] = [
  { value: "all", label: "All" },
  { value: "luxury", label: "Luxury" },
  { value: "residential", label: "Residential" },
  { value: "commercial", label: "Commercial" },
  { value: "land", label: "Land" },
];

const sortOptions = [
  { value: "default", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "sqft-desc", label: "Largest First" },
];

export default function PropertiesClient() {
  const searchParams = useSearchParams();
  const initialCat = searchParams.get("category") || "all";

  const [category, setCategory] = useState(initialCat);
  const [sort, setSort] = useState("default");

  const filtered = useMemo(() => {
    let list = [...properties];
    if (category !== "all") {
      list = list.filter((p) => p.category === (category as PropertyCategory));
    }
    if (sort === "price-asc") list.sort((a, b) => a.price - b.price);
    else if (sort === "price-desc") list.sort((a, b) => b.price - a.price);
    else if (sort === "sqft-desc") list.sort((a, b) => b.sqft - a.sqft);
    return list;
  }, [category, sort]);

  return (
    <div className={styles.wrap}>
      {/* Filters */}
      <div className={styles.filters}>
        <div className={styles.filterTabs}>
          {categories.map((cat) => (
            <button
              key={cat.value}
              className={`${styles.tab} ${category === cat.value ? styles.tabActive : ""}`}
              onClick={() => setCategory(cat.value)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className={styles.sortWrap}>
          <label htmlFor="sort" className={styles.sortLabel}>
            Sort by
          </label>
          <select id="sort" className={styles.select} value={sort} onChange={(e) => setSort(e.target.value)}>
            {sortOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Count */}
      <div className={styles.count}>
        <span className={styles.countNum}>{filtered.length}</span> properties found
      </div>

      {/* Grid */}
      <div className={styles.grid}>
        {filtered.map((p, i) => (
          <PropertyCard key={p.id} property={p} index={i} />
        ))}
      </div>

      {filtered.length === 0 && (
        <AnimatedSection className={styles.empty}>
          <p>No properties found for this filter.</p>
        </AnimatedSection>
      )}
    </div>
  );
}
