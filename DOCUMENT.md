# Robot Grid Stacking - Design Documentation

## Challenge
Develop a frontend and backend for a robot that moves and stacks colored circles on a grid, following strict stacking rules:

| Circle | Can have above | Can be placed above |
|--------|----------------|-------------------|
| 🔴 Red (R) | None | Blue, Green |
| 🟢 Green (G) | Red, Blue | None |
| 🔵 Blue (B) | Red only | Green |

---

## 1. Assumptions

These assumptions clarify ambiguities not explicitly defined in the brief:

| Area | Assumption | Reason |
|------|------------|--------|
| Grid size | Fixed at 3×3 for simplicity | Matches the example illustration; scaling to NxN is optional |
| Initial state | Every cell starts with exactly one circle (B, G, or R) | Ensures full occupancy and matches example |
| Stacking model | Each grid cell can contain a stack (array of colors) | Supports vertical stacking, as implied by "stack on the right side" |
| Robot capacity | Robot holds one circle at a time | Simplifies logic and reflects real-world robotic constraints |
| Movement | One cell per command (up/down/left/right), no diagonal | Aligns with test rules |
| Empty cells | Picking a circle removes top layer, revealing next or empty | Logical "pickup" action |
| Stack validation | Backend enforces color rules; invalid drops rejected or warned | Centralized, consistent logic |
| Persistence | Grid and robot state stored in-memory | Simple for prototype; can extend to DB later |
| Frontend authority | Frontend only renders data from backend | Ensures single source of truth |
| Export | Movement history logged in JSON and exportable as CSV | Meets bonus requirement |

---

## 2. Design Decisions and Justifications

| Design Area | Decision | Justification |
|------------|---------|---------------|
| Architecture | Frontend-Backend separation (React + Vite + Express) | Modular testing, clean data flow, scalable |
| Backend Framework | Node.js + Express | Lightweight, simple REST APIs, rapid prototyping |
| Data Representation | Grid as 2D array of stacks (`Color[][][]`) | Simplifies stacking logic; pop/push maps to pickup/drop |
| Robot Model | `position` and `carrying` properties | Minimal yet sufficient to describe state |
| API Design | REST endpoints (`/move`, `/pick`, `/drop`, `/state`, `/export`) | Human-readable, easy to test, maps to UI actions |
| Validation Rules | Encapsulated in `canStack` helper | Easy maintenance and modification |
| Frontend Framework | React + Vite | Fast setup, hot reload, component-based design |
| UI Layout | Grid rendered as nested `<div>`s with CSS flex | Direct mapping between visual layout and data |
| Robot Indicator | 🤖 icon overlay at robot position | Visual understanding of state and movement |
| Visual Stack Growth | `flex-direction: column-reverse` | New circles appear on top visually |
| Color rule warnings | Backend `/drop` checks `canStack`; frontend shows fading warning `<div>` | Improves UX for invalid stacking attempts |
| CSV Export | Backend uses `json2csv` | Simple and avoids reinventing CSV formatting |
| Scalability | Supports NxN grids and persistent DB | Data-driven logic, not hard-coded |

---

## 3. Alternative Designs Considered

| Option | Considered | Rejected Because |
|--------|------------|----------------|
| Flat grid (no stacks) | Simple to render | Violates stacking rules |
| Robot moves physically like animation steps | Improves realism | Not essential for logic; focus kept on correctness |
| Multiple circle pickup | Simulates batch carrying | Adds unnecessary complexity |
| Frontend-only logic | No backend | Violates test requirements; complicates rule validation |
| Database storage (MongoDB/SQLite) | Persistence | Optional; adds implementation complexity |

---

## 4. Future Enhancements

| Improvement | Benefit |
|------------|---------|
| Undo/Redo or Auto-solve feature | Demonstrates algorithmic control and optimization |
| Backend persistence (MongoDB) | Enables saving and reloading scenarios |
| WebSocket updates | Real-time sync for multiple clients |
| Accessibility improvements | Keyboard and screen reader support |

---

## 5. Summary
This architecture emphasizes clarity, simplicity, and rule correctness over excessive complexity.  
- **Backend**: Single source of truth for rules and state.  
- **Frontend**: Provides intuitive visualization and control.  
- **Stack-based grid design**: Naturally models problem constraints and allows extensibility.  

The design balances reviewer clarity with logical completeness.
