variable "db_username" {
  type        = string
  description = "Username for the RDS instance"
}

variable "db_password" {
  type        = string
  description = "Password for the RDS instance"
  sensitive   = true
}
