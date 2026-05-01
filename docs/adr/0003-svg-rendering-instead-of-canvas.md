# SVG rendering instead of HTML5 Canvas

The legacy app uses Paper.js (canvas-based) for all rendering. The Next.js rewrite uses SVG instead. Ball paths, character sprites, hitboxes, and interactive elements are React components rendered as SVG elements, with drag interaction handled via pointer events (or `@use-gesture/react`).

## Considered options

- **HTML5 Canvas (Paper.js or Konva)** — matches the legacy approach. Rejected: imperative draw calls don't compose with React's component model; interactive elements (dragging characters, clicking angles) require manual hit-testing; harder to extend for the daily puzzle's drag-to-place interaction.
- **SVG** — each ball path and character is a React component. DOM events handle drag natively. Element count (a few hundred paths at most) is well within SVG's performance envelope.

## Consequences

The Paper.js geometry helpers (`path.intersectionsWith()`, vector maths) must be reimplemented in plain TypeScript. The ball path simulation — collision detection against stage bounds and hitboxes, reflection angle calculation — becomes a pure function with no rendering dependency, which makes it independently testable and reusable for puzzle generation.
