import Input from "./components/Input";
import styles from "./ListCharacters.module.css";

import type { Character } from "../server/db/schema";

export default function ListCharacters() {
  return (
    <>
      <h1>Characters</h1>
      <form>
        <Input id="character-search" type="search" label="Search" />
      </form>
      <ul>
        <CharacterCard
          character={{
            name: "omer",
            bio: "aaa",
            class: "bard",
            agility: 1,
            charisma: 1,
            dexterity: 1,
            id: "asdasd",
            intelligence: 1,
            strength: 1,
          }}
        />
      </ul>
    </>
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
      <p>{character.bio}</p>
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
