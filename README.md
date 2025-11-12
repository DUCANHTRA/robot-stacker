# Robot Stacker

A web-based simulation project where a robot moves on a 3x3 grid to pick up and stack colored circles according to specific stacking rules.

---

## Table of Contents

- [Overview](#overview)
- [Challenge](#challenge)
- [Stacking Rules](#stacking-rules)
- [Assumptions](#assumptions)
- [Features](#features)
- [Implementation](#implementation)
  - [Frontend](#frontend)
  - [Backend](#backend)
- [Usage](#usage)
- [Example](#example)
- [Notes](#notes)
- [Running the Project](#running-the-project)

---

## Overview

The Robot Stacker project is a small interactive application where a robot navigates a 3x3 grid, picking up and stacking colored circles (Red, Green, Blue). The goal is to manage stacks while following predefined rules about which colors can be stacked on top of each other.

---

## Challenge

Develop both **frontend** and **backend** for the robot, ensuring:

- The robot can move across the grid.
- It can pick up and drop colored circles.
- Stacking rules are enforced.
- Invalid moves trigger a temporary warning.
- The grid updates in real-time on the frontend.

---

## Stacking Rules

| Circle | Can Have Above | Can Be Placed Above |
|--------|----------------|------------------|
| 🔴 Red (R) | None | Blue, Green |
| 🟢 Green (G) | Red, Blue | None |
| 🔵 Blue (B) | Red only | Green |

---

## Assumptions

- Grid size is fixed at 3x3.
- Each cell can contain a stack of circles.
- The robot can carry only one circle at a time.
- Invalid drops are prevented by backend validation.
- Warnings are temporary and fade automatically after 2 seconds.

---

## Features

- Move robot up, down, left, right.
- Pick up a circle from a stack.
- Drop a circle onto a stack following stacking rules.
- Visual stack growth with each action.
- Temporary color warning for invalid drops.

---

## Implementation

### Frontend

- **Framework:** React + Vite
- **State Management:** React `useState`
- **Grid Rendering:** 
  - 3x3 grid where each cell is an array representing the stack.
  - Robot position tracked separately.
- **Robot Actions:**
  - Moves update the robot's position state.
  - Pick up removes the top circle from the stack.
  - Drop checks validity with the backend before updating the stack.
- **Warnings:** Displayed via `<div className="warning">` with fade-out animation using CSS and `setTimeout`.

### Backend

- **Framework:** Node.js + Express
- **Endpoints:**
  - `POST /move` – Move the robot in a direction.
  - `POST /pickup` – Pick up the top circle from the current cell.
  - `POST /drop` – Drop the carried circle onto the current cell.  
    - Validity checked using `canStack(bottom, top)`.
    - Returns `valid: false` with a reason if the drop is invalid.

- **Data Structure:**
  ```js
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


## Running the Project
### Prerequisites
- Node.js (v18+ recommended)
- npm

### 1. Clone the repository
```bash
git clone <repo_url>
cd robot-stacker

### 2. Install dependencies for backend
```bash
cd server
npm install
node index.js
```
Backend server will start on `http://localhost:5000`
Endpoints:
- `POST /move` - Move the robot
- `POST /pickup` - Pick up a circle
- `POST /drop` - Drop a circle

### 3. Install dependencies for frontend
```bash
cd ../client
npm install
npm run dev
```
Frontend will start on `http://localhost:5173`(Vite default port)
