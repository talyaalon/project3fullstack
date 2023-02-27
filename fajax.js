class Fajax {
  constructor() {
    this.method = null;
    this.responseText = null;
    this.data = null;
    this.itemName = null;
    this.onload = null;
    this.net = new Network();
  }
  open(method, itemName = null, data = null) {
    //הדאטה שתישלח פה צריכה להיות כבר מומרת לגייסון בקליינט
    this.method = method;
    this.data = data;
    this.itemName = itemName;
  }
  //   send(callback) {
  //     setTimeout(() => {
  //       this.responseText = callback(this.method, this.itemName, this.data);
  //       this.onload();
  //       //callback2();
  //       //   user = this.responseText;
  //       //   if (typeof currentUserVar != "undefined") {
  //       //     currentUserVar = JSON.parse(user);
  //       //   }
  //       //   if (typeof data != "undefined") {
  //       //     data = JSON.parse(user);
  //       //   }
  //       //   if (typeof json != "undefined") {
  //       //     json = JSON.stringify(data);
  //       //   }
  //       console.log("hi");
  //     }, 0);

  send() {
    setTimeout(() => {
      this.responseText = this.net.sendData(
        this.method,
        this.itemName,
        this.data
      );
      this.onload();
      console.log("hi");
    }, 0);

    //   send() {
    //     this.responseText = this.net.sendData(
    //       this.method,
    //       this.itemName,
    //       this.data
    //     );
    //     console.log("hi");
    //   }
  }
}
