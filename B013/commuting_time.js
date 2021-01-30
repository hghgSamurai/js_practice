process.stdin.resume();
process.stdin.setEncoding('utf8');

var lines = [];
var reader = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});
reader.on('line', (line) => {
    // 引数１：配座駅へまで時間 a 分, 配座駅から儀野駅の乗車時間 b 分, 儀野駅から会社までの時間 c 分
    // 引数２：配座駅から出る電車の本数を表す整数
    // 引数３：電車時刻表
    lines.push(line);
});
reader.on('close', () => {
    // 電車の時刻表をDate型のリストにする
    const trainSchedules = lines.slice(2, lines.length).map(line => {
        const time = line.split(' ')
        const schedule = new Date(2020,11,18,time[0],time[1])
        return schedule
    })
    // console.log(trainSchedules.toLocaleString({ timeZone: 'Asia/Tokyo' }))
    
    // 各区間の所要時間を配列にする
    const travelTimes = lines[0].split(' ');
    // console.log(travelTimes)
    
    // 出社のリミット時刻を設定
    const arriveLimit = new Date(2020,11,18,8,59,59)
    
    // 配座駅からの所要時間を設定し、許容される電車の出発時刻を算出
    const timesFromB = parseInt(travelTimes[1]) + parseInt(travelTimes[2])
    const limitTrainDate = new Date(arriveLimit - (1000 * timesFromB * 60))
    // console.log(limitTrainDate)
    const optimumTrainTimes = trainSchedules.filter(time => time <= limitTrainDate).sort()
    // console.log(optimumTrainTimes)
    
    // 許容される最遅の電車出発時刻から自宅を出る時間を算出する
    const optimumDepatureDate = new Date(optimumTrainTimes.slice(-1)[0] - (1000 * parseInt(travelTimes[0]) * 60))
    // console.log(optimumDepatureDate)
    const optimumDepatureTime = ('0' + optimumDepatureDate.getHours()).slice(-2) + ':' + ('0' + optimumDepatureDate.getMinutes()).slice(-2)
    console.log('********************************')
    console.log('再遅出社時刻：' + optimumDepatureTime)
});