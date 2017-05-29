## FaaSpot Sync Client

### Overview

In order to run sync Faaspot deployment, you can use the following script.


### Install nodejs

Run the following commands to install Node 6
```
curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
sudo apt-get install -y nodejs
sudo apt-get install -y build-essential
```

### Install script requirments

Download `sync.js` script to some folder. Inside the folder with the script, run the following command
```
npm install
```

Set FAASPOT_TOKEN environment variable
```
export FAASPOT_TOKEN=<MY FAASPOT TOKEN>
```

### Run your deployment!

Run the nodejs script
```
node sync.js
```

And then call the run deployment request

```
http://localhost:5000/sync/deployments/hello/rpc?name=myname
```