import { useRef, useEffect, useState, SyntheticEvent } from "react";
import style from "./style.module.css";
import { BsSearch, BsArrowReturnLeft } from "react-icons/bs";
import { TbPokeball } from "react-icons/tb";
import { useOutsideClick } from "../../utils/useOutsideClick";

interface ISearchInput {
  value: string;
  onInput: (val: string) => void;
  loading?: boolean;
  action?: (val?: any) => void;
  [x: string]: any;
}

export default function SearchInput({
  value,
  onInput,
  loading,
  action,
  ...rest
}: ISearchInput) {
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const isFocused = useRef(false);
  const [showOutline, setShowOutline] = useState(false);

  useOutsideClick(containerRef, () => {
    onBlur();
  });

  function focusInput() {
    inputRef.current?.focus();
  }

  function onFocus() {
    setShowOutline(true);
    isFocused.current = true;
  }
  function onBlur() {
    setShowOutline(false);
    isFocused.current = false;
  }

  function setListenersOnInput() {
    inputRef.current?.addEventListener("focus", onFocus);
    // inputRef.current?.addEventListener("blur", onBlur);
  }

  function removeListenersOnInput() {
    inputRef.current?.removeEventListener("focus", onFocus);
    // inputRef.current?.removeEventListener("blur", onBlur);
  }

  function escapePressed(e: KeyboardEvent) {
    if (isFocused.current && e.key === "Escape") {
      onBlur();
      onInput("");
      inputRef.current?.blur();
    }
    if (isFocused.current && e.key === "Enter") {
      actionHandler(inputRef?.current?.value);
    }
  }

  function setKeyboardListener() {
    window.addEventListener("keyup", escapePressed);
  }

  function removeKeyboardListener() {
    window.removeEventListener("keyup", escapePressed);
  }

  function actionHandler(val?: any) {
    if (inputRef?.current?.value === "") return;
    if (action) {
      action(val);
    }
  }

  useEffect(() => {
    setListenersOnInput();
    setKeyboardListener();
    return () => {
      removeListenersOnInput();
      removeKeyboardListener();
    };
  }, []);

  useEffect(() => {
    setShowOutline(isFocused.current);
  }, [isFocused.current]);

  return (
    <div
      ref={containerRef}
      className={style.search_input}
      style={{
        border: showOutline
          ? "2px solid var(--color-black)"
          : "2px solid var(--color-gray)",
      }}
    >
      <div onClick={focusInput} className={style.search_input__icon_container}>
        {loading ? <TbPokeball className="bounce" /> : <BsSearch />}
      </div>
      <input
        ref={inputRef}
        value={value}
        onInput={(e: SyntheticEvent) => {
          const input = e.target as HTMLInputElement;
          onInput(input.value);
        }}
        placeholder="What pokemon are you looking for?"
        {...rest}
      />
      {showOutline && value !== "" && (
        <div
          onClick={actionHandler}
          className={style.search_input__icon_container}
        >
          <BsArrowReturnLeft />
        </div>
      )}
    </div>
  );
}
