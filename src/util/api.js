import util from './util.js'

const OPT = function(){
	this.data = {};
	this.method = 'post';
	this.put = (key, value) => {
		this.data[key] = value;
	}
	this.set = (key, value) => {
		this[key] = value;
	}
}

const isTest = window.location.href.includes('http://localhost1')?true:false;
const IP_URL = isTest?'http://localhost:3030':'http://39.105.217.177:3030';


/* 用户注册 */
export const userRegisterApi = (name, mobile, pwd, cb) => {
	var opt = new OPT();
	opt.put('name', name);
	opt.put('password', pwd);
	opt.put('mobile', mobile);
	const url = '/api/user/register';
	const endUrl = util.getSignUrl(url, opt.data);
	util.ajax(IP_URL+endUrl, cb, opt);
}

/* 用户登录 */
export const userLoginApi = (mobile, pwd, cb) => {
	var opt = new OPT();
	opt.put('pwd', pwd);
	opt.put('mobile', mobile);
	const url = '/api/user/login';
	const endUrl = util.getSignUrl(url, opt.data);
	util.ajax(IP_URL+endUrl, cb, opt);
}

/* 变妆 */
export const faceDecoration = (file, type, cb) => {
	var opt = new OPT();
	var formData = new FormData();
	formData.append('img', file);
	formData.append('type_noSign', type);
	opt.set('data', formData);
	const url = '/api/tencent/facedecoration';
	const endUrl = util.getSignUrl(url, opt.data);
	util.ajax(IP_URL+endUrl, cb, opt);
}

/* 美妆 */
export const faceCosmetic = (file, type, cb) => {
	var opt = new OPT();
	var formData = new FormData();
	formData.append('img', file);
	formData.append('type_noSign', type);
	opt.set('data', formData);
	const url = '/api/tencent/facecosmetic';
	const endUrl = util.getSignUrl(url, opt.data);
	util.ajax(IP_URL+endUrl, cb, opt);
}

/* 颜龄 */
export const faceAge = (file, cb) => {
	var opt = new OPT();
	var formData = new FormData();
	formData.append('img', file);
	opt.set('data', formData);
	const url = '/api/tencent/faceage';
	const endUrl = util.getSignUrl(url, opt.data);
	util.ajax(IP_URL+endUrl, cb, opt);
}