//문자열이면 거르기

//약수의 총  합 구하기
function solution(n) {
    let answer = 0;
    for (let i=0; i<n+1; i++){
        if (n%i===0){
            answer += i
        }
    }
    return answer;
}