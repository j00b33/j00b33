import axios from 'axios'
import {useState} from 'react'
import {useMutation, gql} from '@apollo/client'
import { useRouter } from 'next/router'

import {OutWrapper, Title, 
    AccountSection, Label, Writer, Password,
    Longbox, Contents, InputWrapper,
    AddressBtn, ZipcodeWrapper, Zipcode, ZipWrapper,
    ImageWrapper, GreyBoxes, Box,BoxWord, 
    OptionWrapper, RadioWrapper, RadioButton, ButtonWrapper, MyBtn, Your__Error} 
    from '../../../styles/emotion';


const CREATE_BOARD = gql`
    mutation createBoard($writer: String, $title: String, $contents: String){
        createBoard (writer: $writer, title: $title, contents: $contents){
            _id
            number
            message
        }
    }
`


export default function FreeBoard(){
    const router = useRouter()

    const[writer, setWriter] = useState("");
    const[pw, setPw] = useState("");                            
    const[title, setTitle] = useState("");
    const[contents, setContents] = useState("");

    const [myWriterError, setMyWriterError] = useState("");
    const [myPasswordError, setMyPasswordError] = useState("");
    const [myTitleError, setMyTitleError] = useState("");
    const [myContentsError, setMyContentsError] = useState("");

    const [createBoard] = useMutation(CREATE_BOARD)

    function onChangeMyWriter(event){
        setWriter(event.target.value);
        if(writer.length>1){
            setMyWriterError("")
        }
    } 
    function onChangeMyPw(event){
        setPw(event.target.value);
        if(pw.length>7){
            setMyPasswordError("")
    }
}
    
    function onChangeMyTitle(event){
        setTitle(event.target.value);
        if(title.length>0){
            setMyTitleError("")
    }
}

    function onChangeMyContents(event){
        setContents(event.target.value);
        if(contents.length>9){
            setMyContentsError("")
    }
}

    const onClickSubmit = async () => {
        if (writer.length<2) {
            setMyWriterError("* 성을 포함하여 정확한 이름을 입력해주세요");
        } 
        if (pw.length<8) {
            setMyPasswordError("* 비밀번호를 8자 이상 입력해주세요");
        }
        if (title.length<1) {
            setMyTitleError("* 제목을 한 글자 이상 입력해주세요");
        }
        if (contents.length<10) {
            setMyContentsError("* 내용을 10자 이상 입력해주세요");
        }
        if (writer.length>1 
            && pw.length>7
            && title.length>0
            && contents.length>9) {
            alert("게시물이 등록됐습니다");

            const result = await createBoard({
                variables: {
                        writer,
                        password:pw,
                        title,
                        contents
                }
            })

    router.push(`/01-01-board/${result.data.createBoard.number}`)

        }
    }



    return(
            <OutWrapper>
                <Title>게시물 등록</Title>
                        <AccountSection>
                            <InputWrapper>
                                <Label>작성자</Label>
                                <Writer tyep="text" placeholder="이름을 적어주세요" onChange={onChangeMyWriter}></Writer><br/>
                                <Your__Error>{myWriterError}</Your__Error> 
                            </InputWrapper>
                            <InputWrapper>
                                <Label>비밀번호</Label>
                                <Password type="password" placeholder="비밀번호를 입력해주세요" onChange={onChangeMyPw}></Password><br/>
                                <Your__Error>{myPasswordError}</Your__Error> 
                            </InputWrapper>
                        </AccountSection>
                        

                        <InputWrapper>
                            <Label>제목</Label>
                            <Longbox type="text" placeholder="제목을 작성해주세요" onChange={onChangeMyTitle}></Longbox><br/>
                            <Your__Error>{myTitleError}</Your__Error> 
                        </InputWrapper>

                        <InputWrapper>
                            <Label>내용</Label>
                            <Contents type="text" placeholder="내용을 작성해주세요" onChange={onChangeMyContents}></Contents><br/>
                            <Your__Error>{myContentsError}</Your__Error>
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
                            <RadioButton type="radio" ></RadioButton>유튜브
                            <RadioButton type="radio" ></RadioButton>사진
                            </RadioWrapper>
                        </OptionWrapper>

                <ButtonWrapper>
                    <MyBtn onClick={onClickSubmit}>등록하기</MyBtn>
                </ButtonWrapper>
            </OutWrapper>
    
    ) 
}