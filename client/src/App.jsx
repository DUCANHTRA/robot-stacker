import { useEffect, useState } from "react";
import Grid from "./components/Grid";
import Controls from "./components/Controls";
import { getState, move, pick, drop, exportCSV } from "./api";

export default function App() {
  const [grid, setGrid] = useState([]);
  const [robot, setRobot] = useState({});

  const refresh = async () => {
    const res = await getState();
    setGrid(res.data.grid);
    setRobot(res.data.robot);
  };

  useEffect(() => {
    refresh();
  }, []);

  const handleMove = async (dir) => {
    await move(dir);
    refresh();
  };

  const handlePick = async () => {
    await pick();
    refresh();
  };

  const handleDrop = async () => {
    await drop();
    refresh();
  };

  return (
    <div className="app">
      <h1>🤖 Robot Stacker</h1>
      <Grid grid={grid} robot={robot} />
      <Controls
        onMove={handleMove}
        onPick={handlePick}
        onDrop={handleDrop}
        onExport={exportCSV}
      />
    </div>
  );
}
