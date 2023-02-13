class Server {
  constructor() {
    this.db = new DB();
  }
  generalSortFunc(method, itemName = null, data = null) {
    if (method == "GET") {
      get(itemName);
    }
    if (method == "GETALL") {
      getAll();
    }
    if (method == "PUT") {
      put(itemName, data);
    }
    if (method == "POST") {
      this.post(itemName, data);
    }
    if (method == "DELETE") {
      deletee(itemName);
    }
  }
  get(itemName) {
    this.db.get(itemName);
  }
  getAll() {
    this.db.getAll();
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
