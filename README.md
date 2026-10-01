# BVC Spends Dashboard

A simple shared board for logging BVC Logistics marketing expenses: date, vendor, category and sub-category, amount (INR or USD with the rate), payment status, renewals, invoice link and approver.

The page is a single `index.html` with no build step. Open it in a browser or host it on GitHub Pages.

## Notes

- Hosted on GitHub Pages, the board saves entries in each person's own browser (local storage). It does not share entries between people.
- The shared team version, where everyone sees the same list, is the claude.ai board. Use that link for day-to-day logging.
- USD entries look up the European Central Bank reference rate for the expense date (works on GitHub Pages).

## Updating

Replace `index.html` and push to `main`. GitHub Pages republishes within a minute or two.
