class DB {
  constructor() {}
  get(itemName) {
    return localStorage.getItem(itemName);
  }
  getAll() {
    var values = [],
      keys = Object.keys(localStorage),
      i = keys.length;
    console.log(keys);
    //keys.removeItem("currentUserVar");
    const idxObj = keys.findIndex((object) => {
      return object == "currentUserVar";
    });

    keys.splice(idxObj, 1);
    console.log(keys);
    while (i--) {
      var data = JSON.parse(localStorage.getItem(keys[i]));
      if (data != null) values.push(data);
    }

    return values;
  }
  put(itemName, data) {
    localStorage.setItem(itemName, data);
  }
  post(itemName, data) {
    localStorage.setItem(itemName, data);
  }
  deletee(itemName) {
    localStorage.removeItem(itemName);
  }
}
