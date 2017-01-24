'use strict';

import fetch from 'node-fetch'

const fetchInit = {cache: 'default', redirect: 'follow'}

const World = function() {
  this.city = process.env['CITY'] || 'Paris';
  this.fetch = fetch
  this.hotelInfoIndex = process.env['HOTEL_INFO_INDEX'];
  this.hotelsCount = process.env['HOTELS_COUNT'];
  this.fetchInit = fetchInit
}


export default function() {
  this.World = World
}
