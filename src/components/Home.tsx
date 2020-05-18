import * as React from "react"
import Header from "plugin/Header";
import {HomeState} from "reducer/home.reducer.type";
import StateInterface from "reducer/index.reducer.type";
import {bindActionCreators, Dispatch} from "redux";
import * as HomeAction from "action/home.action";
import {connect} from "react-redux";
import {useEffect} from "react";
import Slider from "react-slick"
import * as MenuAction from "action/menu.action";

interface StatePropsInterface {
    home?: HomeState
}

interface DispatchPropsInterface {
    actions?: {
        getHomePageAction: any,
        changeTitleAction: any
    }
}

interface ParamPropsInterface {
    match: {
        params: {
            id: string
        }
    }
}

type PropsInterface = StatePropsInterface & DispatchPropsInterface & ParamPropsInterface

const mapStateToProps = (state: StateInterface) => ({
    home: state.home,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    actions: bindActionCreators({
        getHomePageAction: HomeAction.getHomePageAction,
        changeTitleAction: MenuAction.changeTitleAction
    }, dispatch)
});

const Home: React.FunctionComponent<PropsInterface> = props => {

    useEffect(() => {
        if (typeof props.match.params.id == "undefined") {
            props.actions.getHomePageAction();
            props.actions.changeTitleAction('');
        } else {
            props.actions.getHomePageAction(props.match.params.id);
            props.actions.changeTitleAction('');
        }
    }, [])

    const renderBanner = () => {
        let settings = {
            dots: false,
            arrows: false,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplaySpeed: 3000,
            autoplay: true
        };

        let listBanner = props.home.banner.map((item, key) => {
            return (
                <div key={key}>
                    <a href={ '/chi-tiet/'+ item.slug }>
                        <img src={item.images.banner} alt={item.slug}/>
                    </a>
                </div>
            );
        })

        return (
            <div className="container-fluid banner-box header-3 pr-0 pl-0 overflow-hidden">
                <div className="container pr-0 pl-0">
                <div className="row">
                    <div className="col-12">
                    <Slider {...settings}>
                        { listBanner }
                    </Slider>
                    </div>
                </div>
                </div>
            </div>
        )
    }

    const renderRibbon = () => {
        if (props.home.ribbon.length > 0) {
            let listRibbon = props.home.ribbon.map((item, key) => {
                let movieRibbon = item.items.map((movie, keyMovie) => {
                    if (keyMovie < 2) {
                        let viewCount = (movie.views > 1000) ? Math.round(movie.views/1000) + 'K' : movie.views
                        return (
                            <div className="col-6 detail-1" key={keyMovie}>
                                <a href={ '/chi-tiet/'+ movie.slug }>
                                    <div className="text-center">
                                        <img src={movie.images.thumbnail} alt={movie.title}/>
                                    </div>
                                    <div className="phim-tieude">
                                        {movie.title}
                                    </div>
                                    <div className="row position-relative">
                                        <div className="col-6 div-left movie-view">
                                            <img className="phim-image" src={require('asset/img/vector.png')}/>
                                            <span className="phim-mota">{ viewCount } lượt xem</span>
                                        </div>
                                        <div className="col-6 div-left movie-like">
                                            <img className="phim-image" src={require('asset/img/heart.png')}/>
                                            <span className="phim-mota">{ movie.favorites } yêu thích</span>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        )
                    }
                });
                return (
                    <div className="container" key={key}>
                        <div className="row mb-2">
                            <div className="col-8 div-left">
                                <a href={'/danh-muc/' + item.id} className="input-a2 text-uppercase">{item.name}</a>
                            </div>
                            <div className="col-4 div-right">
                                <a href={'/danh-muc/' + item.id} className="input-a2">Tất cả &gt;</a>
                            </div>
                        </div>
                        <div className="row">
                            {movieRibbon}
                        </div>
                    </div>
                )
            });

            return (
                <div className="container-fluid header-4 pt-4 pr-0 pl-0">
                    {listRibbon}
                </div>
            )
        }
    }

    return (
        <div>
            <Header/>
            { renderBanner() }
            { renderRibbon() }
        </div>
    )

};

export default connect<StatePropsInterface, DispatchPropsInterface, PropsInterface, StateInterface>(
    mapStateToProps,
    mapDispatchToProps
)(Home);
