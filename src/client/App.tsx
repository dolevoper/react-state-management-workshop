import { useReducer, useState } from "react";
import Dropdown, { Option } from "./components/Dropdown";
import Input from "./components/Input";
import TextArea from "./components/TextArea";

function App() {
  const [currentStats, updateStat] = useStats();
  const remainingPoints = pointsToDistribute - sumStats(currentStats);
  const [formError, setFormError] = useState("");

  return (
    <main className="stack center reading-view">
      <h1>New character</h1>
      <form
        className="stack"
        onSubmit={(e) => {
          e.preventDefault();

          if (remainingPoints > 0) {
            return;
          }

          const formData = new FormData(e.currentTarget);
          const character = {
            ...Object.fromEntries(formData),
            ...currentStats,
          };

          console.log(character);
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
        <button data-primary>Create</button>
      </form>
    </main>
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

export default App;
