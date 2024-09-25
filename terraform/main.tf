provider "azurerm" {
  features {}
}

# Ressourcengruppe erstellen
resource "azurerm_resource_group" "main" {
  name     = "my-app-resource-group"
  location = "West Europe"
}

# Virtuelles Netzwerk erstellen
resource "azurerm_virtual_network" "main" {
  name                = "my-app-vnet"
  address_space       = ["10.0.0.0/16"]
  location            = azurerm_resource_group.main.location
  resource_group_name = azurerm_resource_group.main.name
}

# Subnetze für AKS und SQL
resource "azurerm_subnet" "aks_subnet" {
  name                 = "aks-subnet"
  resource_group_name  = azurerm_resource_group.main.name
  virtual_network_name = azurerm_virtual_network.main.name
  address_prefixes     = ["10.0.1.0/24"]
}

resource "azurerm_subnet" "sql_subnet" {
  name                 = "sql-subnet"
  resource_group_name  = azurerm_resource_group.main.name
  virtual_network_name = azurerm_virtual_network.main.name
  address_prefixes     = ["10.0.2.0/24"]
}

# Container Registry (ACR) erstellen, um Docker-Images zu speichern
resource "azurerm_container_registry" "main" {
  name                = "myappregistry"
  resource_group_name = azurerm_resource_group.main.name
  location            = azurerm_resource_group.main.location
  sku                 = "Basic"
  admin_enabled       = true
}

# AKS Cluster für die Anwendungen
resource "azurerm_kubernetes_cluster" "main" {
  name                = "my-aks-cluster"
  location            = azurerm_resource_group.main.location
  resource_group_name = azurerm_resource_group.main.name
  dns_prefix          = "myaksdns"

  default_node_pool {
    name       = "default"
    node_count = 2
    vm_size    = "Standard_DS2_v2"
  }

  identity {
    type = "SystemAssigned"
  }
}

# SQL-Datenbank (Azure SQL) erstellen
resource "azurerm_mssql_server" "main" {
  name                         = "Wandertrail"
  resource_group_name          = azurerm_resource_group.main.name
  location                     = azurerm_resource_group.main.location
  version                      = "12.0"
  administrator_login          = var.sql_admin_username
  administrator_login_password = var.sql_admin_password

  identity {
    type = "SystemAssigned"
  }
}

resource "azurerm_mssql_database" "main" {
  name                = "myappdb"
  resource_group_name = azurerm_resource_group.main.name
  server_name         = azurerm_mssql_server.main.name
  sku_name            = "S0"
}

# Output der Ressourcen
output "aks_cluster_name" {
  value = azurerm_kubernetes_cluster.main.name
}

output "sql_server_name" {
  value = azurerm_mssql_server.main.name
}

output "sql_database_name" {
  value = azurerm_mssql_database.main.name
}

output "container_registry" {
  value = azurerm_container_registry.main.login_server
}
