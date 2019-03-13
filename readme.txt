This application is written in Node.js. No extra modules are required. This application returns the question paper in the JSON format.

Steps to run
- Update the 'main' function in 'index.js' with the parameters.
- Open terminal.
- change directory to the root of the Application.
- Run 'node index'


Limitations
- Hard coded question bank.
- Questions are arranged in the descending order in the bank.
- Can not create decimal marked questions
- Time complexity - O(n^2) as we are using two for loops

- (Could be future enhancement) No user inputs. We can could take the inputs from the terminal in future.
- (Could be future enhancement) We could use proper classes and definition