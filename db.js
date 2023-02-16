class DB {
  constructor() {}
  get(itemName) {
    return localStorage.getItem(itemName);
  }
  getAll() {}
  put(itemName, data) {
    localStorage.setItem(itemName, data);
  }
  post(itemName, data) {
    localStorage.setItem(itemName, data);
  }
  deletee(itemName) {
    localStorage.removeItem(itemName);
  }
}
