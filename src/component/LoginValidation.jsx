"use server"; // Runs only on the server

const userName = "admin";
const passWord = "123456789";

// Function to validate user
export async function validateUser(inputUser, inputPass) {
  if (inputUser === userName && inputPass === passWord) {
    return { success: true, message: "Login successful" };
  } else {
    return { success: false, message: "Invalid username or password" };
  }
}
