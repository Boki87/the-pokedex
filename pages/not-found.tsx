import Image from "next/image";
import Link from "next/link";

export default function Custom404() {
  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div style={{ textAlign: "center", width: "100%" }}>
        <h1
          className="text-xl"
          style={{ color: "var(--red)", letterSpacing: "0.6rem" }}
        >
          SORRY
        </h1>
        <Image src="/images/404.png" width={300} height={150} alt="404 image" />
        <p className="text-md" style={{ color: "var(--text-black-light)" }}>
          Pokemon not found
        </p>
        <Link href="/">
          <button
            style={{
              border: `1px solid var(--color-black)`,
              background: "none",
              height: "40px",
              padding: "0px 10px",
              borderRadius: "7px",
              cursor: "pointer",
            }}
          >
            BACK HOME
          </button>
        </Link>
      </div>
    </div>
  );
}
