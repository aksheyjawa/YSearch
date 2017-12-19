import * as qs from 'query-string';


export default class Helpers {
  static getParams() {
  	const parsed = qs.parse(window.location.search);
	return parsed;
  }
}