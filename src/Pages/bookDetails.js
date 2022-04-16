import React from "react";
import { useParams } from "react-router";
import { useData } from "../contexts/dataContext";
import he from "he";
import { Link } from "react-router-dom";


export function BookDetails() {

  let { id } = useParams();  //gets the book id from the url
  const { display } = useData();

  function getBookDetails(data, id) {
    return data.find((book) => book.id === id);  // finds the current book from the list of books, from the api call.
  }

  const bookDetail = getBookDetails(display, id);  //stores current book details
  console.log("BookDetail");
  console.log(bookDetail);

  return (
    <div className="max-w-screen-lg p-4 m-auto">
      <div className="flex items-center ">
        <Link to="/search" className=" text-2xl">
          <button>
            <i className="fas fa-angle-left"></i>
          </button>
        </Link>
        <p className="font-bold text-3xl text-primaryCoral m-auto">
          BookDetails
        </p>
      </div>
      <div className="flex mt-12 mb-4 justify-between flex-col md:flex-row">
        {bookDetail.volumeInfo.imageLinks ? (
          <img
            className="h-[24rem] w-[32rem] mr-4"
            src={bookDetail.volumeInfo.imageLinks.thumbnail}
            alt={bookDetail.volumeInfo.title}
          />
        ) : (
          <img
            className="h-[24rem] w-[32rem] mr-4"
            src="https://cdn-d8.nypl.org/s3fs-public/blogs/J5LVHEL.jpg"
            alt={bookDetail.volumeInfo.title}
          />
        )}

        <div className="md:ml-4 flex flex-col items-start text-left gap-4">
          <h1 className="font-bold text-5xl mt-4">
            {bookDetail.volumeInfo.title}
          </h1>
          <h2 className="font-bold text-3xl text-slate-500 ">
            Author(s): {bookDetail.volumeInfo.authors}
          </h2>

          <h3 className=" font-medium text-xl text-slate-400">
            Publisher: {bookDetail.volumeInfo.publisher}
          </h3>
          <p className="text-slate-800 text-lg ">
            {" "}
            {bookDetail.searchInfo
              ? he.decode(bookDetail.searchInfo.textSnippet)
              : "Text Snippet is not available"}
          </p>
          {bookDetail.saleInfo.retailPrice === undefined ? (
            <p className="text-xl text-slate-700 bg-slate-100 p-2 ">E-book</p>
          ) : (
            <p className="text-xl text-slate-700 bg-slate-100 p-2 ">
              Price:{" "}
              <span className="font-bold ">
                {bookDetail.saleInfo.retailPrice.amount}{" "}
                {bookDetail.saleInfo.retailPrice.currencyCode}
              </span>
            </p>
          )}
          {bookDetail.volumeInfo.averageRating && (
            <p className="text-slate-800">
              Rating: {bookDetail.volumeInfo.averageRating}{" "}
              <i className="fas fa-star text-yellow-400"></i>{" "}
            </p>
          )}
        </div>
      </div>
      <hr />
      <div className=" mt-10 text-left">
        <span className=" font-semibold text-lg text-slate-800">
          {" "}
          Description:
        </span>{" "}
        {bookDetail.volumeInfo.description}
      </div>
    </div>
  );
}
