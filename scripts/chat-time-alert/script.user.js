Date.prototype.addHours = function(h) {
  this.setTime(this.getTime() + (h*60*60*1000));
  return this;
}
var timezones = ["UTC (GMT)", "CET", "PST", "MST", "CST", "EST", "CST", "IST"]
var offsets = [0, 2, -8, -7, 6, -5, -6, 5.5]
function constructMessage(){
	var date = new Date();
	var message = "**Time:**";
	for(let i = 0; i < timezones.length; i++){
		var str = date.addHours(offsets[i]).toString();
		str = str.substring(str.indexOf('2021')+5);
		str = str.substring(0, str.indexOf(' '));
		message += " "+timezones[i]+": "+str+",";
	}
	return message.substring(0, message.length-1);
}
function sendMessage(message){
	$('#input').val(message);
	$('#sayit-button').click();
}
function alertTime(){
	sendMessage(constructMessage());
}
alertTime();
setInterval(alertTime, 300000);//five minutes
