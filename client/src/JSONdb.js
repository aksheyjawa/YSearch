import drData from './data/index_YSSbooks_DR.v1.json';
import jsrData from './data/index_YSSbooks_JSR.v2.json';
import lessonsData from './data/lesson_collatedv3_WIP.json';

const titleScore = 10;
const contentsScore = 2;

export default class JSONdb {

	static search(book, term, num) {

		console.log('inside search');

		term = term.toLowerCase();
		
		let data = null;
		
		switch(book) {
			case 'dr': data = drData;
						break;
			case 'lessons': data = lessonsData;
						break;
			case 'jsr': data = jsrData;
						break;
		}

		console.log(data.length);

		for(let i=0;i<data.length;i++) {
			
			console.log(data[i]);

			data[i].score = 0;

			if(data[i].title.toLowerCase().includes(term)) {
				data[i].score += titleScore; //+10
			}

			if(book === 'lessons') {
				//add score for tag match
				for(let j=0;j<data[i].index.length;j++) {
					for(let k=0;k<data[i].index[j].tags.length;k++) {
						if(data[i].index[j].tags[k].toLowerCase().includes(term)) {
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
					if(data[i].contents[j].title.toLowerCase().includes(term)) {
						data[i].score += contentsScore; //+2
					}
				}
			}
			
			console.log(data[i].score);
		}

		JSONdb.sortByScore(data);

		if(book === "lessons") {
			console.log("lessons data: ");
			console.log(data);
		}
		

		return data.slice(0,num);
		

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

