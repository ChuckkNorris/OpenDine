terraform {
  required_providers {
    azapi = {
      source = "azure/azapi"
    }
  }
}

# provider "azapi" {
# }

# provider "azurerm" {
#   features {}
# }

resource "azurerm_kubernetes_cluster" "k8s" {
  location            = var.location
  name                = "aks-${var.app_name}-${var.environment}"
  resource_group_name = var.resource_group_name
  dns_prefix          = "od" # random_pet.azurerm_kubernetes_cluster_dns_prefix.id

  identity {
    type = "SystemAssigned"
  }

  default_node_pool {
    name       = "agentpool"
    vm_size    = "Standard_D2_v2"
    node_count = var.node_count
  }
  linux_profile {
    admin_username = var.username

    ssh_key {
      key_data = var.ssh_public_key
    }
  }
  network_profile {
    network_plugin    = "kubenet"
    load_balancer_sku = "standard"
  }
}