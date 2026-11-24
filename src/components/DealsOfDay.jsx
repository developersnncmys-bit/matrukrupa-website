import { useState, useEffect } from "react";
import { storeApi } from "../services/api";

export default function DealsOfDay() {
  const [deals, setDeals] = useState([]);

  useEffect(() => {
    storeApi
      .getBanners("deal")
      .then((data) => {
        const list = Array.isArray(data) ? data : data?.banners || [];
        setDeals(
          list.map((b) => ({
            id: b._id,
            title: b.title,
            badge: b.subtitle || b.buttonText || "",
            image: b.image,
          })),
        );
      })
      .catch(() => {});
  }, []);

  if (deals.length === 0) return null;

  return (
    <section className="deals-day section-pad--sm">
      <div className="container">
        <h2 className="deals-day__title">Deals Of The Day</h2>
        <div className="deals-day__grid">
          {deals.map((deal) => (
            <div
              key={deal.id}
              className="deal-card"
              style={{
                backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.82) 30%, rgba(0,0,0,0.35) 65%, transparent 100%), url(${deal.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center right",
              }}
            >
              <div className="deal-card__text">
                <h3 className="deal-card__title">{deal.title}</h3>
                <p className="deal-card__badge">{deal.badge}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
