window.addEventListener('DOMContentLoaded',async()=>{
const dashData = await axios.get(`http://localhost:3003/premium/getPremiumData`);
const data =dashData.data.data[0];
});