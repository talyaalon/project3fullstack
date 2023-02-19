class Network {
  constructor() {
    this.server = new Server();
  }
  sendData(method, itemName, data) {
    let result = this.server.generalSortFunc(method, itemName, data);
    if (result != null) {
      return result;
    }
  }
}
