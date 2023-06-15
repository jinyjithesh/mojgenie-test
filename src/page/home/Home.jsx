import { Pagination, Stack, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import "./home.css";
export const Home = () => {
  const [query, setQuery] = useState("");
  const [queryr, setQueryr] = useState("");
  const [queryg, setQueryg] = useState([]);
  const [queryn, setQueryn] = useState("");
  const [quote, setQuote] = useState();
  const [character, setCharacter] = useState([]);
  const [characters, setCharacters] = useState();
  const [sort, setSort] = useState();
  const [MyArray, setMyArray] = useState([]);
  const [sortStatus, setSortStatus] = useState(true);
  const [prePage, setPerPage] = useState(100);
  const totalnumofpagiatio = Math.ceil(character.length / prePage);
  const pages = [...Array(totalnumofpagiatio + 1).keys()].slice(1);
  const [currentPage, SetCurrentPage] = useState(1);
  const indexOfLastCharacter = currentPage * prePage;
  const indexOfFirstharacter = indexOfLastCharacter - prePage;

  const visibleOfCharacter = prePage
    .toString()
    .slice(indexOfFirstharacter, indexOfLastCharacter);
  // console.log("visibleOfCharacte",visibleOfCharacter);
  // console.log("pages",pages);

  const prevPageHandler = () => {
    if (currentPage !== 1) SetCurrentPage(currentPage - 1);
  };
  const nextPageHandler = () => {
    if (currentPage !== totalnumofpagiatio) SetCurrentPage(currentPage + 1);
  };
  const handleSort = () => {
    const dataname = MyArray;
    if (sortStatus) {
      let sorted = dataname.sort((a, z) => a[1] - z[1]);
      setMyArray(sorted);
      setSortStatus(!sortStatus);
    } else {
      let sorted = dataname.sort((a, z) => z[1] - a[1]);
      setMyArray(sorted);
      setSortStatus(!sortStatus);
    }
  };
  useEffect(() => {
    const headers = {
      Accept: "application/json",
      Authorization: "Bearer uCz4r_G0mL9tbMFiN4BW",
    };
    const fetchData = async () => {
      const rawQuotes = await fetch("https://the-one-api.dev/v2/quote", {
        headers: headers,
      });
      const quotes = await rawQuotes.json();
      const quote = quotes.docs[Math.floor(Math.random() * quotes.docs.length)];
      setQuote(quote.dialog);
      const rawCharacters = await fetch(
        "https://the-one-api.dev/v2/character",
        { headers: headers }
      );
      const characters = await rawCharacters.json();
      console.log("chs", characters);
      const character = characters.docs;
      setCharacter(character);
      console.log("ch", character);
      const sort = characters.docs;
      console.log("sort", sort);
    };

    fetchData();
  }, []);

  return (
    <div className="d-flex flex-column  justify-content-center ">
      <h1 className="homeContainer">Characters</h1>
      <hr />
      <form>
        <div className="row g-3">
          <div className="col">
            <label class="col-sm-2 col-form-label col-form-label-lg">
              Search
            </label>
            <input
              className="col-sm-10"
              type="text"
              placeholder="By Name"
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <div className="col">
            <label class="col-sm-2 col-form-label col-form-label-lg">
              Sort By
            </label>
            <select
              class="col-sm-10"
              onChange={(e) => setQueryn(e.target.value)}
              placeholder="By Name (dec/asc)"
            >
              <>
                {character?.map((s, i) => (
                  <option selected key={i}>
                    {s?.name}
                  </option>
                ))}
              </>
            </select>
          </div>
        </div>
        <div className="row g-3">
          <div className="col">
            <label class="col-sm-2 col-form-label col-form-label-lg">
              Race{" "}
            </label>
            <input
              className="col-sm-10"
              type="text"
              placeholder="List of races"
              onChange={(e) => setQueryr(e.target.value)}
            />
          </div>
          <div className="col">
            <label class="col-sm-2 col-form-label col-form-label-lg">
              Gender
            </label>
            <select onChange={(e) => setQueryg(e.target.value)}>
              <option selected>Male/Female/Any</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="any">Any</option>
            </select>
          </div>
          <div className="col">
            <button className="btn btn-success" onClick={handleSort}>
              Submit
            </button>
          </div>
        </div>
        <hr />
        <table className="table table-stripend">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Race</th>
              <th>Gender</th>
              <th>Action</th>
            </tr>
          </thead>

          {character
            ?.filter((d) => {
              if (setQuery === "") {
                return d;
              } else if (
                d.name.toLocaleLowerCase().includes(query.toLocaleLowerCase())
              ) {
                return d;
              }
            })
            ?.filter((d) => {
              if (setQueryr === "") {
                return d;
              } else if (
                d.race.toLocaleLowerCase().includes(queryr.toLocaleLowerCase())
              ) {
                return d;
              }
            })
            ?.filter((d) => {
              if (setQueryn === "") {
                return d;
              } else if (
                d.name.toLocaleLowerCase().includes(queryn.toLocaleLowerCase())
              ) {
                return d;
              }
            })

            ?.map((d, i) => (
              <tbody>
                <tr key={i}>
                  <td>{d?._id}</td>

                  <td>{d?.name}</td>
                  <td>{d?.race}</td>
                  <td>{d?.gender}</td>
                  <td>
                    <Link to={`/read/${d?._id}`}>Details..</Link>
                  </td>
                </tr>
              </tbody>
            ))}
        </table>
      </form>
      <div className="row g-3">
        <div className="col">
          {" "}
          {/* {visibleOfCharacter?.map((page)=>(
    <p>{page.title}</p>
   )
       )}  */}
          <span onClick={() => prevPageHandler}>prev</span>
          {pages.map((page) => (
            <span
              key={page.id}
              className={`${currentPage === page ? "active" : ""}`}
              onClick={() => SetCurrentPage(page)}
            >{`${page} |`}</span>
          ))}
          <span onClick={() => nextPageHandler}>next</span>
        </div>
        <div className="col">
          <label>Limit</label>
          <select onChange={(e) => setPerPage(e.target.value)}>
            <option selected>10</option>
            <option value="1">10</option>
            <option value="2">20</option>
            <option value="3">30</option>
          </select>
        </div>
      </div>
      <hr />

      {/* <ReactPaginate  breakLabel="..."
        nextLabel="10 >"
        // onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        // pageCount={pageCount}
        previousLabel="< 1"
        renderOnZeroPageCount={null}/> */}
    </div>
  );
};
