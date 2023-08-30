import React, { useState, useEffect, useRef, useLayoutEffect } from 'react'

let id = 0
const getId = () => ++id

let teamMembers = [
  {
    id: getId(), fname: "Alice", lname: "Smith",
    bio: "Passionate about front-end development and user experience. \
I love creating intuitive and visually appealing web interfaces."
  },
  {
    id: getId(), fname: "Bob", lname: "Johnson",
    bio: "Aspiring web developer with a background in graphic design. \
I enjoy bringing creativity and aesthetics to the digital world."
  },
]

export default function App() {

  const newMember = {fname: '', lname: '', bio: ''} // reset

  const [members, setMembers] = useState(teamMembers)
  const [editing, setEditing] = useState(null)
  const [inputValues, setInputValues] = useState(newMember)
  
  let thisMember = {id: getId(), ...inputValues} // user inputs
  const thatMember = editing ? members.find(member => member.id === editing) : newMember // previously submitted info
  
  // for debugging
  /* 
  const firstUpdate = useRef(true)
  useLayoutEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false
      return;
    }
    console.log(members)
    console.log(editing)
    console.log(inputValues)
  })
  */

  // control input values
  useEffect(() => {
    setInputValues(thatMember)
  }, [editing])

  // handle form changes
  const onChange = evt => {
    setInputValues({...inputValues, [evt.target.id]: evt.target.value})
  }
  const edit = id => {
    setEditing(id)
  }
  const submitNewMember = () => {
    setMembers(members.concat(thisMember))
  }
  const editExistingMember = () => {
    setMembers(members.map(member => {
      if(member.id === editing) {member = thisMember}
      return member
    }))
  }
  const onSubmit = evt => {
    evt.preventDefault()
    editing ? editExistingMember() : submitNewMember()
    setInputValues(newMember)
    setEditing(null)
  }

  return (
    <div>
      <div id="membersList">
        <h2>Team Members</h2>
        <div>
          {
            members.map(mem => (
              <div key={mem.id} className="member">
                <div>
                  <h4>{mem.fname} {mem.lname}</h4>
                  <p>{mem.bio}</p>
                </div>
                <button onClick={()=>edit(mem.id)}>Edit</button>
              </div>
            ))
          }
        </div>
      </div>
      <div id="membersForm">
        <h2>{editing ? 'Edit' : 'Add'} a Team Member</h2>
        <form onSubmit={onSubmit} >
          <div>
            <label htmlFor="fname">First Name </label>
            <input id="fname" type="text" placeholder="Type First Name" value={inputValues.fname} onChange={onChange} />
          </div>

          <div>
            <label htmlFor="lname">Last Name </label>
            <input id="lname" type="text" placeholder="Type Last Name" value={inputValues.lname} onChange={onChange} />
          </div>

          <div>
            <label htmlFor="bio">Bio </label>
            <textarea id="bio" placeholder="Type Bio" value={inputValues.bio} onChange={onChange} />
          </div>

          <div>
            <input type="submit" />
          </div>
        </form>
      </div>
    </div>
  )
}
