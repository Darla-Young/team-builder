import React, { useState, useEffect } from 'react'

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
  const [members, setMembers] = useState(teamMembers)
  const [editing, setEditing] = useState(null)
  const [inputValues, setInputValues] = useState(newMember)

  const newMember = {fname: '', lname: '', bio: ''} // reset
  let thisMember = {...inputValues} // user inputs
  let thatMember = editing ? members[editing] : newMember // submitted info
  
  useEffect(() => {  
    setInputValues(thatMember)
  }, [editing])

  const onChange = evt => {
    setInputValues({...inputValues, [evt.target.id]: evt.target.value})
  }
  const edit = id => {
    setEditing(id)
  }
  const submitNewMember = () => {
    setMembers(...members, thisMember)
  }
  const editExistingMember = () => {
    setMembers(...members, members[editing] = thisMember)
  }
  const onSubmit = evt => {
    evt.preventDefault()
    editing ? editExistingMember() : submitNewMember()
    edit() // ?
  }
  return (
    <div>{/* ✨ Fix the JSX by wiring the necessary values and event handlers */}
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
                <button>Edit</button>
              </div>
            ))
          }
        </div>
      </div>
      <div id="membersForm">
        <h2>{editing ? 'Edit' : 'Add'} a Team Member</h2>
        <form>
          <div>
            <label htmlFor="fname">First Name </label>
            <input id="fname" type="text" placeholder="Type First Name" />
          </div>

          <div>
            <label htmlFor="lname">Last Name </label>
            <input id="lname" type="text" placeholder="Type Last Name" />
          </div>

          <div>
            <label htmlFor="bio">Bio </label>
            <textarea id="bio" placeholder="Type Bio" />
          </div>

          <div>
            <input type="submit" />
          </div>
        </form>
      </div>
    </div>
  )
}
