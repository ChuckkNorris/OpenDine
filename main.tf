locals {
  app_name = "opendine"
  # environment = "dev"
  location = "centralus"
}

# Configure the Azure provider
terraform {
  backend "azurerm" {
    resource_group_name  = "rg-terraform-state"
    storage_account_name = "opendineterraform"
    container_name       = "tfstate"
    key                  = "terraform-opendine.tfstate"
  }
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 3.0.2"
    }
  }

  required_version = ">= 1.1.0"
}

provider "azurerm" {
  features {}
}

# resource "azurerm_resource_group" "rg" {
#   name     = "rg-${var.app_name}-${var.environment}"
#   location = var.location
#   tags = {
#     Environment = var.environment
#   }
# }

module "resource_group" {
  source      = "./infra/modules/resource-group"
  environment = var.environment
  app_name    = var.app_name
}

# TODO
# KeyVault
# Sql Server/DB w/ connection string added as secret in KV
# Azure Kubernetes Service
