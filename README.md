## FaaSpot CLI

[![PypI](http://img.shields.io/pypi/v/fas.svg)](http://img.shields.io/pypi/v/fas.svg)

### Overview

#### What is Faaspot?

Faaspot is as SAAS service which allows you to run function-as-a-service,
in a way that will help you to control and to reduce your monthly cloud expenses.

When can we help you save lots of money? in case you are using expensive strong machine in Amazon,
in order to run lots of times small set of tasks.
With Faaspot you can replace the expensive machine with a small one, and use spot instances in order to run functions.
The price of 4 instances with 1 cpu in much lower then 1 amazon machine with 4 cpu.
With us you'll get the same performance, for less, much less, money.

#### How can I use it?

You can use direct rest-api, or to use this FaaSpot python client.
This FaaSpot python client can be used as a CLI or as a python library,
The Faaspot’s Command-Line Interface is the default method for interacting with Faaspot and managing your functions.
It allows you to use it as a standard cli commands and also to import it as a python package in your python script,
in order to manager you functions directly from your script.

Version compatibility: Python 2.7,3.3-3.5

> <b>Note:</b>
>
> The communication with the Faaspot webserver is encrypted and secured.

If you haven’t already got a Faaspot api key, now would be a good time to do so.

### Installation

```
pip install fas
```

### I want some code!

In order to test Faaspot, you can try the following commands.

```
# create a cli profile, that holds your Faaspot token credentials.
fas profiles create profile my_profile -t MY_API_TOKEN

# use it,,
fas profiles use my_profile

# create hello.py sample script
fas deployments samples --hello

# create a new deployment with the hello.py script
fas deployments create hello --file hello.py

# just for the example - cretae a spot that will run your deployments
# in "real life" you'll probalbly have a running spot.
fas spots create --wait

# run the deployment
fas deployments run hello -p "name=omer" --wait

# just for the example - remove the spot
fas spots delete --wait
```


### Usage

You can access the CLI by running the `fas` command in your terminal.
Use `fas -h` to display a list of all the commands and their descriptions.

<pre lang="shell"><code>$ fas -h
usage: fas [-h] [--version] {spots,deployments,executions,profiles} ...

positional arguments:
  {spots,deployments,executions,profiles}
                        Manage faaspot account
    spots               Manage spots
    deployments         Manage deployments
    executions          Manage executions
    profiles            Manage profiles

optional arguments:
  -h, --help            show this help message and exit
  --version             show program's version number and exit
</code></pre>

### Verbose Output

The `-v/--verbose` flag is available for all commands.
It sets the command verbosity level. At the moment, there are 3 verbosity levels:

* Running a command without the verbose flag. (This is obviously the default).
* Running a command with `-v` will show DEBUG log statements of fas events.
* Running a command with `-vv` will, in addition, show DEBUG log statements of external libs, being used by fas.

### Configuration

A directory named .faaspot is created under ~(Home directory).
The directory contains a file named fasconf.yaml that contain the cli configuration.
The file is being created and managed by the cli, but you can also customize the file according to your preferences.

## Profiles

The fas profiles command is used to manage your cli profiles on your local machine.
Each profile contain connection parameters to Faaspot.
In order to send reset api commands to Faaspot, you need to have Username and auth credentials: Api-Token or Password.

You can use the command to list,create,update,get,use,current,delete a specific profile.


#### Commands

* <b>list</b>: Retrieve all the profiles

* <b>create</b>: Create a new profile

* <b>update</b>: Update an existing profile

* <b>get</b>: Retrieve a specific profile

* <b>use</b>: Use a specific profile when communicating with Faaspot

* <b>current</b>: Retrieve the current profile that configured to be used when communicating with Faaspot

* <b>delete</b>: Delete an existing profile


## Deployments

The fas deployments command is used to manage your functions.
Each deployment must contain the function code, that you want to run.
In addition, each deployment may contain:
* A Requirements file, which need to be in a python [pip requirements file format](https://pip.pypa.io/en/stable/reference/pip_install/#requirements-file-format)
* A Context file, which need to be a text file, where each line is in the format of: KEY=Value

You can use the command to list,get,create,update,delete,run a specific deployment.

The create,update, and run commands may take some time, this is why they are starting a background execution in the Faaspot server.
The return value of the create,update, and run commands will be the execution-id, which will require you to pool request the execution-id status, until the task complete.
This is why we have the optional argument: `--wait`. Running the above commands with the `--wait` flag,
will do the execution status polling request for you, and will return the output at the end of the task.

#### Commands

* <b>list</b>: Retrieve all deployments

* <b>create</b>: Create a new deployments

* <b>update</b>: update an existing deployments

* <b>get</b>: Retrieve an existing deployment

* <b>delete</b>: Delete an existing deployment

* <b>run</b>: Run an existing deployment, with optional input parameters

* <b>samples</b>: Create sample script locally, that can be used for testing the deployment process


## Spots

The fas spots command is used to manage your spots.
You need at least one spot in order to run a fcuntion.
Spot is the vm that run your functions. It's like a regular vm, but costs less.
The more spots that you'll have, you'll be able to run your function more times in a given period of time.

You can use the command to list,create,get,delete,update a specific spot.


#### Commands

* <b>list</b>: Retrieve all spots

* <b>create</b>: Create a new spot

* <b>update</b>: Update parameters for a given spot

* <b>get</b>: Retrieve info about a specific spot

* <b>delete</b>: Reduce the number of spots by 1


## Executions

The fas executions command is used to manage your executions.

You can use the command to list executions and to cancel or retrieve information about a single execution.

#### Commands

* <b>list</b>: Retrieve all executions

* <b>get</b>: Retrieve info for a given executions

* <b>cancel</b>: Cancel an existing execution
