export const addOrFilterItem = (arr,id,itemLocalStorage) =>{
    let newArr = arr.includes(id)
        ? arr.filter((itemId) => itemId !== id)
        : [...arr, id]
    localStorage.setItem(itemLocalStorage, JSON.stringify(newArr))
   return newArr
}