import { DB_STORE_NAME, getDb, getObjectStore } from './db'
import { wrapDataFailed, wrapDataSuccess } from './helper'

function hubsByHubTime(key, range) {
  const store = getObjectStore(DB_STORE_NAME, 'readonly')
  const index = store.index(key)
  const req = index.getAll(range)
  const db = getDb()
  return new Promise((resolve, reject) => {
    if (!db) {
      /**
       * don't exist database
       * happen case when function fired before openDB success
       */

      reject(wrapDataFailed([]))
      return
    }
    req.onsuccess = function () {
      console.log('req.onsuccess: ', { range, result: req.result })
      resolve(wrapDataSuccess(req.result))
    }
    req.onerror = function () {
      console.log('req.onerror: ')
      reject(wrapDataFailed([]))
    }
  })
}

function hubById(key, hubId) {
  const store = getObjectStore(DB_STORE_NAME, 'readonly')
  const index = store.index(key)
  const req = index.get(hubId)
  const db = getDb()
  return new Promise((resolve, reject) => {
    if (!db) {
      /**
       * don't exist database
       * happen case when function fired before openDB success
       */

      reject(wrapDataFailed([]))
      return
    }
    req.onsuccess = function () {
      console.log('req.onsuccess: ', req.result)
      resolve(wrapDataSuccess(req.result))
    }
    req.onerror = function () {
      console.log('req.onerror: ')
      reject(wrapDataFailed(null))
    }
  })
}

export function selectHubsByHubTime(hubTime) {
  return hubsByHubTime('hubTime', IDBKeyRange.only(hubTime))
}

export function selectHubsByRangeTime(start, end) {
  return hubsByHubTime('hubTime', IDBKeyRange.bound(start, end))
}

export function selectHubById(hubId) {
  return hubById('id', hubId)
}

export function deleteHubById(hubId, date) {
  const store = getObjectStore(DB_STORE_NAME, 'readwrite')
  const req = store.delete(hubId)
  const db = getDb()
  return new Promise((resolve, reject) => {
    if (!db) {
      /**
       * don't exist database
       * happen case when function fired before openDB success
       */

      reject(wrapDataFailed([]))
      return
    }
    req.onsuccess = function () {
      console.log('req.onsuccess: ', req.result)
      resolve(wrapDataSuccess({ hubId, date }))
    }
    req.onerror = function () {
      console.log('req.onerror: ')
      reject(wrapDataFailed({ hubId, date }))
    }
  })
}
