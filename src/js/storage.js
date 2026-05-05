export function saveToLocalStorage(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.log(error);
  }
}

export function getFromLocalStorage(key) {
  try {
    const data = JSON.parse(localStorage.getItem(key));
    return data !== null ? data : null;
  } catch (error) {
    console.log(error);
  }
}
