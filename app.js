/* جلسة خاصة لكل جهاز */
if(!sessionStorage.getItem("device_session_id")){
 sessionStorage.setItem("device_session_id","DEV-"+Math.random().toString(36).substring(2,10));
}
const deviceSession = sessionStorage.getItem("device_session_id");

const courses={
 anatomy:{
  title:"تشريح",
  icon:"fa-bone",
  content:{
   تلخيصات:[
    {name:"ملخص الجهاز العظمي"},
    {name:"ملخص الجهاز العضلي"},
    {name:"ملخص الأعصاب"}
   ],
   اختبارات:[
    {name:"اختبار فصلي"},
    {name:"اختبار نهائي"}
   ],
   تقارير:[],
   كتب:[]
  }
 },
 physiology:{title:"فسيولوجي",icon:"fa-heart-pulse",content:{}},
 chemistry:{title:"كيمياء",icon:"fa-flask",content:{}},
 biology:{title:"أحياء",icon:"fa-dna",content:{}},
 skills:{title:"مهارات سريرية",icon:"fa-user-doctor",content:{}},
 nursing1:{title:"تمريض 1",icon:"fa-stethoscope",content:{}},
 nursing2:{title:"تمريض 2",icon:"fa-briefcase-medical",content:{}}
};

function animatePage(html){
 const main=document.getElementById("main");
 main.innerHTML=`<div class="page">${html}</div>`;
 setTimeout(()=> document.querySelector(".page").classList.add("show"),50);
}

function showDashboard(){
 let html="<div class='grid'>";
 Object.keys(courses).forEach(k=>{
  html+=`
   <div class="card" onclick="openCourse('${k}')">
    <i class="fas ${courses[k].icon}"></i>
    <h3>${courses[k].title}</h3>
   </div>`;
 });
 html+="</div>";
 animatePage(html);
}

function openCourse(key){
 let html=`
 <button onclick="showDashboard()">⬅ رجوع</button>
 <h2 style="text-align:center">${courses[key].title}</h2>
 <div class="tabs">
  <div class="tab active" onclick="showContent('${key}','تلخيصات',this)">📘 تلخيصات</div>
  <div class="tab" onclick="showContent('${key}','اختبارات',this)">📝 اختبارات</div>
  <div class="tab" onclick="showContent('${key}','تقارير',this)">📊 تقارير</div>
  <div class="tab" onclick="showContent('${key}','كتب',this)">📚 كتب</div>
 </div>
 <div id="contentArea"></div>
 `;
 animatePage(html);
 setTimeout(()=> showContent(key,"تلخيصات",document.querySelector(".tab")),100);
}

function showContent(courseKey,type,el){
 document.querySelectorAll(".tab").forEach(t=>t.classList.remove("active"));
 el.classList.add("active");

 const items=courses[courseKey].content[type] || [];
 let html="";

 if(items.length===0){
  html=`<div class="card">لا يوجد محتوى حالياً</div>`;
 }else{
  items.forEach(item=>{
   html+=`<div class="card">${item.name}</div>`;
  });
 }

 document.getElementById("contentArea").innerHTML=
 `<div class="page show">${html}</div>`;
}

function globalSearch(val){
 val=val.toLowerCase();
 let html="<div class='grid'>";
 Object.keys(courses).forEach(k=>{
  if(courses[k].title.toLowerCase().includes(val)){
   html+=`
    <div class="card" onclick="openCourse('${k}')">
     <i class="fas ${courses[k].icon}"></i>
     <h3>${courses[k].title}</h3>
    </div>`;
  }
 });
 html+="</div>";
 animatePage(html);
}

function changeTheme(theme){
 document.body.className="";
 if(theme) document.body.classList.add(theme);
 localStorage.setItem("theme",theme);
}

window.onload=function(){
 const savedTheme=localStorage.getItem("theme");
 if(savedTheme) document.body.classList.add(savedTheme);
 showDashboard();
};
