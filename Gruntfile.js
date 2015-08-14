module.exports = function(grunt) {

  require("load-grunt-tasks")(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    less: {
      style: {
        files: {
          'build/style.css': 'source/assets/less/style.less'
        }
      }
    },

    sass: {
      style: {
        files: {
          'build/style.css': 'source/sass/style.scss'
        }
      }
    },

    lintspaces: {
      test: {
        src: [
          '*.html',
          'assets/js/*.js',
          'assets/less/*.less',
          'assets/sass/*.sass'
        ],
        options: {
          editorconfig: '.editorconfig'
        }
      }
    },

    githooks: {
      test: {
        'pre-commit': 'lintspaces:test',
      }
    },

    copy: {
      build: {
        files: [{
          expand: true,
          cwd: "source",
          src: [
            "assets/img/**",
            "assets/js/**",
            "assets/fonts/**",
            "*.html"
            ],
          dest: "build/"
        }]
      },

      img: {
        expand: true,
        cwd: 'source/assets/img/',
        src: ['*.{png,jpg,gif,svg}'],
        dest: 'build/assets/img/',
      },

      html: {
        expand: true,
        cwd: 'source/',
        src: ['*.html'],
        dest: 'build/',
      },
    },

    clean: {
      build: ["build"]
    },

    autoprefixer: {
      options: {
        browsers: ["last 2 version","ie 10"]
      },
      style: {
        src: "build/style.css"
      }
    },

    concat: {
      start: {
        src: [
          // 'src/js/plugin.js',
          'source/assets/js/script.js'
        ],
        dest: 'build/assets/js/min/script.min.js'
      }
    },

    cmq: {
      style: {
        files: {
          'build/style.css': ['build/style.css']
        }
      }
    },

    cssmin: {
      style: {
        options: {
          keepSpecialComments: 0,
          report: "gzip"
        },
        files: {
          "build/style.min.css":["build/style.css"]
        }
      }
    },

    csscomb: {
      style: {
        expand: true,
        src: ["assets/less/**/*.less"]
      }
    },

    imagemin: {
      images: {
        options: {
          optimizationLevel: 3
        },
        files: [{
          expand: true,
          src: ["build/assets/img/**/*.{png,jpg,gif,svg}"]
        }]
      }
    },

    htmlmin: {                                     // Task 
      options: {                                 // Target options 
        removeComments: true,
        collapseWhitespace: true,
        collapseBooleanAttributes: true,
        caseSensitive:true,
        keepClosingSlash: false
      },
      html: {
        files: {                                   // Dictionary of files 
          'build/main.min.html': 'build/main.html'
        }
      }
    },

    grunticon: {
      icons: {
        files: [{
          expand: true,
          cwd: "source/assets/img/",
          src: ["*.svg", '*.png'],
          dest: "build/"
        }],
        options: {
          enhanceSVG   : true,
          datasvgcss   : 'assets/css/icons.data.svg.css',
          datapngcss   : 'assets/css/icons.data.png.css',
          urlpngcss    : 'assets/css/icons.fallback.css',
          loadersnippet: 'assets/js/lib/grunticon.loader.js',
          previewhtml  : '../source/img/icon-preview.html',
          pngfolder    : 'assets/img/png-grunticon',
          pngpath      : '../img/spng-grunticon',
          template     : 'source/img/template.hbs',
          defaultWidth : '200px',
          defaultHeight: '200px',
          cssprefix    :  'icon-',
          customselectors: {
                "icon-facebook": [".social-btns__fb"],
                "logo": [".logo__link"]
          },
        }
      }
    },

    svg_sprite: {
      complex: { 
        // Target basics 
        expand: true,
        cwd: 'source/img/',
        src: ['*.svg'],
        dest: 'build/assets/',

        // Target options 
        options: {
          shape: {
            dimension: {         // Set maximum dimensions 
              maxWidth: 50,
              maxHeight: 50
            },
            spacing: {         // Add padding 
              padding: 0
            },
            dest: 'intermediate-svg'    // Keep the intermediate files 
          },
          mode: {
            css : {     // Activate the «css» mode 
                render  : {
                    css : true  // Activate CSS output (with default options) 
                }
            },
            view: {         // Activate the «view» mode 
              bust: false,
              render: {
                  scss: false      // Activate Sass output (with default options) 
              }
            },
            symbol: true      // Activate the «symbol» mode 
          }
        }
      }
    },

    svgstore: {
      options: {
        // prefix: "icon-",
        includeTitleElement: false,
        cleanup: [
          "fill",
          "stroke",
          "color",
          "overflow",
          "stroke-width",
          "enable-background"
        ],
        svg: {
          style: "display:none"
        }
      },
      default: {
        files: {
          'build/assets/img/symbol/_all-svg-icons.svg': ['build/assets/img/svgstore/*.svg'],
        },
      },
    },

    sprite:{
      all: {
        src: 'source/assets/img/*.png',
        dest: 'build/assets/img/spritesheet.png',
        destCss: 'build/assets/css/sprites.css',        
        algorithm: 'top-down'
      }
    },

    watch: {
      style: {
        files: ['source/assets/less/**/*.less'],
        tasks: ['style'],
        options: {
          spawn: false,
          livereload: true
        },
      },
      scripts: {
        files: ['source/assets/js/script.js'],
        tasks: ['js'],
        options: {
          spawn: false,
          livereload: true
        },
      },
      images: {
        files: ['source/assets/img/**/*.{png,jpg,gif,svg}'],
        tasks: ['img'],
        options: {
          spawn: false,
          livereload: true
        },
      },
      html: {
        files: ['source/*.html'],
        tasks: ['html'],
        options: {
          spawn: false,
          livereload: true
        },
      }
    },



    browserSync: {
      dev: {
        bsFiles: {
          src : [
            'build/*.css',
            'build/assets/js/*.js',
            'build/*.html',
          ]
        },
        options: {
          watchTask: true,
          server: {
            // baseDir: "build/",
          },
          notify: false,
          startPath: "build/index.html",
          ghostMode: {
            clicks: true,
            forms: true,
            scroll: false
          }
        }
      }
    }
  });

  grunt.registerTask('test', ['lintspaces:test']);


  grunt.registerTask("default",[
    "copy",
    "less",
    "autoprefixer",
    "cmq",
    "cssmin",
    "imagemin",
    // "svgstore",
    // "grunticon",
    // "svg_sprite",
    "sprite",
    'browserSync',
    'watch'
  ]);


  grunt.registerTask("build",[
    "clean",
    "copy",
    "less",
    "autoprefixer",
    "cmq",
    "cssmin",
    "imagemin",
    "grunticon",
    'browserSync',
    'watch'
  ]);


  grunt.registerTask('style', [
    'less',
    'autoprefixer',
    'cmq',
    'cssmin'
  ]);


  grunt.registerTask('js', [
    'concat'
  ]);


  grunt.registerTask('img', [
    'copy:img',
    'imagemin',
    "svgstore"
  ]);

  grunt.registerTask('html', [
    'copy:html'
  ]);

  grunt.registerTask('gr-icon', [
    'grunticon'
  ]);
};
