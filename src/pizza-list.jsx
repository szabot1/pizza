import React from "react";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

export default function PizzaListPage() {
  const [isFetchPending, setFetchPending] = useState(false);
  const [result, setResult] = useState([]);

  useEffect(() => {
    setFetchPending(true);
    fetch("https://pizza.kando-dev.eu/Pizza")
      .then((response) => response.json())
      .then((json) => {
        setResult(json);
        setFetchPending(false);
      });
  }, []);

  return (
    <>
      {isFetchPending ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100dvh",
          }}
        >
          <div className="spinner-border"></div>
        </div>
      ) : (
        <div className="container text-center">
          <h1 className="mt-4">Pizzak</h1>
          <div className="d-flex flex-row flex-grow-0 flex-wrap gap-2">
            {result.map((pizza) => (
              <NavLink
                to={`/pizza/${pizza.id}`}
                key={pizza.id}
                style={{
                  flexBasis: "32%",
                  textDecoration: "none",
                }}
              >
                <div className="border rounded p-3">
                  <p className="mb-0 text-muted">Pizza neve: {pizza.name}</p>
                  <p
                    className="mb-3 fs-4 text-muted"
                    style={{
                      fontWeight: 550,
                    }}
                  >
                    Glutenmentes-e: {pizza.isGlutenFree ? "Igen" : "Nem"}
                  </p>
                  <img
                    src={pizza.kepURL}
                    alt={pizza.name}
                    height={200}
                    style={{
                      objectFit: "contain",
                      maxWidth: "100%",
                    }}
                  />
                </div>
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
