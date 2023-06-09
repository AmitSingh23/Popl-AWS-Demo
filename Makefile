.PHONY: terraform, build, destroy

tf:
	cd terraform && terraform apply

deploy:
	npm run build
	npm run deploy

up: tf deploy
	

destroy:
	sls remove
	cd terraform && terraform destroy

setup:
	npm i -g serverless
	npm i -y
	cd terraform && terraform init
	echo 'RDS_CREDENTIALS_SECRET_KEY=rds-connection-credentials\nVPC_INFO_SECRET_KEY=vpc_info' > .env
