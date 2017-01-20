'use strict';

import fetch from 'node-fetch'

const fetchInit = {cache: 'default', redirect: 'follow'}

const World = function() {
  this.fetch = fetch
  this.fetchInit = fetchInit
}


export default function() {
  this.World = World
}
