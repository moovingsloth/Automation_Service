# Node-with-React Full-Stack Web Application

## Table of Contents

- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Details](#details)



## Project Overview

이 애플리케이션은 사용자가 설문 조사를 작성하고 수신자 목록에 전송할 수 있도록 합니다. 

## Tech Stack

### Frontend

- **React**: A JavaScript library for building user interfaces.
- **Redux**: A predictable state container for JavaScript apps.
- **React Router**: Declarative routing for React.
- **Materialize CSS**: A modern responsive front-end framework based on Material Design.

### Backend

- **Node.js**: A JavaScript runtime built on Chrome's V8 JavaScript engine.
- **Express**: A minimal and flexible Node.js web application framework.
- **MongoDB**: A NoSQL database for storing survey data.
- **Mongoose**: An ODM (Object Data Modeling) library for MongoDB and Node.js.
- **Mailgun**: An email automation service for sending survey emails.

### Other Tools and Libraries

- **Passport**: Authentication middleware for Node.js.
- **Lodash**: A modern JavaScript utility library delivering modularity, performance, and extras.
- **Concurrently**: Run multiple commands concurrently.
- **Nodemon**: A utility that monitors for any changes in your source and automatically restarts your server.

## Details & Progress
- USER가 로그인 하지 않고, 설문조사를 이용하지 않는 경우, 제한하기 위해 requireLogin(미들웨어 함수)를 구현하여 라우트에 접근하는 것을 제한했습니다.
- 강의에서는 결제 API로 stripe, 메일 발송 API로 sendgrid를 사용하지만, 한국의 사용자에게 맞춰 
 



**NOTE**: 메일을 발송하는 기능은 실제로 작동합니다!

직접 로그인해서 기능을 이용하는 것은 환영하지만, 악용하진 마세요.

해당 코드는 강의 https://www.udemy.com/node-with-react-fullstack-web-development/learn/v4/content를 기반으로 작성되었습니다.

