---
layout: post
published: true
title:  "Building a Blog With Jekyll"
date: 2018-10-15
categories: [web development]
tags: [jekyll, static site generator, web]
excerpt: A few months ago, I decided to convert my personal website, which was a static HTML site, to Jekyll. If you aren’t familiar with Jekyll, it’s a blog-aware static site generator built on Ruby. I wanted to create a blog for my website but wanted a lightweight solution. I considered a few content management systems but ultimately Jekyll came out on top.
---

## Introduction
A few months ago, I decided to convert my personal website, which was a static HTML site, to [Jekyll](https://jekyllrb.com/). If you aren’t familiar with Jekyll, it’s a blog-aware static site generator built on Ruby. I wanted to create a blog for my website but wanted a lightweight solution. I considered a few content management systems but ultimately Jekyll came out on top. The decision to convert over to Jekyll was an easy one, and after a few months of using it, certainly a decision I am happy with. In this blog post, I will discuss my experience with the static site generator, it benefits, and how you can get started using it.

## Experience with Jekyll

The first requirement I had for my site was that it should be static. If the site was static, then I could easily host it on Github and not have to worry about hosting fees in the future. The next requirement I was for the site to have a blog. However, I didn’t want to have to manually format and a page for each post. I essentially needed a content management system (CMS) for a static site. The first idea I had was to use a CMS like WordPress and access its API writing some reusable code to get posts and it’s metadata. But I didn’t want to have to worry about managing calls to an API which was all too complex for a simple blog. I also realized that for CMSs like WordPress I would have to pay to host an installation of that CMS. So an option like WordPress or Drupal was out of the picture for me. Luckily, I did more research and Jekyll came to my attention — it was a perfect match. A simple, blog-aware, and static site generator was just what I needed. Plus it was an added bonus that [Github Pages](https://pages.github.com/) are powered by Jekyll so I could easily deploy the site with Github for free.

It’s important to note, at this point, I already had a developed static site. I just needed something to manage blog posts for the site. The task at hand was to transfer it into Jekyll. It took less than a day to familiarize myself with its structure and my blog was up and running within a few days. Experience developing countless themes and familiarity with the Liquid templating language, helped me pick up Jekyll quickly. There were some things I had to learn like YAML, formatting in Markdown, and how the plugin system worked. However, they were easy to learn, and I picked those up in no time as well. You certainly don’t need prior experience to get going but it helps!

## Advantages of Jekyll
Before I show you how you can get started, I will list some of the advantages of using Jekyll.

### Free Hosting
The greatest advantage for me by far. Simply put your Jekyll site in a Github repository and you will have free hosting for your blog. If you are using Github for your version control already, then it makes sense to use it for your free hosting as well -- two birds, one stone.

### Speed
Static files load a lot faster than dynamic files which sometimes have to wait for database queries and API calls. With Jekyll, only the files that are needed are being served.

### Simplicity
You don’t have to worry about databases or bulky user interfaces provided by a CMS. Jekyll only includes what you need.

### Security
The absence of a database eliminates the risk of common security threats such as SQL injections. Your attack surface is drastically reduced.

## Getting Started
Requirements
Ruby version 2.2.5 or above https://www.ruby-lang.org/en/downloads/
Ruby Gems https://rubygems.org/pages/download

## Installation

1. Install Jekyll and the bundler gem (manages the application’s dependencies)
	```
	gem install jekyll bundler
	```

2. Create your new Jekyll site
	```
	jekyll new your-blog-name
	```

3.  Navigate to your newly created Jekyll project
	```
	cd your-blog-name
	```

4.  Serve your new Jekyll project on a local server
	```
	bundle exec jekyll serve
	```
	Open  [http://localhost:4000](http://localhost:4000) in your browser to view your new site.


## Configuration
Jekyll uses YAML, a human-readable data serialization language, for its configuration file. The file can be found at the root level of your project and it is titled `_config.yml`. If you need to reference more options the [default configuration](https://jekyllrb.com/docs/configuration/default/) can be found in Jekyll’s documentation. But you can edit the title, email, and description in the file to begin with. Additionally, if you wanted to use a theme or plugin, or just wanted to change the type of Markdown being used you would edit those settings in this file.

## Pages
Pages in Jekyll are either Markdown or HTML documents and are used for stand-alone content. You can add a page by adding either document types to the root level of your project. If you use a Markdown file, the file will be converted to HTML during its build which can be found in the `_site` folder. You can also create subpages by placing your files for your subpages in a folder, titled the parent page. Then create the parent page in a file title *index*.

## Templating and Layouts
As mentioned previously, [Liquid](https://shopify.github.io/liquid/) is used for the templating system. In the pages of the project file, you might see statements wrapped in curly braces. Output statements are surrounded by the double curly braces while logic statements are encapsulated in the curly braces and percent sign. You can add Liquid statement in your pages and layouts.

Layouts are templates that surround your content, for example, a layout could include your top navigation and footer. The Layouts live the `_layouts` directory. Layouts are helpful because you don’t have to copy and paste the code for recurring components of your website (e.g. footer) for every page.

Additionally, in your layouts and pages, you are given more tools to template pages with Includes. Includes in Jekyll are template parts which live in the `_includes` folder. The includes can either be HTML or Markdown files. To use the include you would simply reference its name with the following:
```
{% include header.html %}
```

## Posts
The posts of your Jekyll site live in the `_posts` folder. Jekyll states that typically posts are written in Markdown but HTML is also supported. I exclusively use Markdown, I find that it is easiest to maintain. If you need help in formatting Markdown, I’ve found this [Markdown cheatsheet](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet) on github created by [Adam Pritchard](https://crypti.cc/) to be a great resource. Each file name should follow this specific format where ‘YEAR’ is the four-digit year number, `MONTH` and `DAY` are two digit numbers reflecting each respectively, and Markup is the file extension :
```
YEAR-MONTH-DAY-title.MARKUP
```

At the top of every post will be YAML front matter, which Jekyll uses for maintaining metadata throughout the site (You might have noticed it on the pages). All posts must use this format for its metadata. The most basic front matter will include the layout and title.
```
layout: post
title:  "Welcome to Jekyll!"
```
Following the post’s metadata is the content of the post.

## Assets and Static Files
Lastly, Jekyll provides built-in support for Sass and CoffeScript. Sass files should live in a `_sass` folder. The stylesheets will be output to a `css` folder when the build runs. To use CoffeeScript a gem is required. For more information you can read [Jekyll’s documentation on how to use Sass and CoffeScript](https://jekyllrb.com/docs/assets/).

Alternatively, you can serve your JavaScript and CSS as static files. Static files can be PDFs, Javascript and CSS files, images, etc. Any content that does not need to be rendered. Static files are accessible via Liquid: `site.static_files`. To serve your static files, you can use `{{site.url}}` and follow it by the path to the file as well.


## Conclusions
Jekyll is easy to get started with and provides you with a lightweight alternative to using a CMS if you are building a blog. You get speed, simplicity, better security than a CMS, and an added bonus of free hosting with Jekyll! Converting over to Jekyll for my website was a great decision and one I do not regret a bit because of its ease of use and benefits. I would recommend it to anyone who wants to create a blog.