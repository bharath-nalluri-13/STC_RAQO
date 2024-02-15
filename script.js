var devices = [];

function addDevice() {
    var deviceName = document.getElementById("deviceName").value;
    var macAddress = document.getElementById("macAddress").value;
    devices.push({ deviceName: deviceName, macAddress: macAddress });
    displayDevices();
}

function addAnotherDevice() {
    var deviceName = document.getElementById("deviceName").value;
    var macAddress = document.getElementById("macAddress").value;
    devices.push({ deviceName: deviceName, macAddress: macAddress });
    document.getElementById("deviceName").value = "";
    document.getElementById("macAddress").value = "";
}

function displayDevices() {
    var table = "<table><tr><th>Device Name</th><th>MAC Address</th></tr>";
    for (var i = 0; i < devices.length; i++) {
        table += "<tr><td>" + devices[i].deviceName + "</td><td>" + devices[i].macAddress + "</td></tr>";
    }
    table += "</table>";
    document.getElementById("deviceTable").innerHTML = table;
}

function copyTable() {
    var range = document.createRange();
    range.selectNode(document.getElementById("deviceTable"));
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    document.execCommand("copy");
    window.getSelection().removeAllRanges();
    alert("Table copied to clipboard!");
}
