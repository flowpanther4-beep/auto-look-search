import Link from "next/link";

export default function HomePage() {
  return (
    <main className="main-card">
      <h1>AutoPartSnap</h1>
      <p className="subtitle">Identify car parts from a photo</p>
      <Link href="/login" className="cta-button">
        Get Started
      </Link>
    </main>
  );
}
