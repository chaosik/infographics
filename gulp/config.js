var dest = './build';
var assets = '';//'/assets';
var src = './src';

module.exports = {
  dest: dest,
  browserSync: {
    //port: 8080,
    //server: {
    // We're serving the src folder as well
    // for sass sourcemap linking
    //  baseDir: [dest, src]
    //},
    files: [
      dest + "/**",
      // Exclude Map files
      "!" + dest + "/**.map"
    ],
    proxy: {
      host: "localhost"
    }
  },
  fonts: {
    src: 'bower_components/bootstrap/fonts/**',
    dest: dest + '/fonts'
  },
  less: {
    options: {
      //rootpath: 'assets/'
    },
    main: {
      src: src + "/less/main.less",
      watch: src + "/less/main/**"
    },
    bootstrap: {
      src: src + "/less/bootstrap.less",
      watch: src + "/less/bootstrap/**"
    },
    dest: dest + assets
  },
  images: {
    src: src + "/images/**",
    dest: dest + "/images"
  },
  html: {
    src: src + "/index.html",
    dest: dest
  },
  browserify: {
    // Enable source maps
    debug: true,
    // Additional file extentions to make optional
    extensions: ['.coffee', '.hbs'],
    // A separate bundle will be generated for each
    // bundle config in the list below
    bundleConfigs: [{
      entries: src + '/js/app.js',
      dest: dest + assets,
      outputName: 'app.js'
    }],
    transform: [
      ['reactify', {'es6': true}],
      'debowerify'
    ]
  }
};
