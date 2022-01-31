/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Course material state selector
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-01-14 19:23:54 
 * Last modified  : 2022-01-25 18:13:27
 */

import
{
	createFeatureSelector,
	createSelector,
	MemoizedSelector
} from '@ngrx/store';
import { AvailabilityPlannerModel } from 'src/app/shared/model/availability-planner.model';
import { MentorMatchModel } from 'src/app/shared/model/mentor-match.model';
import { availabilityPlannerAdapter, AvailabilityPlannerStateModel } from './availability-planner.state.model';
import { AVAILABILITY_PLANNER_FEATURE_KEY } from './availability-planner.state.reducer';


/**
 * @description Selectors - Course material adapter
 */
const {
	selectIds,
	selectEntities,
	selectAll,
	selectTotal,
} = availabilityPlannerAdapter.getSelectors();

/**
 * @description  Selectors - Course material State
 */
export const selectAvailabilityPlannerState: MemoizedSelector<AvailabilityPlannerStateModel, AvailabilityPlannerStateModel> = createFeatureSelector<AvailabilityPlannerStateModel>(AVAILABILITY_PLANNER_FEATURE_KEY);

/**
 * @description Selectors - All Course material
 */
export const selectAllAvailabilityPlanner = createSelector(
	selectAvailabilityPlannerState,
	selectAll,
);

/**
 * @description Selectors - All Course material Ids
 */
export const selectAllAvailabilityPlannerIds = createSelector(
	selectAvailabilityPlannerState,
	selectIds,
);

/**
 * @description Selectors - Course material total number
 */
export const selectAvailabilityPlannerTotalNumber = createSelector(
	selectAvailabilityPlannerState,
	selectTotal,
);

/**
 * @description Selectors - Course material has availabilityPlanner
 */
export const selectAvailabilityPlannerHasData = (availabilityDate: string) => createSelector(
	selectAvailabilityPlannerState,
	//selectEntities,
	(entity) =>
	{
		let hasData = false;
		const entityIds = entity.ids;
		entityIds.map(eachId =>
		{
			const eachEntity = entity.entities[eachId];
			if (eachEntity.availabilityDate === availabilityDate)
			{
				hasData = true
			}
		})
		
		return hasData;
	}
);

export const selectAllAvailabilityPlannerByDate = (availabilityDate: string) => createSelector(
	selectAvailabilityPlannerState,
	//selectEntities,
	(entity) =>
	{
		let availabilityPlanners: AvailabilityPlannerModel[] = [];
		const entityIds = entity.ids;
		entityIds.map(eachId =>
		{
			const eachEntity = entity.entities[eachId];
			if (eachEntity.availabilityDate === availabilityDate)
			{
				availabilityPlanners = [
					...availabilityPlanners,
					eachEntity
				]
			}
		})
		return availabilityPlanners;
	}
);


/**
 * @description Selectors - Course material by availabilityPlanner id
 */
const selectAvailabilityPlannerByAvailabilityPlannerId = (availabilityPlannerIdId: string) =>
	createSelector(selectAvailabilityPlannerState, (state) => state.entities[availabilityPlannerIdId]);

const selectAvailabilityMatchByAvailabilityPlannerId = (availabilityPlannerIdId: string) =>
createSelector(selectAvailabilityPlannerState, (state) => state.entities[availabilityPlannerIdId].mentorMatch.data);

// export const selectAvailabilityMatchPlanner = (availabilityPlannerIdId: string, matchAvailabilityPlannerIdId: string) => createSelector(
// 	selectAvailabilityPlannerState,
// 	(state) =>
// 	{
// 		const mentorMatchs: MentorMatchModel[] = state.entities[availabilityPlannerIdId].mentorMatch.data;
// 		let availabilityPlanners: AvailabilityPlannerModel[] = [];
// 		let availabilityPlannerModel: AvailabilityPlannerModel;
// 		mentorMatchs.map(eachMentorMatch =>
// 		{
// 			if (eachMentorMatch.plannerId === matchAvailabilityPlannerIdId)
// 			{
// 				availabilityPlannerModel = {
// 					plannerId: eachMentorMatch.plannerId,
// 					availabilityDate: eachMentorMatch.availabilityDate,
// 					availabilityFrom: eachMentorMatch.availabilityFrom,
// 					availabilityTo: eachMentorMatch.availabilityTo,
// 					availabilityContext: eachMentorMatch.availabilityContext,
// 					onlineMeetingUrl: eachMentorMatch.onlineMeetingUrl,
// 				}
// 			}
// 		})
// 		//console.log(parentMenu);
// 		return availabilityPlannerModel;
// 	}
// );

/**
 * @description export User skill categories query to access all selectors
 */
export const AVAILABILITY_PLANNER_QUERY_SELECTOR = {
	selectAllAvailabilityPlanner,
	selectAllAvailabilityPlannerIds,
	selectAvailabilityPlannerTotalNumber,
	selectAvailabilityPlannerHasData,
	selectAvailabilityPlannerByAvailabilityPlannerId,
	selectAllAvailabilityPlannerByDate,
	selectAvailabilityMatchByAvailabilityPlannerId,
	//selectAvailabilityMatchPlanner
};
