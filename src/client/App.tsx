import { RouterProvider } from "react-router-dom";
import { router } from "./router";

function App() {
  return (
    <main className="stack center reading-view">
      <RouterProvider router={router} />
    </main>
  );
}

export default App;
