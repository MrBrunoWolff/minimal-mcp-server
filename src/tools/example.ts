import { Tool } from '@modelcontextprotocol/sdk/types.js';
import { ExampleToolArgs, MCPToolResponse } from '../types/index.js';

/**
 * Example tool definition
 */
export const exampleTool: Tool = {
  name: 'example',
  description: 'An example tool that demonstrates basic MCP functionality. It takes a message and optionally repeats it multiple times.',
  inputSchema: {
    type: 'object',
    properties: {
      message: {
        type: 'string',
        description: 'The message to process'
      },
      count: {
        type: 'number',
        description: 'Number of times to repeat the message (default: 1)',
        minimum: 1,
        maximum: 10,
        default: 1
      }
    },
    required: ['message']
  }
};

/**
 * Handle the example tool execution
 */
export async function handleExampleTool(args: ExampleToolArgs): Promise<MCPToolResponse> {
  const { message, count = 1 } = args;
  
  // Validate inputs
  if (!message || typeof message !== 'string') {
    throw new Error('Message must be a non-empty string');
  }
  
  if (count < 1 || count > 10) {
    throw new Error('Count must be between 1 and 10');
  }
  
  // Process the message
  const repeatedMessages = Array(count).fill(message);
  const result = repeatedMessages.join(' | ');
  
  return {
    content: [
      {
        type: 'text',
        text: `Processed message: ${result}`
      }
    ]
  };
}
