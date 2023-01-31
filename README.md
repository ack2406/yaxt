# Yet Another Exam Tester

YAXT is a simple exam tester in your website. It is written using MERN stack (MongoDB, Express, React, Node.js) and TypeScript.

## Demo

You can find a demo of the app [here](https://yaxt.acik.pl/).

## Installation

### Prerequisites

- Node.js
- MongoDB

### Steps

1.  Clone the repository

    ```bash
    git clone https://github.com/ack2406/yaxt.git
    cd yaxt
    ```

2.  Install dependencies for the server

    ```bash
    cd server
    npm install
    ```

3.  Create a `.env` file in the `server` directory and add the following environment variables

    ```bash
    MONGO_URI=<your_mongo_uri> # e.g. mongodb://root:root123@localhost:27017/yaxt
    PORT=<your_port>
    JWT_SECRET=<your_jwt_secret>
    ```

4.  Start the server

    ```bash
    npm start
    ```

5.  Install dependencies for the client

    ```bash
    cd client
    npm install
    ```

6.  Create a `.env` file in the `client` directory and add the following environment variables

    ```bash
    VITE_API_URL=<your_api_url> # e.g. http://localhost:5000
    ```

7.  Start the client

    ```bash
    npm start
    ```

8.  Open `http://localhost` in your browser

## Usage

### Adding a test

1.  On the homepage, expand the burger menu and click on the `Settings` button.
2.  Insert your token (you can find it in the `server/.env` file) and click on the `Submit` button.
3.  Click on the `Add test` button in the burger menu.
4.  Insert the test name and the test questions and click on the `Submit` button.
5.  You can now take the test.

### Taking a test

1.  On the homepage, click on the test you want to take
2.  Solve the test and become smarter

## Screenshots

### Homepage

![Homepage](https://i.imgur.com/Fezl8rE.png)

### Test

![Test](https://i.imgur.com/S04lVNP.png)

### Answered test

![Answered test](https://i.imgur.com/hBfEicx.png)

### Add test

![Add test](https://i.imgur.com/YEe9N6t.png)

## License

[MIT](https://choosealicense.com/licenses/mit/)
