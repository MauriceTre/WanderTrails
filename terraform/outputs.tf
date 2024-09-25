output "aks_cluster_name" {
  description = "The AKS Cluster Name"
  value       = azurerm_kubernetes_cluster.main.name
}

output "sql_server_name" {
  description = "The SQL Server Name"
  value       = azurerm_mssql_server.main.name
}

output "sql_database_name" {
  description = "The SQL Database Name"
  value       = azurerm_mssql_database.main.name
}

output "container_registry" {
  description = "The Azure Container Registry"
  value       = azurerm_container_registry.main.login_server
}
