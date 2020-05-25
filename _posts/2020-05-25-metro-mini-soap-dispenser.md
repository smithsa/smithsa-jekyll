---
layout: post
published: true
title:  "Metro Mini Soap Dispenser Timer"
date: 2020-05-25
categories: [electronics]
tags: [hardware, arduino, metromini, makershare]
feature_img: /assets/dist/images/blog/soap-dispenser/thumbnail.jpg
feature_img_alt: Metro Mini Soap Dispenser Timer
excerpt: Centers for Disease Control recommends that individuals frequently wash their hands for at least 20 seconds to protect against the virus and other pathogens. I’ve come to learn that 20 seconds feels a lot longer ...
---
## Introduction

Since the outbreak of the 2019 Novel Coronavirus, it is now common knowledge that the Centers for Disease Control recommends that individuals frequently wash their hands for at least 20 seconds to protect against the virus and other pathogens. I’ve come to learn that 20 seconds feels a lot longer than you would imagine. The advice has been to sing the “Happy Birthday” or the ABC song twice, I’ve opted for the ABC, but after a while it’s become an annoying affair. Especially if I am in the process of talking to someone or thinking while I’m washing my hands. I figured that it would be a good small household problem to solve and an opportunity to learn more about electronics.


## Constraints

There were two constraints I gave myself for this project. The first pertaining to the budget. After spending more than I wanted this year on electronic parts, I wanted to rely on components I already had and didn’t want to accumulate more parts. The other constraint was that I wanted the final product to be appealing to the eye. These types of projects tend to focus on function primarily and less on the visual design. My intent was to not have the solution negatively impact the environment it will live in, so I wanted to closely pay attention to its form.

## The Solution

The final product ended up utilizing 3 main parts, a vibration sensor, RGB LED light, and an Adafruit Metro Mini for the microcontroller. I attached these components to a soap dispenser and used the cap of a container to elevate the dispenser and display the LED light. The cost of parts for the final solution ended up being approximately $15.20. The only thing I purchased was the Adafruit Metro Mini, which was $12.45, so I’m pleased with the final cost. The size of the Metro Mini is quite extraordinary and acts similarly to the Ardunio. I was even able to use the Arduino IDE for it. I thought it worked perfectly for this project and look forward to using it in other projects. In terms of design, I didn't alter the form of the dispenser, all the electrical components are essentially hidden in some way. The only thing you really see is the light below the dispenser. I started building it on a Saturday and ended early the following day, so it was a quick build as well. Connecting everything took a while but after everything was connected, coding it was pretty straight forward. Overall, I’m happy with the final product. Essentially, it will display a blinking green light for 21 seconds (extra time build-in) which indicates a user should be scrubbing. Afterward, a still green light will appear for 21 seconds (additional 21 seconds never hurts), indicating a user should be rinsing. When the whole process is over, a red light will appear, indicating a user should stop rinsing and that they are done with the handwashing process. I’m excited to see it used inside my house!

<iframe src="https://www.youtube.com/embed/M8Oc9HoIEU8" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Bill of Materials

<img src="{{site.url}}/assets/dist/images/blog/soap-dispenser/bill-of-materials.jpg" alt="Metro Mini soap dispenser timer bill of materials" />


## Schematics

<img src="{{site.url}}/assets/dist/images/blog/soap-dispenser/soap_dispenser_timer_schematic.png" alt="Metro Mini soap dispenser timer schematics" />


## The Code
The code is posted on Github. [https://github.com/smithsa/metro-mini-soap-dispenser](https://github.com/smithsa/metro-mini-soap-dispenser)

```c
#include <millisDelay.h>
int redLightPin = 2;
int greenLightPin = 4;
int blueLightPin = 0;
int virbationSensor;
millisDelay scrubDelay;
millisDelay washDelay;
millisDelay finishedCycleDelay;
int scrubDuration = 21000; // adding extra second for padding
int washDuration = 21000; // adding extra second for padding
int finishedCycleDuration = 6000; // adding extra second for padding

void setup() {
  pinMode(redLightPin, OUTPUT);
  pinMode(greenLightPin, OUTPUT);
  pinMode(blueLightPin, OUTPUT);
  setDefaultColor();
}

void loop() {
  virbationSensor = analogRead(A0);
  
  // started scrubbing, virbration sensor was triggered
  if (virbationSensor < 1022){
    scrubDelay.start(scrubDuration);
    if(scrubDelay.isRunning()){
      scrubDelay.restart();
    }
  }

  // color to indicate should be scrubbing 
  if(scrubDelay.isRunning()){
    setColorByRGB(0,255,0);
    delay(500);
    setColorByRGB(0,0,0);
    delay(500); 
  }

  // finished scrubbing and started washing
  if (scrubDelay.justFinished()) {
    setColorByRGB(0,255,0);
    washDelay.start(washDuration);
  }

  // color to indicate should be washing 
  if(washDelay.isRunning()){
    setColorByRGB(0,255,0);
  }

  // finished washing
  if (washDelay.justFinished()) {
    finishedCycleDelay.start(finishedCycleDuration);
  }

  // color to indicate finish hand washing process cycle 
  if(finishedCycleDelay.isRunning()){
    setColorByRGB(255,0,0);
  }
  
  // finish hand washing process cycle
  if (finishedCycleDelay.justFinished()) {
    setDefaultColor();
  }
}

void setColorByRGB(int redLightValue, int greenLightValue, int blueLightValue) {
  digitalWrite(redLightPin, redLightValue);
  digitalWrite(greenLightPin, greenLightValue);
  digitalWrite(blueLightPin, blueLightValue);
}

void setDefaultColor(){
  setColorByRGB(0, 0, 0);
}

```