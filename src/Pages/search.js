import React from "react";
import { Link } from "react-router-dom";
import { useData } from "../contexts/dataContext";

export function Search() {
  const {
    display,
    handleBookSearchInput,
    handleSubmit,
    loader,
    isError,
    book,
  } = useData();  //only 1 api call is made so, data is put into context and taken from there.


  return (
    <div className="max-w-screen-lg  m-auto mb-4 px-4">

      <div className=" relative">
        <div className="flex items-center">
          <Link to="/" className=" text-2xl">
            <button>
              <i className="fas fa-angle-left"></i>
            </button>
          </Link>

          <form
            className="sticky top-0 py-4 backdrop-blur bg-white/30 m-auto "
            onSubmit={handleSubmit}
          >
            <input
              value={book}
              type="text"
              placeholder="Search your fav books.."
              className="border-2 p-4 backdrop-blur-lg bg-white/30 "
              onChange={handleBookSearchInput}
            />
            <button
              type="submit"
              onClick={handleSubmit}
              className="px-4 py-2 rounded-md text-white bg-primaryCoral font-medium uppercase md:mt-4 md:ml-4 "
            >
              Search{" "}
            </button>
          </form>
        </div>
        {loader && <span>Loading...</span>}
        {isError && (
          <span>
            Error occured!{" "}
            <Link to="/" className="underline cursor-pointer">
              Go back
            </Link>{" "}
          </span>
        )}
        <div className="justify-center flex flex-wrap md:justify-between">
          {display.map((book) => (
            <Link to={`/book/${book.id}`} key={book.id}>
              {/* <a href={book.volumeInfo.previewLink}> */}  {/**can be used to get the google book details link */}
              <div className="border-2 w-44 p-2 my-4  text-left">
                {book.volumeInfo.imageLinks ? (
                  <img
                    src={book.volumeInfo.imageLinks.thumbnail}
                    className="h-48"
                    alt={book.volumeInfo.title}
                  />
                ) : (
                  <img
                    src="https://cdn-d8.nypl.org/s3fs-public/blogs/J5LVHEL.jpg"
                    className="h-48"
                    alt={book.volumeInfo.title}
                  />
                )}
                <p className="mt-2 font-medium">{book.volumeInfo.title}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
