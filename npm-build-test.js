/*
* Copyright (c) 2016 NumberFour AG.
* All rights reserved. This program and the accompanying materials
* are made available under the terms of the Eclipse Public License v1.0
* which accompanies this distribution, and is available at
* http://www.eclipse.org/legal/epl-v10.html
*
* Contributors:
*   NumberFour AG - Initial API and implementation
*/

// deps
var fs = require('fs');
var path = require('path');
var execSync = require('child_process').execSync;


// utils
function deltree(dirPath, removeDir) {
    if (removeDir === undefined)
        removeDir = true;
    try { var files = fs.readdirSync(dirPath); }
    catch (e) { return console.error(e); }
    if (files.length > 0)
        for (var i = 0; i < files.length; i++) {
            var filePath = path.join(dirPath, files[i]);
            if (fs.statSync(filePath).isFile())
                fs.unlinkSync(filePath);
            else
                deltree(filePath);
        }
    if (removeDir)
        fs.rmdirSync(dirPath);
};


// body

var baseDir = __dirname;

process.chdir(baseDir);


var buildDirName = 'build';
var buildDirPath = path.join(baseDir, buildDirName);

try {
    fs.mkdirSync(buildDirPath);
} catch (e) {
    if (e.code == 'EEXIST') {
        console.info('build path exists, removing file structure ' + buildDirPath);
        deltree(buildDirPath);
        fs.mkdirSync(buildDirPath);//let it fail
    }else{throw e}
}


var targetPlatfromFileName = 'targetplatform.n4tp';
var fromTargetPlatfromFilePath = path.join(baseDir, targetPlatfromFileName);
var toTargetPlatfromFilePath = path.join(buildDirPath, targetPlatfromFileName);

fs.writeFileSync(toTargetPlatfromFilePath, fs.readFileSync(fromTargetPlatfromFilePath));

console.info('copied target platform file @ ' + (fs.lstatSync(toTargetPlatfromFilePath)).birthtime); // let it fail


var npmInstallLocationName = 'npm';
var npmInstallPath = path.join(buildDirPath, npmInstallLocationName);

var reportName = 'tasks-test-report';
var reportFileName = reportName + '.xml';
var reportFilePath = path.join(buildDirPath, reportFileName);

var repotPackage = 'n4js.example.tasks.tests';

var mangelCmds = [
    'n4js-mangelhaft',
    '--compile',
    '--targetPlatformFile', toTargetPlatfromFilePath,
    '--targetPlatformInstallLocation', npmInstallPath,
    '--xunitReportFile', reportFilePath,
    '--xunitReportName', reportName,
    '--xunitReportPackage', repotPackage,
    '--scan .'
].concat(process.argv.slice(2));

console.log(execSync(mangelCmds.join(' ')).toString()); //let it fail
