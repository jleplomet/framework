
import Thread from './thread';

const NAMESPACE = '[lib/utils/dispatch]';
const thread = new Thread
const dispatchThreadMethods = {
  dispatch_async(block_id, args) {
    // it is up to the block to return params... or not.
    var params = self[block_id].apply(null, args);

    self.emit(`dispatch_async_complete_${block_id}`, params);
  }
}
thread.extend(dispatchThreadMethods);

let _dispatch = [];

/**
 * Utility to fire a closure on a background thread.
 *
 * Example
 *
 * import {dispatch_async} from 'js/lib/utils/dispatch';
 *
 * dispatch_async((a, b, c) => {
 *   // service worker context
 *   // https://developer.mozilla.org/en-US/docs/Web/API/DedicatedWorkerGlobalScope
 *   return a * b * c
 * }, 2, 4, 6); // 48
 *   .then(results => console.log(results))
 *
 * @param  {function} block    A closure that will run on the web worker.
 *                             Web worker context is assumed. Do not reference
 *                             any variables or functions in this closure.
 * @param  {arguments} args    Comma seperated list of parameters that will be
 *                             passed to the closure as function parameters.                              
 * @return {Promise}           Resolve Promise when complete
 */
export function dispatch_async(block, ...args ) {
  console.log(NAMESPACE, 'dispatch_async');

  return new Promise(resolve => {
    // store the block_id reference so we dont lose track of the block
    // this will help when mutliple dispatch_async calls are running.
    const block_id = `block_${performance.now()}`;

    // since this is a one time dispatch, we need to upload the block to the service
    // worker so we can call it. When completed, we will remove it.
    thread.extend({[block_id]: block});

    // when complete, we will call the complete block. This block is not handled
    // by the worker so we dont need to worry about uploading to the worker.
    thread.on(`dispatch_async_complete_${block_id}`, params => {
      thread.remove(block_id);

      thread.off(`dispatch_async_complete_${block_id}`);

      resolve(params);
    });

    thread.execute('dispatch_async', block_id, args);
  })
}
