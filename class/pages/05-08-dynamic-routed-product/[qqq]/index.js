import {useRouter} from 'next/router'

const FETCH_PRODUCT

export default function DynamicRoutedPage(){
    const router = useRouter()
    const {data} = useQuery(FETCH_PRODUCT, {

    })

    console.log(router.query.qqq)

    return (
        <div>{router.query.qqq}번 게시글 페이지 이동 완료</div>
    )
}