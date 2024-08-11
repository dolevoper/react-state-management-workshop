import { useState } from "react";
import { Link, Outlet, useLoaderData, useSearchParams } from "react-router-dom";
import Input from "../../components/Input";
import Icon from "../../components/Icon";
import Button from "../../components/Button";
import styles from "./ListCharacters.module.css";

import type { Character } from "../../../server/db/schema";

export default function ListCharacters() {
  return (
    <>
      <Header />
      <Search />
      <Pagination />
      <CharacterList />
      <Outlet />
    </>
  );
}

function Header() {
  return (
    <>
      <h1>Characters</h1>
      <menu className="cluster">
        <li>
          <Link to="create">New character</Link>
        </li>
      </menu>
    </>
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
        onInput={(e) => {
          const newSearchParams = new URLSearchParams(searchParams);

          newSearchParams.set("name", e.currentTarget.value);
          setSearchParams(newSearchParams);
        }}
      />
    </form>
  );
}

function Pagination() {
  const [page, setPage] = useState(1);
  const pageCount = 10;

  return (
    <menu className="cluster center">
      <li>
        <Button onClick={() => setPage(page - 1)}><Icon name="chevronLeft" /></Button>
      </li>
      <li>
        Showing page {page} of {pageCount}
      </li>
      <li>
        <Button onClick={() => setPage(page + 1)}><Icon name="chevronRight" /></Button>
      </li>
    </menu>
  );
}

function CharacterList() {
  const data = useLoaderData() as { data: Character[], page: number, pageCount: number };

  return !data?.data.length ? <p>No characters to display.</p> : (<ul>
    {data.data.map((character) => (
      <li key={character.id} className={`stack ${styles.characterCard}`}>
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
    ))}
  </ul>);
}
