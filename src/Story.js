import React, {useEffect} from 'react';
import ReactMarkdown from 'react-markdown'
import Flow from './Flow'
import { flowhashToJson, jsonToFlowhash } from './helper'
import {
    useParams,
    useHistory,
    Link
  } from "react-router-dom";

function Story( {story} ) {

    //const [ flowhash, flowhashSetter] = React.useState("")
    let { flowhash = "" } = useParams()
    let history = useHistory();
    const [ snippets, setSnippets] = React.useState("")

    const getNextKey = (flow, flowid, flowhashjson) => {
        return (flow[flowid].paths[flowhashjson[flowid]] && flow[flowid].paths[flowhashjson[flowid]].next) ? flow[flowid].paths[flowhashjson[flowid]].next : -1
    }
    const getValidKeys = (flow, flowid, flowhashjson) => {
        const validkeys = []
        validkeys.push(flowid)
        let nextkey = getNextKey(flow,flowid, flowhashjson)
        while(nextkey !== -1){
            validkeys.push(nextkey)
            nextkey = getNextKey(flow,nextkey, flowhashjson)
        }
        
        //console.log(nextkey)


        return validkeys
        
    }

    const setFlowhash = (flowid, pathSelection) => {
        const flowhashjson = flowhashToJson(flowhash)
        let newSnippets = ""
        flowhashjson[flowid] = pathSelection
        console.log(typeof flowid)
        //TODO get a list of valid indexes
        const validkeys = getValidKeys(story.flow, story.start, flowhashjson)
        console.log(flowhashjson)
        console.log(validkeys)
        const newflashjson = {}
        for( let vk of validkeys){
            console.log(vk)
            console.log(typeof vk)
            if (flowhashjson[vk]) {
                newflashjson[vk] = flowhashjson[vk]
                newSnippets += story.flow[vk].paths[newflashjson[vk]].snippet + " "
            }
             
        }
        console.log(newflashjson)
        //flowhashSetter(jsonToFlowhash(newflashjson))
        history.push('/'+jsonToFlowhash(newflashjson))
        setSnippets(newSnippets)
    }   

    useEffect(() => {
        let newSnippets = ""
        const flowhashjson = flowhashToJson(flowhash)
        for ( let k of Object.keys(flowhashjson)){
            newSnippets += story.flow[k].paths[flowhashjson[k]].snippet + " "
        }
        setSnippets(newSnippets)
    }, [flowhash, story, setSnippets]);

    return (
        <div>
            <h1>Hello, it is time for a story <span style={ { display: "none" }}>{flowhash}</span></h1>
            <div className="flowcontainer">
                <Flow flow={story.flow} flowid={story.start} flowhash={flowhash} setFlowhash={setFlowhash}></Flow>
            </div>
            <div className="markdowncontainer">
                <ReactMarkdown children={snippets} />
            </div>
            <pre style={ { "display": "none" } }>
                {JSON.stringify(story, null, 2)}
            </pre>
            { ( flowhash !== "") ?
            <div className="sharestory">
                Share your story: <Link to={ flowhash}>{window.location.href}</Link>
            </div>
            : ""}
        </div>
    )
}

export default Story