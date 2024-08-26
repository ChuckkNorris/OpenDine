# Create a Resource Group
resource "azurerm_resource_group" "appservice-rg" {
  name = "${var.app_name}-${var.environment}_AppService-rg"
  location = var.location
 
  tags = {
    owner = var.owner
    environment = var.environment
  }
}

# Create app service plan
resource "azurerm_app_service_plan" "service-plan" {
  name = "${var.app_name}-${var.environment}_AppService-plan"
  location = azurerm_resource_group.appservice-rg.location
  resource_group_name = azurerm_resource_group.appservice-rg.name
  kind = "Linux"
  reserved = true
 
  sku {
    tier = "Basic"
    size = "B1"
  }
 
  tags = {
    owner = var.owner
    environment = var.environment
  }
}

# Create app service
resource "azurerm_app_service" "app-service" {
  name = "${var.app_name}-${var.environment}"
  location = azurerm_resource_group.appservice-rg.location
  resource_group_name = azurerm_resource_group.appservice-rg.name
  app_service_plan_id = azurerm_app_service_plan.service-plan.id  
 
  site_config {
    linux_fx_version = "DOCKER|${var.docker_image}:${var.docker_image_tag}"
  }
 
  app_settings = {
    "WEBSITES_PORT" = var.app_port
  }
 
  tags = {
    owner = var.owner
    environment = var.environment
  }
}

output "app_service_url" {
  value       = azurerm_app_service.app-service.default_site_hostname
  description = "Default URL to access the app service." 
}