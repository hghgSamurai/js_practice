process.stdin.resume();
process.stdin.setEncoding('utf8');
// 自分の得意な言語で
// Let's チャレンジ！！
var lines = [];
var reader = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});
reader.on('line', (line) => {
  // 引数１：台数、距離
  // 引数２：初乗距離、初乗運賃、加算距離、加算運賃
  lines.push(line);
});
reader.on('close', () => {
  const input = lines[0].split(' ');
  console.log('台数：' + input[0] + '、距離：' + input[1])
  var plans = []
  for (let plan = 1; plan < parseInt(input[0]) + 1; plan++) {
    plans.push(lines[plan].split(' '));
  }
  console.log(plans)

  for (let i = 0; i < plans.length; i++) {
    console.log('############### 以下出力' + (i + 1) + '結果 ###############')
    var basic = parseInt(plans[i][1])
    var chargeDistance = input[1] - plans[i][0]
    console.log('超過距離:' + chargeDistance)
    if (chargeDistance <= 0) {
        console.log('支払額:' + parseInt(basic))
    } else {
        var chargeFee = parseInt(plans[i][3]) * Math.ceil((chargeDistance / plans[i][2]))
        var price = basic + chargeFee
        console.log('支払額:' + price)
    }
  }
});