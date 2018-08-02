import drData from './data/index_YSSbooks_DR.v1.json';
import jsrData from './data/index_YSSbooks_JSR.v2.json';
import lessonsData from './data/lesson_collatedv3_WIP.json';

const titleScore = 10;
const contentsScore = 2;



export default class JSONdb {

	static search(book, query, num) {

		query = query.toLowerCase();
		
		let data = JSONdb.getJsonData(book);

		JSONdb.assignScores(data, book, query);

		JSONdb.sortByScore(data);

		return data.slice(0, num); //return only fixed number of results
		

	}

	static getJsonData(book, query, num) {
		switch(book) {
			case 'dr': return drData;
			case 'lessons': return lessonsData;
			case 'jsr': return jsrData;
			default: return null;
		}
	}


	static assignScores(data, book, query) {

		for(let i=0;i<data.length;i++) {
			
			console.log(data[i]);

			data[i].score = 0;

			if(data[i].title.toLowerCase().includes(query)) {
				data[i].score += titleScore; //+10
			}

			if(book === 'lessons') {
				//add score for tag match
				for(let j=0;j<data[i].index.length;j++) {
					for(let k=0;k<data[i].index[j].tags.length;k++) {
						if(data[i].index[j].tags[k].toLowerCase().includes(query)) {
							data[i].score += contentsScore; //+2
							console.log("data[i].title");
							console.log(data[i].title);
							console.log(data[i].score);
						}
					}
				}
			}
			else {
				for(let j=0;j<data[i].contents.length;j++) {
					if(data[i].contents[j].title.toLowerCase().includes(query)) {
						data[i].score += contentsScore; //+2
					}
				}
			}
			
			console.log(data[i].score);
		}

	}

	static sortByScore(data) {
	    let i, j, max_index;

	    for (i = 0; i < data.length-1; i++)
	    {
	        max_index = i;
	        for (j = i+1; j < data.length; j++) {
	          if (data[j].score > data[max_index].score) {
	            max_index = j;
	          }
	        }

	        //Swap
	        let c = data[i];
	        data[i] = data[max_index];
	        data[max_index] = c;
	    }

	    console.log(data);
	}

}

