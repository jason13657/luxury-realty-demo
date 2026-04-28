import { Suspense } from "react";
import PropertiesClient from "./PropertiesClient";
import styles from "./page.module.css";

export const metadata = {
  title: "Properties — Sterling Realty",
  description: "Browse our full portfolio of Miami luxury real estate.",
};

export default function PropertiesPage() {
  return (
    <>
      <div className={styles.pageHero}>
        <div className={styles.pageHeroOverlay} />
        <div className={styles.pageHeroContent}>
          <span className={styles.eyebrow}>Our Portfolio</span>
          <h1 className={styles.pageTitle}>Properties</h1>
          <p className={styles.pageSub}>
            Explore our curated collection of South Florida&apos;s finest homes, estates, and investment opportunities.
          </p>
        </div>
      </div>

      <div className={styles.container}>
        <Suspense fallback={<div className={styles.loading}>Loading properties…</div>}>
          <PropertiesClient />
        </Suspense>
      </div>
    </>
  );
}
