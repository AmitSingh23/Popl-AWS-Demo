.PHONY: terraform, build, destroy

tf:
	cd terraform && terraform apply

deploy:
	npm run build
	npm run deploy

up: tf deploy
	

destroy:
	terraform destroy
	sls remove
