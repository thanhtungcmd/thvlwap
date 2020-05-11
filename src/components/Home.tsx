import * as React from "react"


const Home: React.FunctionComponent<{}> = props => {

    return (
        <div className="container-fluid header-1">
            <div className="container">
                <div className="row position-relative">
                    <div className="col-1 header-1-1">
                        <div className="image-back hn-menu">
                            <img src={ require('asset/img/menu.png') } />
                        </div>
                    </div>
                    <div className="col-10 header-1-2">
                        <div className="image-logo2">
                            <img src={ require('asset/img/logo.png') } />
                        </div>
                    </div>
                    <div className="col-1 header-1-1">
                        <div className="image-back float-right">
                            <img src={ require('asset/img/Search.png') } />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

};

export default Home
