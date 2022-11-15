//@ts-check
/** 
 * run from root folder as : node ./npm-tests/test-02.js
 * 
 * Parse the response from the given REST end point and print out "hobbies" property in the following format: ITEM1, ITEM2, ...
 */
import https from "https";


https.get('https://coderbyte.com/api/challenges/json/rest-get-simple', (resp) => {
    let data = "";
    
    // parse json and print "hobbies" property as ITEM1, ITEM2,...
    resp.on('data', (data) => {
        const userData = JSON.parse(data.toString('utf8'));
        data = userData.hobbies.map((hobby) => hobby.toUpperCase()).join(', ');
  
        console.log(data);
      });
})