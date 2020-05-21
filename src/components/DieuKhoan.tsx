import * as React from "react"
import Header from "plugin/Header";
import StateInterface from "../reducer/index.reducer.type";
import {bindActionCreators, Dispatch} from "redux";
import * as MenuAction from "action/menu.action";
import {connect} from "react-redux";
import {useEffect} from "react";

interface DispatchPropsInterface {
    actions?: {
        changeTitleAction: any,
    }
}

interface StatePropsInterface {

}

type PropsInterface = StatePropsInterface & DispatchPropsInterface

const mapStateToProps = (state: StateInterface) => ({

});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    actions: bindActionCreators({
        changeTitleAction: MenuAction.changeTitleAction,
    }, dispatch)
});

const DieuKhoan: React.FunctionComponent<PropsInterface> = props => {

    useEffect(() => {
        props.actions.changeTitleAction("Điều khoản dịch vụ");
    });

    return (
        <div>
            <Header/>
            <div className="container-fluid header-6 pr-0 pl-0">
                <div className="container">
                    <div className="row mt-5">
                        <div className="col-12 text-white">
                            <div className="text-center">
                                <img style={{ width: 100 }} alt="logo" src={ require('asset/img/logo.png') } />
                            </div>
                            <div className="text-uppercase text-title text-center mt-4" style={{ fontSize: 18 }}>
                                Điều khoản dịch vụ của thvli
                            </div>
                            <div className="mt-3 font-weight-bold">1. Điều khoản thông thường</div>
                            <div className="mt-3 text-justify">
                                Người sử dụng có trách nhiệm đọc kỹ các điều khoản được nêu tại đây trước khi sử dụng dịch vụ THVLi. <br/>
                                Người sử dụng dịch vụ THVLi được coi là hoàn toàn đồng ý với các điều khoản được nêu ra tại đây.
                            </div>
                            <div className="mt-3 font-weight-bold">2. Điều khoản với chủ tài khoản</div>
                            <div className="mt-3 text-justify">
                                Người sử dụng phải tuân thủ các quy định và cũng như các hành vi dưới đây:<br/>
                                - Không truyền bá nội dung chống phá hiến pháp và pháp luật, các quy định của pháp luật.<br/>
                                - Không kích động, tuyên truyền chống phá chế độ.<br/>
                                - Không tuyên truyền kích động làm mất trật tự xã hội.<br/>
                                - Không tuyên truyền nội dung mê tín dị đoan, cờ bạc, khiêu dâm, bạo lực,…hoặc nội dung trái với thuần phong mỹ tục của Việt Nam.<br/>
                                - Không nói xấu, xâm phạm danh dự và quyền cá nhân của người khác.<br/>
                                - Không bôi nhọ, tổn hại danh dự của các cơ quan, tổ chức.<br/>
                                - Không phát tán các thông tin bất hợp pháp, lừa gạt…<br/>
                                - Không phát tán bất kỳ loại mã độc, virus…hay các thành phần nguy hại đến sự an toàn của hệ thống dịch vụ.
                            </div>
                            <div className="mt-3 font-weight-bold">3. Rủi ro cá nhân khi sử dụng</div>
                            <div className="mt-3 text-justify">
                                Khi sử dụng ứng dụng này người sử dụng chấp thuận và đồng ý với việc có thể gặp một số rủi ro và đồng ý rằng THVLi cũng như các bên liên kết chịu trách nhiệm xây dựng dịch vụ ứng dụng này sẽ không chịu trách nhiệm pháp lý cho bất cứ thiệt hại nào đối với với người sử dụng dù là trực tiếp, đặc biệt, ngẫu nhiên, hậu quả để lại, bị phạt hay bất kỳ mất mát, phí tổn hoặc chi phí có thể phát sinh trực tiếp hay gián tiếp qua việc sử dụng hoặc chuyển tải dữ liệu từ ứng dụng này, bao gồm nhưng không giới hạn bởi tất cả những ảnh hưởng do mã độc, virus,… tác động hoặc không tác động đến thiết bị của người sử dụng như hệ thống mạng, máy tính và các thiết bị di động.
                            </div>
                            <div className="mt-3 font-weight-bold">4. Ngưng cấp quyền sử dụng</div>
                            <div className="mt-3 text-justify">
                                Người sử dụng THVLi sẽ bị ngưng cấp quyền sử dụng dịch vụ (tuỳ theo mức độ nghiêm trọng admin sẽ khoá, treo, xoá tài khoản của người sử dụng vi phạm (block, suspend, remove violated accounts) mà không được báo trước nếu vi phạm một trong những điều sau:<br/>
                                - Truyền bá nội dung chống phá hiến pháp và pháp luật, các quy định của pháp luật.<br/>
                                - Kích động, tuyên truyền chống phá chế độ.<br/>
                                - Tuyên truyền kích động làm mất trật tự xã hội.<br/>
                                - Tuyên truyền nội dung mê tín dị đoan, cờ bạc, khiêu dâm, bạo lực,…hoặc nội dung trái với thuần phong mỹ tục của Việt Nam.<br/>
                                - Nói xấu, xâm phạm danh dự và quyền cá nhân của người khác.<br/>
                                - Bội nhọ, tổn hại danh dự của các cơ quan, tổ chức.<br/>
                                - Phát tán các thông tin bất hợp pháp, lừa gạt…<br/>
                                - Phát tán bất kỳ loại mã độc, virus…hay các thành phần, hành vi nguy hại đến sự an toàn của hệ thống dịch vụ.<br/>
                                - Phát tán các nội dung spam, không phù hợp trên ứng dụng.<br/>
                                - Vi phạm các quy định khác.<br/>
                                THVLi sẽ không chịu trách nhiệm hay có nghĩa vụ gì đối với các nội dung đó. Khi có yêu cầu của cơ quan pháp luật, THVLi sẽ tích cực phối hợp để làm rõ hành vi đăng tải thông tin và dữ liệu trái phép.<br/>
                            </div>
                            <div className="mt-3 font-weight-bold">5. Nội dung dịch vụ</div>
                            <div className="mt-3 text-justify">
                                Đối với nội dung dịch vụ do ban quản trị của THVLi đăng tải:<br/>
                                Các nội dung này được cung cấp không kèm theo bất kỳ cam kết nào. Ban quản trị THVLi không bảo đảm hay khẳng định sự đúng đắn, tính chính xác, độ tin cậy hay bất cứ chuẩn mực nào trong việc sử dụng dữ liệu hay kết qủa của việc sử dụng dữ liệu trên ứng dụng này.<br/>
                                Đối với nội dung do thành viên đăng tải lên:<br/>
                                Mọi thành viên, khi sử dụng ứng dụng, cần ý thức rằng những hành động của mình cần phải hoàn toàn phù hợp với các quy định của luật pháp hiện hành và chịu hoàn toàn trách nhiệm trước pháp luật đối với nội dung mình đưa lên.<br/>
                            </div>
                            <div className="mt-3 font-weight-bold">6. Trách nhiệm bồi thường</div>
                            <div className="mt-3 text-justify">
                                Trong trường hợp THVLi bị bên thứ ba yêu cầu đòi bồi thường xuất phát từ việc người sử dụng vi phạm nội dung hoặc hành vi. Thì người sử dụng đó sẽ phải chịu toàn bộ trách nhiệm bồi thường và trách nhiệm pháp luật tương ứng.
                            </div>
                            <div className="mt-3 font-weight-bold">7. Bản quyền</div>
                            <div className="mt-3 text-justify">
                                Đối với bản quyền của các tác giả, tác phẩm, các sản phẩm trí tuệ về âm nhạc, THVLi luôn cố gắng đảm bảo rằng tất cả nội dung trên ứng dụng đều tuân thủ pháp luật, nhưng chúng tôi không cam kết chắc chắn rằng có thể kiểm soát mọi thông tin trên ứng dụng. Bất kỳ hành vi xâm phạm đến bản quyền nào nếu bị phát hiện sẽ bị gỡ bỏ khỏi ứng dụng trong thời gian sớm nhất.
                            </div>
                            <div className="mt-3 font-weight-bold">
                                8. Sở hữu trí tuệ
                            </div>
                            <div className="mt-3 text-justify">
                                Các thành phần của ứng dụng, bao gồm thiết kế, logo, các phần mềm, chức năng kỹ thuật, các hình ảnh, cấu trúc đều thuộc bản quyền của THVLi. Nghiêm cấm mọi sao chép, sửa đổi, trưng bày, phân phát, chuyển tải, tái sử dụng, xuất bản, bán, cấp phép, tái tạo hay sử dụng bất cứ nội dung nào cho bất kỳ mục đích nào mà không có sự xác nhận bằng văn bản.
                            </div>
                            <div className="mt-3 font-weight-bold">
                                9. Sử dụng thông tin
                            </div>
                            <div className="mt-3 text-justify">
                                Khi sử dụng ứng dụng THVLi là người sử dụng đã đồng ý rằng mọi thông tin hay dữ liệu mà người sử dụng đăng tải lên ứng dụng này dưới bất kỳ hình thức nào, vì bất kỳ lý do gì, sẽ sẽ được THVLi toàn quyền sử dụng và được sử dụng miễn phí. Người sử dụng chấp nhận không đòi hỏi bất cứ khoản phí nào liên quan đến việc THVLi sử dụng những thông tin này. Người sử dụng đồng ý cho THVLi toàn quyền đăng tải những nội dung phù hợp được THVLi lựa chọn trên các phương tiện truyền thông và người sử dụng sẽ không đòi bất ký mức phí nào. Người sử dụng đồng ý sẽ không có bất kỳ tranh chấp nào đối với nội dung do THVLi sử dụng và đăng tải trên các phương tiện truyền thông và các nền tảng khác.
                            </div>
                            <div className="mt-3 font-weight-bold">
                                10. Quyền hạn của THVLi
                            </div>
                            <div className="mt-3 text-justify">
                                Chúng tôi có quyền cấm hoặc từ chối đăng nhập của bất kỳ tài khoản của người sử dụng/thành viên nào bị phát hiện vi phạm các quy định nêu trong Bản thoả thuận này. THVLi có thể phối hợp với các cơ quan pháp luật để truy cứu trách nhiệm đối với những trường hợp nghiêm trọng.<br/>
                                THVLi có quyền thay đổi, bổ sung, thêm hoặc bớt nội dung ứng dụng cũng như các điều khoản sử dụng, chính sách vào bất cứ lúc nào mà không cần báo trước và người dung/ thành viên mặc nhiên đồng ý chấp hành các sửa đổi mới.<br/>
                                THVLi có quyền chủ động đăng tải những nội dung quảng cáo và thông báo những nội dung thông tin đến người sử dụng.<br/>
                                Chúng tôi có quyền cung cấp các thông tin liên quan đến người sử dụng/ thành viên trong trường hợp các cơ quan pháp luật yêu cầu.<br/>
                            </div>
                            <div className="mt-3 font-weight-bold">
                                11. Thông tin cá nhân
                            </div>
                            <div className="mt-3 text-justify">
                                Toàn bộ thông tin cá nhân củ a người sử dụng THVLi chỉ được lưu trữ bảo mật trên máy chủ của THVLi, nhằm cải tiến sản phẩm và nâng cao trải nghiệm người dùng được tốt hơn. Các thông tin cá nhân không được phép cung cấp cho bên thứ 3.
                            </div>
                            <div className="mt-3 font-weight-bold">
                                12. Quảng cáo của bên thứ ba
                            </div>
                            <div className="mt-3 text-justify">
                                THVLi có thể đăng quảng cáo và quảng cáo có thể bao gồm các đường dẫn tới các trang web khác. Cũng như nhiều website khác, THVLi thiết lập và sử dụng cookie để tìm hiểu thêm về cách quý khách tương tác với nội dung và giúp THVLi cải thiện trải nghiệm của quý khách, cũng như duy trì thiết lập cá nhân của quý khách...
                            </div>
                            <div className="mt-3 font-weight-bold">
                                13. Mạng xã hội
                            </div>
                            <div className="mt-3 text-justify">
                                Các tính năng xã hội của THVLi cung cấp cơ hội để chia sẻ thông tin. Thông tin này có thể được chia sẻ trong THVLi cũng như trên các mạng xã hội khác và trong các phương tiện truyền thông. Quý khách có thể chọn để sử dụng các tính năng xã hội của THVLi bằng cách kết nối vào tài khoản THVLi của quý khách.
                            </div>
                            <div className="mt-3 font-weight-bold">
                                14. Điều khoản thi hành
                            </div>
                            <div className="mt-3 text-justify">
                                Điều khoản sử dụng này có hiệu lực kề từ khi được đưa lên ứng dụng. Và có hiệu lực đối với người sử dụng kể từ khi người sử dụng đồng ý sử dụng ứng dụng.
                            </div>
                            <div className="mt-4 mb-3 font-italic">
                                © Bản quyền thuộc về Đài Phát Thanh và Truyền Hình Vĩnh Long
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default connect<StatePropsInterface, DispatchPropsInterface, PropsInterface, StateInterface>(
    mapStateToProps,
    mapDispatchToProps
)(DieuKhoan);
