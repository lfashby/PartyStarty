import React from 'react';
const EventVoter = (props) => (
  <div>
    <form className='voterBox'>
      <div className='movieOption'>
        <div className="qEntry">
          
	        {props.movies.length > 0 ? 
          <div>
          <text>{props.movies[0].title}</text>
          <img 
            className="card-img-list" 
            src={`https://image.tmdb.org/t/p/w500${props.movies[0].poster}`} 
          />
          </div> : ''}

	      </div>
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
        <div className="qEntry">

        {props.movies.length > 0 ? 
          <div>
          <text>{props.movies[1].title}</text>
          <img 
            className="card-img-list" 
            src={`https://image.tmdb.org/t/p/w500${props.movies[1].poster}`} 
          />
          </div> : ''}

	      </div>
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
        <div className="qEntry">
	        
        {props.movies.length > 0 ? 
          <div>
          <text>{props.movies[2].title}</text>
          <img 
            className="card-img-list" 
            src={`https://image.tmdb.org/t/p/w500${props.movies[2].poster}`} 
          />
          </div> : ''}

	      </div>
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
      <button onClick={(e) => {props.submitRatings(e)}} className="btn btn-secondary btn-lg textarea">Vote</button>
    </form>
    <text>
      {props.justVoted ? <text> JUST VOTED </text> : ''}
      </text>
  </div>
)

export default EventVoter;