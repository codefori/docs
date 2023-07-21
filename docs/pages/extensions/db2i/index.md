The Db2 for i is a seperate extension that allows users to browse database schemas, run statements, and more, on any connected system.

![](./main.png)

## Install

The extension can be [installed from the Marketplace](https://marketplace.visualstudio.com/items?itemName=HalcyonTechLtd.vscode-db2i) and is also part of the [IBM i Development Pack](https://marketplace.visualstudio.com/items?itemName=HalcyonTechLtd.ibm-i-development-pack).

### Server Component

As of 0.3.0, the Db2 for i extension requires a server component. The component provides improved performance and makes it easy for us to add better features. The Db2 for i extension will manage the server component installation when you connect to a system with Code for IBM i and will ask the user to confirm any installation or update. The server component is installed into `$HOME/.vscode`, which means a per-user installation. [The server component is also open-source](https://github.com/ThePrez/CodeForIBMiServer).

## Executing statements

Either:

* open an existing `.sql` file (source member, streamfile or local file)
* create a new file
    1. create a file (control / command + N)
    2. change the language ID to `sql`

After you have an SQL file open, you can either:

* Move your cursor onto the statement you want to execute and:
    * use the play button in the top right to execute
    * use the shortcut (control / command + R) to execute the statement

The result set will appear below the statement. As your scroll through the result set, more data will load. This is to speed up the performance of the query. When you run a statement, it will be prepended to the Query History view so you can access it again in the future.

SQL statements get executed with the active job selected in the SQL Job Manager view.

## SQL Job Manager

This view allows users to manage different SQL jobs, each with their own unique JDBC configuration. A new job can be created by clicking the database icon in the SQL Job Manage title bar. Or, if you have not created a new job before, there is a big button to do the same action.

![](./sqlJobManager-newJob.png)

Your active job will be marked with a highlighted icon. **The active job is what runs all statements** that powers the Schema Browser, content assist, user run statements, etc. You can change the active job by simply clicking between them. You will see the highlighted icon change to indicate the active job.

### Editing job configuration

You can use the pencil icon on any running job to edit the JDBC settings. Changing them and saving the changes will restart the job with the changes applied.

You are able to right click on any job to save those job settings for it be re-used later. Using the 'Save settings to config' right click item will prompt you to enter a name for that configuration. After that, you will see a 'Saved Configuration' node appear, with all your saved configs. Clicking on a saved config will launch a new job with those pre-defined settings. You can use the pencil icon on any saved configuration to edit it.

## Using the Schema Browser

The Db2 for i extension adds a view called Schema Browser which allows the user to add existing schemas to the list and will allow them to browse existing objects. You can right click on SQL objects to show more options. Each different SQL object type may have unique options. 

### Viewing table contents

If you are using the Schema Browser to browse objects, you are able to use the 'view' icon when hovering over a table, view, or alias item which will automatically open and execute a basic select statement.