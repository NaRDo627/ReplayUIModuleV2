import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as timeActions from "../store/modules/time";
import TimeTracker from "../components/Time/TimeTracker"

class TimeTrackerContainer extends Component {
    handleStartAutoplay = () => {
        const { TimeActions } = this.props;
        TimeActions.startAutoplay();
    }

    handleStopAutoplay = () => {
        const { TimeActions } = this.props;
        TimeActions.stopAutoplay();
    }
}

const mapStateToProps = ({ time }) => ({
    autoplaySpeed: time.autoplaySpeed,
    msSinceEpoch: time.msSinceEpoch,
    autoplay: time.autoplay
});
  
const mapDispatchToProps = dispatch => ({
    TimeActions: bindActionCreators(timeActions, dispatch)
});

export default connect(
mapStateToProps,
mapDispatchToProps
)(TimeTrackerContainer);