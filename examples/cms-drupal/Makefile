.DEFAULT_GOAL=start

build:
	docker-compose build
	docker-compose up -d
	chmod 755 src/sites/default
	if [ ! -f src/sites/default/settings.php ]; then cp infra/local/drupal/settings.php src/sites/default; fi
	if [ -d ../../packages/cms-drupal ]; then mkdir -p src/modules/custom/ekino_rendr && yarn setup-drupal; fi
	docker-compose exec rendr_drupal su www-data -c /bin/ash -l -c /drupal_setup.sh
	docker-compose exec rendr_drupal su www-data -c /bin/ash -l -c "/var/www/html/vendor/bin/drush -y cex"
	docker-compose stop

shell:
	docker-compose exec rendr_drupal su www-data -c '(cd /var/www/html && /bin/ash -l)'

destroy:
	docker-compose rm -fvs

reset:
	# copy back path
	if [ -f src/sites/default/settings.php ]; then chmod 755 src/sites/default/settings.php; fi
	chmod 755 src/sites/default
	rm -rf src/sites/default/settings.php
	make stop destroy build

start:
	docker-compose up

stop:
	docker-compose stop

.env:
	cp .env.dist $@
	sed --in-place "s/{your_unix_uid}/$(shell id --user)/" $@
	sed --in-place "s/{your_unix_gid}/$(shell id --group)/" $@
