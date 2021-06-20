import React from 'react';

function EditFlow( {flowid, flow, story, setStory} ) {
    const [displayFlow, setDisplayFlow] = React.useState(true)

    const toggleDisplayFlow = () => {
        setDisplayFlow(!displayFlow)
    }
    const handleFlowText = (e) => {
        const updatedStory = JSON.parse(JSON.stringify(story));
        updatedStory.story.flow[flowid].text = e.target.value
        setStory(updatedStory)
    }
    const handlePathText = (e, index) => {
        const updatedStory = JSON.parse(JSON.stringify(story));
        updatedStory.story.flow[flowid].paths[index].text = e.target.value
        setStory(updatedStory)
    }
    const handlePathNext = (e, index) => {
        const updatedStory = JSON.parse(JSON.stringify(story));
        updatedStory.story.flow[flowid].paths[index].next = e.target.value
        setStory(updatedStory)
    }
    const handlePathSnippet = (e, index) => {
        const updatedStory = JSON.parse(JSON.stringify(story));
        updatedStory.story.flow[flowid].paths[index].snippet = e.target.value
        setStory(updatedStory)
    }
    const handlePathLinks = (e, index) => {
        const updatedStory = JSON.parse(JSON.stringify(story));
        updatedStory.story.flow[flowid].paths[index].links = e.target.value
        setStory(updatedStory)
    }
    const handlePathKnown = (e, index) => {
        const updatedStory = JSON.parse(JSON.stringify(story));
        updatedStory.story.flow[flowid].paths[index].known = e.target.value
        setStory(updatedStory)
    }
    const handlePathDelete = (e, index) => {
        const updatedStory = JSON.parse(JSON.stringify(story));
        updatedStory.story.flow[flowid].paths.splice(index,1)
        setStory(updatedStory)
    }
    const handleDeleteFlow = () => {
        const updatedStory = JSON.parse(JSON.stringify(story));
        delete updatedStory.story.flow[flowid]
        setStory(updatedStory)
    }
    const addPath = () => {
        const updatedStory = JSON.parse(JSON.stringify(story));
        updatedStory.story.flow[flowid].paths.push(
            {
                "text": "Path Text...replace me please",
                "next": "",
                "snippet": ""
            }
        )
        setStory(updatedStory)
    }
    return (
        <div>
            <fieldset><legend>{flowid}</legend>
            <button onClick={handleDeleteFlow}>Delete Flow</button>
            <label>Text: <input type="text" onChange={handleFlowText} value={flow.text} /></label>
            <button onClick={toggleDisplayFlow} style={ {float: "right"} }>{ (displayFlow) ? "Hide" : "Show"}</button>
            <div style={ { "display": (displayFlow) ? "block" : "none" }}>Paths:
            {flow.paths.map((path, i) => {
                return (<fieldset key={i}><legend>{i}</legend>
                    <button onClick={(e) => handlePathDelete(e, i)}>Delete Path</button>
                    <label>Text: <input type="text" onChange={(e) => handlePathText(e, i)} value={path.text} /></label>
                    <label>Next: <select onChange={(e) => handlePathNext(e, i)}>
                        <option>[End]</option>
                        {
                            Object.keys(story.story.flow).map((flowKey, j) => {
                                return (<option value={flowKey} selected={(path.next === flowKey)}>({flowKey}) {story.story.flow[flowKey].text}</option>)
                            })
                        }
                    </select></label>
                    <label>Snippet: <textarea onChange={(e) => handlePathSnippet(e, i)} defaultValue={path.snippet}></textarea></label>
                    <label>Relevant Links: <textarea onChange={(e) => handlePathLinks(e, i)} defaultValue={path.links}></textarea></label>
                    <label>What We Know: <textarea onChange={(e) => handlePathKnown(e, i)} defaultValue={path.known}></textarea></label>
                </fieldset>)
            })}
            <button onClick={addPath}>Add Path</button>
            </div>
            </fieldset>
        </div>
    )
}

export default EditFlow