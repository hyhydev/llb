# Expert-sourced daily puzzle answers instead of algorithmic evaluation

The tool simulates ball paths deterministically, but "best defensive position" is subjective — it depends on character mobility, timing, and option-select judgement that cannot be reduced to geometry. We use up to 5 hand-picked expert players to pre-submit their defensive answers before each puzzle goes live. The expert consensus (outlier-removed average) becomes the canonical answer against which all user submissions are scored.

## Considered options

- **Algorithmic** — score by whether the user's position intersects a ball path. Rejected: doesn't capture option-select quality or character-specific mobility; produces trivially correct answers (any point on any line scores).
- **Community vote** — crowdsource the answer from all users after puzzle closes. Rejected: susceptible to groupthink and low-skill consensus; delays the answer reveal.

## Consequences

Puzzles require expert pre-submission before going live. If fewer than 2 experts submit, the consensus algorithm degrades to a single random pick. Tier thresholds (currently ≤10/30/60/100/150px) may need tuning once real submissions exist.
