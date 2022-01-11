import * as fs from 'fs';
//fs.readFileSync('foo.txt','utf8');

function swapVal(arr : number[], a : number, b : number) : number[] {
  var t = arr[a];
  arr[a] = arr[b];
  arr[b] = t;
  return arr;
}

var count = 0;
var textString = '';
function inc(){count++;}

function sortAndSave (workspace : number[], pool : number[]){
  var lastValidID = -1;
  for(var i = 0; i < workspace.length; i++){
    //--
    if ((lastValidID == -1) && (workspace[i] == 0) && (pool.length != 0))                               //isertion
      {workspace[i] = pool.shift(); lastValidID = i; if(pool.length != 0){sortAndSave(workspace.slice(0), pool.slice(0));}
      if(pool.length == 0){
        inc();
        textString += workspace.join('') + '\n';
        //console.log(workspace);
      }
      }
    else if(workspace[i] == 0)                                                                          //distribution
      {workspace = swapVal(workspace, i, lastValidID); lastValidID = i; if(pool.length != 0){sortAndSave(workspace.slice(0), pool.slice(0));}
      if(pool.length == 0){
        inc();
        textString += workspace.join('') + '\n';
        //console.log(workspace);
      }

      }
    //---
  }
}

function main(N : number){
  let space = new Array<number>(N*2);
  let numbers = new Array<number>(N);

  for(let i = 0; i < N*2; i++){
    space[i] = 0
    if (i < N){numbers[i] = + i + 1}
  }
  //-----------------------------------------------------------
  sortAndSave(space, numbers);
  textString += '\n'+count;
  fs.writeFile('task_2.txt', textString, function(err) {console.log(err)})
  console.log(count);
  //-----------------------------------------------------------
}

main(7);
