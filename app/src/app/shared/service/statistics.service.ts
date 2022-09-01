/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Statistics service
 * @author code@rollingarray.co.in
 *
 * Created at     : 2021-12-08 12:44:23 
 * Last modified  : 2022-03-30 17:39:26
 */

import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class StatisticsService {

	/**
	 * Creates an instance of statistics service.
	 */
	constructor(

	) { }

	/**
	 * @description Medians statistics service
	 * @param values 
	 * @returns  
	 */
	median(values: number[]) {
		if (values.length === 0) throw new Error("No inputs");

		values.sort(function (a, b) {
			return a - b;
		});

		var half = Math.floor(values.length / 2);

		if (values.length % 2)
			return values[half];

		return (values[half - 1] + values[half]) / 2.0;
	}

	/**
	 * @description Means statistics service
	 * @param values 
	 * @returns  
	 */
	mean(values: number[]) {
		let total = 0;
		values.map(eachValue => {
			total += eachValue;
		})
		return total / values.length;
	}

	/**
	 * @description Standards deviation
	 * @param values 
	 * @returns  
	 */
	standardDeviation(values: number[]) {
		const meanVal = this.mean(values);

		var SDprep = 0;
		values.map(eachValue => {
			SDprep += Math.pow((eachValue - meanVal), 2);
		})

		var SDresult = Math.sqrt(SDprep / (values.length - 1));

		return SDresult;
	}

	/**
	 * @description Modes statistics service
	 * @param values 
	 * @returns  
	 */
	modes(values: number[]) {
		let frequency = []; // array of frequency.
		let maxFreq = 0; // holds the max frequency.
		let modes = [];

		values.map(data => {
			frequency[data] = (frequency[data] || 0) + 1; // increment frequency.

			if (frequency[data] > maxFreq) { // is this frequency > max so far ?
				maxFreq = frequency[data]; // update max.
			}
		});

		frequency.map(data => {
			if (data == maxFreq) {
				modes = [
					...modes,
					data
				];
			}
		});
		
		return modes;
	}

	/**
	 * @description Logarithms scale
	 * @param position 
	 * @param minPosition 
	 * @param maxPosition 
	 * @param maxLogPower 
	 * @returns  
	 */
	logarithmScale(position: number, minPosition: number, maxPosition: number, maxLogPower: number) {
		// The result should be between 1 an maxLogPower
		var minv = Math.log(1);
		var maxv = Math.log(Math.pow(10, maxLogPower * 5));
		
		var scale = (maxv-minv) / (maxPosition-minPosition);
	  
		return Math.round(Math.exp(maxv - scale*(position-minPosition)));
	}
}
