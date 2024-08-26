# Global variables for OpenDine infrastructure across all environments
variable "app_name" {
  default = "opendine"
}

variable "location" {
  // NOTE: Only centralus region allowed within OneWorkplace subscription
  default = "centralus"
}

variable "environment" {
  default = "dev"
}