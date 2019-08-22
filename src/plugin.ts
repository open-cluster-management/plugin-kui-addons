/*
 * Copyright 2018 IBM Corporation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { CommandRegistrar } from '@kui-shell/core/models/command'
import { repl } from '@kui-shell/core/core/repl'

const bashLikeRoutes = ['/git/status','/git/diff'];
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

const redirectHelp = async (commandTree: CommandRegistrar)=> {
  commandTree.listen('help',() => {
    return Promise.reject('Command is disabled')
  },{noAuthOk: true,inBrowserOk: true}) 

  await commandTree.find('help')

  commandTree.listen('help', async () => {
    return await repl.qexec('getting started')
  },{noAuthOk: true,inBrowserOk: true})
}

export default async (commandTree: CommandRegistrar) => {
  const allRoutes =  [...bashLikeRoutes,...k8sRoutes,...coreSupportRoutes]
  return Promise.all([...allRoutes.map((route)=>blockKUICommand(route,commandTree)), redirectHelp(commandTree)])
}