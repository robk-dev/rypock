# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] 30/08/2020

### Added

- Started using CHANGELOG
- Setup repository, monorepo folder structure, AWS ECR & ECS instance
- Added basic express app
- Setup Dockerfile
- Added pipeline files for publishing express app as container
- Deployed container from azure devops
- Added typescript, basic build & test scripts, linting, formatting scripts
- Added husky hooks
- Added utilities package and setup private npm feed locally and in CI
- Added utility libraries like winston logger and global singleton injection service
- Added Repository Pattern Interfaces, abstract implementations, and connection managers for data stores in util package
- Added CRUD operations to express app using utilities
- Added csurf protection
- Setup integration tests for utilities and CRUD repo

#### TODO

- setup docker-compose
- setup react frontend
- setup nestjs microservices with grpc
- setup kubernetes manifest/helm chart
- setup pull request and issue templates on github
