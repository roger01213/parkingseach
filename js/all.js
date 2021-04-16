
const regionSearch=document.querySelector('.regionSearch');

//////////////////////////////////////////////////////////////////////////////////////////////////////////
let map = L.map('map', {
  center: [22.604964, 120.300476],
  zoom: 16
});

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

////////////////////////////////////////////////////////////////////////////////////////////////////
let data = [];
let ary=[];
  axios.get('https://opengov.tainan.gov.tw/OpenApi/api/service/Get/c3604e1d-c4e1-4224-9d41-084ce299c3bf')
    .then(function (response) {
    ary=response.data.data;
    console.log(ary);
    render(ary)
   
    });

////////////////////////////////////////////////////////////////////////////////////////////////////////
//render在地圖上渲染
function render(item){
  item.forEach(function (item1,index){    
    arry=(item1.lnglat).split(",") //將字串拆以逗點成陣列
    
     L.marker(arry).addTo(map)
    .bindPopup(`<h4>名稱:${item1.name}</h4> <p>行政區:${item1.zone}</p>
    <p>總車格:${item1.car_total}</p><p>剩餘車格:${item1.car}</p>`)
    .openPopup();     
  })
  
}
//////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////
/////刪除
function delrender(item){
  item.forEach(function (item1,index){    
    arry=(item1.lnglat).split(",") //將字串拆以逗點成陣列
    
     L.marker(arry).remove(map)
    .bindPopup(`<h4>名稱:${item1.name}</h4> <p>行政區:${item1.zone}</p>
    <p>總車格:${item1.car_total}</p><p>剩餘車格:${item1.car}</p>`)
    .openPopup();     
  })
  
}
//////////////////////////////////////////////////////////////////////////////////////



regionSearch.addEventListener('change', function (e) {  
  delrender(ary)
let zonedata=[];
  console.log(e.target.value);
  // console.log(ary);  
  ary.forEach(function (item, index) {

   if (e.target.value == item.zone) {
      zonedata.push(item);
      // console.log(zonedata);
    }else if(e.target.value ==""){
      zonedata.push(item);
    }
    
  })
  console.log(zonedata);
  delrender(ary);
  render(zonedata);
  
}
);



 
  

  

