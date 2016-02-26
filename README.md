# NASDAQ Slash Command for Mixmax

This slash command works by calling nasdaq.com's symbol search and for each symbol querying google finance's quote. Once a symbol is selected, the resolver formats it to color the numbers that are part of the information to red if it performed poorly during the last day or green otherwise.

## Running locally

1. Install using `npm install`
2. Run using `npm start`

To simulate locally how Mixmax calls the typeahead URL (to return a JSON list of typeahead results), run:

```
curl http://localhost:9145/typeahead?text=msft
```

To simulate locally how Mixmax calls the resolver URL (to return HTML that goes into the email), run:

```
curl http://localhost:9145/resolver?text=msft
```
