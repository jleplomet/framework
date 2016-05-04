
export function lazy(loader) {
  return (location, cb) => {
    loader(Mod => {
      cb(null, Mod.default)
    })
  }
}
