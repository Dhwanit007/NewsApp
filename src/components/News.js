import React, { useEffect, useState } from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)

    // constructor() {    // used for class based component which was created while creating this app for the first time..
    //     super();
    //     // console.log("Hello i am a constructor from news component")
    //     this.state = {
    //         articles: [],
    //         loading: true,
    //         page: 1,
    //         totalResults: 0
    //     }
    // }

    const UpdateNews = async () => {
        props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
        // this.setState({ loading: true });
        setLoading(true)
        let data = await fetch(url);
        props.setProgress(30);
        let parsedData = await data.json();
        props.setProgress(70);
        setArticles(parsedData.articles)
        setTotalResults(parsedData.totalResults)
        setLoading(false)
        // console.log(parsedData);
        // this.setState({
        //     articles: parsedData.articles,               // used for class based component which was created while creating this app for the first time..
        //     totalResults: parsedData.totalResults,
        //     loading: false
        // })
        props.setProgress(100);
    }
    // const componentDidMount = async () => {
        // console.log('cdm');
        // let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=e596bbde09ed45fa89b8ab9d52e63f13&page=1&pageSize=${props.pageSize}`;
        // this.setState({ loading: true });
        // let data = await fetch(url);
        // let parsedData = await data.json()
        // console.log(parsedData);
        // this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults, loading: false })
    // }

    useEffect(() => {
        UpdateNews();
        //eslint-disable-next-line
    }, [])
    

    // const handleNextClick = async () => {
        // console.log('Next')
        // if(!(this.state.page + 1 > Math.ceil(this.state.totalResults/props.pageSize))){
        //     let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=e596bbde09ed45fa89b8ab9d52e63f13&page=${this.state.page+1}&pageSize=${props.pageSize}`;
        //     this.setState({loading: true});
        //     let data = await fetch(url);
        //     let parsedData = await data.json()
        //     // this.setState({loading: false});
        //     this.setState({
        //         page: this.state.page + 1,
        //         articles: parsedData.articles,
        //         loading: false
        //     })
        //     }
        // this.setState({ page: this.state.page + 1 });
        // this.UpdateNews();
        // setPage(page+1)
    // }

    // const handlePrevClick = async () => {
        // console.log('Previous')
        //  let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=e596bbde09ed45fa89b8ab9d52e63f13&page=${this.state.page-1}&pageSize=${props.pageSize}`;
        // this.setState({loading: true});
        // let data = await fetch(url);
        // let parsedData = await data.json()
        // console.log(parsedData);
        // this.setState({
        //     page: this.state.page - 1,
        //     articles: parsedData.articles,
        //     loading: false
        // })
        // this.setState({ page: this.state.page - 1 });
        // this.UpdateNews();
        // setPage(page-1)
    // }

    const fetchMoreData = async () => {
        // this.setState({ page: this.state.page + 1 });
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
        setPage(page+1)
        // this.setState({ loading: true });
        let data = await fetch(url);
        let parsedData = await data.json()
        // console.log(parsedData);
        setArticles(articles.concat(parsedData.articles))
        setTotalResults(parsedData.totalResults)
        // this.setState({
        //     articles: this.state.articles.concat(parsedData.articles), // used for class based component which was created while creating this app for the first time..
        //     totalResults: parsedData.totalResults,
        //     // loading: false
        // })
    }

    return (
        <>
            <h1 className='text-center' style={{amrgin:'35px 0px',marginTop:'90px'}}>NEWS App</h1>
            {loading && <Spinner />}
            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length !== totalResults}
                loader={<Spinner />}
            >
                <div className="container">
                    <div className="row">
                        {articles.map((element, index) => {
                            return <div className="col-md-4" key={index}>
                                <Newsitem title={element.title ? element.title.slice(0, 45) + '...' : ""} description={element.description ? element.description.slice(0, 88) + '...' : ""} imageUrl={element.urlToImage ? element.urlToImage : "https://s.yimg.com/ny/api/res/1.2/_XH4s0HiERvNsKsidfPiIg--/YXBwaWQ9aGlnaGxhbmRlcjt3PTEyMDA7aD02NzM-/https://media.zenfs.com/en/insidermonkey.com/4a31470717140dc0b5330d507cacd0ab"} newsUrl={element.url} date={element.publishedAt ? element.publishedAt : "-"} author={element.author ? element.author : "Unknown"} source={element.source.name ? element.source.name : "Source"} />
                            </div>
                        })}
                    </div>
                </div>
            </InfiniteScroll>
            {/* <div className="container d-flex justify-content-between">
             <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
             <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div> */}
        </>
    )
}
News.defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general'
}
News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
}
export default News