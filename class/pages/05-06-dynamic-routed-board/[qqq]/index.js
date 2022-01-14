import {useRouter} from 'next/router'
import {useQuery, gql} from '@apollo/client'

const FETCH_BOARD = gql`
    query feetchBoard($number: Int){
        fetchBoard(number : $number){
            writer
            title
            contents
        }
    }
`

export default function DynamicRoutedPage(){
    const router = useRouter()

    const {data} = useQuery(FETCH_BOARD, {
        variables: {number: Number(router.query.qqq)}
    })
    //mutation 은 [실행시키고싶은함수] - 이름 마음대로 지을 수있지만
    //query 는 {data} 이건 그냥 data라는 이름으로 주는것
    //query도 실행할때 variable 넣어주면 됨 (comma 찍고)

    //data 어떻게 들어오나 console 확인
    console.log(data)

    return (
        <div>
            <div>{router.query.qqq}번 게시글 페이지 이동 완료</div>
            <div>작성자:{data?.fetchBoard?.writer}</div>
            <div>제목: {data?.fetchBoard?.title}</div>
            <div>내용: {data?.fetchBoard?.contents}</div>
        </div>
    )
}