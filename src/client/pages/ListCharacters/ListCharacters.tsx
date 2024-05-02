import { useEffect, useState } from "react";
import axios from "axios";
import Input from "../../components/Input";
import Icon from "../../components/Icon";
import Button from "../../components/Button";
import styles from "./ListCharacters.module.css";

import type { Character } from "../../../server/db/schema";

export default function ListCharacters() {
  const [name, setName] = useState("");
  const [page, setPage] = useState(1);
  const [data, setData] = useState<{ data: Character[], page: number, pageCount: number }>();

  useEffect(() => {
    async function getCharacters() {
      const res = await axios.get("/characters", { params: { name, page } });

      setData(res.data);
    }

    getCharacters();
  }, [name, page]);

  return (
    <>
      <h1>Characters</h1>
      <menu className="cluster">
        <li>
          <Button>New character</Button>
        </li>
      </menu>
      <form>
        <Input
          id="character-search"
          type="search"
          label="Search"
          value={name}
          onInput={(e) => setName(e.currentTarget.value)}
        />
      </form>
      <menu className="cluster center">
        <li>
          <Button onClick={() => setPage(page - 1)}><Icon name="chevronLeft" /></Button>
        </li>
        <li>
          Showing page {page} of {data?.pageCount}
        </li>
        <li>
          <Button onClick={() => setPage(page + 1)}><Icon name="chevronRight" /></Button>
        </li>
      </menu>
      {!data?.data.length ? <p>No characters to display.</p> : (<ul>
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
      </ul>)}
    </>
  );
}
