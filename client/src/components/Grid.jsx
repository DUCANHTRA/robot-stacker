export default function Grid({ grid, robot }) {
  return (
    <div className="grid">
      
      {grid.map((row, y) => (
        <div className="row" key={y}>
      
          {row.map((stack, x) => {
            const isRobot = robot.position.x === x && robot.position.y === y;
            
            return (
              <div className="cell" key={x}>
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
