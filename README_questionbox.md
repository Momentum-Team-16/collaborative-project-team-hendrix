# Questionbox

**IMPORTANT**: Please read this document closely. Many resources are linked within it. Before starting on your project, assemble a list of the tasks you think you need to do and discuss how you will tackle these together. The front-end will need to make some basic [wireframes](https://www.orbitmedia.com/blog/7-reasons-to-wireframe/#:~:text=for%20your%20website.-,Wireframes%20are%20simple%20black%20and%20white%20layouts%20that%20outline%20the,focusing%20on%20a%20site's%20structure).

## Description & Overview

This application is a question and answer platform, similar to Stack Overflow. It does _not_ have to be themed to code-related questions, though. Theming and design is up to you.

You may not be able to do ALL of the listed requirements. That is OK. Decide what the core functionality is and what you can wait to implement once you have the basics done.

### Back-end: The API

Backend devs will build an API using Django and Django REST Framework that allows users to create questions and answers to questions. Question-askers can mark an answer as accepted. Logged-in users can "star" or favorite a question or answer. Your application only needs to serve JSON, not HTML.

You will need to make a list of your endpoints available to the front-end devs on your team.

#### Minimum Requirements

- Allow an authenticated user to create a question (allowing for long-form text).
- Allow an authenticated user to create an answer to a question (one question can have many answers).
- Allow unauthenticated users to view all questions.
- Allow unauthenticated users to view a single question with all its answers.
- Have registration and token-based authentication for logging in and logging out.
- Allow a user to get a list of all the questions they have posted.
- Allow a user to get a list of all the answers they have posted.
- Allow the original author (ONLY the original author) of the question to mark an answer as accepted.
- Questions cannot be edited once they have been asked (_note_: allowing editing of unanswered questions is listed as an extra challenge).
- A question can be deleted by its author, whether answered or unanswered. If it is deleted, all associated answers should also be deleted.
- Users can search the database by supplying a search term. This should use [Django's PostgreSQL full-text search](https://docs.djangoproject.com/en/3.0/ref/contrib/postgres/search/).
    - At minimum allow a search in the text of a question.
    - A more comprehensive search would allow searching both questions and answers.
- Deployed to Render

### 🌶️ Spicy features

- Authenticated users can "star" or favorite questions or answers they like. They should also be able to un-star anything that they have starred.
- Add tags to questions and allow search by tags
- Allow a user to upload a profile photo.
    - for deployment, you'll need to configure a storage backend like Amazon S3 in order to upload files.
- Allow an unanswered question to be edited.
- Allow the author of an answer to delete or edit an answer.

### Back-end development notes

You should use [djoser](https://djoser.readthedocs.io/en/latest/) and [token-based authentication](https://www.django-rest-framework.org/api-guide/authentication/#tokenauthentication) to handle registration and login. You will also likely want to [paginate your results](https://www.django-rest-framework.org/api-guide/pagination/#pagination).

⚠️ Be sure to test that you have implemented permissions-checking correctly for these endpoints. For example, your API should not allow a user who is not the question-asker to mark the answer to a question as accepted.

### CORS

CORS (Cross-Origin Resource Sharing) headers must be added to your responses for the front-end app to interact with your API. [Read this blog post to find out how to set up CORS](https://www.stackhawk.com/blog/django-cors-guide/). You will want to use django-cors-headers (mentioned in the blog post) and set `CORS_ALLOW_ALL_ORIGINS = True`.

## Front-End: The React application

The front-end team will build a React application that will send AJAX requests to the QuestionBox API.

This application is a question and answer platform, similar to Stack Overflow in format, but you can theme it and design it however you like. This application should allow logged-in users to ask questions, give and receive answers, and mark an answer as accepted. Users that are not logged in should still be able to view questions and answers, but cannot ask questions, give answers, or mark answers as accepted.

### Minimum Requirements

- Users can create an account (i.e., register).
- Users can log in.
- Unauthenticated users can see all questions.
- Unauthenticated users can see the answers for a single question.
- Authenticated users can ask (post) a question.
    - A question cannot be edited.
    - A user can delete their own question.
- Authenticated users can post an answer a question.
- Authenticated users can mark an answer to their own question as "accepted". This should be indicated in the UI somehow.
- Authenticated users have a profile page that lists all their own questions and answers.
- Deployed to Netlify

#### Using React Router

Front-end routes are independent of back-end URLS. You can design the routes that make sense for your front-end application.

- Login and registration should each have a URL, or one for both if they are on the same page.
- The list of questions should have its own route.
- Consider having a route for one question where you display that question and all its answers.
- User profiles should have their own route.
- If implementing pagination, you will likely use routes to implement this.

### 🌶️ Spicy features

Most of these are dependent on whether the API supports these capabilities.

- Authenticated users can "star" a question or answer they like.
- Allow a user to "unstar" something they have previously starred.
- Allow users to search the API using a search term.
    - If your API supports tags, allow search by tags.
- The list of questions that comes back from the API may be paginated. If so, you should implement pagination in your application.
- Allow questions to be edited if they have not been answered.
- Allow users to show only the questions and/or answers they have starred.
- Allow users to follow/unfollow each other.
- Allow users to upload a profile photo.

### Front-end Development notes

During development of the front-end, you will want to be able to make requests before the API is complete. You can handle this in a few ways.

One way is to make functions or methods for all your API calls, but instead of having them actually make the calls at first, have them set the data you are expecting without actually making an API call. Another way is to use the provided exported mock API specification for [Mockoon](https://mockoon.com/), a tool that will run a mock server for you. You will need to [download Mockoon](https://mockoon.com/download/) and open [the file provided in this repo](questionbox-mockoon.json) (in Mockoon, select "Open environment" from the File menu). Here is documentation on [getting started with Mockoon](https://mockoon.com/tutorials/getting-started/). Here is [documentation on making API calls from your React app to Mockoon](https://mockoon.com/tutorials/react-api-call-and-mocking/).

If you use Mockoon, you may want to be able to switch which server you use based on the environment your code is running in. To learn about how to access your data based on environment, [read this article on create-react-app-environments](https://medium.com/@tacomanator/environments-with-create-react-app-7b645312c09d).

You can [read more about approaches to building your front-end before the API is done in this dev.to article](https://dev.to/momentum/how-to-build-a-front-end-app-before-you-have-an-api-3ai3).

You _can_ work with your backend dev(s) to get the back-end API running on your local machine, but you do not have to.

### CORS Gotcha on the front end

A gotcha for CORS on the front end is a missing trailing slash in your request URL. If CORS headers are set correctly on the backend but you are still getting a CORS error on the front end and it mentions a redirect, try adding a forward slash (`/`) to the end of the URL for the request that is failing.
