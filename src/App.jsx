import Landing from "./components/LandingPage";
import Settings from "./components/Settings";
import ViewBoard from "./components/ViewBoard";
import KanbanTaskContext from "./context/KanbanTaskContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <KanbanTaskContext>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/board" element={<ViewBoard />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </BrowserRouter>
      </KanbanTaskContext>
    </div>
  );
}

export default App;

// new col hide | filter default | hide progression
