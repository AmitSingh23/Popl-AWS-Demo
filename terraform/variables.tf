
variable "db_user" {
  type        = string
  description = "The username for the db"
  default     = "admin"
}

variable "db_password" {
  type        = string
  description = "The password for the db"
  sensitive   = true
}