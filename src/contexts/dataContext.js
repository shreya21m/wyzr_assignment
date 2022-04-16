import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
export const DataContext = createContext();
process.env.AWS_SDK_LOAD_CONFIG=1



export function DataProvider({ children }) {
  const [book, setBook] = useState();
  const [display, setDisplay] = useState([]);   //displays an array of books searched from the API
  const [isError, setError] = useState(false);  //error state
  const [loader, setLoader] = useState(false);  // loading state

  //contains value of the input book
  const handleBookSearchInput = (e) => {
    const book = e.target.value;
    setBook(book);
  };

  // onSubmit, axios call is made to the api -> data is fetched and stored in display
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(book);
    setLoader(true);

    (async () => {
      try {
        await axios
          .get(
            "https://www.googleapis.com/books/v1/volumes?q=" +
              book +
              // "&key=" +
              // API_KEY +
              "&maxResults=20"
          )
          .then((data) => {
            console.log(data);
            setDisplay(data.data.items);
            var AWS = require('aws-sdk');
            // Set the region 
            AWS.config.update({
              region: 'ap-south-1',
              apiVersion: 'latest',
              credentials: {
                accessKeyId: 'AKIAQ6MUQ6J7WVP2JLUL',
                secretAccessKey: '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'
              }
            });
            var ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

            var params = {
              TableName: 'SEARCH_HISTORY',
              Item: {
                'EMAIL' : {S: 'shreyahaveli2167@gmail.com'},
                'SEARCH_QUERY' : {S: book}
              }
            };
            
            // Call DynamoDB to add the item to the table
             ddb.putItem(params, function(err, data) {
              if (err) {
                console.log("Error", err);
              } else {
                console.log("Success", data);
              }
            });

            // var abc = Login()
            // console.log(Login.user());

          });
        setLoader(false);
      } catch (error) {
        setError(true);
        console.log("loading... error");
        setLoader(false);
      }
    })();
  };

  return (
    <DataContext.Provider
      value={{
        book,
        display,
        handleBookSearchInput,
        handleSubmit,
        isError,
        loader,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}


// only one api call is made, hence the values are stored in context, so that both the search feature and book details page can access it.
// console.log("calling")

export function useData() {
  // console.log("call")
  return useContext(DataContext);
}
