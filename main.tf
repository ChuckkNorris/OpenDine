# Local variables to server as global defaults for OpenDine infrastructure
locals {
  app_name = "opendine"
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

# Resource Group for all OpenDine resources in environment
resource "azurerm_resource_group" "rg" {
  name     = "rg-${var.app_name}-${var.environment}"
  location = var.location
  tags = {
    Environment = var.environment
  }
}

# KeyVault to store secrets for OpenDine resources
module "keyvault" {
  source      = "./infra/modules/key-vault"
  environment = var.environment
  app_name    = var.app_name
  resource_group_name = azurerm_resource_group.rg.name
}

# Azure SQL Server and Database w/ connection string added as secret in KV
module "database" {
  source      = "./infra/modules/database"
  environment = var.environment
  app_name    = var.app_name
  resource_group_name = azurerm_resource_group.rg.name
  keyvault_id = module.keyvault.keyvault_id
}

# TODO
# KeyVault
# Sql Server/DB w/ connection string added as secret in KV
# Azure Kubernetes Service

