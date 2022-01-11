"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
//fs.readFileSync('foo.txt','utf8');
function swapVal(arr, a, b) {
    var t = arr[a];
    arr[a] = arr[b];
    arr[b] = t;
    return arr;
}
var count = 0;
var textString = '';
function inc() { count++; }
function sortAndSave(workspace, pool) {
    var lastValidID = -1;
    for (var i = 0; i < workspace.length; i++) {
        //--
        if ((lastValidID == -1) && (workspace[i] == 0) && (pool.length != 0)) //isertion
         {
            workspace[i] = pool.shift();
            lastValidID = i;
            if (pool.length != 0) {
                sortAndSave(workspace.slice(0), pool.slice(0));
            }
            if (pool.length == 0) {
                inc();
                textString += workspace.join('') + '\n';
                //console.log(workspace);
            }
        }
        else if (workspace[i] == 0) //distribution
         {
            workspace = swapVal(workspace, i, lastValidID);
            lastValidID = i;
            if (pool.length != 0) {
                sortAndSave(workspace.slice(0), pool.slice(0));
            }
            if (pool.length == 0) {
                inc();
                textString += workspace.join('') + '\n';
                //console.log(workspace);
            }
        }
        //---
    }
}
function main(N) {
    let space = new Array(N * 2);
    let numbers = new Array(N);
    for (let i = 0; i < N * 2; i++) {
        space[i] = 0;
        if (i < N) {
            numbers[i] = +i + 1;
        }
    }
    //-----------------------------------------------------------
    sortAndSave(space, numbers);
    textString += '\n' + count;
    fs.writeFile('task_2.txt', textString, function (err) { console.log(err); });
    console.log(count);
    //-----------------------------------------------------------
}
main(7);
