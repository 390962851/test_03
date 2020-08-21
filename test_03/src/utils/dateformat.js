import Vue from 'vue'

Vue.filter('dateFormat', function (originVal) {
  const dt = new Date(originVal * 1000);
  const yy = dt.getFullYear();
  const MM = (dt.getMonth() + 1 + '').padStart(2, '0');
  const dd = (dt.getDate() + '').padStart(2, '0');
  const hh = (dt.getHours() + '').padStart(2, '0');
  const mm = (dt.getMinutes() + '').padStart(2, '0');
  const ss = (dt.getSeconds() + '').padStart(2, '0');

  return `${yy}-${MM}-${dd}-${hh}-${mm}-${ss}`
});
