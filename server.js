class Server {
  constructor() {
    this.db = new DB();
  }
  generalSortFunc(method, url, itemName = null, data = null) {
    if (method == "GET" && url == "https/ourProject/get/" + itemName) {
      return this.get(itemName);
    }
    if (method == "GETALL" && url == "https/ourProject/getall") {
      return this.getAll();
    }
    if (method == "PUT" && url == "https/ourProject/put") {
      this.put(itemName, data);
    }
    if (method == "POST" && url == "https/ourProject/post") {
      this.post(itemName, data);
    }
    if (method == "DELETE" && url == "https/ourProject/delete/" + itemName) {
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
