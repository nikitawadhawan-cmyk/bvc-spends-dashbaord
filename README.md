# BVC Spends Dashboard

A simple shared board for logging BVC Logistics marketing expenses: date, vendor, category and sub-category, amount (INR or USD with the rate), payment status, renewals, invoice link and approver.

Live: https://bvc-marketing-spends.netlify.app

## How it works

- The page is a single `index.html` with no build step.
- On Netlify, entries are shared: everyone on the link sees the same list. They are stored in Netlify Blobs through a small function, `netlify/functions/expenses.mjs`, served at `/api/expenses`. The page refreshes the list every 15 seconds.
- If someone had entries saved only in their own browser, the page offers a button to add them to the shared board.
- Opened anywhere without the function (a local file, GitHub Pages), it falls back to saving entries on that device only and says so in a banner.
- USD entries look up the European Central Bank reference rate for the expense date.

## Updating

Push to `main`. Netlify rebuilds and publishes within a minute or two.
