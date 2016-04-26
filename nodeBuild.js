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

// dep
var execSync = require('child_process').execSync;

// util

function callCmds(cmds) {
    console.log(execSync(cmds.join(' ')).toString()); //let it fail
}

process.chdir(__dirname);


var npmInstallCmds = [
    'npm',
    'install'
];

callCmds(npmInstallCmds);


var npmTestCmds = [
    'npm',
    'test',
    '-- --define no-mongo=t'
];

callCmds(npmTestCmds);
