## Model Management front end challenge
Built with Vue 3 + Vite + Vuex + Router

## How to start
- emter into CLI: npm install 
- open two CLI instances, for the front end: npm run dev
and another for the json server: npm run server
- in the browser go to localhost:5000

## Required scenario
  - See models in pages of 20 models per page (just show avatar and name)  
  - View the models information on a separate model details page  
  - Update the models name (should persist when the page is reloaded)  
  
Extras if you have time  

- Search by model name  
- Sort by name in ascending/descending order

NOTE: All requirements are fulfilled  


*** Instructions ***
Models listed use infinite load pagination, next 20 models are loaded upon scrolling down  
On the model detailed page click on the model name to edit it, press enter to save it.  

Clicking on the model image go to the model detailed page  

Go back to main page by clicking < icon in order to see changed name. You can change as many names as you want but it will be stored only temporarily because json-server doesn't have possibility to store edited items. In order to save it into the db we would need to implement server side code (Nodejs or similar)    

You can search items by model full name (search is built to be not case sensitive, but json-server requires exact name and surename to be entered)  

>You can sort items by name, ascending or descending



