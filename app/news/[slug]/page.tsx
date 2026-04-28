import Image from "next/image";
import Link from "next/link";
import AnimatedSection from "@/components/AnimatedSection/AnimatedSection";
import styles from "./page.module.css";

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function fetchPost(id: string): Promise<Post | null> {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) return null;
  return res.json();
}

const coverImages = [
  "https://images.unsplash.com/photo-1460317442991-0ec209397118?w=1200&q=80",
  "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&q=80",
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80",
];

export default async function NewsDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await fetchPost(slug);

  const coverImage = coverImages[Number(slug) % coverImages.length];

  const displayTitle = post
    ? `Miami Real Estate Insight: ${post.title.charAt(0).toUpperCase() + post.title.slice(1)}`
    : "Article Not Found";

  const bodyParagraphs = post
    ? [post.body, post.body, post.body].join(" ").split("\n").filter(Boolean).slice(0, 8)
    : [];

  return (
    <>
      <div className={styles.pageHero}>
        <Image src={coverImage} alt={displayTitle} fill className={styles.heroImage} priority sizes="100vw" />
        <div className={styles.heroOverlay} />
        <AnimatedSection className={styles.heroContent}>
          <Link href="/news" className={styles.backLink}>
            ← Back to News
          </Link>
          <div className={styles.articleMeta}>
            <span className={styles.tag}>Market Insights</span>
            <span className={styles.metaDot}>·</span>
            <span>April 15, 2026</span>
            <span className={styles.metaDot}>·</span>
            <span>5 min read</span>
          </div>
          <h1 className={styles.title}>{displayTitle}</h1>
        </AnimatedSection>
      </div>

      <div className={styles.container}>
        <div className={styles.articleLayout}>
          <article className={styles.article}>
            <AnimatedSection>
              {bodyParagraphs.map((para, i) => (
                <p key={i} className={styles.para}>
                  {i === 0 && <span className={styles.dropCap}>{para.charAt(0)}</span>}
                  {i === 0 ? para.slice(1) : para}
                </p>
              ))}
            </AnimatedSection>
          </article>

          <aside className={styles.sidebar}>
            <AnimatedSection direction="right" className={styles.sideCard}>
              <h3 className={styles.sideTitle}>About the Author</h3>
              <div className={styles.author}>
                <div className={styles.authorAvatar}>
                  <Image
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&q=80"
                    alt="Alexandra Sterling"
                    fill
                    className={styles.authorImg}
                    sizes="60px"
                  />
                </div>
                <div>
                  <p className={styles.authorName}>Alexandra Sterling</p>
                  <p className={styles.authorRole}>Principal Broker</p>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right" delay={0.1} className={styles.sideCard}>
              <h3 className={styles.sideTitle}>Explore Properties</h3>
              <p className={styles.sideText}>Ready to act on these insights? Browse our current portfolio.</p>
              <Link href="/properties" className={styles.sideBtn}>
                View All Listings
              </Link>
            </AnimatedSection>
          </aside>
        </div>
      </div>
    </>
  );
}
