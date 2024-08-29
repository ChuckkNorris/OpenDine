terraform {
  required_providers {
    azapi = {
      source = "azure/azapi"
    }
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "3.94.0"
    }
  }
}

# Azure Container Registery used to store/serve docker images
# NOTE: This should only exist in a common environment, and should not be created in each environment
resource "azurerm_container_registry" "acr" {
  name                = "acr${var.project_name}"
  resource_group_name = var.resource_group_name
  location            = var.location
  sku                 = "Basic"
}

# Kubernetes Cluster to host dockerized applications
resource "azurerm_kubernetes_cluster" "k8s" {
  location            = var.location
  name                = "aks-${var.project_name}-${var.environment}"
  resource_group_name = var.resource_group_name
  dns_prefix          = "od" # random_pet.azurerm_kubernetes_cluster_dns_prefix.id

  identity {
    type = "SystemAssigned"
  }

  default_node_pool {
    name       = "agentpool"
    vm_size    = "Standard_B2s"
    os_disk_size_gb = 50
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

# Role to allow K8s to pull images directly from Azure Container Registry
resource "azurerm_role_assignment" "aks_acr_role" {
  principal_id                     = azurerm_kubernetes_cluster.k8s.kubelet_identity[0].object_id
  role_definition_name             = "AcrPull"
  scope                            = azurerm_container_registry.acr.id
  skip_service_principal_aad_check = true
}
