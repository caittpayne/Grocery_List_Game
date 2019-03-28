# Grocery List Game

- <a href='#built'>Built With</a>
- <a href='#tech'>Technology Choices</a>
- <a href='#future'>Future Development</a>

<hr>

Grocery List Game is my implementation of a mock "take-home assignment" for the Bloc certification. I was tasked with creating a grocery list web-application that could be shared in real-time by multiple people. This assignment was to be completed in a week.

Requirements for this application included creating a full-stack application, with a front and back end. Features included authenticating users, implementing a database, syncing data in real-time, and a full test suite.

You can check out the live site <a href='#' target='_blank'>here</a>.

## Built With: <a id="built"></a>

- Node.js
- Express.js
- Jasmine
- React.js
- MongoDB
- Mongoose
- Reactstrap
- Heroku

## Technology Choices: <a id="tech"></a>

I choose to use the MERN stack (MongoDB, Express.js, React.js, & Node.js) for this application. In deciding which technologies to use, I wanted to work with those I was comfortable with, as well as challenge myself. I started by creating my unit and integration tests, then building out the back end RESTful API. After finishing that, I moved on to the front end of the application.

### Back End

For the server-side of the application, I chose to use Node.js and Express.js. I'm very comfortable with Node.js and really enjoy working with it. For unit and integration testing, I utilized Jasmine. I typically work with relational databases, such is PostgreSQL; however, I wanted to improve my skills with MongoDB and Mongoose. 

In retrospect, I should have implemented Socket.io straight away. Currently, I'm using polling on the client side to update the application in real time. I would like to update this in the future to use webscokets (Socket.io), as polling is very inefficient. 

### Front End

For the client-side of the application, I chose to use React.js. Although I've used React.js in past projects, I'm not as comfortable with it as I am Node.js. For styling, I opted to use Reactstrap, a React version for Bootstrap. I ran into a couple of time-consuming challenges when developing the React application - all great learning experiences!

In retrospect, I should have focused on the client-side of the application sooner than I did. I spent a lot of time implementing the back end (because I love it!), but found I ran out of time to implement all my ideas for the front end. 

## Future Development: <a id="future"></a>

Moving forward, I'd love to update the UI more to my liking. I'm currently using the default styles for Bootstrap; however, I'd like to customize the application more. As I said above, I would like to refactor the project to include Socket.io. My implementation to grab data works; however, it's very inefficient. 

In addition, I'd like to add a timer for the users, so they can compete to find the most items in a set amount of time. Users would have the option to "start the timer" and race to collect the most groceries. I wasn't able to implement this in the given time; however, this would be a simple feature to add in the future.
