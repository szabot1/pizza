import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function PizzaSinglePage() {
  const { id } = useParams();

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
          <h2 className="mb-4">Pizza</h2>

          <div className="card mb-4">
            <img
              src={
                pizza.kepURL ??
                "https://via.placeholder.com/400x800.png?text=No+image"
              }
              alt={pizza.name}
              style={{
                maxHeight: "200px",
                objectFit: "contain",
              }}
              className="card-img-top mt-4 img-fluid"
            />
            <div className="card-body">
              <h5 className="card-title">{pizza.name}</h5>
              <p className="card-text text-muted">
                Glutenmentes-e: {pizza.isGlutenFree ? "Igen" : "Nem"}
              </p>
            </div>

            <div
              className="mt-2 mb-2"
              style={{
                display: "flex",
                gap: "0.75rem",
                justifyContent: "center",
              }}
            >
              <NavLink
                to={`/pizza/${id}/modositas`}
                className="btn btn-primary"
              >
                Módosítás
              </NavLink>

              <NavLink to={`/pizza/${id}/torles`} className="btn btn-danger">
                Törlés
              </NavLink>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
