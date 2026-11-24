import { useState, useEffect } from "react";
import { storeApi } from "../services/api";

export default function PromoBanner() {
  const [promo, setPromo] = useState(null);

  useEffect(() => {
    storeApi
      .getBanners("promo")
      .then((data) => {
        const list = Array.isArray(data) ? data : data?.banners || [];
        if (list.length > 0) setPromo(list[0]);
      })
      .catch(() => {});
  }, []);

  if (!promo) return null;

  return (
    <section
      className="promo-banner"
      style={promo.bgColor ? { background: promo.bgColor } : undefined}
    >
      <div className="promo-banner__inner container">
        <div className="promo-banner__text">
          <h2 className="promo-banner__title">{promo.title}</h2>
          {promo.subtitle && (
            <p className="promo-banner__sub">{promo.subtitle}</p>
          )}
          {promo.buttonText && (
            <button
              className="promo-banner__btn"
              onClick={() => {
                if (promo.link) window.location.href = promo.link;
              }}
            >
              {promo.buttonText}
            </button>
          )}
        </div>
        {promo.image && (
          <div className="promo-banner__visuals">
            <img
              src={promo.image}
              alt={promo.title}
              className="promo-banner__img"
            />
          </div>
        )}
      </div>
    </section>
  );
}
