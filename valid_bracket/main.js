const ackpar=["{","[","("];
const kappar=["}","]",")"];
const pares={
  "}":"{",
  "]":"[",
  ")":"(",
};

function makina(pardiz){
  console.log(`"${pardiz}"`);
  var sonAck=[];
  for (p in pardiz){
    if (ackpar.includes(pardiz[p])){
      sonAck.push(pardiz[p]);
    }
    if (kappar.includes(pardiz[p])){
      if (sonAck.pop()!==pares[pardiz[p]]){
        return false;
      }
    }
  }
  return sonAck.length==0;
}

function test(mevcut){
  console.log("mevcut durum:",mevcut);
  
}

test(makina(""));
test(makina("{{{}}}"));
test(makina("[{())}]"));
test(makina("}{"));
test(makina("{}[](}"));
test(makina());
