import React from "react";
import { Range } from "react-range";
import "../style/common.style.css";

const FilteredByPrice = ({ priceRange, setPriceRange }) => {
  return (
    <div className="filteredByPrice-container">
      <div className="label-box">
        <label>
          가격 범위: ₩{priceRange[0]} - ₩{priceRange[1]}
        </label>
      </div>
      <div className="range-box">
        <Range
          step={1000} // 슬라이더 이동 간격 설정 min={0}
          max={300000}
          values={priceRange}
          onChange={setPriceRange}
          renderTrack={({ props, children }) => (
            <div
              {...props}
              style={{
                ...props.style,
                height: "6px",
                width: "100%",
                backgroundColor: "#3c3c3c",
              }}
            >
              {children}
            </div>
          )}
          renderThumb={({ props, isDragged }) => (
            <div
              {...props}
              style={{
                ...props.style,
                height: "20px",
                width: "20px",
                backgroundColor: isDragged ? "#d2d2d2" : "grey",
                borderRadius: "50%",
                outline: "none",
                boxShadow: isDragged
                  ? "0px 0px 8px rgba(0, 0, 0, 0.3)"
                  : "none",
              }}
            />
          )}
        />
      </div>
    </div>
  );
};

export default FilteredByPrice;
