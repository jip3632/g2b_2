/**
 * 2021.06.03
 * use localStorage js
 */

document.addEventListener('DOMContentLoaded', function(){
	let storage = window.localStorage;
	storage.lastTimeMill = Date.now();
	//console.log(storage);
	
	if (!storage.firstUpdateDate) {
		storage.initialize();
	} else {
		let today = new Date('');
		let firstUpdateDate = new Date(storage.firstUpdateDate);
		//console.log(Math.round(Math.abs(today.getTime() - firstUpdateDate.getTime())/ (1000 * 60 * 60 * 24)));
		if (Math.round(Math.abs(today.getTime() - firstUpdateDate.getTime())/ (1000 * 60 * 60 * 24)) > 7) {
			storage.initialize();
		}
	}
});

Storage.prototype.initialize = function() {
	this.sajhen = JSON.stringify(new Array());
	this.gonggo = JSON.stringify(new Array());
	this.contract = JSON.stringify(new Array());
	this.openBids = JSON.stringify(new Array());
	
	let date = new Date()
	this.firstUpdateDate = date.getFullYear().toString() + '-' + (date.getMonth() + 1).toString() + '-' + date.getDate().toString();
}

var LocalStorageUtil = {
	isIncluded : function(key, value) {
		let storage = window.localStorage;
		if (typeof key == 'string') {
			let arrayOfKey = JSON.parse(storage[key]);
			if (Array.isArray(arrayOfKey)) {
				return arrayOfKey.includes(value);
			} else {
				console.error('the value such key of localStorage is not array');
				return false;
			}
		} else {
			console.error('the key is not String type');
			return false;
		}
	}
	,pushValue : function(key, value) {
		let storage = window.localStorage;
		if (typeof key == 'string') {
			let arrayOfKey = JSON.parse(storage[key]);
			if (Array.isArray(arrayOfKey)) {
				if (typeof value == 'string' || typeof value == 'number') {
					arrayOfKey.push(value);
					storage[key] = JSON.stringify(arrayOfKey);
				} else {
					console.error('the type of value is not allowed');
				}
			} else {
				console.error('the value such key of localStorage is not array');
			}
		} else {
			console.error('the key is not String type');
		}
	}
}
 
