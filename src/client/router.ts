import { createBrowserRouter } from "react-router-dom";
import axios from "axios";
import ListCharacters from "./pages/ListCharacters/ListCharacters";
import CreateCharacter from "./pages/CreateCharacter/CreateCharacter";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: ListCharacters,
        async loader({ request }) {
            const url = new URL(request.url);
            const name = url.searchParams.get("name");
            const page = 1;

            const { data } = await axios.get("/characters", { params: { name, page } });

            return data;
        },
        children: [
            { path: "create", Component: CreateCharacter }
        ]
    },
]);