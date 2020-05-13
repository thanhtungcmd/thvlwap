import * as React from "react"
import Header from "plugin/Header";
import {HomeState} from "../reducer/home.reducer.type";
import StateInterface from "../reducer/index.reducer.type";
import {bindActionCreators, Dispatch} from "redux";
import * as HomeAction from "action/home.action";
import {connect} from "react-redux";
import {useEffect} from "react";

interface StatePropsInterface {
    home?: HomeState
}

interface DispatchPropsInterface {
    actions?: {
        getHomePageAction: any,
    }
}

type PropsInterface = StatePropsInterface & DispatchPropsInterface

const mapStateToProps = (state: StateInterface) => ({
    home: state.home,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    actions: bindActionCreators({
        getHomePageAction: HomeAction.getHomePageAction
    }, dispatch)
});

const Home: React.FunctionComponent<PropsInterface> = props => {

    useEffect(() => {
        props.actions.getHomePageAction();
    }, [])

    useEffect(() => {
        console.log(props.home);
    })

    return (
        <div className="container-fluid header-1">
            <Header/>
        </div>
    )

};

export default connect<StatePropsInterface, DispatchPropsInterface, PropsInterface, StateInterface>(
    mapStateToProps,
    mapDispatchToProps
)(Home);
