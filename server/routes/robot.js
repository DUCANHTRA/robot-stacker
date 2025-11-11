const express = require('express');
const router = express.Router();
const {Parser} = require('json2csv');
const { grid, robot, history, canStack } = require("../data/gridState");

//Move robot
router.post('/move', (req, res) => {
    const { direction } = req.body;

    let { x, y } = robot.position;
    if (direction === 'up' && y > 0) y--;
    if (direction === 'down' && y < grid.length - 1) y++;
    if (direction === 'left' && x > 0) x--;
    if (direction === 'right' && x < grid[0].length - 1) x++;

    robot.position = { x, y };
    
    //History logging
    history.push({
        action: 'move',
        direction,
        x, 
        y
    });

    res.json({ position: robot.position });
});

//Pick up block!!!
router.post('/pick', (req, res) => {
    //robot postion
    const { x, y } = robot.position;
    //stack at robot position
    const stack = grid[y][x];

    if(stack.length > 0 && !robot.carrying) {
    robot.carrying = stack.pop();
    //History Logging
    
    history.push({
        action: 'pick',
        color: robot.carrying,
        x,
        y
     });
    }
    res.json({ carrying: robot.carrying });
});

//Drop block!!!
router.post('/drop', (req, res) => {
    
    const { x, y } = robot.position;
    const stack = grid[y][x];
    const top = robot.carrying;
    const bottom = stack.at(-1);

    if(top && canStack(bottom, top)) {
        stack.push(top);
        history.push({
            action: 'drop',
            color: top,
            x,
            y
        });
        robot.carrying = null;
    }
    res.json({ robot, grid });
});

// Get state
router.get("/state", (req, res) => res.json({ 
    grid, 
    robot, 
    history 
}));

// Export CSV
router.get("/export", (req, res) => {
  const parser = new Parser();
  const csv = parser.parse(history);
  res.header("Content-Type", "text/csv");
  res.attachment("history.csv");
  res.send(csv);
});

module.exports = router;