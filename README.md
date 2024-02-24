<div align="center">
    <img
        alt="Logo MGF"
        src="src/client/images/logo.svg"
        width="500"
    />
    <h1>
        Camping St-Pie
    </h1>
    <p>
        Hébergement et Événementiel
    </p>
</div>

<hr>

<div align="center">

<a href="./.github/workflows/ci.yaml">
  <img alt="Badge Continuous Integration"
    src="https://github.com/Parapluieinfo/CampingStPie/actions/workflows/ci.yaml/badge.svg">
</a>

<a href="./renovate.json">
  <img alt="Badge Renovate"
    src="https://img.shields.io/badge/renovate-enabled-brightgreen.svg">
</a>

<a href="./.github/COMMIT_CONVENTION.md">
  <img alt="Badge Commitizen"
    src="https://img.shields.io/badge/commitizen-friendly-coral.svg">
</a>

<a href="./.github/COMMIT_CONVENTION.md">
  <img alt="Badge Conventional Commits"
    src="https://img.shields.io/badge/Conventional%20Commits-1.0.0-teal?logo=conventionalcommits&logoColor=white">
</a>

<a href="./.github/CODE_OF_CONDUCT.md">
  <img alt="Badge Contributor Covenant"
    src="https://img.shields.io/badge/Contributor%20Covenant-2.1-blue.svg">
</a>

</div>

## Table of Contents

- [Table of Contents](#table-of-contents)
- [How to use](#how-to-use)
  - [Install](#install)
  - [Lint](#lint)
  - [Format](#format)
  - [Test](#test)
  - [Build](#build)
  - [Start](#start)
  - [Analyze](#analyze)
  - [Commit](#commit)
  - [Check](#check)
- [Development](#development)
  - [Profile](#profile)
  - [Structure](#structure)

## How to use

Here is the list of scripts for the project that should be used in this specific order.

### Install

- Clone the repository.

```bash
git clone https://github.com/Parapluieinfo/CampingStPie.git
```

- Install the dependencies.

```bash
npm install
```

### Lint

- Lint everything in the project

```bash
npm run lint
```

- Lint JavaScript

```bash
npm run lint:js
```

- Lint Markdown

```bash
npm run lint:markdown
```

- Lint Markup

```bash
npm run lint:markup
```

- Lint Styles

```bash
npm run lint:styles
```

- Lint YAML

```bash
npm run lint:yaml
```

### Format

- Check the formatting in the project

```bash
npm run format:check
```

- Format everything in the project

```bash
npm run format:fix
```

### Test

- TBA

### Build

- Build both client and server

```bash
npm run build
```

- Build client

```bash
npm run build:client
```

- Build server

```bash
npm run build:server
```

### Start

- Start both client and server

```bash
npm run start
```

- Start client

```bash
npm run start:client
```

- Start server

```bash
npm run start:server
```

### Analyze

- Analyze dependencies with Webpack

```bash
npm run analyze
```

### Commit

- Commit changes to the project (see [Commit Convention](./.github/COMMIT_CONVENTION.md))

```bash
npm run commit
```

### Check

- Check code before pushing to Github. **(lint, build & test)**

```bash
npm run check
```

## Development

### Profile

You can use the `NodeJS` profile in the `.vscode` directory.

1. Press `CTRL + SHIFT + P`
2. Type & Select `import profile`
3. Select `Select File...`
4. Use the file `NodeJS.code-profile` in the `.vscode` directory
5. Click the button `Create Profile`
6. Name the profile e.g. `NodeJS`
7. Press the button `Create`

### Structure

- src
  - client
    - files
    - images
    - scripts
    - styles
    - templates
  - server
