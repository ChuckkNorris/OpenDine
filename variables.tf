# Global variables for OpenDine infrastructure across all environments
variable "project_name" {
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
  validation {
    condition = can(regex("^(dev|test|prod)$", var.environment))
    error_message = "Environment must be one of 'dev', 'test', or 'prod'"
  }
}