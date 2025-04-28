
# Task-Finder

Task-Finder is a task management and team collaboration tool where users can create projects, assign tasks to teams and owners, set deadlines, and organize work using tags. It supports authentication, dynamic filtering, URL-based queries, and reporting features to track task progress and team productivity.

[For Backend Code Refer](https://github.com/Karan-Bharti1/TFB)

## Author

- [@Karan-Bharti1](https://github.com/Karan-Bharti1)

  ## 🚀 About Me
Hi there! 👋.
I am currently learning Full Stack Web Development with a focus on the MERN stack (MongoDB, Express.js, React, and Node.js). I'm passionate about building dynamic, user-friendly web applications and continuously improving my skills.

## Tech Stack

**Frontend:** React, React Router for URL-based filtering, Axios for API calls, Chart.js for visualizations,Redux-Toolkit for state management.

**Backend:** Express.js with RESTful APIs, Mongoose for database interactions with MongoDB.

**Database:** MongoDB with models for leads, sales agents, comments, and tags.

## Key Features

### Login
- Provides a form for users to log into the application.
- **Fields:**
  - **Email:** The user's registered email address.
  - **Password:** The user's account password.
- Validates user credentials and stores a JWT token in `localStorage` upon successful login.
- Displays error messages for invalid login attempts.

### Signup
- Allows new users to register for an account within the application.
- **Fields:**
  - **Name:** The user's full name.
  - **Email:** The email address for authentication.
  - **Password:** A secure password for the account.
- Sends user details to the backend API to create a new account.
- Displays appropriate success or error messages based on the backend response.

### Authentication Handling
- The application checks for a valid JWT token stored in `localStorage` to confirm user authentication.
- Users attempting to access protected routes without authentication are redirected to the login page.
- Logout functionality clears the token and redirects the user back to the login screen.

### Task Form
- A form to create a new task with various input fields.
- **Fields:**
  - **Task Name:** Name/title of the task.
  - **Project Name:** Dropdown to select the associated project.
  - **Owners (Team Members):** Multi-select dropdown for assigning team members.
  - **Team:** Dropdown listing teams fetched dynamically from the backend (Sales, Marketing, Development, Finance).
  - **Tags:** Multi-select system for tagging tasks (e.g., "Urgent", "Bug").
  - **Time to Complete (days):** Number input specifying estimated completion time.
  - **Status:** Dropdown with options: *To Do*, *In Progress*, *Completed*, *Blocked*.
- Submit button sends the task data to the API to create a new task.

### Task List
- Displays a list of tasks with key filters and sorting options.
- **Filter Options:**
  - **Owner:** Filter tasks by team member.
  - **Team:** Filter tasks by associated team.
  - **Tags:** Filter tasks based on tags.
  - **Project Name:** Filter tasks by project.
  - **Status:** Filter tasks by their current state (e.g., *To Do*, *In Progress*).
- URL-based filtering supported (e.g., `/tasks?owner=Tanay`, `/tasks?team=development`).
- Sorting options available based on "Time to Complete" (high to low and low to high).

### Project View
- Displays tasks grouped by project name.
- Shows project names alongside associated tasks and their key details.
- Supports internal filtering within a project (e.g., filter by tag or owner inside a project).

### Team View
- Displays tasks grouped by teams (Sales, Marketing, Development, Finance).
- Offers filtering options within a team view and the ability to sort tasks by status or due date.

### Reports and Visualization
- **Total Work Done Last Week:** Displays completed tasks over the last week using bar or pie charts.
- **Total Days of Work Pending:** Shows a calculated sum of pending workdays with visualization (e.g., bar chart).
- **Tasks Closed by Team/Owner/Project:** Visualizes statistics on closed tasks, such as the number closed per team, most productive owner, and project-wise task closures.

### Task Details
- Clicking on a task opens a detailed view showing:
  - Project name, team, owners, tags, estimated time to complete, and current status.
- Allows updating the status or modifying task details directly from the detail view.

### Filtering
- Implements URL-based filtering throughout the app.
- Filters are reflected in the URL query parameters, ensuring the UI updates accordingly and filters are accessible via direct links.


## Screenshots

### Dashboard Screen

![image](https://github.com/user-attachments/assets/65bd48a5-0c6c-4317-84e6-568ca27ece4a)


### Projects Screen

![image](https://github.com/user-attachments/assets/5679271a-a5a0-4093-a842-5d8f7edbfd74)

### New Project Screeen

![image](https://github.com/user-attachments/assets/8bd638c6-bc10-4759-a95a-b73405c2e29c)

### View Project Screen

![image](https://github.com/user-attachments/assets/2a38e9b7-7d5c-47b2-9b99-1fa6e0cf3581)

### Teams

![image](https://github.com/user-attachments/assets/04d3e1d9-575b-4967-8e0e-197033af766e)

### Add new Team

![image](https://github.com/user-attachments/assets/f4e88451-fabb-4e29-82ed-8e69bcb8d982)


### Team View Screen

![image](https://github.com/user-attachments/assets/816cfd10-d32c-4df8-b7df-ba063bc86f66)

### Reports

![image](https://github.com/user-attachments/assets/dbe843c0-91bb-4f30-bc33-1b8dc877f9fd)

![image](https://github.com/user-attachments/assets/3f5723b7-08e5-4a3b-9a57-bf2a836417c2)

### View Tasks

![image](https://github.com/user-attachments/assets/a47b40de-742f-48d5-a39d-f438fdb18c55)

### Add New Task Screen

![image](https://github.com/user-attachments/assets/a3070388-be66-4e95-8afb-ac4aec1808fe)

### Task Details

![image](https://github.com/user-attachments/assets/b115ba2c-337f-4b45-beda-d67045160cce)

### Edit Task Details

![image](https://github.com/user-attachments/assets/c1d7b2cd-6535-465d-ba67-7ff4ae0cd833)

