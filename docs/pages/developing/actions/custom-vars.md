<!-- panels:start -->

<!-- div:left-panel -->

You can create custom variable to use in your "Command to run" strings. To access custom variables:

Use <kbd>F1</kbd>, then search for "IBM i Custom variables":

<!-- div:right-panel -->

 ![F1 + IBM i Custom Variable](../../../assets/actions_custom_01.png)

<!-- panels:end -->

---

<!-- panels:start -->

<!-- div:left-panel -->
 
 Or from the User Library List browser:

<!-- div:right-panel -->

![Library List Browser](../../../assets/actions_custom_01a.png)

<!-- panels:end -->

---

<!-- panels:start -->

<!-- div:left-panel -->

In the **Work with Variables** tab, click on **New Variable** to add your variable.

Click on a custom variable to change it or delete it.

<!-- div:right-panel -->

![Variables list after Save](../../../assets/actions_custom_04.png)

<!-- panels:end -->

---

<!-- panels:start -->

<!-- div:left-panel -->

Here we are adding a variable named `&TARGET_RLSE`.

Press Save and the list of custom variables is shown.

<!-- div:right-panel -->

![Adding TARGET_RLSE](../../../assets/actions_custom_03.png)

<!-- panels:end -->

---

#### *Example Usage*

In all the  CRTBNDxxx actions add TGTRLS(&TARGET_RLSE), like this:

`?CRTBNDCL PGM(&OPENLIB/&OPENMBR) SRCFILE(&OPENLIB/&OPENSPF) OPTION(*EVENTF) DBGVIEW(*SOURCE)  TGTRLS(&TARGET_RLSE)`

Now a single change to the TARGET_RLSE custom variable can impact all the CRTBNDxxx actions.