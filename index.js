function main()
{
  const http = require('http').createServer();
  console.log("SONO NEL MAIN");

  const ini = require('ini');
  const fs = require('fs');
  const ioclient = require('socket.io-client');

  let centrale = ioclient('http://192.168.0.106:3000');
  let port = 4000;
  
  let machineName = "rokucane"
  const name = 'player-produzione1';
  let infoDebug = {"error-chromiumcrashed": null, "error-pageerror": null, "error-requestfailed": null, "console": ["aaa", "aaaaa"]}

  centrale.on('connect', function () {
    console.log(`connected to central`);
    emitPeriferica();
  });

  function emitPeriferica() {
    console.log("INFODEBUG", infoDebug);
    centrale.emit('periferica', {machineName: machineName, name: name, infoDebug: infoDebug});
  }

  centrale.on('disconnect', function () {
      console.log(`disconnected from central`);
  });

  var deviceInfo = new BSDeviceInfo();
  console.log(deviceInfo);

  http.listen(port, function () {
    console.log(`listening on *:${port}`);
  });
  
  // Configure our HTTP server to respond with Hello World to all requests.
  /*var server = http.createServer(function (request, response) {
    
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.end("Device Information:\n" + device_info.model + "\n" + device_info.bootVersion + "\n");
    var ip = request.connection.remoteAddress;
    document.getElementById("Ip").innerHTML+="Server responded to: "+ ip + "<br>";
    console.log("Server responded to request from " + ip);
  });*/
 
  // Display it on brightsign browser
  var os = require('os');
  var interfaces = os.networkInterfaces();
  var addresses = [];
  for (var k in interfaces) {
      for (var k2 in interfaces[k]) {
          var address = interfaces[k][k2];
          if (address.family === 'IPv4' && !address.internal) {
              addresses.push(address.address);
          }
      }
  }
  var message = "Server running at: " + addresses[0] + ":8000<br>";
  document.getElementById("Ip").innerHTML+= message;
 
  // Print message on console
  console.log("FUORI DAL MAIN");
}

window.main = main;