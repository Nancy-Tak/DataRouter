/**
 * Created by Ethan on 2016/11/2.
 */
import React,{Component} from 'react';
import { Router,History,Link } from 'react-router';
import { Row,Col,Menu,Icon,Breadcrumb,Form,Input,Button,Select,Message,Collapse  } from 'antd';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {actionSource} from 'ACTION';
import moment from 'moment';
import ruleType from 'UTILS/ruleType';
import {helper} from 'UTILS';
const SubMenu = Menu.SubMenu;
const createForm = Form.create;
const FormItem = Form.Item;
const Option = Select.Option;
const Panel = Collapse.Panel;

class Editor extends Component {
    static defaultProps = {
        sourceproductsEdit:{}
    }
    constructor(props) {
        super(props);
        this.state = {current: 'search'};
    }
    componentDidMount(){
        this.loadData()
    }
    componentDidUpdate() {
        const {getFieldValue,setFields} = this.props.form; //用于和表单进行双向绑定
        const {failMassage}= this.props;
        if(failMassage){
            helper.focusError(this.props.form, failMassage);
            this.props.action.fetchInstitutionsSaveClear();
        }
    }
    loadData(){
        let paramsObj = this.props.params.obj;

        /**
         * 如果url存在就跳转到详情，否则就跳走了。
         */
        if(paramsObj){
            //获取数据机构列表
           // console.log("paramsObj",paramsObj)
            this.props.action.fetchSourceproductsEdit(paramsObj)
        }else{
            this.props.history.push("/source/products")
        }

    }
    //获取初始值
    getFeeType(obj){
        let feeType = {}
        let { sourceproductsEdit } = this.props;
        obj.map( (item,index)=>{
            if(item.id==sourceproductsEdit.curFeeId){
                feeType = {
                    fee:item.fee,
                    id:item.id,
                    prodId:item.prodId,
                }
            }
        })
        return feeType
    }
    //获取FeeTypeId
    getFeeTypeId(type){

        let getFeeTypeId = {}
        let { sourceproductsEdit } = this.props;
        let sourceproductsEditProductFees = sourceproductsEdit.productFees || []
       // console.log(type)
       // console.log(sourceproductsEditProductFees)
        sourceproductsEditProductFees.map( (item,index)=>{
          //  console.log("item.prodId",item.prodId)
            if(item.id==type){
                getFeeTypeId = {
                    fee:item.fee,
                    id:item.id,
                    prodId:item.prodId,
                    feeDesc:item.feeDesc
                }
            }
        })
       // console.log("getFeeTypeId",getFeeTypeId)
        return getFeeTypeId
    }
    handleSubmit(e) {
        let { sourceproductsEdit } = this.props;
        let sourceproductsEditProductFees = sourceproductsEdit.productFees || []
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((errors, values) => {
            if (!!errors) {
               // console.log('Errors in form!!!');
                return;
            }
          //  console.log('Submit!!!');
            let getFeeTypeId = this.getFeeTypeId(values.productFees);

            //id
            //this.getFeeTypeId(values.productFees);

            let saveData = {
                "dataAttr":values.dataAttr || null,
                "feeType":{
                    fee:values.fee || null,
                    id:getFeeTypeId.id || null,
                },
                "id":sourceproductsEdit.id || null,
                "prodDesc":values.prodDesc || null,
                "productTypeId":values.infraProductTypes || null,
                "scope":values.scope || null,
            }
           // console.log("saveData",saveData)
            if(getFeeTypeId.feeDesc=="请选择"){
                Message.error("请选择收费方式");
            }else{
                this.props.action.fetchSourceproductsSave(saveData,sourceproductsEdit && sourceproductsEdit.infraId)
            }
        });
    }
    callback(key) {
      //console.log(key);
    }


