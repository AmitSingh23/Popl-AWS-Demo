# Popl-AWS-Demo

## Functions

### Producer

Writes a message to the specified SQS queue-- expected to be in the format of the `Resource` interface

### Consumer

Reads a message from the SQS queue and writes it into a MySQL RDS instance

### Resource-Service 

API that exposes Resource objects to the user from the database

### Architecture

![Architecture Diagram](diagrams/architecture.png)
