// data/gridState.js
let grid = [
  [ ["R"], ["B"], ["G"] ],
  [ ["G"], ["R"], ["B"] ],
  [ ["G"], ["B"], ["R"] ]
];

let robot = {
  position: { 
    x: 0, 
    y: 0 
},
  carrying: null
};

let history = [];

function canStack(bottom, top) {
  if (!bottom) return true;
  if (bottom === "R") return false;
  if (bottom === "B" && top !== "R") return false;
  return true;
}

module.exports = { grid, robot, history, canStack };
