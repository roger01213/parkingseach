
const regionSearch=document.querySelector('.regionSearch');
const dataBtn=document.querySelector('.dataBtn');
const parkList=document.querySelector('.parkList');
{/* <li>名稱${item.name},付費方式${item.typeName} <input  type="button"value="位置" class="dataBtn btn btn-primary" data-lan=${index}></li> */}

function parkListdata(data){
  let str = "";
////////////////////CAR由大到小排序//////////////////////////////
  data = data.sort(function (a, b) {
    return a.car < b.car ? 1 : -1;
   });
////////////////////////////////////////////////////////////
  data.forEach(function (item, index) {
      // console.log(str);  
      let context = `<li> <button type="button" class="btn btn-secondary btn-lg btn-block" data-lan=${index}>名稱${item.name} 剩餘車格${item.car} </button></li> `;
      str += context;
  })
  parkList.innerHTML = str;

  parkList.addEventListener('click',function(e){
    if(e.target.getAttribute('type')=='button'){
        let num=e.target.getAttribute('data-lan');
      
        // console.log('data',num);
        // console.log('data1',data[num]);
        let dataary=[];
        dataary.push(data[num]);
        // map.setView(arry, 50)
        render(dataary);
        // renderData();
    } else {
        alert('你沒點到按鈕');
    }
  })

}



// parkList.addEventListener('click',function(e){
//   if(e.target.getAttribute('type')=='button'){
//       let num=e.target.getAttribute('data-lan');
//       let arry=num.split(",")
//       console.log(arry);
//       map.setView(arry, 50)
//       // render(num);
//       // renderData();
//   } else {
//       alert('你沒點到按鈕');
//   }
// })

function getFeaturesInView() { // 移除地圖上的 marker
  map.eachLayer(function (layer) {
      if (layer instanceof L.Marker) {
          map.removeLayer(layer);
      }
  });
}







// dataBtn.addEventListener('click', function(e) {
// console.log(e);
// map.setView([22.991501,120.195621], 50)

// });

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
    // console.log(ary);
    render(ary)
    calData(ary)
    });

////////////////////////////////////////////////////////////////////////////////////////////////////////
//render在地圖上渲染
function render(item){
  item.forEach(function (item1,index){    
   let arry=[];
    arry=(item1.lnglat).split(",") //將字串拆以逗點成陣列
    // console.log('arry',arry)
     L.marker(arry).addTo(map)
    .bindPopup(`<h4>名稱:${item1.name}</h4> <p class="text-danger">${item1.typeName}</p><p>行政區:${item1.zone}</p>
    <p>總車格:${item1.car_total}</p><p class="text-danger">剩餘車格:${item1.car}</p>
    <p>位址:${item1.address}</p>`)
    .openPopup();     
  })
  
}




regionSearch.addEventListener('change', function (e) {  
  getFeaturesInView();
  // delrender(ary)
let zonedata=[];
  // console.log(e.target.value);
  // console.log(ary);  
  ary.forEach(function (item, index) {

   if (e.target.value == item.zone) {
      zonedata.push(item);
      // console.log(zonedata);
    }else if(e.target.value ==""){
      zonedata.push(item);
    }
    
  })
  // console.log(zonedata);
  // delrender(ary);
  render(zonedata);
  parkListdata(zonedata)
  
}
);



function calData(data) {
  let dataobj = {};
  data.forEach(function (item, index) {
    if (dataobj[item.zone] == undefined) {
      dataobj[item.zone] = 1;
    } else {
      dataobj[item.zone] += 1;
    }
  })
  // console.log(dataobj);
  const areAry = Object.keys(dataobj);
  // console.log(areAry);
  let newData = [];
  areAry.forEach(function (item) {
    let ary = []
    ary.push(item);
    ary.push(dataobj[item]);
    newData.push(ary);
  })
  // console.log(newData);
  //c3產生器
  const chart = c3.generate({
    bindto: "#chart",
    data: {
      columns: newData,
      type : 'donut',
    },
    donut: {
      title: "停車場分布區"
    }
  });


}
  

  


function towdata(){
  let data = [];
  let ary=[];
    axios.get('https://opengov.tainan.gov.tw/OpenApi/api/service/Get/8eb46a49-6ff5-46e2-ae53-e9b80d575baf')
      .then(function (response) {
       ary=response.data.data;
      // console.log(ary);

      let dataobj = {};
  ary.forEach(function (item, index) {
    if (dataobj[item['區域']] == undefined) {
      dataobj[item['區域']] = 1;
    } else {
      dataobj[item['區域']] += 1;
    }
  })
  // console.log(dataobj);
  const areAry = Object.keys(dataobj);
  // console.log(areAry);
  let newData = [];
  areAry.forEach(function (item) {
    let ary = []
    ary.push(item);
    ary.push(dataobj[item]);
    newData.push(ary);
  })
  console.log(newData);
  //c3產生器
  const chart = c3.generate({
    bindto: "#towchart",
    data: {
      columns: newData,
      type : 'donut',
    },
    donut: {
      title: "歷年拖吊區統計分布"
    }
  });
     
      });
}

towdata()