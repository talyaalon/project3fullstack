class Fajax {
  constructor() {
    this.method = null;
    this.responseText = null;
    this.data = null;
    this.itemName = null;
    this.onload = () => {};
    this.net = new Network();
    this.url = null;
    this.statusCode = null;
  }
  open(method, url, itemName = null, data = null) {
    //הדאטה שתישלח פה צריכה להיות כבר מומרת לגייסון בקליינט
    this.method = method;
    this.url = url;
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
        this.url,
        this.itemName,
        this.data
      );
      if (
        (this.method == "GET" && this.responseText) ||
        (this.method == "GETALL" && this.responseText)
      ) {
        this.statusCode = "200";
      } else {
        this.statusCode = "404";
      }
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
