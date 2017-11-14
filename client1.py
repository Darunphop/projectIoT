import ubinascii,umqtt.simple as MQTTClient,time,oled,math
from machine import ADC,unique_id

CLIENT_ID = ubinascii.hexlify(unique_id())
mqtt = MQTTClient.MQTTClient(CLIENT_ID,"broker.mqtt-cpe.ml",user="None",password="None")

def onmessage(topic, message):
    global mqttms
    message=message.decode("ascii")
    mqttms=message
    try:
        message=int(message)
        mqttms = message
    except ValueError:
        pass

ifstate = {}
def state_has_changed(text, boolean):
  current_state = boolean
  global ifstate
  if text not in ifstate:
    ifstate[text] = False
  prev_state = ifstate[text]
  ifstate[text] = current_state
  state_changed = current_state and (current_state != prev_state)
  return state_changed

def check_state():
    return 1 if state_has_changed("((ADC(0).read()) >= 500)", ((ADC(0).read()) >= 500)) else 0

def check_alive():
	return 1 if state_has_changed("(((ADC(0).read()) >= 160) and ((ADC(0).read()) <= 180))", (((ADC(0).read()) >= 160) and ((ADC(0).read()) <= 180))) else 0


queueQ = None
queueO = None
state = 0
mqttms = None





def main():
    global state
    global queueQ
    global queueO
    global mqttms
    Room = 'Restaurant/1/req'
    delay = 1

    mqtt.set_callback(onmessage)
    mqtt.connect()
    mqtt.subscribe(b'Restaurant/1')
    while True:
      if True:
          mqtt.check_msg()
          if state == 0:
              oled.clear()
              oled.text(str('WELCOME.'),0,0)
              oled.text(str('PRESS BUTTON'),0,8)
              oled.text(str('TO GET QUEUE.'),0,16)
              if check_state() == 1:
                  mqtt.publish(Room,str('reqQa'),retain=False)
                  state = 1
                  time.sleep_ms(delay)

          if state == 1:
              queueQ = mqttms
              oled.clear()
              oled.text(str('YOUR QUEUE IS : '),0,0)
              oled.text(str(queueQ),0,8)
              if queueQ == "readyQ":
                  state = 2
                  time.sleep_ms(delay)
          if state == 2:
              while state != 3:
                  oled.clear()
                  oled.text(str('YOUR QUEUE IS READY.'),0,0)
                  oled.text(str('READY.'),0,8)
                  oled.text(str('PLEASE PRESS'),0,16)
                  oled.text(str('THE BUTTON.'),0,24)
                  if check_state() == 1:
                      mqtt.publish(Room,str('deqQ'),retain=False)
                      state = 3
                      time.sleep_ms(delay)

          if state == 3:
              while state == 3:
                  oled.clear()
                  oled.text(str('PRESS BUTTON TO'),0,0)
                  oled.text(str('ORDER.'),0,8)
                  if (check_state() == 1 and check_alive() != 1):
                      mqtt.publish(Room,str('reqO'),retain=False)
                      state = 4
                      time.sleep_ms(delay)
                  elif (check_state() != 1 and check_alive() == 1):
                      mqtt.publish(Room,str('sleep'),retain=False)
                      state = 6
                      time.sleep_ms(delay)

          if state == 4:
              oled.clear()
              oled.text(str('YOUR QUEUE IS : '),0,0)
              oled.text(str(mqttms),0,8)
              if mqttms == 0:
                  state = 5

          if state == 5:
                oled.clear()
                oled.text(str('THANK YOU'),0,0)
                oled.text(str('FOR WAITING'),0,8)
                time.sleep_ms(2000)
                while check_state() != 1:
                    oled.clear()
                    oled.text(str('Press Button'),0,0)
                    oled.text(str('TO ACCEPT ORDER'),0,8)
                mqtt.publish(Room,str('deqO'),retain=False)
                state = 3
          if state == 6:
                while check_state() != 1:
                    oled.clear()
                    oled.text(str('Press Button'),0,0)
                    oled.text(str('To Start'),0,8)
                mqtt.publish(Room,str('reqQ'),retain=False)
                state = 0
    else:
        mqtt.wait_msg()
