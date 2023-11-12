import React, { Component } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import banner1 from '../images/Banner1.jpg';
import banner2 from '../images/Banner2.jpg';
import banner3 from '../images/Banner3.jpg';

const images = [
    banner1,
    banner2,
    banner3,
];
  
  const settings = {
    centerMode: true,
    autoplaySpeed: 3000,
    autoplay: true,
    duration: 400,
  };
  
  const CarouselCategories = () => {
    return (
      <div>
        <Slider {...settings}>
          {images.map((image, index) => (
            <div key={index}>
              <img
                src={image}
                alt={`Image ${index + 1}`}
                style={{ width: '100%', height: 'auto' }}
              />
            </div>
          ))}
        </Slider>
      </div>
    );
  };
  
  export default CarouselCategories;