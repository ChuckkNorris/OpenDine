# Global variables for OpenDine infrastructure across all environments
variable "location" {
  type = string
  # NOTE: Only centralus region allowed within OneWorkplace subscription
  default = "centralus"
}

# Environment-specific variables
# Must be defined in respective ./environments/{env}.tfvars file
variable "resource_group_id" {
  type = string
}