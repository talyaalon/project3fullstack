class DB {
  constructor() {}
  get(itemName) {}
  getAll() {}
  put(itemName, data) {}
  post(itemName, data) {
    localStorage.setItem(itemName, data);
  }
  deletee(itemName) {}
}
