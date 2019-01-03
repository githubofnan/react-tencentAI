import logo from '../public/images/logo.svg';
import {faceDecoration, faceCosmetic, faceAge} from '../util/api';
import React, { Component } from 'react';
import store from '../store/store.js'
import '../public/css/App.css';

class App extends Component {
    constructor (props) {
        super(props)
        this.state = {
            type: 1,
            image: '',
            optionId: 1,
            showOpts: [],
            optHide: false,
            userInfo: null,
            cosmeticOpts: [],
            decorationOpts: [],
            errMsg: 'Please upload a self-portrait of your face',
        }
    }

    componentDidMount () {
        console.log(store.getState().user)
        if(store.getState().user.userInfo){
            this.setState({userInfo: store.getState().user.userInfo})
        }
        let cosmeticOpts = [];
        for(let i=1; i<24; i++){
            cosmeticOpts.push(`http://yyb.gtimg.com/aiplat/ai/upload/doc/facecosmetic/${i}.png`)
        }
        let decorationOpts = [];
        for(let i=1; i<23; i++){
            decorationOpts.push(`https://yyb.gtimg.com/aiplat/ai/upload/doc/facedecoration/${i}.jpg`)
        }
        this.setState({showOpts: decorationOpts})
        this.setState({cosmeticOpts: cosmeticOpts})
        this.setState({decorationOpts: decorationOpts})
    }

    imageType (type) {
        this.setState({type: type});
        switch (type){
            case 1:
                this.setState({optHide: false})
                this.setState({showOpts: this.state.decorationOpts})
                break;
            case 2:
                this.setState({optHide: false})
                this.setState({showOpts: this.state.cosmeticOpts})
                break;
            default:
                this.setState({showOpts: ''})
        }
    }

    tapChoseImage () {
        document.querySelector('.file').click()
    }

    tapOptionShow () {
        if(this.state.optHide){
            this.setState({optHide: false})
        }
    }

    tapOptions (idx) {
        if(this.state.optHide) return;
        this.setState({optHide: true})
        this.setState({optionId: idx+1})
    }

    tapUploadImage (e) {
        this.setState({image: ' '})
        this.setState({errMsg: 'Uploading...'})
        var type = e.target.files[0].type;
        switch (this.state.type){
            case 1: 
                // const decoration = Math.ceil(Math.round(1000*Math.random())%22);
                faceDecoration(e.target.files[0], this.state.optionId, res => {
                    console.log(res)
                    if(res.data.code===0){
                        if(res.data.result.ret===0){
                            this.setState({errMsg: ''})
                            let src = res.data.result.data.image;
                            this.setState({image: `data:${type};base64,${src}`})
                            document.querySelector('.file').value = '';
                        }else{
                            this.setState({errMsg: res.data.result.msg})
                        }
                    }else{
                        this.setState({errMsg: res.data.msg})
                    }
                })
                break;
            case 2: 
                // const cosmetic = Math.ceil(Math.round(1000*Math.random())%23);
                faceCosmetic(e.target.files[0], this.state.optionId, res => {
                    console.log(res)
                    if(res.data.code===0){
                        if(res.data.result.ret===0){
                            this.setState({errMsg: ''})
                            let src = res.data.result.data.image;
                            this.setState({image: `data:${type};base64,${src}`})
                            document.querySelector('.file').value = '';
                        }else{
                            this.setState({errMsg: res.data.result.msg})
                        }
                    }else{
                        this.setState({errMsg: res.data.msg})
                    }
                })
                break;
            case 3:
                faceAge(e.target.files[0], res => {
                    console.log(res)
                    if(res.data.code===0){
                        if(res.data.result.ret===0){
                            this.setState({errMsg: ''})
                            let src = res.data.result.data.image;
                            this.setState({image: `data:${type};base64,${src}`})
                            document.querySelector('.file').value = '';
                        }else{
                            this.setState({errMsg: res.data.result.msg})
                        }
                    }else{
                        this.setState({errMsg: res.data.msg})
                    }
                })
                break;
            default:
                return false;
        }
    }

    render () {
        let optionView = '';
        if(this.state.showOpts){
            optionView = this.state.showOpts.map((item, idx) =>
                (<div className={`option_list ${this.state.optionId===idx+1?'bor':''}`} key={idx} onClick={this.tapOptions.bind(this, idx)}>
                    <img  src={item} name={idx} alt=""/>
                </div>)
            )
        }
        return (
            <div className="box">
                <div className="main">
                    {
                        this.state.errMsg?(<p className="err_msg">{this.state.errMsg}</p>):''
                    }
                    {
                        this.state.image?(<img src={this.state.image} alt=""/>):''
                    }
                </div>
                <div className={`options ${this.state.optHide?'opt_hide':''}`} onClick={this.tapOptionShow.bind(this)}>
                    <div className="option_all">{ optionView }</div>
                </div>
                <footer className="footer">
                    <div className={`foot_list ${this.state.type===1?'checked':null}`} onClick={this.imageType.bind(this, 1)}>DECO</div>
                    <div className={`foot_list ${this.state.type===2?'checked':null}`} onClick={this.imageType.bind(this, 2)}>COMM</div>
                    <div className="foot_center" onClick={this.tapChoseImage.bind(this)}>
                        <img className="logo" src={logo} alt=""/>
                        <input type="file" className="file" onChange={this.tapUploadImage.bind(this)} />
                    </div>
                    <div className={`foot_list ${this.state.type===3?'checked':null}`} onClick={this.imageType.bind(this, 3)}>AGE</div>
                    <div className="foot_list" onClick={()=>{this.props.history.push('/login')}}>SIGN</div>
                </footer>
            </div>
        );
    }
}

export default App;
