Subscription Tracker API
Description
A backend service for users to track and manage recurring subscriptions—adding new plans, viewing payment calendars, receiving reminders, and monitoring monthly spend.

Tech Stack

Backend: Node.js + Express

Database: MongoDB (Mongoose models for User, Subscription, etc.)

Auth: JWT-based authentication

Scheduling: CRON jobs / worker queue for reminders

Validation: Joi schemas for API input

Testing: Jest / Supertest for endpoint testing
