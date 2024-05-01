import { Outlet, useLoaderData, useLocation } from "react-router";
import { Link, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Input from "../../components/Input";
import Icon from "../../components/Icon";
import { characters } from "./queries";
import styles from "./ListCharacters.module.css";

import type { Character } from "../../../server/db/schema";

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
  const { data: { page, pageCount } } = useCharacters();
  const [searchParams] = useSearchParams();

  function getNextPageSearch() {
    const nextSearchParams = new URLSearchParams(searchParams);

    nextSearchParams.set("page", `${page + 1}`);

    return nextSearchParams.toString();
  }

  function getPreviousPageSearch() {
    const nextSearchParams = new URLSearchParams(searchParams);

    nextSearchParams.set("page", `${page - 1}`);

    return nextSearchParams.toString();
  }

  return (
    <menu className="cluster center">
      <li>
        <Link to={{
          search: getPreviousPageSearch()
        }}><Icon name="chevronLeft" /></Link>
      </li>
      <li>
        Showing page {page} of {pageCount}
      </li>
      <li>
        <Link to={{
          search: getNextPageSearch()
        }}><Icon name="chevronRight" /></Link>
      </li>
    </menu>
  )
}

function CharactersList() {
  const { data: { data } } = useCharacters();

  if (!data.length) {
    return <p>No characters to display.</p>;
  }

  return (
    <ul>
      {data.map((character) => (
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

function useCharacters() {
  const [searchParams] = useSearchParams();
  const initialData = useLoaderData() as { data: Character[], page: number, pageCount: number };

  return useQuery({
    ...characters(searchParams),
    initialData
  });
}