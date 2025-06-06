# Claude Desktop Configuration

This file shows an example of how to configure your MCP server with Claude Desktop.

## Setup Instructions

1. Build your MCP server:
   ```bash
   npm run build
   ```

2. Locate your Claude Desktop configuration file:
   - **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
   - **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`

3. Add your server configuration:
   ```json
   {
     "mcpServers": {
       "your-server-name": {
         "command": "node",
         "args": ["/absolute/path/to/your/dist/index.js"],
         "env": {
           "NODE_ENV": "production"
         }
       }
     }
   }
   ```

4. Restart Claude Desktop

## Configuration Options

- `command`: The executable to run (usually "node" for Node.js servers)
- `args`: Array of arguments passed to the command
- `env`: Environment variables to set for the server process

## Testing Your Server

You can test your server independently using:

```bash
# Start the server
npm start

# The server will listen on stdio and wait for MCP protocol messages
```

## Troubleshooting

- Ensure all paths are absolute
- Check that Node.js is installed and accessible
- Verify the server builds without errors
- Check Claude Desktop logs for connection issues
