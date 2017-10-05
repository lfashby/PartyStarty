import React from 'react'
import Navbar from '../navbar';

const EntryDetails = (props) => (
	<div>
	  <div className="createpage">
	  <h2>Create Event</h2>
        <form>
          <label>Title</label>
          <input onChange={props.handleTitle} className="form-control" type="text" placeholder="Title" />
          <br></br>
          <label>Location</label>
          <input onChange={props.handleLocation} className="form-control" type="text" placeholder="Location"/>
          <br></br>
          <label>Date</label>
          <input onChange={props.handleDate} className="form-control" type="date" id="example"/>
          <br></br>
          <label>Time</label>
          <input onChange={props.handleTime} className="form-control" type="time"/>
          <br></br>
          <label>Description</label>
          <input onChange={props.handleDescription} className="form-control" type="text" placeholder="Description" />
          <br></br>
          Is this event public?
          <input type="checkbox" checked={props.public} onChange={props.isPublic} />
          <br></br>
          <input type="submit" onClick={props.addFilmsSubmit} className="btn btn-secondary btn-lg textarea" value="Add Films" />
        </form>
		</div>
	</div>
)

export default EntryDetails;