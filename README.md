## Live Demo

[Click here](https://main--teal-griffin-743c1b.netlify.app/) to check out live demo.

## Setting up the project

I personally recommend using `pnpm` if you need blazing speeds and less disk space, but of course we can work with npm as well.

```bash
# install the dependencies
npm install

# Run the project
npm run dev -- --open
```

## Testing

Once everything is in place, use this to run the tests:

```bash
# setup playwright for the first time
npx playwright install

# run the e2e tests
npm run test

# run unit tests
npm run test:unit
```
