---
layout: post
published: true
title: "3 Browser APIs to be Excited About"
date: 2018-07-18
categories: [web development]
tags: [javascript, browser, web share, web bluetooth, service workers, payment requests, pwas, apis]
excerpt: In this post, we will be exploring some of these APIs improving the everyday web experience. I will be giving an overview of five exciting browser APIs you should know about. For each API, we will go over what the API does, potential use cases, and current browser support. Developers should consider implementing these new technologies ...
---


Introduction
------------
Each year web technologies push the boundaries of what was thought possible. The gap between native and web applications steadily narrows as browsers introduce new web/browser application programming interfaces (APIs). Evidence of this is seen in the standardization of web/browser APIs like Geolocation and AmbientLightSensor. These APIs remove capability barriers by providing access to device hardware. Additionally, we can see APIs like Web Storage and IndexedDB adding a performance boost by storing data on the client-side. The best part is that the list of browser APIs keeps growing, and in turn, enhancing the capability of the web. It’s certainly an exciting time to be developing for the web!

In this post, we will be exploring some of these APIs improving the everyday web experience. I will be giving an overview of five exciting browser APIs you should know about. For each API, we will go over what the API does, potential use cases, and current browser support. Developers should consider implementing these new technologies in their web applications once browsers adopt and ship them. Until then, be sure to feature detect if you decide to use these APIs sooner than later.

