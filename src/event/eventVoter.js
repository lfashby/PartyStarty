import React from 'react';
const EventVoter = (props) => (
  <div>

    <div className="eventDetailBox">
      You were invited to the {props.event.eventTitle}:{props.event.eventDesc}
      <br/>
      Hosted By {props.event.eventHostName}
      <br/>
      on {props.event.eventDate} {props.event.eventTime}
      <br/>
      at {props.event.eventLocation}
    </div>

    <form className='voterBox'>
      <div className='movieOption'>
        {props.movies.length > 0 ? 
        <div className='boxItem'>
          <img 
            className="img-thumbnail" 
            src={`https://image.tmdb.org/t/p/w500${props.movies[0].poster}`} 
          />
        </div> : ''}
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
        {props.movies.length > 0 ? 
        <div className='boxItem'>
          <img 
            className="img-thumbnail" 
            src={`https://image.tmdb.org/t/p/w500${props.movies[1].poster}`} 
          />
        </div> : ''}
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
        {props.movies.length > 0 ? 
        <div className='boxItem'>
          <img 
            className="img-thumbnail" 
            src={`https://image.tmdb.org/t/p/w500${props.movies[2].poster}`} 
          />
        </div> : ''}
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
    </form>
    
    <button
        type="button" 
        className="btn btn-primary" 
        id="voteButton"
        onClick={(e) => {props.submitRatings(e)}} 
      >
      Vote
    </button>

    {props.justVoted ? 
    <div className="alert alert-success" role="alert">
      You've Just Voted. If you change your mind, just vote again! 
    </div> : ''}

      <div className='foodBox'>
        {props.foods.map((food, index) => {
          return <div key={index} className='movieOption'>
            <div className="qEntry">
              <img 
                className="img-thumbnail" 
                src={food.image} 
              />
            </div>
          </div>
        })}
      </div>
  </div>
)

export default EventVoter;