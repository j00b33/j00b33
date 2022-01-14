//What I did: 
const myShopping = [
    { category: "과일", price: 12000 },
    { category: "의류", price:10000 },
    { category: "의류", price: 20000},
    { category: "장난감", price: 9000 },
    { category: "과일", price: 5000 },
    { category: "의류", price: 10000  },
    { category: "과일", price: 8000 },
    { category: "의류", price: 7000 },
    { category: "장난감", price: 5000  },
    { category: "의류", price: 10000 } ]
 
let num=0;
let cost =0;
let level = "";
for (let i =0; i<myShopping.length; i++){
if (myShopping[i].category ==="의류"){

num = num+1
cost = cost + 10000;

if (num<3){
  level = "Bronze"}
else if (num<5){
  level = "Silver"}
else {
  level = "Gold"}
}
}
console.log("의류를 구매한 횟수는 총 " + num + "회 금액은 " + cost + "이며 등급은 " + level + "입니다.")
//result: '의류를 구매한 횟수는 총 5회 금액은 50000이며 등급은 Gold입니다.'











//What I did:
function random(){
    let token = String(Math.floor(Math.random()*10000)).padStart(4,"0") 
    console.log(token)
  }
  random();
  //result: 5014