# KUI Addons

## Development with Open Source KUI
1. Link the plugin to the open source KUI's plugin folder
   ```
    ln -s plugin-kui-addons /path/to/kui/plugins/
   ```
2. in kui folder, do `npm run compile`
3. in kui folder, do `npm start`

## Publish The Plugin
1. add all files you modified with `git add`
2. use `npm run commit` to start a commit process
3. create a PR
4. merge the PR, and the Travis job will publish a release