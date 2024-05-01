import { useReducer, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import axios from "axios";
import Modal from "../../components/Modal";
import Dropdown, { Option } from "../../components/Dropdown";
import Input from "../../components/Input";
import TextArea from "../../components/TextArea";
import Button from "../../components/Button";
import ErrorMessage from "../../components/ErrorMessage";
import styles from "./CreateCharacter.module.css";

export default function CreateCharacter() {
  const {
    createCharacter,
    closeModal,
    errorMessageRef,
    formError,
    currentStats,
    updateStat,
    remainingPoints,
  } = useCreateCharacter();

  return (
    <Modal>
      <div className={styles.dialogBackdrop}>
        <div className={`${styles.dialogContainer} stack`}>
          <h1>New character</h1>
          <form
            className="stack"
            id="createCharacter"
            onSubmit={async (e) => {
              e.preventDefault();

              createCharacter(new FormData(e.currentTarget));
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
                  type="number"
                  key={stat}
                  id={stat}
                  name={stat}
                  label={`${stat[0].toUpperCase()}${stat.slice(1)}`}
                  required
                  min={1}
                  value={currentStats[stat]}
                  onInput={(e) => {
                    if (!e.currentTarget.value) {
                      return;
                    }
                    updateStat({ stat, value: e.currentTarget.valueAsNumber });
                  }}
                />
              ))}
              <p>Remaining points: {remainingPoints}</p>
            </article>
            <ErrorMessage ref={errorMessageRef}>{formError}</ErrorMessage>
          </form>
          <menu className="cluster cluster--reverse">
            <li>
              <Button primary form="createCharacter">
                Create
              </Button>
            </li>
            <li>
              <Button type="button" onClick={closeModal}>
                Cancel
              </Button>
            </li>
          </menu>
        </div>
      </div>
    </Modal>
  );
}

function useCreateCharacter() {
  const [currentStats, updateStat] = useStats();
  const remainingPoints = pointsToDistribute - sumStats(currentStats);
  const [formError, setFormError] = useState("");
  const errorMessageRef = useRef<HTMLParagraphElement | null>(null);
  const { search } = useLocation();
  const navigate = useNavigate();

  const closeModal = () => navigate({ pathname: "..", search });

  async function createCharacter(formData: FormData) {
    setFormError("");

    if (remainingPoints > 0) {
      setFormError("All stat points must be allocated.");
      errorMessageRef.current?.scrollIntoView();

      return;
    }

    const character = {
      ...Object.fromEntries(formData),
      ...currentStats,
    };

    await axios.post("/characters", character);

    closeModal();
  }

  return {
    closeModal,
    createCharacter,
    errorMessageRef,
    formError,
    currentStats,
    updateStat,
    remainingPoints,
  };
}

const stats = [
  "strength",
  "dexterity",
  "agility",
  "intelligence",
  "charisma",
] as const;

type Stat = (typeof stats)[number];
type Stats = Record<Stat, number>;

const pointsToDistribute = stats.length * 5;

const sumStats = (stats: Stats) => Object.values(stats).reduce((a, b) => a + b);

const useStats = () =>
  useReducer(
    function (
      currentStats: Record<Stat, number>,
      { stat, value }: { stat: Stat; value: number }
    ) {
      const updatedStats = {
        ...currentStats,
        [stat]: value,
      };

      return sumStats(updatedStats) > pointsToDistribute
        ? currentStats
        : updatedStats;
    },
    { strength: 1, dexterity: 1, agility: 1, intelligence: 1, charisma: 1 }
  );
