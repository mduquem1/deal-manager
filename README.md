# Deal manager Vue3 composition API app

Browse, select, search and export merger/acquisitions deals data.

## Deal manager - v.0.0.1

## Run local server

Make sure node is installed and your are running the same version available in `.nvmrc`.

If you have `nvm` installed, run `nvm use` to run the specified node version.

Install dependencies

````bash
yarn
````

````bash
yarn dev
````

## Build minized static js,html,css files

````bash
yarn build
````

## Test with vitest

````bash
yarn test
````

To see coverage:

```bash
yarn test --coverage
```

### Load data

Go to [Deals page](src/pages/deals.vue) file, fetching logic on L19 and change the data set at convenience.

Set it to `HEAVY_DATA` for 5k entries

````js
  const response = await fetch(DATA.HEAVY_DATA)
````

or default,

````js
  const response = await fetch(DATA.LIGHT_DATA)
````

To load a lighter dataset with 27 entries but reallistic entry fields.

### Go to deals page

Click on `Deals` in the Header nav in top right of the screen.

### Search for deals

Search any word in the search box and the table will update by filtering over text columns using the search query.

### Select all displayed deals

Click on the checkbox on top of the table header to select all displayed data in the table.

### Export selected deals to CSV

Click on `Export to CSV` button on top right of the table to export **more than 1 entry**.

### Sort deals by text column

Click on any header title to sort table by that column. There should be an arrow icon right to the name of the column to which the table is sorted by. The arrow should also indicate the direction of the selected sorting (ASC/DESC).

### Select an individual deal to see details

If you click on a single deal, you would see a modal displayed to the right of the screen showing more details about the deal.

### Load more details to see more

If you scroll down to the bottom of the table, you can see a `Load more` button to load more entries into the table.

## Things to improve

- Design
- Refactor TableRows component
- Add global index at selection
- Improve test coverage
- Create a "To top" button that appears after scrolling a certain point
- Fixed table column names in scrolling


## Vue 3 + Vite

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about IDE Support for Vue in the [Vue Docs Scaling up Guide](https://vuejs.org/guide/scaling-up/tooling.html#ide-support).
