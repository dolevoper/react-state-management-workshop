import axios from "axios";
import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import ListCharacters from "./ListCharacters";
import CreateCharacter from "./CreateCharacter";

export default createBrowserRouter([
    {
        Component: App,
        children: [
            {
                index: true,
                Component: ListCharacters,
                async loader() {
                    return (await axios.get("/characters")).data;
                }
            },
            {
                path: "new",
                Component: CreateCharacter
            }
        ]
    }
]);