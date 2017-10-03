import react from ('react');

function EventWinnerDisplay(props) {
  return (
    <div>
      <div>{this.props.event && this.props.event.eventTitle}</div>
      <div>{this.props.event && this.props.event.eventLocation}</div>
      <div>{this.props.event && this.props.event.eventTime.slice(0,10)}</div>
      <div>{this.props.event && this.props.event.eventDesc}</div>
    </div>
  )
}

export default EventWinnerDisplay;