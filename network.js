class Network {
  constructor() {
    //this.server = new Server();
  }
  sendData(method, itemName, data) {
    let server = new Server();
    let result = server.generalSortFunc(method, itemName, data);
    if (result != null) {
      return result;
    }
  }
}
