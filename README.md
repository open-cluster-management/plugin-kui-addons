# KUI Addons

This KUI plugin is responsible for helping block users from executing unsupported KUI commands in the kui-web-terminal deployment.

## Package publishing information
This plugin uses several technologies to automate and make npm package publishing easier.  Currently we do not publish to the public npm; this repostitory builds a `.tgz` with the compiled plugin that is integrated in the kui-web-terminal repository.

- commitizen (standardizes commit messages, semantic-release relies on the commit message to determine how to version the next release)
- semantic-release (automates npm publishing and git releases)

## Development with Open Source KUI
Refer to the upstream KUI repo for instructions on how to develop plugins (https://github.com/IBM/kui)

## How to publish a new npm package release for this plugin
1. Add all files you modified with `git add`
2. Use `npm run commit` to start a commit process (IMPORTANT - do not use git commit)
3. Create a PR
4. Merge the PR, and the Travis job will publish a release
