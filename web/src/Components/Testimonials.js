import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import client from "../Assets/images/people.png"
import ratingStar from "../Assets/images/rating-star.svg"


export default function Testimonials() {
    return (
        <>
            <div className='testimonials-heading-container'>
                <h5 className='testimonials-heading'>Testimonial</h5>
                <h2 className='testimonials-description'>Hear directly from our users</h2>
            </div>
            <div className="testimonials-swiper-container">
                <Swiper
                    slidesPerView={3}
                    spaceBetween={12}
                    pagination={{
                        clickable: true,
                    }}
                    modules={[Pagination]}
                    className="mySwiper custom-swiper"
                >
                    <SwiperSlide>
                        <div className="testimonial-card">
                            <div className="client-info">
                                <img src={client} alt="client" />
                                <div className="client-name">
                                    <h3>John Doe</h3>
                                    <p>Product Designer</p>
                                </div>
                            </div>
                            <div className="testimonial-content">
                                <div className="rating-stars">
                                    {Array.from({ length: 5 }).map((_, index) => (
                                        <img src={ratingStar} alt="rating-star" key={index} />
                                    ))}
                                </div>
                                <h2>I would love work with mirza again!</h2>
                                <p>“With the hotel’s old-scholl opulence and there are outstanding location-right in the middle miles is Downtown’s.”</p>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="testimonial-card">
                            <div className="client-info">
                                <img src={client} alt="client" />
                                <div className="client-name">
                                    <h3>John Doe</h3>
                                    <p>Product Designer</p>
                                </div>
                            </div>
                            <div className="testimonial-content">
                                <div className="rating-stars">
                                    {Array.from({ length: 5 }).map((_, index) => (
                                        <img src={ratingStar} alt="rating-star" key={index} />
                                    ))}
                                </div>
                                <h2>I would love work with mirza again!</h2>
                                <p>“With the hotel’s old-scholl opulence and there are outstanding location-right in the middle miles is Downtown’s.”</p>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="testimonial-card">
                            <div className="client-info">
                                <img src={client} alt="client" />
                                <div className="client-name">
                                    <h3>John Doe</h3>
                                    <p>Product Designer</p>
                                </div>
                            </div>
                            <div className="testimonial-content">
                                <div className="rating-stars">
                                    {Array.from({ length: 5 }).map((_, index) => (
                                        <img src={ratingStar} alt="rating-star" key={index} />
                                    ))}
                                </div>
                                <h2>I would love work with mirza again!</h2>
                                <p>“With the hotel’s old-scholl opulence and there are outstanding location-right in the middle miles is Downtown’s.”</p>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="testimonial-card">
                            <div className="client-info">
                                <img src={client} alt="client" />
                                <div className="client-name">
                                    <h3>John Doe</h3>
                                    <p>Product Designer</p>
                                </div>
                            </div>
                            <div className="testimonial-content">
                                <div className="rating-stars">
                                    {Array.from({ length: 5 }).map((_, index) => (
                                        <img src={ratingStar} alt="rating-star" key={index} />
                                    ))}
                                </div>
                                <h2>I would love work with mirza again!</h2>
                                <p>“With the hotel’s old-scholl opulence and there are outstanding location-right in the middle miles is Downtown’s.”</p>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="testimonial-card">
                            <div className="client-info">
                                <img src={client} alt="client" />
                                <div className="client-name">
                                    <h3>John Doe</h3>
                                    <p>Product Designer</p>
                                </div>
                            </div>
                            <div className="testimonial-content">
                                <div className="rating-stars">
                                    {Array.from({ length: 5 }).map((_, index) => (
                                        <img src={ratingStar} alt="rating-star" key={index} />
                                    ))}
                                </div>
                                <h2>I would love work with mirza again!</h2>
                                <p>“With the hotel’s old-scholl opulence and there are outstanding location-right in the middle miles is Downtown’s.”</p>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="testimonial-card">
                            <div className="client-info">
                                <img src={client} alt="client" />
                                <div className="client-name">
                                    <h3>John Doe</h3>
                                    <p>Product Designer</p>
                                </div>
                            </div>
                            <div className="testimonial-content">
                                <div className="rating-stars">
                                    {Array.from({ length: 5 }).map((_, index) => (
                                        <img src={ratingStar} alt="rating-star" key={index} />
                                    ))}
                                </div>
                                <h2>I would love work with mirza again!</h2>
                                <p>“With the hotel’s old-scholl opulence and there are outstanding location-right in the middle miles is Downtown’s.”</p>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="testimonial-card">
                            <div className="client-info">
                                <img src={client} alt="client" />
                                <div className="client-name">
                                    <h3>John Doe</h3>
                                    <p>Product Designer</p>
                                </div>
                            </div>
                            <div className="testimonial-content">
                                <div className="rating-stars">
                                    {Array.from({ length: 5 }).map((_, index) => (
                                        <img src={ratingStar} alt="rating-star" key={index} />
                                    ))}
                                </div>
                                <h2>I would love work with mirza again!</h2>
                                <p>“With the hotel’s old-scholl opulence and there are outstanding location-right in the middle miles is Downtown’s.”</p>
                            </div>
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>
        </>
    );
}