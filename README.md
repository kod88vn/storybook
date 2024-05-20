[![Build Status](https://jenkins.corp.clover.com/job/web/job/apps/job/web-app-scheduling/job/main/badge/icon)](https://jenkins.corp.clover.com/job/web/job/apps/job/web-app-scheduling/job/main/)


# Scheduling Service
Micro front end for the Scheduling Service app in MICROAPP_HOST_REPO

This application is intended to run inside the Clover web dashboard.  You must run web-portal locally 
to develop this application.

## Quick Start

Install MICROAPP_HOST_NAME and run it
```
git clone git@github.corp.clover.com:clover/MICROAPP_HOST_REPO.git
cd MICROAPP_HOST_REPO

yarn install
yarn start
```
----
> #### !! First Run Instructions - READ AND REMOVE FROM THIS README !!
>
> If you have just created your micro app and want to run it locally
> before merging PRs or creating a developer app do this before running your micro app:
> 
> Create a file named `apps.local.json` in the root of MICROAPP_HOST_REPO with the following code:
> ```json
> [{
>     "name": "Scheduling Service",
>     "remotePackage": "web-app-scheduling",
>     "hostApps": [MICROAPP_ALLOWED_HOSTS],
>     "repo": "web-app-scheduling"
> }]
> ```
> Delete this file once you have completed the remaining micro app setup.
----

Install Scheduling Service and run it

```
git clone git@github.corp.clover.com:GHE_OWNER/web-app-scheduling.git
cd web-app-scheduling

yarn install
yarn start
```

Now you can view your micro app by navigating to its configured url path or by manually 
mounting it within the host application

## Production Builds

```
yarn build
```

