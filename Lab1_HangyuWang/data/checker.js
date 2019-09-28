
function CHKStr(val){
    if(typeof val !== "string"){
      throw `The input should be a string.`
    }
}

function CHKNum(val){
    if(typeof val !== "number"){
      throw `The input should be a number.`
    }
}

function CHKBoo(val){
    if(typeof val !== "boolean"){
      throw `The input should be boolean.`
    }
}

module.exports = {
    CHKStr,
    CHKNum,
    CHKBoo
}