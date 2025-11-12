export default function Grid({ grid, robot }) {
  return (
    <div className="grid">
      
      {grid.map((row, y) => (
        <div className="row" key={y}>
      
          {row.map((stack, x) => {
            const isRobot = robot.position.x === x && robot.position.y === y;
            
            // compute dynamic height based on stack size
            const stackHeight = Math.min(100, 40 + stack.length * 20);

            return (
              <div className="cell" key={x}
              style={{
                  height: `${stackHeight}px`,
                  background: stack.length ? "#e9e2d3" : "#f1ece3",
                }}>
                {stack.map((color, i) => (
                  <div key={i} className={`circle ${color.toLowerCase()}`} />
                ))}
                {isRobot && <div className="robot">🤖</div>}
              </div>
            );
            
          })}
        </div>
      ))}
    </div>
  );
}
