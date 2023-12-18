import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function PizzaModifyPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [isFetching, setIsFetching] = useState(true);
  const [pizza, setPizza] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("https://pizza.kando-dev.eu/Pizza/" + id);
        const data = await res.json();
        setPizza(data);
      } finally {
        setIsFetching(false);
      }
    })();
  }, [id]);

  return (
    <div className="p-5 m-auto text-center content bg-ivory">
      {isFetching && <div className="spinner-border"></div>}
      {!isFetching && !pizza && <p>Hiba történt!</p>}
      {!isFetching && pizza && (
        <>
          <h2 className="mb-4">Pizza módosítása</h2>

          <div className="card mb-4">
            <div className="card-body">
              <form
                onSubmit={(event) => {
                  event.persist();
                  event.preventDefault();

                  const form = event.target;
                  const data = new FormData(form);

                  fetch("https://pizza.kando-dev.eu/Pizza/" + id, {
                    method: "PUT",
                    body: JSON.stringify({
                      id: pizza.id,
                      name: data.get("name"),
                      isGlutenFree: data.get("isGlutenFree") ? 1 : 0,
                      kepURL: data.get("kepURL"),
                    }),
                    headers: {
                      "Content-Type": "application/json",
                    },
                  }).then(() => {
                    navigate("/");
                  });
                }}
              >
                <div className="form-group row pb-3">
                  <label htmlFor="name" className="col-sm-3 col-form-label">
                    Név
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="form-control"
                    defaultValue={pizza.name}
                  />
                </div>

                <div className="form-group row pb-3">
                  <label className="col-sm-3 col-form-label">
                    Gluténmentes
                  </label>
                  <div
                    className="form-check"
                    style={{ display: "flex", gap: "0.25rem" }}
                  >
                    <input
                      type="checkbox"
                      name="isGlutenFree"
                      id="isGlutenFree"
                      className="form-check-input"
                      defaultValue={pizza.isGlutenFree}
                    />
                    <label
                      htmlFor="isGlutenFree"
                      className="col-form-check-label"
                    >
                      Gluténmentes
                    </label>
                  </div>
                </div>

                <div className="form-group row pb-3">
                  <label htmlFor="kepURL" className="col-sm-3 col-form-label">
                    Kép URL
                  </label>
                  <input
                    type="text"
                    name="kepURL"
                    id="kepURL"
                    className="form-control"
                    defaultValue={pizza.kepURL}
                  />
                </div>

                <button type="submit" className="btn btn-primary">
                  Mentés
                </button>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
