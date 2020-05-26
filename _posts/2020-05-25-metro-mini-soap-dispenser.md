---
layout: post
published: true
title:  "Metro Mini Soap Dispenser Timer"
date: 2020-05-25
categories: [electronics]
tags: [hardware, arduino, metromini, makershare, hardware]
feature_img: /assets/dist/images/blog/soap-dispenser/thumbnail.jpg
feature_img_alt: Metro Mini Soap Dispenser Timer
excerpt: Centers for Disease Control recommends that individuals frequently wash their hands for at least 20 seconds to protect against the virus and other pathogens. I’ve come to learn that 20 seconds feels a lot longer ...
---
## Introduction

Since the outbreak of the 2019 Novel Coronavirus, it is now common knowledge that the Centers for Disease Control recommends that individuals frequently wash their hands for at least 20 seconds to protect against the virus and other pathogens. I’ve come to learn that 20 seconds feels a lot longer than you would imagine. The advice has been to sing the “Happy Birthday” or the ABC song twice, I’ve opted for the ABC song, but after a while it becomes an annoying affair. Especially if I am in the process of talking to someone or thinking while I’m washing my hands. I figured that it would be a good small household problem to solve and an opportunity to build upon my electrical skills.


## Constraints

There were two constraints I gave myself for this project. The first pertaining to the budget. After spending more than I wanted this year on electronic parts, I wanted to rely on components I already had and didn’t want to accumulate more parts. The other constraint was that I wanted the final product to be appealing to the eye. These types of projects tend to focus on function primarily and less on the visual design. My intent was to not have the solution negatively impact the environment it will live in, so I wanted to closely pay attention to its form.

## The Solution

The final product ended up utilizing 3 main parts, a vibration sensor switch, RGB LED light, and an [Adafruit Metro Mini](https://www.adafruit.com/product/2590) for the microcontroller board. I attached these components to a soap dispenser and used the cap of a container to elevate the dispenser and display the LED light. The cost of parts for the final solution ended up being approximately $15.20. The only thing I purchased was the Adafruit Metro Mini, which was $12.45, so I’m pleased with the final cost. The size of the Metro Mini is quite extraordinary and acts similarly to the Ardunio. I was even able to use the Arduino IDE for it. I thought it worked perfectly for this project and look forward to using it in other projects. In terms of design, I didn't alter the form of the dispenser, all the electrical components are essentially hidden in some way. The only thing you really see is the light below the dispenser. I started building it on a Saturday and ended early the following day, so it was a quick build as well. Soldering and connecting the wires to the sensor and LED lights with heat shrink tubes took a while but after everything was connected, coding it was pretty straight forward. Overall, I’m happy with the final product. Essentially, it will display a blinking green light for 21 seconds (extra time build-in) which indicates a user should be scrubbing. Afterward, a still green light will appear for 21 seconds (additional 21 seconds never hurts), indicating a user should be rinsing. When the whole process is over, a red light will appear, indicating a user should stop rinsing and that they are done with the handwashing process. I’m excited to see it used inside my house!

<figure>
  <div class="embed-responsive embed-responsive-4by3">
    <iframe class="embed-responsive-item" src="https://www.youtube.com/embed/M8Oc9HoIEU8" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
  </div>
  <br>
  <figcaption>Demonstration of the soap dispenser timer is above. If you are interested in the code, you can find it on my Github under a project titled <a target="_blank" href="https://github.com/smithsa/metro-mini-soap-dispenser">metro-mini-soap-dispenser</a>.</figcaption>
</figure>



## Bill of Materials

<img src="{{site.url}}/assets/dist/images/blog/soap-dispenser/bill-of-materials.jpg" alt="Metro Mini soap dispenser timer bill of materials" />


## Schematics

<img src="{{site.url}}/assets/dist/images/blog/soap-dispenser/soap_dispenser_timer_schematic.png" alt="Metro Mini soap dispenser timer schematics" />