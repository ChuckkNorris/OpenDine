# Global variables for OpenDine infrastructure across all environments
variable "project_name" {
  default = "opendine"
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

variable "keyvault_id" {
  type = string
}