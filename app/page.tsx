import Hero from "@/components/Hero/Hero";
import AnimatedSection from "@/components/AnimatedSection/AnimatedSection";
import PropertyCard from "@/components/PropertyCard/PropertyCard";
import Counter from "@/components/Counter/Counter";
import { properties, stats, teamMembers } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";

export default function HomePage() {
  const featured = properties.filter((p) => p.featured);

  return (
    <>
      <Hero />

      {/* Stats */}
      <section className={styles.statsSection}>
        <div className={styles.statsGrid}>
          {stats.map((stat) => (
            <div key={stat.label} className={styles.statItem}>
              <div className={styles.statValue}>
                <Counter value={stat.value} suffix={stat.suffix} />
              </div>
              <div className={styles.statLabel}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Properties */}
      <section className={styles.section}>
        <div className={styles.container}>
          <AnimatedSection className={styles.sectionHeader}>
            <span className={styles.eyebrow}>Handpicked for You</span>
            <h2 className={styles.sectionTitle}>Featured Properties</h2>
            <p className={styles.sectionSub}>
              Discover our most sought-after listings — each one a masterpiece of design, location, and lifestyle.
            </p>
          </AnimatedSection>

          <div className={styles.propertiesGrid}>
            {featured.map((p, i) => (
              <PropertyCard key={p.id} property={p} index={i} />
            ))}
          </div>

          <AnimatedSection className={styles.viewAllWrap}>
            <Link href="/properties" className={styles.viewAll}>
              View All Properties
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* Why Sterling */}
      <section className={styles.whySection}>
        <div className={styles.whyInner}>
          <div className={styles.whyImage}>
            <Image
              src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=900&q=80"
              alt="Luxury interior"
              fill
              className={styles.whyImg}
              sizes="50vw"
            />
            <div className={styles.whyImageOverlay} />
            <div className={styles.whyBadge}>
              <span className={styles.whyBadgeNum}>20+</span>
              <span className={styles.whyBadgeText}>Years of Excellence</span>
            </div>
          </div>

          <div className={styles.whyContent}>
            <AnimatedSection direction="right">
              <span className={styles.eyebrow}>Why Choose Sterling Realty</span>
              <h2 className={styles.sectionTitle}>
                We Don&apos;t Just Sell
                <br />
                <em>We Elevate</em>
              </h2>
              <p className={styles.bodyText}>
                At Sterling Realty, every engagement is a concierge experience. We combine deep market intelligence with
                an unmatched portfolio of South Florida&apos;s finest properties to deliver results that exceed
                expectations.
              </p>

              <div className={styles.pillars}>
                {[
                  {
                    icon: "◆",
                    title: "Market Intelligence",
                    desc: "Real-time data on 20+ years of local transactions",
                  },
                  {
                    icon: "◈",
                    title: "White Glove Service",
                    desc: "Dedicated agent, private showings, full discretion",
                  },
                  {
                    icon: "◉",
                    title: "Global Network",
                    desc: "Access to off-market listings and international buyers",
                  },
                ].map((pillar) => (
                  <div key={pillar.title} className={styles.pillar}>
                    <span className={styles.pillarIcon}>{pillar.icon}</span>
                    <div>
                      <h4 className={styles.pillarTitle}>{pillar.title}</h4>
                      <p className={styles.pillarDesc}>{pillar.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Link href="/about" className={styles.btnGold}>
                Meet Our Team
              </Link>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Map CTA */}
      <section className={styles.mapCta}>
        <AnimatedSection className={styles.mapCtaContent}>
          <span className={styles.eyebrow}>Explore by Location</span>
          <h2 className={styles.sectionTitle}>Find Properties on the Map</h2>
          <p className={styles.bodyText} style={{ maxWidth: 520, margin: "0 auto 2rem" }}>
            Browse our entire portfolio geographically. Filter by property type and instantly see what&apos;s available
            in your neighborhood of choice.
          </p>
          <Link href="/map" className={styles.btnGold}>
            Open Interactive Map
          </Link>
        </AnimatedSection>
      </section>

      {/* Team Preview */}
      <section className={styles.section}>
        <div className={styles.container}>
          <AnimatedSection className={styles.sectionHeader}>
            <span className={styles.eyebrow}>The Experts</span>
            <h2 className={styles.sectionTitle}>Our Team</h2>
          </AnimatedSection>

          <div className={styles.teamGrid}>
            {teamMembers.slice(0, 4).map((member, i) => (
              <AnimatedSection key={member.id} delay={i * 0.1}>
                <div className={styles.teamCard}>
                  <div className={styles.teamImageWrap}>
                    <Image src={member.image} alt={member.name} fill className={styles.teamImage} sizes="25vw" />
                    <div className={styles.teamOverlay} />
                  </div>
                  <div className={styles.teamBody}>
                    <h3 className={styles.teamName}>{member.name}</h3>
                    <p className={styles.teamRole}>{member.role}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className={styles.ctaBanner}>
        <AnimatedSection className={styles.ctaBannerContent}>
          <h2 className={styles.ctaTitle}>Ready to Find Your Dream Home?</h2>
          <p className={styles.ctaText}>
            Let our experts guide you through South Florida&apos;s most exclusive market.
          </p>
          <div className={styles.ctaActions}>
            <Link href="/contact" className={styles.btnPrimary}>
              Start a Conversation
            </Link>
            <Link href="/properties" className={styles.btnOutline}>
              Browse Listings
            </Link>
          </div>
        </AnimatedSection>
      </section>
    </>
  );
}
