"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./Navbar.module.css";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/properties", label: "Properties" },
  { href: "/map", label: "Map View" },
  { href: "/about", label: "About" },
  { href: "/news", label: "News" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ""}`}>
        <div className={styles.inner}>
          <Link href="/" className={styles.logo}>
            <span className={styles.logoMark}>S</span>
            <span className={styles.logoText}>STERLING</span>
            <span className={styles.demoBadge}>Portfolio Sample</span>
          </Link>

          <ul className={styles.links}>
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={`${styles.link} ${pathname === link.href ? styles.active : ""}`}>
                  {link.label}
                  {pathname === link.href && <motion.span layoutId="nav-underline" className={styles.underline} />}
                </Link>
              </li>
            ))}
          </ul>

          <Link href="/contact" className={styles.cta}>
            Book a Consultation
          </Link>

          <button className={styles.burger} onClick={() => setMenuOpen((v) => !v)} aria-label="Toggle menu">
            <span className={menuOpen ? styles.burgerOpenTop : ""} />
            <span className={menuOpen ? styles.burgerOpenMid : ""} />
            <span className={menuOpen ? styles.burgerOpenBot : ""} />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className={styles.mobileMenu}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
              >
                <Link
                  href={link.href}
                  className={`${styles.mobileLink} ${pathname === link.href ? styles.mobileLinkActive : ""}`}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
            <Link href="/contact" className={styles.mobileCta}>
              Book a Consultation
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
