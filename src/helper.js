// Base 36 allows for 1295 different options... should be plenty

//x is a parseInt value
export function toBase36 (x) {
    let xString = (x) ? x.toString(36) : '0';
    if (xString.length % 2) {
      xString = '0' + xString;
    }
    return xString
}

export function fromBase36 (xString) {
    try {
      return parseInt(xString, 36);
    }catch(e){
      return 0;
    }
}

export function flowhashToJson(flowhash){
    let retval = {}
    for( let i = 0; i < flowhash.length; i+=4){
        const chunk = flowhash.substr(i,4)
        const flowid = fromBase36(chunk.substr(0,2))
        const pathselection = fromBase36(chunk.substr(2,2))
        retval[String(flowid)] = String(pathselection)
    }
    //console.log("flowhashtojson")
    //console.log(retval)
    return retval
}

export function jsonToFlowhash(flowhashjson){
    let flowhash = ""
    Object.keys(flowhashjson).forEach( (key) => {
        flowhash += toBase36(key)
        flowhash += toBase36(flowhashjson[key])
    })
    return flowhash
}