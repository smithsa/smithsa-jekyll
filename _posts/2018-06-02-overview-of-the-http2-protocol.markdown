---
layout: post
title:  "Overview of the HTTP/2 Protocol"
date: 2018-06-02
categories: [web development]
tags: [http, http/2, http/1.1, spdy]
excerpt: In 2015, the HyperText Transfer Protocol (HTTP) underwent a major revision when HTTP/2 became officially standardized. With the protocol's last major update being in 1999 (HTTP/1.1), it was a much needed upgrade. The previous version of the protocol, HTTP/1.1, proved to posses numerous limitations for most modern websites.
---
Introduction
------------

In 2015, the HyperText Transfer Protocol (HTTP) underwent a major revision when HTTP/2 became officially standardized. With the protocol's last major update being in 1999 (HTTP/1.1), it was a much needed upgrade. The previous version of the protocol, HTTP/1.1, proved to posses numerous limitations for most modern websites. The average HTTP requests per page have risen dramatically overtime as well as page size. Simply put, HTTP/1.1 was developed to handle websites of its time and not of today. These limitations later led developers to use HTTP/1.1 in ways it was not meant to be used, causing developers to create workarounds which developed into best practices. For example, with HTTP/1.1 a client only has a limited number of TCP connections (6 connections) to a server, and each request requires one of those connections. With limited connections a request must wait for another to finish before being processed (HOL Blocking), resulting in a bottleneck for websites retrieving resources, slowing down performance. To solve this problem, file concatenation, image sprites, domain sharding, using gzip, and resource inlining became workarounds and best practices for this particular issue of HOL Blocking. These solutions proved to be hacks, not really solving the issue at hand, which was really at the protocol level.

In 2009, Google recognized these issues for their own operations of transporting web content and began working on an internal project called SPDY. SPDY was a network protocol that offered solutions to many of HTTP/1.1's shortcomings, ofadfering addresings issues o web security and improved page load latency. This protocol would later become the foundation of HTTP/2.

Fast forward to 2018, SPDY is deprecated and HTTP/2 is the new current version of HTTP with adoption increasing. HTTP/2 resolves the problems with HTTP/1.1 at the protocol level and provides faster performance for a website. The new protocol is backwards compatible and has the same semantics as HTTP/2, but improves how data is sent and what data is sent. The core features of HTTP/2 are multiplexing, binary framing, header compression, prioritization, and server push. With the update, many of the best practices developers utilize are invalidated and are detrimental to performance. These new core features of HTTP/2 will require new best practices for developers to utilize it benefits.

Multiplexing/Binary Framing/Stream Prioritization
-------------------------------------------------

First, let's talk about multiplexing and binary framing. HTTP/2 now technically utilizes a single TLS encrypted connection. While HTTP/1.1 uses a request/response pair, HTTP/2 uses a logical stream. These streams are put into binary frames, encoded in a binary format, and then put on the connection. Streams share the connection and the bandwidth of the connection (multiplexing). If one stream is in a blocking state, this does not prevent other streams from accessing the connection and it's resources. Additionally, a bonus, the client can specify dependencies and weight for each stream, this is called stream prioritization. But now with HTTP/2 multiple requests for data can be sent in parallel - multiple requests at the same time. HOL blocking is no longer a problem, where it was in HTTP/1.1. Now because requests are cheap, best practices for receiving more out of a request and reduce the number of requests, such as concatenation and spriting, no longer apply.

Header Compression
------------------

Another major issue with HTTP/1.1 pertained to the metadata sent in header. As a result of HTTP being stateless, redundant, long, and static information was sent across each request. One such examples is cookies and user agent data. In addition, the data sent in the headers was in human readable text. These two things combined created the issue of wasted of bandwidth. Developers tried to work around this issue by using gzip to compress the data that goes over the connection. But gzip only compresses the data and not the headers itself. Now with HTTP/2, headers can be compressed because they are seperated from the data. HTTP/2 compresses headers using a new technology specifically for HTTP header compression called HPACK. However with the use of HPACK, compression and decompression works on the connection, meaning more connections are counterproductive. Best practices such as domain sharding and use of multiple origins for cdns are no longer considered best practice for HTTP/2.

Server Push
-----------

Lastly, let's discuss the new push feature. With HTTP/2, the server can respond to a request that hasn't been sent yet. With this new feature, the server can send any asset or file to the client it thinks it will need. For example, the server can send the css and javascript file because it understands that the client will need it as well after an intial request from the browser is sent for the index.html. Once the client is ready to recieve those files pushed, it will be ready for the client waiting in the cache. Adding further additional optimization of speed.

Conclusion
----------

To take advantage of the new protocol, there are some new best practices to follow:

*   Reduce DNS Lookups
*   Reuse TCP connections, connections are expensive
*   Use a CDN but reduce the number of origins
*   Minimize number of HTTP redirects
*   Eliminate unnecessary metadata
*   Compress assets during transfer (let gzip compress on the server)
*   Cache resources on the client
*   Eliminate unnecessary resources. Fetch what you need. Bytes are expensive.

As stated previously, since 2015, the world wide web has seen increasing adoption of the new protocol. Companies such as Cloudflare, major hosting providers like Bluehost, and most majors browsers now offer support for the technology. If your site is using a TLS/SSL connection, and your servers from your hosting company support HTTP/2, it is likely that you are already using HTTP/2! Every connection starts out as HTP/1.1 then upgrades to HTTP/2 if all requirements are met. These three requirements must be met to use HTTP/2: (1) Server must support HTTP/2, (2) your application must use an HTTPS connection via TLS/SSL, and (3) the browser of a user must support HTTP/2. If at least one of the requirements are not met, then HTTP/1.1 is used. Developers should be looking to take advantage of the new upgrades provided by HTTP/2 as it's adoption continues to grow. It's essentially free optimization for your website!