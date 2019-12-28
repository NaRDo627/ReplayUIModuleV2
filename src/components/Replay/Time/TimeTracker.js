import React from 'react'
import { clamp } from 'lodash'

class TimeTracker extends React.Component {
    // state = {
    //     autoplaySpeed: 10,
    //     msSinceEpoch: 1000,
    //     autoplay: false,
    // }

    clampAutoplaySpeed = val => clamp(val, 1, 50)
    clampMsSinceEpoch = val => clamp(val, 1000, this.props.durationSeconds * 1000)
    setMsSinceEpoch = val => this.props.changeMsSinceEpochTo(this.clampMsSinceEpoch(val))
    setAutoplaySpeed = val => this.props.changeAutoplaySpeedTo(this.clampAutoplaySpeed(val))

    // setMsSinceEpoch = val => { this.setState({ msSinceEpoch: this.clampMsSinceEpoch(val) }) }
    // setAutoplaySpeed = val => { this.setState({ autoplaySpeed: this.clampAutoplaySpeed(val) }) }

    onKeydown = e => {
        if (e.target.tagName.toLowerCase() === 'input') return

        if (e.keyCode === 32) { // Space
            e.preventDefault()
            this.toggleAutoplay()
        }

        if (e.keyCode === 37) { // Left Arrow
            e.preventDefault()
            if (this.props.autoplay) this.stopAutoplay()
            const { msSinceEpoch, autoplaySpeed } = this.props;
            // this.setState(({ msSinceEpoch, autoplaySpeed }) => ({
            //     msSinceEpoch: this.clampMsSinceEpoch(msSinceEpoch - (autoplaySpeed * 100)),
            // }))
            this.props.changeMsSinceEpochTo(this.clampMsSinceEpoch(msSinceEpoch - (autoplaySpeed * 100)));
        }

        if (e.keyCode === 39) { // Right Arrow
            e.preventDefault()
            if (this.props.autoplay) this.stopAutoplay()
            const { msSinceEpoch, autoplaySpeed } = this.props;
            // this.setState(({ msSinceEpoch, autoplaySpeed }) => ({
            //     msSinceEpoch: this.clampMsSinceEpoch(msSinceEpoch + (autoplaySpeed * 100)),
            // }))
            this.props.changeMsSinceEpochTo(this.clampMsSinceEpoch(msSinceEpoch + (autoplaySpeed * 100)));
        }

        if (e.keyCode === 40) { // Down Arrow
            e.preventDefault()
            // this.setState(({ autoplaySpeed }) => ({
            //     autoplaySpeed: this.clampAutoplaySpeed(autoplaySpeed - 1),
            // }))
            const { autoplaySpeed } = this.props;
            this.props.changeAutoplaySpeedTo(this.clampAutoplaySpeed(autoplaySpeed - 1));
        }

        if (e.keyCode === 38) { // Up Arrow
            e.preventDefault()
            // this.setState(({ autoplaySpeed }) => ({
            //     autoplaySpeed: this.clampAutoplaySpeed(autoplaySpeed + 1),
            // }))
            const { autoplaySpeed } = this.props;
            this.props.changeAutoplaySpeedTo(this.clampAutoplaySpeed(autoplaySpeed + 1));
        }
    }

    componentDidMount() {
        this.mounted = true
        if (this.props.autoplay) setTimeout(this.startAutoplay, 300)
        window.addEventListener('keydown', this.onKeydown)

        // Handle devtools options
        if (this.props.options.tools.enabled) {
            const { timestamp, autoplay } = this.props.options.tools.match

            if (autoplay) {
                setTimeout(this.toggleAutoplay, 100)
            }

            const [, min, sec, ds] = /(\d+):(\d+)\.(\d)/.exec(timestamp)
            this.setMsSinceEpoch((min * 60 * 1000) + (sec * 1000) + (ds * 100))

            return
        }

        setTimeout(this.toggleAutoplay, 100)

        this.props.changeAutoplaySpeedTo(this.props.autoplaySpeed)
        // this.setState({ autoplaySpeed: this.props.autoplaySpeed })
    }

