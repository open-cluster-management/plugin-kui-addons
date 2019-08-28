 /*******************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2019. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 *******************************************************************************/

import { CommandRegistrar } from '@kui-shell/core/models/command'

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

export default async (commandTree: CommandRegistrar) => {
  const allRoutes =  [...bashLikeRoutes,...k8sRoutes,...coreSupportRoutes]
  return Promise.all([...allRoutes.map((route)=>blockKUICommand(route,commandTree))])
}