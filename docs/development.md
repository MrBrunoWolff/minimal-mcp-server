# MCP server development

[Project overview](../README.md)

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

`bun run test:server` checks that the built server starts and prints a matching config with your local path filled in. See [examples/](../examples/) and [docs/GETTING_STARTED.md](../docs/GETTING_STARTED.md) for more.

To add a tool, create it in `src/tools/`, then add it to the `ListToolsRequestSchema` list and the `CallToolRequestSchema` switch in `src/server.ts`.

## Publishing

CI publishes to npm from `main` using trusted publishing (OIDC), so no npm token is stored. The publish job runs after the quality gates pass, on a push to `main` or a manual `gh workflow run ci.yml`, and only publishes when the `version` in `package.json` is not already on npm. To release, bump `version` and push to `main`.

Trusted publishing cannot create a package. For a new package name, publish once by hand (`npm login`, then `npm publish`), then configure the trusted publisher on npm with this repository and workflow `ci.yml`.
