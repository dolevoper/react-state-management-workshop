import { useReducer } from "react";
import axios from "axios";
import Dropdown, { Option } from "../../components/Dropdown";
import Input from "../../components/Input";
import TextArea from "../../components/TextArea";
import Button from "../../components/Button";
import styles from "./CreateCharacter.module.css";
import { Link } from "react-router-dom";
import Modal from "../../components/Modal";

export default function CreateCharacter() {
  const [currentStats, updateStat] = useReducer(
    (currentStats: Stats, action: { statToUpdate: Stat, newValue: number }) => {
      const newStats = {
        ...currentStats,
        [action.statToUpdate]: action.newValue
      };

      if (sumStats(newStats) > pointsToDistribute) {
        return currentStats;
      }

      return newStats;
    },
    defaultStats
  );
  const sumOfStats = sumStats(currentStats);

  return (
    <Modal>
      <div className={styles.dialogBackdrop}>
        <div className={`${styles.dialogContainer} stack`}>
          <h1>New character</h1>
          <form
            className="stack"
            id="createCharacter"
            onSubmit={(e) => {
              e.preventDefault();

              if (sumOfStats !== pointsToDistribute) {
                // show error
                return;
              }

              const formData = new FormData(e.currentTarget);
              const data = Object.fromEntries(formData);

              axios.post("/characters", data);
            }}
          >
            <Input
              type="text"
              id="name"
              name="name"
              label="Name"
              autoComplete="off"
              required
            />
            <Dropdown label="Class" name="class" id="class">
              <Option value="warrior">Warrior</Option>
              <Option value="wizard">Wizard</Option>
              <Option value="bard">Bard</Option>
              <Option value="cleric">Cleric</Option>
              <Option value="thief">Thief</Option>
            </Dropdown>
            <TextArea id="bio" name="bio" label="Bio" rows={10} />
            <article className="stack box">
              <h2>Stats</h2>
              {stats.map((stat) => (
                <Input
                  key={stat}
                  type="number"
                  inputMode="numeric"
                  id={stat}
                  name={stat}
                  label={stat}
                  min={0}
                  value={currentStats[stat]}
                  onInput={(e) => updateStat({
                    statToUpdate: stat,
                    newValue: e.currentTarget.valueAsNumber
                  })}
                  autoComplete="off"
                  required />
              ))}
              <p>Points left: {pointsToDistribute - sumOfStats}</p>
            </article>
          </form>
          <menu className="cluster cluster--reverse">
            <li>
              <Button primary form="createCharacter">
                Create
              </Button>
            </li>
            <li>
              <Link to="/">Cancel</Link>
            </li>
          </menu>
        </div>
      </div>
    </Modal>
  );
}

const stats = [
  "strength",
  "dexterity",
  "agility",
  "intelligence",
  "charisma",
] as const;

type Stat = typeof stats[number];
type Stats = Record<Stat, number>;

const pointsToDistribute = stats.length * 5;


const defaultStats = stats.reduce(
  (res, currentStat) => ({ ...res, [currentStat]: 0 }),
  {} as Stats
);

function sumStats(currentStats: Stats) {
  return Object.values(currentStats).reduce(
    (sum, stat) => sum + stat,
    0
  );
}

