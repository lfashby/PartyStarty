import React from 'react'
import Navbar from '../navbar';

const EntryDetails = (props) => (
	<div>
	  <div className="createpage">
	  <h2>Create Event</h2>
        <form onSubmit={props.addFilmsSubmit}>
          <label>Title</label>
          <input onChange={props.handleTitle} className="form-control" type="text" placeholder="Title" required/>
          <br></br>
          <label>Location</label>
          <input onChange={props.handleLocation} className="form-control" type="text" placeholder="Location" required/>
          <br></br>
          <label>Date</label>
          <input onChange={props.handleDate} className="form-control" type="date" id="example" required/>
          <br></br>
          <label>Time</label>
          <input onChange={props.handleTime} className="form-control" type="time" required/>
          <br></br>
          <label>Description</label>
          <input onChange={props.handleDescription} className="form-control" type="text" placeholder="Description" required/>
          <br></br>
          Is this event public?
          <input type="checkbox" checked={props.public} onChange={props.isPublic} /> 
          <br></br>
          {props.isPublicRender()}
          <input type="submit" className="btn btn-secondary btn-lg textarea" value="Add Films" />
        </form>
		</div>
	</div>
)

export default EntryDetails;