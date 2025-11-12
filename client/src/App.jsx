import { useEffect, useState } from "react";
import Grid from "./components/Grid";
import Controls from "./components/Control";
import { getState, move, pick, drop, exportCSV } from "./api";

export default function App() {
  const [grid, setGrid] = useState([]);
  const [robot, setRobot] = useState({});
  const [warning, setWarning] = useState("");

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
    const res = await drop();
    if (res.data.valid === false) {
      setWarning(res.data.reason);
      setTimeout(() => setWarning(""), 2000); // clear after 2s
    }
    refresh();
  };

  return (
    <div className="app">
      <h1>🤖 Robot Stacker</h1>
      {warning && <div className="warning">{warning}</div>}
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
