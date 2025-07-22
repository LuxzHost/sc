global.util = require("util");
global.chalk = require("chalk");
global.fs = require("fs");
global.axios = require("axios");
global.fetch = require("node-fetch");
global.ssh2 = require("ssh2");
global.crypto = require("crypto");
global.Obfus = require("js-confuser");
global.mimes = require('mime-types');

const { exec, spawn, execSync } = require("child_process");
global.exec = exec;
global.spawn = spawn;
global.execSync = execSync;