---
layout: post
published: true
title: "Building a Train Tracking Alexa Skill with ASK Node.js SDK"
date: 2018-10-29
categories: alexa
tags: [Alexa, Node, JavaScript, ASK SDK, Maker Share]
excerpt: I rarely have any issues with not having a car while living in the city. Except when winter rolls around. Waiting for the train to come in the cold and freezing winds ...
---

## Introduction

I rarely have any issues with not having a car while living in the city. Except when winter rolls around. Waiting for the train to come in the cold is the worst part about the winter for me. For the last few weeks, I have found myself in the predicament where I leave the house and get to the train station only to find that the train is delayed or the next train is 15 minutes away. With the temperature around the 30s and 40s, there have been some uncomfortable waits. The clear solution to this problem is to check when the train is coming through an app like “Transit Track” or the “CTA Train Tracker" website. But I am usually rushing out in the morning and I seldom look at my phone or use my computer before work. 

However, the one electronic device that I routinely use in the morning is my Echo Dot! Whether it’s checking the weather, seeing what’s on my schedule, adding items to my shopping list, or getting the time, it is always faster for me using the Echo than doing all these tasks on my phone. It also gives me the ability to multitask on my way out the door because my hands are free and I only need to use my voice. So clearly the solution to my problem is an Alexa Skill. There are definitely skills that exist that track trains in Chicago but I haven’t found one that I liked or was easy to use. So I decided to build a skill that would basically give me the estimated time of arrivals for the next two approaching trains near my house, and have the skill live locally on my Echo devices. In this blog post, I will share how I accomplished building a train tracking Alexa Skill. My objective of this post is to show you how I made the skill, so essentially it is a walkthrough of its development.



## The Goal

Basically, the goal will be to build a skill that tells me the estimated time of arrival for the next two approaching trains. If you are curious about the final product a demo you can view it below.

<div class="embed-responsive embed-responsive-16by9">
    <iframe class="embed-responsive-item" frameborder="0" src="https://www.youtube.com/embed/SKBHk-v7yr8" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

## The Requirements

1. The skill should return the estimated time of arrival of the next two trains closest to my home. But also how far the next trains are in terms of minutes. For example, if I request information at 12:00 pm and the next train is scheduled to arrive at 12:15 pm, the skill should tell me that the next train will arrive at 12:15 pm and is 15 minutes away.

2. The skill should notify me if the train is currently approaching the station. This lets me know if I should focus on catching the next train.

3. The skill should notify me if the train is delayed. This information will let me determine if I have more time to catch the next train, and should expect a longer wait time. This is important because I don’t want to be waiting for more than I have to.

4. The skill should give me train information based on the direction I specify I am going in. I should be able to tell the skill that I am going east, and it should only give me information about the next two trains going east to the city.

5. The input phrases (utterances) of the skill be as short as possible. I detest giving my Echo Dot, also known as Alexa, long instructions with many syllables (which is why I changed my wake word to Echo from Alexa, 2 syllables versus 3).

## The Voice Interaction Design

Before you build anything, it’s always a good idea to design it first on paper and flush everything out. The first step to creating an Alexa Skill is to always start with the voice interaction design. I am going to give the skill the name CTA (an acronym for the Chicago Transit Authority), it’s simple enough to say and remember. So based on one of my requirement above, if I were to specify that I was going to the east, the script of the skill interaction should go something like this:

```html
Me: Echo, tell the CTA I’m going east
Echo: The next train towards the city is 12 minutes away, and due to arrive at 7:05 PM. There is a following train 27 minutes away, and due to arrive at 7:20 PM.
```

Additionally, the interaction can go like this:

```html
Me: Echo, tell the CTA I’m going to the city
Echo: The next train towards the city is 12 minutes away, and due to arrive at 7:05 PM. There is a following train 27 minutes away, and due to arrive at 7:20 PM.
```



## Development

