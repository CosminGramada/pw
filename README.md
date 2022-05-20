# Test architecture and flows

In order to speed up the development time without cutting on quality the following test approach has been put in place.

It follows the principles of the Testing Pyramid:


![alt text](https://martinfowler.com/articles/practical-test-pyramid/testPyramid.png "Testing Pyramid")


1. The Unit Tests block is validating that the individual components are working as expecting in an isolated fashion.

2. The Service / Integration Tests block is validating how the components are interacting with other code.
  The confidence that new code is released to the customers without issues is achieved by a set of API tests.

  [Technical considerations](src/api/README.md)

3. UI / End-to-end Tests is the block that is taking care of validating that from the end-user point of view everything is working as expected.

  [Technical considerations](src/ui/README.md)


Lastly it is required to make sure that the performance of the application wasn't affected by the latest changes.
In respect to this, a set of load tests will take care of assuring that the performance of the application has not decreased and it can take care of all the users using it.

  [Technical considerations](src/load/README.md)

# Continuous Integration and Deployment

Everytime a piece of code is being pushed to the central repository will trigger a pipeline that will take care of the following steps:

- building the code
- spin off a new test environment containing the new code
- execute all the above layers of tests from a docker image previously created during build time

Once everything has run successfully it can be released to customers.
