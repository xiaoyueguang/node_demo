var tinify = require('tinify')
var fs = require('fs')
//  密钥
//  一个月免费压缩500张图片
tinify.key = ''

var files = fs.readdirSync('./large')
var length = files.length;
var del_num = 0;
var del_files = fs.readdirSync('./small')
del_files.forEach(function (data) {
  fs.unlink('./small/' + data)
})

if (files.length === 0) {
  console.log('=========== 暂无文件可压缩 ============')
} else {
  console.log('=========== 开始压缩 ============')
  console.log('文件名 源大小 压缩后大小 压缩比率')
}

files.forEach(function (data, index) {
  tinify.fromFile('./large/' + data).toFile('./small/' + data, function (err) {
    showDetail(data)
    fs.unlink('./large/' + data)
    del_num ++;
    if (del_num === length) {
      validate();
    }
  })

})

function validate () {
  tinify.validate(function(err) {
    var counts = tinify.compressionCount
    console.log('这个月已压缩了' + counts + '张图片')
    console.log('=========== 压缩完毕 ============')
  })
}

function showDetail (data) {
  var large = fs.statSync('./large/' + data)
  var small = fs.statSync('./small/' + data)
  console.log(data, ':', parseFloat(large.size / 1024).toFixed(2) + 'kb;', parseFloat(small.size / 1024).toFixed(2) + 'kb;', parseInt(small.size / large.size * 100) + '%')
}
