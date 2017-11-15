$(function() {
    
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

        var all_customer_num = $("#all-customer");
        var waiting_q_num = $("#waiting-Q");
        var waiting_o_num = $("#waiting-O");
        var want_to_order = $("#want-to-order");
        var today_customer = $("#today-customer");

        var order_list = $("#order-list");
        var queue_list = $("#queue-list");
    
        var esp1_offline = 0;
        var esp2_offline = 0;
        var esp3_offline = 0;

        var waiting_queue = [];
        var order_queue = [];

        var o_timestamp = [];
        var q_timestamp = [];

        var availible_node = [];
        var in_ordering_node = [];

        var all_customer = 0;

        var max_availible_order = 1;
    
        
    
        // Update 
        var update = function () {
            if(waiting_queue.length!=0 && in_ordering_node.length < max_availible_order){
                var toEnq = deqQ();
                // var toEnq = waiting_queue[0];
                in_ordering_node.push(toEnq);
                publish("readyQ", "Restaurant/"+toEnq, 2, true);
            }

            all_customer_num.text(availible_node);
            waiting_o_num.text(order_queue.length);
            waiting_q_num.text(waiting_queue.length);
            want_to_order.text(in_ordering_node.length)
            today_customer.text(all_customer);
            

            // publish("Q"+order_queue, "Restaurant/q", 2, true);
            if(availible_node.length > 0){
                availible_node.forEach(function (node){
                    var is_in_q = waiting_queue.indexOf(node);
                    var in_O = order_queue.indexOf(node);
                    if(is_in_q > -1){
            //             // alert("is on q "+is_in_q);
                        publish(""+is_in_q, "Restaurant/"+node, 2, true);
                    }else if(in_O > -1){
            //             // alert("in o "+in_O);
                        
            //             // if(in_O == 0){
                        publish(""+in_O, "Restaurant/"+node, 2, true);
            //             // }else{
            //             //     publish(in_O+1, "Restaurant/"+node, 2, true);
            //             // }
                        // publish(in_O, "Restaurant/"+node, 2, true);
                        // publish("HELP"+in_O, "Restaurant/"+node, 2, true);
                    }
            // publish("HELP"+is_in_q, "Restaurant/"+node, 2, true);
                });
            
            }

            updateQueue();
            updateOrder();
            updateStatus();
            

            // offline_check();

        }

        var getTime = function (){
            var currentdate = new Date(); 
            var datetime = ""   
            + pad(currentdate.getHours(), 2) + ":"  
            + pad(currentdate.getMinutes(), 2) + ":" 
            + pad(currentdate.getSeconds(), 2);
            return datetime;
        }
        
        var pad = function (n, width, z) {
            z = z || '0';
            n = n + '';
            return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
        }

        var updateOrder = function (){
            var tmp = 0;
            document.getElementById("order-list").innerHTML = "";
            order_queue.forEach(function(order) {
                document.getElementById("order-list").innerHTML += "<a href=\"#\" class=\"list-group-item\"><i class=\"fa fa-shopping-cart fa-fw\"></i> Client "+ order +"<span class=\"pull-right text-muted small\"><em>Ordered on "+ o_timestamp[tmp] +"</em></span></a>";
                tmp++;
            });
        }

        var updateQueue = function (){
            var tmp = 0;
            document.getElementById("queue-list").innerHTML = "";
            waiting_queue.forEach(function(queue) {
                document.getElementById("queue-list").innerHTML += "<a href=\"#\" class=\"list-group-item\"><i class=\"fa fa-comment fa-fw\"></i> Client "+ queue +"<span class=\"pull-right text-muted small\"><em>Queued on "+ q_timestamp[tmp] +"</em></span></a>";
                tmp++;
            });
        }

        var updateStatus = function (){
            var tmp = 0;
            document.getElementById("node-status").innerHTML = "";
            availible_node.forEach(function(entry) {
                document.getElementById("node-status").innerHTML += nodeStatus(entry);
            });
        }

        var nodeStatus = function (entry){
            var status;
            var bgColor;
            if(waiting_queue.indexOf(entry) != -1){
                status = "InQueue";
                bgColor = "#c1935b";
            }else if(order_queue.indexOf(entry) != -1){
                status = "Ordering";
                bgColor = "#4da886";
            }else{
                status = "Ready";
                bgColor = "#59964f";
            }
            return "<li class=\"list-group-item justify-content-between\">Node "+ entry +"<span class=\"badge badge-default badge-pill\" id=\"esp"+ entry +"-statusC\" style=\"background-color:"+ bgColor +"\"><div id=\"esp3-status\">"+ status +"</div></span></li>";
        }

        var clickToClear = function (order){
            deqO(order);
            publish("deqOK", "Restaurant/"+order, 2, true);
        }
    
        // Boker info
        // var hostname = "broker.mqttdashboard.com";
        var hostname = "broker.mqtt-cpe.ml";
        var port = 9001;
        var clientid = "cpe24-projectG2-"+parseInt(Math.random() * 100000, 16);
    
        var ESP1_PING_TOPIC = "Restaurant/1/ping";
        var ESP2_PING_TOPIC = "Restaurant/2/ping";
        var ESP3_PING_TOPIC = "Restaurant/3/ping";

        var ESP1_request = "Restaurant/1/req";
        var ESP2_request = "Restaurant/2/req";
        var ESP3_request = "Restaurant/3/req";

        var ESP1_qup = "Restaurant/1";
        var ESP2_qup = "Restaurant/2";
        var ESP3_qup = "Restaurant/3";

        var all_subscribe = "Restaurant/#";
    
    
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
                // client.subscribe(ESP1_PING_TOPIC, {qos: 2});
                // client.subscribe(ESP2_PING_TOPIC, {qos: 2});
                // client.subscribe(ESP3_PING_TOPIC, {qos: 2});

                // client.subscribe(all_subscribe, {qos : 2});

                // client.subscribe(ESP1_request, {qos : 2});
                // client.subscribe(ESP2_request, {qos : 2});
                // client.subscribe(ESP3_request, {qos : 2});

                client.subscribe("Restaurant/+/req", {qos : 2});
    
                // Set default ping message
                // publish("0", ESP1_PING_TOPIC, 2, true);
                // publish("0", ESP2_PING_TOPIC, 2, true);
                // publish("0", ESP3_PING_TOPIC, 2, true);
            },
    
            //Gets Called if the connection could not be established
            onFailure: function (message) {
                console.log("Connection failed: " + message.errorMessage);
                mqtt_status.text("ERROR");
            }
    
        };
         
        //Attempt to connect
        client.connect(options);
    
    
        // Handle incomming subscibed Message from broker
        client.onMessageArrived = function (message) {
            var topic = message.destinationName;
            var payload = message.payloadString;

            var target = topic.split("/")[1];
    
            console.log('Topic: ' + topic + '  | ' + payload);
    
            
            // goOnline(target);
    
            if(topic.split("/")[2] == "req"){
                if(payload == "reqQa"){
                    // alert(payload);
                    enqQ(target);
                }else if(payload == "reqO"){
                    enqO(target);
                    // publish("reqOK", "Restaurant/"+target, 2, true);
                }else if(payload == "deqO"){
                    deqO(target);
                    // publish("deqOK", "Restaurant/"+target, 2, true);
                }else if(payload == "deqQ"){
                    deqQ();
                    // publish("deqOK", "Restaurant/"+target, 2, true);
                }else if(payload == "sleep"){
                    sleep(target);
                }
            }
            update();
        };
    
        var goOnline = function (node){
            document.getElementById("esp"+node+"-statusC").style.backgroundColor = "#72c17d";
            esp1_status.text("Online");
            esp1_icon.removeClass("fa-close");
            esp1_icon.addClass("fa-check");
            esp1_panel.removeClass("panel-danger");
            esp1_panel.addClass("panel-primary");
            esp1_offline = 0;
        }

        var enqQ = function (i) {
            var index_find = availible_node.indexOf(i);
            if(index_find == -1){
                waiting_queue.push(i);
                availible_node.push(i);
                q_timestamp.push(getTime());
                all_customer++;
            }
        }
        var deqQ = function () {
            q_timestamp.shift();
            return waiting_queue.shift();
        }

        var enqO = function (i) {
            if(order_queue.length != 0){
                var last_element = order_queue.pop();
                order_queue.push(last_element);
                if(last_element != i){
                    order_queue.push(i);
                    o_timestamp.push(getTime());
                }
            }else{
                order_queue.push(i);
                o_timestamp.push(getTime());
            }
            // var index_find = in_ordering_node.indexOf(i);
            // if(index_find == -1){
            //     in_ordering_node.push(i);
            // }
        }
        var deqO = function (i) {
            var deq_index = order_queue.indexOf(i);
            if(deq_index > -1){
                order_queue.splice(deq_index, 1);
                o_timestamp.splice(deq_index, 1);
            }
        }

        var sleep = function (i){
            var index_to_remove = availible_node.indexOf(i);
            var index_find = in_ordering_node.indexOf(i);
            if (index_to_remove > -1) {
                availible_node.splice(index_to_remove, 1);
            }
            if(index_find > -1){
                in_ordering_node.splice(index_find, 1);
            }
        }

        //Creates a new Messaging.Message Object and sends it to the HiveMQ MQTT Broker
        var publish = function (payload, topic, qos=2, retained=false) {
            var message = new Messaging.Message(payload);
            message.destinationName = topic;
            message.qos = qos;
            message.retained = retained;
            client.send(message);
        }
    
        var offline_check = function() {
            var offlineTime = 10;
            esp1_offline++;
            esp2_offline++;
            esp3_offline++;



            if(esp1_offline>offlineTime){
                esp1_status.text("Offline");
                esp1_icon.addClass("fa-close");
                esp1_icon.removeClass("fa-check");
                esp1_panel.addClass("panel-danger");
                esp1_panel.removeClass("panel-primary");
                document.getElementById("esp1-statusC").style.backgroundColor = "#ad3030";
                console.log("ESP1: Go Offline");
            }
            if(esp2_offline>offlineTime){
                esp2_status.text("Offline");
                esp2_icon.addClass("fa-close");
                esp2_icon.removeClass("fa-check");
                esp2_panel.addClass("panel-danger");
                esp2_panel.removeClass("panel-primary");
                document.getElementById("esp2-statusC").style.backgroundColor = "#ad3030";
                console.log("ESP2: Go Offline");
            }
            if(esp3_offline>offlineTime){
                document.getElementById("esp3-statusC").style.backgroundColor = "#ad3030";
                esp3_status.text("Offline");
                esp3_icon.addClass("fa-close");
                esp3_icon.removeClass("fa-check");
                esp3_panel.addClass("panel-danger");
                esp3_panel.removeClass("panel-primary");
                console.log("ESP3: Go Offline");
            }
        };

        var statusUpdate = function (){

        }
    
        // setInterval(offline_check, 1000);
        // setInterval(update, 1000);

    
    });