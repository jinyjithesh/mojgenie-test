import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export const Read = () => {
  const [data, setData] = useState([]);
  console.log("res", data);
  const { id } = useParams();

  useEffect(() => {
    const headers = {
      Accept: "application/json",
      Authorization: "Bearer uCz4r_G0mL9tbMFiN4BW",
    };

    axios
      .get("https://the-one-api.dev/v2/character?_id=" + id, {
        headers: headers,
      })

      .then((res) => setData(res.data.docs))

      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="d-flex w-100 wh-100 justify-content-center align-items-center bg-light">
      <div className="w-50 boarder bg-whit shadow px-5 pt-3 pb-5 rounded">
        <h1 className="center">Characters</h1>
        <form>
          {data.map((p) => (
            <>
              <div className="mb-2">
                <label
                  className="col-sm-2 col-form-label col-form-label-lg"
                  htmlFor="email"
                >
                  Name:{p.name}
                </label>
              </div>
              <div className="mb-2">
                <label
                  className="col-sm-2 col-form-label col-form-label-lg"
                  htmlFor="link"
                >
                  wikiUrl:<Link>{p.wikiUrl}</Link>
                </label>
              </div>
              <div className="mb-2">
                <label
                  className="col-sm-2 col-form-label col-form-label-lg"
                  htmlFor="name"
                >
                  Race:{p.race}
                </label>
              </div>
              <div className="mb-2">
                <label htmlFor="email" className="col-sm-2 col-form-label col-form-label-lg">Gender:{p.gender}</label>
              </div>
              <div className="mb-2">
                <label htmlFor="email" className="col-sm-2 col-form-label col-form-label-lg">Height:{p.height}</label>
              </div>
              <div className="mb-2">
                <label htmlFor="email" className="col-sm-2 col-form-label col-form-label-lg">Hair:{p.hair}</label>
              </div>
              <div className="mb-2">
                <label htmlFor="email" className="col-sm-2 col-form-label col-form-label-lg">Realm:{p.realm}</label>
              </div>
              <div className="mb-2">
                <label htmlFor="email"className="col-sm-2 col-form-label col-form-label-lg">Birth:{p.birth}</label>
              </div>
              <div className="mb-2">
                <label htmlFor="email"className="col-sm-2 col-form-label col-form-label-lg">Spouse:{p.spouse}</label>
              </div>
              <div className="mb-2">
                <label htmlFor="email"className="col-sm-2 col-form-label col-form-label-lg">Death:{p.death}</label>
              </div>
            </>
          ))}
          <Link to="/" className="btn btn-primary ms-3">
            Close
          </Link>
        </form>
      </div>
    </div>
  );
};
