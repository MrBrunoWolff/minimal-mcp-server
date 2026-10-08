# Minimal MCP Server

A [Model Context Protocol](https://modelcontextprotocol.io/) server template with two example tools, stdio transport and TypeScript source you can extend.

[![npm](https://img.shields.io/npm/v/@mrbrunowolff/minimal-mcp-server?style=flat-square)](https://www.npmjs.com/package/@mrbrunowolff/minimal-mcp-server)
[![License: MIT](https://img.shields.io/badge/license-MIT-green?style=flat-square)](LICENSE)

## Quick start

Use Node.js 20 or later to run the published stdio server:

```sh
npm install @mrbrunowolff/minimal-mcp-server
node node_modules/@mrbrunowolff/minimal-mcp-server/dist/index.js
```

The server communicates over stdio. Configure your MCP client to launch `node` with the absolute path to the installed `dist/index.js`; see the [client setup](docs/development.md#mcp-client-integration).

To develop your own tools, use the Bun version declared in the repository’s package manifest and clone the source:

```sh
git clone https://github.com/MrBrunoWolff/minimal-mcp-server.git
cd minimal-mcp-server
bun install --frozen-lockfile
bun run build
node dist/index.js
```

The checkout includes the source and tests; the npm package ships the built server, client examples and documentation.

## Features

- Example tools for repeating a message and performing arithmetic.
- ESM and CommonJS builds using the official MCP SDK.
- Unit tests and a smoke test of the built stdio server.

## Scripts

| Command               | Description                                     |
| --------------------- | ----------------------------------------------- |
| `bun run dev`         | Rebuild in watch mode                           |
| `bun run build`       | Type-check and build ESM/CommonJS output        |
| `bun run test`        | Run unit tests                                  |
| `bun run test:server` | Smoke-test the built stdio server               |
| `bun run check:ci`    | Run the complete repository validation contract |

## Development

See [adding tools](docs/GETTING_STARTED.md), the [development guide](docs/development.md), [contribution guidance](https://github.com/MrBrunoWolff/minimal-mcp-server/blob/main/CONTRIBUTING.md) and [QUALITY.md](https://github.com/MrBrunoWolff/minimal-mcp-server/blob/main/QUALITY.md). Bun dependency updates retain the three-day minimum release age.

## License

MIT — see [LICENSE](LICENSE).
