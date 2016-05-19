# hms-demo

[![Build Status](https://travis-ci.org/mccalluc/hms-demo.svg?branch=gh-pages)](https://travis-ci.org/mccalluc/hms-demo)

- [See it in action](http://mccalluc.github.io/hms-demo)
- [Tests](http://mccalluc.github.io/hms-demo/tests.html)

## Interactive visualizations

It's pretty understated: Just little bars on the mutation type and chromosome selectors,
proportional in length to the number which are currently selected.

## Interactions and filters

Click on the row or column headers on the left to toggle. You can also click in the grid
to select a type+chromosome intersections, or you can click in the upper left to reset.

## Optional

### Color

Both grids are colored according to mutation type. For a real site, more thought
should be put into accomodating color-blind users.

### Testing

There are some basic unit tests of the HTML generation. An automated clickthrough
might be good, too, but I'm not sure right now whether that would fit better in qUnit,
or phantomJS.

### Diagram

```
TODO
```

## Additional Considerations

### D3

I actually did the little bars last, and I had enough moment with plain jQuery that
it seemed to make the most sense just to keep with it. 

### Wheel reinvention

If we were doing anything like this in real life, I would argue for doing the filtering
on the server instead of the client. With solr facets, for instance, you could get all the
counts for each facet, without needing to download every record.

If we did want to do something like this on the client, we ought to have a better
distinction be model and view. Since this is a one-shot, this will work, but for anything
longer-lived you wouldn't want it coupled like this.
