Installation
============

FaaSpot API
-----------

FaaSpot exposed REST api. You can call directly to the REST api, using `curl` for example,
or you can use the ``fas`` client.
The ``fas`` client can be used as a  `CLI <https://en.wikipedia.org/wiki/Command-line_interface>`_,
or as a python library, to be used in a python script.
The ``fas`` client will generate the REST api calls for you, via a nice interface.

Prerequisites
-------------

To send REST API commands to FaaSpot, you need to have username and and auth credentials: Api-Token or Password.
If you don't have a token, contact us.


Installing The Client
---------------------

The FaaSpot python client called ``fas``. Install via pip:

.. code-block:: sh

    $ pip install fas

.. note::
    Installing ``fas`` will provide both cli and python-client library.


Setting Up The Environment
--------------------------

Create a FaaSpot profile, that contains your FaaSpot token credentials.

.. code-block:: sh

    $ fas profiles create --token MY_API_TOKEN

.. note::
    The ``fas profiles create`` command will create a global configuration file located at ~/.faaspot folder,
    which contain the connection configuration to FaaSpot.

    You can also edit manually the ``~/.faaspot/conf.yaml`` file

