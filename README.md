# SpiraTeam Webpanel for JIRA Cloud 

This plugin extends SpiraTeam's data sync feature with JIRA by providing an issue specific view of Spriteam information within a native JIRA web panel 

This project is built on top of the [Atlassian Connenct Express Project](https://bitbucket.org/atlassian/atlassian-connect-express)

Angular 1.4 is used on the front end 

## How to run

Clone the Repo 

npm install

node app.js

This will run ngrok to expose the web server running on your local enviroment, which allows you to upload your atlassian-connect.json file when running a developerinstance of JIRA Cloud 

## How to use 

First get your SpiraTeam data sync running with JIRA using the following:

[data sync guide](https://www.inflectra.com/Documents/SpiraTestPlanTeam%20External%20Bug%20Tracking%20Integration%20Guide.pdf)

After data sync is working. Go the the Settings of your JIRA project. There will be an admin tab called SpiraTeam API Acsess. Enter your SpiraTeam + Sync plugin, information there.

## Customize 

The Webpanel by default only presents test case coverage information from the corresponsding SpiraTeam Requirement, but you can customize it to add anything you want by doing the following:

1)Open the poster factory
2)The "response" parameter in the "set" function contains a set of information as expressed in the following documentation 

[API endpoint documentation](http://api.inflectra.com/Spira/Services/v4_0/RestServiceOperation.aspx?uri=projects%2f%7bproject_id%7d%2frequirements%2f%7brequirement_id%7d&method=GET)
