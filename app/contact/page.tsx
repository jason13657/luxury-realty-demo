import AnimatedSection from "@/components/AnimatedSection/AnimatedSection";
import ContactForm from "./ContactForm";
import styles from "./page.module.css";

export const metadata = {
  title: "Contact — Sterling Realty",
  description: "Get in touch with Miami's leading luxury real estate team.",
};

const officeInfo = [
  {
    icon: "📍",
    label: "Office",
    lines: ["1200 Brickell Ave, Suite 1800", "Miami, FL 33131"],
  },
  {
    icon: "📞",
    label: "Phone",
    lines: ["(305) 555-0100"],
  },
  {
    icon: "✉️",
    label: "Email",
    lines: ["hello@sterlingrealty.com", "investments@sterlingrealty.com"],
  },
  {
    icon: "🕐",
    label: "Hours",
    lines: ["Monday – Friday: 9am – 7pm", "Saturday: 10am – 5pm"],
  },
];

export default function ContactPage() {
  return (
    <>
      <div className={styles.pageHero}>
        <div className={styles.overlay} />
        <AnimatedSection className={styles.heroContent}>
          <span className={styles.eyebrow}>Let&apos;s Connect</span>
          <h1 className={styles.pageTitle}>Contact Us</h1>
          <p className={styles.pageSub}>
            Whether you&apos;re buying, selling, or simply exploring — our team is ready to guide you through every
            step.
          </p>
        </AnimatedSection>
      </div>

      <div className={styles.container}>
        <div className={styles.layout}>
          {/* Form */}
          <AnimatedSection className={styles.formSection}>
            <h2 className={styles.sectionTitle}>Send Us a Message</h2>
            <p className={styles.sectionSub}>Fill out the form and we&apos;ll get back to you within 24 hours.</p>
            <ContactForm />
          </AnimatedSection>

          {/* Info */}
          <div className={styles.infoSection}>
            <AnimatedSection direction="right">
              <h2 className={styles.sectionTitle}>Our Office</h2>
              <div className={styles.infoCards}>
                {officeInfo.map((item) => (
                  <div key={item.label} className={styles.infoCard}>
                    <span className={styles.infoIcon}>{item.icon}</span>
                    <div>
                      <p className={styles.infoLabel}>{item.label}</p>
                      {item.lines.map((line) => (
                        <p key={line} className={styles.infoLine}>
                          {line}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedSection>

            {/* Map placeholder */}
            <AnimatedSection direction="right" delay={0.1} className={styles.mapCard}>
              <div className={styles.mapPlaceholder}>
                <div className={styles.mapGrid}>
                  {Array.from({ length: 12 }).map((_, i) => (
                    <div key={i} className={styles.mapCell} />
                  ))}
                </div>
                <div className={styles.mapPin}>
                  <div className={styles.mapPinDot} />
                  <div className={styles.mapPinLabel}>Sterling Realty HQ</div>
                </div>
              </div>
              <p className={styles.mapNote}>1200 Brickell Ave — Miami&apos;s Financial District</p>
            </AnimatedSection>

            {/* Agents */}
            <AnimatedSection direction="right" delay={0.15} className={styles.agentsCard}>
              <h3 className={styles.agentsTitle}>Or Call an Agent Directly</h3>
              {[
                { name: "Alexandra Sterling", phone: "(305) 555-0101", specialty: "Luxury Homes" },
                { name: "Marcus Vidal", phone: "(305) 555-0102", specialty: "Waterfront" },
                { name: "Isabelle Chen", phone: "(305) 555-0103", specialty: "International Buyers" },
              ].map((agent) => (
                <div key={agent.name} className={styles.agentRow}>
                  <div>
                    <p className={styles.agentName}>{agent.name}</p>
                    <p className={styles.agentSpec}>{agent.specialty}</p>
                  </div>
                  <a href={`tel:${agent.phone.replace(/\D/g, "")}`} className={styles.agentPhone}>
                    {agent.phone}
                  </a>
                </div>
              ))}
            </AnimatedSection>
          </div>
        </div>
      </div>
    </>
  );
}
