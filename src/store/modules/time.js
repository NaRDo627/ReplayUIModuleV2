import { createAction, handleActions } from "redux-actions";
import produce from 'immer';

// const LOOP = "TimeTracker/LOOP";
const START_AUTOPLAY = "TimeTracker/START_AUTOPLAY";
const STOP_AUTOPLAY = "TimeTracker/STOP_AUTOPLAY";
// const TOGGLE_AUTOPLAY = "TimeTracker/TOGGLE_AUTOPLAY";
// const REWIND_TO_START = "TimeTracker/REWIND_TO_START";
// const SKIP_30S_FORWARD = "TimeTracker/SKIP_30S_FORWARD";
// const SKIP_30S_REVERSE = "TimeTracker/SKIP_30S_REVERSE";
const CHANGE_MS_SINCE_EPOCH_TO = "TimeTracker/CHANGE_MS_SINCE_EPOCH_TO";
// const NOW_PLAYING = "TimeTracker/NOW_PLAYING";
const CHANGE_AUTOPLAY_SPEED_TO = "TimeTracker/CHANGE_AUTOPLAY_SPEED_TO";

// createAction 으로 액션 생성함수 정의
export const startAutoplay = createAction(START_AUTOPLAY)
export const stopAutoplay = createAction(STOP_AUTOPLAY)
// export const toggleAutoplay = createAction(TOGGLE_AUTOPLAY)
// export const rewindToStart = createAction(REWIND_TO_START)
// export const skip30sForward = createAction(SKIP_30S_FORWARD)
// export const skip30sReverse = createAction(SKIP_30S_REVERSE)
export const changeMsSinceEpochTo = createAction(CHANGE_MS_SINCE_EPOCH_TO, msSinceEpoch => msSinceEpoch)
// export const nowPlaying = createAction(NOW_PLAYING, msSinceEpoch => msSinceEpoch)
export const changeAutoplaySpeedTo = createAction(CHANGE_AUTOPLAY_SPEED_TO, autoplaySpeed => autoplaySpeed)

// **** 초기 상태 정의
const initialState = {
  autoplaySpeed: 10,
  msSinceEpoch: 1000,
  autoplay: false,
}

// **** handleActions 로 리듀서 함수 작성
export default handleActions(
  {
    [START_AUTOPLAY]: (state, action) => produce(state, draft => {
      draft.autoplay = true;
    }),
    [STOP_AUTOPLAY]: (state, action) => produce(state, draft => {
      draft.autoplay = false;
    }),
    // [TOGGLE_AUTOPLAY]: (state, action) => produce(state, draft => {
    //   (state.autoplay)? draft.autoplay = false : draft.autoplay = true;
    // }),
    // [REWIND_TO_START]: (state, action) => produce(state, draft => {
    //   draft.msSinceEpoch = 1000;
    // }),
    // [SKIP_30S_FORWARD]: (state, action) => produce(state, draft => {
    //   draft.msSinceEpoch = state.msSinceEpoch + 30000;
    // }),
    // [SKIP_30S_REVERSE]: (state, action) => produce(state, draft => {
    //   draft.msSinceEpoch = state.msSinceEpoch - 30000;
    // }),
    [CHANGE_MS_SINCE_EPOCH_TO]: (state, action) => produce(state, draft => {
      draft.msSinceEpoch = action.payload;
    }),
    // [NOW_PLAYING]: (state, action) => produce(state, draft => {
    //   draft.msSinceEpoch = action.payload;
    // }),
    [CHANGE_AUTOPLAY_SPEED_TO]: (state, action) => produce(state, draft => {
      draft.autoplaySpeed = action.payload;
    }),
  },
  initialState
);
