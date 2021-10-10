import React, { Component } from 'react';
import { Carousel } from 'react-bootstrap';
import { PulseLoader } from 'react-spinners';

class News extends Component {
    render() {
        return (
            <div className="col-12 col-lg-7 col-xl-7">
                {!this.props.isLoading ? (
                    <div className="h-100 card">
                        <div className="card-header">
                            <h2 className="card-heading">📰나만의 뉴스</h2>
                        </div>
                        <div className="card-body">
                            <Carousel interval={10000} className="carousel carousel-dark slide">
                                {this.props.news.map((n) => {
                                    return (
                                        <Carousel.Item key={n['symbol']}>
                                            <div className="mb-3" style={{fontWeight:'bold'}}>{n['symbol']}</div>
                                            <div className="carousel-body">
                                                {n.items.map((i) => {
                                                    return (
                                                        <div
                                                            key={i['link']}
                                                            className="list-group-item"
                                                        >
                                                            <div className="sub-title">
                                                                {i['pub_date']}
                                                            </div>
                                                            <h6>
                                                                <a
                                                                    href={i['link']}
                                                                    target="_blank"
                                                                    rel="noreferrer"
                                                                    dangerouslySetInnerHTML={{
                                                                        __html: i['title'],
                                                                    }}
                                                                ></a>
                                                            </h6>
                                                            <p
                                                                dangerouslySetInnerHTML={{
                                                                    __html: i['description'],
                                                                }}
                                                            ></p>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </Carousel.Item>
                                    );
                                })}
                            </Carousel>
                        </div>
                    </div>
                ) : (
                    <div className="empty-component">
                        <div className="h-100 card">
                            <div className="card-header">
                                <h2 className="card-heading">📰나만의 뉴스</h2>
                            </div>
                            <div className="card-body">
                                <PulseLoader color="#4285f4" speedMultiplier={1} />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

export default News;