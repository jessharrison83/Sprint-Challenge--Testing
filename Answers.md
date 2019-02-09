1. In Jest, what are the differences between `describe()` and `it()` globals, and what are good uses for them?

`describe()` wraps around a group of tests that are all related and point back to a specific element. `it()` wraps the tests for a particular feature of that element. I use `describe()` in levels: one for the main parent container and then other describe globals nested in that in relation to parent/child. Then each child `describe()` has a series of `it()` globals that describe the features that I'm testing of those elements.

2. What is the point of `Test Driven Development`? What do you think about this approach?

TDD allows you to map out how you want features to look/behave before you start to code so that when you begin coding, your tests catch errors immediately. This way you can know if the code is giving you the response you expect. I like this approach because I've found that just because a function works doesn't mean it's giving you what you thought it would. Sometimes it takes awhile to find that. I do find this type of testing extremely difficult for front end though.

3. Mention three types of automated tests.

Unit tests
Component testing
Snapshot testing
