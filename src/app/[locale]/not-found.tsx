import Link from "next/link";

// not-found parametre almadığından iki dilde birlikte gösterilir
export default function NotFound() {
  return (
    <main className="gate">
      <div>
        <h1 className="x" style={{ fontSize: "2rem" }}>Sayfa bulunamadı</h1>
        <p className="lead" style={{ margin: "8px auto 4px" }}>Aradığınız sayfa taşınmış veya kaldırılmış olabilir.</p>
        <p className="lead" style={{ margin: "0 auto 24px" }} lang="en">Page not found.</p>
        <Link className="btn btn-o" href="/tr">Ana sayfa</Link>{" "}
        <Link className="btn btn-line" href="/en">Home</Link>
      </div>
    </main>
  );
}
