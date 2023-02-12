import { useRef, ReactNode } from "react";
import { useInView } from "framer-motion";

function AnimatedSection({ children }: { children: ReactNode }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <div
      ref={ref}
      style={{
        position: "relative",
        transform: isInView ? "none" : "translateY(60px)",
        opacity: isInView ? 1 : 0,
        transition: "all 0.2s cubic-bezier(0.17, 0.55, 0.55, 1) 0.2s",
      }}
    >
      {children}
    </div>
  );
}

export default AnimatedSection;
