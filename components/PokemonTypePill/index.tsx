import style from "./index.module.css";

interface IPokemonTypePill {
  name: string;
  showIcon?: boolean;
}

export default function PokemonTypePill({ name, showIcon }: IPokemonTypePill) {
  return (
    <div className={style.type_pill} style={{ background: `var(--${name})` }}>
      {showIcon && (
        <div className={style.type_pill__icon}>
          <img src={`/icons/${name}.svg`} />
        </div>
      )}
      <div className={style.type_pill__name}>{name}</div>
    </div>
  );
}
