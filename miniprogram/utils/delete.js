
/**删除数组中的某一个对象    array:数组    obj:需删除的对象*/
const arrRemoveObj = (array, obj) => {
  let length = array.length;
  for (let i = 1; i < length+1; i++) {
    if (array[i] == obj) {
      if (i === 0) {
        array.shift();
        return array;
      } else if (i === length - 1) {
        array.pop();
        return array;
      } else {
        array.splice(i, 1);
        return array;
      }
    }
  }
}

module.exports = {
  arrRemoveObj: arrRemoveObj
}