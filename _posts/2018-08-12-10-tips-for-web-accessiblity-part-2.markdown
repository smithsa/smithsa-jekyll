---
layout: post
published: true
title:  "10 Tips for Web Accessibility (Part 2)"
date: 2018-08-12
categories: [web development]
tags: [accessibility, a11y, wcag]
excerpt: In the previous article, “10 Tips for Web Accessibility (Part 1)” we covered the first five tips I have for creating accessible websites. In this post, I will continue to list off the remaining five tips. In the last five tips, I will cover skip links, ARIA, form labels, and font sizes.
---
## Introduction

 In the previous article, [“10 Tips for Web Accessibility (Part 1)”](http://www.sadesmith.com/2018/08/05/blog/10-tips-for-web-accessiblity-part-1/), we covered the first five tips I have for creating accessible websites. In this post, I will continue to list off the remaining five tips. In the last five tips, I will cover skip links, ARIA, form labels, and font sizes.

## 6. Create Skip Links

Skip links allow users who are not using a mouse and are tabbing through the page to bypass links in sections like the navigation and go directly to the main content of the page. In addition, these links can save time for those who are using a screen reader because the reader will want to read aloud links in the navigations it traverses. So it is recommended that skip links are created. They should be at the top of your tab index and not appear to users who are not tabbing or using a screen reading device. [John Kantner](https://jonkantner.com/) offers a great skip link example below:


<iframe height='265' scrolling='no' title='Skip Link Navigation' src='//codepen.io/jkantner/embed/zqJJdW/?height=265&theme-id=0&default-tab=html,result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/jkantner/pen/zqJJdW/'>Skip Link Navigation</a> by Jon Kantner (<a href='https://codepen.io/jkantner'>@jkantner</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>



## 7. Use ARIA Attributes When Appropriate
ARIA attributes communicate with assistive technology devices the role (i.e. user interface pattern), property (i.e. label name) , and state (i.e. pressed) of your HTML elements. When native HTML elements will not meet your needs and further modification is required, then you should use ARIA. They provide semantics to elements when they are missing. Using ARIA is most useful in scenarios where you need to (1) signify a landmark such as a search area or navigation, (2) when you update content dynamically, (3) add keyboard accessibility, and (4) use custom complex UI controls. It’s important to note that ARIA modifies the accessibility tree but not the DOM itself thus does not change its behavior. Lastly use ARIA with discretion, you should avoid redundancy of defining an element’s role, for example you do not need to use an ARIA attribute of radio (<code>role=”radio”</code>) on an input with the type radio (<code><input type=”radio”></code>). In addition, elements should not have aria attributes that interfere with their semantics (list of attributes allowed on each HTML element.)[https://www.w3.org/TR/html-aria/#docconformance] (For more information on ARIA, Mozilla offers a great comprehensive (ARIA guide)[https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA] with examples.

## 8. Use ARIA Pressed Attribute for Active States
There are instances where you need to communicate the active state of a button or link. For example, navigation menus often have an active state to signify a current page or tabbed content usually has an active tab to indicate the current content being displayed. Often, an active class is used in these instances. However, classes are not in the accessibility tree and screen readers are unable to read classes thus unable to detect the active state. To solve this issue, you can use the ARIA attributes <code>aria-pressed</code> and <code><aria-label</code>. When the active button is pressed you can set the <code>aria-pressed</code> attribute to true, false otherwise. You can also give the active button or link a label of the current page with the ARIA attribute <code><aria-label</code>. Additionally, you can style the CSS <code>[aria-pressed=”true”]</code> selector for those elements instead of the active class. See the following example below: 


<iframe height='265' scrolling='no' title='Accessible Current Section Example' src='//codepen.io/smithsa/embed/XBPqae/?height=265&theme-id=0&default-tab=html,result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/smithsa/pen/XBPqae/'>Accessible Current Section Example</a> by Sade Smith (<a href='https://codepen.io/smithsa'>@smithsa</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>


## 9. Always Use Labels for Form Inputs
Forms built improperly can be difficult to navigate if a user is using a screen reader or keyboard, making it difficult for those with disabilities to carry out the task of filling out a form. One pain point is the lack of description provided for form inputs. All form fields should include a label tag to accurately describe what is required for the form field. Often, a design does not include a label but a placeholder instead. However, developers should not use placeholders in lieu of labels. An alternative to just using placeholders is to use float labels, see the example below. You can even use the <code>.a11y-hidden</code> visibility code we covered in [part 1](http://www.sadesmith.com/2018/08/05/blog/10-tips-for-web-accessiblity-part-1/).

<iframe height='265' scrolling='no' title='Float Label Example' src='//codepen.io/smithsa/embed/GBdXQN/?height=265&theme-id=0&default-tab=css,result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/smithsa/pen/GBdXQN/'>Float Label Example</a> by Sade Smith (<a href='https://codepen.io/smithsa'>@smithsa</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>


## 10. Use Relative Font Sizes
The World Wide Consortium recommends that your fonts use relative font units such as em, percentages, or rem. This allows user agents to scale the font sizes more effectively if needed. As a rule of thumb, the font size needs to be able to scale to at least 200% and still be visible and legible to the user. Modern browsers are usually able to meet this requirement even with fixed font units like pixels and pt but it is generally a good practice to use relative units.

## Conclusion
The web has become an invaluable resource to many and an integral part of our everyday lives. It’s important that the web is a resource available to all, including those who are differently abled. It should provide equal access and opportunity. With this in mind, developers should strive to develop applications adhering to fundamental accessibility best practices, putting the user experience of all users at the forefront of their mind. Using these tips as a baseline will help ensure that everyone has the same access. For more information on the topic of web accessibility, I recommend reading the [WCAG quick reference](https://www.w3.org/WAI/WCAG21/quickref/?versions=2.0) provided by the World Wide Consortium and looking into the [accessibility resources](https://www.google.com/accessibility/for-developers.html) that Google provides for developers on accessibility.