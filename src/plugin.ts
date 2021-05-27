 /*******************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2019. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 *******************************************************************************/
/*
 * Copyright (c) 2020 Red Hat, Inc.
 * Copyright Contributors to the Open Cluster Management project
 */

import { Registrar, Arguments } from '@kui-shell/core'
// command name changed since KUI v6
// import {dispatchToShell} from '@kui-shell/plugin-bash-like/dist/lib/cmds/catchall'
import { doExecWithPty } from '@kui-shell/plugin-bash-like/dist/lib/cmds/catchall'

import * as Debug from 'debug'
const debug = Debug('plugins/addons')

const bashLikeRoutes = ['/git/status','/git/diff','/lls'];
const k8sRoutes = ['/istio/install','/istio/uninstall','/istio/ingress','/istio/status',
'/bookinfo/install','/bookinfo/uninstall','/bookinfo/create',
'/kiali/install','/kiali/delete','/kiali/console', '/kiali/graph',
'/k8s/kedit','/k8s/kdebug'];
const coreSupportRoutes = ['/run','/window','/window/bigger','/window/smaller','/window/max','/window/unmax','/window/close','/quit'];
//const otherRoutes = ['/export','/cd']
//const kuiRoutes = ['']

const blockKUICommand = async (route: string,commandTree: Registrar)=>{
  // using listen->find->listen to block
  commandTree.listen(route,() => {
    return Promise.reject('Command is disabled')
  },{})  // no command options needed in KUI v10 as noAuthOK true is the default
  await commandTree.find(route)

  commandTree.listen(route,() => {
    return Promise.reject('Command is disabled')
  },{}) // no command options needed in KUI v10 as noAuthOK true is the default
}

const rewriteLSCommand = async (commandTree: Registrar)=>{
  // using listen->find->listen to block
  const route='/ls'
  commandTree.listen(route,() => {
    return Promise.reject('Command is disabled')
  },{}) // no command options needed in KUI v10 as noAuthOK true is the default
  await commandTree.find(route)
  commandTree.listen(route,(opts: Arguments) => {
    debug('ls dispatch to shell')
    return doExecWithPty(opts)
  },{})  // no command options needed in KUI v10 as noAuthOK true is the default
}

const rewriteExecCommand = async (commandTree: Registrar)=>{
  // using listen->find->listen to block
  const route='/!'
  commandTree.listen(route,() => {
    return Promise.reject('Command is disabled')
  },{})  // no command options needed in KUI v10 as noAuthOK true is the default
  await commandTree.find(route)
  commandTree.listen(route,(opts: Arguments) => {
    debug('! dispatch to shell')
    return doExecWithPty(opts)
  },{})  // no command options needed in KUI v10 as noAuthOK true is the default
}

const redirectHelp = async (commandTree: Registrar)=> {
  commandTree.listen('/help',() => {
    return Promise.reject('Command is disabled')
  },{})   // no command options needed in KUI v10 as noAuthOK true is the default

  await commandTree.find('/help')

  commandTree.listen('/help', ({ REPL }: Arguments) => {
    return REPL.qexec('getting started')
  },{})  // no command options needed in KUI v10 as noAuthOK true is the default
}

export default async (commandTree: Registrar) => {
  const allRoutes =  [...bashLikeRoutes,...k8sRoutes,...coreSupportRoutes]
  return Promise.all([redirectHelp(commandTree),rewriteExecCommand(commandTree),rewriteLSCommand(commandTree),rewriteLSCommand(commandTree),...allRoutes.map((route)=>blockKUICommand(route,commandTree))])
}