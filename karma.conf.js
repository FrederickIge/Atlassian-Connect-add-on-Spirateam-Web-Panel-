module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [
  './node_modules/angular/angular.js',
  './node_modules/angular-mocks/angular-mocks.js',
  './public/js/factories/panel.object.factory.js',
  './public/js/factories/panel.object.factory.spec.js',
  './public/js/factories/panel.poster.factory.js',
  './public/js/factories/panel.poster.factory.spec.js',
  './public/js/factories/panel.setter.factory.js',
  './public/js/factories/panel.setter.factory.spec.js',
  './public/js/controllers/webPanel.js',
  './public/js/controllers/webPanel.spec.js',
  './public/js/lib/Chart.js',
    ],
    exclude: [
    ],
    preprocessors: {
    },
    reporters: ['spec'],
    port: 8081,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false,
    concurrency: Infinity
  })
}