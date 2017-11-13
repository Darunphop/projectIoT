import ubinascii,umqtt.simple as MQTTClient,time,oled,math
from machine import ADC,unique_id

CLIENT_ID = ubinascii.hexlify(unique_id())
mqtt = MQTTClient.MQTTClient(CLIENT_ID,"broker.mqtt-cpe.ml",user="None",password="None")

def onmessage(topic, message):
  global state
  global queueQ
  global queueO
  message=message.decode("ascii")
  try:
    message=int(message)
  except ValueError:
    pass
  if state == 1:
    queueQ = message
    oled.clear()
    oled.text(str('YOUR QUEUE IS : '),0,0)
    oled.text(str(queueQ),0,8)
    send_queue(queueQ)
    if queueQ == 0:
        state = 2
  if state == 2:
    while state != 3:
        oled.clear()
        oled.text(str('YOUR QUEUE IS READY.'),0,0)
        oled.text(str('READY.'),0,8)
        oled.text(str('PLEASE PRESS'),0,16)
        oled.text(str('THE BUTTON.'),0,24)
        if check_state() == 1:
            mqtt.publish('restaurant/0',str('dequeue'),retain=True)
            state = 3
        # oled.text(str(check_state()),0,16)
        # oled.text(str(state),0,24)
        time.sleep_ms(1)

  if state == 3:
#    while state != 4:
    while state == 3:
        oled.clear()
        oled.text(str('PRESS BUTTON TO'),0,0)
        oled.text(str('ORDER.'),0,8)
        if (check_state() == 1 and check_alive() != 1):
            mqtt.publish('restaurant/1',str('reqO'),retain=True)
            state = 4
        else:
            if (check_state() == 0 and check_alive() == 1):
                mqtt.publish('restaurant/1',str('Out'),retain=True)
                state = 6
        time.sleep_ms(2)
  if state == 4:
    oled.clear()
    oled.text(str('YOUR QUEUE IS : '),0,0)
    oled.text(str(message),0,8)
    send_queue(message)
    if message == 0:
        state = 5
  if state == 5:
    oled.clear()
    oled.text(str('THANK YOU'),0,0)
    oled.text(str('FOR WAITING'),0,8)
    time.sleep_ms(200)
    state = 3
    mqtt.publish('restaurant/1',str('reset'),retain=True)
  if state == 6:
	while check_alive() != 1:
        oled.clear()
		oled.text(str('Press Bottom'),0,0)
		oled.text(str('To Start'),0,8)
		mqtt.publish('restaurant/1',str('I am Alive'),retain=True)
	mqtt.publish('restaurant/1',str('I am Ready'),retain=True)
	state = 1

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
    # if (ADC(0).read()) >= 500:
    #     check = 1
    # else
    #     check = 0
    return 1 if state_has_changed("((ADC(0).read()) >= 500)", ((ADC(0).read()) >= 500)) else 0

def check_alive():
	return 1 if state_has_changed("(((ADC(0).read()) >= 160) and ((ADC(0).read()) <= 180))", (((ADC(0).read()) >= 160) and ((ADC(0).read()) <= 180))) else 0


queueQ = None
queueO = None
state = 0
message = None


def send_queue(q):
    # mqtt.connect()
    mqtt.publish('restaurant/0',str(q),retain=True)
    # time.sleep_ms(100)
    # mqtt.disconnect()



def main():
  global state
  oled.clear()
  oled.text(str('WELCOME.'),0,0)
  oled.text(str('PRESS BUTTON'),0,8)
  oled.text(str('GET QUEUE.'),0,16)
  while state == 0:
    if state_has_changed("((ADC(0).read()) >= 500)", ((ADC(0).read()) >= 500)):
      mqtt.connect()
      mqtt.publish('restaurant/1',str('reqQ'),retain=True)
      time.sleep_ms(100)
      mqtt.disconnect()
      state = 1


  mqtt.set_callback(onmessage)
  mqtt.connect()
  mqtt.subscribe(b'restaurant/1')
  while True:
    if True:
      mqtt.wait_msg()
    else:
      mqtt.check_msg()
