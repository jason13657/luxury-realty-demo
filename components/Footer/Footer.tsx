import Link from "next/link";
import styles from "./Footer.module.css";

const footerLinks = {
  Properties: [
    { label: "Residential", href: "/properties?category=residential" },
    { label: "Luxury", href: "/properties?category=luxury" },
    { label: "Commercial", href: "/properties?category=commercial" },
    { label: "Land", href: "/properties?category=land" },
    { label: "Map View", href: "/map" },
  ],
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Our Team", href: "/about#team" },
    { label: "News & Insights", href: "/news" },
    { label: "Contact", href: "/contact" },
  ],
};

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <div className={styles.logo}>
            <span className={styles.logoMark}>S</span>
            <span className={styles.logoText}>STERLING REALTY</span>
          </div>
          <p className={styles.tagline}>
            South Florida&apos;s Premier Luxury Real Estate Firm. Exceptional properties, extraordinary service.
          </p>
          <div className={styles.socials}>
            {["Instagram", "LinkedIn", "Twitter"].map((s) => (
              <a key={s} href="#" className={styles.social} aria-label={s}>
                {s[0]}
              </a>
            ))}
          </div>
        </div>

        {Object.entries(footerLinks).map(([section, links]) => (
          <div key={section} className={styles.col}>
            <h4 className={styles.colTitle}>{section}</h4>
            <ul className={styles.colLinks}>
              {links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={styles.colLink}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className={styles.col}>
          <h4 className={styles.colTitle}>Contact</h4>
          <ul className={styles.colLinks}>
            <li className={styles.colText}>1200 Brickell Ave, Suite 1800</li>
            <li className={styles.colText}>Miami, FL 33131</li>
            <li>
              <a href="tel:+13055550100" className={styles.colLink}>
                (305) 555-0100
              </a>
            </li>
            <li>
              <a href="mailto:hello@sterlingrealty.com" className={styles.colLink}>
                hello@sterlingrealty.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className={styles.bottom}>
        <p>© {new Date().getFullYear()} Sterling Realty. All rights reserved.</p>
        <div className={styles.bottomLinks}>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
        </div>
      </div>

      <div className={styles.devBanner}>
        <p className={styles.devText}>
          Sample site built by <span className={styles.devName}>Jason Seo</span>
          <span className={styles.devSep}>·</span>April 19, 2026
          <span className={styles.devSep}>·</span>available for hire
        </p>
        <div className={styles.devLinks}>
          <a href="mailto:jong13657@gmail.com" className={styles.devLink} aria-label="Email">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="M2 7l10 7 10-7" />
            </svg>
            jong13657@gmail.com
          </a>
          <a
            href="https://github.com/jason13657"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.devLink}
            aria-label="GitHub"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
            GitHub
          </a>
          <a
            href="https://www.upwork.com/freelancers/~015769c129f9b58553?viewMode=1"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.devLink}
            aria-label="Upwork"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.076.008-.042c.207-1.143.849-3.06 2.839-3.06 1.492 0 2.703 1.212 2.703 2.703-.001 1.489-1.212 2.702-2.704 2.702zm0-8.14c-2.539 0-4.51 1.649-5.31 4.366-1.22-1.834-2.148-4.036-2.687-5.892H7.828v7.112c-.002 1.406-1.141 2.546-2.547 2.546-1.405 0-2.543-1.14-2.545-2.546V3.492H0v7.112c0 2.914 2.37 5.303 5.281 5.303 2.913 0 5.283-2.389 5.283-5.303v-1.19c.529 1.107 1.182 2.229 1.974 3.221l-1.673 7.873h2.797l1.213-5.71c1.063.679 2.285 1.109 3.686 1.109 3 0 5.439-2.452 5.439-5.45 0-3-2.439-5.439-5.439-5.439z" />
            </svg>
            Upwork
          </a>
        </div>
      </div>
    </footer>
  );
}
