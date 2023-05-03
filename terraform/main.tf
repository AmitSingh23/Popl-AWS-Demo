provider "aws" {
  region = "us-east-1"
}

# This might look like it's creating a default VPC but it's not-- if the default doesn't exist, it'll create it
# but otherwise, it'll just retrieve the default. Calling `terraform destroy` won't destroy the default vpc
# either; it'll just destroy the state.
resource "aws_default_vpc" "default" {
  tags = {
    Name = "Default VPC"
  }
}

data "aws_subnets" "all" {
  filter {
    name   = "vpc-id"
    values = [aws_default_vpc.default.id]
  }
}

data "aws_security_group" "sg" {
  vpc_id = aws_default_vpc.default.id
}

resource "aws_secretsmanager_secret" "vpc_info" {
  name = "vpc_info"
}

resource "aws_secretsmanager_secret_version" "vpc_info_version" {
  secret_id     = aws_secretsmanager_secret.vpc_info.id
  secret_string = jsonencode({
    securityGroupId = data.aws_security_group.sg.id
    subnetIds = data.aws_subnets.all.ids
  })

  depends_on = [ aws_secretsmanager_secret.db_credentials ]
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
  name = "rds-connection-credentials"
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
