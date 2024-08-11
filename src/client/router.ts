import { createBrowserRouter } from "react-router-dom";
import ListCharacters from "./pages/ListCharacters/ListCharacters";
import CreateCharacter from "./pages/CreateCharacter/CreateCharacter";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: ListCharacters,
        children: [
            { path: "create", Component: CreateCharacter }
        ]
    },
]);