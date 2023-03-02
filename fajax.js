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
    this.method = method;
    this.url = url;
    this.data = data;
    this.itemName = itemName;
  }

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
  }
}
