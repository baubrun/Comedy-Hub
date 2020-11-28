import React, { Component } from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { connect } from "react-redux";
import "moment/locale/en-gb";
// import "./CalendarView.css";
import { dataRequestPost } from "../api";

const allViews = Object.keys(Views).map((k) => Views[k]);
const localizer = momentLocalizer(moment);

const eventStyleGetter = (event, start, end, isSelected) => {
  const style = {
    backgroundColor: "#663A2B",
    color: "white",
  };
  return {
    style: style,
  };
};

const r = (date, time) => {
  return moment(`${date} ${time}`).format();
};
class CalendarView extends Component {
  constructor(...args) {
    super(...args);

    this.state = {
      culture: "en-gb",
      events: [],
      title: "",
      start: null,
      end: null,
      startDate: "",
      startTime: "",
      endDate: "",
      endTime: "",
      venue: "",
      performer: "",
      image: "",
      price: "",
      facebook: "",
      instagram: "",
      twitter: "",
      dayLayoutAlgorithm: "no-overlap",
    };
  }

  componentDidMount() {
    this.setState({ events: this.formattedEventsFromDB() });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.events !== this.props.events) {
      this.setState({
        events: this.formattedEventsFromDB(),
        venue:
          this.props.events[0] === undefined
            ? this.props.selectedVenue
            : this.props.events[0].venue,
      });
    }
  }

  eventsByVenueHostId = () => {
    const filter = {
      hostId: this.props.hostId,
      venue: this.state.venue,
    };
    const userEvents = this.props.userEvents.filter((item) => {
      for (const key in filter) {
        if (item[key] !== filter[key] || !item[key]) return false;
      }
      return true;
    });
    this.setState({ events: userEvents });
  };

  formattedEventsFromDB = () => {
    const filterEventProps = this.props.events.map((event) => {
      return {
        title: event.title,
        start: new Date(r(event.startDate, event.startTime)),
        end: new Date(r(event.endDate, event.endTime)),
      };
    });
    return filterEventProps;
  };

  formatAddedEvents = (startStr, endStr, title) => {
    const [monthSt, dateSt, yearSt, timeSt] = startStr
      .toString()
      .split(" ")
      .slice(1, 5);
    const [monthEnd, dateEnd, yearEnd, timeEnd] = endStr
      .toString()
      .split(" ")
      .slice(1, 5);
    const regexTime = (time) => time.split(/[d+:]/).slice(0, 2).join(":");
    const formatMonth = (month) => moment().month(month).format("MM");
    this.setState({
      startDate: `${yearSt}-${formatMonth(monthSt)}-${dateSt}`,
      startTime: regexTime(timeSt),
      endDate: `${yearEnd}-${formatMonth(monthEnd)}-${dateEnd}`,
      endTime: regexTime(timeEnd),
      title: title,
    });
  };

  dispatchLoading = () => {
    this.props.loadData();
  };

  storeCalendarEvent = async () => {
    const data = new FormData();
    data.append("title", this.state.title);
    data.append("startDate", this.state.startDate);
    data.append("startTime", this.state.startTime);
    data.append("endDate", this.state.endDate);
    data.append("endTime", this.state.endTime);
    data.append("venue", this.state.venue);
    data.append("performer", this.state.performer);
    data.append("image", this.state.image);
    data.append("price", this.state.price);
    data.append("hostId", this.props.hostId);
    data.append("facebook", this.state.facebook);
    data.append("instagram", this.state.instagram);
    data.append("twitter", this.state.twitter);

    try {
      await dataRequestPost(data);
    } catch (error) {
      console.log(error);
    }
  };

  handleSelect = ({ start, end }) => {
    if (this.state.venue === "") {
      return;
    }
    const title = window.prompt("New event title?");
    if (title) {
      this.setState({
        events: [...this.state.events, { start, end, title }],
      });
      this.formatAddedEvents(start, end, title);
      this.storeCalendarEvent();
    }
  };

  render() {
    return (
      <div>
        <Calendar
          culture={this.state.culture}
          dayLayoutAlgorithm={this.state.dayLayoutAlgorithm}
          endAccessor="end"
          eventPropGetter={eventStyleGetter}
          events={this.state.events}
          localizer={localizer}
          longPressThreshold={10}
          onSelectEvent={(event) => alert(event.title)}
          onSelectSlot={this.props.loggedIn ? this.handleSelect : ""}
          showMultiDayTimes={true}
          selectable
          startAccessor="start"
          step={15}
          style={{ height: 500 }}
          views={allViews}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loggedIn: state.auth.loggedIn,
    hostId: state.auth.hostId,
  };
};

export default connect(mapStateToProps)(CalendarView);
