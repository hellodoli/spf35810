/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  dispatchChangeIsOpenDb,
  dispatchGetHubsByHubTime,
} from 'utils/reduxStore'
import { wrapDataFailed, wrapDataSuccess } from './helper'

const DB_NAME = 'indexeddb-shopee-hub-35810'
const DB_VERSION = 1 // Use a long long for this value (don't use a float)
const DB_STORE_NAME = 'hubs'

var db

// Used to keep track of which view is displayed to avoid uselessly reloading it
var current_view_pub_key

/**
 * @param {string} store_name
 * @param {string} mode either "readonly" or "readwrite"
 */
export function getObjectStore(store_name, mode) {
  var tx = db.transaction(store_name, mode)
  return tx.objectStore(store_name)
}

export function getDb() {
  return db
}

export function openDb() {
  console.log('openDb ...')
  var req = indexedDB.open(DB_NAME, DB_VERSION)
  req.onsuccess = function (evt) {
    // Equal to: db = req.result;
    db = this.result
    console.log('openDb DONE')
    dispatchChangeIsOpenDb(true)
    // find and save exits hub in database to redux
    dispatchGetHubsByHubTime()
  }
  req.onerror = function (evt) {
    console.error('openDb:', evt.target.errorCode)
  }
  req.onupgradeneeded = function (evt) {
    console.log('openDb.onupgradeneeded')
    var store = evt.currentTarget.result.createObjectStore(DB_STORE_NAME, {
      keyPath: 'id',
    })
    store.createIndex('id', 'id', { unique: true })
    store.createIndex('hubType', 'hubType', { unique: false })
    store.createIndex('hubShift', 'hubShift', { unique: false })
    store.createIndex('hubTime', 'hubTime', { unique: false })
    store.createIndex('order', 'order', { unique: false })
    store.createIndex('joins', 'joins', { unique: false })
  }
}

export function addHub({ hub, blob }) {
  return new Promise((resolve, reject) => {
    const obj = { ...hub }
    if (typeof blob != 'undefined') obj.blob = blob

    const store = getObjectStore(DB_STORE_NAME, 'readwrite')
    let req
    // eslint-disable-next-line no-useless-catch
    try {
      req = store.add(obj)
    } catch (e) {
      /*if (e.name == 'DataCloneError')
        displayActionFailure("This engine doesn't know how to clone a Blob, " +
                             "use Firefox");*/
      throw e
    }
    req.onsuccess = function () {
      console.log('Insertion in DB successful')
      //displayActionSuccess();
      //displayPubList(store);
      resolve(wrapDataSuccess([]))
    }
    req.onerror = function () {
      console.error('addHub error', this.error)
      //displayActionFailure(this.error);
      reject(wrapDataFailed([]))
    }
  })
}

export function updateHub({ hub, blob }) {
  return new Promise((resolve, reject) => {
    const obj = { ...hub }
    if (typeof blob != 'undefined') obj.blob = blob

    const store = getObjectStore(DB_STORE_NAME, 'readwrite')
    let req
    // eslint-disable-next-line no-useless-catch
    try {
      req = store.put(obj)
    } catch (e) {
      /*if (e.name == 'DataCloneError')
        displayActionFailure("This engine doesn't know how to clone a Blob, " +
                             "use Firefox");*/
      throw e
    }
    req.onsuccess = function (evt) {
      console.log('Update DB successful', { evt })
      //displayActionSuccess();
      //displayPubList(store);
      resolve(wrapDataSuccess([]))
    }
    req.onerror = function () {
      console.error('updateHub error', this.error)
      //displayActionFailure(this.error);
      reject(wrapDataFailed([]))
    }
  })
}

export { DB_NAME, DB_STORE_NAME, DB_VERSION }
