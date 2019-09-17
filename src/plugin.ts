 /*******************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2019. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 *******************************************************************************/

import { CommandRegistrar,EvaluatorArgs } from '@kui-shell/core/models/command'
import {dispatchToShell} from '@kui-shell/plugin-bash-like/lib/cmds/catchall'

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

const blockKUICommand = async (route: string,commandTree: CommandRegistrar)=>{
  // using listen->find->listen to block
  commandTree.listen(route,() => {
    return Promise.reject('Command is disabled')
  },{noAuthOk: true,inBrowserOk: true}) 
  await commandTree.find(route)

  commandTree.listen(route,() => {
    return Promise.reject('Command is disabled')
  },{noAuthOk: true,inBrowserOk: true})
}

const rewriteLSCommand = async (commandTree: CommandRegistrar)=>{
  // using listen->find->listen to block
  const route='/ls'
  commandTree.listen(route,() => {
    return Promise.reject('Command is disabled')
  },{noAuthOk: true,inBrowserOk: true}) 
  await commandTree.find(route)
  commandTree.listen(route,(opts: EvaluatorArgs) => {
    debug('ls dispatch to shell')
    return dispatchToShell(opts)
  },{noAuthOk: true,inBrowserOk: true})
}

const rewriteExecCommand = async (commandTree: CommandRegistrar)=>{
  // using listen->find->listen to block
  const route='/!'
  commandTree.listen(route,() => {
    return Promise.reject('Command is disabled')
  },{noAuthOk: true,inBrowserOk: true}) 
  await commandTree.find(route)
  commandTree.listen(route,(opts: EvaluatorArgs) => {
    debug('! dispatch to shell')
    return dispatchToShell(opts)
  },{noAuthOk: true,inBrowserOk: true})
}

export default async (commandTree: CommandRegistrar) => {
  const allRoutes =  [...bashLikeRoutes,...k8sRoutes,...coreSupportRoutes]
  return Promise.all([rewriteExecCommand(commandTree),rewriteLSCommand(commandTree),rewriteLSCommand(commandTree),...allRoutes.map((route)=>blockKUICommand(route,commandTree))])
}