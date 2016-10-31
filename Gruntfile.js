module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        aws: grunt.file.readJSON('aws.json'),

        uglify: {
            app: {
                options: {
                    banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n',
                },
                files : {
                    "dist/js/app.min.js" : [ "dist/js/app.js" ]                        
                }
            },
        },

        concat: {
            options: {
                separator: ";"
            }, 
            app: {
                src: [
                    'bower_components/jquery/dist/jquery.js',
                    'bower_components/bootstrap/dist/js/bootstrap.js',
                    'bower_components/angular/angular.js',
                    'bower_components/angular-route/angular-route.js',
                    'bower_components/angular-route/angular-resource.js',
                    'source/js/jquery.easing.min.js',
                    'source/js/supersized.js',
                    'source/js/supersized.slideshow.js',
                    'source/js/app.js',
                    'source/js/controllers.js',
                ],
                dest: "dist/js/app.js"
            },
            css: {
                src: [
                    "source/css/bootstrap.min.css",
                    "source/css/supersized.css",
                    "source/css/supersized.shutter.css",
                    "source/css/site.css",
                ],
                dest : "dist/css/app.css"
            }
        },

        processhtml : {
            dist : {
                options : {
                    process: true,
                },
                files : {
                    'dist/index.html': ['index.html']
                }
            }
        },

        cachebreaker: {
            dist: {
                options: {
                    match: ['app.min.js', 'app.min.css'],
                    position: 'append'
                },
                files: {
                    src: ['dist/index.html']
                }
            }
        },

        copy : {
            dist : {
                files : [
                    { src: "partials/*", dest: "dist/" },
                    { src: "images/**", dest: "dist/" }
                ]
            }
        },

        s3: {
            options: {
                accessKeyId: '<%= aws.AWSAccessKeyId %>',
                secretAccessKey: '<%= aws.AWSSecretKey %>',
                bucket: '<%= aws.AWS_S3_Bucket %>',
                access: "public-read"
            },
            dist: {
                cwd: "dist/",
                src: "**"
            }
        },

        clean: {
            build: {
                src: [ 'dist/*' ]
            },
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-processhtml');
    grunt.loadNpmTasks('grunt-cache-breaker');
    grunt.loadNpmTasks('grunt-aws');
    
    grunt.registerTask(
        'build', 
        'Compiles all of the assets and copies the files to the build directory.', 
        [ 'clean:build', 'concat:app',  'uglify:app', 'concat:css', 'processhtml:dist', 'cachebreaker:dist', 'copy:dist' ]
    );

	grunt.registerTask(
		'start',
		'Start a local webserver',
		[ 'static:server' ]
	)

    grunt.registerTask(
        'deploy',
        'Deploys the site to S3',
        [ 's3:dist' ]
    )

    grunt.registerTask(
        'lessc',
        "Compiles the less files.",
        ['less:compile', 'cssmin' ]
    );
};
