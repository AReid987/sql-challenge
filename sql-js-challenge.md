# Sequelize Challenge

Use the lesson for reference as well as the documentation.

In the lesson, we did not cover _many to many_ associations. You will use appointments as a model to split each association into 1:N 

Perhaps look at the documentation on Commentable? 

## Objective: 

Using Node, Express, and Sequelize, your objective is to build a CRUD App for the following models:

1. Patient 
2. Doctor
3. Appointments

### Associations

* A doctor can have many patients
* A patient can have many doctors

* A doctor can have many appointments
* An appointment belongs to a doctor

* A patient can have many appointments
* An appointment belongs to a patient

## Setup Sequelize + PostgreSQL configuration

Verify success by running express server and `sequelize.authenticate()`

## Generate a template

Use `sequelize init`


## Create a schema for each model

You can choose the various fields that each model must have. 

The minimum fields for a doctor and patient are:
  * Name
  * Email

An appointment must have at the minimum:
  * Date
  
Obviously each model should have the appropriate associations.

## CRUD

Create a router for each model.

Each router should be be able to:
  - Create
  - Find All
  - Find One by Id
  - Update by Id
  - Delete by Id

Verify each step using Postman or seeing results through `res.send()`