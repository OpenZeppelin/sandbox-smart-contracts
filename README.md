# TSB contracts

This workspace uses [Nx, a Smart, fast and extensible build system.](https://nx.dev) 

## Understand this workspace

Run `nx graph` to see a diagram of the dependencies of the projects.

To add a package simply add it inside the packages directory, optionally every package can implement
the following targets that will be run by the root `package.json` scripts and on the CI:

- test
- coverage: run coverate, CI expect to have at least 80% coverage on packages.
- lint
- format: format the code with prettier.
- deploy: to test hardhat deployments.

## Further help

Visit the [Nx Documentation](https://nx.dev) to learn more.
