import s from "./styles.module.css";
import { ReactComponent as StarIcon } from "./img/star.svg";
import { useEffect, useState } from "react";
import { MAX_COUNT_RATING } from "../../utils/constants";
import cn from "classnames";

function Rating({ isEditable = false, currentRating, setCurrentRating }) {
  const [ratingArray, setRatingArray] = useState(
    new Array(MAX_COUNT_RATING).fill(<></>)
  );

  const constructRating = (filledRating) => {
    const updateArray = ratingArray.map((raitingElement, index) => {
      return (
        <StarIcon
          className={cn(s.star, {
            [s.filled]: index < filledRating,
            [s.editable]: isEditable,
          })}
          onMouseEnter={() => {
            changeDisplay(index + 1);
          }}
          onMouseLeave={() => {
            changeDisplay(currentRating);
          }}
          onClick={() => {
            changeRating(index + 1);
          }}
        />
      );
    });

    setRatingArray(updateArray);
  };

  function changeDisplay(rating) {
    constructRating(rating);
  }

  function changeRating(rating) {
    if (!isEditable || !setCurrentRating) return
    setCurrentRating(rating);
  }

  useEffect(() => {
    constructRating(currentRating);
  }, [currentRating]);

  return ratingArray.map((r, i) => <span key={i}>{r}</span>);
}

export default Rating;
