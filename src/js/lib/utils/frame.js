
export function nextFrame(_function) {
  // arguments after _function represent function parameters
  const args = new Array(arguments.length - 1);

  if (arguments.length > 1) {
    for (let i = 1, l = arguments.length; i < l; i++) {
      args[i - 1] = arguments[i];
    }
  }

  requestAnimationFrame(() => _function.apply(null, args));
}