Webshare API
------------
Currently, there isn’t a standard way to access the share dialog of native devices using the web. The [WebShare API](https://developers.google.com/web/updates/2016/09/navigator-share) fixes this problem and allows your web applications to invoke native device’s share dialog. Developers can access the API through the navigator object, calling the share() method.

```javascript
    navigator.share()
```
It makes sharing easier for users and gives them more control over how they would like to share information from the web. Potential use cases for the Webshare API are for sites that currently use share buttons to share content (i.e.: blogs and sites that have a lot of short-form media like images). If you want to use this API, simply provide the share method with an object that has the following properties listed below in the code example. At a minimum, the properties of text and URL are required. Another requirement is that the website you share must use HTTPS. Additionally, the Web Share API is promised-based so you can use promises and catch errors with this method.
```javascript
	navigator.share({
		title: ‘Sade Smith’,
		text: ’3 Browser APIs you should be excited about’,
		url: '[https://sadesmith.com](https://sadesmith.com/),
	})
	.then(() => console.log('Successful share'))
	.catch((error) => console.log('Error sharing', error
	));
```

Below you can see the functionality of the API in action courtesy of [Paul Kinlan]([https://paul.kinlan.me/](https://paul.kinlan.me/)) from Google.

<iframe width="560" height="315" src="https://www.youtube.com/embed/lhUzYxCvWew" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
<small>Payment Request API, courtesy of Google Chrome Developers</small>

I know what you are thinking about: browser support, right? The only browsers that offer full support are Chrome 61 android and Opera 48 and Webkit is considering adding support as well. It will be interesting to see if other browsers move to adopt this API. If there is a wider adoption, then that would mean the web would be a step closer to closing the gap between the web and native. For now, if you decide to use this API, you should feature-detect to ensure that the API is available on the user’s platform.strong text

Payment Request API
------------
The [Payment Request API](https://developers.google.com/web/fundamentals/payments/) aims to make the traditional tedious checkout process on website obsolete by storing users billing information in the browser and presenting a consistent, secure and user-friendly interface regardless of payment method. Checkout forms are notoriously long and repetitive across sites and filling out these forms on mobile devices are even more of a headache. This API streamline the checkout process and makes the checkout flow a lot shorter. Now with the Payment Request API, you can checkout with a few click and keyboard is not needed at all. Amazing, right? So let’s talk about how it works.

The browser will securely store and save your information for purchases and then send it to the merchant. (the address in this) The merchant then can send back options for shipping. The only required input from the user would is the CVC. Once the user confirms the payment, the data is securely bundled and sent to the merchant. Once the browser determines that the accepted payment methods for the site and the methods on the device are compatible, the browser will display the payments UI. The user then selects the payment method and authorized the transaction. The data the user entered and has stored (i.e. card number, CVC, card expiration date) is bundled and sent to the merchant site.

It’s important to note that this is not a new payment method itself. It does not replace payment processors like Stripe and Braintree. Nor does it interact directly with payment processors. The API is simply a way to send user’s payment and shipping information to merchants to allow for a seamless and painless checkout experience on any browser, device, or platform. So it’s vendor agnostic, it does not matter what payment processing service you use.

The use cases for this API are any websites that sell services or products. E-ccommerce sites can definitely use this API to their advantage. The main benefit is that it can increase conversion rates for online businesses by decreasing the drop-off that happens during the checkout process. The API removes the friction involved in making a purchase, thus making it more likely a user will complete the process. If you choose to use this API, your website must be served over a secure connection (use HTTPS).


<iframe width="560" height="315" src="https://www.youtube.com/embed/hmqZxP6iTpo" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
<small>Payment Request API, courtesy of Google Chrome Developers</small>

The Payment Request API is currently supported in Chrome, Safari, and Edge. Additionally, Firefox is working on an implementation. It is a W3C standard candidate so hopefully, we see it being adopted by more browser engines in the future.

Service Worker API
------------
[Service workers](https://developers.google.com/web/ilt/pwa/introduction-to-service-worker) are web workers that run in the background of your browser, separate from the main thread, running asynchronously. It is independent of the website itself so it does not have access to the DOM. Service workers are essentially a JavaScript file that has control of the associated website’s network requests and cache resources. In addition, the service worker can receive push messages for a server when the web application is not open so notifications can be pushed to the user without the website being opened. They can be thought of as a proxy server that positioned between a web application, the browser, and the network (when a network can be accessible).

The Service Worker API is immensely important to the web because it allows for devices to access content when they are offline or have limited connectivity and allows websites to send push notifications even when the site is not open. These two features were previously only capable in native applications. Service workers combined with other APIs help the web get closer to native mobile apps by providing features native apps previously only held. Being able to access content from the web offline or with a poor connection is big!

Using a service worker, requires you to register it in your website’s Javascript and serve your application over a secure connection. Once the service worker is registered, the browser will start the installation step in the background. The next step is activation, where the service worker can finish setup or clean related resources (for example, cleaning older caches). You can find more information on how to use the Service Worker API from [Mozilla’s service worker documentation]([https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers)).

The most obvious use case would be to use this API for offline experiences. The Service Worker API is being used in progressive web applications (PWAs), which are regular websites which appear to have a native feel and offer an immersive experience like native apps. Service workers allow these web applications to run offline, a feature only mobile applications used to have. As a result, PWAs are indistinguishable from native mobile applications to the average user.

<iframe width="560" height="315" src="https://www.youtube.com/embed/U35B31dBvBk" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
<small>Demo, courtesy of [Dung Nguyen](https://github.com/davidnguyen179)</small>

There is good news in terms of browser support for service workers! Most of the major browsers support service workers, that includes Edge, Chrome, Safari, and Firefox. You can find more detailed information at [Jake Archibald’s]([https://jakearchibald.com/](https://jakearchibald.com/)) site named [“Is Service Worker Ready”]([https://jakearchibald.github.io/isserviceworkerready/](https://jakearchibald.github.io/isserviceworkerready/)) but it is definitely a good idea to start using the API now

Conclusion
------------
With these new browser APIs, there has never been a better time to be developing for the web in my opinion. The list could continue: Web Bluetooth, WebVR, Shape Detection, WebAssembly, and Credential Management are APIs to keep your eye on as well. Without a doubt, the web as a platform remains a good bet and is progressively growing stronger. These APIs are worth everyone’s attention.