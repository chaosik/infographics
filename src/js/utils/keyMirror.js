function keyMirror(object) {
  for (var key in object) {
    object[key] = key;
  }
  return object;
}

module.exports = keyMirror;