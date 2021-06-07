# KUI Addons

This [KUI](https://github.com/kubernetes-sigs/kui) plugin is responsible for helping block users from executing unsupported KUI commands in the [kui-web-terminal](https://github.com/open-cluster-management/kui-web-terminal) deployment.

## Package publishing information
This plugin uses several technologies to automate and make npm package publishing easier.  Currently we do not publish to the public npm; this repostitory builds a `.tgz` with the compiled plugin that is integrated in the [kui-web-terminal](https://github.com/open-cluster-management/kui-web-terminal) repository.

- commitizen (standardizes commit messages, semantic-release relies on the commit message to determine how to version the next release)
- semantic-release (automates npm publishing and git releases)

## Development with Open Source KUI
Refer to the upstream [KUI](https://github.com/kubernetes-sigs/kui) repo for instructions on how to develop plugins

## How to publish a new npm package release for this plugin
1. Make any code changes needed or any updates to dependencies in `package.json`
2. If you want to start over and update all dependencies, run `make clean`
3. Run `make install` to update `package-lock.json`
4. Run `make compile-plugin` to perform the typescript compile and babel translation
5. Add all files you modified with `git add`
6. Use `npm run commit` to start a commit process (IMPORTANT - do not use git commit)
7. Create a PR with the commit and see if the PR build succeeds
8. Merge the PR, and the Travis job will package and publish a release
