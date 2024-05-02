import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import ListCharacters from "./pages/ListCharacters/ListCharacters";
import CreateCharacter from "./pages/CreateCharacter/CreateCharacter";
import { queryClient } from "./queryClient";
import { characters } from "./pages/ListCharacters/queries";

export default createBrowserRouter([
    {
        Component: App,
        children: [
            {
                path: "/",
                Component: ListCharacters,
                loader({ request }) {
                    const { searchParams } = new URL(request.url);

                    queryClient.ensureQueryData(characters(searchParams));

                    return null;
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