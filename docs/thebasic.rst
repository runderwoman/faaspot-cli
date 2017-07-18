=========
The Basic
=========

This page provides a quick introduction to FaaSpot.


FaaSpot spots
=============

A FaaSpot spot is a `VM <https://en.wikipedia.org/wiki/Virtual_machine>`_ that can run your functions.
This VM is totally managed by FaaSpot. You can add or remove spots using FaaSpot API.
For more info, please read  the :ref:`spots` page.


Deployment
==========

A FaaSpot deployment is a package of function to run, with optional meta-data:
requirements and context. For more info, please read  the :ref:`deployments` page.


Making a Request
================

FaaSpot expose a set of REST API. You can call those APIs manually, using cURL for example,
or you can use the FaaSpot client, which wrap the HTTP calls with a user friendly interface.

You have multiple ways to send requests to FaaSpot:

- **Command Line Interface (CLI)**. For usage info, please read  the :ref:`CLI <cli>` page.

- **python-client**. For usage info, please read  the :ref:`python client <python_client>` page.

- **HTTP Requests**. You can manually send HTTP Request to the REST API. We'll cover the usage in the API sections in the documentation.


Async Requests
--------------

Some of the requests are being executed asynchronously.
When you run an asynchronously request, the result will be an execution id.
In that case you'll need to run another request to get that execution status,
in order to know if it's still in progress, or completed.

You can send synchronous requests, that will block the client until there will be a response.
In the CLI you can use the ``--wait`` parameter.


Concurrent requests
-------------------

You can send multiple requests concurrently, and send a bulk request at once.
This is a more advanced topic.
