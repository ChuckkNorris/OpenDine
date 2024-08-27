# Global variables for OpenDine infrastructure across all environments
variable "app_name" {
  default = "opendine"
}

variable "location" {
  # NOTE: Only centralus region allowed within OneWorkplace subscription
  default = "centralus"
}

# Environment-specific variables
# Must be defined in respective ./environments/{env}.tfvars file
variable "environment" {
  type     = string
  nullable = false
}