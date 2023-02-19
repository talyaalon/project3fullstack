class Server {
  constructor() {
    this.db = new DB();
  }
  generalSortFunc(method, itemName = null, data = null) {
    if (method == "GET") {
      return this.get(itemName);
    }
    if (method == "GETALL") {
      return this.getAll();
    }
    if (method == "PUT") {
      this.put(itemName, data);
    }
    if (method == "POST") {
      this.post(itemName, data);
    }
    if (method == "DELETE") {
      this.deletee(itemName);
    }
  }
  get(itemName) {
    return this.db.get(itemName);
  }
  getAll() {
    return this.db.getAll();
  }
  put(itemName, data) {
    this.db.put(itemName, data);
  }
  post(itemName, data) {
    this.db.post(itemName, data);
  }
  deletee(itemName) {
    this.db.deletee(itemName);
  }
}
