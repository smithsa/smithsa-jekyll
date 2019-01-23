---
layout: post
published: true
title:  "Replicating Youtube App's Double Tap to Seek Feature"
date: 2019-01-12
categories: [web development]
tags: [javaScript]
excerpt: Not long ago, I was on StackOverflow and I ran across a question asking if anyone knew of a library or how to implement Youtube’s double tap to rewind and forward feature in a browser.
---

## Introduction

Not long ago, I was on StackOverflow and I ran across a question asking if anyone knew of a library or how to implement Youtube’s double tap to rewind and forward feature in a browser. It’s a feature on the Youtube mobile application app that allows the user to forward the video if the right side of the video is double tapped and rewind the video if the left side is double tapped. It’s a nifty feature that I didn’t know existed before I saw the question since I don’t use Youtube on my phone much but I thought it would be cool to build with JavaScript. In this post, I will demonstrate how to implement such a feature using HTML, CSS, and vanilla JavaScript. 

## The Objective

I explained the basic functionality in the introduction, but I think it will be helpful to have a visual example of what we are building. I’ve posted two gifs below which demonstrate the double tap feature of the Youtube mobile application on an iPhone. In the visual aid, you will see that two taps on the left of the screen will rewind the video ten seconds and two taps to the right of the screen will fast-forward the video ten seconds. Additionally, for every consecutive double tap, the effect is cumulative and the amount of seconds to forward or rewind is multiplied. For example, three double taps to the right of the video will forward the video ahead thirty seconds. Our version of this feature will work similarly except it will seek on double click instead of a double tap since we will be developing this for the web.

<div class="image-container">
    <img src="{{site.url}}/assets/dist/images/blog/youtube-double-tap-feature/rewind-double-tap.gif" alt="rewind double tap feature" />
    <img src="{{site.url}}/assets/dist/images/blog/youtube-double-tap-feature/forward-double-tap.gif" alt="forward double tap feature" />
</div>

## The Structure

The structure will be fairly simple. Deconstructing the feature, we can break the elements down to the video player, (2) the rewind UI (user interface) indicator, and the forward UI indicator. I will nest all these elements inside a div with the class name of “video-player.” We’ll add an HTML5 video player, and have a few divs for the forward and rewind indicators. It’s important to note that the video player has it’s built-in controls disabled since double tapping a video element will cause the video to enter the fullscreen mode.

```html
<div class="video-container">
  <video class="player__video viewer" src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"></video>
  <div class="video-rewind-notify rewind notification">
    <div class="rewind-icon icon">
        <i class="left-triangle triangle">◀◀◀</i>
        <span class="rewind">10 seconds</span>
    </div>
  </div>
  <div class="video-forward-notify forward notification">
    <div class="forward-icon icon">
        <i class="right-triangle triangle">▶▶▶</i>
        <span class="forward">10 seconds</span>
    </div>
  </div>
</div>
```

## The Styles

I’ll add some basic styles to the video player. The main thing that will be styled is the ripple effect when a user double taps the video and displays how much the video will be rewound or forwarded. Using CSS animations I can replicate the ripple effect that YouTube has. The rest of the styles will be to position the video for purposes of the demo. I've just created some quick and dirty styling that you can grab from the <a href="https://codepen.io/smithsa/pen/ZmWMxy" target="_blank">Codepen</a>.
I'll go more in detail in this post about the Javascript.

## The JavaScript

The fun part of implementing the YouTube double tap to rewind/forward will be the JavaScript. Everything has been set up, now we can get the feature working! 

The first thing we will do is grab the DOM elements we will need to manipulate. For our purposes that will be (1) the HTML5 video element, (2) the forward and rewind ripple notifications which are the visual indicators of if a double click has occurred, and (3) the span elements which show the rate at which the video will be rewound and forwarded.

```javascript
//grab the video dom element
const video = document.querySelector('video'); 
const notifications = document.querySelectorAll('.notification');
const forwardNotificationValue = document.querySelector('.video-forward-notify span');
const rewindNotificationValue = document.querySelector('.video-rewind-notify span');
```

### Double Click

Next, we want to detect if the user double-clicks the left and right side of the video element. An event handler for double click should be added to the video player DOM element. I found it hard to visually distinguish between a double click and a single click since a single click is required for the double click. So we’ll add an additional event handler to the video on click that will toggle the pause and play actions on the video.  

```javascript
function togglePlay(){
  video.paused ? video.play() : video.pause();
}

//Event Listeners
video.addEventListener('click', togglePlay);
```

