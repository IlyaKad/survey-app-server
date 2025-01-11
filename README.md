# Personal Project: Microservices-Based Survey Application

This is an <ins>**ongoing personal project aimed at learning and experimenting**</ins> with microservices architecture, Docker, and related technologies such as JWT (JSON Web Tokens) and itc. **Currently, the project includes two microservices**: the *Survey Service* and the *User Service*.

## Table of Contents
- [Project Overview](#project-overview)
- [Microservices](#microservices)
- [Technologies Used](#technologies-used)
  - [Backend](#backend)
  - [Frontend](#frontend)
  - [Databases](#databases)
  - [DevOps](#devops)
- [General Note](#general-note)

## Project Overview

The goal of this project is to create a survey application where users can create, manage, and respond to surveys. The application is designed to be scalable and maintainable by leveraging a microservices architecture. Each service is responsible for a specific domain of the application, allowing for independent development, deployment, and scaling.

## Microservices

The application is composed of several microservices:

- **User Service**: Manages user authentication, registration, and profile management.
- **Survey Service**: Handles creation, management, and retrieval of surveys. Each survey can consist of multiple questions.
- **Question Service**: Manages individual questions within surveys. This service handles creating, updating, deleting, and retrieving questions.
- **Response Service**: Stores responses submitted by users for each survey/question.
- **Analytics Service**: Provides analytics and insights based on the responses collected from users.
- **Notification Service**: Sends notifications to users, such as reminders to complete a survey or notifications of new surveys available.

## Technologies Used

### Backend
- **Node.js**: Chosen for its non-blocking, event-driven architecture, which is ideal for building scalable network applications.
- **Express.js**: Selected for its minimal and flexible framework that provides a robust set of features for web and mobile applications.
- **TypeScript**: Used to enhance code quality and maintainability through static typing.
- **Mongoose**: Utilized for its powerful data modeling and validation capabilities with MongoDB.
- **Jest**: Chosen for its comprehensive testing capabilities, including support for unit testing.
- **JWT (JSON Web Tokens)**: Implemented for secure authentication and authorization.

### Frontend
- **React**: Chosen for its component-based architecture and efficient rendering, making it ideal for building dynamic user interfaces.
- **Redux**: Used for managing application state in a predictable manner.
- **Redux-Saga**: Selected for handling side effects in Redux applications, such as asynchronous actions.

### Databases
- **MongoDB**: Chosen for its flexibility and scalability, making it suitable for storing survey and user data.
- **Redis**: Used for caching to improve the performance of the application.

### DevOps
- **Docker**: Selected to ensure consistency across different environments by developing, shipping, and running applications in containers.
- **Docker Compose**: Utilized for defining and running multi-container Docker applications, making it easier to manage the microservices and their dependencies.

## General Note

This project is a work in progress and serves as a learning tool for me to explore and understand various technologies and architectural patterns. I am building this project to showcase my skills and knowledge to potential employers and to facilitate discussions about my approach to software development.

Feel free to explore the code, provide feedback, and discuss any aspects of the project with me.
