import { ReactNode, useEffect, useState } from "react";
import LoadingPage from "../LoadingPage";
import { useRouter } from "next/router";
import style from "./style.module.css";

interface ILayout {
  children: ReactNode;
}

export default function Layout({ children }: ILayout) {
  const router = useRouter();
  const [showLoader, setShowLoader] = useState(false);

  function aniShowLoader() {
    setShowLoader(true);
  }

  function aniHideLoader() {
    setShowLoader(false);
  }

  useEffect(() => {
    router.events.on("routeChangeStart", aniShowLoader);
    router.events.on("routeChangeComplete", aniHideLoader);
    router.events.on("routeChangeError", aniHideLoader);

    return () => {
      router.events.off("routeChangeStart", aniShowLoader);
      router.events.off("routeChangeComplete", aniHideLoader);
      router.events.off("routeChangeError", aniHideLoader);
    };
  }, []);

  return (
    <div className={style.layout}>
      <div className={style.layout__inner_frame}>
        {showLoader ? <LoadingPage /> : children}
      </div>
    </div>
  );
}
