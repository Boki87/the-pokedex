import { useState } from "react";
import SearchInput from "../SearchInput";
import { GiStarsStack } from "react-icons/gi";
import style from "./index.module.css";
import { fetchSinglePokemon } from "../../utils/apiCalls";
import { useRouter } from "next/router";

export default function HomeHeader({ onOpenMenu }: { onOpenMenu: () => void }) {
  const [search, setSearch] = useState("");
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();

  async function searchSubmitHandler(val?: any) {
    try {
      setLoading(true);
      let q = parseInt(search) || search.toLowerCase();
      if (val) {
        q = parseInt(val) || val.toLowerCase();
      }
      const res = await fetchSinglePokemon(q);
      console.log(res);
      setSearch("");
      setLoading(false);
      router.push(`/${res.id}`);
    } catch (e) {
      console.log(e);
      setSearch("");
      setLoading(false);
      router.push("/not-found");
    }
  }

  return (
    <div className={style.home_header}>
      <div className={style.home_header__bg_layer}>
        <img src="/images/pokeball2.png" />
      </div>
      <div className={style.home_header__content}>
        <button onClick={onOpenMenu} className={style.home_header__burger_btn}>
          <GiStarsStack style={{ color: "#444" }} />
        </button>
        <div className={style.home_header__title}>
          <h1 className="text-xl">Pokedex</h1>
        </div>
        <div className={style.home_header__input_container}>
          <SearchInput
            value={search}
            loading={isLoading}
            onInput={(val) => setSearch(val)}
            action={searchSubmitHandler}
          />
        </div>
      </div>
    </div>
  );
}
