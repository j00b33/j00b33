import axios from 'axios'
import {useState} from 'react'
import {useMutation, gql} from '@apollo/client'
import { useRouter } from 'next/router'

import BoardPresent from './BoradWhite.presenter'

import {Wrapper, Title, 
    AccountSection, Label, Writer, Password,
    Longbox, Contents, InputWrapper,
    AddressBtn, ZipcodeWrapper, Zipcode, ZipWrapper,
    ImageWrapper, GreyBoxes, Box,BoxWord, 
    OptionWrapper, RadioWrapper, RadioButton, ButtonWrapper, MyBtn, Your__Error} 
    from '../../../../../styles/emotion';


const CREATE_BOARD = gql`
    mutation createBoard($writer: String, $title: String, $contents: String){
        createBoard (writer: $writer, title: $title, contents: $contents){
            _id
            number
            message
        }
    }
`


export default function BoardContain(){
    const [isActive, setIsActive]=useState(false)

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
            setMyWriterError("* ?????? ???????????? ????????? ????????? ??????????????????");
        } 
        if (pw.length<8) {
            setMyPasswordError("* ??????????????? 8??? ?????? ??????????????????");
        }
        if (title.length<1) {
            setMyTitleError("* ????????? ??? ?????? ?????? ??????????????????");
        }
        if (contents.length<10) {
            setMyContentsError("* ????????? 10??? ?????? ??????????????????");
        }
        if (writer.length>1 
            && pw.length>7
            && title.length>0
            && contents.length>9) {
            alert("???????????? ??????????????????");

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

    return (
       <BoardPresent
       wr={myWriterError}
       pass={myPasswordError}
       tit={myTitleError}
       con={myContentsError}
       
       w={onChangeMyWriter}
       p={onChangeMyPw}
       t={onChangeMyTitle}
       c={onChangeMyContents}
       s={onClickSubmit}
       
       isActive={isActive}
       />
    )

}