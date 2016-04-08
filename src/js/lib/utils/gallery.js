
export function getPrevIndex(currentIndex, indexLength) {
  let _currentIndexCopy = currentIndex;

  _currentIndexCopy--;

  if (_currentIndexCopy < 0) {
    _currentIndexCopy = indexLength - 1;
  }

  return _currentIndexCopy;
}

export function getNextIndex(currentIndex, indexLength) {
  let _currentIndexCopy = currentIndex;

  _currentIndexCopy++;

  if (_currentIndexCopy >= indexLength) {
    _currentIndexCopy = 0;
  }

  return _currentIndexCopy;
}