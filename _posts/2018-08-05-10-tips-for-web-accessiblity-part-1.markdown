---
layout: post
published: true
title:  "10 Tips for Web Accessibility (Part 1)"
date: 2018-08-05
categories: [web development]
tags: [accessibility, a11y, wcag]
excerpt: Following the best practices for accessibility means you will be adhering to the best practices of the web. In this two-part series, I will be giving some practical development tips based on recommendations from the Web Content Accessibility Guidelines (WCAG) that you can use to develop more accessible websites.
---
## Introduction

The benefits of developing accessible websites undoubtedly weight the costs. First and foremost, all potential users are able to use your web application. Users with disabilities will be able to access information and perform tasks just as those without disabilities. Secondly, accessibility (a11y) best practices share similar practices with other web related best practices such as search engine optimization (SEO) and usability standards. Following the best practices for accessibility means you will be following the best practices of the web. In this two-part series, I will be giving some practical development tips based on recommendations from the Web Content Accessibility Guidelines (WCAG) that you can use to develop more accessible websites.

## 1. Use Native HTML Elements Properly

It is important that you use native HTML elements because they have accessibility benefits built-in. For example, using the button tag allows a button to be automatically indexed with the tab button and activated using the keyboard. If you were to not use the button tag and create your own button with a custom tag or div these benefits would not be afforded to you. Don’t recreate the wheel unless you have an extremely good reason. If you decide to create your own custom elements be sure to create keyboard accessibility and provide a tabindex attribute of 0.

In addition, your HTML should be written in a way that conveys the semantics of a given page. Good semantics help assistive technology devices, such as screen readers, perform their jobs by giving them a map of what is being parsed. You should consider using HTML5 semantic elements like header, nav, footer, aside, article, and section to structure your pages. Also, strive to use and structure these HTML elements correctly. Inconsistencies or improper structuring of your HTML can confuse and throw screen readers off.

## 2. Use Appropriate HTML Heading Tags
Along similar lines of the tip #1, you should use the appropriate HTML heading tag and ensure the correct order. With <code>h1</code> being the highest section level heading and <code>h6</code> being the lowest. In the scenarios that your designs do not contain a heading, you can add a header that describes the sections succinctly and then style the heading so that it does not visually appear on the screen. Adding heading tags allows assistive technology devices to understand what is on the page and are good for but also SEO. I like to use a special class for these instances (see example below).

```css
.a11y-hidden{
	position: absolute;
	z-index: -9999;
	width:1px;
	height: 1px;
	font-size: 0;
	border: 0;
	padding: 0;
	margin: 0;
	overflow: hidden;
	white-space: nowrap;
	clip: rect(0,0,0,0);
}
```
## 3. Use Background Images for Decorative Images
Some designs have images that don’t convey any information to the user and are there for style or decorative purposes. These images should be displayed using the CSS <code>background-image</code> property if possible. If you determine that an image tag is needed, then make sure that the <code>alt</code>  attribute is empty so that screen readers can skip over reading the image.

## 4. Don’t Remove CSS Outline
There are times when you create a link or a button and see a blue glowing outline on your element. Sometimes it clashes with the overall design, so to remove it developers change the outline CSS property to none. It’s a big accessibility no-no. It makes it difficult for those who do not use a mouse to see where they are currently at on a page if they are for instance tabbing through. In the cases, that you do decide that you can’t have that blue glow, go ahead and use <code>outline: none</code> in your CSS but also style the focused (:focus) state of the element in a way that clearly shows that it is selected. It is a good practice to style your focus states the same as your hover state.

## 5. Always Use a Meta Viewport Tag
Using a meta viewport tag is probably the easiest tip in this post to implement. If your website is missing this tag, mobile devices will render the pages at desktop widths, then scale the page for the mobile device. So the meta viewport tag will ensure that the page fits the width of the device. Google recommends using the following meta tag in the head of your pages:

```html
<head>
  ...
  <meta name="viewport" content="width=device-width, initial-scale=1">
  ...
</head>
```

## Wrapping It Up
As you can see, these are very simple tips to implement in your website to make them more accessible and provide an overall improvement. The best part, there’s More! Stay tuned for part 2, where we will continue going over practical tips for developing accessible websites. Getting into more accessibility principles, I will be touching upon ARIA, skip links, form labels, and font sizes.