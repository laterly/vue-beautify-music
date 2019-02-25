
function formatDate(timestamp) {
  return new Date(parseInt(timestamp) * 1000).toLocaleString().replace(/:\d{1,2}$/, ' ');
}
export default {
  formatDate: formatDate
};