 /*******************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2019. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 *******************************************************************************/

import { Commands } from '@kui-shell/core'
import  { REPL }  from '@kui-shell/core'


const redirectHelp = async (commandTree: Commands.Registrar)=> {
  commandTree.listen('/help',() => {
    return Promise.reject('Command is disabled')
  },{noAuthOk: true,inBrowserOk: true}) 

  await commandTree.find('/help')

  commandTree.listen('/help', async () => {
    return REPL.qexec('getting started')
  },{noAuthOk: true,inBrowserOk: true})

}

export default async (commandTree: Commands.Registrar) => {
  return Promise.all([redirectHelp(commandTree)])
}