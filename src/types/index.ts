export interface ExampleToolArgs {
  message: string;
  count?: number;
}

// Use the proper MCP SDK types for responses
export interface MCPToolResponse {
  content: Array<{
    type: 'text';
    text: string;
  }>;
}
