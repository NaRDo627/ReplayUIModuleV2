import React, {Component} from 'react';
import styled from 'styled-components'
import './Home.css'
import axios from 'axios';
const CenteredContainer = styled.div`
    text-align: center;
`
//const fs = require('fs');
class Home extends Component{
    state = {
        textFileName:null,
        textFileContent: "파일 내용이 표시됩니다",
        textAreaContent:null,
        username: null,
        selectedFile:null
    }
    constructor(props){
        super(props);
    }

    componentDidMount() {
        fetch('/api/getUsername')
            .then(res => res.json())
            .then(user => this.setState({ username: user.username }))
    }

    handleFileInput(e){
        var file = e.target.files[0];
        this.setState({
            selectedFile : file,
            textFileName : file.name
        })
        console.log(file);
    }

    filePost(){
        if(this.state.selectedFile == null){
            alert("파일이 없습니다");
            return;
        }
        const formData = new FormData();
        formData.append('file', this.state.selectedFile);
        axios.post("/api/sendFile", formData).then(res => {
            console.log(res.data.success);
            console.log("파일");
            this.setState({textFileContent:res.data.success})
            alert("전송이 완료되었습니다");
        }).catch(err => {
            alert("전송에 실패하였습니다");
        })
    }

    textPost(){
        if(this.state.textAreaContent == null){
            alert("텍스트가 없습니다");
            return;
        }
        console.log(this.state.textAreaContent);
        var text ={text:this.state.textAreaContent};
        var textJSON = JSON.stringify(text);
        axios.post("/api/sendText",text).then(res => {
            console.log(res.data.text);
            this.setState({textFileContent:res.data.text})
            alert("전송이 완료되었습니다");
        }).catch(err => {
            alert("전송에 실패하였습니다");
        })
    }

    handleTextInput(e){
        var text = e.target.value;
        this.setState({
            textAreaContent: text
        })
    }


    render() {
        const { username } = this.state;
        return (

            <CenteredContainer>
                <div className="wrapper">
                    <div className="title">
                        ReplayModuleV2.gg
                        {username ? <h1>{`-Hello ${username}-`}</h1> : <h1>Loading.. please wait!</h1>}
                    </div>
                    <div className="inputFile">
                        <label htmlFor={"fileInput"}>클릭하여 파일을 넣으세요 : {this.state.textFileName}</label>
                        <input id = "fileInput" type="file" name="file" onChange={e => this.handleFileInput(e)}/>
                        <button type="button" onClick={() => this.filePost()}>파일 전송</button>
                    </div>
                    <div className="inputFile">
                        <input id = "textInput" type ="text" placeholder="텍스트를 복사하여 넣으세요"
                        onChange = {e => this.handleTextInput(e)}></input>
                        <button type="button" onClick={() => this.textPost()}>텍스트 전송</button>
                    </div>
                    <div className = "outputz">
                        <h1>{this.state.textFileContent}</h1>
                    </div>
                </div>
            </CenteredContainer>
        );
    }
}

export default Home;
