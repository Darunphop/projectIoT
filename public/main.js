$(function() {{}
    
        var container = $("#live-chart");
    
        var mqtt_icon = $("#mqtt-icon");
        var mqtt_status = $("#mqtt-status");
        var mqtt_panel = $("#mqtt-panel");
    
        var esp1_icon = $("#esp1-icon");
        var esp1_status = $("#esp1-status");
        var esp1_panel = $("#esp1-panel");
    
        var esp2_icon = $("#esp2-icon");
        var esp2_status = $("#esp2-status");
        var esp2_panel = $("#esp2-panel");

        var esp3_icon = $("#esp3-icon");
        var esp3_status = $("#esp3-status");
        var esp3_panel = $("#esp3-panel");
    
    
        // Determine how many data points to keep based on the placeholder's initial size;
        // this gives us a nice high-res plot while avoiding more than one point per pixel.
        var totalPoints = container.outerWidth() / 20 || 100;
        console.log("Chart: max points = "+totalPoints);
    
        var esp1_sensor_data = [];
        var esp2_sensor_data = [];
        var esp3_sensor_data = [];
    
        var esp1_offline = 0;
        var esp2_offline = 0;
        var esp3_offline = 0;
    
    
        // Update Graph
        var update = function () {
            
        }
    
        // Boker info
        // var hostname = "broker.mqttdashboard.com";
        var hostname = "broker.mqtt-cpe.ml";
        var port = 9001;
        var clientid = "cpe24-projectG2-"+parseInt(Math.random() * 100000, 16);
    
        var ESP1_PING_TOPIC = "restaurant/1/ping";
        var ESP2_PING_TOPIC = "restaurant/2/ping";
        var ESP3_PING_TOPIC = "restaurant/3/ping";
    
    
        var client = new Messaging.Client(hostname, port, clientid);
     
        var options = {
    
            //connection attempt timeout in seconds
            timeout: 3,
    
            //Gets Called if the connection has successfully been established
            onSuccess: function () {
                console.log("Connected");
                mqtt_status.text("Connected");
                mqtt_icon.removeClass("fa-close");
                mqtt_icon.addClass("fa-check");
                mqtt_panel.removeClass("panel-danger");
                mqtt_panel.addClass("panel-primary");
    
                // Subscibe TOPIC
                // Ping Pong. Checking esp is alive?
                client.subscribe(ESP1_PING_TOPIC, {qos: 2});
                client.subscribe(ESP2_PING_TOPIC, {qos: 2});
                client.subscribe(ESP3_PING_TOPIC, {qos: 2});
    
                // Set default ping message
                publish("0", ESP1_PING_TOPIC, 2, true);
                publish("0", ESP2_PING_TOPIC, 2, true);
                publish("0", ESP3_PING_TOPIC, 2, true);
            },
    
            //Gets Called if the connection could not be established
            onFailure: function (message) {
                console.log("Connection failed: " + message.errorMessage);
                mqtt_status.text("ERROR");
            },
    
        };
         
        //Attempt to connect
        client.connect(options);
    
    
        // Handle incomming subscibed Message from broker
        client.onMessageArrived = function (message) {
            var topic = message.destinationName;
            var payload = message.payloadString;
    
            console.log('Topic: ' + topic + '  | ' + payload);
    
            
            if(topic == ESP1_PING_TOPIC) {
                if(payload == "iamalive") {
                    if(esp1_offline>3) {
                        console.log("ESP1: Online");
                    }
                    document.getElementById("esp1-statusC").style.backgroundColor = "#72c17d";
                    esp1_status.text("Online");
                    esp1_icon.removeClass("fa-close");
                    esp1_icon.addClass("fa-check");
                    esp1_panel.removeClass("panel-danger");
                    esp1_panel.addClass("panel-primary");
                    esp1_offline = 0;
                }
    
                
            }else if(topic == ESP2_PING_TOPIC) {
                if(payload == "iamalive") {
                    if(esp2_offline>3) {
                        console.log("ESP2: Online");
                    }
                    document.getElementById("esp2-statusC").style.backgroundColor = "#72c17d";
                    esp2_status.text("Online");
                    esp2_icon.removeClass("fa-close");
                    esp2_icon.addClass("fa-check");
                    esp2_panel.removeClass("panel-danger");
                    esp2_panel.addClass("panel-primary");
                    esp2_offline = 0;
                }
                
            }else if(topic == ESP3_PING_TOPIC) {
                if(payload == "iamalive") {
                    if(esp3_offline>3) {
                        console.log("ESP3: Online");
                    }
                    document.getElementById("esp3-statusC").style.backgroundColor = "#72c17d";
                    esp3_status.text("Online");
                    esp3_icon.removeClass("fa-close");
                    esp3_icon.addClass("fa-check");
                    esp3_panel.removeClass("panel-danger");
                    esp3_panel.addClass("panel-primary");
                    esp3_offline = 0;
                }
                
            }
        };
    
        //Creates a new Messaging.Message Object and sends it to the HiveMQ MQTT Broker
        var publish = function (payload, topic, qos=2, retained=false) {
            var message = new Messaging.Message(payload);
            message.destinationName = topic;
            message.qos = qos;
            message.retained = retained;
            client.send(message);
        }
    
        var offline_check = function() {
            esp1_offline++;
            esp2_offline++;
            esp3_offline++;

            if(esp1_offline>3){
                esp1_sensor_data = [];
                esp1_status.text("Offline");
                esp1_icon.addClass("fa-close");
                esp1_icon.removeClass("fa-check");
                esp1_panel.addClass("panel-danger");
                esp1_panel.removeClass("panel-primary");
                document.getElementById("esp1-statusC").style.backgroundColor = "#b94a48";
                console.log("ESP1: Go Offline");
            }
            if(esp2_offline>3){
                esp2_sensor_data = [];
                esp2_status.text("Offline");
                esp2_icon.addClass("fa-close");
                esp2_icon.removeClass("fa-check");
                esp2_panel.addClass("panel-danger");
                esp2_panel.removeClass("panel-primary");
                document.getElementById("esp2-statusC").style.backgroundColor = "#b94a48";
                console.log("ESP2: Go Offline");
            }
            if(esp3_offline>3){
                esp3_sensor_data = [];
                document.getElementById("esp3-statusC").style.backgroundColor = "#b94a48";
                esp3_status.text("Offline");
                esp3_icon.addClass("fa-close");
                esp3_icon.removeClass("fa-check");
                esp3_panel.addClass("panel-danger");
                esp3_panel.removeClass("panel-primary");
                console.log("ESP3: Go Offline");
            }
        };
    
        setInterval(offline_check, 1000);
    
    });