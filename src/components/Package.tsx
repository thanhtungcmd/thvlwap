import * as React from "react"
import Header from "plugin/Header";
import {bindActionCreators, Dispatch} from "redux";
import * as MenuAction from "action/menu.action";
import {useEffect, useState} from "react";
import {connect} from "react-redux";
import StateInterface from "../reducer/index.reducer.type";
import * as ls from "local-storage";

interface DispatchPropsInterface {
    actions?: {
        changeTitleAction: any,
    }
}

type PropsInterface = DispatchPropsInterface;

const mapDispatchToProps = (dispatch: Dispatch) => ({
    actions: bindActionCreators({
        changeTitleAction: MenuAction.changeTitleAction,
    }, dispatch)
});

const Package: React.FunctionComponent<PropsInterface> = props => {

    const [packageList, setPackage] = useState([
        {
            name: "Gói THVL data ngày",
            syntax: "VL",
            board: '999',
            code: "VL1",
            data: '180MB'
        },
        {
            name: "Gói THVL data tháng",
            syntax: "VL30",
            board: '999',
            code: "VL30",
            data: '1G'
        },
        {
            name: "Gói THVL data VIP",
            syntax: "VL80",
            board: '999',
            code: "VL80",
            data: '3G'
        },
    ])

    useEffect(() => {
        props.actions.changeTitleAction("Gói cước Free Data");
    }, [])

    const renderItem = () => {

        return packageList.map((item, key) => {
            let checked;
            let mobifone_package = ls.get<string>('mobifone_package');
            if (mobifone_package == item.code) {
                checked = (
                    <div className="package-check">
                        <img style={{ width: 50 }} src={ require('asset/img/check-2.png') } alt="package"/>
                    </div>
                )
            }
            return (
                <div className="row pb-5" key={key}>
                    <div className="col-5 position-relative">
                        <img id={"package-img-" + (key + 1)} src={ require('asset/img/package-'+ (key + 1) +'.png') } alt="package"/>
                        { checked }
                    </div>
                    <div className="col-7 pl-0">
                        <div className="package-title">{ item.name }</div>
                        <div className="package-price">
                            Soạn <span>{ item.syntax }</span> gửi <span>{ item.board }</span>
                        </div>
                        <div className="package-sub">
                            Tặng { item.data } tốc độ cao lướt internet<br/>
                            Không giới hạn 3G 4G tốc độ cao xem THVL <br/>
                            Không phải xem quảng cáo online
                        </div>
                    </div>
                </div>
            )
        })
    }

    const renderPackage = () => {
        return (
            <div className="container-fluid header-6 pr-0 pl-0 mt-3 color-white">
                <div className="container pr-0 pl-0">
                    <nav className="nav nav-pills nav-fill play-nav">
                        <div className={"nav-item nav-link active"}>Mobifone</div>
                        <div className={"nav-item nav-link"}>Viettel</div>
                        <div className={"nav-item nav-link"}>Vinaphone</div>
                    </nav>
                    <div className="tab-content">
                        <div className={"tab-pane fade show active"}>
                            <div className="container mt-3 header-6">
                                { renderItem() }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div>
            <Header/>
            { renderPackage() }
        </div>
    );

}

export default connect<{}, DispatchPropsInterface, PropsInterface, StateInterface>(
    null,
    mapDispatchToProps
)(Package);
