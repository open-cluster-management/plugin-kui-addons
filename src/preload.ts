/*
 * Copyright Contributors to the Open Cluster Management project
 */

import { notebookVFS } from '@kui-shell/plugin-core-support'

export default function preloadNotebooks() {
    notebookVFS.cp(undefined, ['plugin://plugin-kui-addons/notebooks/welcome.json'], '/kui')
}