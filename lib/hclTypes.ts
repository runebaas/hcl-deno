export interface Module {
  source: string;
  [key: string]: unknown;
}

export interface Variable {
  "default": string | string[];
  "type": string;
  description: string;
  validation: VariableValidation;
  sensitive: boolean;
  nullable: boolean;
}

export interface VariableValidation {
  condition: string;
  error_message: string;
}

export interface TerraformSettings {
  backend: Record<string, unknown>;
  cloud: TerraformCloudSettings;
  required_providers: Record<string, RequiredProvider>;
}

export interface RequiredProvider {
  source: string;
  version?: string;
}

export interface TerraformCloudSettings {
  organization: string;
}

export interface Hcl {
  data: Record<string, Record<string, unknown>>;
  module: Record<string, Module>;
  resource: Record<string, unknown>;
  variable: Record<string, Partial<Variable>>;
  provider: Record<string, unknown>;
  terraform: Partial<TerraformSettings>;
}
