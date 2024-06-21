# Meeting Room Booking System for Co-working Spaces

## Project Overview

This project is a web application designed to streamline the booking process for co-working spaces. It allows administrators to manage room inventories and available time slots, while users can easily book rooms for their meetings and discussions. The backend has been developed using the following models:

- **User Model**
- **Room Model**
- **Slot Model**
- **Booking Model**

### Admin Actions

Administrators can:

- Create, update, and delete rooms with details like room name, room number, floor number, capacity, price per slot, and available amenities.
- Create time slots for each room, specifying the date, start time, and end time.
- Manage the co-working space inventory and slot availability through the web interface.

### User Interactions

Users can:

- Create bookings by selecting available time slots for their desired meeting times.
- Input the date and select specific slots for their sessions, along with their preferred room selection.
- Receive real-time feedback on room and slot availability to ensure smooth booking experiences without conflicts.

The application includes robust validation and error handling mechanisms to ensure reliability and provide users with informative messages in case of booking conflicts or validation errors.

## Project Server Link

The project is deployed on Vercel: [ROOMEET](https://roomeet.vercel.app)

## Technology Stack

- **Programming Language**: JavaScript & TypeScript
- **Web Framework**: Express.js
- **ODM**: mongoDB & Mongoose
- **Validation Library**: ZOD
- **Authentication**: bcrypt, jsonwebtoken
- **Environment Variables**: dotenv
- **Middleware**: cookie-parser, cors
- **HTTP Status Codes**: http-status

## How to Clone, Install, and Run the Project

Follow these steps to get the project up and running on your local machine:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/ApurbaHasanJ/ROOMEET.git
   cd ROOMEET
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Run the project**:
   ```bash
   npm run start:dev
   ```

For additional commands, please refer to the `package.json` file.

## Contact

For any inquiries or further information about the project, please contact the author:

- **Email**: [ornilhasan.oht.riyad@gmail.com](mailto:ornilhasan.oht.riyad@gmail.com)
- **Website**: [mdhasan-portfolio.vercel.app/](https://mdhasan-portfolio.vercel.app/)

---

Thank you for using the Meeting Room Booking System!