import { notFound } from "next/navigation";
import { properties } from "@/lib/data";
import PropertyGallery from "./PropertyGallery";
import AnimatedSection from "@/components/AnimatedSection/AnimatedSection";
import PropertyCard from "@/components/PropertyCard/PropertyCard";
import Link from "next/link";
import styles from "./page.module.css";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return properties.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const property = properties.find((p) => p.id === id);
  if (!property) return { title: "Property Not Found" };
  return {
    title: `${property.title} — Sterling Realty`,
    description: property.description.slice(0, 160),
  };
}

export default async function PropertyDetailPage({ params }: PageProps) {
  const { id } = await params;
  const property = properties.find((p) => p.id === id);
  if (!property) notFound();

  const similar = properties.filter((p) => p.id !== property.id && p.category === property.category).slice(0, 3);

  const formattedPrice =
    property.category === "commercial" || property.status === "for-rent"
      ? `$${property.price.toLocaleString()}/mo`
      : `$${property.price.toLocaleString()}`;

  return (
    <>
      {/* Hero bar */}
      <div className={styles.heroBar}>
        <div className={styles.heroBarInner}>
          <div>
            <h1 className={styles.heroTitle}>{property.title}</h1>
            <p className={styles.heroAddress}>
              {property.address}, {property.city}
            </p>
          </div>
          <div className={styles.heroPrice}>{formattedPrice}</div>
        </div>
      </div>

      <div className={styles.container}>
        {/* Gallery */}
        <div className={styles.galleryWrap}>
          <PropertyGallery property={property} />
        </div>

        {/* Body */}
        <div className={styles.body}>
          {/* Main col */}
          <div className={styles.mainCol}>
            <AnimatedSection>
              <div className={styles.specBar}>
                {property.beds > 0 && (
                  <div className={styles.specItem}>
                    <span className={styles.specVal}>{property.beds}</span>
                    <span className={styles.specKey}>Bedrooms</span>
                  </div>
                )}
                {property.baths > 0 && (
                  <div className={styles.specItem}>
                    <span className={styles.specVal}>{property.baths}</span>
                    <span className={styles.specKey}>Bathrooms</span>
                  </div>
                )}
                {property.sqft > 0 && (
                  <div className={styles.specItem}>
                    <span className={styles.specVal}>{property.sqft.toLocaleString()}</span>
                    <span className={styles.specKey}>Sq Ft</span>
                  </div>
                )}
                {property.garage > 0 && (
                  <div className={styles.specItem}>
                    <span className={styles.specVal}>{property.garage}</span>
                    <span className={styles.specKey}>Garage</span>
                  </div>
                )}
                {property.yearBuilt > 0 && (
                  <div className={styles.specItem}>
                    <span className={styles.specVal}>{property.yearBuilt}</span>
                    <span className={styles.specKey}>Year Built</span>
                  </div>
                )}
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <h2 className={styles.sectionTitle}>About This Property</h2>
              <p className={styles.description}>{property.description}</p>
            </AnimatedSection>

            <AnimatedSection delay={0.15}>
              <h2 className={styles.sectionTitle}>Features & Amenities</h2>
              <ul className={styles.features}>
                {property.features.map((f) => (
                  <li key={f} className={styles.feature}>
                    <span className={styles.featureDot}>◆</span>
                    {f}
                  </li>
                ))}
              </ul>
            </AnimatedSection>
          </div>

          {/* Sidebar */}
          <div className={styles.sidebar}>
            <AnimatedSection direction="right" className={styles.contactCard}>
              <h3 className={styles.contactTitle}>Schedule a Viewing</h3>
              <p className={styles.contactSub}>Contact our team for a private showing of this property.</p>
              <form className={styles.form}>
                <input type="text" placeholder="Your Name" className={styles.input} aria-label="Your Name" />
                <input type="email" placeholder="Email Address" className={styles.input} aria-label="Email Address" />
                <input type="tel" placeholder="Phone Number" className={styles.input} aria-label="Phone Number" />
                <textarea rows={3} placeholder="Message (optional)" className={styles.textarea} aria-label="Message" />
                <button type="submit" className={styles.submitBtn}>
                  Request Viewing
                </button>
              </form>
            </AnimatedSection>

            <AnimatedSection direction="right" delay={0.1} className={styles.mapCard}>
              <h3 className={styles.contactTitle}>Location</h3>
              <div className={styles.mapPlaceholder}>
                <div className={styles.mapLabel}>
                  <span className={styles.mapPin}>📍</span>
                  {property.address}
                  <br />
                  {property.city}
                </div>
                <Link href="/map" className={styles.mapLink}>
                  View on full map →
                </Link>
              </div>
            </AnimatedSection>
          </div>
        </div>

        {/* Similar */}
        {similar.length > 0 && (
          <AnimatedSection className={styles.similar}>
            <h2 className={styles.sectionTitle} style={{ marginBottom: "2rem" }}>
              Similar Properties
            </h2>
            <div className={styles.similarGrid}>
              {similar.map((p, i) => (
                <PropertyCard key={p.id} property={p} index={i} />
              ))}
            </div>
          </AnimatedSection>
        )}
      </div>
    </>
  );
}
