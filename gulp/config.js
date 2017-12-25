var dir_root = './assets/'
var dir_dest = dir_root + 'build'
var dir_src = dir_root + 'dev'

module.exports = {
  dest: dir_dest,
  moc: {
    entry: dir_src + '/moc/',
    dest: dir_dest + '/moc/',
  },
  image: {
    entry: dir_src + '/image/',
    dest: dir_dest + '/image/'
  },
  js: {
    entry: dir_src + '/javascript/',
    dest: dir_dest + '/javascript/'
  },
  stylesheet: {
    entry: dir_src + '/stylesheet/',
    dest: dir_dest + '/stylesheet/'
  },
}