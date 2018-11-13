# Installation
It is recommended to run application using Docker, but step-by-step instruction is also provided.
First, follow common steps:
1. Place `application.yml` to `src/main/resources/`. Ask maintainer for example file.

There are two version of frontend available: old is located in this repo, and new is separated to [here](https://github.com/YevheniiStepaniuk/ft-web-client).
## Running using Docker
1. See `deploy.sh` for instruction

## Running manually
First of all, you need Linux or MacOS system installed (Windows is supported, but with no instruction provided)

### Prerequisites
1. Install [PostgreSQL](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-postgresql-on-ubuntu-18-04)
2. Install Java >=8 and Maven
3. Install NginX.

### Running
1. Use this [commands](db/init.sql.noexec) to initialize database.
2. In your `application.yml` set `spring.jpa.hibernate.ddl-auto: create` to let Hibernate create all it need to working. For later use set `spring.jpa.hibernate.ddl-auto: validate` back.
3. To run server use `run.sh` or `start.sh` (to run it in background with logging).
4. Use [this guide](webclient/) to run frontend.
5. Use [this config](https://github.com/Romm17/FriendTreasuryAPI/blob/master/webclient/nginx-webserver.config) for NginX. Set your API URL to make it work.
