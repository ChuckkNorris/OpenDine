output "sql_connection_string" {
  value = azurerm_key_vault_secret.sql_connection_string.value
  sensitive = true
}
