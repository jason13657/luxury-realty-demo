import MapClient from "./MapClient";
import styles from "./page.module.css";

export const metadata = {
  title: "Map View — Sterling Realty",
  description: "Explore Miami luxury properties on an interactive map with category filters.",
};

export default function MapPage() {
  return (
    <>
      <div className={styles.pageHero}>
        <div className={styles.overlay} />
        <div className={styles.heroContent}>
          <span className={styles.eyebrow}>Explore by Location</span>
          <h1 className={styles.pageTitle}>Interactive Map</h1>
          <p className={styles.pageSub}>
            Toggle property categories to find exactly what you&apos;re looking for across Miami.
          </p>
        </div>
      </div>

      <div className={styles.container}>
        <MapClient />
      </div>
    </>
  );
}