    componentWillUnmount() {
        cancelAnimationFrame(this.rafId)
        this.mounted = false
        window.removeEventListener('keydown', this.onKeydown)
    }

    loop = time => {
        if (!this.props.autoplay || !this.mounted) return

        const elapsedTime = time - this.rafLastTime
        this.rafLastTime = time

        // this.setState(({ msSinceEpoch, autoplaySpeed }) => {
        //     if (Math.floor(msSinceEpoch / 1000) >= this.props.durationSeconds) {
        //         cancelAnimationFrame(this.rafId)
        //         return { autoplay: false }
        //     }

        //     return { msSinceEpoch: this.clampMsSinceEpoch(msSinceEpoch + (autoplaySpeed * elapsedTime)) }
        // })

        const { msSinceEpoch, autoplaySpeed } = this.props;
        if (Math.floor(msSinceEpoch / 1000) >= this.props.durationSeconds) {
            cancelAnimationFrame(this.rafId)
            this.props.stopAutoplay();
        }
        else
            this.props.changeMsSinceEpochTo(this.clampMsSinceEpoch(msSinceEpoch + (autoplaySpeed * elapsedTime)))

        this.rafId = requestAnimationFrame(this.loop)
    }

    startAutoplay = () => {
        this.rafLastTime = performance.now()
     //   this.setState({ autoplay: true })
        this.props.startAutoplay();
        this.rafId = requestAnimationFrame(this.loop)
    }

    stopAutoplay = () => {
        cancelAnimationFrame(this.rafId)
        // this.setState({ autoplay: false })
        this.props.stopAutoplay();
    }

    toggleAutoplay = () => {
        if (this.props.autoplay) {
            this.stopAutoplay()
        } else {
            if (this.props.msSinceEpoch === this.props.durationSeconds * 1000) {
                // this.setState({ msSinceEpoch: 1000 })
                this.props.changeMsSinceEpochTo(1000);
            }
            this.startAutoplay()
        }
    }

    rewindToStart = () => {
        if (this.props.autoplay) {
            this.stopAutoplay()
        }

        // this.setState({ msSinceEpoch: 1000 })
        this.changeMsSinceEpochTo(1000)
    }

    skip30sForward = () => {
        const curMsSinceEpoch = this.props.msSinceEpoch
        //this.setState({ msSinceEpoch: curMsSinceEpoch + 30000 })
        this.props.changeMsSinceEpochTo(curMsSinceEpoch + 30000);
    }

    skip30sReverse = () => {
        const curMsSinceEpoch = this.props.msSinceEpoch
        // this.setState({ msSinceEpoch: curMsSinceEpoch - 30000 })
        this.props.changeMsSinceEpochTo(curMsSinceEpoch - 30000);
    }

    skipTo = newMsSinceEpoch => {
        // this.setState({ msSinceEpoch: newMsSinceEpoch })
        this.props.changeMsSinceEpochTo(newMsSinceEpoch);
    }

    render() {
        const { replayData } = this.props
        const renderProps = {
            msSinceEpoch: this.props.msSinceEpoch,
            currentReplayData: replayData && replayData.stateAt(this.props.msSinceEpoch),
            timeControls: {
                autoplay: this.props.autoplay,
                autoplaySpeed: this.props.autoplaySpeed,
                startAutoplay: this.startAutoplay,
                stopAutoplay: this.stopAutoplay,
                toggleAutoplay: this.toggleAutoplay,
                setAutoplaySpeed: this.setAutoplaySpeed,
                setMsSinceEpoch: this.setMsSinceEpoch,
                rewindToStart: this.rewindToStart,
                skip30sForward: this.skip30sForward,
                skip30sReverse: this.skip30sReverse,
                skipTo: this.skipTo,
            },
        }

        return this.props.render(renderProps)
    }
}

TimeTracker.defaultProps = {
    autoplaySpeed: 10
}

export default TimeTracker
