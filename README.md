# Frontend Mentor - Interactive comments section solution

This is a solution to the [Interactive comments section challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/interactive-comments-section-iG1RugEG9). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Table of contents

- [Frontend Mentor - Interactive comments section solution](#frontend-mentor---interactive-comments-section-solution)
  - [Table of contents](#table-of-contents)
  - [Overview](#overview)
    - [The challenge](#the-challenge)
    - [Screenshot](#screenshot)
    - [Links](#links)
  - [My process](#my-process)
    - [Built with](#built-with)
    - [What I learned](#what-i-learned)

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the app depending on their device's screen size
- See hover states for all interactive elements on the page
- Create, Read, Update, and Delete comments and replies
- Upvote and downvote comments
- **Bonus**: If you're building a purely front-end project, use `localStorage` to save the current state in the browser that persists when the browser is refreshed. ✅
- **Bonus**: Instead of using the `createdAt` strings from the `data.json` file, try using timestamps and dynamically track the time since the comment or reply was posted.

### Screenshot

![Screenshot of the solution](/screenshot.avif)

### Links

- Solution URL: [Github Solution](https://github.com/brayanpesantes/interactive-comments)
- Live Site URL: [https://interactive-comments-section-2024.netlify.app/](https://interactive-comments-section-2024.netlify.app/)

## My process

### Built with

- Semantic HTML5 markup
- [TailwindCSS](https://tailwindcss.com/) - Utility-first CSS framework
- Flexbox
- [React](https://reactjs.org/) - JS library
- [Vite](https://vitejs.dev/) - Frontend tool
- [React Icons](https://react-icons.github.io/react-icons/) - Icons library

### What I learned

In this project, I deepened my understanding of managing state in React, especially when dealing with user interactions like creating, updating, and deleting comments. Additionally, I gained more experience in using TailwindCSS for rapid UI development.

Example of code I'm proud of:

```jsx
const handleAddComment = (comment: Comment) => {
    setComments([...comments, comment]);
  };