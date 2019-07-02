import React, { Component } from 'react';
import * as Constants from '../constants/urlConfig';
import MusicDetail from './MusicDetail';
import { BrowserRouter as Link } from "react-router-dom";

/**
 * Lists the search results for given search param
 */
class MusicListing extends Component {
    constructor() {
        super();
        this.state = {
            isLoading: false,
            searchParam: '',
            noData: false,
            musicListing: [],
            showDetail: false,
            trackDetail: {},
            resultsCount: 0
        }
        this.getDetail = this.getDetail.bind(this);
        this.modalClose = this.modalClose.bind(this);
    }
    /**
     * close the music details popup
     */
    modalClose() {
        this.setState({ showDetail: false });
    }

    /**
     * Update the state value on change
     */
    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    /**
     * Submit the form to get search results
     */
    onSubmit = (e) => {
        e.preventDefault();
        // get our form data out of state
        const { searchParam } = this.state;
        this.setState({ isLoading: true });
        fetch(Constants.SEARCHURL + searchParam + '&limit=25&country=IN')
            .then(response => response.json())
            .then(data => {
                //console.log(data);
                this.setState(
                    {
                        isLoading: false,
                        musicListing: data.results,
                        resultsCount: data.resultCount
                    }
                );
            });
    }

    /**
     * shows the details in the popup
     * @param {*} event 
     * @param {*} param track information
     */
    getDetail(event, param) {
        this.setState({ showDetail: true, trackDetail: param });
    }

    render() {
        /**
         * assign the state data to required constants
         */
        const { isLoading, musicListing, showDetail } = this.state;
        if (isLoading) {
            //return <p>Loading ...</p>;
        }

        return (
            <div className="row">
                <div className="col-md-12">
                    <div className="col-md-12">
                        <img src="images/banner-image.jpg" className="banner-image" alt="bannerImage" />
                    </div>
                    <div className="col-md-12 searchForm">
                        <form onSubmit={this.onSubmit}>
                            <div className="row no-gutters">
                                <div className="col">
                                    <input className="form-control border-right-0 rounded-0 searchBorder" type="text" name='searchParam' placeholder="Search your favourite Tracks" value={this.state.searchParam} onChange={this.onChange} id="example-search-input4" />
                                </div>
                                <div className="col-auto">
                                    <button className="btn btn-outline-secondary border-left-0 rounded-0 rounded-right searchBorder" type="submit">
                                        <i className="fa fa-search"></i>
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                    {!!isLoading && <p className="loadingImage"> <img src="images/loading.gif" alt="Loading...."/></p>}

                    {!!musicListing.length && <div className="col-md-12">
                        <div className="row resultsCount">
                            <span className="col-6 font-weight-bold">{this.state.resultsCount} results found</span>

                            <div className="col-12"><hr /></div>
                        </div>
                        <div className="row section">
                            {musicListing.map(list => (
                                <div className="col-xl-3 col-lg-4 col-sm-6 pb-4" key={list.trackId}>
                                    <div className="trackItem">
                                        <div>
                                            <Link to="/musicdetail">
                                                <img src={list.artworkUrl100} alt={list.trackName}></img>
                                            </Link>
                                            <a href="#" onClick={(e) => { this.getDetail(e, list) }}>
                                                <h6 className="marginTop-10">{list.trackName}</h6>
                                            </a>
                                            <p className="artistName">{list.artistName}</p>

                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>}

                </div>
                {showDetail ?
                    <MusicDetail show={this.state.showDetail} onHide={this.modalClose} trackInfo={this.state.trackDetail} /> : null}
                {this.state.noData && <div class="col"><h5>No results found</h5></div>}
            </div>
        );

    }
}

export default MusicListing;