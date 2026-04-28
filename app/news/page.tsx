import Image from "next/image";
import Link from "next/link";
import AnimatedSection from "@/components/AnimatedSection/AnimatedSection";
import { newsCategories } from "@/lib/data";
import styles from "./page.module.css";

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

// Simulates fetching from a headless CMS API endpoint
async function fetchArticles(): Promise<Post[]> {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=9", {
    next: { revalidate: 3600 },
  });
  if (!res.ok) return [];
  return res.json();
}

const coverImages = [
  "https://images.unsplash.com/photo-1460317442991-0ec209397118?w=800&q=80",
  "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80",
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
  "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=800&q=80",
  "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80",
  "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
  "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
  "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80",
];

const realTitles = [
  "Miami Luxury Market Hits Record $6.2B in Q1 Sales",
  "Inside the Most Expensive Penthouse Ever Listed in Brickell",
  "Why International Buyers Are Flocking to Coral Gables in 2026",
  "New Construction Boom: 15 Luxury Towers Breaking Ground This Year",
  "The Rise of Smart Homes: How Technology Is Reshaping Miami Real Estate",
  "Wynwood's Commercial Resurgence: What Investors Need to Know",
  "Waterfront Living: A Guide to Miami's Best Boating Communities",
  "Design Trends Dominating Luxury Interiors in South Florida",
  "Interest Rate Outlook: What It Means for Miami Property Buyers",
];

export const metadata = {
  title: "News & Insights — Sterling Realty",
  description: "Stay informed with the latest Miami luxury real estate news and market insights.",
};

export default async function NewsPage() {
  const posts = await fetchArticles();

  return (
    <>
      <div className={styles.pageHero}>
        <div className={styles.overlay} />
        <AnimatedSection className={styles.heroContent}>
          <span className={styles.eyebrow}>Market Intelligence</span>
          <h1 className={styles.pageTitle}>News & Insights</h1>
          <p className={styles.pageSub}>
            Expert analysis, market trends, and lifestyle features from South Florida&apos;s luxury real estate world.
          </p>
        </AnimatedSection>
      </div>

      <div className={styles.container}>
        {/* Category tabs */}
        <div className={styles.categoryRow}>
          <button className={`${styles.catBtn} ${styles.catBtnActive}`}>All</button>
          {newsCategories.map((cat) => (
            <button key={cat} className={styles.catBtn}>
              {cat}
            </button>
          ))}
        </div>

        {/* Featured article */}
        {posts.length > 0 && (
          <AnimatedSection className={styles.featured}>
            <div className={styles.featuredImage}>
              <Image
                src={coverImages[0]}
                alt={realTitles[0]}
                fill
                className={styles.featuredImg}
                sizes="60vw"
                priority
              />
              <div className={styles.featuredOverlay} />
            </div>
            <div className={styles.featuredContent}>
              <span className={styles.featuredTag}>Market Insights</span>
              <h2 className={styles.featuredTitle}>{realTitles[0]}</h2>
              <p className={styles.featuredExcerpt}>{posts[0].body.slice(0, 180).replace(/\n/g, " ")}...</p>
              <div className={styles.articleMeta}>
                <span className={styles.metaDate}>April 15, 2026</span>
                <span className={styles.metaDot}>·</span>
                <span className={styles.metaRead}>5 min read</span>
              </div>
              <Link href={`/news/${posts[0].id}`} className={styles.readBtn}>
                Read Full Article →
              </Link>
            </div>
          </AnimatedSection>
        )}

        {/* Grid */}
        <div className={styles.grid}>
          {posts.slice(1).map((post, i) => (
            <AnimatedSection key={post.id} delay={i * 0.07} className={styles.card}>
              <Link href={`/news/${post.id}`} className={styles.cardLink}>
                <div className={styles.cardImage}>
                  <Image
                    src={coverImages[(i + 1) % coverImages.length]}
                    alt={realTitles[(i + 1) % realTitles.length]}
                    fill
                    className={styles.cardImg}
                    sizes="(max-width: 700px) 100vw, 33vw"
                  />
                  <div className={styles.cardOverlay} />
                  <span className={styles.cardTag}>{newsCategories[i % newsCategories.length]}</span>
                </div>
                <div className={styles.cardBody}>
                  <div className={styles.articleMeta}>
                    <span className={styles.metaDate}>April {10 - i}, 2026</span>
                    <span className={styles.metaDot}>·</span>
                    <span className={styles.metaRead}>{3 + i} min read</span>
                  </div>
                  <h3 className={styles.cardTitle}>{realTitles[(i + 1) % realTitles.length]}</h3>
                  <p className={styles.cardExcerpt}>{post.body.slice(0, 100).replace(/\n/g, " ")}...</p>
                  <span className={styles.cardReadMore}>Read More →</span>
                </div>
              </Link>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </>
  );
}
