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
                path: "/",
                Component: ListCharacters,
                async loader({ request }) {
                    const url = new URL(request.url);

                    return (await axios.get(`/characters${url.search}`, { signal: request.signal })).data;
                },
                children: [
                    {
                        path: "new",
                        Component: CreateCharacter
                    }
                ]
            }
        ]
    }
]);