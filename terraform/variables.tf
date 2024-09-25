variable "sql_admin_username" {
  type        = string
  description = "SQL Server admin username"
}

variable "sql_admin_password" {
  type        = string
  description = "SQL Server admin password"
  sensitive   = true
}
