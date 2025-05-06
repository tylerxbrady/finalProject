# Age Guesser Final Project

A simple web app that takes a **first name** and returns a guessed age using the [Agify API](https://agify.io/). If the name has already been searched, it retrieves the saved guess from a **MongoDB database** instead of calling the API again.

---

## Setup Instructions

### 1. Clone the repository

```bash
git clone <repository-url>
cd <repository-folder>
```

### 2. Initialize Node.js and Install Dependencies

Initialize the Node project:

```bash
npm init 
```

Then install the required packages:

```bash
npm install
```

---

## Running the App

Start the server with:

```bash
node ageGuesser.js <port-number>
```

Example:

```bash
node ageGuesser.js 4000
```

Then open your browser and go to:

```
http://localhost:4000
```

---

## Using the App

### Home Page

When the server is running, you'll see a homepage with two buttons:

- **Enter Information Here** – takes you to the input form.
- **Look Up Data** – Look up previously searched names and their stored age guesses from the MongoDB database.

### Entering a Name

1. Enter your **first name** on the form page.
2. The app will:
   - Check MongoDB to see if the name has been searched before.
   - If it has, the age guess is retrieved from the database.
   - If not, it will call the [Agify API](https://agify.io) to get an age guess.
   - The name-age pair is saved to the database for future lookups.
3. You’ll be redirected to a results page displaying the guessed age.

From the results page, you can:
- Return to the form for another guess.
- Go back to the home page.
