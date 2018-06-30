---
layout: post
permalink: /:title
title: "Scraping Client Side Rendered Data with Python and Selenium"
date: 2018-06-15
categories: scripting
tags: [python, selenium, automation, tutorial, web scraping]
excerpt: Scraping data from websites often offers a way to automate tedious tasks and improve productivity. However, many people run into issues when the content of a website is generated on the client side as opposed to the server-side.
---

Introduction
------------

Scraping data from websites often offers a way to automate tedious tasks and improve productivity. However, many people run into issues when the content of a website is generated on the client side as opposed to the server-side. For instance, content can not be retreived with just a HTTP request for websites that utilize AJAX to generate it's content. A web scrapper using only server-side requests would be unable to scrape the data of such a site because the HTML of the page does not load until the javascript of the site can be executed. Since the Javascript can only be executed on the client side, a request from the page would not include it's dynamic content.

To solve this problem, you can use a browser automation tool such as Selenium or PhantomJs in combination with your web scraper script. Using a browser automation tool, the HTML is able to be generated and thus read and parsed. In this tutorial, I will be showing you how to write a basic script to scrape client-side rendered content with Python and Selenium.

Remember before you scrape content or data from websites, ensure that you have legal rights to do so, read the site's terms of service agreement to see if scraping is allowed, and ensure that an alternative method for to retrieve the data does not exist, for example an API. In addition, check the robots.txt file and follow the rules for how frequently you are allowed to request pages and what pages are allowed to be scraped.

The Python Selenium library includes a HTML tree parser but we will use Selenium to load the page's content and BeautifulSoup to parse the HTML, since BeautifulSoup is Python's most popular parser.

Prerequisites
-------------

*   Python 2.7 programming environment available here ([https://www.python.org/downloads/](https://www.python.org/downloads/)){:target="_blank"}
*   MacOS or Linux Environment
*   Virtualenv available here ([https://pypi.org/project/virtualenv/](https://pypi.org/project/virtualenv/)){:target="_blank"}
*   pip, package manager for available here python ([https://pip.pypa.io/en/stable/installing/](https://pip.pypa.io/en/stable/installing/)){:target="_blank"}

Virtual Environment Setup
-------------------------

Before we start writing the script, we will first set up a virtual environment. Let's first create a directory for the project called simple-scrapper and navigate to the directory.
```terminal
    mkdir simple-scrapper
    cd simple-scrapper
```

Now we can create the virtual environment and activate the environment with the following:
```terminal
    virtualenv venv
    source venv/bin/activate
```

Installing Python Libraries
---------------------------

Next, we can install all the python modules and libraries we will need for the script with pip. We will need the selenium python bindings, BeatifulSoup4, and the requests library.
```python
    pip install selenium
    pip install BeautifulSoup4
    pip install requests
```

Downloading Selenium Driver
---------------------------

Now that we have all our libraries installed, we should download a driver for Selenium. The driver is required for Selenium to interface the browser you choose to use. For our purposes, we will use Chrome as our browser. You can download the latest release of the Chrome driver here: http://chromedriver.chromium.org/downloads. Download the appropriate zip file for your operating system, unzip the file, and you should find an executable file named "chromedriver." Put this file at the root of the "simple-scrapper" folder we just created.

The Web Scraping Script
-----------------------

We are now ready to start writing the scraper. Let's create a python file in at the root of the folder "simple-scraper" called "scrapper.py."
```terminal
    touch scrapper.py
```

Open the file with your preferred text editor and let's start writing the code to scrape a web page. For our purposes, I have created a basic page to scrape that has client-side rendered HTML. You can find the example file here: [http://sadesmith.com/examples/simple-scrapper/index.html](http://sadesmith.com/examples/simple-scrapper/index.html){:target="_blank"}. Lets quickly examine the content of the page. The page simply lists the names of basketball players on the 2018 Golden State Warriors Roster — there is one header and an unordered list. Our goal will be simple, scrape all the names of the roster and print them out once collected.

The first task will be to load the webpage using the driver we just downloaded. We will need to tell the WebDriver where the driver is located by setting the executable path on the Chrome class. Then we can request the webpage by using the get method of the driver.
```python
    import os
    from selenium import webdriver

    driver = webdriver.Chrome(executable_path= os.path.abspath('')+'/chromedriver')
    url = "http://www.sadesmith.com/examples/simple-scrapper/index.html"
    driver.get(url)
```

Next, we will need to tell the WebDriver to wait a few seconds before parsing the page. We will import the time module and use the sleep method. We will give the method the value of 3, thus the wait time will be 3 seconds.
```python
    import os
    from selenium import webdriver
    import time

    driver = webdriver.Chrome(executable_path= os.path.abspath('')+'/chromedriver')
    url = "http://www.sadesmith.com/examples/simple-scrapper/index.html"
    driver.get(url)
    time.sleep(3)
```

We are ready to parse but before we do that let's import beautiful soup.
```python
    from bs4 import BeautifulSoup
```
Now we can grab the content we need to parse. With the WebDriver loading the page, we can now view content loaded client-side. WebDriver's page_source will return the source code of the DOM as a string. We can use BeautifulSoup to parse the HTML string, with its HTML parser.
```python
    page_html = driver.page_source
    bsoup = BeautifulSoup(page_html, 'html.parser')
```

With the BeautifulSoup object, we can then use the library to its full extent. If you are unfamiliar with BeautifulSoup you can find more documentation here about how to parse: https://www.crummy.com/software/BeautifulSoup/bs4/doc/. For our example, we know that all the names on the Warrior's rosters are in an unordered list, in list item tag with the class name of "name". So we can grab all list item elements with the class attribute name then loop through them print them out.
```python
    player_names = bsoup.findAll('li', attrs={'class': 'name'});
    for player_name in player_names:
      print player_name.text
```

Wrapping it all up
------------------

We are done with the simple scrapper and your file should now look this:
```python
    import os
    from selenium import webdriver
    import time
    from bs4 import BeautifulSoup

    driver = webdriver.Chrome(executable_path= os.path.abspath('')+'/chromedriver')
    driver.get(url)
    time.sleep(3)

    page_html = driver.page_source
    bsoup = BeautifulSoup(page_html, 'html.parser')

    player_names = bsoup.findAll('li', attrs={'class': 'name'});
    for player_name in player_names:
        print player_name.text
```

Now let's run the project in the terminal! Make sure your current working directory is "simple-scrapper" and run the script.
```terminal
    python scrapper.py
```

If everything went well, you should see the names of the players on the 2018 Golden State Warriors printed in your terminal screen. We have accomplished our objective! Via our simple web scraper script, we were able to scrape HTML that was generated on the client-side using Selenium and Python.