Now that the toggle play has been added, we can move towards handling the double click event. First, we will create a function that will be the callback for the double click event handler that detects if the left side of the video was clicked or the right side. We’ll pass the function to the handler. From the event, we can use `offsetX` to help determine what side of the video is clicked. It will give us the X coordinate of the mouse pointer at the time of the double click, relative to the video. We can take the value of the X coordinate and compare it to the width of the video halved (`video.offsetWidth/2`). If the X coordinate is less than half of the video’s width then we know the left side of the video was clicked. However, if the X coordinate is greater than half the width of the video then we can assume the right side of the video was clicked. So I’ll create two more functions called `forwardVideo()` and `rewindVideo()` and call them accordingly, based on the logic I’ve defined above.

```javascript
function forwardVideo(){
}

function rewindVideo(){
}

//Event Handlers
function doubleClickHandler(e){
    const videoWidth = video.offsetWidth;
    (e.offsetX < videoWidth/2) ? rewindVideo() : forwardVideo();
}

video.addEventListener('dblclick', doubleClickHandler);
```

We will leave the `forwardVideo()` and `rewindVideo()` functions empty for now and work on a function to handle the forwarding and rewinding of the video element. It will be called `updateCurrentTime`. It will take one parameter, which will be the number of seconds to rewind or forward the video. We will also want to define variables outside the function which will be accumulators that keeps track of how far the user wants to forward or rewind based on their clicks (`forwardSpeed` and `rewindSpeed`), and declare a variable named `timer` to reference a setTimeout function we will use to track consecutive double clicks.
```javascript
let timer;
let rewindSpeed = 0;
let forwardSpeed = 0;

function updateCurrentTime(delta){
    
}
```

### Seeking

Let’s get building within the function. Since the parameter is the number of seconds to forward or rewind we can detect what the user intends to do by seeing if the variable delta is less than or greater than zero. If it is less than zero then we know the user is rewinding, and if greater than zero then it is the case the user intends to forward the video. With this information, we can calculate the number of seconds to forward or rewind the video using our accumulator variables and the delta variable. We will simply increment the accumulator variables by the delta. If the video is rewinding we will set the `forwardSpeed` variable which the amount to change the video to zero since the variable no longer needs to be incremented because the user is not consecutively clicking the left side of the video and vice versa. 

```javascript
let timer;
let rewindSpeed = 0;
let forwardSpeed = 0;

function updateCurrentTime(delta){
    let isRewinding = delta < 0;
      
    if(isRewinding){
      rewindSpeed = rewindSpeed + delta;
      forwardSpeed = 0;
    }else{
      forwardSpeed = forwardSpeed + delta;
      rewindSpeed = 0;
    }
}
```

Based on this information we will update the current time of the video by incrementing it by the forward or rewind speed. In addition, we will update the value on the UI indicator that tells the user how many seconds the video is being forwarded or rewound as well. Basically, we will update the innerHTML on the element and take the absolute value of the speed and add it’s value to a template literal.

```javascript
let timer;
let rewindSpeed = 0;
let forwardSpeed = 0;

function updateCurrentTime(delta){
    let isRewinding = delta < 0;
      
    if(isRewinding){
      rewindSpeed = rewindSpeed + delta;
      forwardSpeed = 0;
    }else{
      forwardSpeed = forwardSpeed + delta;
      rewindSpeed = 0;
    }
    
    let speed = (isRewinding ? rewindSpeed : forwardSpeed);
    video.currentTime = video.currentTime + speed;
      
    let NotificationValue =  isRewinding ? rewindNotificationValue : forwardNotificationValue ;
    NotificationValue.innerHTML = `${Math.abs(speed)} seconds`;
}
```

To help us detect if there are consecutive double clicks we will use the `setTimeout` function. Essentially whenever the `updateCurrentTime` function is called on the double click we are incrementing the speed to forward or rewind the video by incrementing the `rewindSpeed` and `forwardSpeed` speeds by the `delta` variable. We will make it so that within two seconds the `forwardSpeed` and `rewindSpeed` will be set to zero.  The variable `timer` will be set to the `setTimeOut` function.

```javascript
let timer;
let rewindSpeed = 0;
let forwardSpeed = 0;

function updateCurrentTime(delta){
    let isRewinding = delta < 0;
      
    if(isRewinding){
      rewindSpeed = rewindSpeed + delta;
      forwardSpeed = 0;
    }else{
      forwardSpeed = forwardSpeed + delta;
      rewindSpeed = 0;
    }
    
    let speed = (isRewinding ? rewindSpeed : forwardSpeed);
    video.currentTime = video.currentTime + speed;
      
    let NotificationValue =  isRewinding ? rewindNotificationValue : forwardNotificationValue ;
    NotificationValue.innerHTML = `${Math.abs(speed)} seconds`;
    
    //reset accumulator within 2 seconds of a double click
    timer = setTimeout(function(){
      rewindSpeed = 0;
      forwardSpeed = 0;
    }, 2000); // you can edit this delay value for the timeout, i have it set for 2 seconds
}
```

