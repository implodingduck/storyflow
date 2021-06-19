import React from 'react';
import EditFlow from './EditFlow'
import dragon from './stories/dragon.json'

function Editor( ) {
    const [ story, setStory] = React.useState( (localStorage.getItem('editorstory')) ? JSON.parse(localStorage.getItem('editorstory')) : dragon )

    const handleTitle = (e) => {
        console.log("handleTitle: " + e.target.value)
        const updatedStory = JSON.parse(JSON.stringify(story)); 
        updatedStory.story.name = e.target.value
        setStory(updatedStory)
    }

    React.useEffect( () => {
        localStorage.setItem('editorstory', JSON.stringify(story));
    }, [story])

    const getNextId = (storyflow) => {
        let nextId = 0
        Object.keys(storyflow).map((flowKey) => {
            if (parseInt(flowKey) >= nextId){
                nextId = parseInt(flowKey) + 1
            }
            return ""
        })
        return nextId + ""
    }
    const addFlow = ()=> {
        const updatedStory = JSON.parse(JSON.stringify(story));
        let nextId = getNextId(updatedStory.story.flow)
        console.log("trying to add... " + nextId)
        updatedStory.story.flow[nextId] = {
            "text": "Flow Text...replace me please",
            "paths": [
                {
                    "text": "Path Text...replace me please",
                    "next": "",
                    "snippet": ""
                }
            ]
        }
        setStory(updatedStory)
    }

    const clearLocalStorage = () => {
        localStorage.clear()
    }

    return (
        <div>
            <h3>Editor</h3>
            <div className="flowcontainer">
                <label>Title: <input type="text" onChange={handleTitle} value={story.story.name} /></label>
                { Object.keys(story.story.flow).map((flowKey, i) => {
                    return <EditFlow key={i} flowid={flowKey} flow={story.story.flow[flowKey]} story={story} setStory={setStory}></EditFlow>
                } )}
                <button onClick={addFlow}>Add Flow</button>
            </div>
            <div className="markdowncontainer">
                <pre>
                    {JSON.stringify(story, null, 2)}
                </pre>
            </div>
            <button onClick={clearLocalStorage}>Clear Local Storage</button>
        </div>
    )
}
  
export default Editor