I’ll walk you through how I developed the skill in this section. You can view the source code of the train tracker in the repository called [train-arrival-times](https://github.com/smithsa/train-arrival-times).


## Retrieving the the Train Arrival Data

Now the fun part, the development of the skill! I need an API service to get me the information of the approaching trains. Luckily, the Chicago Transit Authority (CTA) has me covered with the [Train Tracker API](https://www.transitchicago.com/developers/traintracker/). Information in the API comes from data fed to CTA from its rail infrastructure, so I am sure to get accurate estimates. According to the Train Tracker API documentation, I only need to make one HTTP GET request to obtain the data I need to the following endpoint:

```text
https://lapi.transitchicago.com/api/1.0/ttarrivals.aspx?key=[your_api_key]&&mapid=[your_station_id]
```

This call should return to me a response in XML that looks something this:
```xml
<ctatt>
<tmst>20110321 18:32:02</tmst>
<errCd>0</errCd>
<errNm />
<eta>
<staId>40360</staId>
<stpId>30071</stpId>
<staNm>Southport</staNm>
<stpDe>Service toward Loop</stpDe>
<rn>426</rn>
<rt>Brn</rt>
<destSt>31740</destSt>
<destNm>Loop</destNm>
<trDr>5</trDr>
<prdt>20110321 18:31:29</prdt>
<arrT>20110321 18:34:29</arrT>
<isApp>0</isApp>
<isSch>0</isSch>
<isFlt>0</isFlt>
<isDly>0</isDly>
<flags/>
 <lat>41.97776</lat>
 <lon>-87.77567</lon>
 <heading>299</heading>
</eta>
</ctatt>
```
I will need to create some helper functions to assist me in parsing the data that I need. I will create a file called `helper.js` that I will import into my main `index.js` file later.

```javascript
'use strict';
const xml2js = require('xml2js');
const https = require('https');

const HelperFunctions = {
};

module.exports = HelperFunctions;
```

The first function I want to create is a function that parses XML data into a javascript object. I will use the `http` and `xml2js` node libraries to help me accomplish this. The function will take a string URL of an XML feed as a parameter and return a Promise that resolves the javascript object of the converted XML data. 

```javascript
'use strict';
const xml2js = require('xml2js');
const https = require('https');

const HelperFunctions = {
'getJsonObjectFromXMLFeed': async (xmlUrl) => {
   // A promise which makes a call to the api and waits for data
   let ctaArrivalTimes = new Promise(function(resolve, reject) {
       https.get(xmlUrl, (resp) => {
           let data = '';

           // A chunk of data has been received.
           resp.on('data', (chunk) => {
               data += chunk;
           });
           // The whole response has been received. Print out the result.
           resp.on('end', () => {
               resolve(data);
           });

       }).on("error", (err) => {
           reject("Error: " + err.message);
       });

   }).then(function(xmlArrivalTimes){
       let xmlStringResult = "";
       xml2js.parseString(xmlArrivalTimes, function (err, result) {
           xmlStringResult = result;
       });
       return xmlStringResult;
   }).then(function(jsonArrivalTimes){
       return jsonArrivalTimes;
   }).catch(function(errorMsg){
       console.log(errorMsg);
   });

   return ctaArrivalTimes;
}
};

module.exports = HelperFunctions;
```

## Handling the Train Arrival Data

The data given to me by the CTA that I can use for my purposes includes (1) the platform of the train (stpDe), so the direction the train is going to, (2) a date-time format stamp for when the prediction (prdt), (3) a date-time format stamp for when a train is expected to arrive/depart (arrT) (4) whether the train is currently approaching the station which is a 0 or 1(isApp), and (5) if the train is delayed which is a 0 or 1 (isDly).

 I’ll want helper functions to handle the time data I have received from the API in particular. I want to know how much of a wait time I have until the next train so I definitely want to get the time difference between two times. I will get the time difference in milliseconds and add the following function to `HelperFunctions` in my `helper.js` file.

```javascript
'getTimeDifference':  (time1, time2) => {
   let split_time1 = time1.split(':');
   let start1 = split_time1[0];
   let end1 = split_time1[1];

   let split_time2 = time2.split(':');
   let start2 = split_time2[0];
   let end2 = split_time2[1];

   var date1 = new Date(0);
   date1.setHours(parseInt(start1, 10));
   date1.setMinutes(parseInt(end1, 10));

   var date2 = new Date(0);
   date2.setHours(parseInt(start2, 10));
   date2.setMinutes(parseInt(end2, 10));

   return date2.getTime() - date1.getTime();
}
```

Since the function above returns milliseconds, I want a function to convert milliseconds to minutes. This will be useful for my purposes when I calculate how far the train is away later. 

```javascript
'convertMillisecondsToMinutes': (millseconds) => {
   return (millseconds * 0.001)/60;
}
```

But what if the time span if greater than 60 minutes and is something like 90 minutes. I don’t want to hear that my train is 90 minutes away. I would want to hear something like your train is an hour and a half. That is easier to comprehend. So for scenarios like this, I will add a function to the `HelperFunctions` called `minutesToHumanHearable` (I wonder if human hearable is a thing). 

```javascript
'minutesToHumanHearable': (input_minutes) => {
   if(input_minutes < 60){
       return input_minutes + (input_minutes == 1 ? ' minute' : ' minutes');
   }
   let hours = (input_minutes / 60);
   let rhours = Math.floor(hours);
   let minutes = (hours - rhours) * 60;
   let rminutes = Math.round(minutes);
   return rhours + (rhours == 1 ? ' hour': ' hours') +' and ' + rminutes + (rminutes == 1 ? ' minute' : ' minutes');
}
```

Lastly, I want the ability to convert a time string which is in a 24-hour time format into the standard 12-hour format. So I will create a function called `convertMiltaryTimeToStandardTime`, this function takes in a string time format on the 24-hour clock and will return a string on the 12-hour clock.

```javascript
'convertMiltaryTimeToStandardTime': (timeString) => {
   let splitTimeString = timeString.split(':');
   let hour = parseInt(splitTimeString[0], 10);
   let minutes = splitTimeString[1];

   let dayPeriod = (hour >= 12 && hour !== 24) ? ' PM' : ' AM';
   let standardHour = (hour > 12) ? (hour-12) : ((hour == 0) ? 12: hour);

   return standardHour+':'+minutes+dayPeriod;

}

```

These functions above should help me parse the data that I get from the CTA. If you want to see the final file you can look in `lambda/custom/helper.js` for the final file.

## Building the Interaction Model
I’ve gotten the helper functions out the way. Now I should define my interaction model. This is the part where the voice interface that users use to interact with the skill is defined. It lives in a JSON file called `en-US.json` which is located in the `models` folder. 

### Intents
An intent represents an action that fulfills a user's spoken request. The default intents are named: AMAZON.CancelIntent, AMAZON.StopIntent, and AMAZON.HelpIntent in the file. I want a specific intent to get the train estimates so I will create an entry into `interactionModel.languageModel.intents` named `TrainArrivalEstimatesRequest`. 

```json
{
 "interactionModel": {
   "languageModel": {
     "invocationName": "cta",
     "types":[],
     "intents": [
       {
         "name": "AMAZON.CancelIntent",
         "samples": [

         ]
       },
       {
         "name": "AMAZON.HelpIntent",
         "samples": [

         ]
       },
       {
         "name": "AMAZON.StopIntent",
         "samples": [

         ]
       },
       {
         "name": "TrainArrivalEstimatesRequest",
         "slots": [
         ],
         "samples": [
         ]
       }
     ]
   }
 }
}
```

### Slots and Types

Let’s talk slots now. Slots are the arguments that an intent receives when the user issues a request. So for my purposes in building this skill the slots I would want two slots, on for east (63rd Street) and one for the west (Harlem) because that is the information I want to give the intent to get my trains’ estimate times of arrival.

Slot are defined by types. For example, Amazon uses built-in types like `AMAZON.DATE`, `AMAZON.NUMBER`, `AMAZON.US_CITY`. I need to define custom slots for the direction of the trains. I will add two entries into `interactionModel.languageModel.types`. I will name them `WEST_DIRECTION` and `EAST_DIRECTION`. Additionally, I will add synonyms for each direction. See the code below:

```json
     "types": [
       {
         "values": [
           {
             "name": {
               "value": "harlem",
               "synonyms": ["harlem", "work", "harlem ave", "harlem and lake", "west"]
             }
           }
         ],
         "name": "WEST_DIRECTION"
       },
       {
         "values": [
           {
             "name": {
               "value": "63rd Street",
               "synonyms": ["63rd", "63rd street", "the city", "east", "ashland", "63rd and ashland", "63rd street and ashland", "63rd street and ashland avenue"]
             }
           }
         ],
         "name": "EAST_DIRECTION"
       }
     ]
```

Now that the slot types are defined, I will add my slots to the intent.
```json
{
 "name": "TrainArrivalEstimatesRequest",
 "slots": [
   {
     "name": "westDirection",
     "type": "WEST_DIRECTION"
   },
   {
     "name": "eastDirection",
     "type": "EAST_DIRECTION"
   }
 ],
 "samples": [
 ]
}
```

### Utterances

The last part to handle in the interaction model is the sample utterance. The sample utterances specify the words and phrases users can say to invoke the intent to get the train estimates. The intent will be mapped to these utterances. Slots are indicated within the utterances with curly brackets. I will add my utterances to the intent. The final intent in the interaction model should look like the following:

```json
{
 "name": "TrainArrivalEstimatesRequest",
 "slots": [
   {
     "name": "westDirection",
     "type": "WEST_DIRECTION"
   },
   {
     "name": "eastDirection",
     "type": "EAST_DIRECTION"
   }
 ],
 "samples": [
   "what is the next train going towards {westDirection}",
   "what is the next train going towards {eastDirection}",
   "what is the next train going {westDirection}",
   "what is the next train going {eastDirection}",
   "what is the next train going to {westDirection}",
   "what is the next train going to {eastDirection}",
   "when is the next train going to {westDirection}",
   "when is the next train going to {eastDirection}",
   "when is the next train towards {westDirection} is",
   "when is the next train towards {eastDirection} is",
   "when the next train towards {westDirection} is",
   "when the next train towards {eastDirection} is",
   "when the next train toward {westDirection} is",
   "when the next train toward {eastDirection} is",
   "when the next train to {westDirection} is",
   "when the next train to {eastDirection} is",
   "get the next train towards {westDirection}",
   "get the next train towards {eastDirection}",
   "get the next train to {westDirection}",
   "get the next train to {eastDirection}",
   "get the next train going towards {westDirection}",
   "get the next train going towards {eastDirection}",
   "{eastDirection}",
   "{westDirection}",
   "I'm going {westDirection}",
   "I'm going {eastDirection}",
   "I am going {westDirection}",
   "I am going {westDirection}",
   "We are going {eastDirection}",
   "We are going {westDirection}",
   "We're are going {eastDirection}",
   "We're are going {westDirection}",
   "I'm going to {westDirection}",
   "I'm going to {eastDirection}",
   "I am going to {westDirection}",
   "I am going to {westDirection}",
   "We are going to {eastDirection}",
   "We are going to {westDirection}",
   "We're are going to {eastDirection}",
   "To {westDirection}",
   "To {eastDirection}"
 ]
}
```

## Developing the Intent Logic

The final step of all this is to develop the logic for the intent. The intent lives in `index.js` with the other intents. Here I will want to get what slot was spoken by the user then use that information to get the correct train. I will access the slot id by referencing the slots of the intents. I will need to determine if the user is requesting train information for trains heading east or west. I’ll set this information in the `trainDestination` variable. Additionally, I will return a response to the user to repeat the request again if I can not find the appropriate direction.

```javascript
const TrainArrivalEstimatesRequestHandler = {
 canHandle(handlerInput) {
   return handlerInput.requestEnvelope.request.type === 'IntentRequest'
     && handlerInput.requestEnvelope.request.intent.name === 'TrainArrivalEstimatesRequest';
 },
 handle(handlerInput) {
     const {attributesManager} = handlerInput;
     const { request } = handlerInput.requestEnvelope;

     let outputText = '';
     let direction = '';
     let trainDestination = '';
     let slots = request.intent.slots;
     if(slots.eastDirection.hasOwnProperty('value')){
         direction = slots.eastDirection.value;
         trainDestination = 'Service toward 63rd St';
     }else if(slots.westDirection.hasOwnProperty('value')){
         direction = slots.westDirection.value;
         trainDestination = 'Service toward Harlem/Lake';
     }else{
         const speechText = 'Sorry, I don\'t know that destination. Try saying it again, or another phrase like: get me the next train toward the city.';
         return handlerInput.responseBuilder
             .speak(speechText)
             .withShouldEndSession(false)
             .getResponse();
     }
 }
};
```

I can then grab the train estimated times of arrival from a request to the CTA Train Tracker API. I use the helper functions I created earlier. Then I parse out the data using the helper functions to get me the wait time, estimated time of arrival on a 12-hour clock, and information about whether the train is approaching or delayed. Once I have that information, I can create an output string that instructs Alexa what to say, it will have the estimated arrival times of the next trains going in the specified direction. After the output string is finished being created, I can pass it through the Promise chain and return a response. Ultimately, I will return the Promise which will provide the response for the Alexa SDK.

```javascript
const TrainArrivalEstimatesRequestHandler = {
 canHandle(handlerInput) {
   return handlerInput.requestEnvelope.request.type === 'IntentRequest'
     && handlerInput.requestEnvelope.request.intent.name === 'TrainArrivalEstimatesRequest';
 },
 handle(handlerInput) {
     const {attributesManager} = handlerInput;
     const { request } = handlerInput.requestEnvelope;

     let outputText = '';
     let direction = '';
     let trainDestination = '';
     let slots = request.intent.slots;
     if(slots.eastDirection.hasOwnProperty('value')){
         direction = slots.eastDirection.value;
         trainDestination = 'Service toward 63rd St';
     }else if(slots.westDirection.hasOwnProperty('value')){
         direction = slots.westDirection.value;
         trainDestination = 'Service toward Harlem/Lake';
     }else{
         const speechText = 'Sorry, I don\'t know that destination. Try saying it again, or another phrase like: get me the next train toward the city.';
         return handlerInput.responseBuilder
             .speak(speechText)
             .withShouldEndSession(false)
             .getResponse();
     }

   //get the next train times here
   let trainXMLData = helperFunctions.getJsonObjectFromXMLFeed(API_CALL);
   let estimateData = trainXMLData.then(function(jsonArrivalTimes){
       let etas = jsonArrivalTimes.ctatt.eta;
       let etaEstimates = {};
       for(let eta of etas){
         console.log(eta);
         eta.prdt = eta.prdt[0];
         eta.arrT = eta.arrT[0];
         let currentTime = helperFunctions.convertDateTimeToTime(eta.prdt);
         let arrivalTime = helperFunctions.convertDateTimeToTime(eta.arrT);
         let waitingTime = helperFunctions.convertMillisecondsToMinutes(helperFunctions.getTimeDifference(currentTime, arrivalTime));
         waitingTime = helperFunctions.minutesToHumanHearable(parseInt(waitingTime));

         let standardArrivalTime = helperFunctions.convertMiltaryTimeToStandardTime(arrivalTime);
         console.log('standardArrivalTime:', standardArrivalTime);

         eta.stpDe = eta.stpDe[0];
         eta.isApp = eta.isApp[0];
         eta.isDly = eta.isDly[0];
         if(etaEstimates.hasOwnProperty(eta.stpDe)){
             etaEstimates[eta.stpDe].push({
                     'wait': waitingTime,
                     'arrival_time': standardArrivalTime,
                     'is_approaching': eta.isApp,
                     'is_delayed':  eta.isDly
                 });
         }else{
             etaEstimates[eta.stpDe] = [{
               'wait': waitingTime,
               'arrival_time': standardArrivalTime,
               'is_approaching': eta.isApp,
               'is_delayed':  eta.isDly
             }];
         }

       };

       //get the data of the direction the train is going
       etaEstimates = etaEstimates[trainDestination];
       return [direction, etaEstimates];

   });

   let outputString = estimateData.then(function (destinationData) {
       let direction = destinationData[0];
       let estimates = destinationData[1];
       let speechOutput = 'The next train towards '+direction+ ' is ';
       speechOutput += estimates[0].wait + ' away';
       speechOutput += ', and due to arrive at '+ estimates[0].arrival_time+'.' ;
       speechOutput += (estimates[0].is_approaching === '1' ? ' It is approaching.': '');
       speechOutput +=  (estimates[0].is_delayed === '1' ? ' It is currently delayed.': '');
       if(estimates.length == 2){
           speechOutput += ' There is a following train ';
           speechOutput += estimates[1].wait + ' away';
           speechOutput += ', and due to arrive at '+ estimates[1].arrival_time+'.' ;
           speechOutput += (estimates[1].is_approaching === '1' ? ' It is approaching.': '');
           speechOutput +=  (estimates[1].is_delayed === '1' ? ' It is currently delayed.': '');
       }

       return speechOutput;

   }).then(function(speechText){
       return handlerInput.responseBuilder
           .speak(speechText)
           .getResponse();
   });
   return outputString;
 },
};
```

## Conclusion

Voila! This concludes the walkthrough of the skill. It’s pretty simple and just requires one intent which makes an HTTP request. As mentioned previously, you can view the source code of the train tracker in the repository called [train-arrival-times](https://github.com/smithsa/train-arrival-times). The skill was a quick build just to help me get out on time in the morning, but it can be extended. Maybe in the future, I will have time to expand it so that others can use it but for now it’s on GitHub if anyone wants to use or modify it. So hopefully with this skill, there are fewer long waits in the cold for the train! 

## Update: 10/15/2018

I figured the application could use some pizzaz and give me some energy when I head off to work!
<div class="embed-responsive embed-responsive-16by9">
    <iframe class="embed-responsive-item" frameborder="0" src="https://www.youtube.com/embed/zx_2lXiQMuc" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>
