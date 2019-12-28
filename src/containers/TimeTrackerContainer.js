import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as timeActions from "../store/modules/time";
import TimeTracker from "../components/Replay/Time/TimeTracker"

class TimeTrackerContainer extends Component {
    handleStartAutoplay = () => {
        const { TimeActions } = this.props;
        TimeActions.startAutoplay();
    }

    handleStopAutoplay = () => {
        const { TimeActions } = this.props;
        TimeActions.stopAutoplay();
    }

    // handleToggleAutoplay = () => {
    //     const { TimeActions } = this.props;
    //     TimeActions.toggleAutoplay();
    // }
    
    handleChangeMsSinceEpochTo = (msSinceEpoch) => {
        const { TimeActions } = this.props;
        TimeActions.changeMsSinceEpochTo(msSinceEpoch);     
    }

    handleChangeAutoplaySpeedTo = (autoplaySpeed) => {
        const { TimeActions } = this.props;
        TimeActions.changeAutoplaySpeedTo(autoplaySpeed);     
    }

    render() {
        const { autoplaySpeed, msSinceEpoch, autoplay, options, durationSeconds, replayData, render } = this.props;
        return (
            <TimeTracker 
                autoplaySpeed={autoplaySpeed}
                msSinceEpoch={msSinceEpoch}
                autoplay={autoplay}
                startAutoplay={this.handleStartAutoplay}
                stopAutoplay={this.handleStopAutoplay}
                // toggleAutoplay={this.handleToggleAutoplay}
                changeMsSinceEpochTo={this.handleChangeMsSinceEpochTo}
                changeAutoplaySpeedTo={this.handleChangeAutoplaySpeedTo}
                options={options}
                durationSeconds={durationSeconds}
                replayData={replayData}
                render={render}
            />
        );
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