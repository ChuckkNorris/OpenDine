resource "azurerm_mssql_server" "sqlserver" {
  name                         = "sql-${var.app_name}-${var.environment}"
  resource_group_name          = var.resource_group_name
  location                     = var.location
  version                      = "12.0"
  administrator_login          = "4dm1n157r470r"
  administrator_login_password = "4-v3ry-53cr37-p455w0rd"

  lifecycle {
    prevent_destroy = true
  }
}

resource "azurerm_mssql_database" "sqldb" {
  name           = "sqldb-${var.app_name}-${var.environment}"
  server_id      = azurerm_mssql_server.sqlserver.id
  collation      = "SQL_Latin1_General_CP1_CI_AS"
  license_type   = "LicenseIncluded"
  max_size_gb    = 4
  read_scale     = true
  sku_name       = "S0"
  zone_redundant = false
  enclave_type   = "VBS"

  tags = {
    foo = "bar"
  }

  # prevent the possibility of accidental data loss
  lifecycle {
    prevent_destroy = true
  }
}

resource "azurerm_key_vault_secret" "example" {
  name         = "sql-connectionstring"
  value        = "Server=tcp:${azurerm_mssql_managed_instance.example.name}.database.windows.net,1433;Persist Security Info=False;User ID=${local.username};Password=${local.password};MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;"
  key_vault_id = var.keyvault_id
}
