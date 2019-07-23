# HomeBridge Connect
The Android app for [HomeBridge](https://github.com/nfarina/homebridge)!

## What is HomeBridge?
"HomeKit support for the impatient"  
Homebridge is a lightweight NodeJS server you can run on your home network that emulates the iOS HomeKit API.  
It supports Plugins, which are community - contributed modules that provide a basic bridge from HomeKit to various 3rd - party APIs provided by manufacturers of "smart home" devices.  

## What is HomeBridge Connect?
HomeKit is iOS exclusive, the underlying technology however, is not. Not everyone in your home might use an iPhone, so this is an attempt to overcome that problem.  
HomeBridge Connect lets you control your HomeBridge from an Android device.  
HomeBridge Connect is still in its early stages and currently only supports ON/OFF toggles, but you 're more than welcome to contribute to the GitHub.  

 ## Setup
  - For this app to work, the first thing you'll need a working [HomeBridge](https://github.com/nfarina/homebridge) setup (obviously)
  - Then, make sure you're on the same network, and figure out the IP, port, and authorization pin of your HomeBridge. To avoid IP changes, you should consider assigning a static IP to your HomeBridge.
  - The app requires HomeBridge to be run in insecure mode. On your HomeBridge: edit your **/etc/default/homebridge** to run in insecure mode every time it starts. 
    - `HOMEBRIDGE_OPTS=-I -U /var/lib/homebridge`
    - Restart your homebridge for the changes to take effect: `sudo systemctl restart homebridge.service` or the equivalent command on your device.
    
## Troubleshooting/Error Reporting/Contributing
If you've followed the setup docs correctly and still can't get the app to work, you can open an issue on this repo and seek further assistance.  
If you'd like to contribute to the code, feel free to create a PR!

## PRs and Commit Template
PRs and commits that you make to this repo must include the following:  
- Type: bug-fix or enhancement
- Description: Brief description about what the commit achieves
- Notes: (heads ups/pointers to other developers if necessary)

<hr/>

## Changelog
### v1.0
- Initial release

<hr/>