The last part of this step is to add a clearTimeOut right before we update the video. This way the variables `forwardSpeed` and `rewindSpeed` will not be reset to zero on consecutive double clicks and will instead be incremented by the `delta` variable.

```javascript
let timer;
let rewindSpeed = 0;
let forwardSpeed = 0;

function updateCurrentTime(delta){
    let isRewinding = delta < 0;
      
    if(isRewinding){
      rewindSpeed = rewindSpeed + delta;
      forwardSpeed = 0;
    }else{
      forwardSpeed = forwardSpeed + delta;
      rewindSpeed = 0;
    }
    
    //clear the timeout
    clearTimeout(timer);
    
    let speed = (isRewinding ? rewindSpeed : forwardSpeed);
    video.currentTime = video.currentTime + speed;
      
    let NotificationValue =  isRewinding ? rewindNotificationValue : forwardNotificationValue ;
    NotificationValue.innerHTML = `${Math.abs(speed)} seconds`;
    
    //reset accumulator within 2 seconds of a double click
    timer = setTimeout(function(){
      rewindSpeed = 0;
      forwardSpeed = 0;
    }, 2000); // you can edit this delay value for the timeout, i have it set for 2 seconds
}
```

The `updateCurrentTime` function is now fully built out. We will call it in the `forwardVideo` and `rewindVideo` functions. On the forward function, `updateCurrentTime`  will take a parameter of 10 since we want to increment by 10 seconds and -10 on the rewind function since we want to decrement by 10 seconds.
```javascript
function forwardVideo(){
  updateCurrentTime(10);
}

function rewindVideo(){
    updateCurrentTime(-10);
}
```

### Adding the Animations

The functionality of double-clicking to forward and rewind is working now! But we need to do one more thing, which is to animate an indicator in to show that the video’s current time is updating. Additionally, we need to animate the indicator out. We already have a CSS animations added to a class on the notification DOM elements called `animate-in`. When added to a notification DOM element it will fade the notification in and when the class is removed it will fade it out.

So let’s create two functions, one to animate the notifications in and one to indicate the notifications out. We will name them `animateNotificationIn` and `animateNotificationOut`. The `animateNotificationIn` will take one parameter which will be a boolean that tells the function if the video is being rewound. The `animateNotificationOut` function will be put on an event listener and will be called when a notification DOM element’s CSS animation ends.

```javascript
function animateNotificationIn(isRewinding){
}

function animateNotificationOut(){
}
```

In `animateNotificationIn`, if the user wants to rewind the video we will grab the rewind notification DOM element (which is at index 0 of `notifications`) and add the class `animateIn` to the element. Otherwise, we will grab the forward notification DOM element (which is at index 1 of `notifications`) and add the class `animateIn` to the element.

```javascript
function animateNotificationIn(isRewinding){
  isRewinding ? notifications[0].classList.add('animate-in') : notifications[1].classList.add('animate-in'); 
}
```

For the `animateNotificationOut` since we are adding it on an event listener we will just reference `this` for the element within the function and remove the `animateIn` class.

```javascript
function animateNotificationOut(){
    this.classList.remove('animate-in');
}

notifications.forEach(function(notification){
  notification.addEventListener('animationend', animateNotificationOut);
});
```

Finally we will call the `animateNotificationIn` function in both the `forwardVideo` and `rewindVideo` functions. The call to `animateNotificationIn` in `forwardVideo` will have a parameter of false, denoting we want to forward the video. The call to `animateNotificationIn` in `rewindVideo` will have a parameter of true, denoting we want to forward the video. On the notification DOM elements that we grabbed earlier we will add the function to an `animationend` event listener.

```javascript
function forwardVideo(){
  updateCurrentTime(10);
  animateNotificationIn(false);
}

function rewindVideo(){
    updateCurrentTime(-10);
    animateNotificationIn(true);
}
```

## Wrapping it up

Voila! We have replicated similar functionality to Youtube’s video play on its mobile application! A demo of the functionality can be seen below. When we double tap the left side of the screen the video is rewound and if the right side is double tap the video is forwarded. In addition, consecutive taps increment the amount the video will be forwarded or rewound. If you are interested in seeing the complete source code for this tutorial, you can find it on CodePen titled [“HTML5 Video Double Click to Seek”](https://codepen.io/smithsa/pen/ZmWMxy).

<iframe height='265' scrolling='no' title='HTML5 Video Double Click to Seek' src='//codepen.io/smithsa/embed/ZmWMxy/?height=265&theme-id=0&default-tab=css,result' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/smithsa/pen/ZmWMxy/'>HTML5 Video Double Click to Seek</a> by Sade Smith (<a href='https://codepen.io/smithsa'>@smithsa</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

