
.. _cli:

============================
Command Line Interface (CLI)
============================

Overview
--------

The FaaSpot command-line interface (CLI) is the default method for interacting with FaaSpot, to manage your functions.

For installation instruction, please refer to the :ref:`installation` section.

Usage
=====

You can access the CLI by running the ``fas`` command in your terminal.
Use ``cfy -h`` to display a list of all the commands and their descriptions.

.. code-block:: sh

    $ fas -h
    usage: fas [-h] [--version] {spots,deployments,executions,profiles} ...

    positional arguments:
      {spots,deployments,executions,profiles}
                            Manage faaSpot account
        spots               Manage spots
        deployments         Manage deployments
        executions          Manage executions
        profiles            Manage profiles

    optional arguments:
      -h, --help            show this help message and exit
      --version             show version number and exit


Verbosity Level
===============

Any command in the CLI have the option to show you the command logs.
You see that option on the help message for the command, for example: ``fas spots list -h``

The verbosity levels are:

- **-v** Print debug messages.

- **-vv** Additionally print 3'rd party info log messages (of utils that are being used by ``fas``).

- **-vvv** Additionally print 3'rd party debug log messages.


.. note::
    In case you want to use directly HTTP requests, you can run a command using ``-vvv``.  It will show you the http requests that been used.