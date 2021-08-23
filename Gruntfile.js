/**
 * Grunt tasks file for naturalife WordPress Theme
 * Created by RT-Themes
 * http://rtthemes.com
 *
 * use 'grunt release' for production
 * use 'grunt watch' for sass development
 * 
 * do js min
 * do css min
 * do compass compile
 * do combine css
 * do combine js
 */

module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-compass-multiple');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-postcss');


  grunt.initConfig({

      //--------------------------
      // compass compile at multi threads.
      //--------------------------
      compassMultiple: {
        options : {
          javascriptsDir: 'naturalife/js',
          imagesDir: 'naturalife/images',
          sassDir: 'naturalife/css/sass',
          cssDir: 'naturalife/css',
          relativeAssets: true,
        },

        // Release
        release: {
          options: {
            environment: 'production', 
            outputStyle: 'expanded',
            multiple: [
              {
                // admin
                sassDir: 'naturalife/rt-framework/admin/css/sass',
                cssDir: 'naturalife/rt-framework/admin/css'
              },{
                // theme
                sassDir: 'naturalife/css/sass',
                cssDir: 'naturalife/css'
              }
            ],            
          }
        },

        // Debug
        debug: {
          options: {
            environment: 'development', 
            outputStyle: 'expanded',
            multiple: [
              {
                // admin
                sassDir: 'naturalife/rt-framework/admin/css/sass',
                cssDir: 'naturalife/rt-framework/admin/css'
              },{
                // theme
                sassDir: 'naturalife/css/sass',
                cssDir: 'naturalife/css'
              }
            ],            
          }
        } 

      },



      //--------------------------
      // css min
      //--------------------------
      cssmin: {
        all: {
          files: [{
            expand: true,
            cwd: 'naturalife/css',
            src: ['*.css', '!*-min.css'],
            dest: 'naturalife/css',
            ext: '-min.css'
          }]
        },  
        bootstrap: {
          files: [{
            expand: true,
            cwd: 'naturalife/css/bootstrap',
            src: ['*.css', '!*-min.css'],
            dest: 'naturalife/css/bootstrap',
            ext: '-min.css'
          }]
        },           
        woo: {
          files: [{
            expand: true,
            cwd: 'naturalife/css/woocommerce',
            src: ['*.css', '!*-min.css'],
            dest: 'naturalife/css/woocommerce',
            ext: '-min.css'
          }]
        },          
        admin: {
          files: [{
            expand: true,
            cwd: 'naturalife/rt-framework/admin/css',
            src: ['*.css', '!*-min.css'],
            dest: 'naturalife/rt-framework/admin/css',
            ext: '-min.css'
          }]
        },                
       // combine: {
       //   files: {
       //     'naturalife/css/app.min.css': ['naturalife/css/!app.min.css','naturalife/css/!*.css', 'naturalife/css/*.min.css']
       //   }
       // }        
      },

      //--------------------------
      // concat 
      //--------------------------
      concat: {
        options: {
          separator: '',
        },
        work1: {
          src: [
                'naturalife/css/bootstrap/bootstrap-min.css',
                'naturalife/css/owl-carousel-min.css',
                'naturalife/css/style-min.css', 
                'naturalife/css/lightgallery-min.css'
              ],
          dest: 'naturalife/css/app-min.css',
        },       
        extras: {
          src: [
                'naturalife/js/modernizr-min.js',
                'naturalife/js/imagesloaded-min.js',  
                'naturalife/js/lightgallery-all-min.js',
                'naturalife/js/isotope-pkgd-min.js',
                'naturalife/js/owl-carousel-min.js',
                'naturalife/js/customselect-min.js',
                'naturalife/js/jflickrfeed-min.js',
                'naturalife/js/bootstrap-min.js', 
                'naturalife/js/placeholders-min.js',
                'naturalife/js/waitforimages-min.js',
                'naturalife/js/easy-pie-chart-min.js',
                'naturalife/js/perfect-scrollbar-min.js',
                'naturalife/js/countdown-min.js',
                'naturalife/js/jquery-appear-min.js',


                'naturalife/js/scripts-min.js',
          ],
          dest: 'naturalife/js/app-min.js',
        },        

      },

      //--------------------------
      // clean 
      //--------------------------
      clean: {
        css: [  
                'naturalife/**/.DS_Store',
                'naturalife/css/bootstrap.css',
                'naturalife/css/style.css', 
                'naturalife/css/rtl.css', 
                'naturalife/rt-framework/admin/css/admin.css',
                'naturalife/css/woocommerce/woocommerce.css', 
                'naturalife/css/woocommerce/woocommerce-rtl.css', 
              ]
      },

      //--------------------------
      // Uglify 
      //--------------------------
      uglify: {
        options: {
          preserveComments: 'some'
        },
        dist: {
            files : {
              'naturalife/js/scripts-min.js' : 'naturalife/js/scripts.js' 
            }   

        },
        admin: {
            files : {
              'naturalife/rt-framework/admin/js/script-min.js' : 'naturalife/rt-framework/admin/js/script.js',
              'naturalife/rt-framework/admin/js/customizer-min.js' : 'naturalife/rt-framework/admin/js/customizer.js',
              'naturalife/rt-framework/admin/js/rt-skin-selector-min.js' : 'naturalife/rt-framework/admin/js/rt-skin-selector.js',
              'naturalife/rt-framework/admin/js/rt-font-control-min.js' : 'naturalife/rt-framework/admin/js/rt-font-control.js',
              'naturalife/rt-framework/admin/js/rt-color-control-min.js' : 'naturalife/rt-framework/admin/js/rt-color-control.js', 
              'naturalife/rt-framework/admin/js/editor-buttons-min.js' : 'naturalife/rt-framework/admin/js/editor-buttons.js'
            }            
        }        
      },


      // Post css
      postcss: {
        options: {
          map: false, // inline sourcemaps
          processors: [
            require('autoprefixer')(), // add vendor prefixes 
          ]
        },
        dist: {
          src: [
            'naturalife/css/style.css',
            'naturalife/css/bootstrap/*.css',
            'naturalife/css/bbpress/*.css',
            'naturalife/css/woocommerce/*.css',
          ]
        },
      },

      //--------------------------
      // watch
      //--------------------------
      watch: {
        dev: {
          files: [
            'naturalife/rt-framework/admin/css/**/*.scss',
            'naturalife/css/**/*.scss',
            '*.css',
            '!*-min.css'
          ],
          tasks: [
            'default'
          ]
        }    
      },
  });
 
  // Default Task
  grunt.registerTask('default', ['compassMultiple:debug','postcss:dist']);  

  // Release Task
  grunt.registerTask('release', ['clean:css','compassMultiple:release','postcss:dist','uglify','cssmin','concat']); 

};