import Image from "next/image";
import Link from "next/link";
import AnimatedSection from "@/components/AnimatedSection/AnimatedSection";
import Counter from "@/components/Counter/Counter";
import { teamMembers, stats } from "@/lib/data";
import styles from "./page.module.css";

export const metadata = {
  title: "About — Sterling Realty",
  description: "Meet the team behind South Florida's most trusted luxury real estate firm.",
};

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <div className={styles.pageHero}>
        <div className={styles.pageHeroOverlay} />
        <AnimatedSection className={styles.heroContent}>
          <span className={styles.eyebrow}>Our Story</span>
          <h1 className={styles.pageTitle}>
            Built on Trust,
            <br />
            <em>Driven by Excellence</em>
          </h1>
          <p className={styles.pageSub}>
            For over two decades, Sterling Realty has set the standard for luxury real estate in South Florida —
            delivering exceptional results and unparalleled client service.
          </p>
        </AnimatedSection>
      </div>

      {/* Story Section */}
      <section className={styles.storySection}>
        <div className={styles.storyInner}>
          <AnimatedSection direction="left" className={styles.storyContent}>
            <span className={styles.eyebrow}>Since 2004</span>
            <h2 className={styles.sectionTitle}>A Legacy of Luxury</h2>
            <p className={styles.bodyText}>
              Sterling Realty was founded in 2004 with a single vision: to create a real estate firm that combines
              institutional expertise with the warmth and discretion of a boutique practice. Over 20 years later,
              we&apos;ve closed over $2 billion in transactions while maintaining the personal relationships that define
              us.
            </p>
            <p className={styles.bodyText}>
              From waterfront penthouses in Brickell to sprawling estates in Coral Gables, we&apos;ve navigated every
              cycle of the Miami market, always delivering exceptional value for our clients.
            </p>
            <div className={styles.storyStats}>
              {stats.map((s) => (
                <div key={s.label} className={styles.storyStat}>
                  <div className={styles.storyStatVal}>
                    <Counter value={s.value} suffix={s.suffix} />
                  </div>
                  <div className={styles.storyStatLabel}>{s.label}</div>
                </div>
              ))}
            </div>
          </AnimatedSection>

          <AnimatedSection direction="right" className={styles.storyImages}>
            <div className={styles.imageStack}>
              <div className={styles.imageMain}>
                <Image
                  src="https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?w=800&q=80"
                  alt="Sterling Realty office"
                  fill
                  className={styles.img}
                  sizes="40vw"
                />
              </div>
              <div className={styles.imageSub}>
                <Image
                  src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=500&q=80"
                  alt="Team meeting"
                  fill
                  className={styles.img}
                  sizes="25vw"
                />
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Values */}
      <section className={styles.valuesSection}>
        <div className={styles.container}>
          <AnimatedSection className={styles.sectionHeader}>
            <span className={styles.eyebrow}>What We Stand For</span>
            <h2 className={styles.sectionTitle}>Our Values</h2>
          </AnimatedSection>
          <div className={styles.valuesGrid}>
            {[
              {
                num: "01",
                title: "Integrity First",
                desc: "We operate with complete transparency. Our clients always know they&apos;re getting honest guidance, not just a sale.",
              },
              {
                num: "02",
                title: "Expert Knowledge",
                desc: "Our team&apos;s deep expertise in architecture, law, and finance means we see value others miss.",
              },
              {
                num: "03",
                title: "Discretion",
                desc: "We understand privacy is paramount for our clients. Every transaction is handled with absolute confidence.",
              },
              {
                num: "04",
                title: "Global Reach",
                desc: "With an international network spanning 40+ countries, we connect Miami properties with qualified buyers worldwide.",
              },
            ].map((v) => (
              <AnimatedSection key={v.num} className={styles.valueCard}>
                <div className={styles.valueNum}>{v.num}</div>
                <h3 className={styles.valueTitle}>{v.title}</h3>
                <p className={styles.valueDesc} dangerouslySetInnerHTML={{ __html: v.desc }} />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section id="team" className={styles.teamSection}>
        <div className={styles.container}>
          <AnimatedSection className={styles.sectionHeader}>
            <span className={styles.eyebrow}>The People</span>
            <h2 className={styles.sectionTitle}>Meet Our Team</h2>
            <p className={styles.sectionSub}>
              Industry veterans dedicated to finding your perfect property and making every transaction seamless.
            </p>
          </AnimatedSection>

          <div className={styles.teamGrid}>
            {teamMembers.map((member, i) => (
              <AnimatedSection key={member.id} delay={i * 0.1} className={styles.teamCard}>
                <div className={styles.teamImageWrap}>
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className={styles.teamImage}
                    sizes="(max-width: 900px) 50vw, 25vw"
                  />
                  <div className={styles.teamOverlay} />
                </div>
                <div className={styles.teamBody}>
                  <h3 className={styles.teamName}>{member.name}</h3>
                  <p className={styles.teamRole}>{member.role}</p>
                  <p className={styles.teamBio}>{member.bio}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.ctaSection}>
        <AnimatedSection className={styles.ctaContent}>
          <h2 className={styles.ctaTitle}>Ready to Work Together?</h2>
          <p className={styles.ctaText}>Connect with our team today and experience what sets Sterling Realty apart.</p>
          <Link href="/contact" className={styles.ctaBtn}>
            Get in Touch
          </Link>
        </AnimatedSection>
      </section>
    </>
  );
}
