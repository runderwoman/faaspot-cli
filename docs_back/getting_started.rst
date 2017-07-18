Getting Started
===============

The following section describes some of the more common commands that you will
be using in your day to day interactions with ``fas``.


FaaSpot spot
------------

What Is FaaSpot Spot?
^^^^^^^^^^^^^^^^^^^^^

The concept of FaaSpot is that you run your functions on FaaSpot spot.
A FaaSpot spot is a `VM <https://en.wikipedia.org/wiki/Virtual_machine>`_ that can run your functions.
You can run multiple concurrent functions on one spot, but still,
the more spots that you'll have - the more concurrent functions you'll be able to run.

Having said that, to run a function in FaaSpot you will need at least one spot.

FaaSpot Spots Pool
^^^^^^^^^^^^^^^^^^

To add another spot to your spot`s pool, run the following command:

.. code-block:: sh

    $ fas spots add --wait

To see the current spots that you have:

.. code-block:: sh

    $ fas spots list

To remove one spot from your spot`s pool, run the following command:

.. code-block:: sh

    $ fas spots remove --wait

To run functions on FaaSpot, you will need to create a spot, that will run them.
In "real life" you'll probably have a running FaaSpot spot.
If you don't already have a FaaSpot spot, you need to increment your spots by 1..

.. note::
    What is the ``--wait`` parameter?

    By default, requests run in the background.
    Which mean that the request will return execution id.
    You can then check that execution status (completed or not), using the execution id (We'll cover it later on).

    You can run the command in a synced manner (wait until you'll have a response),
    using the ``--wait`` argument.


Samples
-------

FaaSpot Built-In Samples
^^^^^^^^^^^^^^^^^^^^^^^^

To make life easier, ``fas`` comes with some built-in samples.
The samples are very simple python script, that can be run on FaaSpot for a quick test.

* **hello-world function** -
 The hello-world function receive a name as input, and reply with hello.

* **get-content function** -
 The get-content function receive a url as input, download it's content, and return it.

* **sleep function** -
 The sleep function receive optional input that indicate the sleep time, and then returns some string.


Using Built-In Samples
^^^^^^^^^^^^^^^^^^^^^^

All the samples are available by the ``fas deployments samples`` command:

.. code-block:: sh

    $ fas deployments samples -h

The following command will create `hello-world.py` script, that we will later on create a FaaSpot Deployment from it:

.. code-block:: sh

    $ fas deployments samples --hello-world



Deployments
-----------

A FaaSpot deployment is a package of function to run, with optional meta-data:
requirements and context. We'll cover it later on, in the more advanced documentation.

Creating A New Deployment
^^^^^^^^^^^^^^^^^^^^^^^^^

To create deployment, you just need a python script that contain a function to run.
If you run the command from `Samples` section above, you already have a sample hello-world python script.

To create a deployment from it, need to run:

.. code-block:: sh

    $ fas deployments create hello --file hello-world.py

This command creates a new deployment, named hello, which contain the hello_world.py file.


Running A Deployment Synchronously
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Now we're ready to run the deployment function.
We'll use the `--wait` parameters, so the command will wait until the function complete,
and will return us the function result, and not the execution id.

.. code-block:: sh

    $ fas deployments run hello --parameters "name=user1" --wait


Running A Deployment Asynchronously
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

We just saw how to run the ``fas deployments run`` command in a synced manner (wait until you have a response),
using the ``--wait`` parameter.

By default, without ``--wait``, deployments will run in the background,
and the ``fas deployments run`` command will return the execution id of the task.
You can then check that status of the execution task (completed or not), using the ``fas executions get`` command.

For example:

.. code-block:: sh

    $ UUID=`fas deployments run hello --parameters "name=user1"`
    $ fas executions get $UUID


Running A Deployment - From A Script
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

We just saw how to run a deployment using the CLI, but sometimes we want to run deployments inside a script,
in that case the CLI is not the best practice.

luckily, there are 2 more options to send requests to FaaSpot.
You can also send REST API requests `manually`, using cURL for example:

In a Synchronously way:

.. code-block:: sh

    $ curl --header "Authorization: Token MY_API_TOKEN" https://rest.faaspot.com/api/sync/deployments/hello/rpc/?name=user1

In Asynchronously way:

.. code-block:: sh

    $ UUID_STR=`curl --header "Authorization: Token MY_API_TOKEN" https://rest.faaspot.com/api/deployments/hello/rpc/?name=user1`
    $ UUID=`sed -e 's/^"//' -e 's/"$//' <<< "$UUID_STR"`
    $ curl --header "Authorization: Token MY_API_TOKEN" https://rest.faaspot.com/api/executions/$UUID

And you can also use the python library, that comes together with the ``fas`` package:

.. code-block:: python

   from fas.commands.deployments import Deployments
   Deployments().run('hello', {'name': 'user1'}, wait=True)

And in Asynchronously way:

.. code-block:: python

   from fas.commands.deployments import Deployments
   from fas.commands.executions import Executions
   uuid = Deployments().run('hello', {'name': 'user1'})
   execution = Executions().get(uuid)
   print execution['status']

.. note::
    We used here some of the FaaSpot API, both directly, using cURL, and using the ``fas`` python-client.
    We will cover this APIs and all the different APIs later on in this documentation.