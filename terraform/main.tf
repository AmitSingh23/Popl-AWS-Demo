provider "aws" {
  region = "us-east-1"
}

resource "aws_db_instance" "demo_resource_db" {
  allocated_storage    = 10
  engine               = "mysql"
  engine_version       = "8.0"
  instance_class       = "db.t2.micro"
  db_name              = "demo_resource_db"
  username             = var.db_user
  password             = var.db_password
  parameter_group_name = "default.mysql8.0"
  skip_final_snapshot  = true
}

resource "aws_secretsmanager_secret" "db_credentials" {
  name = "demo-rds-credentials"
  depends_on = [ aws_db_instance.demo_resource_db ]
}

resource "aws_secretsmanager_secret_version" "db_credentials_version" {
  secret_id     = aws_secretsmanager_secret.db_credentials.id
  secret_string = jsonencode({
    user = var.db_user
    password = var.db_password
    host = aws_db_instance.demo_resource_db.address
    database = aws_db_instance.demo_resource_db.db_name
  })

  depends_on = [ aws_secretsmanager_secret.db_credentials ]
}
