
function cron(){
	$.get( "http://dev-api.msg.com/v2/events?start_date=03302017&end_date=03302022", function( response ) {
		var response_data = response.data;
		var response_data_object = response_data.results;
		var live_events = response_data_object.length
		var artists_array = [];
		for(var i = 0; i < response_data_object.length; i++){
			var artists = response_data_object[i].artists;
			var artists_length = artists.length;
			artists_array.push(artists_length)
		}
		var number_of_artists = artists_array.reduce((a, b) => a + b, 0);
		console.log(number_of_artists)	
	});
}

// $.get( "http://dev-api.msg.com/v2/events?start_date=03302017&end_date=03302022", function( response ) {
// 	var response_data = response.data;
// 	var response_data_object = response_data.results;
// 	var artists_array = [];
// 	for(var i = 0; i < response_data_object.length; i++){
// 		var artists = response_data_object[i].artists;
// 		var artists_length = artists.length;
// 		artists_array.push(artists_length)
// 	}
// 	var number_of_artists = artists_array.reduce((a, b) => a + b, 0);
// 	console.log(number_of_artists);
// 	//console.log(artists_array);
// });