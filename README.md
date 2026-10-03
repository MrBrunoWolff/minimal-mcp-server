# Minimal MCP Server

A minimal Model Context Protocol (MCP) server template built with TypeScript, the official MCP SDK, Vite and Bun.

[![npm](https://img.shields.io/npm/v/@mrbrunowolff/minimal-mcp-server?style=flat-square)](https://www.npmjs.com/package/@mrbrunowolff/minimal-mcp-server)
[![License: MIT](https://img.shields.io/badge/license-MIT-green?style=flat-square)](LICENSE)

## Features

- MCP server on `@modelcontextprotocol/sdk`, served over stdio (`src/index.ts`)
- Two example tools: `example` (repeats a message 1–10 times) and `calculate` (add, subtract, multiply, divide)
- Strict TypeScript, built by Vite in library mode to ESM and CommonJS (`dist/index.js`, `dist/index.cjs`), with the SDK left external
- Unit tests with `bun test`, plus a stdio smoke test of the built server (`scripts/test-server.ts`)
- oxlint for linting and Prettier for formatting
- GitHub Actions CI: audit, type check, lint, format check, build, tests and smoke test, then npm publish via trusted publishing
- `bunfig.toml` refuses to install package versions published less than 3 days ago

## Quick start

### Clone

```sh
git clone https://github.com/MrBrunoWolff/minimal-mcp-server.git
cd minimal-mcp-server
bun install
bun run dev
```

## Scripts

| Command                  | Description                                                             |
| ------------------------ | ----------------------------------------------------------------------- |
| `bun run dev`            | Type-check, then rebuild with Vite in watch mode                        |
| `bun run build`          | Type-check, then build `dist/` with Vite (ESM and CommonJS)             |
| `bun run preview`        | Run `vite preview`                                                      |
| `bun run test`           | Run the test suite with `bun test --parallel`                           |
| `bun run test:watch`     | Run tests in watch mode                                                 |
| `bun run test:coverage`  | Run tests with coverage                                                 |
| `bun run test:server`    | Start the built `dist/index.js` with Node over stdio and check it boots |
| `bun run lint`           | Lint with oxlint                                                        |
| `bun run lint:fix`       | Lint with oxlint and apply fixes                                        |
| `bun run type-check`     | Run `tsc --noEmit` against `tsconfig.json` and `tsconfig.test.json`     |
| `bun run clean`          | Delete `dist/`                                                          |
| `bun run start`          | Run the built server with `bun dist/index.js`                           |
| `bun run prepublishOnly` | Build before publishing (runs automatically on publish)                 |
| `bun run format`         | Format all files with Prettier                                          |
| `bun run format:check`   | Check formatting with Prettier                                          |
| `bun run audit`          | Audit dependencies, failing on high or critical advisories              |
| `bun run licenses`       | List licenses of production dependencies                                |

## Project structure

```
.
├── .github/workflows/ci.yml       # Quality gates and npm publish
├── bin/create-mcp-server.js       # `create` scaffolder (package bin)
├── docs/GETTING_STARTED.md        # Walkthrough for adding a tool
├── examples/
│   ├── README.md                  # Claude Desktop setup notes
│   └── claude_desktop_config.json # Example client config
├── scripts/test-server.ts         # Stdio smoke test for dist/index.js
├── src/
│   ├── index.ts                   # Entry point: stdio transport
│   ├── server.ts                  # Server setup and tool registration
│   ├── tools/
│   │   ├── example.ts             # `example` tool
│   │   └── math.ts                # `calculate` tool
│   └── types/index.ts             # Shared types
├── tests/
│   ├── server.test.ts
│   └── tools/                     # example.test.ts, math.test.ts
├── bunfig.toml
├── CHANGELOG.md
├── CONTRIBUTING.md
├── LICENSE
├── PUBLICATION_CHECKLIST.md
├── package.json
├── tsconfig.json
├── tsconfig.test.json
└── vite.config.ts
```

## MCP client integration

Build the server, then point your MCP client at `dist/index.js` with an absolute path. For Claude Desktop, add this to `claude_desktop_config.json` (macOS: `~/Library/Application Support/Claude/`, Windows: `%APPDATA%\Claude\`) and restart the app:

```json
{
  "mcpServers": {
    "minimal-mcp-server": {
      "command": "node",
      "args": ["/path/to/your/minimal-mcp-server/dist/index.js"],
      "env": {}
    }
  }
}
```

`bun run test:server` checks that the built server starts and prints a matching config with your local path filled in. See [examples/](examples/) and [docs/GETTING_STARTED.md](docs/GETTING_STARTED.md) for more.

To add a tool, create it in `src/tools/`, then add it to the `ListToolsRequestSchema` list and the `CallToolRequestSchema` switch in `src/server.ts`.

## Publishing

CI publishes to npm from `main` using trusted publishing (OIDC), so no npm token is stored. The publish job runs after the quality gates pass, on a push to `main` or a manual `gh workflow run ci.yml`, and only publishes when the `version` in `package.json` is not already on npm. To release, bump `version` and push to `main`.

Trusted publishing cannot create a package. For a new package name, publish once by hand (`npm login`, then `npm publish`), then configure the trusted publisher on npm with this repository and workflow `ci.yml`.

## License

MIT — see [LICENSE](LICENSE).
