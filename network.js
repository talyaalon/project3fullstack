class Network {
  constructor() {
    this.server = new Server();
  }
  sendData(method, itemName, data) {
    this.server.generalSortFunc(method, itemName, data);
  }
}
