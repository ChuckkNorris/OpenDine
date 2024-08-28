locals {
  username = "commander"
  password = "Cobra1234"
}

# resource "{azure_resource_type}" "{resource_name}"
# the azure_resource_type is a unique identifier for the Azure resource type you are creating
# The resource_name is a reference to this instance of the Azure resource type
resource "azurerm_mssql_server" "sqlserver" {
  name                         = "sql-${var.app_name}-${var.environment}"
  resource_group_name          = var.resource_group_name
  location                     = var.location
  version                      = "12.0"
  administrator_login          = local.username
  administrator_login_password = local.password

  lifecycle {
    prevent_destroy = true
  }
}

resource "azurerm_mssql_database" "sqldb" {
  name           = "sqldb-${var.app_name}-${var.environment}"
  server_id      = azurerm_mssql_server.sqlserver.id
  collation      = "SQL_Latin1_General_CP1_CI_AS"
  license_type   = "LicenseIncluded"
  # max_size_gb    = 4
  # read_scale     = false
  sku_name       = "S0"
  zone_redundant = false
  # enclave_type   = "VBS"

  tags = {
    foo = "bar"
  }

  # prevent the possibility of accidental data loss
  lifecycle {
    prevent_destroy = true
  }
}

resource "azurerm_key_vault_secret" "sql_connection_string" {
  name         = "sql-connectionstring"
  value        = "Server=tcp:${azurerm_mssql_database.sqldb.name}.database.windows.net,1433;Persist Security Info=False;User ID=${local.username};Password=${local.password};MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;"
  key_vault_id = var.keyvault_id
}
