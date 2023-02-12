import Image from "next/image";

export default function LoadingPage() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Image
        src="/images/pikachu-running.gif"
        width={200}
        height={145}
        alt="loading spinner"
      />
    </div>
  );
}
