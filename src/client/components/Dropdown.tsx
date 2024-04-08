import {
  PropsWithChildren,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useId,
  useMemo,
  useState,
} from "react";
import styles from "./Dropdown.module.css";

const context = createContext<
  | {
      currentValue: string;
      register(value: string, display: ReactNode): () => void;
      select(value: string): void;
    }
  | undefined
>(undefined);

function useDropdownContext() {
  const ctx = useContext(context);

  if (!ctx) {
    throw new Error(
      "Dropdown components must be used within a Dropdown component"
    );
  }

  return ctx;
}

type DropdownProps = PropsWithChildren<{
  id: string;
  label: string;
  name: string;
  className?: string;
}>;

export default function Dropdown({
  label,
  name,
  children,
  className,
}: DropdownProps) {
  const {
    rootId,
    labelId,
    selectionId,
    listboxId,
    selection,
    isOpen,
    toggleIsOpen,
    dropdownContext,
  } = useDropdown();

  return (
    <div
      id={rootId}
      style={{
        "--stack-gap": "5px",
      }}
      className={`stack ${styles.wrapper}${className ? ` ${className}` : ""}`}
    >
      <input type="hidden" name={name} value={selection?.value ?? ""} />
      <label id={labelId} className={styles.label}>
        {label}
      </label>
      <div
        id={selectionId}
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={listboxId}
        aria-labelledby={labelId}
        tabIndex={0}
        className={styles.selection}
        onClick={toggleIsOpen}
        onKeyDown={() => {}}
      >
        {selection?.display}
      </div>
      <div
        id={listboxId}
        className={styles.listbox}
        role="listbox"
        aria-labelledby={labelId}
      >
        <context.Provider value={dropdownContext}>{children}</context.Provider>
      </div>
    </div>
  );
}

function useDropdown() {
  const rootId = useId();
  const labelId = `${rootId}-label`;
  const selectionId = `${rootId}-selection`;
  const listboxId = `${rootId}-listbox`;
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState(
    [] as { value: string; display: ReactNode }[]
  );
  const [selectedIndex, setSelectedIndex] = useState(0);

  const selection = options[selectedIndex];

  function toggleIsOpen() {
    setIsOpen((open) => !open);
  }

  const dropdownContext = useMemo(
    () => ({
      currentValue: selection?.value,
      register(value: string, display: ReactNode) {
        setOptions((values) => [...values, { value, display }]);

        return () => {
          setOptions((values) => values.filter((v) => v.value !== value));
        };
      },
      select(value: string) {
        setSelectedIndex(options.findIndex((v) => v.value === value));
        setIsOpen(false);
      },
    }),
    [options, selection?.value]
  );

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (
        event.target instanceof HTMLElement &&
        !event.target.closest(`#${CSS.escape(rootId)}`)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [rootId]);

  return {
    rootId,
    labelId,
    selectionId,
    listboxId,
    selection,
    isOpen,
    toggleIsOpen,
    dropdownContext,
  };
}

type OptionProps = PropsWithChildren<{
  value: string;
}>;

export function Option({ value, children }: OptionProps) {
  const { currentValue, register, select } = useDropdownContext();

  useEffect(() => {
    register(value, children);
  }, [register, value, children]);

  return (
    <div
      className={styles.option}
      role="option"
      onClick={() => select(value)}
      aria-selected={currentValue === value}
      onKeyDown={() => {}}
      tabIndex={0}
    >
      {children}
    </div>
  );
}
