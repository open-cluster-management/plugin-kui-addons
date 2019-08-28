 /*******************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2019. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 *******************************************************************************/

import { CommandRegistrar } from '@kui-shell/core/models/command'
import  {qexec}  from '@kui-shell/core/core/repl'


const redirectHelp = async (commandTree: CommandRegistrar)=> {
  commandTree.listen('/help',() => {
    return Promise.reject('Command is disabled')
  },{noAuthOk: true,inBrowserOk: true}) 

  await commandTree.find('/help')

  commandTree.listen('/help', async () => {
    return qexec('getting started')
  },{noAuthOk: true,inBrowserOk: true})

}

export default async (commandTree: CommandRegistrar) => {
  return Promise.all([redirectHelp(commandTree)])
}