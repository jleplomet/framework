
import Thread from './thread';

const NAMESPACE = '[lib/utils/async]';
const thread = new Thread
const asyncThreadMethods = {
  async_background(block_id, args) {
    // it is up to the block to return params... or not.
    var params = self[block_id].apply(null, args);

    self.emit(`async_background_complete_${block_id}`, params);
  }
}
thread.extend(asyncThreadMethods);

/**
 * Utility to fire a closure on a background thread.
 *
 * Example
 *
 * import {async_background} from 'js/lib/utils/dispatch';
 *
 * async_background((a, b, c) => {
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
export function async_background(block, ...args ) {
  console.log(NAMESPACE, 'async_background');

  return new Promise(resolve => {
    // store the block_id reference so we dont lose track of the block
    // this will help when mutliple async_background calls are running.
    const block_id = `block_${performance.now()}`;

    // since this is a one time dispatch, we need to upload the block to the service
    // worker so we can call it. When completed, we will remove it.
    thread.extend({[block_id]: block});

    // when complete, we will call the complete block. This block is not handled
    // by the worker so we dont need to worry about uploading to the worker.
    thread.on(`async_background_complete_${block_id}`, params => {
      thread.remove(block_id);

      thread.off(`async_background_complete_${block_id}`);

      resolve(params);
    });

    thread.execute('async_background', block_id, args);
  })
}
