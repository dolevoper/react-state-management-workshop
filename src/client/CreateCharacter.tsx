import { useReducer, useRef, useState } from "react";
import axios from "axios";
import Dropdown, { Option } from "./components/Dropdown";
import Input from "./components/Input";
import TextArea from "./components/TextArea";
import Button from "./components/Button";
import ErrorMessage from "./components/ErrorMessage";
import { useNavigate } from "react-router";

export default function CreateCharacter() {
  const [currentStats, updateStat] = useStats();
  const remainingPoints = pointsToDistribute - sumStats(currentStats);
  const [formError, setFormError] = useState("");
  const errorMessageRef = useRef<HTMLParagraphElement | null>(null);
  const navigate = useNavigate();

  return (
    <>
      <h1>New character</h1>
      <form
        className="stack"
        onSubmit={async (e) => {
          e.preventDefault();
          setFormError("");

          if (remainingPoints > 0) {
            setFormError("All stat points must be allocated.");
            errorMessageRef.current?.scrollIntoView();
            return;
          }

          const formData = new FormData(e.currentTarget);
          const character = {
            ...Object.fromEntries(formData),
            ...currentStats,
          };

          await axios.post("/characters", character);

          navigate("..");
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
        <TextArea id="bio" name="bio" label="Bio" />
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
        <menu className="cluster cluster--reverse">
          <li>
            <Button primary>Create</Button>
          </li>
          <li>
            <Button type="button" onClick={() => navigate("..")}>
              Cancel
            </Button>
          </li>
        </menu>
        <ErrorMessage ref={errorMessageRef}>{formError}</ErrorMessage>
      </form>
    </>
  );
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

const pointsToDistribute = 20;

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
