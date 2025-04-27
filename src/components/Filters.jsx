const Filters=({handleFilterChange,filters,teams,projectsData,tagsData,ownersData})=>{
    return(<>
      <div className="my-3">Filter By:{" "}
    <select  name="status" value={filters.status} id="status" onChange={handleFilterChange}>
    <option value="">---Status---</option>
    <option value="To Do">To Do</option>
    <option value="In Progress">In Progress</option>
<option value="Completed">Completed</option>
<option value="Blocked">Blocked</option>
 </select>
 {" "}
 <select name="team" value={filters.team} onChange={handleFilterChange} >
    <option value="">---Team---</option>
 {teams?.teams?.map(team=>(<option key={team?._id} value={team?._id}>{team?.name}</option>))}
 </select>
 {" "}
 <select  name="project" value={filters.project} onChange={handleFilterChange} >
    <option value="">---Project---</option>
 {projectsData?.projects?.map(project=>(<option key={project?._id} value={project?._id}>{project?.name}</option>))}
 </select>
 {" "}
 <select  name="tag" value={filters.tag} onChange={handleFilterChange}>
    <option value="">---Tags---</option>
 {tagsData?.tags?.map(tag=>(<option key={tag?._id} value={tag?._id}>{tag?.name}</option>))}
 </select>
 {" "}
 <select  name="owner" value={filters.owner} onChange={handleFilterChange}>
    <option value="">---Owners---</option>
 {ownersData?.user?.map(tag=>(<option key={tag?._id} value={tag?._id}>{tag?.name}</option>))}
 </select>
    </div>
    </>)
}
export default Filters;