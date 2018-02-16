module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

      watch: {
        sass: {
          files: ['sass/main.scss'],
          tasks: ['sass']
        }
      },

      sass: {
        dist: {
          options: {
            style: 'compressed'
          },
          files: {
            'public/css/main.css':'sass/main.scss'
          }
        }
      }
  });
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.registerTask('default', ['sass']);
  grunt.registerTask('watchFiles', ['watch']);
};
