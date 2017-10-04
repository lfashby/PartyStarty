import React from 'react';


const EventVoter = (props) => (
  <div >
    <form className='voterBox'>
      <div className='movieOption'>
        {props.movies[0].title}
        <select value={props.firstRating} onChange={props.handleFirstRating}>
          <option value="0">0</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>
      <div className='movieOption'>
        {props.movies[1].title}
        <select value={props.secondRating} onChange={props.handleSecondRating}>
          <option value="0">0</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>
      <div className='movieOption'>
        {props.movies[2].title}
        <select value={props.thirdRating} onChange={props.handleThirdRating}>
          <option value="0">0</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>
      <button onClick={props.submitRatings} className="btn btn-secondary btn-lg textarea">Vote</button>
    </form>
  </div>
)

export default EventVoter;