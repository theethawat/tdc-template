import GeneralAction from "./GeneralAction";
import {
  TIMELINE_ALL,
  TIMELINE_CREATE,
  TIMELINE_DELETE,
  TIMELINE_EDIT,
  TIMELINE_ERROR,
  TIMELINE_GET,
} from "../type";

const TimelineAction = new GeneralAction("timeline", "Tineline", {
  allConst: TIMELINE_ALL,
  oneConst: TIMELINE_GET,
  errorConst: TIMELINE_ERROR,
  createConst: TIMELINE_CREATE,
  updateConst: TIMELINE_EDIT,
  deleteConst: TIMELINE_DELETE,
});

export const getAllTimeline = (query) => TimelineAction.getAllData(query);
export const getOneTimeline = (id) => TimelineAction.getOneData(id);
export const createOneTimeline = (data) => TimelineAction.createOne(data);
export const updateOneTimeline = (id, payload) =>
  TimelineAction.editOne(id, payload);
export const deleteOneTimeline = (id) => TimelineAction.deleteOne(id);
