import React, { useState } from "react";
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
} from "reactstrap";

export const AdsNavbar = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const onExiting = () => {
    setAnimating(true);
  };

  const onExited = () => {
    setAnimating(false);
  };

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const goToIndex = newIndex => {
    if (animating) return;
    setActiveIndex(newIndex);
  };

  const items = [
    {
      src: "https://via.placeholder.com/1366x500?text=First&Image",
      altText: "Slide 1",
      caption: "Slide 1",
    },
    {
      src: "https://via.placeholder.com/1366x500?text=Second&Image",
      altText: "Slide 2",
      caption: "Slide 2",
    },
    {
      src: "https://via.placeholder.com/1366x500?text=Third&Image",
      altText: "Slide 3",
      caption: "Slide 3",
    },
  ];

  const slides = items.map(item => {
    return (
      <CarouselItem onExiting={onExiting} onExited={onExited} key={item.src}>
        <img src={item.src} alt={item.altText} className={"img-fluid"} />
        {/* <CarouselCaption
          captionText={item.caption}
          captionHeader={item.caption}
        /> */}
      </CarouselItem>
    );
  });

  return (
    <Carousel activeIndex={activeIndex} next={next} previous={previous}>
      <CarouselIndicators
        items={items}
        activeIndex={activeIndex}
        onClickHandler={goToIndex}
      />
      {slides}
      <CarouselControl
        direction="prev"
        directionText="Previous"
        onClickHandler={previous}
      />
      <CarouselControl
        direction="next"
        directionText="Next"
        onClickHandler={next}
      />
    </Carousel>
  );
};
