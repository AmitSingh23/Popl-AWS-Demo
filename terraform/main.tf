provider "aws" {
  region = "us-east-1"
}

resource "aws_db_instance" "demo_resource_db" {
  allocated_storage    = 10
  engine               = "mysql"
  engine_version       = "5.7"
  instance_class       = "db.t2.micro"
  db_name              = "demo_resource_db"
  username             = var.db_user
  password             = var.db_password
  parameter_group_name = "default.mysql5.7"
    skip_final_snapshot  = true

}

resource "aws_secretsmanager_secret" "db_credentials" {
  name = "demo-db-credentials"
}

resource "aws_secretsmanager_secret_version" "db_credentials_version" {
  secret_id     = aws_secretsmanager_secret.db_credentials.id
  secret_string = jsonencode({
    username = var.db_user
    password = var.db_password
  })
}
