export const getMergedChannels = async (newArray, oldArray) => {
  // Create a map for quick lookup of oldArray items by tvgId
  const oldArrayMap = new Map();
  oldArray.forEach(item => {
    oldArrayMap.set(item.tvgId, item);
  });

  // Modify newArray by adding the favourite property from oldArray
  const modifiedNewArray = newArray.map(item => {
    if (oldArrayMap.has(item.tvgId)) {
      const oldItem = oldArrayMap.get(item.tvgId);
      if (oldItem.favourite !== undefined) {
        item.favourite = oldItem.favourite;
      }
    }
    return item;
  });

  return modifiedNewArray;
};
