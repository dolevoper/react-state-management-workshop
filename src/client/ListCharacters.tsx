import { Outlet, useLoaderData, useLocation } from "react-router";
import { Link, useSearchParams } from "react-router-dom";
import Input from "./components/Input";
import styles from "./ListCharacters.module.css";

import type { Character } from "../server/db/schema";

export default function ListCharacters() {
  return (
    <>
      <h1>Characters</h1>
      <Menu />
      <Search />
      <Pagination />
      <CharactersList />
      <Outlet />
    </>
  );
}

function Menu() {
  const { search } = useLocation();

  return (
    <menu className="cluster">
      <li>
        <Link
          to={{
            pathname: "new",
            search,
          }}
        >
          New character
        </Link>
      </li>
    </menu>
  );
}

function Search() {
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <form>
      <Input
        id="character-search"
        type="search"
        label="Search"
        value={searchParams.get("name") ?? ""}
        onInput={(e) => {
          searchParams.set("name", e.currentTarget.value);
          setSearchParams(searchParams, { replace: true });
        }}
      />
    </form>
  );
}

function Pagination() {
  const [searchParams] = useSearchParams();

  const currentPage = Number(searchParams.get("page") ?? "1");

  function getNextPageSearch() {
    const nextSearchParams = new URLSearchParams(searchParams);

    nextSearchParams.set("page", `${currentPage + 1}`);

    return nextSearchParams.toString();
  }

  function getPreviousPageSearch() {
    const nextSearchParams = new URLSearchParams(searchParams);

    nextSearchParams.set("page", `${currentPage - 1}`);

    return nextSearchParams.toString();
  }

  return (
    <menu className="cluster">
      <li>
        <Link to={{
          search: getPreviousPageSearch()
        }}>&lt;</Link>
      </li>
      <li>
        {currentPage}
      </li>
      <li>
        <Link to={{
          search: getNextPageSearch()
        }}>&gt;</Link>
      </li>
    </menu>
  )
}

function CharactersList() {
  const characters = useLoaderData() as Character[];

  if (!characters.length) {
    return <p>No characters to display.</p>;
  }

  return (
    <ul>
      {characters.map((character) => (
        <CharacterCard key={character.id} character={character} />
      ))}
    </ul>
  );
}

type CharacterCardProps = {
  character: Character;
};

function CharacterCard({ character }: CharacterCardProps) {
  return (
    <li className={`stack ${styles.characterCard}`}>
      <h2>{character.name}</h2>
      <p className={styles.className}>{character.class}</p>
      <p className={styles.bio}>{character.bio}</p>
      <ul className="cluster">
        <li className={styles.stat} title="Strength">
          <span>STR</span>
          <span>{character.strength}</span>
        </li>
        <li className={styles.stat} title="Dexterity">
          <span>DEX</span>
          <span>{character.dexterity}</span>
        </li>
        <li className={styles.stat} title="Agility">
          <span>AGL</span>
          <span>{character.agility}</span>
        </li>
        <li className={styles.stat} title="Intelligence">
          <span>INT</span>
          <span>{character.intelligence}</span>
        </li>
        <li className={styles.stat} title="Charisma">
          <span>CHR</span>
          <span>{character.charisma}</span>
        </li>
      </ul>
    </li>
  );
}
