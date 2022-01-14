// import axios from 'axios'
import {useState} from 'react'
import {useMutation, gql} from '@apollo/client'
// import { defaultFieldResolver } from 'graphql'

import {Wrapper, Title, 
    AccountSection, Label, Writer, Password,
    Longbox, Contents, InputWrapper,
    AddressBtn, ZipcodeWrapper, Zipcode, ZipWrapper,
    ImageWrapper, GreyBoxes, Box,BoxWord, 
    OptionWrapper, RadioWrapper, RadioButton, ButtonWrapper, MyBtn, Your__Error} 
    from '../../styles/emotion';

const CREATE_BOARD = gql`
    mutation createBoard($writer: String, $title: String, $contents: String){
        createBBoard (writer: $writer, title: $title, contents: $contents){
            _id
            number
            message
        }
    }
`
//onClickSubmit declared but not read (??)
//radio button still deactivating


export default function FreeBoard(){
    const[writer, setWriter] = useState("");
    const[pw, setPw] = useState("");
    const[topic, setTopic] = useState("");
    const[contents, setContents] = useState("");

    //Alert Messages
    const[writerError, setWriterError] = useState("");
    const[pwError, setPwError] = useState("");
    const[topicError, setTopicError] = useState("");
    const[contentsError, setContentsError] = useState("");

    const [bbb] = useMutation(CREATE_BOARD)

    const submit = async() => {
        const result =  await bbb({ 
        variables: {writer: writer , password: pw, title: Title, contents: contents}
        }) 
        console.log(result.data.createBoard.message)
    }

    const OnClickSubmit = async() => {
        await CREATE_BOARD({
        variables: {
            writer: "JB",
            title: "Title goes here",
            contents: "codecamp"
        }
        }) 
    }


    function onChangeMyWriter(event){
        setWriter(event.target.value);
        if(writer.length>1){
            setWriterError("")
        }
    } 
    function onChangeMyPw(event){
        setPw(event.target.value);
        if(pw.length>7){
            setPwError("")
    }
}
    
    function onChangeMyTitle(event){
        setTopic(event.target.value);
        if(topic.length>0){
            setTopicError("")
    }
}

    function onChangeMyContents(event){
        setContents(event.target.value);
        if(contents.length>9){
            setContentsError("")
    }
}


    function onClickSubmit(){
        if (writer<2) {
            setWriterError("* 성을 포함하여 정확한 이름을 입력해주세요");
        } 
        if (pw<8) {
            setPwError("* 비밀번호를 8자 이상 입력해주세요");
        }
        if (topic<1) {
            setTopicError("* 제목을 한 글자 이상 입력해주세요");
        }
        if (contents<10) {
            setContentsError("* 내용을 10자 이상 입력해주세요");
        }
        if (writer>1 
            && pw>7
            && topic>0
            && contents>9) {

                await createBoard({
                    variables: {
                        createBoardInput: {
                            writer,
                            Password,
                            Title,
                            contents,
                        },
                    },
                })
            alert("게시물이 등록됐습니다");
        }
    }


    return(
            <Wrapper>
                <Title>게시물 등록</Title>
                        <AccountSection>
                            <InputWrapper>
                                <Label>작성자</Label>
                                <Writer tyep="text" placeholder="이름을 적어주세요" onChange={onChangeMyWriter}></Writer><br/>
                                <Your__Error>{writerError}</Your__Error> 
                            </InputWrapper>
                            <InputWrapper>
                                <Label>비밀번호</Label>
                                <Password type="password" placeholder="비밀번호를 입력해주세요" onChange={onChangeMyPw}></Password><br/>
                                <Your__Error>{pwError}</Your__Error> 
                            </InputWrapper>
                        </AccountSection>
                        

                        <InputWrapper>
                            <Label>제목</Label>
                            <Longbox type="text" placeholder="제목을 작성해주세요" onChange={onChangeMyTitle}></Longbox><br/>
                            <Your__Error>{topicError}</Your__Error> 
                        </InputWrapper>

                        <InputWrapper>
                            <Label>내용</Label>
                            <Contents type="text" placeholder="내용을 작성해주세요" onChange={onChangeMyContents}></Contents><br/>
                            <Your__Error>{contentsError}</Your__Error>
                        </InputWrapper>

                        <ZipWrapper>
                            <Label>주소</Label>
                            <ZipcodeWrapper>
                                <Zipcode placeholder="00000"></Zipcode>
                                <AddressBtn>우편번호 검색</AddressBtn>
                            </ZipcodeWrapper>
                            <Longbox/>
                            <Longbox/>
                        </ZipWrapper>

                        <InputWrapper>
                            <Label>유튜브</Label>
                            <Longbox placeholder="링크를 복사해주세요"/>
                        </InputWrapper>

                        <ImageWrapper>
                            <Label>사진 첨부</Label>
                            <GreyBoxes>
                                <Box>
                                    <BoxWord>+</BoxWord>
                                    <BoxWord>Upload</BoxWord>
                                </Box>
                                <Box>
                                    <BoxWord>+</BoxWord>
                                    <BoxWord>Upload</BoxWord>
                                </Box>
                                <Box>
                                    <BoxWord>+</BoxWord>
                                    <BoxWord>Upload</BoxWord>
                                </Box>
                            </GreyBoxes>
                        </ImageWrapper>

                        <OptionWrapper>
                            <Label>메인 설정</Label>
                            <RadioWrapper>
                            <RadioButton type="radio" id="youtube" name="radio-button">유튜브</RadioButton>
                            <RadioButton type="radio" id="image" name="radio-button">사진</RadioButton>
                            </RadioWrapper>
                        </OptionWrapper>

                <ButtonWrapper>
                    <MyBtn onClick={onClickSubmit}>등록하기</MyBtn>
                </ButtonWrapper> 

            </Wrapper>
    
    ) 
}