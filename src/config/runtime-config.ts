/**
 * Runtime Configuration Manager
 */

import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'js-yaml';
import { AgentConfig, PromptGraph } from '../types';

export class RuntimeConfig {
  private static instance: RuntimeConfig;
  private configDir: string;
  private globalConfig: GlobalConfig;
  
  private constructor() {
    // Determine config directory
    this.configDir = process.env.QUANTUM_CONFIG_DIR || path.join(process.env.HOME || '', '.quantum');
    
    // Initialize global config with defaults
    this.globalConfig = {
      defaultProvider: 'openai',
      logLevel: 'info',
      tokenTracking: true,
      agentPaths: [path.join(this.configDir, 'agents')],
      memoryPath: path.join(this.configDir, 'memory'),
      historyPath: path.join(this.configDir, 'history'),
    };
    
    // Create config directory if it doesn't exist
    if (!fs.existsSync(this.configDir)) {
      fs.mkdirSync(this.configDir, { recursive: true });
    }
    
    // Create subdirectories
    ['agents', 'memory', 'history'].forEach(dir => {
      const dirPath = path.join(this.configDir, dir);
      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
      }
    });
    
    // Load config if it exists
    const configPath = path.join(this.configDir, 'config.yaml');
    if (fs.existsSync(configPath)) {
      try {
        const configFile = fs.readFileSync(configPath, 'utf8');
        const loadedConfig = yaml.load(configFile) as GlobalConfig;
        this.globalConfig = { ...this.globalConfig, ...loadedConfig };
      } catch (error) {
        console.error('Error loading config file:', error);
      }
    } else {
      // Create default config file
      this.saveGlobalConfig();
    }
  }
  
  /**
   * Get singleton instance
   */
  public static getInstance(): RuntimeConfig {
    if (!RuntimeConfig.instance) {
      RuntimeConfig.instance = new RuntimeConfig();
    }
    return RuntimeConfig.instance;
  }
  
  /**
   * Get global configuration
   */
  public getGlobalConfig(): GlobalConfig {
    return { ...this.globalConfig };
  }
  
  /**
   * Update global configuration
   */
  public updateGlobalConfig(config: Partial<GlobalConfig>): void {
    this.globalConfig = { ...this.globalConfig, ...config };
    this.saveGlobalConfig();
  }
  
  /**
   * Save global configuration to disk
   */
  private saveGlobalConfig(): void {
    const configPath = path.join(this.configDir, 'config.yaml');
    const yamlStr = yaml.dump(this.globalConfig);
    fs.writeFileSync(configPath, yamlStr, 'utf8');
  }
  
  /**
   * Load an agent configuration
   */
  public loadAgentConfig(name: string): AgentConfig | null {
    for (const agentPath of this.globalConfig.agentPaths) {
      const fullPath = path.join(agentPath, `${name}.yaml`);
      if (fs.existsSync(fullPath)) {
        try {
          const agentFile = fs.readFileSync(fullPath, 'utf8');
          return yaml.load(agentFile) as AgentConfig;
        } catch (error) {
          console.error(`Error loading agent config ${name}:`, error);
          return null;
        }
      }
    }
    return null;
  }
  
  /**
   * Save an agent configuration
   */
  public saveAgentConfig(config: AgentConfig): void {
    const agentPath = path.join(this.globalConfig.agentPaths[0], `${config.name}.yaml`);
    const yamlStr = yaml.dump(config);
    fs.writeFileSync(agentPath, yamlStr, 'utf8');
  }
  
  /**
   * Load a prompt graph
   */
  public loadPromptGraph(name: string): PromptGraph | null {
    const graphPath = path.join(this.configDir, 'graphs', `${name}.yaml`);
    if (fs.existsSync(graphPath)) {
      try {
        const graphFile = fs.readFileSync(graphPath, 'utf8');
        return yaml.load(graphFile) as PromptGraph;
      } catch (error) {
        console.error(`Error loading prompt graph ${name}:`, error);
        return null;
      }
    }
    return null;
  }
  
  /**
   * Save a prompt graph
   */
  public savePromptGraph(graph: PromptGraph): void {
    const graphsDir = path.join(this.configDir, 'graphs');
    if (!fs.existsSync(graphsDir)) {
      fs.mkdirSync(graphsDir, { recursive: true });
    }
    
    const graphPath = path.join(graphsDir, `${graph.name}.yaml`);
    const yamlStr = yaml.dump(graph);
    fs.writeFileSync(graphPath, yamlStr, 'utf8');
  }
  
  /**
   * List all available agents
   */
  public listAgents(): string[] {
    const agents: string[] = [];
    
    for (const agentPath of this.globalConfig.agentPaths) {
      if (fs.existsSync(agentPath)) {
        const files = fs.readdirSync(agentPath);
        const agentFiles = files.filter(file => file.endsWith('.yaml'));
        agents.push(...agentFiles.map(file => file.replace('.yaml', '')));
      }
    }
    
    return agents;
  }
}

export interface GlobalConfig {
  defaultProvider: string;
  logLevel: 'debug' | 'info' | 'warn' | 'error';
  tokenTracking: boolean;
  agentPaths: string[];
  memoryPath: string;
  historyPath: string;
  registryUrl?: string;
  registryToken?: string;
}
