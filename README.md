# tasks-example-n4js [![Build Status](https://travis-ci.org/dbo/tasks-example-n4js.svg?branch=master)](https://travis-ci.org/dbo/tasks-example-n4js) [![N4JS](https://img.shields.io/badge/N4-JS-blue.svg)](https://numberfour.github.io/n4js/)
Sample repository hosting the example code of [UserGuide](https://numberfour.github.io/n4js/userguide/) and setup of Travis and Jenkins.

Compiles and executes the npm `test` run like
```bash
$ n4js-mangelhaft \
    --scan . \
    --compile \
    --targetPlatformFile targetplatform.n4tp \
    --targetPlatformInstallLocation build/npm \
    --xunitReportFile build/tasks-test-report.xml \
    --xunitReportName tasks-test-report \
    --xunitReportPackage n4js.example.tasks.tests
```

You can pass custom build parameters, e.g. to omit mongodb tests via runtime options, i.e.
```bash
$ npm install && npm test -- --define no-mongo=t
```
