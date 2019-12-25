---
layout: post
published: true
title:  "Building An Activity Monitor with Circuit Playground Express"
date: 2019-12-22
categories: [electronics]
tags: [hardware, circuitpython, circuit playground express]
excerpt: The Circuit Playground Express offers a number of built-in sensors, an accelerometer, LEDs, and buttons. You can do a lot with just the microcontroller itself ...

---

## Introduction

Earlier this year, the Chicago Python Meetup Group held a workshop on CircuitPython. I entered an idea to build an activity monitor for the workshop and was selected to participate and received a Circuit Playground Express.

<img src="{{site.url}}/assets/dist/images/blog/activity-monitor/tweet.jpg" alt="idea for activity monitor" />

The Circuit Playground Express offers a number of built-in sensors, an accelerometer, LEDs, and buttons. You can do a lot with just the microcontroller itself and I found it much easier to work with than the Arduino. There are also various ways to code it (MakeCode, CircuitPython, Arduino, Code.org’s CS Discoveries), for this project I used CircuitPython. I learned a lot about electronics and coding for electronics and wanted to briefly show the activity monitor.

## Demonstration
<iframe width="100%" height="270" src="https://www.youtube.com/embed/pb1g1a4TTLI" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Bill of Materials
<img src="{{site.url}}/assets/dist/images/blog/activity-monitor/bill of materials.jpg" alt="activity monitor bill of materials" />

## Schematics
<img src="{{site.url}}/assets/dist/images/blog/activity-monitor/schematic.jpg" alt="schematic bill of materials" />

## The Code
The code is posted on Github. [https://github.com/smithsa/activity-monitor](https://github.com/smithsa/activity-monitor)

``` python
import time
import adafruit_hcsr04
import board
from adafruit_circuitplayground.express import cpx

BLACK = (0, 0, 0)
ALERT_COLORS = [(180, 0, 0), (255, 0, 100), (180, 0, 255)]
ALERT_CYCLE_DELAY = .05
REPEAT_ALERT_AUDIO = False

sonar = adafruit_hcsr04.HCSR04(trigger_pin=board.A2, echo_pin=board.A1)
alert_triggered = False
alert_muted_status = False

seconds_counter = 0
sensor_reads = 5 # will get 5 readings from sonar and take the average
sensor_read_interval = 30  # every 30 seconds I will get a reading on how far a user is away
sensor_read_count = 0
aggregated_sensor_data = []
should_read_sensor = False
seating_threshold = 50
movement_check_interval = 3600 # every hour check to alert user to moves
user_outside_seating_threshold_count = 0
min_amount_of_times_away = 4
times_to_play_alert = 10
seconds_break_after_alert = 120

def cycle_lights(color):
    for i in range(len(cpx.pixels)):
        cpx.pixels[i] = color
        time.sleep(ALERT_CYCLE_DELAY)

def dectect_distance(sonar):
    try:
        return sonar.distance
    except RuntimeError:
        print("Retrying!")

    return 0

def alert(is_muted = False):
    global alert_triggered
    if REPEAT_ALERT_AUDIO:
        cpx.play_file("alert.wav")
    elif is_muted == False and alert_triggered == False:
        cpx.play_file("alert.wav")

    for alertColor in ALERT_COLORS:
        cycle_lights(alertColor)
    cycle_lights(BLACK)

    alert_triggered = True

def reset_sensor_data():
    global sensor_read_count
    global should_read_sensor
    global aggregated_sensor_data
    sensor_read_count = 0
    should_read_sensor =  False
    aggregated_sensor_data = []

def reset_movement_check_data():
    global user_outside_seating_threshold_count
    global seconds_counter
    global alert_triggered
    user_outside_seating_threshold_count = 0
    seconds_counter = 0
    alert_triggered = False

while True:
    time.sleep(1)
    seconds_counter = seconds_counter + 1
    if seconds_counter % sensor_read_interval == 0:
        should_read_sensor = True

    if should_read_sensor and sensor_read_count <= sensor_reads:
        aggregated_sensor_data.append(dectect_distance(sonar))
        sensor_read_count += 1

    if sensor_read_count == sensor_reads:
        average_distance = sum(aggregated_sensor_data)/sensor_reads
        if average_distance > seating_threshold:
            user_outside_seating_threshold_count = user_outside_seating_threshold_count + 1
        reset_sensor_data()

    if seconds_counter == movement_check_interval:
        if user_outside_seating_threshold_count < min_amount_of_times_away:
            for _ in range(times_to_play_alert):
                alert(alert_muted_status)

        reset_movement_check_data()
        reset_sensor_data()
        time.sleep(seconds_break_after_alert)

    print("seconds_counter:", seconds_counter)
    print("should_read_sensor:",should_read_sensor)
    print("sensor_read_count:", sensor_read_count)
    print("aggregated_sensor_data:", aggregated_sensor_data)
```