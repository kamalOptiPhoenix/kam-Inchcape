# opti-to-kam-Inchcape

This repository is a **separate workspace** from `ticketek-projects`. It uses the **same Gulp tasks, `package.json` dependencies, and folder conventions** as the Kameleoon / Ticketek tooling template, but **no Ticketek client code** is copied here.

## Layout (matches ticketek-projects)

```text
{customerId}-{label}/                    e.g. 100-Inchcape/
  {siteCode}-{human readable site name}/ e.g. zckrjfube9-Subaru AU PROD/
    global/
      index.js
    experiments/
      {experimentId}-{slug}/
        goals.js
        common.js
        {variationId}-variation_1.js
        {variationId}-variation_1.scss
        config.json              # only for gulp create (see experiments/config.create.example.json)
```

Place **OAuth credentials** at `100-Inchcape/.credentials` (see `.credentials.example`). This file is gitignored.

## Commands (same as ticketek-projects)

From this repo root:

```bash
npm install
```

**Build**

```bash
gulp build --customer-id 100 --sitecode zckrjfube9 --experiment-id 1999999
```

**Deploy** (requires `.credentials` and matching Kameleoon IDs)

```bash
gulp deploy --customer-id 100 --sitecode zckrjfube9 --experiment-id 1999999
```

**Simulate**

```bash
gulp sim --path "100-Inchcape/zckrjfube9-Subaru AU PROD/experiments/1999999-T999_template"
```

**Create** (scaffolds a **new** experiment via Kameleoon API — copy `experiments/config.create.example.json` to `config.json` inside a **new** empty folder first; do not run against the template experiment blindly.)

```bash
gulp create --path "100-Inchcape/zckrjfube9-Subaru AU PROD/experiments/<new-folder-with-config-json>"
```

See `gulpfile.js` comments for full examples.

## Starter experiment

`100-Inchcape/zckrjfube9-Subaru AU PROD/experiments/1999999-T999_template/` — body class, banner, optional goal (placeholder IDs).

## Placeholders to replace

- **`1999999`** / **`1999998`**: replace with real experiment and variation IDs from your Kameleoon site.
- **`goals.js`**: replace `0` with real goal IDs after goals exist in Kameleoon (or run `gulp create` which can write `goals.js` for you).

Build output is written under the **client** folder, for example:

`100-Inchcape/_built/zckrjfube9/experiments/1999999/` (compiled `1999998.js`, `1999998.css`, `common.js`, etc.).

## Note on `ticketek-projects`

That repository is **not modified** by this setup. Keep both repos in sibling folders (or separate clones) and open **this directory** as its own Cursor workspace when working on Inchcape.
