# Global variables for OpenDine infrastructure across all environments
variable "app_name" {
  type = string
  nullable = false
}

variable "location" {
  type = string
  # NOTE: Only centralus region allowed within OneWorkplace subscription
  default = "centralus"
}

# Environment-specific variables
# Must be defined in respective ./environments/{env}.tfvars file
variable "environment" {
  type = string
  nullable = false
}

variable "resource_group_name" {
  type = string
}

variable "node_count" {
  type        = number
  description = "The initial quantity of nodes for the node pool."
  default     = 3
}

variable "msi_id" {
  type        = string
  description = "The Managed Service Identity ID. Set this value if you're running this example using Managed Identity as the authentication method."
  default     = null
}

variable "username" {
  type        = string
  description = "The admin username for the new cluster."
  default     = "azureadmin"
}

#  azapi_resource_action.ssh_public_key_gen.output.publicKey
variable "ssh_public_key" {
  type        = string
  description = "SSH key to secure access to AKS cluster"
}