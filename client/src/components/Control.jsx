export default function Controls({ onMove, onPick, onDrop, onExport }) {
  return (
    <div className="controls">
      <div>
        <button onClick={() => onMove("up")}>↑</button>
      </div>
      <div>
        <button onClick={() => onMove("left")}>←</button>
        <button onClick={() => onMove("right")}>→</button>
      </div>
      <div>
        <button onClick={() => onMove("down")}>↓</button>
      </div>
      <div>
        <button onClick={onPick}>Pick</button>
        <button onClick={onDrop}>Drop</button>
        <button onClick={onExport}>Export CSV</button>
      </div>
    </div>
  );
}
