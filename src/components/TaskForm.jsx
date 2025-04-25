import Select from "react-select"
const TaskForm=({handleSubmit,taskData,handleChange,projectsData,teamsData,options,handleMultiDropDown,handleMultiDropDownOwners,ownersOptions})=>{
return(<>

<form className="me-3" onSubmit={handleSubmit}>
        <label className="fw-medium fs-5 mb-4" htmlFor="name">Task Name:</label>
 <input required type="text" className="form-control" name="name" id="name"  value={taskData.name} onChange={handleChange}/>
 <br/>
 <label className="fw-medium fs-5 mb-4" htmlFor="project">Project :</label>
 <select required className="form-control" name="project" id="project" value={taskData?.project} onChange={handleChange}>
    <option value="">Select Project</option>
 {projectsData?.projects?.map(project=>(<option key={project?._id} value={project?._id}>{project?.name}</option>))}
 </select>
 <br/>
 <label  className="fw-medium fs-5 mb-4" htmlFor="team">Team :</label>
 <select required className="form-control" name="team" id="team" value={taskData.team} onChange={handleChange}>
    <option value="">Select Team</option>
 {teamsData?.teams?.map(team=>(<option key={team?._id} value={team?._id}>{team?.name}</option>))}
 </select>
 <br/>
 <label className="fw-medium fs-5 mb-4" htmlFor="timeToComplete">Time To Complete(In Days):</label>
 <input required type="number" className="form-control" name="timeToComplete" id="timeToComplete"  value={taskData.timeToComplete} onChange={handleChange}/>
 <br/>
 <label className="fw-medium fs-5 mb-4" htmlFor="status">Status :</label>
 <select required className="form-control" name="status" id="status" value={taskData.status} onChange={handleChange}>
    <option value="">Select Status</option>
    <option value="To Do">To Do</option>
    <option value="In Progress">In Progress</option>
<option value="Completed">Completed</option>
<option value="Blocked">Blocked</option>
 </select>
 <br/>
 <label htmlFor="tags" className="fw-medium fs-5 mb-4">Select Multiple Tags:</label>
<Select className="multi" options={options} value={taskData?.tags||""} isMulti onChange={handleMultiDropDown}
/>
<br/>
<label htmlFor="tags" className="fw-medium fs-5 mb-4">Select Owners for the Task (multiple owners can be selected):</label>
<Select className="multi" options={ownersOptions} value={taskData?.owners||""} isMulti onChange={handleMultiDropDownOwners}
/>
<br/>
 <button className="btn btn-success" type="submit">Submit</button>
    </form>

</>)
}
export default TaskForm;