import md5 from 'md5'
import axios from 'axios'
import dateFormat from 'format-datetime'

export default {
	isMobile (str) {
		var reg = /^1[345789][0-9]{9}$/g;
		if(!reg.test(str))
			return false;
		return true;
	},
	getSignUrl (url, data) {
		const date = new Date();
		const key = 'H7843HOIDSHF9I23897V';
		const now = dateFormat(date,"yyyy-MM-dd,HH:mm:ss");
		let str = url +'-'+ key +'-'+ now +'?';
		if(Object.keys(data).length>0){
			let keySort = Object.keys(data).sort();
			for(let k in keySort){
				if(keySort[k].includes('_noSign')) continue;
				str += data[keySort[k]];
			}
		}
		const sign = md5(str).toLocaleUpperCase();
		return url +'?t='+ now +'&sign='+ sign;
	},
	ajax (endUrl, cb, opt={}) {
		console.log(opt.data)
		axios({
			url: endUrl,
			data: opt.data || '',
			method: opt.method || 'post',
		}).then((res) => {
			if(cb) cb(res);
		})
	}
}