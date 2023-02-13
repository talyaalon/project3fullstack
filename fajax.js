class Fajax {
  constructor() {
    this.method = null;
    this.responseText = null;
    this.data = null;
    this.itemName = null;
    this.net = new Network();
  }
  open(method, itemName = null, data = null) {
    //הדאטה שתישלח פה צריכה להיות כבר מומרת לגייסון בקליינט
    this.method = method;
    this.data = data;
    this.itemName = itemName;
  }
  send() {
    this.net.sendData(this.method, this.itemName, this.data);
  }
}
