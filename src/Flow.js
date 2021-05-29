import React from 'react';
import { flowhashToJson } from './helper'

function Flow( {flow, flowid, flowhash, setFlowhash} ) {
    
    const parsePathSelection = () => {

        const flowhashjson = flowhashToJson(flowhash)

        return ( flowhashjson[flowid] ||  flowhashjson[flowid] === 0) ? flowhashjson[flowid] : -1
    }
    let pathSelection = parsePathSelection()

    const handlePathSelectChange = (e) => {
        setFlowhash(flowid, e.target.value)
    }

    return (
        <div className="flow">
        <p>{flow[flowid].text}</p>
        <ul>
            { flow[flowid].paths.map((path, i) => {
                // eslint-disable-next-line
                return <li key={i}><label><input type="radio" name={flowid} value={i} onChange={handlePathSelectChange} checked={ pathSelection === String(i) } /> {path.text}</label></li>
            })}
        </ul>
        
        { ( pathSelection !== -1 && flow[flowid].paths[pathSelection].next ) ? <Flow flow={flow} flowid={flow[flowid].paths[pathSelection].next} flowhash={flowhash} setFlowhash={setFlowhash}></Flow> : ""  }
        
        
        <pre style={ { "display": "none" } }>
            {JSON.stringify(flow, null, 2)}
        </pre>
        </div>
    )
}

export default Flow