    render() {

        let { sourceproductsEdit } = this.props;
        let sourceproductsEditInfraProductTypes = sourceproductsEdit.infraProductTypes || []
        let sourceproductsEditProductFees = sourceproductsEdit.productFees || []
        const { getFieldProps, getFieldError, isFieldValidating } = this.props.form;

        const infraProductTypesProps = getFieldProps('infraProductTypes', {
          rules: [
            { required: true, message: '请选择您的源产品类型',type: 'number' },
          ],
          initialValue:sourceproductsEdit.productTypeId
        });
        const dataAttrProps = getFieldProps('dataAttr', {
          rules: [
            { required: true, message: '请选择您的数据属性',type: 'string' },
          ],
          initialValue:sourceproductsEdit.dataAttr
        });
        const scopeProps = getFieldProps('scope', {
          rules: [
            { required: true, message: '请选择您的数据覆盖范围',type: 'number' },
          ],
          initialValue:sourceproductsEdit.scope
        });
        const prodDescProps = getFieldProps('prodDesc', {
            rules: [
                { required: false, message: '源产品说明' },
                {min: 1, max: 99, message: '仅支持输入1-99位'},
                ruleType('cn+en')
            ],
            initialValue:sourceproductsEdit.prodDesc
        });



        const productFeesProps = getFieldProps('productFees', {
          rules: [
            { required: false, message: '收费方式',type: 'number' },
          ],
          initialValue:this.getFeeType(sourceproductsEditProductFees).id
        });


        const feeProps = getFieldProps('fee', {
            rules: [
                { required: false, message: '请输入您的产品价格'},
                ruleType('productPrice')
            ],
            initialValue:this.getFeeType(sourceproductsEditProductFees).fee
        });


        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 12 },
        };
        return (
            <div className="fn-pa-10">
                <div className="panel">
                    <div className="fn-pa-10">
                        <div className="panel">

                            <Collapse defaultActiveKey={['1','2']} onChange={this.callback.bind(this)}>
                                <Panel header="基本信息" key="1">
                                    <div>
                                        <div className="clearfix source-table">
                                            <div className="source-table-l">
                                                源产品编号：
                                            </div>
                                            <div className="source-table-r">
                                                {sourceproductsEdit.productCode}
                                            </div>
                                        </div>
                                        <div className="clearfix source-table">
                                            <div className="source-table-l">
                                                源产品名称：
                                            </div>
                                            <div className="source-table-r">
                                                {sourceproductsEdit.name}
                                            </div>
                                        </div>
                                        <div className="clearfix source-table">
                                            <FormItem
                                              {...formItemLayout}
                                              label="源产品类型"
                                            >
                                              <Select {...infraProductTypesProps} placeholder="源产品类型" style={{ width: '100%' }}>
                                                {
                                                    sourceproductsEditInfraProductTypes.map( (item,index)=>{
                                                        return (
                                                            <Option key={index} value={item.id}>{item.name}</Option>
                                                        )
                                                    })
                                                }
                                              </Select>
                                            </FormItem>
                                        </div>
                                        <div className="clearfix source-table">
                                            <div className="source-table-l">
                                                服务方式：
                                            </div>
                                            <div className="source-table-r">
                                                {sourceproductsEdit.serviceName}
                                            </div>
                                        </div>

                                        <div className="clearfix source-table">
                                            <FormItem
                                              {...formItemLayout}
                                              label="数据属性"
                                              hasFeedback

                                            >
                                            <Select {...dataAttrProps} placeholder="数据属性" style={{ width: '100%' }}>
                                                <Option value="个人">个人</Option>
                                                <Option value="企业">企业</Option>
                                            </Select>
                                            </FormItem>
                                        </div>

                                        <div className="clearfix source-table">
                                            <FormItem
                                              {...formItemLayout}
                                              label="数据覆盖范围"
                                              hasFeedback
                                            >
                                            <Select {...scopeProps} placeholder="数据覆盖范围" style={{ width: '100%' }}>
                                                <Option value={1}>全国</Option>
                                                <Option value={2}>部分地区</Option>
                                            </Select>
                                            </FormItem>
                                        </div>


                                        <div className="clearfix source-table">
                                            <div className="source-table-l">数据更新周期：</div>
                                            <div className="source-table-r">
                                                 {
                                                     sourceproductsEdit.updateCycle
                                                     ?
                                                     <span>T + {sourceproductsEdit.updateCycle}自然日</span>
                                                     :
                                                     <span>暂无数据</span>
                                                 }
                                             </div>
                                        </div>

                                        <div className="clearfix source-table">
                                            <FormItem
                                              {...formItemLayout}
                                              label="源产品说明"
                                              hasFeedback
                                            >
                                            <Input
                                                type="textarea"
                                                rows={4}
                                                placeholder="可以查看个人的基本身份信息，包括姓名、证件信息等。"
                                                {...prodDescProps}
                                                />
                                            </FormItem>
                                        </div>


                                    </div>
                                </Panel>
                                <Panel header="资费说明" key="2">
                                    <div>
                                        <div className="clearfix source-table">
                                            <FormItem
                                              {...formItemLayout}
                                              label="收费方式"
                                              hasFeedback
                                            >
                                                <Select {...productFeesProps} placeholder="收费方式" style={{ width: '100%' }}>
                                                    {
                                                        sourceproductsEditProductFees.map( (item,index)=>{
                                                            return (
                                                                <Option key={item.id} value={item.id}>{item.feeDesc}</Option>
                                                            )
                                                        } )
                                                    }
                                                </Select>
                                            </FormItem>
                                        </div>
                                        <div className="clearfix source-table">
                                            <FormItem
                                              {...formItemLayout}
                                              label="产品价格"
                                              hasFeedback
                                            >
                                                <Input {...feeProps} placeholder="产品价格"  style={{width:"100px"}} />
                                                元/次
                                            </FormItem>
                                        </div>

                                    </div>
                                </Panel>
                            </Collapse>



                            <div className="clearfix source-table">
                                <div style={{"text-align":"center"}}>
                                    <Button
                                        type="primary"
                                        size="large"
                                        onClick={this.handleSubmit.bind(this)}
                                    >
                                        保存
                                    </Button>
                                    <Link
                                        to={`/source/data/home`}
                                        className="ant-btn ant-btn-lg fn-ml-20"
                                        href="javascript:;"
                                        >
                                        返回
                                    </Link>
                                </div>
                            </div>


                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


//将state.counter绑定到props的counter
function mapStateToProps(state, props) {
    //console.log("state=>")
    //console.log("hhh", state)
    return {
        sourceproductsEdit:state.sourceReducer.sourceproductsEdit,
        failMassage: state.sourceReducer.failMassage,
    }
}
//将action的所有方法绑定到props上
//去掉action会好爽，但代码不好看。等于直接掉方法
function mapDispatchToProps(dispatch) {
    //console.log("hhhhhdddd")
    return {
        action: bindActionCreators(actionSource, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(createForm()(Editor));
