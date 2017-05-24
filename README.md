## FaaSpot Python Client

[![PypI](http://img.shields.io/pypi/v/fas.svg)](http://img.shields.io/pypi/v/fas.svg)

### Overview

#### What is FaaSpot?

FaaSpot is a SAAS service that enables you to run functions as a service (FAAS), and reduce your monthly Cloud expenses.

#### How can we help you make significant cost savings?

You need us if you are using an expensive, powerful machine in AWS to run a small set of tasks multiple times.

With FaaSpot you can replace the expensive machine with a much smaller one, and use spot instances to run functions.
The cost of running four spot instances with a single CPU in much less then running one Amazon machine with four CPUs.
With us you'll get the same performance, for less, much less, money.

#### How can I use it?

You can access FaaSpot using the FaaSpot client from the CLI, directly from the Python script (as a library), or by using the proprietary REST API.
The FaaSpot’s command-line interface is the default method for interacting with FaaSpot and managing your functions.

Version compatibility: Python 2.7, 3.3-3.5

> <b>Note:</b>
>
> The communication with the FaaSpot webserver is encrypted and secured.

If you haven’t already obtained a FaaSpot API key, send us a request to info@faaspot.com.

### Installation

Run the following command:
```
pip install fas
```

### I want some code!

To test FaaSpot, you can try the following commands.

```
# Create a CLI profile, that contains your FaaSpot token credentials.
fas profiles create my_profile --username MY_USERNAME --token MY_API_TOKEN

# Create hello.py sample script
fas deployments samples --hello

# Create a new deployment with the hello.py script
fas deployments create hello --file hello.py

# For the example, create a spot that will run your deployments.
# In "real life" you'll probably have a running FaaSpot VM (spot).
# If you don't already have a FaaSpot VM, you need to increment your spots by 1..
fas spots add --wait

# run the deployment
fas deployments run hello -p "name=user1" --wait

# just for the example - remove the spot
fas spots remove --wait
```


### Usage

You can access the CLI by running the `fas` command in your terminal.
Use `fas -h` to display a list of all the commands and their descriptions.

<pre lang="shell"><code>$ fas -h
usage: fas [-h] [--version] {spots,deployments,executions,profiles} ...

positional arguments:
  {spots,deployments,executions,profiles}
                        Manage FaaSpot account
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
It sets the command verbosity level. There are three verbosity levels:

* Running a command without the verbose flag. (This is obviously the default).
* Running a command with `-v` will show DEBUG log statements of fas events.
* Running a command with `-vv` will, in addition, show DEBUG log statements of external libs, being used by fas.

### Configuration

A directory named .faaspot is created under ~(Home directory).
The directory contains a file named fasconf.yaml that contains the CLI configuration.
The file is created and managed by the CLI, but you can also customize the file according to your preferences.

## Profiles

The `fas profiles` command is used to manage your cli profiles on your local machine.
Each profile contain connection parameters to FaaSpot.
To send REST API commands to FaaSpot, you need to have username and and auth credentials: Api-Token or Password.

You can use the command to list, create, update, get, use, current, delete a specific profile.


#### Commands

* <b>list</b>: Retrieve all the profiles

* <b>create</b>: Create a new profile

* <b>update</b>: Update an existing profile

* <b>get</b>: Retrieve a specific profile

* <b>use</b>: Use a specific profile when communicating with FaaSpot

* <b>current</b>: Retrieve the current profile that is configured for use when communicating with FaaSpot

* <b>delete</b>: Delete an existing profile


## Deployments

The `fas deployments` command is used to manage your functions.
Each deployment must contain the function code, that you want to run.
In addition, each deployment may contain:
* A Requirements file, which must be in a python [pip requirements file format](https://pip.pypa.io/en/stable/reference/pip_install/#requirements-file-format)
* A context file, which must be a text file, where each line is in the format of: KEY=Value

You can use the command to list, get, create, update, delete, run a specific deployment.

The create, update, and run commands may take some time, therefore they start background execution in the FaaSpot server.
The return value of the create,update, and run commands will be the execution-id, which will require you to pull request the execution-id status, until the task completes.
Therefore, we provide the optional argument: `--wait`. Running the above commands with the `--wait` flag,
will run the status pull requests for you, and will return the output at the end of the task.

#### Commands

* <b>list</b>: Retrieve all deployments

* <b>create</b>: Create a new deployments

* <b>update</b>: Update an existing deployments

* <b>get</b>: Retrieve an existing deployment

* <b>delete</b>: Delete an existing deployment

* <b>run</b>: Run an existing deployment, with optional input parameters

* <b>samples</b>: Create sample script locally, that can be used for testing the deployment process


## Spots

The `fas spots` command is used to manage your spots.
You need at least one FaaSpot VM (spot) to run a function.
A FaaSpot spot is like a regular VM, but costs less.
The more spots that you have, the more times that you can run your function in a given period of time.

You can use the command to list, add, get, remove, update a specific spot.


#### Commands

* <b>list</b>: Retrieve all spots

* <b>add</b>: Increase the number of spots by one

* <b>update</b>: Update parameters for a given spot

* <b>get</b>: Retrieve info about a specific spot

* <b>remove</b>: Reduce the number of spots by one

* <b>refresh_ip</b>: Refresh spot instances public ip


## Executions

The `fas executions` command is used to manage your executions.

You can use the command to list executions and to cancel or retrieve information about a single execution.

#### Commands

* <b>list</b>: Retrieve all executions

* <b>get</b>: Retrieve info for a specific execution

* <b>cancel</b>: Cancel an existing execution
