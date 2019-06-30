import React from 'react';
import { Modal } from 'react-bootstrap';

export default class MusicDetail extends React.Component {

    /**
     * Returns the time in minutes:seconds
     * @param {milliseconds} ms 
     */
    msToTime(ms) {
        var seconds = (ms / 1000);
        var minutes = parseInt(seconds / 60, 10);
        seconds = Math.ceil(seconds % 60);
        minutes = minutes % 60;
        return minutes + ':' + seconds;
    }

    render() {
        return (
            <Modal
                show={this.props.show} onHide={this.props.onHide}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {this.props.trackInfo.trackName}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="tab-pane fade active show" id="overview" role="tabpanel" aria-labelledby="overview-tab">
                        <div className="row marginBottom-10" >
                            <div className="col-md-2 col-12 px-2">
                                <img src={this.props.trackInfo.artworkUrl100} alt={this.props.trackInfo.trackName}></img>
                            </div>
                            <div className="col-md-10 col-12 px-2">
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item pl-0 border-0 padding-0">
                                        Compose by: <span className="font-weight-bold">{this.props.trackInfo.collectionArtistName}</span>
                                    </li>
                                    <li className="list-group-item pl-0 border-0 padding-0">
                                        Genere: <span className="font-weight-bold">{this.props.trackInfo.primaryGenreName}</span>
                                    </li>
                                    <li className="list-group-item pl-0 border-0 padding-0">
                                        Track Time: <span className="font-weight-bold">{this.msToTime(this.props.trackInfo.trackTimeMillis)} min</span>
                                    </li>
                                </ul>

                            </div>

                        </div>
                        {!!this.props.trackInfo.previewUrl && <div className="row" >
                            <div className="embed-responsive embed-responsive-16by9">
                                <iframe className="embed-responsive-item" src={this.props.trackInfo.previewUrl} title={this.props.trackInfo.trackName}></iframe>
                            </div>
                        </div>}
                    </div>
                </Modal.Body>
                <Modal.Footer></Modal.Footer>
            </Modal>
        );
    }
}