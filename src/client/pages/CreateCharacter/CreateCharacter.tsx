import Dropdown, { Option } from "../../components/Dropdown";
import Input from "../../components/Input";
import TextArea from "../../components/TextArea";
import Button from "../../components/Button";
import styles from "./CreateCharacter.module.css";

export default function CreateCharacter() {
  return (
    <>
      <h1>New character</h1>
      <form
        className="stack"
        id="createCharacter"
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
      </form>
      <menu className="cluster cluster--reverse">
        <li>
          <Button primary form="createCharacter">
            Create
          </Button>
        </li>
        <li>
          <Button type="button">
            Cancel
          </Button>
        </li>
      </menu>
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

const pointsToDistribute = stats.length * 5;
