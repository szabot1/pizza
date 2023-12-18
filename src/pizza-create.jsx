import React from "react";
import { useNavigate } from "react-router-dom";

export default function PizzaCreatePage() {
  const navigate = useNavigate();

  return (
    <div className="p-5 m-auto text-center content bg-whitesmoke">
      <h2 className="mb-4">Új pizza létrehozása</h2>

      <div className="card mb-4">
        <div className="card-body">
          <form
            onSubmit={(event) => {
              event.persist();
              event.preventDefault();

              const form = event.target;
              const data = new FormData(form);

              fetch("https://pizza.kando-dev.eu/Pizza", {
                method: "POST",
                body: JSON.stringify({
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
              />
            </div>

            <div className="form-group row pb-3">
              <label className="col-sm-3 col-form-label">Gluténmentes</label>
              <div
                className="form-check"
                style={{ display: "flex", gap: "0.25rem" }}
              >
                <input
                  type="checkbox"
                  name="isGlutenFree"
                  id="isGlutenFree"
                  className="form-check-input"
                />
                <label htmlFor="isGlutenFree" className="col-form-check-label">
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
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Mentés
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
